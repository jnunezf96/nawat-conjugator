// src/lessons/registry.mjs
// Native ESM lesson registry. Kept installer-ready for the runtime bridge.
// This is NOT the physical architecture of the engine.
// Lessons are pedagogical entry points over the grammar engine.
//
// Status values:
//   "implemented"           — engine fully supports this domain
//   "partially-implemented" — some coverage, incomplete
//   "placeholder"           — no conjugation content or not yet mapped
//   "not-mapped"            — content exists in book but not in engine

export const ANDREWS_TRAJECTORY_REDIRECT_ACTIONS = Object.freeze([
    "keep",
    "rename-visible-ui",
    "reframe-metadata",
    "diagnostic-only",
    "block-generation",
    "refactor-engine",
    "needs-nawat-evidence",
]);

export const ANDREWS_PLAN_PURSUIT_AIM_STATUSES = Object.freeze([
    "queued",
    "shooting",
    "blocked",
    "closest-pass",
]);

export const ANDREWS_PLAN_PURSUIT_ARROW_RESULTS = Object.freeze([
    "hit",
    "miss",
]);

export const ANDREWS_SECTION_DIGEST_ROUTE_REFS_BY_LESSON = Object.freeze({
    "1": [
        "Andrews Lesson 1.1",
        "Andrews Lesson 1.2",
        "Andrews Lesson 1.3",
        "Andrews Lesson 1.4",
        "Andrews Lesson 1.5",
        "Andrews Lesson 1.6",
        "Andrews Lesson 1.7",
        "Andrews Lesson 1.8",
        "Andrews Lesson 1.9",
        "Andrews Lesson 1.11",
        "Andrews Lesson 1.12"
    ],
    "2": [
        "Andrews Lesson 2.1",
        "Andrews Lesson 2.2",
        "Andrews Lesson 2.3",
        "Andrews Lesson 2.4",
        "Andrews Lesson 2.5",
        "Andrews Lesson 2.6",
        "Andrews Lesson 2.8",
        "Andrews Lesson 2.9",
        "Andrews Lesson 2.10",
        "Andrews Lesson 2.11",
        "Andrews Lesson 2.12",
        "Andrews Lesson 2.13",
        "Andrews Lesson 2.14",
        "Andrews Lesson 2.15",
        "Andrews Lesson 2.16"
    ],
    "3": [
        "Andrews Lesson 3.1",
        "Andrews Lesson 3.2",
        "Andrews Lesson 3.3",
        "Andrews Lesson 3.4",
        "Andrews Lesson 3.5"
    ],
    "4": [
        "Andrews Lesson 4.1",
        "Andrews Lesson 4.2",
        "Andrews Lesson 4.3",
        "Andrews Lesson 4.4",
        "Andrews Lesson 4.5",
        "Andrews Lesson 4.6"
    ],
    "5": [
        "Andrews Lesson 5.1",
        "Andrews Lesson 5.2",
        "Andrews Lesson 5.3",
        "Andrews Lesson 5.4",
        "Andrews Lesson 5.5"
    ],
    "6": [
        "Andrews Lesson 6.1",
        "Andrews Lesson 6.2",
        "Andrews Lesson 6.3",
        "Andrews Lesson 6.4",
        "Andrews Lesson 6.5",
        "Andrews Lesson 6.6"
    ],
    "7": [
        "Andrews Lesson 7.1",
        "Andrews Lesson 7.2",
        "Andrews Lesson 7.4",
        "Andrews Lesson 7.5",
        "Andrews Lesson 7.6",
        "Andrews Lesson 7.8",
        "Andrews Lesson 7.9",
        "Andrews Lesson 7.10"
    ],
    "8": [
        "Andrews Lesson 8.1",
        "Andrews Lesson 8.2",
        "Andrews Lesson 8.3",
        "Andrews Lesson 8.4",
        "Andrews Lesson 8.5",
        "Andrews Lesson 8.6"
    ],
    "9": [
        "Andrews Lesson 9.1",
        "Andrews Lesson 9.2",
        "Andrews Lesson 9.3",
        "Andrews Lesson 9.4",
        "Andrews Lesson 9.5",
        "Andrews Lesson 9.6",
        "Andrews Lesson 9.7",
        "Andrews Lesson 9.8",
        "Andrews Lesson 9.9"
    ],
    "10": [
        "Andrews Lesson 10.2",
        "Andrews Lesson 10.3",
        "Andrews Lesson 10.4",
        "Andrews Lesson 10.5"
    ],
    "11": [
        "Andrews Lesson 11.1",
        "Andrews Lesson 11.2",
        "Andrews Lesson 11.3",
        "Andrews Lesson 11.5",
        "Andrews Lesson 11.6"
    ],
    "12": [
        "Andrews Lesson 12.1",
        "Andrews Lesson 12.2",
        "Andrews Lesson 12.3",
        "Andrews Lesson 12.4",
        "Andrews Lesson 12.5",
        "Andrews Lesson 12.6",
        "Andrews Lesson 12.7"
    ],
    "13": [
        "Andrews Lesson 13.1",
        "Andrews Lesson 13.2",
        "Andrews Lesson 13.3",
        "Andrews Lesson 13.4",
        "Andrews Lesson 13.5",
        "Andrews Lesson 13.6"
    ],
    "14": [
        "Andrews Lesson 14.1",
        "Andrews Lesson 14.2",
        "Andrews Lesson 14.3",
        "Andrews Lesson 14.4",
        "Andrews Lesson 14.5",
        "Andrews Lesson 14.6",
        "Andrews Lesson 14.7",
        "Andrews Lesson 14.8"
    ],
    "15": [
        "Andrews Lesson 15.2",
        "Andrews Lesson 15.3"
    ],
    "16": [
        "Andrews Lesson 16.1",
        "Andrews Lesson 16.2",
        "Andrews Lesson 16.3",
        "Andrews Lesson 16.4",
        "Andrews Lesson 16.5",
        "Andrews Lesson 16.6",
        "Andrews Lesson 16.1",
        "Andrews Lesson 16.8",
        "Andrews Lesson 16.9"
    ],
    "17": [
        "Andrews Lesson 17.3",
        "Andrews Lesson 17.4",
        "Andrews Lesson 17.5",
        "Andrews Lesson 17.6"
    ],
    "18": [
        "Andrews Lesson 18.1",
        "Andrews Lesson 18.2",
        "Andrews Lesson 18.3",
        "Andrews Lesson 18.4",
        "Andrews Lesson 18.5",
        "Andrews Lesson 18.6",
        "Andrews Lesson 18.7",
        "Andrews Lesson 18.8",
        "Andrews Lesson 18.9",
        "Andrews Lesson 18.10",
        "Andrews Lesson 18.11",
        "Andrews Lesson 18.12"
    ],
    "19": [
        "Andrews Lesson 19.1",
        "Andrews Lesson 19.2",
        "Andrews Lesson 19.3",
        "Andrews Lesson 19.4",
        "Andrews Lesson 19.5",
        "Andrews Lesson 19.6"
    ],
    "20": [
        "Andrews Lesson 20.2",
        "Andrews Lesson 20.3",
        "Andrews Lesson 20.4",
        "Andrews Lesson 20.5",
        "Andrews Lesson 20.6",
        "Andrews Lesson 20.1",
        "Andrews Lesson 20.8"
    ],
    "21": [
        "Andrews Lesson 21.2",
        "Andrews Lesson 21.3",
        "Andrews Lesson 21.4"
    ],
    "22": [
        "Andrews Lesson 22.1",
        "Andrews Lesson 22.2",
        "Andrews Lesson 22.3",
        "Andrews Lesson 22.4",
        "Andrews Lesson 22.5",
        "Andrews Lesson 22.6"
    ],
    "23": [
        "Andrews Lesson 23.1",
        "Andrews Lesson 23.2",
        "Andrews Lesson 23.3",
        "Andrews Lesson 23.4",
        "Andrews Lesson 23.5"
    ],
    "24": [
        "Andrews Lesson 24.1",
        "Andrews Lesson 24.2",
        "Andrews Lesson 24.3",
        "Andrews Lesson 24.4",
        "Andrews Lesson 24.5",
        "Andrews Lesson 24.6",
        "Andrews Lesson 24.7",
        "Andrews Lesson 24.8",
        "Andrews Lesson 24.9"
    ],
    "25": [
        "Andrews Lesson 25.1",
        "Andrews Lesson 25.2",
        "Andrews Lesson 25.3",
        "Andrews Lesson 25.4",
        "Andrews Lesson 25.5",
        "Andrews Lesson 25.6",
        "Andrews Lesson 25.7",
        "Andrews Lesson 25.8",
        "Andrews Lesson 25.9",
        "Andrews Lesson 25.10",
        "Andrews Lesson 25.11",
        "Andrews Lesson 25.14",
        "Andrews Lesson 25.15"
    ],
    "26": [
        "Andrews Lesson 26.1",
        "Andrews Lesson 26.2",
        "Andrews Lesson 26.3",
        "Andrews Lesson 26.4",
        "Andrews Lesson 26.5",
        "Andrews Lesson 26.6",
        "Andrews Lesson 26.7",
        "Andrews Lesson 26.8",
        "Andrews Lesson 26.9",
        "Andrews Lesson 26.10",
        "Andrews Lesson 26.11",
        "Andrews Lesson 26.12",
        "Andrews Lesson 26.13",
        "Andrews Lesson 26.14",
        "Andrews Lesson 26.15",
        "Andrews Lesson 26.16",
        "Andrews Lesson 26.17",
        "Andrews Lesson 26.18",
        "Andrews Lesson 26.19",
        "Andrews Lesson 26.20",
        "Andrews Lesson 26.21",
        "Andrews Lesson 26.22",
        "Andrews Lesson 26.23"
    ],
    "27": [
        "Andrews Lesson 27.1",
        "Andrews Lesson 27.2",
        "Andrews Lesson 27.3",
        "Andrews Lesson 27.4",
        "Andrews Lesson 27.5",
        "Andrews Lesson 27.6"
    ],
    "28": [
        "Andrews Lesson 28.2",
        "Andrews Lesson 28.3",
        "Andrews Lesson 28.4",
        "Andrews Lesson 28.5",
        "Andrews Lesson 28.6",
        "Andrews Lesson 28.7",
        "Andrews Lesson 28.8",
        "Andrews Lesson 28.9",
        "Andrews Lesson 28.10",
        "Andrews Lesson 28.11",
        "Andrews Lesson 28.12"
    ],
    "29": [
        "Andrews Lesson 29.1",
        "Andrews Lesson 29.2",
        "Andrews Lesson 29.3",
        "Andrews Lesson 29.4",
        "Andrews Lesson 29.5",
        "Andrews Lesson 29.6",
        "Andrews Lesson 29.1"
    ],
    "30": [
        "Andrews Lesson 30.2",
        "Andrews Lesson 30.3",
        "Andrews Lesson 30.4",
        "Andrews Lesson 30.5",
        "Andrews Lesson 30.6",
        "Andrews Lesson 30.7",
        "Andrews Lesson 30.8",
        "Andrews Lesson 30.9",
        "Andrews Lesson 30.10",
        "Andrews Lesson 30.11",
        "Andrews Lesson 30.12",
        "Andrews Lesson 30.13",
        "Andrews Lesson 30.14",
        "Andrews Lesson 30.15",
        "Andrews Lesson 30.16",
        "Andrews Lesson 30.17",
        "Andrews Lesson 30.18"
    ],
    "31": [
        "Andrews Lesson 31.1",
        "Andrews Lesson 31.2",
        "Andrews Lesson 31.3",
        "Andrews Lesson 31.4",
        "Andrews Lesson 31.5",
        "Andrews Lesson 31.6",
        "Andrews Lesson 31.7",
        "Andrews Lesson 31.8",
        "Andrews Lesson 31.9",
        "Andrews Lesson 31.10",
        "Andrews Lesson 31.11",
        "Andrews Lesson 31.12",
        "Andrews Lesson 31.13"
    ],
    "32": [
        "Andrews Lesson 32.1",
        "Andrews Lesson 32.2",
        "Andrews Lesson 32.3",
        "Andrews Lesson 32.4",
        "Andrews Lesson 32.5",
        "Andrews Lesson 32.6",
        "Andrews Lesson 32.1",
        "Andrews Lesson 32.8"
    ],
    "33": [
        "Andrews Lesson 33.1",
        "Andrews Lesson 33.2",
        "Andrews Lesson 33.3",
        "Andrews Lesson 33.4",
        "Andrews Lesson 33.5",
        "Andrews Lesson 33.6",
        "Andrews Lesson 33.7",
        "Andrews Lesson 33.8",
        "Andrews Lesson 33.9",
        "Andrews Lesson 33.10"
    ],
    "34": [
        "Andrews Lesson 34.2",
        "Andrews Lesson 34.3",
        "Andrews Lesson 34.4",
        "Andrews Lesson 34.5",
        "Andrews Lesson 34.6",
        "Andrews Lesson 34.7",
        "Andrews Lesson 34.8",
        "Andrews Lesson 34.9",
        "Andrews Lesson 34.10",
        "Andrews Lesson 34.11",
        "Andrews Lesson 34.12",
        "Andrews Lesson 34.13",
        "Andrews Lesson 34.14",
        "Andrews Lesson 34.15",
        "Andrews Lesson 34.16"
    ],
    "35": [
        "Andrews Lesson 35.1",
        "Andrews Lesson 35.2",
        "Andrews Lesson 35.3",
        "Andrews Lesson 35.4",
        "Andrews Lesson 35.5",
        "Andrews Lesson 35.6",
        "Andrews Lesson 35.1",
        "Andrews Lesson 35.8",
        "Andrews Lesson 35.9",
        "Andrews Lesson 35.10",
        "Andrews Lesson 35.11",
        "Andrews Lesson 35.12",
        "Andrews Lesson 35.13",
        "Andrews Lesson 35.14"
    ],
    "36": [
        "Andrews Lesson 36.2",
        "Andrews Lesson 36.3",
        "Andrews Lesson 36.4",
        "Andrews Lesson 36.5",
        "Andrews Lesson 36.6",
        "Andrews Lesson 36.7",
        "Andrews Lesson 36.8",
        "Andrews Lesson 36.9",
        "Andrews Lesson 36.10",
        "Andrews Lesson 36.11",
        "Andrews Lesson 36.12"
    ],
    "37": [
        "Andrews Lesson 37.1",
        "Andrews Lesson 37.2",
        "Andrews Lesson 37.4",
        "Andrews Lesson 37.5",
        "Andrews Lesson 37.6",
        "Andrews Lesson 37.7",
        "Andrews Lesson 37.8",
        "Andrews Lesson 37.9"
    ],
    "38": [
        "Andrews Lesson 38.1",
        "Andrews Lesson 38.2"
    ],
    "39": [
        "Andrews Lesson 39.2",
        "Andrews Lesson 39.3",
        "Andrews Lesson 39.4",
        "Andrews Lesson 39.5",
        "Andrews Lesson 39.6",
        "Andrews Lesson 39.7",
        "Andrews Lesson 39.8",
        "Andrews Lesson 39.9"
    ],
    "40": [
        "Andrews Lesson 40.2",
        "Andrews Lesson 40.3",
        "Andrews Lesson 40.4",
        "Andrews Lesson 40.5",
        "Andrews Lesson 40.6",
        "Andrews Lesson 40.1",
        "Andrews Lesson 40.8",
        "Andrews Lesson 40.9",
        "Andrews Lesson 40.10",
        "Andrews Lesson 40.11",
        "Andrews Lesson 40.12"
    ],
    "41": [
        "Andrews Lesson 41.1",
        "Andrews Lesson 41.2",
        "Andrews Lesson 41.3",
        "Andrews Lesson 41.4"
    ],
    "42": [
        "Andrews Lesson 42.2",
        "Andrews Lesson 42.3",
        "Andrews Lesson 42.4",
        "Andrews Lesson 42.5",
        "Andrews Lesson 42.6",
        "Andrews Lesson 42.8",
        "Andrews Lesson 42.9",
        "Andrews Lesson 42.10"
    ],
    "43": [
        "Andrews Lesson 43.1",
        "Andrews Lesson 43.2",
        "Andrews Lesson 43.3",
        "Andrews Lesson 43.4",
        "Andrews Lesson 43.5",
        "Andrews Lesson 43.6",
        "Andrews Lesson 43.7",
        "Andrews Lesson 43.8",
        "Andrews Lesson 43.9"
    ],
    "44": [
        "Andrews Lesson 44.1",
        "Andrews Lesson 44.2",
        "Andrews Lesson 44.3",
        "Andrews Lesson 44.4",
        "Andrews Lesson 44.5",
        "Andrews Lesson 44.6",
        "Andrews Lesson 44.7",
        "Andrews Lesson 44.8",
        "Andrews Lesson 44.9"
    ],
    "45": [
        "Andrews Lesson 45.1",
        "Andrews Lesson 45.2",
        "Andrews Lesson 45.3",
        "Andrews Lesson 45.4"
    ],
    "46": [
        "Andrews Lesson 46.1",
        "Andrews Lesson 46.2",
        "Andrews Lesson 46.3",
        "Andrews Lesson 46.4",
        "Andrews Lesson 46.5",
        "Andrews Lesson 46.6",
        "Andrews Lesson 46.7",
        "Andrews Lesson 46.8",
        "Andrews Lesson 46.9",
        "Andrews Lesson 46.10",
        "Andrews Lesson 46.11",
        "Andrews Lesson 46.12",
        "Andrews Lesson 46.13",
        "Andrews Lesson 46.14",
        "Andrews Lesson 46.15"
    ],
    "47": [
        "Andrews Lesson 47.3",
        "Andrews Lesson 47.4",
        "Andrews Lesson 47.5"
    ],
    "48": [
        "Andrews Lesson 48.1",
        "Andrews Lesson 48.2",
        "Andrews Lesson 48.3",
        "Andrews Lesson 48.4",
        "Andrews Lesson 48.5",
        "Andrews Lesson 48.6",
        "Andrews Lesson 48.7",
        "Andrews Lesson 48.8",
        "Andrews Lesson 48.9",
        "Andrews Lesson 48.10",
        "Andrews Lesson 48.11",
        "Andrews Lesson 48.12",
        "Andrews Lesson 48.13"
    ],
    "49": [
        "Andrews Lesson 49.2",
        "Andrews Lesson 49.3",
        "Andrews Lesson 49.4",
        "Andrews Lesson 49.5",
        "Andrews Lesson 49.6",
        "Andrews Lesson 49.7",
        "Andrews Lesson 49.8",
        "Andrews Lesson 49.9"
    ],
    "50": [
        "Andrews Lesson 50.1",
        "Andrews Lesson 50.2",
        "Andrews Lesson 50.3",
        "Andrews Lesson 50.4",
        "Andrews Lesson 50.5",
        "Andrews Lesson 50.6",
        "Andrews Lesson 50.8",
        "Andrews Lesson 50.9",
        "Andrews Lesson 50.10",
        "Andrews Lesson 50.11"
    ],
    "51": [
        "Andrews Lesson 51.1",
        "Andrews Lesson 51.2",
        "Andrews Lesson 51.3",
        "Andrews Lesson 51.4"
    ],
    "52": [
        "Andrews Lesson 52.1",
        "Andrews Lesson 52.2",
        "Andrews Lesson 52.3",
        "Andrews Lesson 52.4",
        "Andrews Lesson 52.5",
        "Andrews Lesson 52.6",
        "Andrews Lesson 52.7"
    ],
    "53": [
        "Andrews Lesson 53.1",
        "Andrews Lesson 53.2",
        "Andrews Lesson 53.3",
        "Andrews Lesson 53.4",
        "Andrews Lesson 53.5",
        "Andrews Lesson 53.6",
        "Andrews Lesson 53.7"
    ],
    "54": [
        "Andrews Lesson 54.2",
        "Andrews Lesson 54.3",
        "Andrews Lesson 54.4",
        "Andrews Lesson 54.5",
        "Andrews Lesson 54.6"
    ],
    "55": [
        "Andrews Lesson 55.1",
        "Andrews Lesson 55.2",
        "Andrews Lesson 55.3",
        "Andrews Lesson 55.4",
        "Andrews Lesson 55.5",
        "Andrews Lesson 55.6",
        "Andrews Lesson 55.7"
    ],
    "56": [
        "Andrews Lesson 56.2",
        "Andrews Lesson 56.3",
        "Andrews Lesson 56.4",
        "Andrews Lesson 56.5"
    ],
    "57": [
        "Andrews Lesson 57.1",
        "Andrews Lesson 57.2",
        "Andrews Lesson 57.3",
        "Andrews Lesson 57.4",
        "Andrews Lesson 57.5",
        "Andrews Lesson 57.7"
    ],
    "58": [
        "Andrews Lesson 58.1",
        "Andrews Lesson 58.2",
        "Andrews Lesson 58.3",
        "Andrews Lesson 58.4",
        "Andrews Lesson 58.5",
        "Andrews Lesson 58.6",
        "Andrews Lesson 58.7",
        "Andrews Lesson 58.8"
    ]
});

const ANDREWS_INTERNAL_SUBSECTION_ROUTE_INDEX = Object.freeze({
    "1.3": [
        {
            "id": "1.3.1",
            "ref": "Andrews Lesson 1.3.1",
            "itemKind": "numbered item",
            "page": 5,
            "focusKeywords": [
                "term",
                "appropriate",
                "without",
                "change",
                "modification",
                "adjunction"
            ],
            "digest": "local case or subrule under §1.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "1.3.2",
            "ref": "Andrews Lesson 1.3.2",
            "itemKind": "numbered item",
            "page": 5,
            "focusKeywords": [
                "term",
                "serve",
                "redefined",
                "describing",
                "nahuatl",
                "noun"
            ],
            "digest": "local case or subrule under §1.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "1.3.3",
            "ref": "Andrews Lesson 1.3.3",
            "itemKind": "numbered item",
            "page": 6,
            "focusKeywords": [
                "term",
                "rejected",
                "times",
                "difficult",
                "accept",
                "example"
            ],
            "digest": "local case or subrule under §1.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "1.3.4",
            "ref": "Andrews Lesson 1.3.4",
            "itemKind": "numbered item",
            "page": 6,
            "focusKeywords": [
                "addition",
                "need",
                "keeping",
                "redefining",
                "discarding",
                "already"
            ],
            "digest": "local case or subrule under §1.3, verify exact examples and boundaries in the PDF."
        }
    ],
    "1.6": [
        {
            "id": "1.6.2",
            "ref": "Andrews Lesson 1.6.2",
            "itemKind": "numbered item",
            "page": 8,
            "focusKeywords": [
                "graphemes",
                "members",
                "language",
                "graphological",
                "subsystem",
                "they"
            ],
            "digest": "local case or subrule under §1.6, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "1.6.3",
            "ref": "Andrews Lesson 1.6.3",
            "itemKind": "numbered item",
            "page": 8,
            "focusKeywords": [
                "most",
                "linguists",
                "speak",
                "phonological",
                "system",
                "rather"
            ],
            "digest": "local case or subrule under §1.6, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "1.6.4",
            "ref": "Andrews Lesson 1.6.4",
            "itemKind": "numbered item",
            "page": 8,
            "focusKeywords": [
                "sememe",
                "kind",
                "content",
                "element",
                "set",
                "meaningfulness"
            ],
            "digest": "local case or subrule under §1.6, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "1.6.1",
            "ref": "Andrews Lesson 1.6.1",
            "itemKind": "referenced subsection",
            "page": 10,
            "focusKeywords": [
                "referenced internally; pypdf did not expose a clean item boundary"
            ],
            "digest": "local case or subrule under §1.6, verify exact examples and boundaries in the PDF."
        }
    ],
    "1.7": [
        {
            "id": "1.7.1",
            "ref": "Andrews Lesson 1.7.1",
            "itemKind": "referenced subsection",
            "page": 13,
            "focusKeywords": [
                "referenced internally; pypdf did not expose a clean item boundary"
            ],
            "digest": "local case or subrule under §1.7, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "1.7.3",
            "ref": "Andrews Lesson 1.7.3",
            "itemKind": "referenced subsection",
            "page": 13,
            "focusKeywords": [
                "referenced internally; pypdf did not expose a clean item boundary"
            ],
            "digest": "local case or subrule under §1.7, verify exact examples and boundaries in the PDF."
        }
    ],
    "1.8": [
        {
            "id": "1.8.1",
            "ref": "Andrews Lesson 1.8.1",
            "itemKind": "numbered item",
            "page": 10,
            "focusKeywords": [
                "phone",
                "token-level",
                "nondistinctive",
                "noncontrastive",
                "representation"
            ],
            "digest": "local case or subrule under §1.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "1.8.2",
            "ref": "Andrews Lesson 1.8.2",
            "itemKind": "numbered item",
            "page": 10,
            "focusKeywords": [
                "agraph",
                "token-level",
                "nondistinctive",
                "representation",
                "grapheme",
                "differ"
            ],
            "digest": "local case or subrule under §1.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "1.8.3",
            "ref": "Andrews Lesson 1.8.3",
            "itemKind": "numbered item",
            "page": 10,
            "focusKeywords": [
                "sig",
                "regular",
                "such",
                "token-level",
                "representation",
                "sigeme"
            ],
            "digest": "local case or subrule under §1.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "1.8.4",
            "ref": "Andrews Lesson 1.8.4",
            "itemKind": "numbered item",
            "page": 10,
            "focusKeywords": [
                "seme",
                "token-level",
                "representation",
                "sememe"
            ],
            "digest": "local case or subrule under §1.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "1.8.5",
            "ref": "Andrews Lesson 1.8.5",
            "itemKind": "numbered item",
            "page": 11,
            "focusKeywords": [
                "morph",
                "token-level",
                "representation",
                "morpheme",
                "regular"
            ],
            "digest": "local case or subrule under §1.8, verify exact examples and boundaries in the PDF."
        }
    ],
    "1.11": [
        {
            "id": "1.11.1",
            "ref": "Andrews Lesson 1.11.1",
            "itemKind": "numbered item",
            "page": 12,
            "focusKeywords": [
                "meaningless",
                "structural",
                "units",
                "consist",
                "phonemes",
                "phones"
            ],
            "digest": "local case or subrule under §1.11, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "1.11.1.a",
            "ref": "Andrews Lesson 1.11.1.a",
            "itemKind": "lettered item",
            "page": 13,
            "focusKeywords": [
                "units",
                "lower",
                "rank",
                "normally",
                "formation"
            ],
            "digest": "local case or subrule under §1.11, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "1.11.1.b",
            "ref": "Andrews Lesson 1.11.1.b",
            "itemKind": "lettered item",
            "page": 13,
            "focusKeywords": [
                "nahuatl",
                "spanish",
                "syllable",
                "vowel",
                "phoneme",
                "phone"
            ],
            "digest": "local case or subrule under §1.11, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "1.11.1.c",
            "ref": "Andrews Lesson 1.11.1.c",
            "itemKind": "lettered item",
            "page": 13,
            "focusKeywords": [
                "vocable",
                "meaningless",
                "unit",
                "syllables",
                "word",
                "considered"
            ],
            "digest": "local case or subrule under §1.11, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "1.11.1.d",
            "ref": "Andrews Lesson 1.11.1.d",
            "itemKind": "lettered item",
            "page": 13,
            "focusKeywords": [
                "structure",
                "vocables",
                "like",
                "syllables",
                "determined",
                "language"
            ],
            "digest": "local case or subrule under §1.11, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "1.11.1.e",
            "ref": "Andrews Lesson 1.11.1.e",
            "itemKind": "lettered item",
            "page": 13,
            "focusKeywords": [
                "importance",
                "syllables",
                "vocables",
                "they",
                "establish",
                "phonological"
            ],
            "digest": "local case or subrule under §1.11, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "1.11.2",
            "ref": "Andrews Lesson 1.11.2",
            "itemKind": "numbered item",
            "page": 13,
            "focusKeywords": [
                "meaningful",
                "structural",
                "units",
                "consist",
                "morphemes",
                "morphs"
            ],
            "digest": "local case or subrule under §1.11, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "1.11.2.a",
            "ref": "Andrews Lesson 1.11.2.a",
            "itemKind": "lettered item",
            "page": 13,
            "focusKeywords": [
                "major",
                "morphemes",
                "morphs",
                "locus",
                "representational",
                "information"
            ],
            "digest": "local case or subrule under §1.11, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "1.11.2.b",
            "ref": "Andrews Lesson 1.11.2.b",
            "itemKind": "lettered item",
            "page": 13,
            "focusKeywords": [
                "minor",
                "morphemes",
                "morphs",
                "affixal",
                "affix",
                "prefix"
            ],
            "digest": "local case or subrule under §1.11, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "1.11.2.i",
            "ref": "Andrews Lesson 1.11.2.i",
            "itemKind": "lettered item",
            "page": 14,
            "focusKeywords": [
                "derivational",
                "affix",
                "locus",
                "stem-internal",
                "modifying",
                "category-alter"
            ],
            "digest": "local case or subrule under §1.11, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "1.11.2.i.ii",
            "ref": "Andrews Lesson 1.11.2.i.ii",
            "itemKind": "roman item",
            "page": 14,
            "focusKeywords": [
                "inflectional",
                "affix",
                "locus",
                "syntactical",
                "information",
                "pre"
            ],
            "digest": "local case or subrule under §1.11, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "1.11.2.c",
            "ref": "Andrews Lesson 1.11.2.c",
            "itemKind": "lettered item",
            "page": 15,
            "focusKeywords": [
                "english",
                "spanish",
                "root",
                "alone",
                "duck",
                "friend"
            ],
            "digest": "local case or subrule under §1.11, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "1.11.2.d",
            "ref": "Andrews Lesson 1.11.2.d",
            "itemKind": "lettered item",
            "page": 15,
            "focusKeywords": [
                "both",
                "hierarchies",
                "important",
                "dividing",
                "line",
                "between"
            ],
            "digest": "local case or subrule under §1.11, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "1.11.2.e",
            "ref": "Andrews Lesson 1.11.2.e",
            "itemKind": "lettered item",
            "page": 16,
            "focusKeywords": [
                "english",
                "spanish",
                "hierarchy",
                "word-group",
                "rank",
                "marks"
            ],
            "digest": "local case or subrule under §1.11, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "1.11.2.b.ii",
            "ref": "Andrews Lesson 1.11.2.b.ii",
            "itemKind": "referenced subsection",
            "page": 185,
            "focusKeywords": [
                "referenced internally; pypdf did not expose a clean item boundary"
            ],
            "digest": "local case or subrule under §1.11, verify exact examples and boundaries in the PDF."
        }
    ],
    "1.12": [
        {
            "id": "1.12.1",
            "ref": "Andrews Lesson 1.12.1",
            "itemKind": "numbered item",
            "page": 16,
            "focusKeywords": [
                "concatenation",
                "linking",
                "chaining",
                "together",
                "structure",
                "according"
            ],
            "digest": "local case or subrule under §1.12, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "1.12.2",
            "ref": "Andrews Lesson 1.12.2",
            "itemKind": "numbered item",
            "page": 16,
            "focusKeywords": [
                "interaction",
                "establishes",
                "justification",
                "any",
                "given",
                "instance"
            ],
            "digest": "local case or subrule under §1.12, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "1.12.2.a",
            "ref": "Andrews Lesson 1.12.2.a",
            "itemKind": "lettered item",
            "page": 16,
            "focusKeywords": [
                "adjunctive",
                "structure",
                "function",
                "unit",
                "powerful",
                "important"
            ],
            "digest": "local case or subrule under §1.12, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "1.12.2.b",
            "ref": "Andrews Lesson 1.12.2.b",
            "itemKind": "lettered item",
            "page": 17,
            "focusKeywords": [
                "conjunctive",
                "structure",
                "function",
                "units",
                "called",
                "conjuncts"
            ],
            "digest": "local case or subrule under §1.12, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "1.12.3",
            "ref": "Andrews Lesson 1.12.3",
            "itemKind": "numbered item",
            "page": 17,
            "focusKeywords": [
                "nahuatl",
                "structures",
                "occur",
                "mainly",
                "morphosyntactical",
                "level"
            ],
            "digest": "local case or subrule under §1.12, verify exact examples and boundaries in the PDF."
        }
    ],
    "2.3": [
        {
            "id": "2.3.1",
            "ref": "Andrews Lesson 2.3.1",
            "itemKind": "numbered item",
            "page": 27,
            "focusKeywords": [
                "sonorants"
            ],
            "digest": "local case or subrule under §2.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "2.3.2",
            "ref": "Andrews Lesson 2.3.2",
            "itemKind": "numbered item",
            "page": 27,
            "focusKeywords": [
                "fricatives"
            ],
            "digest": "local case or subrule under §2.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "2.3.3",
            "ref": "Andrews Lesson 2.3.3",
            "itemKind": "numbered item",
            "page": 28,
            "focusKeywords": [
                "stops"
            ],
            "digest": "local case or subrule under §2.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "2.3.4",
            "ref": "Andrews Lesson 2.3.4",
            "itemKind": "numbered item",
            "page": 30,
            "focusKeywords": [
                "affricates"
            ],
            "digest": "local case or subrule under §2.3, verify exact examples and boundaries in the PDF."
        }
    ],
    "2.6": [
        {
            "id": "2.6.1",
            "ref": "Andrews Lesson 2.6.1",
            "itemKind": "numbered item",
            "page": 31,
            "focusKeywords": [
                "any",
                "consonant",
                "sound",
                "between",
                "vowels",
                "forms"
            ],
            "digest": "local case or subrule under §2.6, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "2.6.2",
            "ref": "Andrews Lesson 2.6.2",
            "itemKind": "numbered item",
            "page": 31,
            "focusKeywords": [
                "any",
                "vowels",
                "sequence",
                "belong",
                "separate",
                "syllables"
            ],
            "digest": "local case or subrule under §2.6, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "2.6.3",
            "ref": "Andrews Lesson 2.6.3",
            "itemKind": "numbered item",
            "page": 31,
            "focusKeywords": [
                "than",
                "consonant",
                "sounds",
                "juxtaposed",
                "such",
                "juxtaposition"
            ],
            "digest": "local case or subrule under §2.6, verify exact examples and boundaries in the PDF."
        }
    ],
    "2.10": [
        {
            "id": "2.10.3",
            "ref": "Andrews Lesson 2.10.3",
            "itemKind": "numbered item",
            "page": 34,
            "focusKeywords": [
                "isl",
                "lyl",
                "cboquiz",
                "yob",
                "cboquizzob"
            ],
            "digest": "local case or subrule under §2.10, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "2.10.4",
            "ref": "Andrews Lesson 2.10.4",
            "itemKind": "numbered item",
            "page": 34,
            "focusKeywords": [
                "isl",
                "lyl",
                "mix",
                "yob",
                "mixxob"
            ],
            "digest": "local case or subrule under §2.10, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "2.10.1",
            "ref": "Andrews Lesson 2.10.1",
            "itemKind": "referenced subsection",
            "page": 30,
            "focusKeywords": [
                "referenced internally; pypdf did not expose a clean item boundary"
            ],
            "digest": "local case or subrule under §2.10, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "2.10.2",
            "ref": "Andrews Lesson 2.10.2",
            "itemKind": "referenced subsection",
            "page": 27,
            "focusKeywords": [
                "referenced internally; pypdf did not expose a clean item boundary"
            ],
            "digest": "local case or subrule under §2.10, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "2.10.5",
            "ref": "Andrews Lesson 2.10.5",
            "itemKind": "referenced subsection",
            "page": 59,
            "focusKeywords": [
                "referenced internally; pypdf did not expose a clean item boundary"
            ],
            "digest": "local case or subrule under §2.10, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "2.10.6",
            "ref": "Andrews Lesson 2.10.6",
            "itemKind": "referenced subsection",
            "page": 59,
            "focusKeywords": [
                "referenced internally; pypdf did not expose a clean item boundary"
            ],
            "digest": "local case or subrule under §2.10, verify exact examples and boundaries in the PDF."
        }
    ],
    "2.11": [
        {
            "id": "2.11.2",
            "ref": "Andrews Lesson 2.11.2",
            "itemKind": "numbered item",
            "page": 34,
            "focusKeywords": [
                "combination",
                "any",
                "unlike",
                "consonants",
                "group",
                "second"
            ],
            "digest": "local case or subrule under §2.11, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "2.11.5",
            "ref": "Andrews Lesson 2.11.5",
            "itemKind": "numbered item",
            "page": 35,
            "focusKeywords": [
                "followed",
                "undergoes",
                "partial",
                "assimilation"
            ],
            "digest": "local case or subrule under §2.11, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "2.11.6",
            "ref": "Andrews Lesson 2.11.6",
            "itemKind": "numbered item",
            "page": 35,
            "focusKeywords": [
                "inf"
            ],
            "digest": "local case or subrule under §2.11, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "2.11.7",
            "ref": "Andrews Lesson 2.11.7",
            "itemKind": "numbered item",
            "page": 35,
            "focusKeywords": [
                "inf",
                "followed",
                "undergoes",
                "partial",
                "assimilation",
                "resulting"
            ],
            "digest": "local case or subrule under §2.11, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "2.11.1",
            "ref": "Andrews Lesson 2.11.1",
            "itemKind": "referenced subsection",
            "page": 51,
            "focusKeywords": [
                "referenced internally; pypdf did not expose a clean item boundary"
            ],
            "digest": "local case or subrule under §2.11, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "2.11.3",
            "ref": "Andrews Lesson 2.11.3",
            "itemKind": "referenced subsection",
            "page": 28,
            "focusKeywords": [
                "referenced internally; pypdf did not expose a clean item boundary"
            ],
            "digest": "local case or subrule under §2.11, verify exact examples and boundaries in the PDF."
        }
    ],
    "2.12": [
        {
            "id": "2.12.3",
            "ref": "Andrews Lesson 2.12.3",
            "itemKind": "referenced subsection",
            "page": 42,
            "focusKeywords": [
                "referenced internally; pypdf did not expose a clean item boundary"
            ],
            "digest": "local case or subrule under §2.12, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "2.12.4",
            "ref": "Andrews Lesson 2.12.4",
            "itemKind": "referenced subsection",
            "page": 95,
            "focusKeywords": [
                "referenced internally; pypdf did not expose a clean item boundary"
            ],
            "digest": "local case or subrule under §2.12, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "2.12.5",
            "ref": "Andrews Lesson 2.12.5",
            "itemKind": "referenced subsection",
            "page": 120,
            "focusKeywords": [
                "referenced internally; pypdf did not expose a clean item boundary"
            ],
            "digest": "local case or subrule under §2.12, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "2.12.6",
            "ref": "Andrews Lesson 2.12.6",
            "itemKind": "referenced subsection",
            "page": 120,
            "focusKeywords": [
                "referenced internally; pypdf did not expose a clean item boundary"
            ],
            "digest": "local case or subrule under §2.12, verify exact examples and boundaries in the PDF."
        }
    ],
    "2.13": [
        {
            "id": "2.13.4",
            "ref": "Andrews Lesson 2.13.4",
            "itemKind": "numbered item",
            "page": 37,
            "focusKeywords": [
                "occasionally",
                "kwl",
                "becomes",
                "delabialized",
                "dropping",
                "labial"
            ],
            "digest": "local case or subrule under §2.13, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "2.13.5",
            "ref": "Andrews Lesson 2.13.5",
            "itemKind": "numbered item",
            "page": 37,
            "focusKeywords": [
                "occasionally",
                "forced",
                "vocable-final",
                "position"
            ],
            "digest": "local case or subrule under §2.13, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "2.13.1",
            "ref": "Andrews Lesson 2.13.1",
            "itemKind": "referenced subsection",
            "page": 29,
            "focusKeywords": [
                "referenced internally; pypdf did not expose a clean item boundary"
            ],
            "digest": "local case or subrule under §2.13, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "2.13.2",
            "ref": "Andrews Lesson 2.13.2",
            "itemKind": "referenced subsection",
            "page": 117,
            "focusKeywords": [
                "referenced internally; pypdf did not expose a clean item boundary"
            ],
            "digest": "local case or subrule under §2.13, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "2.13.3",
            "ref": "Andrews Lesson 2.13.3",
            "itemKind": "referenced subsection",
            "page": 27,
            "focusKeywords": [
                "referenced internally; pypdf did not expose a clean item boundary"
            ],
            "digest": "local case or subrule under §2.13, verify exact examples and boundaries in the PDF."
        }
    ],
    "3.2": [
        {
            "id": "3.2.1",
            "ref": "Andrews Lesson 3.2.1",
            "itemKind": "numbered item",
            "page": 40,
            "focusKeywords": [
                "introducers"
            ],
            "digest": "local case or subrule under §3.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "3.2.2",
            "ref": "Andrews Lesson 3.2.2",
            "itemKind": "numbered item",
            "page": 40,
            "focusKeywords": [
                "adjunctors",
                "adjoined-clause",
                "introducers"
            ],
            "digest": "local case or subrule under §3.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "3.2.3",
            "ref": "Andrews Lesson 3.2.3",
            "itemKind": "numbered item",
            "page": 41,
            "focusKeywords": [
                "sentence",
                "conjunctor"
            ],
            "digest": "local case or subrule under §3.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "3.2.4",
            "ref": "Andrews Lesson 3.2.4",
            "itemKind": "numbered item",
            "page": 41,
            "focusKeywords": [
                "adverbial",
                "modifiers"
            ],
            "digest": "local case or subrule under §3.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "3.2.5",
            "ref": "Andrews Lesson 3.2.5",
            "itemKind": "numbered item",
            "page": 41,
            "focusKeywords": [
                "interjections",
                "most",
                "occur",
                "alone",
                "utterance",
                "see"
            ],
            "digest": "local case or subrule under §3.2, verify exact examples and boundaries in the PDF."
        }
    ],
    "4.4": [
        {
            "id": "4.4.3",
            "ref": "Andrews Lesson 4.4.3",
            "itemKind": "numbered item",
            "page": 47,
            "focusKeywords": [
                "subject",
                "predicate"
            ],
            "digest": "local case or subrule under §4.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "4.4.4",
            "ref": "Andrews Lesson 4.4.4",
            "itemKind": "numbered item",
            "page": 47,
            "focusKeywords": [
                "subject",
                "predicate"
            ],
            "digest": "local case or subrule under §4.4, verify exact examples and boundaries in the PDF."
        }
    ],
    "5.2": [
        {
            "id": "5.2.3",
            "ref": "Andrews Lesson 5.2.3",
            "itemKind": "referenced subsection",
            "page": 53,
            "focusKeywords": [
                "referenced internally; pypdf did not expose a clean item boundary"
            ],
            "digest": "local case or subrule under §5.2, verify exact examples and boundaries in the PDF."
        }
    ],
    "5.3": [
        {
            "id": "5.3.1",
            "ref": "Andrews Lesson 5.3.1",
            "itemKind": "numbered item",
            "page": 51,
            "focusKeywords": [
                "pers",
                "subposition",
                "primarily",
                "locus",
                "information",
                "concerning"
            ],
            "digest": "local case or subrule under §5.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "5.3.2",
            "ref": "Andrews Lesson 5.3.2",
            "itemKind": "numbered item",
            "page": 51,
            "focusKeywords": [
                "subposition",
                "pers",
                "locus",
                "information",
                "concerning",
                "feature"
            ],
            "digest": "local case or subrule under §5.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "5.3.3",
            "ref": "Andrews Lesson 5.3.3",
            "itemKind": "numbered item",
            "page": 51,
            "focusKeywords": [
                "subposition",
                "num1",
                "locus",
                "number-connector",
                "morph",
                "being"
            ],
            "digest": "local case or subrule under §5.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "5.3.3.a",
            "ref": "Andrews Lesson 5.3.3.a",
            "itemKind": "lettered item",
            "page": 52,
            "focusKeywords": [
                "variant",
                "fills",
                "num1",
                "subposition",
                "num2",
                "filled"
            ],
            "digest": "local case or subrule under §5.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "5.3.3.b",
            "ref": "Andrews Lesson 5.3.3.b",
            "itemKind": "lettered item",
            "page": 52,
            "focusKeywords": [
                "variants",
                "qui",
                "occur",
                "complementary",
                "distribution",
                "filler"
            ],
            "digest": "local case or subrule under §5.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "5.3.3.c",
            "ref": "Andrews Lesson 5.3.3.c",
            "itemKind": "lettered item",
            "page": 52,
            "focusKeywords": [
                "irregular",
                "morph",
                "subvariant",
                "qui",
                "which",
                "replaced"
            ],
            "digest": "local case or subrule under §5.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "5.3.4",
            "ref": "Andrews Lesson 5.3.4",
            "itemKind": "numbered item",
            "page": 52,
            "focusKeywords": [
                "subposition",
                "num2",
                "definitive",
                "locus",
                "number",
                "category"
            ],
            "digest": "local case or subrule under §5.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "5.3.4.a",
            "ref": "Andrews Lesson 5.3.4.a",
            "itemKind": "lettered item",
            "page": 52,
            "focusKeywords": [
                "singular",
                "common",
                "number",
                "always",
                "represented"
            ],
            "digest": "local case or subrule under §5.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "5.3.4.b",
            "ref": "Andrews Lesson 5.3.4.b",
            "itemKind": "lettered item",
            "page": 52,
            "focusKeywords": [
                "plural",
                "number",
                "represented",
                "variant",
                "morphs"
            ],
            "digest": "local case or subrule under §5.3, verify exact examples and boundaries in the PDF."
        }
    ],
    "5.4": [
        {
            "id": "5.4.1",
            "ref": "Andrews Lesson 5.4.1",
            "itemKind": "numbered item",
            "page": 53,
            "focusKeywords": [
                "expressing",
                "present",
                "customary-present",
                "imperfect",
                "distant-past",
                "indica"
            ],
            "digest": "local case or subrule under §5.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "5.4.2",
            "ref": "Andrews Lesson 5.4.2",
            "itemKind": "numbered item",
            "page": 53,
            "focusKeywords": [
                "expressing",
                "future",
                "preterit",
                "indicative",
                "first-person",
                "forms"
            ],
            "digest": "local case or subrule under §5.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "5.4.3",
            "ref": "Andrews Lesson 5.4.3",
            "itemKind": "numbered item",
            "page": 53,
            "focusKeywords": [
                "expressing",
                "nonpast",
                "optative"
            ],
            "digest": "local case or subrule under §5.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "5.4.4",
            "ref": "Andrews Lesson 5.4.4",
            "itemKind": "numbered item",
            "page": 53,
            "focusKeywords": [
                "expressing",
                "nonpast",
                "admonitive",
                "first-person",
                "forms",
                "listed"
            ],
            "digest": "local case or subrule under §5.4, verify exact examples and boundaries in the PDF."
        }
    ],
    "5.5": [
        {
            "id": "5.5.1",
            "ref": "Andrews Lesson 5.5.1",
            "itemKind": "numbered item",
            "page": 54,
            "focusKeywords": [
                "position",
                "locus",
                "lexical",
                "meaning",
                "consequently",
                "determinant"
            ],
            "digest": "local case or subrule under §5.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "5.5.2",
            "ref": "Andrews Lesson 5.5.2",
            "itemKind": "numbered item",
            "page": 54,
            "focusKeywords": [
                "tns",
                "slot",
                "locus",
                "combined",
                "categories",
                "mood"
            ],
            "digest": "local case or subrule under §5.5, verify exact examples and boundaries in the PDF."
        }
    ],
    "6.2": [
        {
            "id": "6.2.1",
            "ref": "Andrews Lesson 6.2.1",
            "itemKind": "referenced subsection",
            "page": 107,
            "focusKeywords": [
                "referenced internally; pypdf did not expose a clean item boundary"
            ],
            "digest": "local case or subrule under §6.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "6.2.2",
            "ref": "Andrews Lesson 6.2.2",
            "itemKind": "referenced subsection",
            "page": 107,
            "focusKeywords": [
                "referenced internally; pypdf did not expose a clean item boundary"
            ],
            "digest": "local case or subrule under §6.2, verify exact examples and boundaries in the PDF."
        }
    ],
    "6.4": [
        {
            "id": "6.4.1",
            "ref": "Andrews Lesson 6.4.1",
            "itemKind": "numbered item",
            "page": 58,
            "focusKeywords": [
                "subposition",
                "va1",
                "always",
                "manifests",
                "category",
                "person"
            ],
            "digest": "local case or subrule under §6.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "6.4.1.a",
            "ref": "Andrews Lesson 6.4.1.a",
            "itemKind": "lettered item",
            "page": 58,
            "focusKeywords": [
                "3rd",
                "person",
                "combined",
                "objective",
                "va1",
                "subposition"
            ],
            "digest": "local case or subrule under §6.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "6.4.1.b",
            "ref": "Andrews Lesson 6.4.1.b",
            "itemKind": "lettered item",
            "page": 58,
            "focusKeywords": [
                "1st",
                "2nd",
                "persons",
                "person",
                "combined",
                "number"
            ],
            "digest": "local case or subrule under §6.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "6.4.2",
            "ref": "Andrews Lesson 6.4.2",
            "itemKind": "numbered item",
            "page": 58,
            "focusKeywords": [
                "subposition",
                "va2",
                "makes",
                "category",
                "not",
                "contained"
            ],
            "digest": "local case or subrule under §6.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "6.4.2.a",
            "ref": "Andrews Lesson 6.4.2.a",
            "itemKind": "lettered item",
            "page": 58,
            "focusKeywords": [
                "3rd",
                "person",
                "va2",
                "subposition",
                "manifests",
                "number"
            ],
            "digest": "local case or subrule under §6.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "6.4.2.b",
            "ref": "Andrews Lesson 6.4.2.b",
            "itemKind": "lettered item",
            "page": 59,
            "focusKeywords": [
                "non-3rd",
                "persons",
                "va2",
                "subposition",
                "expresses",
                "objective"
            ],
            "digest": "local case or subrule under §6.4, verify exact examples and boundaries in the PDF."
        }
    ],
    "6.6": [
        {
            "id": "6.6.1",
            "ref": "Andrews Lesson 6.6.1",
            "itemKind": "numbered item",
            "page": 59,
            "focusKeywords": [
                "subposition",
                "va1",
                "locus",
                "categories",
                "person",
                "number"
            ],
            "digest": "local case or subrule under §6.6, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "6.6.2",
            "ref": "Andrews Lesson 6.6.2",
            "itemKind": "numbered item",
            "page": 59,
            "focusKeywords": [
                "subposition",
                "va2",
                "locus",
                "objective-case",
                "feature",
                "which"
            ],
            "digest": "local case or subrule under §6.6, verify exact examples and boundaries in the PDF."
        }
    ],
    "7.2": [
        {
            "id": "7.2.1",
            "ref": "Andrews Lesson 7.2.1",
            "itemKind": "numbered item",
            "page": 62,
            "focusKeywords": [
                "perfective",
                "classes"
            ],
            "digest": "local case or subrule under §7.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "7.2.2",
            "ref": "Andrews Lesson 7.2.2",
            "itemKind": "numbered item",
            "page": 63,
            "focusKeywords": [
                "imperfective",
                "classes",
                "perfective",
                "shape"
            ],
            "digest": "local case or subrule under §7.2, verify exact examples and boundaries in the PDF."
        }
    ],
    "7.4": [
        {
            "id": "7.4.1",
            "ref": "Andrews Lesson 7.4.1",
            "itemKind": "numbered item",
            "page": 64,
            "focusKeywords": [
                "spelling",
                "changes",
                "see"
            ],
            "digest": "local case or subrule under §7.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "7.4.2",
            "ref": "Andrews Lesson 7.4.2",
            "itemKind": "numbered item",
            "page": 64,
            "focusKeywords": [
                "phonological",
                "changes",
                "see",
                "lesson"
            ],
            "digest": "local case or subrule under §7.4, verify exact examples and boundaries in the PDF."
        }
    ],
    "7.6": [
        {
            "id": "7.6.1",
            "ref": "Andrews Lesson 7.6.1",
            "itemKind": "numbered item",
            "page": 64,
            "focusKeywords": [
                "monosyllabic",
                "ending",
                "long",
                "belong",
                "class",
                "see"
            ],
            "digest": "local case or subrule under §7.6, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "7.6.2",
            "ref": "Andrews Lesson 7.6.2",
            "itemKind": "numbered item",
            "page": 64,
            "focusKeywords": [
                "final",
                "vowel",
                "preceded",
                "consonants",
                "long",
                "consonant"
            ],
            "digest": "local case or subrule under §7.6, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "7.6.3",
            "ref": "Andrews Lesson 7.6.3",
            "itemKind": "numbered item",
            "page": 65,
            "focusKeywords": [
                "final",
                "syllable",
                "belong",
                "class"
            ],
            "digest": "local case or subrule under §7.6, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "7.6.4",
            "ref": "Andrews Lesson 7.6.4",
            "itemKind": "numbered item",
            "page": 65,
            "focusKeywords": [
                "final",
                "syllable",
                "belong",
                "class"
            ],
            "digest": "local case or subrule under §7.6, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "7.6.5",
            "ref": "Andrews Lesson 7.6.5",
            "itemKind": "numbered item",
            "page": 65,
            "focusKeywords": [
                "intransitive",
                "end",
                "signify",
                "change",
                "belong",
                "class"
            ],
            "digest": "local case or subrule under §7.6, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "7.6.6",
            "ref": "Andrews Lesson 7.6.6",
            "itemKind": "numbered item",
            "page": 65,
            "focusKeywords": [
                "final",
                "syllable",
                "belong",
                "class",
                "changes",
                "see"
            ],
            "digest": "local case or subrule under §7.6, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "7.6.7",
            "ref": "Andrews Lesson 7.6.7",
            "itemKind": "numbered item",
            "page": 65,
            "focusKeywords": [
                "verbs",
                "ending",
                "fol",
                "belong",
                "class"
            ],
            "digest": "local case or subrule under §7.6, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "7.6.8",
            "ref": "Andrews Lesson 7.6.8",
            "itemKind": "numbered item",
            "page": 65,
            "focusKeywords": [
                "eight",
                "belong",
                "class"
            ],
            "digest": "local case or subrule under §7.6, verify exact examples and boundaries in the PDF."
        }
    ],
    "7.8": [
        {
            "id": "7.8.1",
            "ref": "Andrews Lesson 7.8.1",
            "itemKind": "numbered item",
            "page": 68,
            "focusKeywords": [
                "class"
            ],
            "digest": "local case or subrule under §7.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "7.8.2",
            "ref": "Andrews Lesson 7.8.2",
            "itemKind": "numbered item",
            "page": 68,
            "focusKeywords": [
                "class"
            ],
            "digest": "local case or subrule under §7.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "7.8.3",
            "ref": "Andrews Lesson 7.8.3",
            "itemKind": "numbered item",
            "page": 69,
            "focusKeywords": [
                "class"
            ],
            "digest": "local case or subrule under §7.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "7.8.4",
            "ref": "Andrews Lesson 7.8.4",
            "itemKind": "numbered item",
            "page": 69,
            "focusKeywords": [
                "class"
            ],
            "digest": "local case or subrule under §7.8, verify exact examples and boundaries in the PDF."
        }
    ],
    "7.9": [
        {
            "id": "7.9.1",
            "ref": "Andrews Lesson 7.9.1",
            "itemKind": "numbered item",
            "page": 70,
            "focusKeywords": [
                "human",
                "object",
                "specified"
            ],
            "digest": "local case or subrule under §7.9, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "7.9.2",
            "ref": "Andrews Lesson 7.9.2",
            "itemKind": "numbered item",
            "page": 71,
            "focusKeywords": [
                "nonhuman",
                "object",
                "specified"
            ],
            "digest": "local case or subrule under §7.9, verify exact examples and boundaries in the PDF."
        }
    ],
    "8.1": [
        {
            "id": "8.1.1",
            "ref": "Andrews Lesson 8.1.1",
            "itemKind": "numbered item",
            "page": 72,
            "focusKeywords": [
                "directional",
                "locative",
                "prefix",
                "reports",
                "movement"
            ],
            "digest": "local case or subrule under §8.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "8.1.2",
            "ref": "Andrews Lesson 8.1.2",
            "itemKind": "numbered item",
            "page": 74,
            "focusKeywords": [
                "antecessive-order",
                "prefix",
                "particle",
                "see",
                "pre"
            ],
            "digest": "local case or subrule under §8.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "8.1.3",
            "ref": "Andrews Lesson 8.1.3",
            "itemKind": "numbered item",
            "page": 75,
            "focusKeywords": [
                "negative",
                "prefix",
                "particle",
                "not",
                "see",
                "prefixal"
            ],
            "digest": "local case or subrule under §8.1, verify exact examples and boundaries in the PDF."
        }
    ],
    "8.6": [
        {
            "id": "8.6.1",
            "ref": "Andrews Lesson 8.6.1",
            "itemKind": "numbered item",
            "page": 76,
            "focusKeywords": [
                "changing",
                "intonation",
                "pattern",
                "indicated",
                "writing",
                "replacing"
            ],
            "digest": "local case or subrule under §8.6, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "8.6.2",
            "ref": "Andrews Lesson 8.6.2",
            "itemKind": "numbered item",
            "page": 77,
            "focusKeywords": [
                "inserting",
                "interrogative",
                "particle",
                "cuix",
                "perhaps",
                "perchance"
            ],
            "digest": "local case or subrule under §8.6, verify exact examples and boundaries in the PDF."
        }
    ],
    "9.3": [
        {
            "id": "9.3.1",
            "ref": "Andrews Lesson 9.3.1",
            "itemKind": "numbered item",
            "page": 78,
            "focusKeywords": [
                "nonpast",
                "past",
                "optative",
                "use",
                "morphs",
                "second-person"
            ],
            "digest": "local case or subrule under §9.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "9.3.2",
            "ref": "Andrews Lesson 9.3.2",
            "itemKind": "numbered item",
            "page": 79,
            "focusKeywords": [
                "nonpast",
                "optative",
                "use",
                "morphic",
                "dyad",
                "c-an"
            ],
            "digest": "local case or subrule under §9.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "9.3.3",
            "ref": "Andrews Lesson 9.3.3",
            "itemKind": "numbered item",
            "page": 79,
            "focusKeywords": [
                "nonpast",
                "optative",
                "built",
                "class",
                "use",
                "truncated"
            ],
            "digest": "local case or subrule under §9.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "9.3.4",
            "ref": "Andrews Lesson 9.3.4",
            "itemKind": "numbered item",
            "page": 79,
            "focusKeywords": [
                "nonpast",
                "optative",
                "built",
                "class",
                "use",
                "morph"
            ],
            "digest": "local case or subrule under §9.3, verify exact examples and boundaries in the PDF."
        }
    ],
    "9.7": [
        {
            "id": "9.7.1",
            "ref": "Andrews Lesson 9.7.1",
            "itemKind": "numbered item",
            "page": 82,
            "focusKeywords": [
                "direct",
                "commands"
            ],
            "digest": "local case or subrule under §9.7, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "9.7.2",
            "ref": "Andrews Lesson 9.7.2",
            "itemKind": "numbered item",
            "page": 82,
            "focusKeywords": [
                "indirect",
                "commands"
            ],
            "digest": "local case or subrule under §9.7, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "9.7.3",
            "ref": "Andrews Lesson 9.7.3",
            "itemKind": "numbered item",
            "page": 82,
            "focusKeywords": [
                "exhortations"
            ],
            "digest": "local case or subrule under §9.7, verify exact examples and boundaries in the PDF."
        }
    ],
    "10.3": [
        {
            "id": "10.3.1",
            "ref": "Andrews Lesson 10.3.1",
            "itemKind": "numbered item",
            "page": 85,
            "focusKeywords": [
                "class"
            ],
            "digest": "local case or subrule under §10.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "10.3.2",
            "ref": "Andrews Lesson 10.3.2",
            "itemKind": "numbered item",
            "page": 85,
            "focusKeywords": [
                "class"
            ],
            "digest": "local case or subrule under §10.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "10.3.3",
            "ref": "Andrews Lesson 10.3.3",
            "itemKind": "numbered item",
            "page": 86,
            "focusKeywords": [
                "class"
            ],
            "digest": "local case or subrule under §10.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "10.3.4",
            "ref": "Andrews Lesson 10.3.4",
            "itemKind": "numbered item",
            "page": 86,
            "focusKeywords": [
                "class"
            ],
            "digest": "local case or subrule under §10.3, verify exact examples and boundaries in the PDF."
        }
    ],
    "10.5": [
        {
            "id": "10.5.1",
            "ref": "Andrews Lesson 10.5.1",
            "itemKind": "numbered item",
            "page": 87,
            "focusKeywords": [
                "class",
                "verbs"
            ],
            "digest": "local case or subrule under §10.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "10.5.3",
            "ref": "Andrews Lesson 10.5.3",
            "itemKind": "numbered item",
            "page": 88,
            "focusKeywords": [
                "class",
                "verbs"
            ],
            "digest": "local case or subrule under §10.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "10.5.4",
            "ref": "Andrews Lesson 10.5.4",
            "itemKind": "numbered item",
            "page": 88,
            "focusKeywords": [
                "class",
                "verbs"
            ],
            "digest": "local case or subrule under §10.5, verify exact examples and boundaries in the PDF."
        }
    ],
    "11.3": [
        {
            "id": "11.3.1",
            "ref": "Andrews Lesson 11.3.1",
            "itemKind": "numbered item",
            "page": 90,
            "focusKeywords": [
                "rule",
                "compound",
                "see",
                "lessons",
                "belongs",
                "same"
            ],
            "digest": "local case or subrule under §11.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "11.3.2",
            "ref": "Andrews Lesson 11.3.2",
            "itemKind": "numbered item",
            "page": 90,
            "focusKeywords": [
                "certain",
                "class",
                "end",
                "alternate",
                "perfective",
                "which"
            ],
            "digest": "local case or subrule under §11.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "11.3.1.a",
            "ref": "Andrews Lesson 11.3.1.a",
            "itemKind": "lettered item",
            "page": 91,
            "focusKeywords": [
                "preterit-as",
                "present",
                "tense"
            ],
            "digest": "local case or subrule under §11.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "11.3.1.b",
            "ref": "Andrews Lesson 11.3.1.b",
            "itemKind": "lettered item",
            "page": 91,
            "focusKeywords": [
                "distant-past",
                "as-past",
                "tense"
            ],
            "digest": "local case or subrule under §11.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "11.3.2.a",
            "ref": "Andrews Lesson 11.3.2.a",
            "itemKind": "lettered item",
            "page": 92,
            "focusKeywords": [
                "preterit-as",
                "present",
                "tense"
            ],
            "digest": "local case or subrule under §11.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "11.3.2.b",
            "ref": "Andrews Lesson 11.3.2.b",
            "itemKind": "lettered item",
            "page": 92,
            "focusKeywords": [
                "distant-past",
                "as-past",
                "tense"
            ],
            "digest": "local case or subrule under §11.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "11.3.3",
            "ref": "Andrews Lesson 11.3.3",
            "itemKind": "numbered item",
            "page": 92,
            "focusKeywords": [
                "pil-ca",
                "hanging"
            ],
            "digest": "local case or subrule under §11.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "11.3.3.a",
            "ref": "Andrews Lesson 11.3.3.a",
            "itemKind": "lettered item",
            "page": 92,
            "focusKeywords": [
                "preterit-as",
                "present",
                "tense"
            ],
            "digest": "local case or subrule under §11.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "11.3.3.b",
            "ref": "Andrews Lesson 11.3.3.b",
            "itemKind": "lettered item",
            "page": 92,
            "focusKeywords": [
                "distant-past",
                "as-past",
                "tense"
            ],
            "digest": "local case or subrule under §11.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "11.3.8",
            "ref": "Andrews Lesson 11.3.8",
            "itemKind": "numbered item",
            "page": 94,
            "focusKeywords": [
                "mani",
                "man",
                "extend",
                "built",
                "regular",
                "tenses"
            ],
            "digest": "local case or subrule under §11.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "11.3.9",
            "ref": "Andrews Lesson 11.3.9",
            "itemKind": "numbered item",
            "page": 94,
            "focusKeywords": [
                "nemi",
                "nen",
                "live",
                "built",
                "regular",
                "tenses"
            ],
            "digest": "local case or subrule under §11.3, verify exact examples and boundaries in the PDF."
        }
    ],
    "11.5": [
        {
            "id": "11.5.1",
            "ref": "Andrews Lesson 11.5.1",
            "itemKind": "numbered item",
            "page": 94,
            "focusKeywords": [
                "ca-t",
                "ca-h",
                "exist",
                "found",
                "place"
            ],
            "digest": "local case or subrule under §11.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "11.5.1.a",
            "ref": "Andrews Lesson 11.5.1.a",
            "itemKind": "lettered item",
            "page": 94,
            "focusKeywords": [
                "tenses",
                "imperfective",
                "traditional",
                "spelling"
            ],
            "digest": "local case or subrule under §11.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "11.5.1.i",
            "ref": "Andrews Lesson 11.5.1.i",
            "itemKind": "lettered item",
            "page": 95,
            "focusKeywords": [
                "customary-present",
                "tense"
            ],
            "digest": "local case or subrule under §11.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "11.5.1.i.ii",
            "ref": "Andrews Lesson 11.5.1.i.ii",
            "itemKind": "roman item",
            "page": 95,
            "focusKeywords": [
                "imperfect",
                "tense"
            ],
            "digest": "local case or subrule under §11.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "11.5.1.i.iii",
            "ref": "Andrews Lesson 11.5.1.i.iii",
            "itemKind": "roman item",
            "page": 95,
            "focusKeywords": [
                "future",
                "tense"
            ],
            "digest": "local case or subrule under §11.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "11.5.1.i.iv",
            "ref": "Andrews Lesson 11.5.1.i.iv",
            "itemKind": "roman item",
            "page": 95,
            "focusKeywords": [
                "nonpast",
                "optative",
                "shown",
                "wish",
                "command",
                "exhortation"
            ],
            "digest": "local case or subrule under §11.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "11.5.1.v",
            "ref": "Andrews Lesson 11.5.1.v",
            "itemKind": "lettered item",
            "page": 95,
            "focusKeywords": [
                "past",
                "optative",
                "shown",
                "wish",
                "sentences"
            ],
            "digest": "local case or subrule under §11.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "11.5.1.b",
            "ref": "Andrews Lesson 11.5.1.b",
            "itemKind": "lettered item",
            "page": 95,
            "focusKeywords": [
                "use",
                "perfective",
                "simple-stemmed",
                "occurs"
            ],
            "digest": "local case or subrule under §11.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "11.5.1.c",
            "ref": "Andrews Lesson 11.5.1.c",
            "itemKind": "lettered item",
            "page": 95,
            "focusKeywords": [
                "tenses",
                "perfective",
                "ca-t",
                "ca-h",
                "irregu"
            ],
            "digest": "local case or subrule under §11.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "11.5.2",
            "ref": "Andrews Lesson 11.5.2",
            "itemKind": "numbered item",
            "page": 96,
            "focusKeywords": [
                "ya-uh",
                "hui",
                "yah",
                "verb"
            ],
            "digest": "local case or subrule under §11.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "11.5.2.a",
            "ref": "Andrews Lesson 11.5.2.a",
            "itemKind": "lettered item",
            "page": 96,
            "focusKeywords": [
                "tenses",
                "ya-uh",
                "hui"
            ],
            "digest": "local case or subrule under §11.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "11.5.2.i",
            "ref": "Andrews Lesson 11.5.2.i",
            "itemKind": "lettered item",
            "page": 96,
            "focusKeywords": [
                "present-indicative",
                "tense"
            ],
            "digest": "local case or subrule under §11.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "11.5.2.i.ii",
            "ref": "Andrews Lesson 11.5.2.i.ii",
            "itemKind": "roman item",
            "page": 96,
            "focusKeywords": [
                "nonpast",
                "optative",
                "tense",
                "since",
                "hui",
                "does"
            ],
            "digest": "local case or subrule under §11.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "11.5.2.i.iii",
            "ref": "Andrews Lesson 11.5.2.i.iii",
            "itemKind": "roman item",
            "page": 97,
            "focusKeywords": [
                "distant-past",
                "as-past",
                "indicative",
                "tense",
                "since",
                "perfective"
            ],
            "digest": "local case or subrule under §11.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "11.5.2.b",
            "ref": "Andrews Lesson 11.5.2.b",
            "itemKind": "lettered item",
            "page": 97,
            "focusKeywords": [
                "tenses",
                "imperfective",
                "irregularity"
            ],
            "digest": "local case or subrule under §11.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "11.5.2.i.iv",
            "ref": "Andrews Lesson 11.5.2.i.iv",
            "itemKind": "roman item",
            "page": 97,
            "focusKeywords": [
                "past",
                "optative",
                "forms",
                "shown",
                "wish",
                "sentences"
            ],
            "digest": "local case or subrule under §11.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "11.5.2.c",
            "ref": "Andrews Lesson 11.5.2.c",
            "itemKind": "lettered item",
            "page": 97,
            "focusKeywords": [
                "perfective",
                "yah",
                "fully",
                "regular",
                "showing",
                "preterit-tense"
            ],
            "digest": "local case or subrule under §11.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "11.5.3",
            "ref": "Andrews Lesson 11.5.3",
            "itemKind": "numbered item",
            "page": 98,
            "focusKeywords": [
                "hual-la",
                "hual-hui",
                "hual-lah",
                "come",
                "verb"
            ],
            "digest": "local case or subrule under §11.5, verify exact examples and boundaries in the PDF."
        }
    ],
    "12.3": [
        {
            "id": "12.3.1",
            "ref": "Andrews Lesson 12.3.1",
            "itemKind": "numbered item",
            "page": 100,
            "focusKeywords": [
                "subject",
                "spers",
                "andpers",
                "subpositions",
                "exactly",
                "same"
            ],
            "digest": "local case or subrule under §12.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "12.3.2",
            "ref": "Andrews Lesson 12.3.2",
            "itemKind": "numbered item",
            "page": 100,
            "focusKeywords": [
                "just",
                "subject",
                "pronoun",
                "num1",
                "subposition",
                "locus"
            ],
            "digest": "local case or subrule under §12.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "12.3.2.a",
            "ref": "Andrews Lesson 12.3.2.a",
            "itemKind": "lettered item",
            "page": 101,
            "focusKeywords": [
                "predicate",
                "absolutive",
                "state",
                "possessor",
                "pronoun"
            ],
            "digest": "local case or subrule under §12.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "12.3.2.b",
            "ref": "Andrews Lesson 12.3.2.b",
            "itemKind": "lettered item",
            "page": 101,
            "focusKeywords": [
                "predicate",
                "absolutive",
                "state",
                "subject",
                "pronoun",
                "shows"
            ],
            "digest": "local case or subrule under §12.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "12.3.2.c",
            "ref": "Andrews Lesson 12.3.2.c",
            "itemKind": "lettered item",
            "page": 101,
            "focusKeywords": [
                "dyadic",
                "fillers",
                "subject",
                "pronoun",
                "number",
                "position"
            ],
            "digest": "local case or subrule under §12.3, verify exact examples and boundaries in the PDF."
        }
    ],
    "13.1": [
        {
            "id": "13.1.1",
            "ref": "Andrews Lesson 13.1.1",
            "itemKind": "numbered item",
            "page": 105,
            "focusKeywords": [
                "monadic",
                "state-position",
                "formula"
            ],
            "digest": "local case or subrule under §13.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "13.1.2",
            "ref": "Andrews Lesson 13.1.2",
            "itemKind": "numbered item",
            "page": 105,
            "focusKeywords": [
                "dyadic",
                "state-position",
                "formula"
            ],
            "digest": "local case or subrule under §13.1, verify exact examples and boundaries in the PDF."
        }
    ],
    "13.2": [
        {
            "id": "13.2.1",
            "ref": "Andrews Lesson 13.2.1",
            "itemKind": "numbered item",
            "page": 105,
            "focusKeywords": [
                "subject",
                "pronoun",
                "pers",
                "morphs",
                "identical"
            ],
            "digest": "local case or subrule under §13.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "13.2.2",
            "ref": "Andrews Lesson 13.2.2",
            "itemKind": "numbered item",
            "page": 105,
            "focusKeywords": [
                "subject",
                "num1",
                "subposition",
                "filled",
                "number-connector",
                "morphic"
            ],
            "digest": "local case or subrule under §13.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "13.2.3",
            "ref": "Andrews Lesson 13.2.3",
            "itemKind": "numbered item",
            "page": 106,
            "focusKeywords": [
                "num2",
                "subposition",
                "morphs"
            ],
            "digest": "local case or subrule under §13.2, verify exact examples and boundaries in the PDF."
        }
    ],
    "13.4": [
        {
            "id": "13.4.1",
            "ref": "Andrews Lesson 13.4.1",
            "itemKind": "numbered item",
            "page": 107,
            "focusKeywords": [
                "reciprocative",
                "possessor",
                "morph",
                "each",
                "other",
                "seen"
            ],
            "digest": "local case or subrule under §13.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "13.4.2",
            "ref": "Andrews Lesson 13.4.2",
            "itemKind": "numbered item",
            "page": 107,
            "focusKeywords": [
                "nonspecific",
                "possessor",
                "morph",
                "like",
                "object",
                "morphs"
            ],
            "digest": "local case or subrule under §13.4, verify exact examples and boundaries in the PDF."
        }
    ],
    "13.5": [
        {
            "id": "13.5.1",
            "ref": "Andrews Lesson 13.5.1",
            "itemKind": "numbered item",
            "page": 107,
            "focusKeywords": [
                "subposition",
                "st1",
                "always",
                "manifests",
                "category",
                "person"
            ],
            "digest": "local case or subrule under §13.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "13.5.1.a",
            "ref": "Andrews Lesson 13.5.1.a",
            "itemKind": "lettered item",
            "page": 107,
            "focusKeywords": [
                "third",
                "person",
                "combined",
                "possessive",
                "sole",
                "morphic"
            ],
            "digest": "local case or subrule under §13.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "13.5.1.b",
            "ref": "Andrews Lesson 13.5.1.b",
            "itemKind": "lettered item",
            "page": 107,
            "focusKeywords": [
                "first",
                "second",
                "persons",
                "person",
                "combined",
                "number"
            ],
            "digest": "local case or subrule under §13.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "13.5.2",
            "ref": "Andrews Lesson 13.5.2",
            "itemKind": "numbered item",
            "page": 107,
            "focusKeywords": [
                "subposition",
                "st2",
                "makes",
                "category",
                "not",
                "contained"
            ],
            "digest": "local case or subrule under §13.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "13.5.2.a",
            "ref": "Andrews Lesson 13.5.2.a",
            "itemKind": "lettered item",
            "page": 107,
            "focusKeywords": [
                "third",
                "person",
                "manifests",
                "number",
                "morphic",
                "fillers"
            ],
            "digest": "local case or subrule under §13.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "13.5.2.b",
            "ref": "Andrews Lesson 13.5.2.b",
            "itemKind": "lettered item",
            "page": 107,
            "focusKeywords": [
                "first",
                "second",
                "persons",
                "manifests",
                "possessive",
                "morphic"
            ],
            "digest": "local case or subrule under §13.5, verify exact examples and boundaries in the PDF."
        }
    ],
    "14.1": [
        {
            "id": "14.1.8",
            "ref": "Andrews Lesson 14.1.8",
            "itemKind": "referenced subsection",
            "page": 261,
            "focusKeywords": [
                "referenced internally; pypdf did not expose a clean item boundary"
            ],
            "digest": "local case or subrule under §14.1, verify exact examples and boundaries in the PDF."
        }
    ],
    "14.2": [
        {
            "id": "14.2.1",
            "ref": "Andrews Lesson 14.2.1",
            "itemKind": "numbered item",
            "page": 109,
            "focusKeywords": [
                "membership",
                "class",
                "not",
                "predictable",
                "must",
                "learned"
            ],
            "digest": "local case or subrule under §14.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "14.2.2",
            "ref": "Andrews Lesson 14.2.2",
            "itemKind": "numbered item",
            "page": 109,
            "focusKeywords": [
                "always",
                "ends",
                "vowel",
                "both",
                "tli",
                "end"
            ],
            "digest": "local case or subrule under §14.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "14.2.3",
            "ref": "Andrews Lesson 14.2.3",
            "itemKind": "numbered item",
            "page": 109,
            "focusKeywords": [
                "take",
                "filler",
                "absolutive-state",
                "not",
                "constitute",
                "separate"
            ],
            "digest": "local case or subrule under §14.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "14.2.4",
            "ref": "Andrews Lesson 14.2.4",
            "itemKind": "numbered item",
            "page": 110,
            "focusKeywords": [
                "difference",
                "between",
                "tli",
                "class",
                "membership",
                "merely"
            ],
            "digest": "local case or subrule under §14.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "14.2.5",
            "ref": "Andrews Lesson 14.2.5",
            "itemKind": "numbered item",
            "page": 110,
            "focusKeywords": [
                "members",
                "classes",
                "not",
                "very",
                "numerous"
            ],
            "digest": "local case or subrule under §14.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "14.2.6",
            "ref": "Andrews Lesson 14.2.6",
            "itemKind": "numbered item",
            "page": 110,
            "focusKeywords": [
                "certain",
                "permit",
                "alternative",
                "class",
                "membership",
                "change"
            ],
            "digest": "local case or subrule under §14.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "14.2.7",
            "ref": "Andrews Lesson 14.2.7",
            "itemKind": "numbered item",
            "page": 110,
            "focusKeywords": [
                "citation",
                "begins",
                "supportive",
                "vowel",
                "variants"
            ],
            "digest": "local case or subrule under §14.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "14.2.8",
            "ref": "Andrews Lesson 14.2.8",
            "itemKind": "numbered item",
            "page": 110,
            "focusKeywords": [
                "depending",
                "their",
                "class",
                "usage",
                "general-use",
                "appear"
            ],
            "digest": "local case or subrule under §14.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "14.2.8.c",
            "ref": "Andrews Lesson 14.2.8.c",
            "itemKind": "referenced subsection",
            "page": 283,
            "focusKeywords": [
                "referenced internally; pypdf did not expose a clean item boundary"
            ],
            "digest": "local case or subrule under §14.2, verify exact examples and boundaries in the PDF."
        }
    ],
    "14.3": [
        {
            "id": "14.3.1",
            "ref": "Andrews Lesson 14.3.1",
            "itemKind": "numbered item",
            "page": 110,
            "focusKeywords": [
                "affinity",
                "need",
                "point",
                "special",
                "cohesiveness",
                "brother"
            ],
            "digest": "local case or subrule under §14.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "14.3.2",
            "ref": "Andrews Lesson 14.3.2",
            "itemKind": "numbered item",
            "page": 111,
            "focusKeywords": [
                "distributive",
                "varietal",
                "members",
                "group",
                "con"
            ],
            "digest": "local case or subrule under §14.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "14.3.3",
            "ref": "Andrews Lesson 14.3.3",
            "itemKind": "numbered item",
            "page": 112,
            "focusKeywords": [
                "subject",
                "pronoun",
                "refers",
                "than",
                "entity",
                "plain"
            ],
            "digest": "local case or subrule under §14.3, verify exact examples and boundaries in the PDF."
        }
    ],
    "14.5": [
        {
            "id": "14.5.1",
            "ref": "Andrews Lesson 14.5.1",
            "itemKind": "numbered item",
            "page": 112,
            "focusKeywords": [
                "plain",
                "choice",
                "morphic",
                "filler",
                "subject",
                "num1"
            ],
            "digest": "local case or subrule under §14.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "14.5.1.a",
            "ref": "Andrews Lesson 14.5.1.a",
            "itemKind": "lettered item",
            "page": 112,
            "focusKeywords": [
                "ti-class",
                "num1",
                "filler",
                "usually",
                "but",
                "occasionally"
            ],
            "digest": "local case or subrule under §14.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "14.5.1.b",
            "ref": "Andrews Lesson 14.5.1.b",
            "itemKind": "lettered item",
            "page": 112,
            "focusKeywords": [
                "belonging",
                "tli",
                "class",
                "num1",
                "filler",
                "either"
            ],
            "digest": "local case or subrule under §14.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "14.5.1.i",
            "ref": "Andrews Lesson 14.5.1.i",
            "itemKind": "lettered item",
            "page": 112,
            "focusKeywords": [
                "examples",
                "tli"
            ],
            "digest": "local case or subrule under §14.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "14.5.1.i.ii",
            "ref": "Andrews Lesson 14.5.1.i.ii",
            "itemKind": "roman item",
            "page": 113,
            "focusKeywords": [
                "examples"
            ],
            "digest": "local case or subrule under §14.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "14.5.1.i.iii",
            "ref": "Andrews Lesson 14.5.1.i.iii",
            "itemKind": "roman item",
            "page": 113,
            "focusKeywords": [
                "examples"
            ],
            "digest": "local case or subrule under §14.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "14.5.2",
            "ref": "Andrews Lesson 14.5.2",
            "itemKind": "numbered item",
            "page": 113,
            "focusKeywords": [
                "affinity",
                "use",
                "obligatory",
                "certain",
                "nominal"
            ],
            "digest": "local case or subrule under §14.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "14.5.2.a",
            "ref": "Andrews Lesson 14.5.2.a",
            "itemKind": "lettered item",
            "page": 113,
            "focusKeywords": [
                "belongs",
                "class",
                "affinity",
                "infrequently"
            ],
            "digest": "local case or subrule under §14.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "14.5.2.b",
            "ref": "Andrews Lesson 14.5.2.b",
            "itemKind": "lettered item",
            "page": 113,
            "focusKeywords": [
                "belongs",
                "tli",
                "class",
                "affinity"
            ],
            "digest": "local case or subrule under §14.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "14.5.2.i",
            "ref": "Andrews Lesson 14.5.2.i",
            "itemKind": "lettered item",
            "page": 113,
            "focusKeywords": [
                "examples",
                "t1i"
            ],
            "digest": "local case or subrule under §14.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "14.5.2.i.ii",
            "ref": "Andrews Lesson 14.5.2.i.ii",
            "itemKind": "roman item",
            "page": 113,
            "focusKeywords": [
                "examples"
            ],
            "digest": "local case or subrule under §14.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "14.5.3",
            "ref": "Andrews Lesson 14.5.3",
            "itemKind": "numbered item",
            "page": 114,
            "focusKeywords": [
                "distributive",
                "varietal",
                "subject",
                "pronoun",
                "plural",
                "formation"
            ],
            "digest": "local case or subrule under §14.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "14.5.4",
            "ref": "Andrews Lesson 14.5.4",
            "itemKind": "numbered item",
            "page": 114,
            "focusKeywords": [
                "formation",
                "plural-subject",
                "absolutive-state",
                "been",
                "outlined",
                "above"
            ],
            "digest": "local case or subrule under §14.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "14.5.4.a",
            "ref": "Andrews Lesson 14.5.4.a",
            "itemKind": "lettered item",
            "page": 114,
            "focusKeywords": [
                "possibilities",
                "quimich",
                "mouse"
            ],
            "digest": "local case or subrule under §14.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "14.5.4.b",
            "ref": "Andrews Lesson 14.5.4.b",
            "itemKind": "lettered item",
            "page": 114,
            "focusKeywords": [
                "possibilities",
                "oquich",
                "tli",
                "man",
                "male",
                "being"
            ],
            "digest": "local case or subrule under §14.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "14.5.4.c",
            "ref": "Andrews Lesson 14.5.4.c",
            "itemKind": "lettered item",
            "page": 114,
            "focusKeywords": [
                "possibility",
                "toto",
                "bird"
            ],
            "digest": "local case or subrule under §14.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "14.5.4.d",
            "ref": "Andrews Lesson 14.5.4.d",
            "itemKind": "lettered item",
            "page": 114,
            "focusKeywords": [
                "even",
                "given",
                "permits",
                "alternative",
                "formations",
                "prefer"
            ],
            "digest": "local case or subrule under §14.5, verify exact examples and boundaries in the PDF."
        }
    ],
    "14.7": [
        {
            "id": "14.7.1",
            "ref": "Andrews Lesson 14.7.1",
            "itemKind": "numbered item",
            "page": 115,
            "focusKeywords": [
                "tli",
                "classes",
                "base",
                "shape"
            ],
            "digest": "local case or subrule under §14.7, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "14.7.1.a",
            "ref": "Andrews Lesson 14.7.1.a",
            "itemKind": "lettered item",
            "page": 115,
            "focusKeywords": [
                "class",
                "morphic",
                "filler",
                "subject",
                "num1",
                "subposition"
            ],
            "digest": "local case or subrule under §14.7, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "14.7.1.b",
            "ref": "Andrews Lesson 14.7.1.b",
            "itemKind": "lettered item",
            "page": 115,
            "focusKeywords": [
                "tli",
                "class",
                "morphic",
                "filler",
                "subject",
                "num1"
            ],
            "digest": "local case or subrule under §14.7, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "14.7.1.i",
            "ref": "Andrews Lesson 14.7.1.i",
            "itemKind": "lettered item",
            "page": 115,
            "focusKeywords": [
                "subclass",
                "tli",
                "num1",
                "subposition",
                "almost"
            ],
            "digest": "local case or subrule under §14.7, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "14.7.1.i.ii",
            "ref": "Andrews Lesson 14.7.1.i.ii",
            "itemKind": "roman item",
            "page": 115,
            "focusKeywords": [
                "subclass",
                "tli",
                "hui",
                "num1",
                "subposition",
                "very"
            ],
            "digest": "local case or subrule under §14.7, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "14.7.2",
            "ref": "Andrews Lesson 14.7.2",
            "itemKind": "numbered item",
            "page": 116,
            "focusKeywords": [
                "class",
                "subclasses",
                "they",
                "determined"
            ],
            "digest": "local case or subrule under §14.7, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "14.7.2.a",
            "ref": "Andrews Lesson 14.7.2.a",
            "itemKind": "lettered item",
            "page": 116,
            "focusKeywords": [
                "subclass",
                "subclasses",
                "they",
                "determined",
                "selection"
            ],
            "digest": "local case or subrule under §14.7, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "14.7.2.i",
            "ref": "Andrews Lesson 14.7.2.i",
            "itemKind": "lettered item",
            "page": 116,
            "focusKeywords": [
                "subclass",
                "1-a",
                "morphic",
                "filler",
                "num1",
                "subposition"
            ],
            "digest": "local case or subrule under §14.7, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "14.7.2.i.ii",
            "ref": "Andrews Lesson 14.7.2.i.ii",
            "itemKind": "roman item",
            "page": 117,
            "focusKeywords": [
                "subclass",
                "1-b",
                "morphic",
                "filler",
                "num1"
            ],
            "digest": "local case or subrule under §14.7, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "14.7.2.b",
            "ref": "Andrews Lesson 14.7.2.b",
            "itemKind": "lettered item",
            "page": 117,
            "focusKeywords": [
                "subclass",
                "subclasses",
                "them",
                "use",
                "truncated",
                "gen"
            ],
            "digest": "local case or subrule under §14.7, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "14.7.2.i.iii",
            "ref": "Andrews Lesson 14.7.2.i.iii",
            "itemKind": "roman item",
            "page": 118,
            "focusKeywords": [
                "subclass",
                "2-c",
                "limited-use",
                "ends",
                "ephemeral",
                "short"
            ],
            "digest": "local case or subrule under §14.7, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "14.7.2.b.i",
            "ref": "Andrews Lesson 14.7.2.b.i",
            "itemKind": "referenced subsection",
            "page": 118,
            "focusKeywords": [
                "referenced internally; pypdf did not expose a clean item boundary"
            ],
            "digest": "local case or subrule under §14.7, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "14.7.2.b.ii",
            "ref": "Andrews Lesson 14.7.2.b.ii",
            "itemKind": "referenced subsection",
            "page": 36,
            "focusKeywords": [
                "referenced internally; pypdf did not expose a clean item boundary"
            ],
            "digest": "local case or subrule under §14.7, verify exact examples and boundaries in the PDF."
        }
    ],
    "15.2": [
        {
            "id": "15.2.1",
            "ref": "Andrews Lesson 15.2.1",
            "itemKind": "numbered item",
            "page": 123,
            "focusKeywords": [
                "denoting",
                "certain",
                "types",
                "property"
            ],
            "digest": "local case or subrule under §15.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "15.2.2",
            "ref": "Andrews Lesson 15.2.2",
            "itemKind": "numbered item",
            "page": 123,
            "focusKeywords": [
                "denoting",
                "kinship",
                "certain",
                "other",
                "human",
                "relations"
            ],
            "digest": "local case or subrule under §15.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "15.2.3",
            "ref": "Andrews Lesson 15.2.3",
            "itemKind": "numbered item",
            "page": 124,
            "focusKeywords": [
                "denoting",
                "parts",
                "body"
            ],
            "digest": "local case or subrule under §15.2, verify exact examples and boundaries in the PDF."
        }
    ],
    "16.3": [
        {
            "id": "16.3.1",
            "ref": "Andrews Lesson 16.3.1",
            "itemKind": "numbered item",
            "page": 126,
            "focusKeywords": [
                "simple",
                "variant",
                "shapes",
                "yeh",
                "latter"
            ],
            "digest": "local case or subrule under §16.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "16.3.2",
            "ref": "Andrews Lesson 16.3.2",
            "itemKind": "numbered item",
            "page": 127,
            "focusKeywords": [
                "compound",
                "also",
                "shapes",
                "eh-hua",
                "yeh-hua",
                "lat"
            ],
            "digest": "local case or subrule under §16.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "16.3.2.a",
            "ref": "Andrews Lesson 16.3.2.a",
            "itemKind": "lettered item",
            "page": 127,
            "focusKeywords": [
                "illustrate",
                "sounded",
                "filler",
                "num1"
            ],
            "digest": "local case or subrule under §16.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "16.3.2.b",
            "ref": "Andrews Lesson 16.3.2.b",
            "itemKind": "lettered item",
            "page": 128,
            "focusKeywords": [
                "morphic",
                "filler",
                "subposition",
                "num",
                "plural",
                "subject"
            ],
            "digest": "local case or subrule under §16.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "16.3.2.c",
            "ref": "Andrews Lesson 16.3.2.c",
            "itemKind": "lettered item",
            "page": 128,
            "focusKeywords": [
                "sentences",
                "exemplify",
                "personal-pronominal",
                "modified"
            ],
            "digest": "local case or subrule under §16.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "16.3.2.d",
            "ref": "Andrews Lesson 16.3.2.d",
            "itemKind": "lettered item",
            "page": 128,
            "focusKeywords": [
                "personal-pronominal",
                "first-person",
                "plural",
                "subject",
                "pronoun",
                "but"
            ],
            "digest": "local case or subrule under §16.3, verify exact examples and boundaries in the PDF."
        }
    ],
    "16.4": [
        {
            "id": "16.4.1",
            "ref": "Andrews Lesson 16.4.1",
            "itemKind": "numbered item",
            "page": 129,
            "focusKeywords": [
                "tl-eh",
                "what",
                "entity",
                "combination",
                "pre"
            ],
            "digest": "local case or subrule under §16.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "16.4.2",
            "ref": "Andrews Lesson 16.4.2",
            "itemKind": "numbered item",
            "page": 129,
            "focusKeywords": [
                "tl-eh",
                "hua",
                "what",
                "entity",
                "compare"
            ],
            "digest": "local case or subrule under §16.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "16.4.3",
            "ref": "Andrews Lesson 16.4.3",
            "itemKind": "numbered item",
            "page": 129,
            "focusKeywords": [
                "which",
                "entity",
                "interrogative",
                "pronominal",
                "occurs",
                "sev"
            ],
            "digest": "local case or subrule under §16.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "16.4.4",
            "ref": "Andrews Lesson 16.4.4",
            "itemKind": "numbered item",
            "page": 130,
            "focusKeywords": [
                "a-0",
                "what",
                "person",
                "who",
                "structure",
                "discussed"
            ],
            "digest": "local case or subrule under §16.4, verify exact examples and boundaries in the PDF."
        }
    ],
    "16.6": [
        {
            "id": "16.6.1",
            "ref": "Andrews Lesson 16.6.1",
            "itemKind": "numbered item",
            "page": 131,
            "focusKeywords": [
                "a-c",
                "someone",
                "who",
                "see"
            ],
            "digest": "local case or subrule under §16.6, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "16.6.2",
            "ref": "Andrews Lesson 16.6.2",
            "itemKind": "numbered item",
            "page": 131,
            "focusKeywords": [
                "itl-ah",
                "something",
                "embedded",
                "constituent",
                "itl",
                "related"
            ],
            "digest": "local case or subrule under §16.6, verify exact examples and boundaries in the PDF."
        }
    ],
    "16.8": [
        {
            "id": "16.8.1",
            "ref": "Andrews Lesson 16.8.1",
            "itemKind": "numbered item",
            "page": 132,
            "focusKeywords": [
                "ix-qui",
                "total",
                "amount",
                "quantity"
            ],
            "digest": "local case or subrule under §16.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "16.8.2",
            "ref": "Andrews Lesson 16.8.2",
            "itemKind": "numbered item",
            "page": 132,
            "focusKeywords": [
                "que-x",
                "qui-ch",
                "how",
                "large",
                "total",
                "amount"
            ],
            "digest": "local case or subrule under §16.8, verify exact examples and boundaries in the PDF."
        }
    ],
    "16.9": [
        {
            "id": "16.9.1",
            "ref": "Andrews Lesson 16.9.1",
            "itemKind": "numbered item",
            "page": 133,
            "focusKeywords": [
                "miya-qui",
                "miya-c",
                "miye-qui",
                "miye-c",
                "abundant",
                "amount"
            ],
            "digest": "local case or subrule under §16.9, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "16.9.2",
            "ref": "Andrews Lesson 16.9.2",
            "itemKind": "numbered item",
            "page": 133,
            "focusKeywords": [
                "ce-qui",
                "ce-c",
                "certain",
                "amount",
                "number",
                "part"
            ],
            "digest": "local case or subrule under §16.9, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "16.9.3",
            "ref": "Andrews Lesson 16.9.3",
            "itemKind": "numbered item",
            "page": 134,
            "focusKeywords": [
                "iz-qui",
                "equal",
                "amount",
                "number",
                "much",
                "many"
            ],
            "digest": "local case or subrule under §16.9, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "16.9.4",
            "ref": "Andrews Lesson 16.9.4",
            "itemKind": "numbered item",
            "page": 134,
            "focusKeywords": [
                "que-z",
                "qui",
                "how",
                "large",
                "full",
                "number"
            ],
            "digest": "local case or subrule under §16.9, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "16.9.5",
            "ref": "Andrews Lesson 16.9.5",
            "itemKind": "numbered item",
            "page": 134,
            "focusKeywords": [
                "a-qui",
                "small",
                "amount",
                "number",
                "few"
            ],
            "digest": "local case or subrule under §16.9, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "16.9.6",
            "ref": "Andrews Lesson 16.9.6",
            "itemKind": "numbered item",
            "page": 134,
            "focusKeywords": [
                "a-chi",
                "small",
                "amount",
                "quantity",
                "little"
            ],
            "digest": "local case or subrule under §16.9, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "16.9.7",
            "ref": "Andrews Lesson 16.9.7",
            "itemKind": "numbered item",
            "page": 134,
            "focusKeywords": [
                "mo-chi",
                "mo-ch",
                "full",
                "amount",
                "number"
            ],
            "digest": "local case or subrule under §16.9, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "16.9.8",
            "ref": "Andrews Lesson 16.9.8",
            "itemKind": "numbered item",
            "page": 135,
            "focusKeywords": [
                "ix-a",
                "chi",
                "very",
                "large",
                "amount",
                "number"
            ],
            "digest": "local case or subrule under §16.9, verify exact examples and boundaries in the PDF."
        }
    ],
    "17.3": [
        {
            "id": "17.3.1",
            "ref": "Andrews Lesson 17.3.1",
            "itemKind": "numbered item",
            "page": 137,
            "focusKeywords": [
                "supplementary",
                "subject",
                "personal-pronoun",
                "adjunct",
                "refers",
                "same"
            ],
            "digest": "local case or subrule under §17.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "17.3.2",
            "ref": "Andrews Lesson 17.3.2",
            "itemKind": "numbered item",
            "page": 138,
            "focusKeywords": [
                "supplementary",
                "object",
                "personal-pronoun",
                "subject",
                "adjunct",
                "refers"
            ],
            "digest": "local case or subrule under §17.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "17.3.3",
            "ref": "Andrews Lesson 17.3.3",
            "itemKind": "numbered item",
            "page": 139,
            "focusKeywords": [
                "supplementary",
                "possessor",
                "personal-pronoun",
                "subject",
                "adjunct",
                "refers"
            ],
            "digest": "local case or subrule under §17.3, verify exact examples and boundaries in the PDF."
        }
    ],
    "17.4": [
        {
            "id": "17.4.1",
            "ref": "Andrews Lesson 17.4.1",
            "itemKind": "numbered item",
            "page": 139,
            "focusKeywords": [
                "adjunctive",
                "transformation",
                "recursive",
                "carried",
                "out",
                "again"
            ],
            "digest": "local case or subrule under §17.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "17.4.2",
            "ref": "Andrews Lesson 17.4.2",
            "itemKind": "numbered item",
            "page": 140,
            "focusKeywords": [
                "since",
                "point",
                "contact",
                "between",
                "supplement",
                "head"
            ],
            "digest": "local case or subrule under §17.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "17.4.3",
            "ref": "Andrews Lesson 17.4.3",
            "itemKind": "numbered item",
            "page": 140,
            "focusKeywords": [
                "demonstrative",
                "pronominal",
                "function",
                "supplementary",
                "elements"
            ],
            "digest": "local case or subrule under §17.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "17.4.4",
            "ref": "Andrews Lesson 17.4.4",
            "itemKind": "numbered item",
            "page": 140,
            "focusKeywords": [
                "since",
                "shared-referent",
                "contact",
                "between",
                "nuclear",
                "made"
            ],
            "digest": "local case or subrule under §17.4, verify exact examples and boundaries in the PDF."
        }
    ],
    "19.1": [
        {
            "id": "19.1.1",
            "ref": "Andrews Lesson 19.1.1",
            "itemKind": "numbered item",
            "page": 149,
            "focusKeywords": [
                "supplementary",
                "subject"
            ],
            "digest": "local case or subrule under §19.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "19.1.2",
            "ref": "Andrews Lesson 19.1.2",
            "itemKind": "numbered item",
            "page": 150,
            "focusKeywords": [
                "supplementary",
                "object"
            ],
            "digest": "local case or subrule under §19.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "19.1.3",
            "ref": "Andrews Lesson 19.1.3",
            "itemKind": "numbered item",
            "page": 150,
            "focusKeywords": [
                "supplementary",
                "possessor"
            ],
            "digest": "local case or subrule under §19.1, verify exact examples and boundaries in the PDF."
        }
    ],
    "19.2": [
        {
            "id": "19.2.1",
            "ref": "Andrews Lesson 19.2.1",
            "itemKind": "numbered item",
            "page": 151,
            "focusKeywords": [
                "pluralization",
                "demonstrative",
                "pronominal"
            ],
            "digest": "local case or subrule under §19.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "19.2.2",
            "ref": "Andrews Lesson 19.2.2",
            "itemKind": "numbered item",
            "page": 151,
            "focusKeywords": [
                "pluralization",
                "interrogative",
                "pronominal",
                "preterit-as"
            ],
            "digest": "local case or subrule under §19.2, verify exact examples and boundaries in the PDF."
        }
    ],
    "19.3": [
        {
            "id": "19.3.1",
            "ref": "Andrews Lesson 19.3.1",
            "itemKind": "numbered item",
            "page": 153,
            "focusKeywords": [
                "principal"
            ],
            "digest": "local case or subrule under §19.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "19.3.2",
            "ref": "Andrews Lesson 19.3.2",
            "itemKind": "numbered item",
            "page": 153,
            "focusKeywords": [
                "intransitive",
                "principal"
            ],
            "digest": "local case or subrule under §19.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "19.3.3",
            "ref": "Andrews Lesson 19.3.3",
            "itemKind": "numbered item",
            "page": 154,
            "focusKeywords": [
                "transitive",
                "principal",
                "convenient",
                "separate",
                "occurring"
            ],
            "digest": "local case or subrule under §19.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "19.3.3.a",
            "ref": "Andrews Lesson 19.3.3.a",
            "itemKind": "lettered item",
            "page": 154,
            "focusKeywords": [
                "saying",
                "questioning",
                "etc",
                "adjoined",
                "sentence",
                "represent"
            ],
            "digest": "local case or subrule under §19.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "19.3.3.b",
            "ref": "Andrews Lesson 19.3.3.b",
            "itemKind": "lettered item",
            "page": 155,
            "focusKeywords": [
                "causing"
            ],
            "digest": "local case or subrule under §19.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "19.3.3.c",
            "ref": "Andrews Lesson 19.3.3.c",
            "itemKind": "lettered item",
            "page": 155,
            "focusKeywords": [
                "wanting",
                "desiring",
                "needing",
                "wish",
                "etc",
                "realizable"
            ],
            "digest": "local case or subrule under §19.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "19.3.3.d",
            "ref": "Andrews Lesson 19.3.3.d",
            "itemKind": "lettered item",
            "page": 156,
            "focusKeywords": [
                "perception",
                "adjoined",
                "normally",
                "present"
            ],
            "digest": "local case or subrule under §19.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "19.3.3.e",
            "ref": "Andrews Lesson 19.3.3.e",
            "itemKind": "lettered item",
            "page": 156,
            "focusKeywords": [
                "knowing",
                "remembering",
                "forgetting",
                "etc"
            ],
            "digest": "local case or subrule under §19.3, verify exact examples and boundaries in the PDF."
        }
    ],
    "20.2": [
        {
            "id": "20.2.1",
            "ref": "Andrews Lesson 20.2.1",
            "itemKind": "numbered item",
            "page": 160,
            "focusKeywords": [
                "class"
            ],
            "digest": "local case or subrule under §20.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "20.2.2",
            "ref": "Andrews Lesson 20.2.2",
            "itemKind": "numbered item",
            "page": 161,
            "focusKeywords": [
                "class"
            ],
            "digest": "local case or subrule under §20.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "20.2.3",
            "ref": "Andrews Lesson 20.2.3",
            "itemKind": "numbered item",
            "page": 161,
            "focusKeywords": [
                "class",
                "base-final",
                "phonemes",
                "fol",
                "become",
                "long"
            ],
            "digest": "local case or subrule under §20.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "20.2.4",
            "ref": "Andrews Lesson 20.2.4",
            "itemKind": "numbered item",
            "page": 161,
            "focusKeywords": [
                "class",
                "formation",
                "exceptional",
                "stem-final",
                "reduced-long"
            ],
            "digest": "local case or subrule under §20.2, verify exact examples and boundaries in the PDF."
        }
    ],
    "21.2": [
        {
            "id": "21.2.1",
            "ref": "Andrews Lesson 21.2.1",
            "itemKind": "numbered item",
            "page": 166,
            "focusKeywords": [
                "active",
                "single",
                "specific",
                "projective",
                "object",
                "passive"
            ],
            "digest": "local case or subrule under §21.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "21.2.2",
            "ref": "Andrews Lesson 21.2.2",
            "itemKind": "numbered item",
            "page": 166,
            "focusKeywords": [
                "active",
                "single",
                "specific",
                "reflexive",
                "object",
                "passive"
            ],
            "digest": "local case or subrule under §21.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "21.2.3",
            "ref": "Andrews Lesson 21.2.3",
            "itemKind": "numbered item",
            "page": 166,
            "focusKeywords": [
                "active",
                "objects",
                "reflexive",
                "other",
                "specific",
                "projective"
            ],
            "digest": "local case or subrule under §21.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "21.2.4",
            "ref": "Andrews Lesson 21.2.4",
            "itemKind": "numbered item",
            "page": 167,
            "focusKeywords": [
                "active",
                "specific",
                "projective-object",
                "pronouns",
                "passive",
                "transform"
            ],
            "digest": "local case or subrule under §21.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "21.2.5",
            "ref": "Andrews Lesson 21.2.5",
            "itemKind": "numbered item",
            "page": 168,
            "focusKeywords": [
                "active",
                "projective",
                "objects",
                "which",
                "specific",
                "passive"
            ],
            "digest": "local case or subrule under §21.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "21.2.6",
            "ref": "Andrews Lesson 21.2.6",
            "itemKind": "numbered item",
            "page": 168,
            "focusKeywords": [
                "active",
                "object",
                "pronouns",
                "see",
                "passive",
                "transform"
            ],
            "digest": "local case or subrule under §21.2, verify exact examples and boundaries in the PDF."
        }
    ],
    "22.4": [
        {
            "id": "22.4.1",
            "ref": "Andrews Lesson 22.4.1",
            "itemKind": "numbered item",
            "page": 172,
            "focusKeywords": [
                "examples",
                "show",
                "relationship",
                "between",
                "intransitive",
                "active-voice"
            ],
            "digest": "local case or subrule under §22.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "22.4.2",
            "ref": "Andrews Lesson 22.4.2",
            "itemKind": "numbered item",
            "page": 173,
            "focusKeywords": [
                "examples",
                "show",
                "relationship",
                "between",
                "transitive",
                "active-voice"
            ],
            "digest": "local case or subrule under §22.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "22.4.3",
            "ref": "Andrews Lesson 22.4.3",
            "itemKind": "numbered item",
            "page": 173,
            "focusKeywords": [
                "generated",
                "active-voice",
                "transitive",
                "reflexive-object",
                "pro"
            ],
            "digest": "local case or subrule under §22.4, verify exact examples and boundaries in the PDF."
        }
    ],
    "23.2": [
        {
            "id": "23.2.1",
            "ref": "Andrews Lesson 23.2.1",
            "itemKind": "numbered item",
            "page": 177,
            "focusKeywords": [
                "intransitive"
            ],
            "digest": "local case or subrule under §23.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "23.2.1.a",
            "ref": "Andrews Lesson 23.2.1.a",
            "itemKind": "lettered item",
            "page": 177,
            "focusKeywords": [
                "local structural detail"
            ],
            "digest": "local case or subrule under §23.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "23.2.2",
            "ref": "Andrews Lesson 23.2.2",
            "itemKind": "numbered item",
            "page": 178,
            "focusKeywords": [
                "directive"
            ],
            "digest": "local case or subrule under §23.2, verify exact examples and boundaries in the PDF."
        }
    ],
    "23.3": [
        {
            "id": "23.3.1",
            "ref": "Andrews Lesson 23.3.1",
            "itemKind": "numbered item",
            "page": 178,
            "focusKeywords": [
                "same",
                "rule",
                "fundamental",
                "single-object",
                "transitive",
                "formula"
            ],
            "digest": "local case or subrule under §23.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "23.3.2",
            "ref": "Andrews Lesson 23.3.2",
            "itemKind": "numbered item",
            "page": 178,
            "focusKeywords": [
                "reflexive",
                "object",
                "pronoun",
                "mainline",
                "shape",
                "n-o"
            ],
            "digest": "local case or subrule under §23.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "23.3.3",
            "ref": "Andrews Lesson 23.3.3",
            "itemKind": "numbered item",
            "page": 179,
            "focusKeywords": [
                "derived",
                "built",
                "causative",
                "suffixes",
                "applicative",
                "ones"
            ],
            "digest": "local case or subrule under §23.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "23.3.4",
            "ref": "Andrews Lesson 23.3.4",
            "itemKind": "numbered item",
            "page": 179,
            "focusKeywords": [
                "rightward",
                "sequence",
                "suffixes",
                "rigidly",
                "reflects",
                "derivational"
            ],
            "digest": "local case or subrule under §23.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "23.3.5",
            "ref": "Andrews Lesson 23.3.5",
            "itemKind": "numbered item",
            "page": 179,
            "focusKeywords": [
                "specific",
                "projective",
                "object",
                "pronouns",
                "incompatible",
                "therefore"
            ],
            "digest": "local case or subrule under §23.3, verify exact examples and boundaries in the PDF."
        }
    ],
    "23.5": [
        {
            "id": "23.5.1",
            "ref": "Andrews Lesson 23.5.1",
            "itemKind": "numbered item",
            "page": 180,
            "focusKeywords": [
                "specific",
                "projective",
                "before",
                "reflexive"
            ],
            "digest": "local case or subrule under §23.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "23.5.2",
            "ref": "Andrews Lesson 23.5.2",
            "itemKind": "numbered item",
            "page": 180,
            "focusKeywords": [
                "specific",
                "projective",
                "before",
                "nonspecific"
            ],
            "digest": "local case or subrule under §23.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "23.5.3",
            "ref": "Andrews Lesson 23.5.3",
            "itemKind": "numbered item",
            "page": 180,
            "focusKeywords": [
                "reflexive",
                "before",
                "nonspecific",
                "projective"
            ],
            "digest": "local case or subrule under §23.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "23.5.4",
            "ref": "Andrews Lesson 23.5.4",
            "itemKind": "numbered item",
            "page": 180,
            "focusKeywords": [
                "human",
                "before",
                "nonhuman",
                "tla"
            ],
            "digest": "local case or subrule under §23.5, verify exact examples and boundaries in the PDF."
        }
    ],
    "24.2": [
        {
            "id": "24.2.1",
            "ref": "Andrews Lesson 24.2.1",
            "itemKind": "numbered item",
            "page": 183,
            "focusKeywords": [
                "stem-final",
                "vowel",
                "valence-neutral",
                "ends",
                "transitive",
                "nor"
            ],
            "digest": "local case or subrule under §24.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "24.2.2",
            "ref": "Andrews Lesson 24.2.2",
            "itemKind": "numbered item",
            "page": 183,
            "focusKeywords": [
                "stem-final",
                "vowel",
                "valence-neutral",
                "transitive",
                "also",
                "usually"
            ],
            "digest": "local case or subrule under §24.2, verify exact examples and boundaries in the PDF."
        }
    ],
    "24.3": [
        {
            "id": "24.3.1",
            "ref": "Andrews Lesson 24.3.1",
            "itemKind": "numbered item",
            "page": 184,
            "focusKeywords": [
                "intransitive",
                "ends",
                "derivation",
                "takes",
                "place",
                "either"
            ],
            "digest": "local case or subrule under §24.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "24.3.1.a",
            "ref": "Andrews Lesson 24.3.1.a",
            "itemKind": "lettered item",
            "page": 184,
            "focusKeywords": [
                "derivation",
                "takes",
                "place",
                "replacement",
                "causative",
                "added"
            ],
            "digest": "local case or subrule under §24.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "24.3.1.b",
            "ref": "Andrews Lesson 24.3.1.b",
            "itemKind": "lettered item",
            "page": 184,
            "focusKeywords": [
                "derivation",
                "takes",
                "place",
                "addition",
                "causative",
                "added"
            ],
            "digest": "local case or subrule under §24.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "24.3.2",
            "ref": "Andrews Lesson 24.3.2",
            "itemKind": "numbered item",
            "page": 185,
            "focusKeywords": [
                "intransitive",
                "ends",
                "type-one",
                "causative",
                "derivation",
                "takes"
            ],
            "digest": "local case or subrule under §24.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "24.3.2.a",
            "ref": "Andrews Lesson 24.3.2.a",
            "itemKind": "lettered item",
            "page": 185,
            "focusKeywords": [
                "certain",
                "intransitive",
                "ending",
                "not",
                "part",
                "morpheme"
            ],
            "digest": "local case or subrule under §24.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "24.3.2.b",
            "ref": "Andrews Lesson 24.3.2.b",
            "itemKind": "lettered item",
            "page": 185,
            "focusKeywords": [
                "certain",
                "intransitive",
                "end",
                "part",
                "derivational",
                "suffix"
            ],
            "digest": "local case or subrule under §24.3, verify exact examples and boundaries in the PDF."
        }
    ],
    "24.5": [
        {
            "id": "24.5.1",
            "ref": "Andrews Lesson 24.5.1",
            "itemKind": "numbered item",
            "page": 186,
            "focusKeywords": [
                "stock",
                "formative",
                "short",
                "vowel",
                "root"
            ],
            "digest": "local case or subrule under §24.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "24.5.2",
            "ref": "Andrews Lesson 24.5.2",
            "itemKind": "numbered item",
            "page": 186,
            "focusKeywords": [
                "stock",
                "formative",
                "short",
                "vowel",
                "root"
            ],
            "digest": "local case or subrule under §24.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "24.5.3",
            "ref": "Andrews Lesson 24.5.3",
            "itemKind": "numbered item",
            "page": 186,
            "focusKeywords": [
                "stock",
                "formative",
                "short",
                "fol",
                "vowel",
                "root"
            ],
            "digest": "local case or subrule under §24.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "24.5.4",
            "ref": "Andrews Lesson 24.5.4",
            "itemKind": "numbered item",
            "page": 187,
            "focusKeywords": [
                "stock",
                "formative",
                "vowel",
                "root"
            ],
            "digest": "local case or subrule under §24.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "24.5.5",
            "ref": "Andrews Lesson 24.5.5",
            "itemKind": "numbered item",
            "page": 188,
            "focusKeywords": [
                "root",
                "formative",
                "vowel"
            ],
            "digest": "local case or subrule under §24.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "24.5.6",
            "ref": "Andrews Lesson 24.5.6",
            "itemKind": "numbered item",
            "page": 188,
            "focusKeywords": [
                "intransitive",
                "destockal",
                "hui",
                "belong",
                "class",
                "pey-o"
            ],
            "digest": "local case or subrule under §24.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "24.5.7",
            "ref": "Andrews Lesson 24.5.7",
            "itemKind": "numbered item",
            "page": 188,
            "focusKeywords": [
                "order",
                "first-type",
                "causative-stem",
                "intransitive",
                "destockal",
                "use"
            ],
            "digest": "local case or subrule under §24.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "24.5.7.a",
            "ref": "Andrews Lesson 24.5.7.a",
            "itemKind": "lettered item",
            "page": 188,
            "focusKeywords": [
                "majority",
                "destockal",
                "prefer",
                "add",
                "causative",
                "suffix"
            ],
            "digest": "local case or subrule under §24.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "24.5.7.b",
            "ref": "Andrews Lesson 24.5.7.b",
            "itemKind": "lettered item",
            "page": 188,
            "focusKeywords": [
                "majority",
                "hui",
                "destockal",
                "prefer",
                "replace",
                "stem-final"
            ],
            "digest": "local case or subrule under §24.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "24.5.8",
            "ref": "Andrews Lesson 24.5.8",
            "itemKind": "numbered item",
            "page": 188,
            "focusKeywords": [
                "causative",
                "destockal",
                "then-a",
                "bu-a",
                "kind",
                "belong"
            ],
            "digest": "local case or subrule under §24.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "24.5.9",
            "ref": "Andrews Lesson 24.5.9",
            "itemKind": "numbered item",
            "page": 188,
            "focusKeywords": [
                "few",
                "irregular",
                "destockal",
                "hui",
                "type",
                "which"
            ],
            "digest": "local case or subrule under §24.5, verify exact examples and boundaries in the PDF."
        }
    ],
    "24.6": [
        {
            "id": "24.6.1",
            "ref": "Andrews Lesson 24.6.1",
            "itemKind": "numbered item",
            "page": 189,
            "focusKeywords": [
                "stock-formative"
            ],
            "digest": "local case or subrule under §24.6, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "24.6.2",
            "ref": "Andrews Lesson 24.6.2",
            "itemKind": "numbered item",
            "page": 190,
            "focusKeywords": [
                "stock-formative"
            ],
            "digest": "local case or subrule under §24.6, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "24.6.3",
            "ref": "Andrews Lesson 24.6.3",
            "itemKind": "numbered item",
            "page": 190,
            "focusKeywords": [
                "certain",
                "instances",
                "hua",
                "destockal",
                "either",
                "ore"
            ],
            "digest": "local case or subrule under §24.6, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "24.6.4",
            "ref": "Andrews Lesson 24.6.4",
            "itemKind": "numbered item",
            "page": 190,
            "focusKeywords": [
                "destockal",
                "e-hua",
                "normally",
                "belong",
                "class",
                "pin-e"
            ],
            "digest": "local case or subrule under §24.6, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "24.6.5",
            "ref": "Andrews Lesson 24.6.5",
            "itemKind": "numbered item",
            "page": 190,
            "focusKeywords": [
                "type-one",
                "causative",
                "both",
                "a-hua",
                "e-hua",
                "destockal"
            ],
            "digest": "local case or subrule under §24.6, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "24.6.6",
            "ref": "Andrews Lesson 24.6.6",
            "itemKind": "numbered item",
            "page": 191,
            "focusKeywords": [
                "causative",
                "destockal",
                "a-bu",
                "e-hu",
                "kind",
                "belong"
            ],
            "digest": "local case or subrule under §24.6, verify exact examples and boundaries in the PDF."
        }
    ],
    "24.8": [
        {
            "id": "24.8.1",
            "ref": "Andrews Lesson 24.8.1",
            "itemKind": "numbered item",
            "page": 192,
            "focusKeywords": [
                "generating",
                "specific",
                "projective",
                "object",
                "causative"
            ],
            "digest": "local case or subrule under §24.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "24.8.1.a",
            "ref": "Andrews Lesson 24.8.1.a",
            "itemKind": "lettered item",
            "page": 192,
            "focusKeywords": [
                "tomi",
                "becomes",
                "untied",
                "they",
                "become"
            ],
            "digest": "local case or subrule under §24.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "24.8.1.b",
            "ref": "Andrews Lesson 24.8.1.b",
            "itemKind": "lettered item",
            "page": 192,
            "focusKeywords": [
                "transform",
                "nictoma",
                "cause",
                "them",
                "become",
                "untied"
            ],
            "digest": "local case or subrule under §24.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "24.8.2",
            "ref": "Andrews Lesson 24.8.2",
            "itemKind": "numbered item",
            "page": 193,
            "focusKeywords": [
                "generating",
                "reflexive",
                "object",
                "causative"
            ],
            "digest": "local case or subrule under §24.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "24.8.2.a",
            "ref": "Andrews Lesson 24.8.2.a",
            "itemKind": "lettered item",
            "page": 193,
            "focusKeywords": [
                "nitomi",
                "become",
                "untied"
            ],
            "digest": "local case or subrule under §24.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "24.8.2.b",
            "ref": "Andrews Lesson 24.8.2.b",
            "itemKind": "lettered item",
            "page": 193,
            "focusKeywords": [
                "transform",
                "ninotoma",
                "untie",
                "myself"
            ],
            "digest": "local case or subrule under §24.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "24.8.3",
            "ref": "Andrews Lesson 24.8.3",
            "itemKind": "numbered item",
            "page": 193,
            "focusKeywords": [
                "generating",
                "nonspecific",
                "projective",
                "object",
                "causative"
            ],
            "digest": "local case or subrule under §24.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "24.8.3.a",
            "ref": "Andrews Lesson 24.8.3.a",
            "itemKind": "lettered item",
            "page": 193,
            "focusKeywords": [
                "tomohua",
                "becomes",
                "untied"
            ],
            "digest": "local case or subrule under §24.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "24.8.3.b",
            "ref": "Andrews Lesson 24.8.3.b",
            "itemKind": "lettered item",
            "page": 193,
            "focusKeywords": [
                "transform",
                "nitlatoma",
                "unties"
            ],
            "digest": "local case or subrule under §24.8, verify exact examples and boundaries in the PDF."
        }
    ],
    "25.2": [
        {
            "id": "25.2.1",
            "ref": "Andrews Lesson 25.2.1",
            "itemKind": "numbered item",
            "page": 196,
            "focusKeywords": [
                "active",
                "ends",
                "since",
                "hua",
                "incompatible",
                "preceding"
            ],
            "digest": "local case or subrule under §25.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "25.2.2",
            "ref": "Andrews Lesson 25.2.2",
            "itemKind": "numbered item",
            "page": 196,
            "focusKeywords": [
                "active",
                "ends",
                "replaced",
                "item",
                "above"
            ],
            "digest": "local case or subrule under §25.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "25.2.3",
            "ref": "Andrews Lesson 25.2.3",
            "itemKind": "numbered item",
            "page": 196,
            "focusKeywords": [
                "active",
                "ends",
                "replaced",
                "item",
                "above"
            ],
            "digest": "local case or subrule under §25.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "25.2.4",
            "ref": "Andrews Lesson 25.2.4",
            "itemKind": "numbered item",
            "page": 196,
            "focusKeywords": [
                "certain",
                "destockal",
                "i-hui",
                "a-hui",
                "intransitive",
                "type-two"
            ],
            "digest": "local case or subrule under §25.2, verify exact examples and boundaries in the PDF."
        }
    ],
    "25.3": [
        {
            "id": "25.3.1",
            "ref": "Andrews Lesson 25.3.1",
            "itemKind": "numbered item",
            "page": 198,
            "focusKeywords": [
                "active",
                "ends"
            ],
            "digest": "local case or subrule under §25.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "25.3.2",
            "ref": "Andrews Lesson 25.3.2",
            "itemKind": "numbered item",
            "page": 198,
            "focusKeywords": [
                "active",
                "transitive",
                "ending"
            ],
            "digest": "local case or subrule under §25.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "25.3.3",
            "ref": "Andrews Lesson 25.3.3",
            "itemKind": "referenced subsection",
            "page": 198,
            "focusKeywords": [
                "referenced internally; pypdf did not expose a clean item boundary"
            ],
            "digest": "local case or subrule under §25.3, verify exact examples and boundaries in the PDF."
        }
    ],
    "25.4": [
        {
            "id": "25.4.1",
            "ref": "Andrews Lesson 25.4.1",
            "itemKind": "numbered item",
            "page": 198,
            "focusKeywords": [
                "active",
                "ends",
                "kif",
                "appear",
                "change"
            ],
            "digest": "local case or subrule under §25.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "25.4.2",
            "ref": "Andrews Lesson 25.4.2",
            "itemKind": "numbered item",
            "page": 199,
            "focusKeywords": [
                "active",
                "ends",
                "nil",
                "appear",
                "change"
            ],
            "digest": "local case or subrule under §25.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "25.4.3",
            "ref": "Andrews Lesson 25.4.3",
            "itemKind": "numbered item",
            "page": 199,
            "focusKeywords": [
                "active",
                "ends",
                "kwa",
                "changes"
            ],
            "digest": "local case or subrule under §25.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "25.4.4",
            "ref": "Andrews Lesson 25.4.4",
            "itemKind": "numbered item",
            "page": 199,
            "focusKeywords": [
                "active",
                "ends",
                "isl",
                "changes"
            ],
            "digest": "local case or subrule under §25.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "25.4.5",
            "ref": "Andrews Lesson 25.4.5",
            "itemKind": "numbered item",
            "page": 199,
            "focusKeywords": [
                "active",
                "ends",
                "appear",
                "change"
            ],
            "digest": "local case or subrule under §25.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "25.4.6",
            "ref": "Andrews Lesson 25.4.6",
            "itemKind": "numbered item",
            "page": 199,
            "focusKeywords": [
                "active",
                "ends",
                "vowel",
                "plus",
                "certain",
                "instances"
            ],
            "digest": "local case or subrule under §25.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "25.4.7",
            "ref": "Andrews Lesson 25.4.7",
            "itemKind": "numbered item",
            "page": 199,
            "focusKeywords": [
                "verb",
                "tla",
                "itt-a",
                "see",
                "look",
                "addition"
            ],
            "digest": "local case or subrule under §25.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "25.4.8",
            "ref": "Andrews Lesson 25.4.8",
            "itemKind": "numbered item",
            "page": 199,
            "focusKeywords": [
                "active",
                "intransitive",
                "root",
                "verb",
                "see",
                "deleted"
            ],
            "digest": "local case or subrule under §25.4, verify exact examples and boundaries in the PDF."
        }
    ],
    "25.5": [
        {
            "id": "25.5.1",
            "ref": "Andrews Lesson 25.5.1",
            "itemKind": "numbered item",
            "page": 200,
            "focusKeywords": [
                "ending",
                "take",
                "lia",
                "denominal",
                "ones",
                "means"
            ],
            "digest": "local case or subrule under §25.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "25.5.2",
            "ref": "Andrews Lesson 25.5.2",
            "itemKind": "numbered item",
            "page": 200,
            "focusKeywords": [
                "ending",
                "take",
                "lia",
                "consist",
                "root",
                "plus"
            ],
            "digest": "local case or subrule under §25.5, verify exact examples and boundaries in the PDF."
        }
    ],
    "25.10": [
        {
            "id": "25.10.1",
            "ref": "Andrews Lesson 25.10.1",
            "itemKind": "numbered item",
            "page": 202,
            "focusKeywords": [
                "generation",
                "specific",
                "projective-object",
                "pronoun",
                "causative"
            ],
            "digest": "local case or subrule under §25.10, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "25.10.2",
            "ref": "Andrews Lesson 25.10.2",
            "itemKind": "numbered item",
            "page": 202,
            "focusKeywords": [
                "generation",
                "reflexive-object",
                "pronoun",
                "causative"
            ],
            "digest": "local case or subrule under §25.10, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "25.10.3",
            "ref": "Andrews Lesson 25.10.3",
            "itemKind": "numbered item",
            "page": 202,
            "focusKeywords": [
                "generation",
                "nonspecific",
                "object",
                "pronoun",
                "causative"
            ],
            "digest": "local case or subrule under §25.10, verify exact examples and boundaries in the PDF."
        }
    ],
    "25.11": [
        {
            "id": "25.11.1",
            "ref": "Andrews Lesson 25.11.1",
            "itemKind": "numbered item",
            "page": 203,
            "focusKeywords": [
                "generation",
                "specific",
                "projective",
                "causative",
                "object"
            ],
            "digest": "local case or subrule under §25.11, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "25.11.1.a",
            "ref": "Andrews Lesson 25.11.1.a",
            "itemKind": "lettered item",
            "page": 203,
            "focusKeywords": [
                "shuntline",
                "specific",
                "projective",
                "object"
            ],
            "digest": "local case or subrule under §25.11, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "25.11.1.b",
            "ref": "Andrews Lesson 25.11.1.b",
            "itemKind": "lettered item",
            "page": 203,
            "focusKeywords": [
                "shuntline",
                "reflexive",
                "reciprocative",
                "object"
            ],
            "digest": "local case or subrule under §25.11, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "25.11.1.c",
            "ref": "Andrews Lesson 25.11.1.c",
            "itemKind": "lettered item",
            "page": 204,
            "focusKeywords": [
                "shuntline",
                "nonspecific",
                "projective",
                "object"
            ],
            "digest": "local case or subrule under §25.11, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "25.11.2",
            "ref": "Andrews Lesson 25.11.2",
            "itemKind": "numbered item",
            "page": 204,
            "focusKeywords": [
                "generation",
                "mainline",
                "reflexive",
                "causative",
                "object",
                "pronoun"
            ],
            "digest": "local case or subrule under §25.11, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "25.11.2.a",
            "ref": "Andrews Lesson 25.11.2.a",
            "itemKind": "lettered item",
            "page": 204,
            "focusKeywords": [
                "shuntline",
                "specific",
                "projective",
                "object"
            ],
            "digest": "local case or subrule under §25.11, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "25.11.2.b",
            "ref": "Andrews Lesson 25.11.2.b",
            "itemKind": "lettered item",
            "page": 204,
            "focusKeywords": [
                "shuntline",
                "nonspecific",
                "object"
            ],
            "digest": "local case or subrule under §25.11, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "25.11.3",
            "ref": "Andrews Lesson 25.11.3",
            "itemKind": "numbered item",
            "page": 204,
            "focusKeywords": [
                "generation",
                "nonspecific",
                "causative",
                "object",
                "pronoun"
            ],
            "digest": "local case or subrule under §25.11, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "25.11.3.a",
            "ref": "Andrews Lesson 25.11.3.a",
            "itemKind": "lettered item",
            "page": 205,
            "focusKeywords": [
                "shuntline",
                "specific",
                "projective",
                "object"
            ],
            "digest": "local case or subrule under §25.11, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "25.11.3.b",
            "ref": "Andrews Lesson 25.11.3.b",
            "itemKind": "lettered item",
            "page": 205,
            "focusKeywords": [
                "shuntline",
                "reflexive",
                "reciprocative",
                "object"
            ],
            "digest": "local case or subrule under §25.11, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "25.11.3.c",
            "ref": "Andrews Lesson 25.11.3.c",
            "itemKind": "lettered item",
            "page": 205,
            "focusKeywords": [
                "shuntline",
                "nonspecific",
                "projective",
                "object"
            ],
            "digest": "local case or subrule under §25.11, verify exact examples and boundaries in the PDF."
        }
    ],
    "26.1": [
        {
            "id": "26.1.1",
            "ref": "Andrews Lesson 26.1.1",
            "itemKind": "numbered item",
            "page": 211,
            "focusKeywords": [
                "double-object",
                "tla",
                "maca",
                "gives",
                "said",
                "inherently"
            ],
            "digest": "local case or subrule under §26.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "26.1.2",
            "ref": "Andrews Lesson 26.1.2",
            "itemKind": "numbered item",
            "page": 211,
            "focusKeywords": [
                "judging",
                "translation",
                "see",
                "might",
                "think",
                "single-object"
            ],
            "digest": "local case or subrule under §26.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "26.1.3",
            "ref": "Andrews Lesson 26.1.3",
            "itemKind": "numbered item",
            "page": 212,
            "focusKeywords": [
                "pointed",
                "out",
                "certain",
                "violate",
                "valence",
                "principle"
            ],
            "digest": "local case or subrule under §26.1, verify exact examples and boundaries in the PDF."
        }
    ],
    "26.8": [
        {
            "id": "26.8.1",
            "ref": "Andrews Lesson 26.8.1",
            "itemKind": "numbered item",
            "page": 217,
            "focusKeywords": [
                "class",
                "applicative",
                "adding",
                "iia",
                "imperfective"
            ],
            "digest": "local case or subrule under §26.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "26.8.2",
            "ref": "Andrews Lesson 26.8.2",
            "itemKind": "numbered item",
            "page": 217,
            "focusKeywords": [
                "transitive",
                "class",
                "end",
                "iyal",
                "applicative",
                "adding"
            ],
            "digest": "local case or subrule under §26.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "26.8.3",
            "ref": "Andrews Lesson 26.8.3",
            "itemKind": "numbered item",
            "page": 217,
            "focusKeywords": [
                "intransitive",
                "class",
                "end",
                "eyal",
                "applicative",
                "deleting"
            ],
            "digest": "local case or subrule under §26.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "26.8.4",
            "ref": "Andrews Lesson 26.8.4",
            "itemKind": "numbered item",
            "page": 217,
            "focusKeywords": [
                "end",
                "loyal",
                "intransitive",
                "transitive"
            ],
            "digest": "local case or subrule under §26.8, verify exact examples and boundaries in the PDF."
        }
    ],
    "26.9": [
        {
            "id": "26.9.1",
            "ref": "Andrews Lesson 26.9.1",
            "itemKind": "numbered item",
            "page": 218,
            "focusKeywords": [
                "o-a",
                "participates",
                "causative",
                "destockal",
                "root",
                "ends"
            ],
            "digest": "local case or subrule under §26.9, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "26.9.2",
            "ref": "Andrews Lesson 26.9.2",
            "itemKind": "numbered item",
            "page": 218,
            "focusKeywords": [
                "o-a",
                "participates",
                "causative",
                "destockal",
                "root",
                "ends"
            ],
            "digest": "local case or subrule under §26.9, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "26.9.3",
            "ref": "Andrews Lesson 26.9.3",
            "itemKind": "numbered item",
            "page": 219,
            "focusKeywords": [
                "causative",
                "serving",
                "been",
                "adding",
                "root"
            ],
            "digest": "local case or subrule under §26.9, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "26.9.4",
            "ref": "Andrews Lesson 26.9.4",
            "itemKind": "numbered item",
            "page": 219,
            "focusKeywords": [
                "exceptional",
                "instances",
                "verb",
                "ending",
                "o-a",
                "suffixal"
            ],
            "digest": "local case or subrule under §26.9, verify exact examples and boundaries in the PDF."
        }
    ],
    "26.16": [
        {
            "id": "26.16.1",
            "ref": "Andrews Lesson 26.16.1",
            "itemKind": "numbered item",
            "page": 220,
            "focusKeywords": [
                "incompatibility",
                "between",
                "objects",
                "both",
                "overt"
            ],
            "digest": "local case or subrule under §26.16, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "26.16.2",
            "ref": "Andrews Lesson 26.16.2",
            "itemKind": "numbered item",
            "page": 221,
            "focusKeywords": [
                "mutual",
                "incompatibility",
                "specific",
                "projective-object",
                "pronouns",
                "permits"
            ],
            "digest": "local case or subrule under §26.16, verify exact examples and boundaries in the PDF."
        }
    ],
    "26.17": [
        {
            "id": "26.17.1",
            "ref": "Andrews Lesson 26.17.1",
            "itemKind": "numbered item",
            "page": 222,
            "focusKeywords": [
                "incompatibility",
                "among",
                "objects",
                "overt"
            ],
            "digest": "local case or subrule under §26.17, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "26.17.2",
            "ref": "Andrews Lesson 26.17.2",
            "itemKind": "numbered item",
            "page": 222,
            "focusKeywords": [
                "mutual",
                "incompatibility",
                "specific",
                "projective-object",
                "pronouns",
                "permit"
            ],
            "digest": "local case or subrule under §26.17, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "26.17.3",
            "ref": "Andrews Lesson 26.17.3",
            "itemKind": "numbered item",
            "page": 223,
            "focusKeywords": [
                "mutual",
                "incompatibility",
                "specific",
                "projective-object",
                "pronouns",
                "permit"
            ],
            "digest": "local case or subrule under §26.17, verify exact examples and boundaries in the PDF."
        }
    ],
    "26.18": [
        {
            "id": "26.18.1",
            "ref": "Andrews Lesson 26.18.1",
            "itemKind": "numbered item",
            "page": 223,
            "focusKeywords": [
                "such",
                "tinechtetlapacaltilia",
                "possible",
                "interpretations",
                "you"
            ],
            "digest": "local case or subrule under §26.18, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "26.18.2",
            "ref": "Andrews Lesson 26.18.2",
            "itemKind": "numbered item",
            "page": 223,
            "focusKeywords": [
                "such",
                "nechtepacaltilia",
                "possible",
                "interpretations",
                "wash"
            ],
            "digest": "local case or subrule under §26.18, verify exact examples and boundaries in the PDF."
        }
    ],
    "26.21": [
        {
            "id": "26.21.1",
            "ref": "Andrews Lesson 26.21.1",
            "itemKind": "numbered item",
            "page": 225,
            "focusKeywords": [
                "human",
                "direct-object",
                "pronoun"
            ],
            "digest": "local case or subrule under §26.21, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "26.21.2",
            "ref": "Andrews Lesson 26.21.2",
            "itemKind": "numbered item",
            "page": 225,
            "focusKeywords": [
                "nonhuman",
                "direct-object",
                "pronoun"
            ],
            "digest": "local case or subrule under §26.21, verify exact examples and boundaries in the PDF."
        }
    ],
    "27.2": [
        {
            "id": "27.2.1",
            "ref": "Andrews Lesson 27.2.1",
            "itemKind": "numbered item",
            "page": 228,
            "focusKeywords": [
                "reduplicative",
                "prefix",
                "consonant",
                "short",
                "vowel",
                "glottal"
            ],
            "digest": "local case or subrule under §27.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "27.2.2",
            "ref": "Andrews Lesson 27.2.2",
            "itemKind": "numbered item",
            "page": 229,
            "focusKeywords": [
                "reduplicative",
                "prefix",
                "consonant",
                "long",
                "vowel",
                "generally"
            ],
            "digest": "local case or subrule under §27.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "27.2.3",
            "ref": "Andrews Lesson 27.2.3",
            "itemKind": "numbered item",
            "page": 229,
            "focusKeywords": [
                "reduplicative",
                "prefix",
                "consonant",
                "short",
                "vowel",
                "formation"
            ],
            "digest": "local case or subrule under §27.2, verify exact examples and boundaries in the PDF."
        }
    ],
    "27.3": [
        {
            "id": "27.3.1",
            "ref": "Andrews Lesson 27.3.1",
            "itemKind": "numbered item",
            "page": 230,
            "focusKeywords": [
                "instances",
                "tla",
                "fusion",
                "see",
                "nonspecific",
                "object"
            ],
            "digest": "local case or subrule under §27.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "27.3.2",
            "ref": "Andrews Lesson 27.3.2",
            "itemKind": "numbered item",
            "page": 230,
            "focusKeywords": [
                "mainline",
                "reflexive-object",
                "pronoun",
                "undergo",
                "partial",
                "reduplication"
            ],
            "digest": "local case or subrule under §27.3, verify exact examples and boundaries in the PDF."
        }
    ],
    "27.4": [
        {
            "id": "27.4.1",
            "ref": "Andrews Lesson 27.4.1",
            "itemKind": "numbered item",
            "page": 231,
            "focusKeywords": [
                "intransitive",
                "destockal",
                "change",
                "theme",
                "suffix",
                "sometimes"
            ],
            "digest": "local case or subrule under §27.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "27.4.1.a",
            "ref": "Andrews Lesson 27.4.1.a",
            "itemKind": "lettered item",
            "page": 231,
            "focusKeywords": [
                "teh-te",
                "i-ni",
                "various",
                "such",
                "objects",
                "shatter"
            ],
            "digest": "local case or subrule under §27.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "27.4.1.b",
            "ref": "Andrews Lesson 27.4.1.b",
            "itemKind": "lettered item",
            "page": 231,
            "focusKeywords": [
                "te-te",
                "i-ca",
                "such",
                "objects",
                "shatter",
                "many"
            ],
            "digest": "local case or subrule under §27.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "27.4.2",
            "ref": "Andrews Lesson 27.4.2",
            "itemKind": "numbered item",
            "page": 232,
            "focusKeywords": [
                "frequentative",
                "causative",
                "destockal",
                "keeping",
                "suf"
            ],
            "digest": "local case or subrule under §27.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "27.4.3",
            "ref": "Andrews Lesson 27.4.3",
            "itemKind": "numbered item",
            "page": 232,
            "focusKeywords": [
                "times",
                "original",
                "destockal",
                "longer",
                "derived",
                "fre"
            ],
            "digest": "local case or subrule under §27.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "27.4.4",
            "ref": "Andrews Lesson 27.4.4",
            "itemKind": "numbered item",
            "page": 233,
            "focusKeywords": [
                "times",
                "tz-a",
                "suffixal",
                "unit",
                "which",
                "obviously"
            ],
            "digest": "local case or subrule under §27.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "27.4.5",
            "ref": "Andrews Lesson 27.4.5",
            "itemKind": "numbered item",
            "page": 233,
            "focusKeywords": [
                "frequentative",
                "causative",
                "destockal",
                "applicative",
                "changing",
                "tz-a"
            ],
            "digest": "local case or subrule under §27.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "27.4.6",
            "ref": "Andrews Lesson 27.4.6",
            "itemKind": "numbered item",
            "page": 233,
            "focusKeywords": [
                "possible",
                "although",
                "not",
                "frequent",
                "frequentative",
                "intransitive"
            ],
            "digest": "local case or subrule under §27.4, verify exact examples and boundaries in the PDF."
        }
    ],
    "27.5": [
        {
            "id": "27.5.1",
            "ref": "Andrews Lesson 27.5.1",
            "itemKind": "numbered item",
            "page": 233,
            "focusKeywords": [
                "type",
                "involves",
                "use",
                "intransitive",
                "suffix",
                "added"
            ],
            "digest": "local case or subrule under §27.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "27.5.2",
            "ref": "Andrews Lesson 27.5.2",
            "itemKind": "numbered item",
            "page": 234,
            "focusKeywords": [
                "type",
                "frequentative",
                "intransitive",
                "involves",
                "replacing",
                "final"
            ],
            "digest": "local case or subrule under §27.5, verify exact examples and boundaries in the PDF."
        }
    ],
    "28.2": [
        {
            "id": "28.2.1",
            "ref": "Andrews Lesson 28.2.1",
            "itemKind": "numbered item",
            "page": 236,
            "focusKeywords": [
                "matrix",
                "subposition",
                "compound",
                "always",
                "comes",
                "after"
            ],
            "digest": "local case or subrule under §28.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "28.2.2",
            "ref": "Andrews Lesson 28.2.2",
            "itemKind": "numbered item",
            "page": 236,
            "focusKeywords": [
                "embed",
                "subposition",
                "seen",
                "compound",
                "formulas",
                "sub"
            ],
            "digest": "local case or subrule under §28.2, verify exact examples and boundaries in the PDF."
        }
    ],
    "28.4": [
        {
            "id": "28.4.1",
            "ref": "Andrews Lesson 28.4.1",
            "itemKind": "numbered item",
            "page": 237,
            "focusKeywords": [
                "istem",
                "tstem"
            ],
            "digest": "local case or subrule under §28.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "28.4.2",
            "ref": "Andrews Lesson 28.4.2",
            "itemKind": "numbered item",
            "page": 237,
            "focusKeywords": [
                "tstem",
                "istem"
            ],
            "digest": "local case or subrule under §28.4, verify exact examples and boundaries in the PDF."
        }
    ],
    "28.5": [
        {
            "id": "28.5.1",
            "ref": "Andrews Lesson 28.5.1",
            "itemKind": "referenced subsection",
            "page": 94,
            "focusKeywords": [
                "referenced internally; pypdf did not expose a clean item boundary"
            ],
            "digest": "local case or subrule under §28.5, verify exact examples and boundaries in the PDF."
        }
    ],
    "28.6": [
        {
            "id": "28.6.1",
            "ref": "Andrews Lesson 28.6.1",
            "itemKind": "numbered item",
            "page": 238,
            "focusKeywords": [
                "ca-h",
                "act",
                "doings",
                "traditional",
                "spelling",
                "rarely"
            ],
            "digest": "local case or subrule under §28.6, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "28.6.2",
            "ref": "Andrews Lesson 28.6.2",
            "itemKind": "numbered item",
            "page": 239,
            "focusKeywords": [
                "nemi",
                "along",
                "doings",
                "spend",
                "time",
                "continue"
            ],
            "digest": "local case or subrule under §28.6, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "28.6.3",
            "ref": "Andrews Lesson 28.6.3",
            "itemKind": "numbered item",
            "page": 239,
            "focusKeywords": [
                "ya-uh",
                "away",
                "doings",
                "present",
                "indicative"
            ],
            "digest": "local case or subrule under §28.6, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "28.6.4",
            "ref": "Andrews Lesson 28.6.4",
            "itemKind": "numbered item",
            "page": 240,
            "focusKeywords": [
                "hual-la",
                "come",
                "doings",
                "directional",
                "prefix",
                "kept"
            ],
            "digest": "local case or subrule under §28.6, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "28.6.5",
            "ref": "Andrews Lesson 28.6.5",
            "itemKind": "numbered item",
            "page": 240,
            "focusKeywords": [
                "hui-tz",
                "come",
                "doings"
            ],
            "digest": "local case or subrule under §28.6, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "28.6.6",
            "ref": "Andrews Lesson 28.6.6",
            "itemKind": "numbered item",
            "page": 241,
            "focusKeywords": [
                "ahci",
                "arrive",
                "doings",
                "see",
                "also"
            ],
            "digest": "local case or subrule under §28.6, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "28.6.7",
            "ref": "Andrews Lesson 28.6.7",
            "itemKind": "numbered item",
            "page": 241,
            "focusKeywords": [
                "mani",
                "along",
                "happening",
                "happen",
                "around",
                "over"
            ],
            "digest": "local case or subrule under §28.6, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "28.6.8",
            "ref": "Andrews Lesson 28.6.8",
            "itemKind": "numbered item",
            "page": 241,
            "focusKeywords": [
                "ihca",
                "stand",
                "doings",
                "being",
                "certain",
                "state"
            ],
            "digest": "local case or subrule under §28.6, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "28.6.9",
            "ref": "Andrews Lesson 28.6.9",
            "itemKind": "numbered item",
            "page": 241,
            "focusKeywords": [
                "lie",
                "stretched",
                "out",
                "doings",
                "certain",
                "state"
            ],
            "digest": "local case or subrule under §28.6, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "28.6.10",
            "ref": "Andrews Lesson 28.6.10",
            "itemKind": "numbered item",
            "page": 242,
            "focusKeywords": [
                "e-hua",
                "move",
                "start",
                "action",
                "begin",
                "dos"
            ],
            "digest": "local case or subrule under §28.6, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "28.6.11",
            "ref": "Andrews Lesson 28.6.11",
            "itemKind": "numbered item",
            "page": 242,
            "focusKeywords": [
                "quiza",
                "dos",
                "quickly",
                "abruptly",
                "connotation",
                "speed"
            ],
            "digest": "local case or subrule under §28.6, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "28.6.12",
            "ref": "Andrews Lesson 28.6.12",
            "itemKind": "numbered item",
            "page": 242,
            "focusKeywords": [
                "huetzi",
                "dos",
                "quickly",
                "abruptly",
                "connotation",
                "speed"
            ],
            "digest": "local case or subrule under §28.6, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "28.6.13",
            "ref": "Andrews Lesson 28.6.13",
            "itemKind": "numbered item",
            "page": 243,
            "focusKeywords": [
                "tlehco",
                "ascend"
            ],
            "digest": "local case or subrule under §28.6, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "28.6.14",
            "ref": "Andrews Lesson 28.6.14",
            "itemKind": "numbered item",
            "page": 243,
            "focusKeywords": [
                "cal-aqui",
                "house-enter",
                "enter",
                "compound",
                "accord"
            ],
            "digest": "local case or subrule under §28.6, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "28.6.15",
            "ref": "Andrews Lesson 28.6.15",
            "itemKind": "numbered item",
            "page": 243,
            "focusKeywords": [
                "pil-ca",
                "hang",
                "suspended"
            ],
            "digest": "local case or subrule under §28.6, verify exact examples and boundaries in the PDF."
        }
    ],
    "28.7": [
        {
            "id": "28.7.1",
            "ref": "Andrews Lesson 28.7.1",
            "itemKind": "numbered item",
            "page": 243,
            "focusKeywords": [
                "verb",
                "ca-h",
                "occurring",
                "embed",
                "connective-t",
                "compound"
            ],
            "digest": "local case or subrule under §28.7, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "28.7.2",
            "ref": "Andrews Lesson 28.7.2",
            "itemKind": "numbered item",
            "page": 243,
            "focusKeywords": [
                "verb",
                "ya-uh",
                "preterit",
                "predicate",
                "yah",
                "occupying"
            ],
            "digest": "local case or subrule under §28.7, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "28.7.3",
            "ref": "Andrews Lesson 28.7.3",
            "itemKind": "numbered item",
            "page": 243,
            "focusKeywords": [
                "intransitive",
                "perfective",
                "cac",
                "appears",
                "preterit",
                "predicate"
            ],
            "digest": "local case or subrule under §28.7, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "28.7.4",
            "ref": "Andrews Lesson 28.7.4",
            "itemKind": "numbered item",
            "page": 244,
            "focusKeywords": [
                "already",
                "mentioned",
                "tla",
                "itt-a",
                "observant",
                "alert"
            ],
            "digest": "local case or subrule under §28.7, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "28.7.5",
            "ref": "Andrews Lesson 28.7.5",
            "itemKind": "numbered item",
            "page": 244,
            "focusKeywords": [
                "occasionally",
                "relative",
                "order",
                "events",
                "represented",
                "embed"
            ],
            "digest": "local case or subrule under §28.7, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "28.7.6",
            "ref": "Andrews Lesson 28.7.6",
            "itemKind": "numbered item",
            "page": 245,
            "focusKeywords": [
                "connective-t",
                "compound",
                "passive",
                "formations",
                "either",
                "embed"
            ],
            "digest": "local case or subrule under §28.7, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "28.7.7",
            "ref": "Andrews Lesson 28.7.7",
            "itemKind": "numbered item",
            "page": 245,
            "focusKeywords": [
                "connective-t",
                "compound",
                "impersonal",
                "formations",
                "embed"
            ],
            "digest": "local case or subrule under §28.7, verify exact examples and boundaries in the PDF."
        }
    ],
    "28.9": [
        {
            "id": "28.9.1",
            "ref": "Andrews Lesson 28.9.1",
            "itemKind": "numbered item",
            "page": 246,
            "focusKeywords": [
                "m-o",
                "cahua",
                "stop",
                "doing",
                "leave",
                "condition"
            ],
            "digest": "local case or subrule under §28.9, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "28.9.2",
            "ref": "Andrews Lesson 28.9.2",
            "itemKind": "numbered item",
            "page": 246,
            "focusKeywords": [
                "m-o",
                "teca",
                "settle",
                "down",
                "doings",
                "begin"
            ],
            "digest": "local case or subrule under §28.9, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "28.9.3",
            "ref": "Andrews Lesson 28.9.3",
            "itemKind": "numbered item",
            "page": 247,
            "focusKeywords": [
                "m-o",
                "tlal-i",
                "sit",
                "certain",
                "state",
                "settle"
            ],
            "digest": "local case or subrule under §28.9, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "28.9.4",
            "ref": "Andrews Lesson 28.9.4",
            "itemKind": "numbered item",
            "page": 247,
            "focusKeywords": [
                "m-o",
                "man-a",
                "dos",
                "gradually",
                "become",
                "condition"
            ],
            "digest": "local case or subrule under §28.9, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "28.9.5",
            "ref": "Andrews Lesson 28.9.5",
            "itemKind": "numbered item",
            "page": 247,
            "focusKeywords": [
                "m-o",
                "quetza",
                "dos",
                "gradually",
                "become",
                "condition"
            ],
            "digest": "local case or subrule under §28.9, verify exact examples and boundaries in the PDF."
        }
    ],
    "28.11": [
        {
            "id": "28.11.1",
            "ref": "Andrews Lesson 28.11.1",
            "itemKind": "referenced subsection",
            "page": 151,
            "focusKeywords": [
                "referenced internally; pypdf did not expose a clean item boundary"
            ],
            "digest": "local case or subrule under §28.11, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "28.11.2",
            "ref": "Andrews Lesson 28.11.2",
            "itemKind": "referenced subsection",
            "page": 158,
            "focusKeywords": [
                "referenced internally; pypdf did not expose a clean item boundary"
            ],
            "digest": "local case or subrule under §28.11, verify exact examples and boundaries in the PDF."
        }
    ],
    "29.1": [
        {
            "id": "29.1.1",
            "ref": "Andrews Lesson 29.1.1",
            "itemKind": "numbered item",
            "page": 251,
            "focusKeywords": [
                "embed",
                "subposition",
                "filler",
                "future-tense",
                "predicate"
            ],
            "digest": "local case or subrule under §29.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "29.1.2",
            "ref": "Andrews Lesson 29.1.2",
            "itemKind": "numbered item",
            "page": 251,
            "focusKeywords": [
                "matrix",
                "subposition",
                "occurring",
                "intransitive"
            ],
            "digest": "local case or subrule under §29.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "29.1.2.a",
            "ref": "Andrews Lesson 29.1.2.a",
            "itemKind": "lettered item",
            "page": 251,
            "focusKeywords": [
                "directional",
                "prefixes"
            ],
            "digest": "local case or subrule under §29.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "29.1.2.b",
            "ref": "Andrews Lesson 29.1.2.b",
            "itemKind": "lettered item",
            "page": 252,
            "focusKeywords": [
                "base",
                "which",
                "directional",
                "prefix",
                "fused",
                "manifested"
            ],
            "digest": "local case or subrule under §29.1, verify exact examples and boundaries in the PDF."
        }
    ],
    "29.3": [
        {
            "id": "29.3.1",
            "ref": "Andrews Lesson 29.3.1",
            "itemKind": "numbered item",
            "page": 252,
            "focusKeywords": [
                "nonpast",
                "indicative",
                "tense",
                "morph",
                "meaning"
            ],
            "digest": "local case or subrule under §29.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "29.3.2",
            "ref": "Andrews Lesson 29.3.2",
            "itemKind": "numbered item",
            "page": 254,
            "focusKeywords": [
                "past",
                "indicative",
                "tense",
                "morph",
                "meaning",
                "coop"
            ],
            "digest": "local case or subrule under §29.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "29.3.3",
            "ref": "Andrews Lesson 29.3.3",
            "itemKind": "numbered item",
            "page": 254,
            "focusKeywords": [
                "nonpast",
                "optative",
                "tense",
                "morph",
                "meaning"
            ],
            "digest": "local case or subrule under §29.3, verify exact examples and boundaries in the PDF."
        }
    ],
    "29.4": [
        {
            "id": "29.4.2",
            "ref": "Andrews Lesson 29.4.2",
            "itemKind": "numbered item",
            "page": 256,
            "focusKeywords": [
                "future",
                "indicative",
                "tense",
                "morph",
                "meaning"
            ],
            "digest": "local case or subrule under §29.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "29.4.3",
            "ref": "Andrews Lesson 29.4.3",
            "itemKind": "numbered item",
            "page": 257,
            "focusKeywords": [
                "nonpast",
                "optative",
                "tense",
                "morph",
                "meaning"
            ],
            "digest": "local case or subrule under §29.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "29.4.1",
            "ref": "Andrews Lesson 29.4.1",
            "itemKind": "referenced subsection",
            "page": 159,
            "focusKeywords": [
                "referenced internally; pypdf did not expose a clean item boundary"
            ],
            "digest": "local case or subrule under §29.4, verify exact examples and boundaries in the PDF."
        }
    ],
    "30.3": [
        {
            "id": "30.3.1",
            "ref": "Andrews Lesson 30.3.1",
            "itemKind": "numbered item",
            "page": 261,
            "focusKeywords": [
                "single-object",
                "intransitive"
            ],
            "digest": "local case or subrule under §30.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "30.3.2",
            "ref": "Andrews Lesson 30.3.2",
            "itemKind": "numbered item",
            "page": 261,
            "focusKeywords": [
                "double-object",
                "single-object"
            ],
            "digest": "local case or subrule under §30.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "30.3.3",
            "ref": "Andrews Lesson 30.3.3",
            "itemKind": "numbered item",
            "page": 262,
            "focusKeywords": [
                "triple-object",
                "double-object"
            ],
            "digest": "local case or subrule under §30.3, verify exact examples and boundaries in the PDF."
        }
    ],
    "30.12": [
        {
            "id": "30.12.1",
            "ref": "Andrews Lesson 30.12.1",
            "itemKind": "numbered item",
            "page": 267,
            "focusKeywords": [
                "matrix",
                "intransitive",
                "incorporated",
                "subject",
                "oriented"
            ],
            "digest": "local case or subrule under §30.12, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "30.12.2",
            "ref": "Andrews Lesson 30.12.2",
            "itemKind": "numbered item",
            "page": 268,
            "focusKeywords": [
                "matrix",
                "transitive",
                "possibilities"
            ],
            "digest": "local case or subrule under §30.12, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "30.12.2.a",
            "ref": "Andrews Lesson 30.12.2.a",
            "itemKind": "lettered item",
            "page": 268,
            "focusKeywords": [
                "comparison",
                "established",
                "subject",
                "pronoun",
                "compound"
            ],
            "digest": "local case or subrule under §30.12, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "30.12.2.b",
            "ref": "Andrews Lesson 30.12.2.b",
            "itemKind": "lettered item",
            "page": 268,
            "focusKeywords": [
                "comparison",
                "established",
                "object",
                "pronoun",
                "compound"
            ],
            "digest": "local case or subrule under §30.12, verify exact examples and boundaries in the PDF."
        }
    ],
    "30.13": [
        {
            "id": "30.13.1",
            "ref": "Andrews Lesson 30.13.1",
            "itemKind": "referenced subsection",
            "page": 18,
            "focusKeywords": [
                "referenced internally; pypdf did not expose a clean item boundary"
            ],
            "digest": "local case or subrule under §30.13, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "30.13.2",
            "ref": "Andrews Lesson 30.13.2",
            "itemKind": "referenced subsection",
            "page": 276,
            "focusKeywords": [
                "referenced internally; pypdf did not expose a clean item boundary"
            ],
            "digest": "local case or subrule under §30.13, verify exact examples and boundaries in the PDF."
        }
    ],
    "30.14": [
        {
            "id": "30.14.1",
            "ref": "Andrews Lesson 30.14.1",
            "itemKind": "numbered item",
            "page": 270,
            "focusKeywords": [
                "intransitive",
                "principal",
                "sentence",
                "supply",
                "supple"
            ],
            "digest": "local case or subrule under §30.14, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "30.14.2",
            "ref": "Andrews Lesson 30.14.2",
            "itemKind": "numbered item",
            "page": 271,
            "focusKeywords": [
                "transitive",
                "principal",
                "sentence",
                "supply",
                "supplementary"
            ],
            "digest": "local case or subrule under §30.14, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "30.14.3",
            "ref": "Andrews Lesson 30.14.3",
            "itemKind": "numbered item",
            "page": 273,
            "focusKeywords": [
                "supplementary",
                "subject",
                "active-voice",
                "transitive",
                "obligatorily",
                "converted"
            ],
            "digest": "local case or subrule under §30.14, verify exact examples and boundaries in the PDF."
        }
    ],
    "30.15": [
        {
            "id": "30.15.1",
            "ref": "Andrews Lesson 30.15.1",
            "itemKind": "numbered item",
            "page": 274,
            "focusKeywords": [
                "compound",
                "incorporated",
                "subject",
                "complement"
            ],
            "digest": "local case or subrule under §30.15, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "30.15.2",
            "ref": "Andrews Lesson 30.15.2",
            "itemKind": "numbered item",
            "page": 274,
            "focusKeywords": [
                "compound",
                "incorporated",
                "object",
                "complement",
                "most",
                "common"
            ],
            "digest": "local case or subrule under §30.15, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "30.15.2.a",
            "ref": "Andrews Lesson 30.15.2.a",
            "itemKind": "lettered item",
            "page": 274,
            "focusKeywords": [
                "considering"
            ],
            "digest": "local case or subrule under §30.15, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "30.15.2.b",
            "ref": "Andrews Lesson 30.15.2.b",
            "itemKind": "lettered item",
            "page": 275,
            "focusKeywords": [
                "changing"
            ],
            "digest": "local case or subrule under §30.15, verify exact examples and boundaries in the PDF."
        }
    ],
    "30.17": [
        {
            "id": "30.17.1",
            "ref": "Andrews Lesson 30.17.1",
            "itemKind": "numbered item",
            "page": 276,
            "focusKeywords": [
                "incorporated-object"
            ],
            "digest": "local case or subrule under §30.17, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "30.17.2",
            "ref": "Andrews Lesson 30.17.2",
            "itemKind": "numbered item",
            "page": 276,
            "focusKeywords": [
                "incorporated-adverb"
            ],
            "digest": "local case or subrule under §30.17, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "30.17.3",
            "ref": "Andrews Lesson 30.17.3",
            "itemKind": "numbered item",
            "page": 277,
            "focusKeywords": [
                "incorporated-complement"
            ],
            "digest": "local case or subrule under §30.17, verify exact examples and boundaries in the PDF."
        }
    ],
    "31.5": [
        {
            "id": "31.5.1",
            "ref": "Andrews Lesson 31.5.1",
            "itemKind": "numbered item",
            "page": 282,
            "focusKeywords": [
                "embed",
                "subposition",
                "filled",
                "tli"
            ],
            "digest": "local case or subrule under §31.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "31.5.2",
            "ref": "Andrews Lesson 31.5.2",
            "itemKind": "numbered item",
            "page": 282,
            "focusKeywords": [
                "embed",
                "subposition",
                "filled",
                "subclass"
            ],
            "digest": "local case or subrule under §31.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "31.5.3",
            "ref": "Andrews Lesson 31.5.3",
            "itemKind": "numbered item",
            "page": 282,
            "focusKeywords": [
                "embed",
                "subposition",
                "filled",
                "subclass"
            ],
            "digest": "local case or subrule under §31.5, verify exact examples and boundaries in the PDF."
        }
    ],
    "31.6": [
        {
            "id": "31.6.2",
            "ref": "Andrews Lesson 31.6.2",
            "itemKind": "numbered item",
            "page": 285,
            "focusKeywords": [
                "thing",
                "abundantly",
                "owning",
                "thinglstatelcondition",
                "quality",
                "per"
            ],
            "digest": "local case or subrule under §31.6, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "31.6.1",
            "ref": "Andrews Lesson 31.6.1",
            "itemKind": "referenced subsection",
            "page": 580,
            "focusKeywords": [
                "referenced internally; pypdf did not expose a clean item boundary"
            ],
            "digest": "local case or subrule under §31.6, verify exact examples and boundaries in the PDF."
        }
    ],
    "31.8": [
        {
            "id": "31.8.1",
            "ref": "Andrews Lesson 31.8.1",
            "itemKind": "numbered item",
            "page": 286,
            "focusKeywords": [
                "compound",
                "embed",
                "subposition"
            ],
            "digest": "local case or subrule under §31.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "31.8.2",
            "ref": "Andrews Lesson 31.8.2",
            "itemKind": "numbered item",
            "page": 286,
            "focusKeywords": [
                "compound",
                "matrix",
                "subposition"
            ],
            "digest": "local case or subrule under §31.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "31.8.3",
            "ref": "Andrews Lesson 31.8.3",
            "itemKind": "numbered item",
            "page": 286,
            "focusKeywords": [
                "compound",
                "both",
                "embed",
                "matrix",
                "subpositions"
            ],
            "digest": "local case or subrule under §31.8, verify exact examples and boundaries in the PDF."
        }
    ],
    "32.2": [
        {
            "id": "32.2.1",
            "ref": "Andrews Lesson 32.2.1",
            "itemKind": "numbered item",
            "page": 289,
            "focusKeywords": [
                "matrix",
                "pil",
                "expresses",
                "smallness",
                "affection"
            ],
            "digest": "local case or subrule under §32.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "32.2.2",
            "ref": "Andrews Lesson 32.2.2",
            "itemKind": "numbered item",
            "page": 289,
            "focusKeywords": [
                "pol",
                "expresses",
                "largeness",
                "disparagement",
                "contempt"
            ],
            "digest": "local case or subrule under §32.2, verify exact examples and boundaries in the PDF."
        }
    ],
    "32.3": [
        {
            "id": "32.3.1",
            "ref": "Andrews Lesson 32.3.1",
            "itemKind": "numbered item",
            "page": 290,
            "focusKeywords": [
                "tzin",
                "tli",
                "basically",
                "conveys",
                "notion",
                "special"
            ],
            "digest": "local case or subrule under §32.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "32.3.2",
            "ref": "Andrews Lesson 32.3.2",
            "itemKind": "numbered item",
            "page": 291,
            "focusKeywords": [
                "ton",
                "tli",
                "expresses",
                "smallness",
                "but",
                "without"
            ],
            "digest": "local case or subrule under §32.3, verify exact examples and boundaries in the PDF."
        }
    ],
    "32.5": [
        {
            "id": "32.5.1",
            "ref": "Andrews Lesson 32.5.1",
            "itemKind": "numbered item",
            "page": 292,
            "focusKeywords": [
                "absolutive-state",
                "built",
                "affinity-shaped",
                "compound"
            ],
            "digest": "local case or subrule under §32.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "32.5.2",
            "ref": "Andrews Lesson 32.5.2",
            "itemKind": "numbered item",
            "page": 293,
            "focusKeywords": [
                "possessive-state",
                "plural",
                "subject",
                "adding",
                "either",
                "sounded"
            ],
            "digest": "local case or subrule under §32.5, verify exact examples and boundaries in the PDF."
        }
    ],
    "32.6": [
        {
            "id": "32.6.1",
            "ref": "Andrews Lesson 32.6.1",
            "itemKind": "numbered item",
            "page": 294,
            "focusKeywords": [
                "child"
            ],
            "digest": "local case or subrule under §32.6, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "32.6.1.a",
            "ref": "Andrews Lesson 32.6.1.a",
            "itemKind": "lettered item",
            "page": 294,
            "focusKeywords": [
                "simple",
                "pil",
                "primarily",
                "possessive-state",
                "plural"
            ],
            "digest": "local case or subrule under §32.6, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "32.6.1.b",
            "ref": "Andrews Lesson 32.6.1.b",
            "itemKind": "lettered item",
            "page": 294,
            "focusKeywords": [
                "other",
                "involving",
                "pil",
                "meaning",
                "child"
            ],
            "digest": "local case or subrule under §32.6, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "32.6.2",
            "ref": "Andrews Lesson 32.6.2",
            "itemKind": "numbered item",
            "page": 295,
            "focusKeywords": [
                "noble"
            ],
            "digest": "local case or subrule under §32.6, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "32.6.2.a",
            "ref": "Andrews Lesson 32.6.2.a",
            "itemKind": "lettered item",
            "page": 295,
            "focusKeywords": [
                "simple",
                "pil",
                "absolutive-state",
                "either",
                "singular"
            ],
            "digest": "local case or subrule under §32.6, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "32.6.2.b",
            "ref": "Andrews Lesson 32.6.2.b",
            "itemKind": "lettered item",
            "page": 295,
            "focusKeywords": [
                "possessive-state",
                "pil",
                "embedded",
                "matrix"
            ],
            "digest": "local case or subrule under §32.6, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "32.6.2.c",
            "ref": "Andrews Lesson 32.6.2.c",
            "itemKind": "lettered item",
            "page": 295,
            "focusKeywords": [
                "very",
                "strange",
                "honorific",
                "singular-number",
                "subject",
                "pronoun"
            ],
            "digest": "local case or subrule under §32.6, verify exact examples and boundaries in the PDF."
        }
    ],
    "33.1": [
        {
            "id": "33.1.3.b",
            "ref": "Andrews Lesson 33.1.3.b",
            "itemKind": "referenced subsection",
            "page": 376,
            "focusKeywords": [
                "referenced internally; pypdf did not expose a clean item boundary"
            ],
            "digest": "local case or subrule under §33.1, verify exact examples and boundaries in the PDF."
        }
    ],
    "34.4": [
        {
            "id": "34.4.1",
            "ref": "Andrews Lesson 34.4.1",
            "itemKind": "numbered item",
            "page": 308,
            "focusKeywords": [
                "ome",
                "which",
                "embed",
                "sub"
            ],
            "digest": "local case or subrule under §34.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "34.4.2",
            "ref": "Andrews Lesson 34.4.2",
            "itemKind": "numbered item",
            "page": 309,
            "focusKeywords": [
                "eyi",
                "yeyi",
                "yei"
            ],
            "digest": "local case or subrule under §34.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "34.4.3",
            "ref": "Andrews Lesson 34.4.3",
            "itemKind": "numbered item",
            "page": 309,
            "focusKeywords": [
                "nahui",
                "nahu",
                "nauh",
                "variants"
            ],
            "digest": "local case or subrule under §34.4, verify exact examples and boundaries in the PDF."
        }
    ],
    "34.5": [
        {
            "id": "34.5.1",
            "ref": "Andrews Lesson 34.5.1",
            "itemKind": "numbered item",
            "page": 309,
            "focusKeywords": [
                "ma-cu",
                "i-1",
                "compound",
                "derived",
                "passive",
                "patientive"
            ],
            "digest": "local case or subrule under §34.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "34.5.2",
            "ref": "Andrews Lesson 34.5.2",
            "itemKind": "numbered item",
            "page": 310,
            "focusKeywords": [
                "chicua",
                "chine",
                "cikw",
                "chic",
                "occurs",
                "embed"
            ],
            "digest": "local case or subrule under §34.5, verify exact examples and boundaries in the PDF."
        }
    ],
    "34.7": [
        {
            "id": "34.7.1",
            "ref": "Andrews Lesson 34.7.1",
            "itemKind": "numbered item",
            "page": 311,
            "focusKeywords": [
                "multiples",
                "twenty",
                "expressed",
                "compound",
                "matrix"
            ],
            "digest": "local case or subrule under §34.7, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "34.7.2",
            "ref": "Andrews Lesson 34.7.2",
            "itemKind": "numbered item",
            "page": 311,
            "focusKeywords": [
                "multiples",
                "hundred",
                "400",
                "expressed",
                "compound"
            ],
            "digest": "local case or subrule under §34.7, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "34.7.3",
            "ref": "Andrews Lesson 34.7.3",
            "itemKind": "numbered item",
            "page": 312,
            "focusKeywords": [
                "multiples",
                "eight",
                "thousand",
                "000",
                "expressed",
                "compound"
            ],
            "digest": "local case or subrule under §34.7, verify exact examples and boundaries in the PDF."
        }
    ],
    "34.8": [
        {
            "id": "34.8.1",
            "ref": "Andrews Lesson 34.8.1",
            "itemKind": "numbered item",
            "page": 312,
            "focusKeywords": [
                "functions",
                "second",
                "conjunct",
                "must",
                "embed",
                "adverbial"
            ],
            "digest": "local case or subrule under §34.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "34.8.2",
            "ref": "Andrews Lesson 34.8.2",
            "itemKind": "numbered item",
            "page": 313,
            "focusKeywords": [
                "addition",
                "linking",
                "numeral",
                "means",
                "structure",
                "conjunction"
            ],
            "digest": "local case or subrule under §34.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "34.8.3",
            "ref": "Andrews Lesson 34.8.3",
            "itemKind": "numbered item",
            "page": 313,
            "focusKeywords": [
                "order",
                "obey",
                "rule",
                "about",
                "numeral",
                "embeds"
            ],
            "digest": "local case or subrule under §34.8, verify exact examples and boundaries in the PDF."
        }
    ],
    "34.13": [
        {
            "id": "34.13.1",
            "ref": "Andrews Lesson 34.13.1",
            "itemKind": "numbered item",
            "page": 316,
            "focusKeywords": [
                "counting",
                "people",
                "animals",
                "houses",
                "rocks",
                "tecpan"
            ],
            "digest": "local case or subrule under §34.13, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "34.13.2",
            "ref": "Andrews Lesson 34.13.2",
            "itemKind": "numbered item",
            "page": 316,
            "focusKeywords": [
                "counting",
                "blankets",
                "paper",
                "tortillas",
                "hides",
                "ipil"
            ],
            "digest": "local case or subrule under §34.13, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "34.13.3",
            "ref": "Andrews Lesson 34.13.3",
            "itemKind": "numbered item",
            "page": 316,
            "focusKeywords": [
                "counting",
                "just",
                "blankets",
                "quimil",
                "bundle",
                "fills"
            ],
            "digest": "local case or subrule under §34.13, verify exact examples and boundaries in the PDF."
        }
    ],
    "35.1": [
        {
            "id": "35.1.1",
            "ref": "Andrews Lesson 35.1.1",
            "itemKind": "numbered item",
            "page": 325,
            "focusKeywords": [
                "ordinary",
                "compound-stemmed"
            ],
            "digest": "local case or subrule under §35.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "35.1.2",
            "ref": "Andrews Lesson 35.1.2",
            "itemKind": "numbered item",
            "page": 326,
            "focusKeywords": [
                "compound-affective",
                "preterit-agentive"
            ],
            "digest": "local case or subrule under §35.1, verify exact examples and boundaries in the PDF."
        }
    ],
    "35.8": [
        {
            "id": "35.8.1",
            "ref": "Andrews Lesson 35.8.1",
            "itemKind": "numbered item",
            "page": 326,
            "focusKeywords": [
                "old",
                "woman",
                "ilama-ti",
                "perf",
                "ilama-t",
                "ilama-h"
            ],
            "digest": "local case or subrule under §35.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "35.8.2",
            "ref": "Andrews Lesson 35.8.2",
            "itemKind": "numbered item",
            "page": 327,
            "focusKeywords": [
                "old",
                "man",
                "hue-hue",
                "peif",
                "become"
            ],
            "digest": "local case or subrule under §35.8, verify exact examples and boundaries in the PDF."
        }
    ],
    "35.9": [
        {
            "id": "35.9.2",
            "ref": "Andrews Lesson 35.9.2",
            "itemKind": "numbered item",
            "page": 331,
            "focusKeywords": [
                "tla",
                "hua",
                "matrix",
                "incorporates",
                "kinds"
            ],
            "digest": "local case or subrule under §35.9, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "35.9.2.a",
            "ref": "Andrews Lesson 35.9.2.a",
            "itemKind": "lettered item",
            "page": 331,
            "focusKeywords": [
                "subclass",
                "see"
            ],
            "digest": "local case or subrule under §35.9, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "35.9.1.d",
            "ref": "Andrews Lesson 35.9.1.d",
            "itemKind": "referenced subsection",
            "page": 334,
            "focusKeywords": [
                "referenced internally; pypdf did not expose a clean item boundary"
            ],
            "digest": "local case or subrule under §35.9, verify exact examples and boundaries in the PDF."
        }
    ],
    "35.13": [
        {
            "id": "35.13.1",
            "ref": "Andrews Lesson 35.13.1",
            "itemKind": "numbered item",
            "page": 337,
            "focusKeywords": [
                "subject",
                "pronoun",
                "singular-number",
                "dyad",
                "c-0"
            ],
            "digest": "local case or subrule under §35.13, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "35.13.2",
            "ref": "Andrews Lesson 35.13.2",
            "itemKind": "numbered item",
            "page": 337,
            "focusKeywords": [
                "subject",
                "pronoun",
                "singular-number",
                "dyad",
                "qui-0",
                "supportive"
            ],
            "digest": "local case or subrule under §35.13, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "35.13.3",
            "ref": "Andrews Lesson 35.13.3",
            "itemKind": "numbered item",
            "page": 337,
            "focusKeywords": [
                "belongs",
                "class",
                "band",
                "perfective",
                "ending"
            ],
            "digest": "local case or subrule under §35.13, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "35.13.4",
            "ref": "Andrews Lesson 35.13.4",
            "itemKind": "numbered item",
            "page": 337,
            "focusKeywords": [
                "although",
                "should",
                "cause",
                "problem",
                "remember",
                "intervocalic"
            ],
            "digest": "local case or subrule under §35.13, verify exact examples and boundaries in the PDF."
        }
    ],
    "36.6": [
        {
            "id": "36.6.1",
            "ref": "Andrews Lesson 36.6.1",
            "itemKind": "numbered item",
            "page": 346,
            "focusKeywords": [
                "cutting",
                "instrument",
                "tla",
                "tequi",
                "cut"
            ],
            "digest": "local case or subrule under §36.6, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "36.6.2",
            "ref": "Andrews Lesson 36.6.2",
            "itemKind": "numbered item",
            "page": 346,
            "focusKeywords": [
                "means",
                "sleeping",
                "cochi",
                "sleep"
            ],
            "digest": "local case or subrule under §36.6, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "36.6.3",
            "ref": "Andrews Lesson 36.6.3",
            "itemKind": "numbered item",
            "page": 346,
            "focusKeywords": [
                "means",
                "curing",
                "m-o",
                "pah-ti",
                "cure",
                "oneself"
            ],
            "digest": "local case or subrule under §36.6, verify exact examples and boundaries in the PDF."
        }
    ],
    "36.8": [
        {
            "id": "36.8.1",
            "ref": "Andrews Lesson 36.8.1",
            "itemKind": "numbered item",
            "page": 348,
            "focusKeywords": [
                "restricted-use",
                "found",
                "absolutive-state",
                "future-agentive",
                "char"
            ],
            "digest": "local case or subrule under §36.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "36.8.2",
            "ref": "Andrews Lesson 36.8.2",
            "itemKind": "numbered item",
            "page": 349,
            "focusKeywords": [
                "general-use",
                "fully",
                "nominal",
                "belongs",
                "subclass",
                "1-a"
            ],
            "digest": "local case or subrule under §36.8, verify exact examples and boundaries in the PDF."
        }
    ],
    "36.10": [
        {
            "id": "36.10.1",
            "ref": "Andrews Lesson 36.10.1",
            "itemKind": "numbered item",
            "page": 350,
            "focusKeywords": [
                "possessive-state",
                "passive-action",
                "general-use",
                "occurs",
                "pos"
            ],
            "digest": "local case or subrule under §36.10, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "36.10.2",
            "ref": "Andrews Lesson 36.10.2",
            "itemKind": "numbered item",
            "page": 351,
            "focusKeywords": [
                "absolutive-state",
                "passive-action",
                "restricted-use",
                "found",
                "absolu"
            ],
            "digest": "local case or subrule under §36.10, verify exact examples and boundaries in the PDF."
        }
    ],
    "36.11": [
        {
            "id": "36.11.1",
            "ref": "Andrews Lesson 36.11.1",
            "itemKind": "numbered item",
            "page": 352,
            "focusKeywords": [
                "possessive-state",
                "active-action",
                "general-use",
                "posses"
            ],
            "digest": "local case or subrule under §36.11, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "36.11.2",
            "ref": "Andrews Lesson 36.11.2",
            "itemKind": "numbered item",
            "page": 353,
            "focusKeywords": [
                "absolutive-state",
                "active-action",
                "restricted-use",
                "occurs",
                "abso"
            ],
            "digest": "local case or subrule under §36.11, verify exact examples and boundaries in the PDF."
        }
    ],
    "37.2": [
        {
            "id": "37.2.1",
            "ref": "Andrews Lesson 37.2.1",
            "itemKind": "numbered item",
            "page": 358,
            "focusKeywords": [
                "ending",
                "replacive",
                "imperfective",
                "changes"
            ],
            "digest": "local case or subrule under §37.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "37.2.2",
            "ref": "Andrews Lesson 37.2.2",
            "itemKind": "numbered item",
            "page": 358,
            "focusKeywords": [
                "ending",
                "use",
                "base",
                "replacive",
                "changes"
            ],
            "digest": "local case or subrule under §37.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "37.2.3",
            "ref": "Andrews Lesson 37.2.3",
            "itemKind": "numbered item",
            "page": 359,
            "focusKeywords": [
                "ending",
                "replacive",
                "imperfective",
                "changes",
                "isl"
            ],
            "digest": "local case or subrule under §37.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "37.2.4",
            "ref": "Andrews Lesson 37.2.4",
            "itemKind": "numbered item",
            "page": 359,
            "focusKeywords": [
                "certain",
                "intransitive",
                "consist",
                "root",
                "plus",
                "see"
            ],
            "digest": "local case or subrule under §37.2, verify exact examples and boundaries in the PDF."
        }
    ],
    "37.5": [
        {
            "id": "37.5.1",
            "ref": "Andrews Lesson 37.5.1",
            "itemKind": "numbered item",
            "page": 359,
            "focusKeywords": [
                "active-action",
                "derived",
                "compound"
            ],
            "digest": "local case or subrule under §37.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "37.5.2",
            "ref": "Andrews Lesson 37.5.2",
            "itemKind": "numbered item",
            "page": 360,
            "focusKeywords": [
                "deverbal",
                "derived",
                "either",
                "liz",
                "mean",
                "entity"
            ],
            "digest": "local case or subrule under §37.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "37.5.2.a",
            "ref": "Andrews Lesson 37.5.2.a",
            "itemKind": "lettered item",
            "page": 360,
            "focusKeywords": [
                "intransitive",
                "potential-patient"
            ],
            "digest": "local case or subrule under §37.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "37.5.2.b",
            "ref": "Andrews Lesson 37.5.2.b",
            "itemKind": "lettered item",
            "page": 360,
            "focusKeywords": [
                "transitive",
                "potential-patient",
                "distinguished"
            ],
            "digest": "local case or subrule under §37.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "37.5.3",
            "ref": "Andrews Lesson 37.5.3",
            "itemKind": "numbered item",
            "page": 361,
            "focusKeywords": [
                "suffixal",
                "unit",
                "liz",
                "added",
                "impersonal-voice",
                "verbcore"
            ],
            "digest": "local case or subrule under §37.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "37.5.3.a",
            "ref": "Andrews Lesson 37.5.3.a",
            "itemKind": "lettered item",
            "page": 361,
            "focusKeywords": [
                "impersonal",
                "nonactive",
                "suffix"
            ],
            "digest": "local case or subrule under §37.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "37.5.3.b",
            "ref": "Andrews Lesson 37.5.3.b",
            "itemKind": "lettered item",
            "page": 361,
            "focusKeywords": [
                "impersonal",
                "tla"
            ],
            "digest": "local case or subrule under §37.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "37.5.4",
            "ref": "Andrews Lesson 37.5.4",
            "itemKind": "numbered item",
            "page": 361,
            "focusKeywords": [
                "active-action",
                "embed",
                "compound"
            ],
            "digest": "local case or subrule under §37.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "37.5.4.a",
            "ref": "Andrews Lesson 37.5.4.a",
            "itemKind": "lettered item",
            "page": 361,
            "focusKeywords": [
                "filling",
                "matrix",
                "subposition"
            ],
            "digest": "local case or subrule under §37.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "37.5.4.b",
            "ref": "Andrews Lesson 37.5.4.b",
            "itemKind": "lettered item",
            "page": 361,
            "focusKeywords": [
                "filling",
                "matrix",
                "subposition"
            ],
            "digest": "local case or subrule under §37.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "37.5.5",
            "ref": "Andrews Lesson 37.5.5",
            "itemKind": "numbered item",
            "page": 362,
            "focusKeywords": [
                "liz",
                "embedded",
                "compound",
                "affec"
            ],
            "digest": "local case or subrule under §37.5, verify exact examples and boundaries in the PDF."
        }
    ],
    "37.9": [
        {
            "id": "37.9.1",
            "ref": "Andrews Lesson 37.9.1",
            "itemKind": "numbered item",
            "page": 363,
            "focusKeywords": [
                "core",
                "passive-voice",
                "object",
                "pronouns",
                "patientive",
                "noun"
            ],
            "digest": "local case or subrule under §37.9, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "37.9.1.a",
            "ref": "Andrews Lesson 37.9.1.a",
            "itemKind": "lettered item",
            "page": 363,
            "focusKeywords": [
                "derivation",
                "passive-voice",
                "suffix"
            ],
            "digest": "local case or subrule under §37.9, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "37.9.1.b",
            "ref": "Andrews Lesson 37.9.1.b",
            "itemKind": "lettered item",
            "page": 364,
            "focusKeywords": [
                "derivation",
                "passive",
                "nonactive",
                "suffix"
            ],
            "digest": "local case or subrule under §37.9, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "37.9.1.c",
            "ref": "Andrews Lesson 37.9.1.c",
            "itemKind": "lettered item",
            "page": 365,
            "focusKeywords": [
                "derivation",
                "passive",
                "nonactive",
                "suffix",
                "hua"
            ],
            "digest": "local case or subrule under §37.9, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "37.9.2",
            "ref": "Andrews Lesson 37.9.2",
            "itemKind": "numbered item",
            "page": 365,
            "focusKeywords": [
                "passive",
                "reflexive",
                "shuntline",
                "pronoun",
                "occurs"
            ],
            "digest": "local case or subrule under §37.9, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "37.9.3",
            "ref": "Andrews Lesson 37.9.3",
            "itemKind": "numbered item",
            "page": 365,
            "focusKeywords": [
                "passive",
                "derived",
                "having",
                "projective",
                "objects"
            ],
            "digest": "local case or subrule under §37.9, verify exact examples and boundaries in the PDF."
        }
    ],
    "38.1": [
        {
            "id": "38.1.1",
            "ref": "Andrews Lesson 38.1.1",
            "itemKind": "numbered item",
            "page": 367,
            "focusKeywords": [
                "intransitive",
                "active",
                "times",
                "difficult",
                "capture",
                "through"
            ],
            "digest": "local case or subrule under §38.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "38.1.1.a",
            "ref": "Andrews Lesson 38.1.1.a",
            "itemKind": "lettered item",
            "page": 367,
            "focusKeywords": [
                "derived",
                "impersonal-voice",
                "core"
            ],
            "digest": "local case or subrule under §38.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "38.1.1.b",
            "ref": "Andrews Lesson 38.1.1.b",
            "itemKind": "lettered item",
            "page": 368,
            "focusKeywords": [
                "derived",
                "impersonal-voice",
                "core"
            ],
            "digest": "local case or subrule under §38.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "38.1.1.c",
            "ref": "Andrews Lesson 38.1.1.c",
            "itemKind": "lettered item",
            "page": 369,
            "focusKeywords": [
                "derived",
                "impersonal-voice",
                "core",
                "built"
            ],
            "digest": "local case or subrule under §38.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "38.1.1.d",
            "ref": "Andrews Lesson 38.1.1.d",
            "itemKind": "lettered item",
            "page": 369,
            "focusKeywords": [
                "derived",
                "impersonal-voice",
                "core",
                "built"
            ],
            "digest": "local case or subrule under §38.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "38.1.2",
            "ref": "Andrews Lesson 38.1.2",
            "itemKind": "numbered item",
            "page": 369,
            "focusKeywords": [
                "transitive",
                "active",
                "reflexive",
                "object",
                "pronoun",
                "unless"
            ],
            "digest": "local case or subrule under §38.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "38.1.3",
            "ref": "Andrews Lesson 38.1.3",
            "itemKind": "numbered item",
            "page": 369,
            "focusKeywords": [
                "transitive",
                "active",
                "projective",
                "object",
                "pronoun",
                "tla"
            ],
            "digest": "local case or subrule under §38.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "38.1.3.a",
            "ref": "Andrews Lesson 38.1.3.a",
            "itemKind": "lettered item",
            "page": 369,
            "focusKeywords": [
                "derived",
                "impersonal-voice",
                "core"
            ],
            "digest": "local case or subrule under §38.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "38.1.3.b",
            "ref": "Andrews Lesson 38.1.3.b",
            "itemKind": "lettered item",
            "page": 370,
            "focusKeywords": [
                "derived",
                "impersonal-voice",
                "core"
            ],
            "digest": "local case or subrule under §38.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "38.1.3.c",
            "ref": "Andrews Lesson 38.1.3.c",
            "itemKind": "lettered item",
            "page": 370,
            "focusKeywords": [
                "derived",
                "impersonal-voice",
                "core"
            ],
            "digest": "local case or subrule under §38.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "38.1.4",
            "ref": "Andrews Lesson 38.1.4",
            "itemKind": "numbered item",
            "page": 371,
            "focusKeywords": [
                "projective",
                "active",
                "active-voice",
                "single-object"
            ],
            "digest": "local case or subrule under §38.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "38.1.4.a",
            "ref": "Andrews Lesson 38.1.4.a",
            "itemKind": "lettered item",
            "page": 371,
            "focusKeywords": [
                "derived",
                "nonactive"
            ],
            "digest": "local case or subrule under §38.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "38.1.4.b",
            "ref": "Andrews Lesson 38.1.4.b",
            "itemKind": "lettered item",
            "page": 372,
            "focusKeywords": [
                "derived",
                "nonactive",
                "suffix"
            ],
            "digest": "local case or subrule under §38.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "38.1.4.c",
            "ref": "Andrews Lesson 38.1.4.c",
            "itemKind": "lettered item",
            "page": 372,
            "focusKeywords": [
                "derived",
                "nonactive",
                "suffix",
                "hua",
                "becomes"
            ],
            "digest": "local case or subrule under §38.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "38.1.5",
            "ref": "Andrews Lesson 38.1.5",
            "itemKind": "numbered item",
            "page": 373,
            "focusKeywords": [
                "impersonal",
                "patientive",
                "human",
                "versus",
                "nonhuman",
                "contrast"
            ],
            "digest": "local case or subrule under §38.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "38.1.6",
            "ref": "Andrews Lesson 38.1.6",
            "itemKind": "numbered item",
            "page": 374,
            "focusKeywords": [
                "times",
                "impersonal",
                "passive",
                "active-action"
            ],
            "digest": "local case or subrule under §38.1, verify exact examples and boundaries in the PDF."
        }
    ],
    "38.2": [
        {
            "id": "38.2.1",
            "ref": "Andrews Lesson 38.2.1",
            "itemKind": "numbered item",
            "page": 374,
            "focusKeywords": [
                "patientive",
                "compound"
            ],
            "digest": "local case or subrule under §38.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "38.2.2",
            "ref": "Andrews Lesson 38.2.2",
            "itemKind": "numbered item",
            "page": 375,
            "focusKeywords": [
                "deverbal",
                "like",
                "any",
                "other",
                "matrix",
                "com"
            ],
            "digest": "local case or subrule under §38.2, verify exact examples and boundaries in the PDF."
        }
    ],
    "39.2": [
        {
            "id": "39.2.1",
            "ref": "Andrews Lesson 39.2.1",
            "itemKind": "numbered item",
            "page": 378,
            "focusKeywords": [
                "transitive",
                "imperfective",
                "patientive"
            ],
            "digest": "local case or subrule under §39.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "39.2.2",
            "ref": "Andrews Lesson 39.2.2",
            "itemKind": "numbered item",
            "page": 379,
            "focusKeywords": [
                "transitive",
                "intransitive",
                "imperfective",
                "patientive",
                "noun"
            ],
            "digest": "local case or subrule under §39.2, verify exact examples and boundaries in the PDF."
        }
    ],
    "39.3": [
        {
            "id": "39.3.1",
            "ref": "Andrews Lesson 39.3.1",
            "itemKind": "numbered item",
            "page": 380,
            "focusKeywords": [
                "patientive",
                "signify",
                "state",
                "quality",
                "inherent",
                "entity"
            ],
            "digest": "local case or subrule under §39.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "39.3.2",
            "ref": "Andrews Lesson 39.3.2",
            "itemKind": "numbered item",
            "page": 381,
            "focusKeywords": [
                "patientive",
                "signify",
                "thing",
                "pertaining",
                "incorporated"
            ],
            "digest": "local case or subrule under §39.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "39.3.3",
            "ref": "Andrews Lesson 39.3.3",
            "itemKind": "numbered item",
            "page": 381,
            "focusKeywords": [
                "patientive",
                "signify",
                "thing",
                "intrinsic",
                "incorporated"
            ],
            "digest": "local case or subrule under §39.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "39.3.4",
            "ref": "Andrews Lesson 39.3.4",
            "itemKind": "numbered item",
            "page": 382,
            "focusKeywords": [
                "possessive-state",
                "entity",
                "referred",
                "subject",
                "pronoun",
                "part"
            ],
            "digest": "local case or subrule under §39.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "39.3.5",
            "ref": "Andrews Lesson 39.3.5",
            "itemKind": "numbered item",
            "page": 384,
            "focusKeywords": [
                "kind",
                "compound",
                "which",
                "fills",
                "matrix",
                "subposition"
            ],
            "digest": "local case or subrule under §39.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "39.3.6",
            "ref": "Andrews Lesson 39.3.6",
            "itemKind": "numbered item",
            "page": 384,
            "focusKeywords": [
                "kind",
                "compound",
                "which",
                "fills",
                "matrix",
                "subposition"
            ],
            "digest": "local case or subrule under §39.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "39.3.6.a",
            "ref": "Andrews Lesson 39.3.6.a",
            "itemKind": "lettered item",
            "page": 384,
            "focusKeywords": [
                "passive-action",
                "embed"
            ],
            "digest": "local case or subrule under §39.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "39.3.6.b",
            "ref": "Andrews Lesson 39.3.6.b",
            "itemKind": "lettered item",
            "page": 384,
            "focusKeywords": [
                "active-action",
                "embed"
            ],
            "digest": "local case or subrule under §39.3, verify exact examples and boundaries in the PDF."
        }
    ],
    "39.4": [
        {
            "id": "39.4.1",
            "ref": "Andrews Lesson 39.4.1",
            "itemKind": "numbered item",
            "page": 385,
            "focusKeywords": [
                "intransitive",
                "destockal",
                "kind",
                "see",
                "stock",
                "patientive"
            ],
            "digest": "local case or subrule under §39.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "39.4.2",
            "ref": "Andrews Lesson 39.4.2",
            "itemKind": "numbered item",
            "page": 387,
            "focusKeywords": [
                "intransitive",
                "destockal",
                "hua",
                "kind",
                "see",
                "stock-based"
            ],
            "digest": "local case or subrule under §39.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "39.4.3",
            "ref": "Andrews Lesson 39.4.3",
            "itemKind": "numbered item",
            "page": 388,
            "focusKeywords": [
                "intransitive",
                "destockal",
                "i-hui",
                "a-hui",
                "kind",
                "see"
            ],
            "digest": "local case or subrule under §39.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "39.4.4",
            "ref": "Andrews Lesson 39.4.4",
            "itemKind": "numbered item",
            "page": 388,
            "focusKeywords": [
                "stock",
                "certain",
                "intransitive",
                "destockal",
                "verbs",
                "agentive"
            ],
            "digest": "local case or subrule under §39.4, verify exact examples and boundaries in the PDF."
        }
    ],
    "39.6": [
        {
            "id": "39.6.1",
            "ref": "Andrews Lesson 39.6.1",
            "itemKind": "numbered item",
            "page": 390,
            "focusKeywords": [
                "nominal",
                "matrix"
            ],
            "digest": "local case or subrule under §39.6, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "39.6.2",
            "ref": "Andrews Lesson 39.6.2",
            "itemKind": "numbered item",
            "page": 390,
            "focusKeywords": [
                "verbal",
                "matrix"
            ],
            "digest": "local case or subrule under §39.6, verify exact examples and boundaries in the PDF."
        }
    ],
    "39.7": [
        {
            "id": "39.7.1",
            "ref": "Andrews Lesson 39.7.1",
            "itemKind": "numbered item",
            "page": 390,
            "focusKeywords": [
                "embed",
                "object",
                "complement",
                "absolutive-state"
            ],
            "digest": "local case or subrule under §39.7, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "39.7.1.a",
            "ref": "Andrews Lesson 39.7.1.a",
            "itemKind": "lettered item",
            "page": 390,
            "focusKeywords": [
                "matrix",
                "verb",
                "perception"
            ],
            "digest": "local case or subrule under §39.7, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "39.7.1.b",
            "ref": "Andrews Lesson 39.7.1.b",
            "itemKind": "lettered item",
            "page": 390,
            "focusKeywords": [
                "matrix",
                "mentioned"
            ],
            "digest": "local case or subrule under §39.7, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "39.7.1.c",
            "ref": "Andrews Lesson 39.7.1.c",
            "itemKind": "lettered item",
            "page": 391,
            "focusKeywords": [
                "matrix",
                "m-o",
                "tla",
                "tlani",
                "desire",
                "want"
            ],
            "digest": "local case or subrule under §39.7, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "39.7.2",
            "ref": "Andrews Lesson 39.7.2",
            "itemKind": "numbered item",
            "page": 392,
            "focusKeywords": [
                "embed",
                "object",
                "complement",
                "possessive",
                "state",
                "pos"
            ],
            "digest": "local case or subrule under §39.7, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "39.7.2.a",
            "ref": "Andrews Lesson 39.7.2.a",
            "itemKind": "lettered item",
            "page": 392,
            "focusKeywords": [
                "matrix",
                "m-o",
                "toca",
                "consider",
                "baselessly"
            ],
            "digest": "local case or subrule under §39.7, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "39.7.2.b",
            "ref": "Andrews Lesson 39.7.2.b",
            "itemKind": "lettered item",
            "page": 392,
            "focusKeywords": [
                "matrix",
                "tla",
                "tlani",
                "desire",
                "wants",
                "come"
            ],
            "digest": "local case or subrule under §39.7, verify exact examples and boundaries in the PDF."
        }
    ],
    "40.2": [
        {
            "id": "40.2.1",
            "ref": "Andrews Lesson 40.2.1",
            "itemKind": "numbered item",
            "page": 395,
            "focusKeywords": [
                "adjectival",
                "hue-i",
                "big",
                "person",
                "thing",
                "same"
            ],
            "digest": "local case or subrule under §40.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "40.2.2",
            "ref": "Andrews Lesson 40.2.2",
            "itemKind": "numbered item",
            "page": 395,
            "focusKeywords": [
                "adjectival",
                "nepapan",
                "they",
                "various",
                "ones",
                "diverse"
            ],
            "digest": "local case or subrule under §40.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "40.2.3",
            "ref": "Andrews Lesson 40.2.3",
            "itemKind": "numbered item",
            "page": 396,
            "focusKeywords": [
                "adjective",
                "anomalous",
                "them",
                "translated",
                "eng"
            ],
            "digest": "local case or subrule under §40.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "40.2.3.a",
            "ref": "Andrews Lesson 40.2.3.a",
            "itemKind": "lettered item",
            "page": 396,
            "focusKeywords": [
                "ce-l",
                "translated",
                "alone",
                "related",
                "numeral"
            ],
            "digest": "local case or subrule under §40.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "40.2.3.b",
            "ref": "Andrews Lesson 40.2.3.b",
            "itemKind": "lettered item",
            "page": 396,
            "focusKeywords": [
                "0-is",
                "translated",
                "english",
                "adjective",
                "diligent",
                "eager"
            ],
            "digest": "local case or subrule under §40.2, verify exact examples and boundaries in the PDF."
        }
    ],
    "40.3": [
        {
            "id": "40.3.1",
            "ref": "Andrews Lesson 40.3.1",
            "itemKind": "numbered item",
            "page": 397,
            "focusKeywords": [
                "predicates",
                "translated",
                "adjectives"
            ],
            "digest": "local case or subrule under §40.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "40.3.2",
            "ref": "Andrews Lesson 40.3.2",
            "itemKind": "numbered item",
            "page": 397,
            "focusKeywords": [
                "predicates",
                "translated",
                "adjectives"
            ],
            "digest": "local case or subrule under §40.3, verify exact examples and boundaries in the PDF."
        }
    ],
    "40.4": [
        {
            "id": "40.4.1",
            "ref": "Andrews Lesson 40.4.1",
            "itemKind": "numbered item",
            "page": 397,
            "focusKeywords": [
                "patientive",
                "unlike",
                "english",
                "adjectives",
                "which",
                "assign"
            ],
            "digest": "local case or subrule under §40.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "40.4.1.a",
            "ref": "Andrews Lesson 40.4.1.a",
            "itemKind": "lettered item",
            "page": 397,
            "focusKeywords": [
                "patientive",
                "passive-stem",
                "type"
            ],
            "digest": "local case or subrule under §40.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "40.4.1.b",
            "ref": "Andrews Lesson 40.4.1.b",
            "itemKind": "lettered item",
            "page": 397,
            "focusKeywords": [
                "patientive",
                "impersonal-stem",
                "type"
            ],
            "digest": "local case or subrule under §40.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "40.4.1.c",
            "ref": "Andrews Lesson 40.4.1.c",
            "itemKind": "lettered item",
            "page": 398,
            "focusKeywords": [
                "patientive",
                "perfective-stem",
                "type"
            ],
            "digest": "local case or subrule under §40.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "40.4.1.d",
            "ref": "Andrews Lesson 40.4.1.d",
            "itemKind": "lettered item",
            "page": 398,
            "focusKeywords": [
                "patientive",
                "root",
                "stock",
                "type"
            ],
            "digest": "local case or subrule under §40.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "40.4.2",
            "ref": "Andrews Lesson 40.4.2",
            "itemKind": "numbered item",
            "page": 398,
            "focusKeywords": [
                "potential-patient",
                "derived",
                "means",
                "suf"
            ],
            "digest": "local case or subrule under §40.4, verify exact examples and boundaries in the PDF."
        }
    ],
    "40.8": [
        {
            "id": "40.8.1",
            "ref": "Andrews Lesson 40.8.1",
            "itemKind": "numbered item",
            "page": 399,
            "focusKeywords": [
                "class",
                "including",
                "passive"
            ],
            "digest": "local case or subrule under §40.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "40.8.2",
            "ref": "Andrews Lesson 40.8.2",
            "itemKind": "numbered item",
            "page": 400,
            "focusKeywords": [
                "class",
                "singular",
                "common",
                "subject",
                "pronoun",
                "number"
            ],
            "digest": "local case or subrule under §40.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "40.8.3",
            "ref": "Andrews Lesson 40.8.3",
            "itemKind": "numbered item",
            "page": 401,
            "focusKeywords": [
                "class",
                "singular",
                "common",
                "subject",
                "pronoun",
                "number"
            ],
            "digest": "local case or subrule under §40.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "40.8.4",
            "ref": "Andrews Lesson 40.8.4",
            "itemKind": "numbered item",
            "page": 401,
            "focusKeywords": [
                "class",
                "singular",
                "common",
                "subject",
                "pronoun",
                "number"
            ],
            "digest": "local case or subrule under §40.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "40.8.5",
            "ref": "Andrews Lesson 40.8.5",
            "itemKind": "numbered item",
            "page": 401,
            "focusKeywords": [
                "predicate",
                "compound-stemmed",
                "translated",
                "adjective"
            ],
            "digest": "local case or subrule under §40.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "40.8.6",
            "ref": "Andrews Lesson 40.8.6",
            "itemKind": "numbered item",
            "page": 401,
            "focusKeywords": [
                "occasionally",
                "longer"
            ],
            "digest": "local case or subrule under §40.8, verify exact examples and boundaries in the PDF."
        }
    ],
    "40.9": [
        {
            "id": "40.9.1",
            "ref": "Andrews Lesson 40.9.1",
            "itemKind": "numbered item",
            "page": 402,
            "focusKeywords": [
                "hue-i",
                "become",
                "big",
                "grow",
                "base",
                "pronoun-like"
            ],
            "digest": "local case or subrule under §40.9, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "40.9.2",
            "ref": "Andrews Lesson 40.9.2",
            "itemKind": "numbered item",
            "page": 403,
            "focusKeywords": [
                "tlaoco-ya",
                "sad",
                "class",
                "according"
            ],
            "digest": "local case or subrule under §40.9, verify exact examples and boundaries in the PDF."
        }
    ],
    "40.10": [
        {
            "id": "40.10.1",
            "ref": "Andrews Lesson 40.10.1",
            "itemKind": "numbered item",
            "page": 403,
            "focusKeywords": [
                "intransitive",
                "destockal",
                "suffix",
                "rarely",
                "hui"
            ],
            "digest": "local case or subrule under §40.10, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "40.10.1.a",
            "ref": "Andrews Lesson 40.10.1.a",
            "itemKind": "lettered item",
            "page": 403,
            "focusKeywords": [
                "green"
            ],
            "digest": "local case or subrule under §40.10, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "40.10.1.b",
            "ref": "Andrews Lesson 40.10.1.b",
            "itemKind": "lettered item",
            "page": 403,
            "focusKeywords": [
                "diminished"
            ],
            "digest": "local case or subrule under §40.10, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "40.10.2",
            "ref": "Andrews Lesson 40.10.2",
            "itemKind": "numbered item",
            "page": 403,
            "focusKeywords": [
                "intransitive",
                "destockal",
                "ending",
                "hua",
                "see",
                "also"
            ],
            "digest": "local case or subrule under §40.10, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "40.10.2.a",
            "ref": "Andrews Lesson 40.10.2.a",
            "itemKind": "lettered item",
            "page": 403,
            "focusKeywords": [
                "dirty"
            ],
            "digest": "local case or subrule under §40.10, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "40.10.2.b",
            "ref": "Andrews Lesson 40.10.2.b",
            "itemKind": "lettered item",
            "page": 403,
            "focusKeywords": [
                "ashen"
            ],
            "digest": "local case or subrule under §40.10, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "40.10.2.c",
            "ref": "Andrews Lesson 40.10.2.c",
            "itemKind": "lettered item",
            "page": 403,
            "focusKeywords": [
                "faded"
            ],
            "digest": "local case or subrule under §40.10, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "40.10.3",
            "ref": "Andrews Lesson 40.10.3",
            "itemKind": "numbered item",
            "page": 404,
            "focusKeywords": [
                "intransitive",
                "destockal",
                "ending",
                "i-hui",
                "a-hui",
                "see"
            ],
            "digest": "local case or subrule under §40.10, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "40.10.3.a",
            "ref": "Andrews Lesson 40.10.3.a",
            "itemKind": "lettered item",
            "page": 404,
            "focusKeywords": [
                "black"
            ],
            "digest": "local case or subrule under §40.10, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "40.10.3.b",
            "ref": "Andrews Lesson 40.10.3.b",
            "itemKind": "lettered item",
            "page": 404,
            "focusKeywords": [
                "wrinkled"
            ],
            "digest": "local case or subrule under §40.10, verify exact examples and boundaries in the PDF."
        }
    ],
    "41.1": [
        {
            "id": "41.1.1",
            "ref": "Andrews Lesson 41.1.1",
            "itemKind": "numbered item",
            "page": 406,
            "focusKeywords": [
                "result",
                "either",
                "nominalization",
                "deverbalizatior",
                "adjectival",
                "aver"
            ],
            "digest": "local case or subrule under §41.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "41.1.2",
            "ref": "Andrews Lesson 41.1.2",
            "itemKind": "numbered item",
            "page": 406,
            "focusKeywords": [
                "intensified",
                "adjectival",
                "means",
                "compound"
            ],
            "digest": "local case or subrule under §41.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "41.1.2.a",
            "ref": "Andrews Lesson 41.1.2.a",
            "itemKind": "lettered item",
            "page": 406,
            "focusKeywords": [
                "embed",
                "which",
                "adjective",
                "ti-0",
                "kind"
            ],
            "digest": "local case or subrule under §41.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "41.1.2.b",
            "ref": "Andrews Lesson 41.1.2.b",
            "itemKind": "lettered item",
            "page": 407,
            "focusKeywords": [
                "embed",
                "root",
                "adjectival",
                "preterit-agentive"
            ],
            "digest": "local case or subrule under §41.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "41.1.2.c",
            "ref": "Andrews Lesson 41.1.2.c",
            "itemKind": "lettered item",
            "page": 407,
            "focusKeywords": [
                "embed",
                "general-use",
                "adjectival",
                "preterit-agentive"
            ],
            "digest": "local case or subrule under §41.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "41.1.2.d",
            "ref": "Andrews Lesson 41.1.2.d",
            "itemKind": "lettered item",
            "page": 407,
            "focusKeywords": [
                "embed",
                "intensified",
                "reduplication",
                "according",
                "subsection",
                "above"
            ],
            "digest": "local case or subrule under §41.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "41.1.2.e",
            "ref": "Andrews Lesson 41.1.2.e",
            "itemKind": "lettered item",
            "page": 407,
            "focusKeywords": [
                "matrix",
                "augmented",
                "internal",
                "expansion",
                "instance",
                "sound"
            ],
            "digest": "local case or subrule under §41.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "41.1.3",
            "ref": "Andrews Lesson 41.1.3",
            "itemKind": "numbered item",
            "page": 407,
            "focusKeywords": [
                "other",
                "less",
                "frequent",
                "compound-stemmed",
                "express",
                "intensification"
            ],
            "digest": "local case or subrule under §41.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "41.1.4",
            "ref": "Andrews Lesson 41.1.4",
            "itemKind": "numbered item",
            "page": 408,
            "focusKeywords": [
                "type",
                "intensified",
                "adjectival",
                "use",
                "affective"
            ],
            "digest": "local case or subrule under §41.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "41.1.4.a",
            "ref": "Andrews Lesson 41.1.4.a",
            "itemKind": "lettered item",
            "page": 408,
            "focusKeywords": [
                "matrix",
                "pol",
                "implies",
                "increase",
                "intensity",
                "quality"
            ],
            "digest": "local case or subrule under §41.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "41.1.4.b",
            "ref": "Andrews Lesson 41.1.4.b",
            "itemKind": "lettered item",
            "page": 408,
            "focusKeywords": [
                "matrix",
                "pil",
                "ton",
                "tli",
                "tzin",
                "imply"
            ],
            "digest": "local case or subrule under §41.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "41.1.5",
            "ref": "Andrews Lesson 41.1.5",
            "itemKind": "numbered item",
            "page": 408,
            "focusKeywords": [
                "means",
                "expressing",
                "intensity",
                "regard",
                "quality",
                "metaphor"
            ],
            "digest": "local case or subrule under §41.1, verify exact examples and boundaries in the PDF."
        }
    ],
    "41.2": [
        {
            "id": "41.2.1",
            "ref": "Andrews Lesson 41.2.1",
            "itemKind": "numbered item",
            "page": 409,
            "focusKeywords": [
                "incorporated-adverb",
                "compound",
                "kind"
            ],
            "digest": "local case or subrule under §41.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "41.2.1.a",
            "ref": "Andrews Lesson 41.2.1.a",
            "itemKind": "lettered item",
            "page": 409,
            "focusKeywords": [
                "adverb",
                "incorporated",
                "according",
                "7-12",
                "modification"
            ],
            "digest": "local case or subrule under §41.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "41.2.1.b",
            "ref": "Andrews Lesson 41.2.1.b",
            "itemKind": "lettered item",
            "page": 409,
            "focusKeywords": [
                "adverb",
                "incorporated",
                "according",
                "com"
            ],
            "digest": "local case or subrule under §41.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "41.2.1.i",
            "ref": "Andrews Lesson 41.2.1.i",
            "itemKind": "lettered item",
            "page": 409,
            "focusKeywords": [
                "subtype",
                "embed",
                "signifies",
                "kind",
                "entity",
                "different"
            ],
            "digest": "local case or subrule under §41.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "41.2.1.i.ii",
            "ref": "Andrews Lesson 41.2.1.i.ii",
            "itemKind": "roman item",
            "page": 410,
            "focusKeywords": [
                "other",
                "subtype",
                "embed",
                "signifies",
                "same",
                "kind"
            ],
            "digest": "local case or subrule under §41.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "41.2.2",
            "ref": "Andrews Lesson 41.2.2",
            "itemKind": "numbered item",
            "page": 411,
            "focusKeywords": [
                "incorporated-complement",
                "compound",
                "few",
                "manifest"
            ],
            "digest": "local case or subrule under §41.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "41.2.3",
            "ref": "Andrews Lesson 41.2.3",
            "itemKind": "numbered item",
            "page": 411,
            "focusKeywords": [
                "incorporated-object",
                "compound",
                "occur"
            ],
            "digest": "local case or subrule under §41.2, verify exact examples and boundaries in the PDF."
        }
    ],
    "42.2": [
        {
            "id": "42.2.1",
            "ref": "Andrews Lesson 42.2.1",
            "itemKind": "numbered item",
            "page": 413,
            "focusKeywords": [
                "structure",
                "supplementation",
                "see",
                "lesson"
            ],
            "digest": "local case or subrule under §42.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "42.2.2",
            "ref": "Andrews Lesson 42.2.2",
            "itemKind": "numbered item",
            "page": 413,
            "focusKeywords": [
                "structure",
                "modification"
            ],
            "digest": "local case or subrule under §42.2, verify exact examples and boundaries in the PDF."
        }
    ],
    "42.8": [
        {
            "id": "42.8.1",
            "ref": "Andrews Lesson 42.8.1",
            "itemKind": "numbered item",
            "page": 417,
            "focusKeywords": [
                "intransitive",
                "already",
                "been",
                "implied",
                "examples",
                "canahuac"
            ],
            "digest": "local case or subrule under §42.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "42.8.2",
            "ref": "Andrews Lesson 42.8.2",
            "itemKind": "numbered item",
            "page": 417,
            "focusKeywords": [
                "transitive",
                "contains",
                "reflexive",
                "object",
                "pronoun"
            ],
            "digest": "local case or subrule under §42.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "42.8.2.a",
            "ref": "Andrews Lesson 42.8.2.a",
            "itemKind": "lettered item",
            "page": 417,
            "focusKeywords": [
                "unambiguous",
                "concatenation",
                "modification"
            ],
            "digest": "local case or subrule under §42.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "42.8.2.i",
            "ref": "Andrews Lesson 42.8.2.i",
            "itemKind": "lettered item",
            "page": 417,
            "focusKeywords": [
                "concatenation",
                "means",
                "subject",
                "pronoun"
            ],
            "digest": "local case or subrule under §42.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "42.8.2.i.ii",
            "ref": "Andrews Lesson 42.8.2.i.ii",
            "itemKind": "roman item",
            "page": 418,
            "focusKeywords": [
                "concatenation",
                "means",
                "object",
                "pronoun"
            ],
            "digest": "local case or subrule under §42.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "42.8.2.b",
            "ref": "Andrews Lesson 42.8.2.b",
            "itemKind": "lettered item",
            "page": 418,
            "focusKeywords": [
                "ambiguous",
                "concatenation",
                "either",
                "supplementation",
                "modification"
            ],
            "digest": "local case or subrule under §42.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "42.8.3",
            "ref": "Andrews Lesson 42.8.3",
            "itemKind": "numbered item",
            "page": 419,
            "focusKeywords": [
                "adverbialized",
                "see",
                "lesson"
            ],
            "digest": "local case or subrule under §42.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "42.8.4",
            "ref": "Andrews Lesson 42.8.4",
            "itemKind": "numbered item",
            "page": 419,
            "focusKeywords": [
                "cardinal-numeral"
            ],
            "digest": "local case or subrule under §42.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "42.8.5",
            "ref": "Andrews Lesson 42.8.5",
            "itemKind": "numbered item",
            "page": 419,
            "focusKeywords": [
                "quantitive",
                "pronominal"
            ],
            "digest": "local case or subrule under §42.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "42.8.6",
            "ref": "Andrews Lesson 42.8.6",
            "itemKind": "numbered item",
            "page": 420,
            "focusKeywords": [
                "annnc"
            ],
            "digest": "local case or subrule under §42.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "42.8.7",
            "ref": "Andrews Lesson 42.8.7",
            "itemKind": "numbered item",
            "page": 420,
            "focusKeywords": [
                "structure",
                "supplementation"
            ],
            "digest": "local case or subrule under §42.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "42.8.8",
            "ref": "Andrews Lesson 42.8.8",
            "itemKind": "numbered item",
            "page": 420,
            "focusKeywords": [
                "contrary",
                "what",
                "translation",
                "suggests",
                "personal",
                "pronominal"
            ],
            "digest": "local case or subrule under §42.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "42.8.9",
            "ref": "Andrews Lesson 42.8.9",
            "itemKind": "numbered item",
            "page": 421,
            "focusKeywords": [
                "explained",
                "measure",
                "serves",
                "head",
                "reporting"
            ],
            "digest": "local case or subrule under §42.8, verify exact examples and boundaries in the PDF."
        }
    ],
    "43.1": [
        {
            "id": "43.1.1",
            "ref": "Andrews Lesson 43.1.1",
            "itemKind": "numbered item",
            "page": 423,
            "focusKeywords": [
                "nonpreposed",
                "adjectival",
                "adjunct",
                "contain",
                "supplementary",
                "elements"
            ],
            "digest": "local case or subrule under §43.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "43.1.2",
            "ref": "Andrews Lesson 43.1.2",
            "itemKind": "numbered item",
            "page": 423,
            "focusKeywords": [
                "supplementary",
                "element",
                "adjectival",
                "adjunct",
                "distance"
            ],
            "digest": "local case or subrule under §43.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "43.1.3",
            "ref": "Andrews Lesson 43.1.3",
            "itemKind": "numbered item",
            "page": 423,
            "focusKeywords": [
                "favorite",
                "construction",
                "combines",
                "nonpreposed",
                "adjectival",
                "modifier"
            ],
            "digest": "local case or subrule under §43.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "43.1.4",
            "ref": "Andrews Lesson 43.1.4",
            "itemKind": "numbered item",
            "page": 424,
            "focusKeywords": [
                "nahuatl",
                "frequently",
                "nonpreposed",
                "adjectival",
                "adjunct",
                "modifier"
            ],
            "digest": "local case or subrule under §43.1, verify exact examples and boundaries in the PDF."
        }
    ],
    "43.4": [
        {
            "id": "43.4.1",
            "ref": "Andrews Lesson 43.4.1",
            "itemKind": "numbered item",
            "page": 426,
            "focusKeywords": [
                "adjoined",
                "structure",
                "supplementation"
            ],
            "digest": "local case or subrule under §43.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "43.4.1.a",
            "ref": "Andrews Lesson 43.4.1.a",
            "itemKind": "lettered item",
            "page": 426,
            "focusKeywords": [
                "translated",
                "person",
                "adjunctor",
                "lack"
            ],
            "digest": "local case or subrule under §43.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "43.4.1.b",
            "ref": "Andrews Lesson 43.4.1.b",
            "itemKind": "lettered item",
            "page": 426,
            "focusKeywords": [
                "tleh",
                "translated",
                "thing",
                "adjunctor",
                "absence"
            ],
            "digest": "local case or subrule under §43.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "43.4.2",
            "ref": "Andrews Lesson 43.4.2",
            "itemKind": "numbered item",
            "page": 426,
            "focusKeywords": [
                "adjoined",
                "structure",
                "adjectival",
                "modification"
            ],
            "digest": "local case or subrule under §43.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "43.4.2.a",
            "ref": "Andrews Lesson 43.4.2.a",
            "itemKind": "lettered item",
            "page": 426,
            "focusKeywords": [
                "translated",
                "someone",
                "anyone",
                "adjunctor",
                "absence",
                "fol"
            ],
            "digest": "local case or subrule under §43.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "43.4.2.b",
            "ref": "Andrews Lesson 43.4.2.b",
            "itemKind": "lettered item",
            "page": 427,
            "focusKeywords": [
                "tleh",
                "translated",
                "something",
                "anything",
                "adjunctor",
                "absence"
            ],
            "digest": "local case or subrule under §43.4, verify exact examples and boundaries in the PDF."
        }
    ],
    "43.6": [
        {
            "id": "43.6.1",
            "ref": "Andrews Lesson 43.6.1",
            "itemKind": "numbered item",
            "page": 428,
            "focusKeywords": [
                "group",
                "designated",
                "pronominal",
                "plural",
                "subject",
                "pronoun"
            ],
            "digest": "local case or subrule under §43.6, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "43.6.2",
            "ref": "Andrews Lesson 43.6.2",
            "itemKind": "numbered item",
            "page": 428,
            "focusKeywords": [
                "group",
                "designated",
                "plural",
                "subject",
                "pronoun",
                "con"
            ],
            "digest": "local case or subrule under §43.6, verify exact examples and boundaries in the PDF."
        }
    ],
    "43.7": [
        {
            "id": "43.7.1",
            "ref": "Andrews Lesson 43.7.1",
            "itemKind": "numbered item",
            "page": 429,
            "focusKeywords": [
                "built",
                "pronominal",
                "a-c",
                "someone",
                "using",
                "third-per"
            ],
            "digest": "local case or subrule under §43.7, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "43.7.2",
            "ref": "Andrews Lesson 43.7.2",
            "itemKind": "numbered item",
            "page": 429,
            "focusKeywords": [
                "negative",
                "pronominal",
                "ayac",
                "she"
            ],
            "digest": "local case or subrule under §43.7, verify exact examples and boundaries in the PDF."
        }
    ],
    "44.3": [
        {
            "id": "44.3.1",
            "ref": "Andrews Lesson 44.3.1",
            "itemKind": "referenced subsection",
            "page": 132,
            "focusKeywords": [
                "referenced internally; pypdf did not expose a clean item boundary"
            ],
            "digest": "local case or subrule under §44.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "44.3.5",
            "ref": "Andrews Lesson 44.3.5",
            "itemKind": "referenced subsection",
            "page": 39,
            "focusKeywords": [
                "referenced internally; pypdf did not expose a clean item boundary"
            ],
            "digest": "local case or subrule under §44.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "44.3.8",
            "ref": "Andrews Lesson 44.3.8",
            "itemKind": "referenced subsection",
            "page": 80,
            "focusKeywords": [
                "referenced internally; pypdf did not expose a clean item boundary"
            ],
            "digest": "local case or subrule under §44.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "44.3.9",
            "ref": "Andrews Lesson 44.3.9",
            "itemKind": "referenced subsection",
            "page": 442,
            "focusKeywords": [
                "referenced internally; pypdf did not expose a clean item boundary"
            ],
            "digest": "local case or subrule under §44.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "44.3.10",
            "ref": "Andrews Lesson 44.3.10",
            "itemKind": "referenced subsection",
            "page": 438,
            "focusKeywords": [
                "referenced internally; pypdf did not expose a clean item boundary"
            ],
            "digest": "local case or subrule under §44.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "44.3.11",
            "ref": "Andrews Lesson 44.3.11",
            "itemKind": "referenced subsection",
            "page": 401,
            "focusKeywords": [
                "referenced internally; pypdf did not expose a clean item boundary"
            ],
            "digest": "local case or subrule under §44.3, verify exact examples and boundaries in the PDF."
        }
    ],
    "44.4": [
        {
            "id": "44.4.1",
            "ref": "Andrews Lesson 44.4.1",
            "itemKind": "numbered item",
            "page": 433,
            "focusKeywords": [
                "first-degree",
                "adverbialization",
                "permits"
            ],
            "digest": "local case or subrule under §44.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "44.4.2",
            "ref": "Andrews Lesson 44.4.2",
            "itemKind": "numbered item",
            "page": 434,
            "focusKeywords": [
                "second-degree",
                "adverbialization",
                "always",
                "absolutive",
                "state"
            ],
            "digest": "local case or subrule under §44.4, verify exact examples and boundaries in the PDF."
        }
    ],
    "44.5": [
        {
            "id": "44.5.2",
            "ref": "Andrews Lesson 44.5.2",
            "itemKind": "referenced subsection",
            "page": 71,
            "focusKeywords": [
                "referenced internally; pypdf did not expose a clean item boundary"
            ],
            "digest": "local case or subrule under §44.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "44.5.3",
            "ref": "Andrews Lesson 44.5.3",
            "itemKind": "referenced subsection",
            "page": 85,
            "focusKeywords": [
                "referenced internally; pypdf did not expose a clean item boundary"
            ],
            "digest": "local case or subrule under §44.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "44.5.4",
            "ref": "Andrews Lesson 44.5.4",
            "itemKind": "referenced subsection",
            "page": 39,
            "focusKeywords": [
                "referenced internally; pypdf did not expose a clean item boundary"
            ],
            "digest": "local case or subrule under §44.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "44.5.5",
            "ref": "Andrews Lesson 44.5.5",
            "itemKind": "referenced subsection",
            "page": 81,
            "focusKeywords": [
                "referenced internally; pypdf did not expose a clean item boundary"
            ],
            "digest": "local case or subrule under §44.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "44.5.6",
            "ref": "Andrews Lesson 44.5.6",
            "itemKind": "referenced subsection",
            "page": 93,
            "focusKeywords": [
                "referenced internally; pypdf did not expose a clean item boundary"
            ],
            "digest": "local case or subrule under §44.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "44.5.7",
            "ref": "Andrews Lesson 44.5.7",
            "itemKind": "referenced subsection",
            "page": 93,
            "focusKeywords": [
                "referenced internally; pypdf did not expose a clean item boundary"
            ],
            "digest": "local case or subrule under §44.5, verify exact examples and boundaries in the PDF."
        }
    ],
    "44.6": [
        {
            "id": "44.6.7",
            "ref": "Andrews Lesson 44.6.7",
            "itemKind": "referenced subsection",
            "page": 98,
            "focusKeywords": [
                "referenced internally; pypdf did not expose a clean item boundary"
            ],
            "digest": "local case or subrule under §44.6, verify exact examples and boundaries in the PDF."
        }
    ],
    "44.8": [
        {
            "id": "44.8.1",
            "ref": "Andrews Lesson 44.8.1",
            "itemKind": "numbered item",
            "page": 442,
            "focusKeywords": [
                "iyo-a",
                "see",
                "possessive-state",
                "built"
            ],
            "digest": "local case or subrule under §44.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "44.8.2",
            "ref": "Andrews Lesson 44.8.2",
            "itemKind": "numbered item",
            "page": 442,
            "focusKeywords": [
                "noh-mati",
                "analysis",
                "which",
                "conjectural",
                "come"
            ],
            "digest": "local case or subrule under §44.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "44.8.2.a",
            "ref": "Andrews Lesson 44.8.2.a",
            "itemKind": "lettered item",
            "page": 442,
            "focusKeywords": [
                "built",
                "perfective",
                "patientive",
                "noh-mat",
                "tli",
                "gen"
            ],
            "digest": "local case or subrule under §44.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "44.8.2.b",
            "ref": "Andrews Lesson 44.8.2.b",
            "itemKind": "lettered item",
            "page": 442,
            "focusKeywords": [
                "built",
                "active-action",
                "noh-mat",
                "formation"
            ],
            "digest": "local case or subrule under §44.8, verify exact examples and boundaries in the PDF."
        }
    ],
    "45.4": [
        {
            "id": "45.4.1",
            "ref": "Andrews Lesson 45.4.1",
            "itemKind": "numbered item",
            "page": 448,
            "focusKeywords": [
                "huan",
                "company"
            ],
            "digest": "local case or subrule under §45.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "45.4.2",
            "ref": "Andrews Lesson 45.4.2",
            "itemKind": "numbered item",
            "page": 449,
            "focusKeywords": [
                "tloc",
                "side",
                "proximity"
            ],
            "digest": "local case or subrule under §45.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "45.4.3",
            "ref": "Andrews Lesson 45.4.3",
            "itemKind": "numbered item",
            "page": 449,
            "focusKeywords": [
                "pal",
                "grace",
                "favor",
                "sake",
                "help",
                "see"
            ],
            "digest": "local case or subrule under §45.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "45.4.4",
            "ref": "Andrews Lesson 45.4.4",
            "itemKind": "numbered item",
            "page": 450,
            "focusKeywords": [
                "means",
                "purpose",
                "reason",
                "cause",
                "time",
                "unlike"
            ],
            "digest": "local case or subrule under §45.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "45.4.4.a",
            "ref": "Andrews Lesson 45.4.4.a",
            "itemKind": "lettered item",
            "page": 450,
            "focusKeywords": [
                "means"
            ],
            "digest": "local case or subrule under §45.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "45.4.4.b",
            "ref": "Andrews Lesson 45.4.4.b",
            "itemKind": "lettered item",
            "page": 450,
            "focusKeywords": [
                "purpose"
            ],
            "digest": "local case or subrule under §45.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "45.4.4.c",
            "ref": "Andrews Lesson 45.4.4.c",
            "itemKind": "lettered item",
            "page": 451,
            "focusKeywords": [
                "reason"
            ],
            "digest": "local case or subrule under §45.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "45.4.4.d",
            "ref": "Andrews Lesson 45.4.4.d",
            "itemKind": "lettered item",
            "page": 451,
            "focusKeywords": [
                "time"
            ],
            "digest": "local case or subrule under §45.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "45.4.4.e",
            "ref": "Andrews Lesson 45.4.4.e",
            "itemKind": "lettered item",
            "page": 453,
            "focusKeywords": [
                "special",
                "among",
                "various",
                "call"
            ],
            "digest": "local case or subrule under §45.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "45.4.4.i",
            "ref": "Andrews Lesson 45.4.4.i",
            "itemKind": "lettered item",
            "page": 453,
            "focusKeywords": [
                "preceding",
                "numeral",
                "quantitive",
                "equivalent",
                "eng"
            ],
            "digest": "local case or subrule under §45.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "45.4.4.i.ii",
            "ref": "Andrews Lesson 45.4.4.i.ii",
            "itemKind": "roman item",
            "page": 453,
            "focusKeywords": [
                "adjectival",
                "functions",
                "supplementary",
                "possessor"
            ],
            "digest": "local case or subrule under §45.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "45.4.4.i.iii",
            "ref": "Andrews Lesson 45.4.4.i.iii",
            "itemKind": "roman item",
            "page": 453,
            "focusKeywords": [
                "cooperation",
                "adjectival",
                "descriptive",
                "appear",
                "several"
            ],
            "digest": "local case or subrule under §45.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "45.4.4.i.iv",
            "ref": "Andrews Lesson 45.4.4.i.iv",
            "itemKind": "roman item",
            "page": 453,
            "focusKeywords": [
                "preceding",
                "adjectival",
                "size",
                "length",
                "shape",
                "etc"
            ],
            "digest": "local case or subrule under §45.4, verify exact examples and boundaries in the PDF."
        }
    ],
    "46.3": [
        {
            "id": "46.3.1",
            "ref": "Andrews Lesson 46.3.1",
            "itemKind": "numbered item",
            "page": 454,
            "focusKeywords": [
                "tli",
                "formula",
                "filler",
                "embed",
                "subposition",
                "represented"
            ],
            "digest": "local case or subrule under §46.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "46.3.1.a",
            "ref": "Andrews Lesson 46.3.1.a",
            "itemKind": "lettered item",
            "page": 455,
            "focusKeywords": [
                "preterit-agentive",
                "embed",
                "resultant",
                "locative",
                "compound",
                "means"
            ],
            "digest": "local case or subrule under §46.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "46.3.1.b",
            "ref": "Andrews Lesson 46.3.1.b",
            "itemKind": "lettered item",
            "page": 456,
            "focusKeywords": [
                "active-action",
                "embed",
                "resultant",
                "locative",
                "compound",
                "means"
            ],
            "digest": "local case or subrule under §46.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "46.3.2",
            "ref": "Andrews Lesson 46.3.2",
            "itemKind": "numbered item",
            "page": 457,
            "focusKeywords": [
                "tli",
                "locative",
                "formation",
                "also",
                "possible",
                "types"
            ],
            "digest": "local case or subrule under §46.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "46.3.2.a",
            "ref": "Andrews Lesson 46.3.2.a",
            "itemKind": "lettered item",
            "page": 457,
            "focusKeywords": [
                "component",
                "absent",
                "results",
                "compound",
                "ca-n"
            ],
            "digest": "local case or subrule under §46.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "46.3.2.b",
            "ref": "Andrews Lesson 46.3.2.b",
            "itemKind": "lettered item",
            "page": 458,
            "focusKeywords": [
                "component",
                "present",
                "represented",
                "functioning"
            ],
            "digest": "local case or subrule under §46.3, verify exact examples and boundaries in the PDF."
        }
    ],
    "46.4": [
        {
            "id": "46.4.1",
            "ref": "Andrews Lesson 46.4.1",
            "itemKind": "numbered item",
            "page": 459,
            "focusKeywords": [
                "active-voice",
                "resultant",
                "locative",
                "normally"
            ],
            "digest": "local case or subrule under §46.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "46.4.2",
            "ref": "Andrews Lesson 46.4.2",
            "itemKind": "numbered item",
            "page": 461,
            "focusKeywords": [
                "passive-voice",
                "resultant",
                "locative",
                "occurs"
            ],
            "digest": "local case or subrule under §46.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "46.4.3",
            "ref": "Andrews Lesson 46.4.3",
            "itemKind": "numbered item",
            "page": 461,
            "focusKeywords": [
                "impersonal-voice",
                "resultant",
                "locative",
                "occurs"
            ],
            "digest": "local case or subrule under §46.4, verify exact examples and boundaries in the PDF."
        }
    ],
    "46.8": [
        {
            "id": "46.8.1",
            "ref": "Andrews Lesson 46.8.1",
            "itemKind": "numbered item",
            "page": 467,
            "focusKeywords": [
                "nahua-c",
                "tli",
                "place",
                "audible",
                "sound",
                "distance"
            ],
            "digest": "local case or subrule under §46.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "46.8.1.a",
            "ref": "Andrews Lesson 46.8.1.a",
            "itemKind": "lettered item",
            "page": 467,
            "focusKeywords": [
                "simple-stemmed",
                "embed"
            ],
            "digest": "local case or subrule under §46.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "46.8.1.b",
            "ref": "Andrews Lesson 46.8.1.b",
            "itemKind": "lettered item",
            "page": 468,
            "focusKeywords": [
                "compound-stemmed",
                "embed"
            ],
            "digest": "local case or subrule under §46.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "46.8.2",
            "ref": "Andrews Lesson 46.8.2",
            "itemKind": "numbered item",
            "page": 468,
            "focusKeywords": [
                "ihti-c",
                "tli",
                "ihte-c",
                "stomach",
                "location",
                "interior"
            ],
            "digest": "local case or subrule under §46.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "46.8.2.a",
            "ref": "Andrews Lesson 46.8.2.a",
            "itemKind": "lettered item",
            "page": 468,
            "focusKeywords": [
                "simple-stemmed",
                "embed"
            ],
            "digest": "local case or subrule under §46.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "46.8.2.b",
            "ref": "Andrews Lesson 46.8.2.b",
            "itemKind": "lettered item",
            "page": 468,
            "focusKeywords": [
                "compound-stemmed",
                "embed"
            ],
            "digest": "local case or subrule under §46.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "46.8.3",
            "ref": "Andrews Lesson 46.8.3",
            "itemKind": "numbered item",
            "page": 468,
            "focusKeywords": [
                "ix-co",
                "face",
                "location",
                "eyes",
                "visual",
                "presence"
            ],
            "digest": "local case or subrule under §46.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "46.8.3.a",
            "ref": "Andrews Lesson 46.8.3.a",
            "itemKind": "lettered item",
            "page": 468,
            "focusKeywords": [
                "simple-stemmed",
                "embed"
            ],
            "digest": "local case or subrule under §46.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "46.8.3.b",
            "ref": "Andrews Lesson 46.8.3.b",
            "itemKind": "lettered item",
            "page": 469,
            "focusKeywords": [
                "compound-stemmed",
                "embed"
            ],
            "digest": "local case or subrule under §46.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "46.8.4",
            "ref": "Andrews Lesson 46.8.4",
            "itemKind": "numbered item",
            "page": 469,
            "focusKeywords": [
                "tepotz-co",
                "back",
                "location",
                "rear",
                "tepotz",
                "tli"
            ],
            "digest": "local case or subrule under §46.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "46.8.4.a",
            "ref": "Andrews Lesson 46.8.4.a",
            "itemKind": "lettered item",
            "page": 469,
            "focusKeywords": [
                "simple-stemmed",
                "embed"
            ],
            "digest": "local case or subrule under §46.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "46.8.4.b",
            "ref": "Andrews Lesson 46.8.4.b",
            "itemKind": "lettered item",
            "page": 469,
            "focusKeywords": [
                "compound-stemmed",
                "embed"
            ],
            "digest": "local case or subrule under §46.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "46.8.5",
            "ref": "Andrews Lesson 46.8.5",
            "itemKind": "numbered item",
            "page": 469,
            "focusKeywords": [
                "tzon-co",
                "hair",
                "location",
                "upper",
                "part",
                "top"
            ],
            "digest": "local case or subrule under §46.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "46.8.5.a",
            "ref": "Andrews Lesson 46.8.5.a",
            "itemKind": "lettered item",
            "page": 469,
            "focusKeywords": [
                "simple-stemmed",
                "embed"
            ],
            "digest": "local case or subrule under §46.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "46.8.5.b",
            "ref": "Andrews Lesson 46.8.5.b",
            "itemKind": "lettered item",
            "page": 469,
            "focusKeywords": [
                "compound-stemmed",
                "embed"
            ],
            "digest": "local case or subrule under §46.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "46.8.6",
            "ref": "Andrews Lesson 46.8.6",
            "itemKind": "numbered item",
            "page": 469,
            "focusKeywords": [
                "yol-lo",
                "h-co",
                "heart",
                "location",
                "middle",
                "part"
            ],
            "digest": "local case or subrule under §46.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "46.8.6.a",
            "ref": "Andrews Lesson 46.8.6.a",
            "itemKind": "lettered item",
            "page": 469,
            "focusKeywords": [
                "simple-stemmed",
                "embed"
            ],
            "digest": "local case or subrule under §46.8, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "46.8.6.b",
            "ref": "Andrews Lesson 46.8.6.b",
            "itemKind": "lettered item",
            "page": 469,
            "focusKeywords": [
                "compound-stemmed",
                "embed"
            ],
            "digest": "local case or subrule under §46.8, verify exact examples and boundaries in the PDF."
        }
    ],
    "46.12": [
        {
            "id": "46.12.1",
            "ref": "Andrews Lesson 46.12.1",
            "itemKind": "numbered item",
            "page": 473,
            "focusKeywords": [
                "nal",
                "far",
                "bank",
                "other",
                "side",
                "embeds"
            ],
            "digest": "local case or subrule under §46.12, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "46.12.2",
            "ref": "Andrews Lesson 46.12.2",
            "itemKind": "numbered item",
            "page": 473,
            "focusKeywords": [
                "relational",
                "chi",
                "direction",
                "toward",
                "tlal",
                "ground"
            ],
            "digest": "local case or subrule under §46.12, verify exact examples and boundaries in the PDF."
        }
    ],
    "47.3": [
        {
            "id": "47.3.1",
            "ref": "Andrews Lesson 47.3.1",
            "itemKind": "numbered item",
            "page": 481,
            "focusKeywords": [
                "tech",
                "tli",
                "side",
                "surface",
                "contact"
            ],
            "digest": "local case or subrule under §47.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "47.3.1.a",
            "ref": "Andrews Lesson 47.3.1.a",
            "itemKind": "lettered item",
            "page": 481,
            "focusKeywords": [
                "possessive-state"
            ],
            "digest": "local case or subrule under §47.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "47.3.1.b",
            "ref": "Andrews Lesson 47.3.1.b",
            "itemKind": "lettered item",
            "page": 482,
            "focusKeywords": [
                "integrated-structure",
                "compound",
                "absolutive",
                "possessive",
                "state"
            ],
            "digest": "local case or subrule under §47.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "47.3.1.c",
            "ref": "Andrews Lesson 47.3.1.c",
            "itemKind": "lettered item",
            "page": 482,
            "focusKeywords": [
                "connective-t",
                "compound",
                "absolutive",
                "possessive",
                "state"
            ],
            "digest": "local case or subrule under §47.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "47.3.2",
            "ref": "Andrews Lesson 47.3.2",
            "itemKind": "numbered item",
            "page": 482,
            "focusKeywords": [
                "tlan",
                "bottom",
                "surface",
                "under",
                "low-down",
                "location"
            ],
            "digest": "local case or subrule under §47.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "47.3.2.a",
            "ref": "Andrews Lesson 47.3.2.a",
            "itemKind": "lettered item",
            "page": 482,
            "focusKeywords": [
                "possessive-state"
            ],
            "digest": "local case or subrule under §47.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "47.3.2.b",
            "ref": "Andrews Lesson 47.3.2.b",
            "itemKind": "lettered item",
            "page": 482,
            "focusKeywords": [
                "integrated-structure",
                "compound",
                "absolutive",
                "possessive",
                "state"
            ],
            "digest": "local case or subrule under §47.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "47.3.2.i",
            "ref": "Andrews Lesson 47.3.2.i",
            "itemKind": "lettered item",
            "page": 483,
            "focusKeywords": [
                "ix-tlan",
                "eyes",
                "adjacency",
                "place",
                "under",
                "gaze"
            ],
            "digest": "local case or subrule under §47.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "47.3.2.i.ii",
            "ref": "Andrews Lesson 47.3.2.i.ii",
            "itemKind": "roman item",
            "page": 483,
            "focusKeywords": [
                "tzin-tlan",
                "place",
                "beneath",
                "fundament",
                "adjacency",
                "base"
            ],
            "digest": "local case or subrule under §47.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "47.3.2.c",
            "ref": "Andrews Lesson 47.3.2.c",
            "itemKind": "lettered item",
            "page": 484,
            "focusKeywords": [
                "connective-t",
                "compound",
                "absolutive",
                "possessive",
                "state"
            ],
            "digest": "local case or subrule under §47.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "47.3.3",
            "ref": "Andrews Lesson 47.3.3",
            "itemKind": "numbered item",
            "page": 484,
            "focusKeywords": [
                "pan",
                "upper",
                "surface",
                "appearance",
                "superior",
                "location"
            ],
            "digest": "local case or subrule under §47.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "47.3.3.a",
            "ref": "Andrews Lesson 47.3.3.a",
            "itemKind": "lettered item",
            "page": 484,
            "focusKeywords": [
                "possessive-state"
            ],
            "digest": "local case or subrule under §47.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "47.3.3.b",
            "ref": "Andrews Lesson 47.3.3.b",
            "itemKind": "lettered item",
            "page": 487,
            "focusKeywords": [
                "absolutive",
                "possessive",
                "state",
                "integrated-structure",
                "compound"
            ],
            "digest": "local case or subrule under §47.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "47.3.3.c",
            "ref": "Andrews Lesson 47.3.3.c",
            "itemKind": "lettered item",
            "page": 489,
            "focusKeywords": [
                "connective-t",
                "compound"
            ],
            "digest": "local case or subrule under §47.3, verify exact examples and boundaries in the PDF."
        }
    ],
    "47.5": [
        {
            "id": "47.5.1",
            "ref": "Andrews Lesson 47.5.1",
            "itemKind": "numbered item",
            "page": 491,
            "focusKeywords": [
                "embed",
                "adverbialized",
                "directly",
                "meaning"
            ],
            "digest": "local case or subrule under §47.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "47.5.2",
            "ref": "Andrews Lesson 47.5.2",
            "itemKind": "numbered item",
            "page": 491,
            "focusKeywords": [
                "matrix",
                "embed",
                "associated-entity",
                "compound"
            ],
            "digest": "local case or subrule under §47.5, verify exact examples and boundaries in the PDF."
        }
    ],
    "48.1": [
        {
            "id": "48.1.1",
            "ref": "Andrews Lesson 48.1.1",
            "itemKind": "numbered item",
            "page": 493,
            "focusKeywords": [
                "ordinary"
            ],
            "digest": "local case or subrule under §48.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "48.1.2",
            "ref": "Andrews Lesson 48.1.2",
            "itemKind": "numbered item",
            "page": 494,
            "focusKeywords": [
                "adverbial",
                "most",
                "common",
                "usage"
            ],
            "digest": "local case or subrule under §48.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "48.1.3",
            "ref": "Andrews Lesson 48.1.3",
            "itemKind": "numbered item",
            "page": 494,
            "focusKeywords": [
                "adjectival"
            ],
            "digest": "local case or subrule under §48.1, verify exact examples and boundaries in the PDF."
        }
    ],
    "48.2": [
        {
            "id": "48.2.1",
            "ref": "Andrews Lesson 48.2.1",
            "itemKind": "numbered item",
            "page": 495,
            "focusKeywords": [
                "tli",
                "embeds",
                "nominalized",
                "imperfect-tense",
                "predicate",
                "see"
            ],
            "digest": "local case or subrule under §48.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "48.2.1.a",
            "ref": "Andrews Lesson 48.2.1.a",
            "itemKind": "lettered item",
            "page": 495,
            "focusKeywords": [
                "active-voice"
            ],
            "digest": "local case or subrule under §48.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "48.2.1.b",
            "ref": "Andrews Lesson 48.2.1.b",
            "itemKind": "lettered item",
            "page": 495,
            "focusKeywords": [
                "nonactive"
            ],
            "digest": "local case or subrule under §48.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "48.2.2",
            "ref": "Andrews Lesson 48.2.2",
            "itemKind": "numbered item",
            "page": 495,
            "focusKeywords": [
                "formation",
                "use",
                "ya-n",
                "tli",
                "matrix",
                "see"
            ],
            "digest": "local case or subrule under §48.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "48.2.3",
            "ref": "Andrews Lesson 48.2.3",
            "itemKind": "numbered item",
            "page": 496,
            "focusKeywords": [
                "formation",
                "use",
                "ma-n",
                "place",
                "area",
                "compound"
            ],
            "digest": "local case or subrule under §48.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "48.2.4",
            "ref": "Andrews Lesson 48.2.4",
            "itemKind": "numbered item",
            "page": 496,
            "focusKeywords": [
                "formation",
                "use",
                "tla-n",
                "place",
                "vicinity",
                "compound"
            ],
            "digest": "local case or subrule under §48.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "48.2.5",
            "ref": "Andrews Lesson 48.2.5",
            "itemKind": "numbered item",
            "page": 497,
            "focusKeywords": [
                "formation",
                "use",
                "compound",
                "matrix",
                "ca-n",
                "embed"
            ],
            "digest": "local case or subrule under §48.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "48.2.6",
            "ref": "Andrews Lesson 48.2.6",
            "itemKind": "numbered item",
            "page": 497,
            "focusKeywords": [
                "formation",
                "use",
                "tli",
                "which",
                "embed",
                "general-use"
            ],
            "digest": "local case or subrule under §48.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "48.2.7",
            "ref": "Andrews Lesson 48.2.7",
            "itemKind": "numbered item",
            "page": 498,
            "focusKeywords": [
                "formation",
                "use",
                "matrix",
                "tli",
                "action-noun",
                "embed"
            ],
            "digest": "local case or subrule under §48.2, verify exact examples and boundaries in the PDF."
        }
    ],
    "48.3": [
        {
            "id": "48.3.1",
            "ref": "Andrews Lesson 48.3.1",
            "itemKind": "numbered item",
            "page": 499,
            "focusKeywords": [
                "formation",
                "built",
                "according",
                "integrated",
                "structure",
                "see"
            ],
            "digest": "local case or subrule under §48.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "48.3.2",
            "ref": "Andrews Lesson 48.3.2",
            "itemKind": "numbered item",
            "page": 500,
            "focusKeywords": [
                "formation",
                "built",
                "connective-t",
                "compound",
                "see"
            ],
            "digest": "local case or subrule under §48.3, verify exact examples and boundaries in the PDF."
        }
    ],
    "48.4": [
        {
            "id": "48.4.1",
            "ref": "Andrews Lesson 48.4.1",
            "itemKind": "numbered item",
            "page": 500,
            "focusKeywords": [
                "formation",
                "use",
                "tli",
                "according"
            ],
            "digest": "local case or subrule under §48.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "48.4.1.a",
            "ref": "Andrews Lesson 48.4.1.a",
            "itemKind": "lettered item",
            "page": 500,
            "focusKeywords": [
                "examples",
                "exhibit",
                "formation"
            ],
            "digest": "local case or subrule under §48.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "48.4.2",
            "ref": "Andrews Lesson 48.4.2",
            "itemKind": "numbered item",
            "page": 500,
            "focusKeywords": [
                "cr6nica",
                "mexihcayotl",
                "told",
                "comes",
                "tribal",
                "name"
            ],
            "digest": "local case or subrule under §48.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "48.4.2.b",
            "ref": "Andrews Lesson 48.4.2.b",
            "itemKind": "lettered item",
            "page": 501,
            "focusKeywords": [
                "examples",
                "exhibit",
                "formation",
                "tli"
            ],
            "digest": "local case or subrule under §48.4, verify exact examples and boundaries in the PDF."
        }
    ],
    "48.5": [
        {
            "id": "48.5.1",
            "ref": "Andrews Lesson 48.5.1",
            "itemKind": "numbered item",
            "page": 502,
            "focusKeywords": [
                "embed",
                "normal",
                "kind"
            ],
            "digest": "local case or subrule under §48.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "48.5.2",
            "ref": "Andrews Lesson 48.5.2",
            "itemKind": "numbered item",
            "page": 502,
            "focusKeywords": [
                "embed",
                "relational",
                "pan"
            ],
            "digest": "local case or subrule under §48.5, verify exact examples and boundaries in the PDF."
        }
    ],
    "48.9": [
        {
            "id": "48.9.1",
            "ref": "Andrews Lesson 48.9.1",
            "itemKind": "numbered item",
            "page": 503,
            "focusKeywords": [
                "gentilic",
                "means",
                "absolutive-state",
                "built",
                "nonlocative"
            ],
            "digest": "local case or subrule under §48.9, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "48.9.2",
            "ref": "Andrews Lesson 48.9.2",
            "itemKind": "numbered item",
            "page": 503,
            "focusKeywords": [
                "gentilic-name",
                "unit",
                "means",
                "two-clause",
                "concatenate",
                "structure"
            ],
            "digest": "local case or subrule under §48.9, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "48.9.2.a",
            "ref": "Andrews Lesson 48.9.2.a",
            "itemKind": "lettered item",
            "page": 503,
            "focusKeywords": [
                "place-name",
                "type"
            ],
            "digest": "local case or subrule under §48.9, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "48.9.2.b",
            "ref": "Andrews Lesson 48.9.2.b",
            "itemKind": "lettered item",
            "page": 504,
            "focusKeywords": [
                "place-name",
                "type"
            ],
            "digest": "local case or subrule under §48.9, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "48.9.2.c",
            "ref": "Andrews Lesson 48.9.2.c",
            "itemKind": "lettered item",
            "page": 504,
            "focusKeywords": [
                "place-name",
                "t-icpa"
            ],
            "digest": "local case or subrule under §48.9, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "48.9.2.d",
            "ref": "Andrews Lesson 48.9.2.d",
            "itemKind": "lettered item",
            "page": 504,
            "focusKeywords": [
                "place-name",
                "type"
            ],
            "digest": "local case or subrule under §48.9, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "48.9.2.e",
            "ref": "Andrews Lesson 48.9.2.e",
            "itemKind": "lettered item",
            "page": 504,
            "focusKeywords": [
                "place-name",
                "type"
            ],
            "digest": "local case or subrule under §48.9, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "48.9.3",
            "ref": "Andrews Lesson 48.9.3",
            "itemKind": "numbered item",
            "page": 504,
            "focusKeywords": [
                "certain",
                "place-names",
                "preterit-agentive",
                "see",
                "gen"
            ],
            "digest": "local case or subrule under §48.9, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "48.9.3.a",
            "ref": "Andrews Lesson 48.9.3.a",
            "itemKind": "lettered item",
            "page": 504,
            "focusKeywords": [
                "embed",
                "preterit-agentive",
                "ownerhood",
                "see",
                "subsection"
            ],
            "digest": "local case or subrule under §48.9, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "48.9.3.b",
            "ref": "Andrews Lesson 48.9.3.b",
            "itemKind": "lettered item",
            "page": 504,
            "focusKeywords": [
                "embed",
                "preterit-agentive",
                "does",
                "not",
                "signify",
                "ownerhood"
            ],
            "digest": "local case or subrule under §48.9, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "48.9.4",
            "ref": "Andrews Lesson 48.9.4",
            "itemKind": "numbered item",
            "page": 505,
            "focusKeywords": [
                "gentilic",
                "compound",
                "embedding"
            ],
            "digest": "local case or subrule under §48.9, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "48.9.4.a",
            "ref": "Andrews Lesson 48.9.4.a",
            "itemKind": "lettered item",
            "page": 505,
            "focusKeywords": [
                "group",
                "subtypes"
            ],
            "digest": "local case or subrule under §48.9, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "48.9.4.i",
            "ref": "Andrews Lesson 48.9.4.i",
            "itemKind": "lettered item",
            "page": 505,
            "focusKeywords": [
                "place-name",
                "tlah",
                "see",
                "tzalan"
            ],
            "digest": "local case or subrule under §48.9, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "48.9.4.i.ii",
            "ref": "Andrews Lesson 48.9.4.i.ii",
            "itemKind": "roman item",
            "page": 505,
            "focusKeywords": [
                "place-name",
                "pan",
                "see"
            ],
            "digest": "local case or subrule under §48.9, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "48.9.4.b",
            "ref": "Andrews Lesson 48.9.4.b",
            "itemKind": "lettered item",
            "page": 506,
            "focusKeywords": [
                "group",
                "subtypes",
                "them",
                "relational",
                "serves"
            ],
            "digest": "local case or subrule under §48.9, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "48.9.4.i.iii",
            "ref": "Andrews Lesson 48.9.4.i.iii",
            "itemKind": "roman item",
            "page": 507,
            "focusKeywords": [
                "place-name",
                "ma-n",
                "see",
                "tla-n"
            ],
            "digest": "local case or subrule under §48.9, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "48.9.4.b.i",
            "ref": "Andrews Lesson 48.9.4.b.i",
            "itemKind": "referenced subsection",
            "page": 500,
            "focusKeywords": [
                "referenced internally; pypdf did not expose a clean item boundary"
            ],
            "digest": "local case or subrule under §48.9, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "48.9.4.b.ii",
            "ref": "Andrews Lesson 48.9.4.b.ii",
            "itemKind": "referenced subsection",
            "page": 509,
            "focusKeywords": [
                "referenced internally; pypdf did not expose a clean item boundary"
            ],
            "digest": "local case or subrule under §48.9, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "48.9.4.b.iii",
            "ref": "Andrews Lesson 48.9.4.b.iii",
            "itemKind": "referenced subsection",
            "page": 418,
            "focusKeywords": [
                "referenced internally; pypdf did not expose a clean item boundary"
            ],
            "digest": "local case or subrule under §48.9, verify exact examples and boundaries in the PDF."
        }
    ],
    "49.9": [
        {
            "id": "49.9.1",
            "ref": "Andrews Lesson 49.9.1",
            "itemKind": "numbered item",
            "page": 520,
            "focusKeywords": [
                "time",
                "construction",
                "frequent",
                "nahuatl",
                "than",
                "counterpart"
            ],
            "digest": "local case or subrule under §49.9, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "49.9.2",
            "ref": "Andrews Lesson 49.9.2",
            "itemKind": "numbered item",
            "page": 521,
            "focusKeywords": [
                "place",
                "construction",
                "not",
                "frequent",
                "time",
                "described"
            ],
            "digest": "local case or subrule under §49.9, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "49.9.3",
            "ref": "Andrews Lesson 49.9.3",
            "itemKind": "numbered item",
            "page": 521,
            "focusKeywords": [
                "manner"
            ],
            "digest": "local case or subrule under §49.9, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "49.9.4",
            "ref": "Andrews Lesson 49.9.4",
            "itemKind": "numbered item",
            "page": 521,
            "focusKeywords": [
                "maintain",
                "their",
                "interrogative",
                "status",
                "adverbial",
                "must"
            ],
            "digest": "local case or subrule under §49.9, verify exact examples and boundaries in the PDF."
        }
    ],
    "50.2": [
        {
            "id": "50.2.1",
            "ref": "Andrews Lesson 50.2.1",
            "itemKind": "numbered item",
            "page": 523,
            "focusKeywords": [
                "temporal",
                "meaning",
                "implicit",
                "adjoined",
                "unit",
                "containing"
            ],
            "digest": "local case or subrule under §50.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "50.2.2",
            "ref": "Andrews Lesson 50.2.2",
            "itemKind": "numbered item",
            "page": 525,
            "focusKeywords": [
                "temporal",
                "meaning",
                "explicitly",
                "expressed",
                "adverbialized"
            ],
            "digest": "local case or subrule under §50.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "50.2.3",
            "ref": "Andrews Lesson 50.2.3",
            "itemKind": "numbered item",
            "page": 525,
            "focusKeywords": [
                "principal",
                "unit",
                "contain",
                "corroborating",
                "adverbial",
                "element"
            ],
            "digest": "local case or subrule under §50.2, verify exact examples and boundaries in the PDF."
        }
    ],
    "50.6": [
        {
            "id": "50.6.1",
            "ref": "Andrews Lesson 50.6.1",
            "itemKind": "numbered item",
            "page": 528,
            "focusKeywords": [
                "adjoined",
                "contain",
                "explicit",
                "expression",
                "purpose",
                "usually"
            ],
            "digest": "local case or subrule under §50.6, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "50.6.2",
            "ref": "Andrews Lesson 50.6.2",
            "itemKind": "numbered item",
            "page": 530,
            "focusKeywords": [
                "adjoined",
                "suggest",
                "purposive",
                "notion",
                "means",
                "particle"
            ],
            "digest": "local case or subrule under §50.6, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "50.6.1.a",
            "ref": "Andrews Lesson 50.6.1.a",
            "itemKind": "lettered item",
            "page": 531,
            "focusKeywords": [
                "center",
                "adjunct",
                "time",
                "referred",
                "condition",
                "set"
            ],
            "digest": "local case or subrule under §50.6, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "50.6.1.b",
            "ref": "Andrews Lesson 50.6.1.b",
            "itemKind": "lettered item",
            "page": 532,
            "focusKeywords": [
                "center",
                "adjunct",
                "manifest",
                "nonpast",
                "opta"
            ],
            "digest": "local case or subrule under §50.6, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "50.6.2.a",
            "ref": "Andrews Lesson 50.6.2.a",
            "itemKind": "lettered item",
            "page": 533,
            "focusKeywords": [
                "supposition",
                "refers",
                "present",
                "future",
                "time",
                "governing"
            ],
            "digest": "local case or subrule under §50.6, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "50.6.2.b",
            "ref": "Andrews Lesson 50.6.2.b",
            "itemKind": "lettered item",
            "page": 533,
            "focusKeywords": [
                "supposition",
                "refers",
                "past",
                "time",
                "governing",
                "adverbial"
            ],
            "digest": "local case or subrule under §50.6, verify exact examples and boundaries in the PDF."
        }
    ],
    "51.2": [
        {
            "id": "51.2.1",
            "ref": "Andrews Lesson 51.2.1",
            "itemKind": "numbered item",
            "page": 537,
            "focusKeywords": [
                "change",
                "complement",
                "names",
                "role",
                "entity",
                "referred"
            ],
            "digest": "local case or subrule under §51.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "51.2.2",
            "ref": "Andrews Lesson 51.2.2",
            "itemKind": "numbered item",
            "page": 538,
            "focusKeywords": [
                "material",
                "composition",
                "object",
                "complement",
                "built",
                "signi"
            ],
            "digest": "local case or subrule under §51.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "51.2.3",
            "ref": "Andrews Lesson 51.2.3",
            "itemKind": "numbered item",
            "page": 538,
            "focusKeywords": [
                "designation",
                "object",
                "complement",
                "indicate",
                "name",
                "entity"
            ],
            "digest": "local case or subrule under §51.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "51.2.4",
            "ref": "Andrews Lesson 51.2.4",
            "itemKind": "numbered item",
            "page": 539,
            "focusKeywords": [
                "state",
                "object",
                "complement",
                "adjectival",
                "indicates",
                "entity"
            ],
            "digest": "local case or subrule under §51.2, verify exact examples and boundaries in the PDF."
        }
    ],
    "51.3": [
        {
            "id": "51.3.1",
            "ref": "Andrews Lesson 51.3.1",
            "itemKind": "numbered item",
            "page": 539,
            "focusKeywords": [
                "identity",
                "subject",
                "complement",
                "indicates",
                "nature",
                "entity"
            ],
            "digest": "local case or subrule under §51.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "51.3.2",
            "ref": "Andrews Lesson 51.3.2",
            "itemKind": "numbered item",
            "page": 540,
            "focusKeywords": [
                "composition",
                "subject",
                "complement",
                "indicates",
                "material",
                "which"
            ],
            "digest": "local case or subrule under §51.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "51.3.3",
            "ref": "Andrews Lesson 51.3.3",
            "itemKind": "numbered item",
            "page": 540,
            "focusKeywords": [
                "state",
                "subject",
                "complement",
                "indicates",
                "entity",
                "referred"
            ],
            "digest": "local case or subrule under §51.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "51.3.3.a",
            "ref": "Andrews Lesson 51.3.3.a",
            "itemKind": "lettered item",
            "page": 540,
            "focusKeywords": [
                "ce-1",
                "see",
                "built",
                "acts",
                "subject",
                "com"
            ],
            "digest": "local case or subrule under §51.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "51.3.3.b",
            "ref": "Andrews Lesson 51.3.3.b",
            "itemKind": "lettered item",
            "page": 540,
            "focusKeywords": [
                "see",
                "again",
                "built",
                "acts",
                "subject"
            ],
            "digest": "local case or subrule under §51.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "51.3.3.c",
            "ref": "Andrews Lesson 51.3.3.c",
            "itemKind": "lettered item",
            "page": 540,
            "focusKeywords": [
                "iyo-h",
                "see",
                "subject",
                "pronoun",
                "built",
                "this-preterit"
            ],
            "digest": "local case or subrule under §51.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "51.3.4",
            "ref": "Andrews Lesson 51.3.4",
            "itemKind": "numbered item",
            "page": 540,
            "focusKeywords": [
                "subject-complement",
                "construction",
                "also",
                "generated",
                "passive",
                "transformation"
            ],
            "digest": "local case or subrule under §51.3, verify exact examples and boundaries in the PDF."
        }
    ],
    "51.4": [
        {
            "id": "51.4.1",
            "ref": "Andrews Lesson 51.4.1",
            "itemKind": "numbered item",
            "page": 541,
            "focusKeywords": [
                "complement",
                "built",
                "mo-ca",
                "look",
                "seem",
                "full"
            ],
            "digest": "local case or subrule under §51.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "51.4.2",
            "ref": "Andrews Lesson 51.4.2",
            "itemKind": "numbered item",
            "page": 541,
            "focusKeywords": [
                "complement",
                "pehua",
                "begin"
            ],
            "digest": "local case or subrule under §51.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "51.4.3",
            "ref": "Andrews Lesson 51.4.3",
            "itemKind": "numbered item",
            "page": 542,
            "focusKeywords": [
                "complement",
                "pach-i",
                "hui",
                "become",
                "satis"
            ],
            "digest": "local case or subrule under §51.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "51.4.4",
            "ref": "Andrews Lesson 51.4.4",
            "itemKind": "numbered item",
            "page": 542,
            "focusKeywords": [
                "complement",
                "tlahpal-i",
                "hui",
                "become",
                "healthy"
            ],
            "digest": "local case or subrule under §51.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "51.4.5",
            "ref": "Andrews Lesson 51.4.5",
            "itemKind": "numbered item",
            "page": 542,
            "focusKeywords": [
                "complement",
                "m-o",
                "cahua",
                "stop"
            ],
            "digest": "local case or subrule under §51.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "51.4.6",
            "ref": "Andrews Lesson 51.4.6",
            "itemKind": "numbered item",
            "page": 542,
            "focusKeywords": [
                "complement",
                "hueh-cahua",
                "tarry"
            ],
            "digest": "local case or subrule under §51.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "51.4.7",
            "ref": "Andrews Lesson 51.4.7",
            "itemKind": "numbered item",
            "page": 542,
            "focusKeywords": [
                "kind",
                "adverbial",
                "complement",
                "involves",
                "relational",
                "noun"
            ],
            "digest": "local case or subrule under §51.4, verify exact examples and boundaries in the PDF."
        }
    ],
    "52.2": [
        {
            "id": "52.2.1",
            "ref": "Andrews Lesson 52.2.1",
            "itemKind": "numbered item",
            "page": 544,
            "focusKeywords": [
                "additive",
                "conjunction",
                "conjuncts",
                "pair",
                "series"
            ],
            "digest": "local case or subrule under §52.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "52.2.2",
            "ref": "Andrews Lesson 52.2.2",
            "itemKind": "numbered item",
            "page": 546,
            "focusKeywords": [
                "alternative",
                "conjunction"
            ],
            "digest": "local case or subrule under §52.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "52.2.3",
            "ref": "Andrews Lesson 52.2.3",
            "itemKind": "numbered item",
            "page": 546,
            "focusKeywords": [
                "adversative",
                "conjunction",
                "often",
                "expression",
                "antithesis",
                "opposition"
            ],
            "digest": "local case or subrule under §52.2, verify exact examples and boundaries in the PDF."
        }
    ],
    "52.3": [
        {
            "id": "52.3.1",
            "ref": "Andrews Lesson 52.3.1",
            "itemKind": "numbered item",
            "page": 547,
            "focusKeywords": [
                "additive",
                "conjunction"
            ],
            "digest": "local case or subrule under §52.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "52.3.2",
            "ref": "Andrews Lesson 52.3.2",
            "itemKind": "numbered item",
            "page": 547,
            "focusKeywords": [
                "alternative",
                "conjunction"
            ],
            "digest": "local case or subrule under §52.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "52.3.3",
            "ref": "Andrews Lesson 52.3.3",
            "itemKind": "numbered item",
            "page": 547,
            "focusKeywords": [
                "adversative",
                "conjunction"
            ],
            "digest": "local case or subrule under §52.3, verify exact examples and boundaries in the PDF."
        }
    ],
    "52.4": [
        {
            "id": "52.4.1",
            "ref": "Andrews Lesson 52.4.1",
            "itemKind": "numbered item",
            "page": 547,
            "focusKeywords": [
                "additive",
                "conjunction"
            ],
            "digest": "local case or subrule under §52.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "52.4.1.a",
            "ref": "Andrews Lesson 52.4.1.a",
            "itemKind": "lettered item",
            "page": 548,
            "focusKeywords": [
                "unmarked",
                "adverbial",
                "particles",
                "also",
                "still",
                "combination"
            ],
            "digest": "local case or subrule under §52.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "52.4.1.b",
            "ref": "Andrews Lesson 52.4.1.b",
            "itemKind": "lettered item",
            "page": 549,
            "focusKeywords": [
                "marked"
            ],
            "digest": "local case or subrule under §52.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "52.4.2",
            "ref": "Andrews Lesson 52.4.2",
            "itemKind": "numbered item",
            "page": 549,
            "focusKeywords": [
                "alternative",
                "conjunction"
            ],
            "digest": "local case or subrule under §52.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "52.4.2.a",
            "ref": "Andrews Lesson 52.4.2.a",
            "itemKind": "lettered item",
            "page": 549,
            "focusKeywords": [
                "unmarked",
                "adverbial",
                "particles",
                "collocations",
                "ahzo",
                "written"
            ],
            "digest": "local case or subrule under §52.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "52.4.2.b",
            "ref": "Andrews Lesson 52.4.2.b",
            "itemKind": "lettered item",
            "page": 550,
            "focusKeywords": [
                "marked"
            ],
            "digest": "local case or subrule under §52.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "52.4.3",
            "ref": "Andrews Lesson 52.4.3",
            "itemKind": "numbered item",
            "page": 550,
            "focusKeywords": [
                "adversative",
                "conjunction"
            ],
            "digest": "local case or subrule under §52.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "52.4.3.a",
            "ref": "Andrews Lesson 52.4.3.a",
            "itemKind": "lettered item",
            "page": 550,
            "focusKeywords": [
                "unmarked",
                "adverbial",
                "particle",
                "zan",
                "adver"
            ],
            "digest": "local case or subrule under §52.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "52.4.3.b",
            "ref": "Andrews Lesson 52.4.3.b",
            "itemKind": "lettered item",
            "page": 551,
            "focusKeywords": [
                "marked"
            ],
            "digest": "local case or subrule under §52.4, verify exact examples and boundaries in the PDF."
        }
    ],
    "52.5": [
        {
            "id": "52.5.1",
            "ref": "Andrews Lesson 52.5.1",
            "itemKind": "numbered item",
            "page": 551,
            "focusKeywords": [
                "standard",
                "type",
                "correlation",
                "expressed",
                "paired",
                "conjuncts"
            ],
            "digest": "local case or subrule under §52.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "52.5.2",
            "ref": "Andrews Lesson 52.5.2",
            "itemKind": "numbered item",
            "page": 551,
            "focusKeywords": [
                "looser",
                "kind",
                "correlation",
                "expressed",
                "pairing",
                "adverbial"
            ],
            "digest": "local case or subrule under §52.5, verify exact examples and boundaries in the PDF."
        }
    ],
    "52.6": [
        {
            "id": "52.6.1",
            "ref": "Andrews Lesson 52.6.1",
            "itemKind": "numbered item",
            "page": 553,
            "focusKeywords": [
                "lord-and",
                "master",
                "type",
                "conjoined",
                "synonymous",
                "nearly"
            ],
            "digest": "local case or subrule under §52.6, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "52.6.2",
            "ref": "Andrews Lesson 52.6.2",
            "itemKind": "numbered item",
            "page": 554,
            "focusKeywords": [
                "bread-and",
                "butter",
                "type",
                "conjoined",
                "situationally",
                "associated"
            ],
            "digest": "local case or subrule under §52.6, verify exact examples and boundaries in the PDF."
        }
    ],
    "52.7": [
        {
            "id": "52.7.1",
            "ref": "Andrews Lesson 52.7.1",
            "itemKind": "numbered item",
            "page": 556,
            "focusKeywords": [
                "rephrasive",
                "parallelism",
                "static",
                "type",
                "parallel",
                "structure"
            ],
            "digest": "local case or subrule under §52.7, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "52.7.1.a",
            "ref": "Andrews Lesson 52.7.1.a",
            "itemKind": "lettered item",
            "page": 557,
            "focusKeywords": [
                "clarifying",
                "appositive"
            ],
            "digest": "local case or subrule under §52.7, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "52.7.1.b",
            "ref": "Andrews Lesson 52.7.1.b",
            "itemKind": "lettered item",
            "page": 557,
            "focusKeywords": [
                "summarizing",
                "appositive"
            ],
            "digest": "local case or subrule under §52.7, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "52.7.2",
            "ref": "Andrews Lesson 52.7.2",
            "itemKind": "numbered item",
            "page": 557,
            "focusKeywords": [
                "progressive",
                "parallelism",
                "type",
                "parallel",
                "structure",
                "which"
            ],
            "digest": "local case or subrule under §52.7, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "52.7.3",
            "ref": "Andrews Lesson 52.7.3",
            "itemKind": "numbered item",
            "page": 558,
            "focusKeywords": [
                "complicated",
                "parallel",
                "structures",
                "achieved",
                "combining",
                "rephrasive"
            ],
            "digest": "local case or subrule under §52.7, verify exact examples and boundaries in the PDF."
        }
    ],
    "53.1": [
        {
            "id": "53.1.1",
            "ref": "Andrews Lesson 53.1.1",
            "itemKind": "numbered item",
            "page": 559,
            "focusKeywords": [
                "reduplicative",
                "prefix"
            ],
            "digest": "local case or subrule under §53.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "53.1.2",
            "ref": "Andrews Lesson 53.1.2",
            "itemKind": "numbered item",
            "page": 560,
            "focusKeywords": [
                "downgrading",
                "possessive-state",
                "predicate",
                "containing",
                "non"
            ],
            "digest": "local case or subrule under §53.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "53.1.3",
            "ref": "Andrews Lesson 53.1.3",
            "itemKind": "numbered item",
            "page": 560,
            "focusKeywords": [
                "possessive-state",
                "relational",
                "tloc",
                "vicinity",
                "near"
            ],
            "digest": "local case or subrule under §53.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "53.1.4",
            "ref": "Andrews Lesson 53.1.4",
            "itemKind": "numbered item",
            "page": 560,
            "focusKeywords": [
                "nonpreposed-adjectival",
                "modifier",
                "construction",
                "using",
                "principal",
                "zan"
            ],
            "digest": "local case or subrule under §53.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "53.1.5",
            "ref": "Andrews Lesson 53.1.5",
            "itemKind": "numbered item",
            "page": 560,
            "focusKeywords": [
                "incorporated-complement",
                "compound",
                "m-o",
                "neh-nequi",
                "matrix",
                "see"
            ],
            "digest": "local case or subrule under §53.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "53.1.6",
            "ref": "Andrews Lesson 53.1.6",
            "itemKind": "numbered item",
            "page": 561,
            "focusKeywords": [
                "built",
                "meaning",
                "resemble",
                "equal",
                "etc",
                "serves"
            ],
            "digest": "local case or subrule under §53.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "53.1.7",
            "ref": "Andrews Lesson 53.1.7",
            "itemKind": "numbered item",
            "page": 561,
            "focusKeywords": [
                "construction",
                "involving",
                "built",
                "ihui",
                "thus"
            ],
            "digest": "local case or subrule under §53.1, verify exact examples and boundaries in the PDF."
        }
    ],
    "53.3": [
        {
            "id": "53.3.1",
            "ref": "Andrews Lesson 53.3.1",
            "itemKind": "numbered item",
            "page": 562,
            "focusKeywords": [
                "iuhqui",
                "construction"
            ],
            "digest": "local case or subrule under §53.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "53.3.2",
            "ref": "Andrews Lesson 53.3.2",
            "itemKind": "numbered item",
            "page": 563,
            "focusKeywords": [
                "ihuan",
                "company",
                "construction"
            ],
            "digest": "local case or subrule under §53.3, verify exact examples and boundaries in the PDF."
        }
    ],
    "53.4": [
        {
            "id": "53.4.1",
            "ref": "Andrews Lesson 53.4.1",
            "itemKind": "numbered item",
            "page": 563,
            "focusKeywords": [
                "built",
                "quantitive",
                "pronominal",
                "ix-qui"
            ],
            "digest": "local case or subrule under §53.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "53.4.2",
            "ref": "Andrews Lesson 53.4.2",
            "itemKind": "numbered item",
            "page": 563,
            "focusKeywords": [
                "correlative",
                "structure",
                "containing",
                "quezqui",
                "izqui"
            ],
            "digest": "local case or subrule under §53.4, verify exact examples and boundaries in the PDF."
        }
    ],
    "53.5": [
        {
            "id": "53.5.1",
            "ref": "Andrews Lesson 53.5.1",
            "itemKind": "numbered item",
            "page": 563,
            "focusKeywords": [
                "simplest",
                "construction",
                "contrasts",
                "affirmative",
                "statements",
                "means"
            ],
            "digest": "local case or subrule under §53.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "53.5.2",
            "ref": "Andrews Lesson 53.5.2",
            "itemKind": "numbered item",
            "page": 564,
            "focusKeywords": [
                "construction",
                "contrasts",
                "affirmative",
                "statement",
                "negative"
            ],
            "digest": "local case or subrule under §53.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "53.5.2.a",
            "ref": "Andrews Lesson 53.5.2.a",
            "itemKind": "lettered item",
            "page": 564,
            "focusKeywords": [
                "affirmative",
                "statement",
                "contain",
                "adverbial",
                "collocations"
            ],
            "digest": "local case or subrule under §53.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "53.5.2.b",
            "ref": "Andrews Lesson 53.5.2.b",
            "itemKind": "lettered item",
            "page": 564,
            "focusKeywords": [
                "affirmative",
                "statement",
                "consist",
                "concatenate",
                "structure",
                "principal"
            ],
            "digest": "local case or subrule under §53.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "53.5.2.c",
            "ref": "Andrews Lesson 53.5.2.c",
            "itemKind": "lettered item",
            "page": 565,
            "focusKeywords": [
                "somewhat",
                "similar",
                "construction",
                "affirmative",
                "statement",
                "principal"
            ],
            "digest": "local case or subrule under §53.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "53.5.2.d",
            "ref": "Andrews Lesson 53.5.2.d",
            "itemKind": "lettered item",
            "page": 565,
            "focusKeywords": [
                "personal",
                "subject",
                "pronoun",
                "tla",
                "pan-a",
                "huia"
            ],
            "digest": "local case or subrule under §53.5, verify exact examples and boundaries in the PDF."
        }
    ],
    "54.2": [
        {
            "id": "54.2.1",
            "ref": "Andrews Lesson 54.2.1",
            "itemKind": "numbered item",
            "page": 567,
            "focusKeywords": [
                "inceptive",
                "stative",
                "suffix",
                "attached",
                "directly",
                "absolutive-state"
            ],
            "digest": "local case or subrule under §54.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "54.2.2",
            "ref": "Andrews Lesson 54.2.2",
            "itemKind": "numbered item",
            "page": 570,
            "focusKeywords": [
                "suffix",
                "hui",
                "not",
                "prolific",
                "creating",
                "inceptive"
            ],
            "digest": "local case or subrule under §54.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "54.2.3",
            "ref": "Andrews Lesson 54.2.3",
            "itemKind": "numbered item",
            "page": 570,
            "focusKeywords": [
                "inceptive",
                "stative",
                "suffix",
                "either",
                "denominal",
                "deverbal"
            ],
            "digest": "local case or subrule under §54.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "54.2.3.a",
            "ref": "Andrews Lesson 54.2.3.a",
            "itemKind": "lettered item",
            "page": 570,
            "focusKeywords": [
                "denominal",
                "attached",
                "directly",
                "nounroot"
            ],
            "digest": "local case or subrule under §54.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "54.2.3.b",
            "ref": "Andrews Lesson 54.2.3.b",
            "itemKind": "lettered item",
            "page": 572,
            "focusKeywords": [
                "deverbal",
                "denominal"
            ],
            "digest": "local case or subrule under §54.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "54.2.3.i",
            "ref": "Andrews Lesson 54.2.3.i",
            "itemKind": "lettered item",
            "page": 572,
            "focusKeywords": [
                "local structural detail"
            ],
            "digest": "local case or subrule under §54.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "54.2.3.i.ii",
            "ref": "Andrews Lesson 54.2.3.i.ii",
            "itemKind": "roman item",
            "page": 572,
            "focusKeywords": [
                "hui"
            ],
            "digest": "local case or subrule under §54.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "54.2.3.i.iii",
            "ref": "Andrews Lesson 54.2.3.i.iii",
            "itemKind": "roman item",
            "page": 573,
            "focusKeywords": [
                "certain",
                "destockal",
                "hui",
                "type",
                "see"
            ],
            "digest": "local case or subrule under §54.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "54.2.4",
            "ref": "Andrews Lesson 54.2.4",
            "itemKind": "numbered item",
            "page": 573,
            "focusKeywords": [
                "inceptive",
                "stative",
                "suffix",
                "limited",
                "use",
                "meaning"
            ],
            "digest": "local case or subrule under §54.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "54.2.5",
            "ref": "Andrews Lesson 54.2.5",
            "itemKind": "numbered item",
            "page": 574,
            "focusKeywords": [
                "inceptive",
                "stative",
                "suffix",
                "hua",
                "added",
                "deverbal"
            ],
            "digest": "local case or subrule under §54.2, verify exact examples and boundaries in the PDF."
        }
    ],
    "54.3": [
        {
            "id": "54.3.1",
            "ref": "Andrews Lesson 54.3.1",
            "itemKind": "numbered item",
            "page": 575,
            "focusKeywords": [
                "first",
                "type",
                "expresses",
                "notion",
                "proxy",
                "stand-in"
            ],
            "digest": "local case or subrule under §54.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "54.3.1.a",
            "ref": "Andrews Lesson 54.3.1.a",
            "itemKind": "lettered item",
            "page": 575,
            "focusKeywords": [
                "te-ix",
                "xip-tla",
                "substitute",
                "role",
                "act",
                "part"
            ],
            "digest": "local case or subrule under §54.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "54.3.1.b",
            "ref": "Andrews Lesson 54.3.1.b",
            "itemKind": "lettered item",
            "page": 575,
            "focusKeywords": [
                "te-hui",
                "hhui-ti",
                "impersonator",
                "surrogate",
                "stand-in",
                "hui-hhui"
            ],
            "digest": "local case or subrule under §54.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "54.3.1.c",
            "ref": "Andrews Lesson 54.3.1.c",
            "itemKind": "lettered item",
            "page": 575,
            "focusKeywords": [
                "te-pa",
                "ti-1",
                "io-ti",
                "proxy",
                "representative",
                "representer"
            ],
            "digest": "local case or subrule under §54.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "54.3.2",
            "ref": "Andrews Lesson 54.3.2",
            "itemKind": "numbered item",
            "page": 576,
            "focusKeywords": [
                "second",
                "type",
                "expresses",
                "notion",
                "merit",
                "recompense"
            ],
            "digest": "local case or subrule under §54.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "54.3.2.a",
            "ref": "Andrews Lesson 54.3.2.a",
            "itemKind": "lettered item",
            "page": 576,
            "focusKeywords": [
                "te-icn",
                "o-pil",
                "recompense",
                "icn-o",
                "pil",
                "child"
            ],
            "digest": "local case or subrule under §54.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "54.3.2.b",
            "ref": "Andrews Lesson 54.3.2.b",
            "itemKind": "lettered item",
            "page": 576,
            "focusKeywords": [
                "te-il",
                "hui-1",
                "recompense",
                "il-hui",
                "merit"
            ],
            "digest": "local case or subrule under §54.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "54.3.2.c",
            "ref": "Andrews Lesson 54.3.2.c",
            "itemKind": "lettered item",
            "page": 576,
            "focusKeywords": [
                "te-mah",
                "ce-hua",
                "1-ti",
                "recompense",
                "mah-ce",
                "hua-1"
            ],
            "digest": "local case or subrule under §54.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "54.3.3",
            "ref": "Andrews Lesson 54.3.3",
            "itemKind": "numbered item",
            "page": 577,
            "focusKeywords": [
                "third",
                "type",
                "various",
                "result"
            ],
            "digest": "local case or subrule under §54.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "54.3.4",
            "ref": "Andrews Lesson 54.3.4",
            "itemKind": "numbered item",
            "page": 577,
            "focusKeywords": [
                "fourth",
                "type",
                "various",
                "derived",
                "possessive-state",
                "predicate"
            ],
            "digest": "local case or subrule under §54.3, verify exact examples and boundaries in the PDF."
        }
    ],
    "54.5": [
        {
            "id": "54.5.1",
            "ref": "Andrews Lesson 54.5.1",
            "itemKind": "numbered item",
            "page": 579,
            "focusKeywords": [
                "absolutive",
                "state",
                "possible",
                "single-object"
            ],
            "digest": "local case or subrule under §54.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "54.5.1.a",
            "ref": "Andrews Lesson 54.5.1.a",
            "itemKind": "lettered item",
            "page": 579,
            "focusKeywords": [
                "ti-of",
                "possession",
                "type-one",
                "causative"
            ],
            "digest": "local case or subrule under §54.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "54.5.1.b",
            "ref": "Andrews Lesson 54.5.1.b",
            "itemKind": "lettered item",
            "page": 581,
            "focusKeywords": [
                "inceptive",
                "stative",
                "formation",
                "first-type",
                "causative"
            ],
            "digest": "local case or subrule under §54.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "54.5.2",
            "ref": "Andrews Lesson 54.5.2",
            "itemKind": "numbered item",
            "page": 581,
            "focusKeywords": [
                "possessive",
                "state",
                "again",
                "possible",
                "causative"
            ],
            "digest": "local case or subrule under §54.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "54.5.2.a",
            "ref": "Andrews Lesson 54.5.2.a",
            "itemKind": "lettered item",
            "page": 581,
            "focusKeywords": [
                "inceptive",
                "stative",
                "far",
                "frequent"
            ],
            "digest": "local case or subrule under §54.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "54.5.2.b",
            "ref": "Andrews Lesson 54.5.2.b",
            "itemKind": "lettered item",
            "page": 583,
            "focusKeywords": [
                "ti-of",
                "possession"
            ],
            "digest": "local case or subrule under §54.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "54.5.3",
            "ref": "Andrews Lesson 54.5.3",
            "itemKind": "numbered item",
            "page": 583,
            "focusKeywords": [
                "phonological",
                "sequence",
                "tia",
                "end",
                "difficulty"
            ],
            "digest": "local case or subrule under §54.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "54.5.3.a",
            "ref": "Andrews Lesson 54.5.3.a",
            "itemKind": "lettered item",
            "page": 583,
            "focusKeywords": [
                "not",
                "patientive",
                "class-one",
                "causative"
            ],
            "digest": "local case or subrule under §54.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "54.5.3.b",
            "ref": "Andrews Lesson 54.5.3.b",
            "itemKind": "lettered item",
            "page": 583,
            "focusKeywords": [
                "patientive",
                "involved",
                "both",
                "type-one",
                "type-two",
                "causative"
            ],
            "digest": "local case or subrule under §54.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "54.5.3.i",
            "ref": "Andrews Lesson 54.5.3.i",
            "itemKind": "lettered item",
            "page": 583,
            "focusKeywords": [
                "intransitive",
                "translation",
                "value",
                "type-one",
                "type-two"
            ],
            "digest": "local case or subrule under §54.5, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "54.5.3.i.ii",
            "ref": "Andrews Lesson 54.5.3.i.ii",
            "itemKind": "roman item",
            "page": 583,
            "focusKeywords": [
                "transitive",
                "translation",
                "value",
                "type-one",
                "type-two"
            ],
            "digest": "local case or subrule under §54.5, verify exact examples and boundaries in the PDF."
        }
    ],
    "55.3": [
        {
            "id": "55.3.1",
            "ref": "Andrews Lesson 55.3.1",
            "itemKind": "numbered item",
            "page": 586,
            "focusKeywords": [
                "o-a",
                "intransitive",
                "mean"
            ],
            "digest": "local case or subrule under §55.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "55.3.1.a",
            "ref": "Andrews Lesson 55.3.1.a",
            "itemKind": "lettered item",
            "page": 586,
            "focusKeywords": [
                "use",
                "apply",
                "thing",
                "signified"
            ],
            "digest": "local case or subrule under §55.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "55.3.1.b",
            "ref": "Andrews Lesson 55.3.1.b",
            "itemKind": "lettered item",
            "page": 587,
            "focusKeywords": [
                "produce",
                "thing",
                "signified"
            ],
            "digest": "local case or subrule under §55.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "55.3.2",
            "ref": "Andrews Lesson 55.3.2",
            "itemKind": "numbered item",
            "page": 587,
            "focusKeywords": [
                "derivational",
                "suffix",
                "huia",
                "single-object",
                "denominal",
                "pos"
            ],
            "digest": "local case or subrule under §55.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "55.3.2.a",
            "ref": "Andrews Lesson 55.3.2.a",
            "itemKind": "lettered item",
            "page": 587,
            "focusKeywords": [
                "use",
                "apply",
                "thing",
                "signified",
                "relation"
            ],
            "digest": "local case or subrule under §55.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "55.3.2.b",
            "ref": "Andrews Lesson 55.3.2.b",
            "itemKind": "lettered item",
            "page": 588,
            "focusKeywords": [
                "produce",
                "thing",
                "signified"
            ],
            "digest": "local case or subrule under §55.3, verify exact examples and boundaries in the PDF."
        }
    ],
    "55.7": [
        {
            "id": "55.7.1",
            "ref": "Andrews Lesson 55.7.1",
            "itemKind": "numbered item",
            "page": 591,
            "focusKeywords": [
                "examples",
                "nounstem-final"
            ],
            "digest": "local case or subrule under §55.7, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "55.7.2",
            "ref": "Andrews Lesson 55.7.2",
            "itemKind": "numbered item",
            "page": 591,
            "focusKeywords": [
                "examples",
                "nounstem-final"
            ],
            "digest": "local case or subrule under §55.7, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "55.7.3",
            "ref": "Andrews Lesson 55.7.3",
            "itemKind": "numbered item",
            "page": 591,
            "focusKeywords": [
                "examples",
                "nounstem-final"
            ],
            "digest": "local case or subrule under §55.7, verify exact examples and boundaries in the PDF."
        }
    ],
    "56.2": [
        {
            "id": "56.2.1",
            "ref": "Andrews Lesson 56.2.1",
            "itemKind": "numbered item",
            "page": 594,
            "focusKeywords": [
                "personal-name",
                "nominalized"
            ],
            "digest": "local case or subrule under §56.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "56.2.1.a",
            "ref": "Andrews Lesson 56.2.1.a",
            "itemKind": "lettered item",
            "page": 594,
            "focusKeywords": [
                "preterit-agentive",
                "serves"
            ],
            "digest": "local case or subrule under §56.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "56.2.1.b",
            "ref": "Andrews Lesson 56.2.1.b",
            "itemKind": "lettered item",
            "page": 596,
            "focusKeywords": [
                "present-agentive",
                "serves"
            ],
            "digest": "local case or subrule under §56.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "56.2.1.c",
            "ref": "Andrews Lesson 56.2.1.c",
            "itemKind": "lettered item",
            "page": 597,
            "focusKeywords": [
                "customary-present",
                "agentive",
                "serves"
            ],
            "digest": "local case or subrule under §56.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "56.2.1.d",
            "ref": "Andrews Lesson 56.2.1.d",
            "itemKind": "lettered item",
            "page": 598,
            "focusKeywords": [
                "purposive",
                "serve",
                "personal-name"
            ],
            "digest": "local case or subrule under §56.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "56.2.1.e",
            "ref": "Andrews Lesson 56.2.1.e",
            "itemKind": "lettered item",
            "page": 598,
            "focusKeywords": [
                "personal-name",
                "contains",
                "reflexive-object",
                "pronoun"
            ],
            "digest": "local case or subrule under §56.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "56.2.1.g",
            "ref": "Andrews Lesson 56.2.1.g",
            "itemKind": "lettered item",
            "page": 599,
            "focusKeywords": [
                "involves",
                "impersonal",
                "personal-name"
            ],
            "digest": "local case or subrule under §56.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "56.2.2",
            "ref": "Andrews Lesson 56.2.2",
            "itemKind": "numbered item",
            "page": 600,
            "focusKeywords": [
                "personal-name",
                "does",
                "not",
                "result",
                "nominaliza"
            ],
            "digest": "local case or subrule under §56.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "56.2.2.a",
            "ref": "Andrews Lesson 56.2.2.a",
            "itemKind": "lettered item",
            "page": 600,
            "focusKeywords": [
                "downgraded",
                "absolutive-state"
            ],
            "digest": "local case or subrule under §56.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "56.2.2.b",
            "ref": "Andrews Lesson 56.2.2.b",
            "itemKind": "lettered item",
            "page": 602,
            "focusKeywords": [
                "personal-name",
                "downgraded",
                "possessive-state"
            ],
            "digest": "local case or subrule under §56.2, verify exact examples and boundaries in the PDF."
        }
    ],
    "56.3": [
        {
            "id": "56.3.1",
            "ref": "Andrews Lesson 56.3.1",
            "itemKind": "numbered item",
            "page": 603,
            "focusKeywords": [
                "structure",
                "subject",
                "supplementation",
                "serves"
            ],
            "digest": "local case or subrule under §56.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "56.3.2",
            "ref": "Andrews Lesson 56.3.2",
            "itemKind": "numbered item",
            "page": 603,
            "focusKeywords": [
                "structure",
                "possessor",
                "supplementation",
                "serves"
            ],
            "digest": "local case or subrule under §56.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "56.3.3",
            "ref": "Andrews Lesson 56.3.3",
            "itemKind": "numbered item",
            "page": 604,
            "focusKeywords": [
                "structure",
                "adjectival",
                "modification",
                "serves"
            ],
            "digest": "local case or subrule under §56.3, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "56.3.5",
            "ref": "Andrews Lesson 56.3.5",
            "itemKind": "numbered item",
            "page": 605,
            "focusKeywords": [
                "acalendrical",
                "name",
                "taken",
                "divinatory",
                "calendar",
                "see"
            ],
            "digest": "local case or subrule under §56.3, verify exact examples and boundaries in the PDF."
        }
    ],
    "57.1": [
        {
            "id": "57.1.1",
            "ref": "Andrews Lesson 57.1.1",
            "itemKind": "numbered item",
            "page": 608,
            "focusKeywords": [
                "present-tense",
                "refer"
            ],
            "digest": "local case or subrule under §57.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "57.1.1.a",
            "ref": "Andrews Lesson 57.1.1.a",
            "itemKind": "lettered item",
            "page": 608,
            "focusKeywords": [
                "event",
                "past",
                "time",
                "so-called",
                "historical",
                "present"
            ],
            "digest": "local case or subrule under §57.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "57.1.1.b",
            "ref": "Andrews Lesson 57.1.1.b",
            "itemKind": "lettered item",
            "page": 608,
            "focusKeywords": [
                "event",
                "prior",
                "past",
                "time",
                "latter",
                "historical"
            ],
            "digest": "local case or subrule under §57.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "57.1.1.c",
            "ref": "Andrews Lesson 57.1.1.c",
            "itemKind": "lettered item",
            "page": 608,
            "focusKeywords": [
                "event",
                "subsequent",
                "past",
                "time",
                "equivalent",
                "english"
            ],
            "digest": "local case or subrule under §57.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "57.1.1.d",
            "ref": "Andrews Lesson 57.1.1.d",
            "itemKind": "lettered item",
            "page": 609,
            "focusKeywords": [
                "event",
                "past",
                "time",
                "concomitant",
                "equivalent",
                "eng"
            ],
            "digest": "local case or subrule under §57.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "57.1.2",
            "ref": "Andrews Lesson 57.1.2",
            "itemKind": "numbered item",
            "page": 609,
            "focusKeywords": [
                "preterit-tense",
                "refer"
            ],
            "digest": "local case or subrule under §57.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "57.1.2.a",
            "ref": "Andrews Lesson 57.1.2.a",
            "itemKind": "lettered item",
            "page": 609,
            "focusKeywords": [
                "event",
                "prior",
                "present",
                "equivalent",
                "english",
                "perfect"
            ],
            "digest": "local case or subrule under §57.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "57.1.2.b",
            "ref": "Andrews Lesson 57.1.2.b",
            "itemKind": "lettered item",
            "page": 609,
            "focusKeywords": [
                "event",
                "prior",
                "past",
                "equivalent",
                "english",
                "pluperfect"
            ],
            "digest": "local case or subrule under §57.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "57.1.2.c",
            "ref": "Andrews Lesson 57.1.2.c",
            "itemKind": "lettered item",
            "page": 609,
            "focusKeywords": [
                "event",
                "prior",
                "future",
                "equivalent",
                "english",
                "perfect"
            ],
            "digest": "local case or subrule under §57.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "57.1.3",
            "ref": "Andrews Lesson 57.1.3",
            "itemKind": "numbered item",
            "page": 609,
            "focusKeywords": [
                "afuture-tense",
                "refer"
            ],
            "digest": "local case or subrule under §57.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "57.1.3.a",
            "ref": "Andrews Lesson 57.1.3.a",
            "itemKind": "lettered item",
            "page": 609,
            "focusKeywords": [
                "event",
                "subsequent",
                "past",
                "equivalent",
                "english",
                "future-in"
            ],
            "digest": "local case or subrule under §57.1, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "57.1.3.b",
            "ref": "Andrews Lesson 57.1.3.b",
            "itemKind": "lettered item",
            "page": 609,
            "focusKeywords": [
                "event",
                "immediately",
                "prior",
                "equivalent",
                "english",
                "just"
            ],
            "digest": "local case or subrule under §57.1, verify exact examples and boundaries in the PDF."
        }
    ],
    "57.4": [
        {
            "id": "57.4.1",
            "ref": "Andrews Lesson 57.4.1",
            "itemKind": "numbered item",
            "page": 610,
            "focusKeywords": [
                "special",
                "instances",
                "lack",
                "agreement",
                "person",
                "been"
            ],
            "digest": "local case or subrule under §57.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "57.4.2",
            "ref": "Andrews Lesson 57.4.2",
            "itemKind": "numbered item",
            "page": 611,
            "focusKeywords": [
                "special",
                "instances",
                "lack",
                "agreement",
                "number",
                "been"
            ],
            "digest": "local case or subrule under §57.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "57.4.3",
            "ref": "Andrews Lesson 57.4.3",
            "itemKind": "numbered item",
            "page": 611,
            "focusKeywords": [
                "lack",
                "agreement",
                "specificity",
                "occurs",
                "adjunct",
                "specific"
            ],
            "digest": "local case or subrule under §57.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "57.4.3.a",
            "ref": "Andrews Lesson 57.4.3.a",
            "itemKind": "lettered item",
            "page": 612,
            "focusKeywords": [
                "nonspecific",
                "subject",
                "pronoun",
                "principal",
                "take",
                "specific"
            ],
            "digest": "local case or subrule under §57.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "57.4.3.b",
            "ref": "Andrews Lesson 57.4.3.b",
            "itemKind": "lettered item",
            "page": 612,
            "focusKeywords": [
                "nonspecific",
                "object",
                "pronoun",
                "principal",
                "take",
                "specific"
            ],
            "digest": "local case or subrule under §57.4, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "57.4.3.c",
            "ref": "Andrews Lesson 57.4.3.c",
            "itemKind": "lettered item",
            "page": 612,
            "focusKeywords": [
                "constructions",
                "described",
                "paragraphs",
                "underlie",
                "implicit",
                "such"
            ],
            "digest": "local case or subrule under §57.4, verify exact examples and boundaries in the PDF."
        }
    ],
    "58.2": [
        {
            "id": "58.2.1",
            "ref": "Andrews Lesson 58.2.1",
            "itemKind": "numbered item",
            "page": 618,
            "focusKeywords": [
                "certain",
                "incorporated-noun",
                "compound",
                "e-hua",
                "tla",
                "e-hu"
            ],
            "digest": "local case or subrule under §58.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "58.2.2",
            "ref": "Andrews Lesson 58.2.2",
            "itemKind": "numbered item",
            "page": 618,
            "focusKeywords": [
                "occasionally",
                "finds",
                "connective-t",
                "compound",
                "which",
                "embed"
            ],
            "digest": "local case or subrule under §58.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "58.2.3",
            "ref": "Andrews Lesson 58.2.3",
            "itemKind": "numbered item",
            "page": 618,
            "focusKeywords": [
                "occasionally",
                "restricted-use",
                "preterit-as",
                "present",
                "agentive",
                "con"
            ],
            "digest": "local case or subrule under §58.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "58.2.4",
            "ref": "Andrews Lesson 58.2.4",
            "itemKind": "numbered item",
            "page": 619,
            "focusKeywords": [
                "occasionally",
                "finds",
                "connective-t",
                "compound",
                "violates",
                "rules"
            ],
            "digest": "local case or subrule under §58.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "58.2.5",
            "ref": "Andrews Lesson 58.2.5",
            "itemKind": "numbered item",
            "page": 619,
            "focusKeywords": [
                "possible",
                "find",
                "connective-t",
                "between",
                "embed",
                "matrix"
            ],
            "digest": "local case or subrule under §58.2, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "58.2.6",
            "ref": "Andrews Lesson 58.2.6",
            "itemKind": "numbered item",
            "page": 619,
            "focusKeywords": [
                "strange",
                "formation",
                "which",
                "reflexive-object",
                "pronoun",
                "frozen"
            ],
            "digest": "local case or subrule under §58.2, verify exact examples and boundaries in the PDF."
        }
    ],
    "58.7": [
        {
            "id": "58.7.1",
            "ref": "Andrews Lesson 58.7.1",
            "itemKind": "numbered item",
            "page": 623,
            "focusKeywords": [
                "active",
                "formation"
            ],
            "digest": "local case or subrule under §58.7, verify exact examples and boundaries in the PDF."
        },
        {
            "id": "58.7.2",
            "ref": "Andrews Lesson 58.7.2",
            "itemKind": "numbered item",
            "page": 624,
            "focusKeywords": [
                "nonactive",
                "formation"
            ],
            "digest": "local case or subrule under §58.7, verify exact examples and boundaries in the PDF."
        }
    ]
});

const ANDREWS_TRAJECTORY_GROUPS = Object.freeze([
    {
        range: [1, 4],
        label: "Lecciones 1-4",
        directive: "Capa de fundamentos: usar Andrews para definir términos gramaticales, notación, partículas y límites de cláusula nuclear antes de hacer reclamos de interfaz o generación.",
        validationRefs: ["src/tests/registry.test.js", "src/tests/concepts.test.js", "src/tests/orthography.test.js", "src/tests/particles.test.js", "src/tests/clause.test.js"],
    },
    {
        range: [5, 11],
        label: "Lecciones 5-11",
        directive: "Capa básica de cláusula verbal: Andrews dirige sujeto, objeto, tiempo, valencia, clase de tronco, límite oracional y categorías irregulares.",
        validationRefs: ["src/tests/registry.test.js", "src/tests/agreement.test.js", "src/tests/vnc.test.js", "src/tests/preterit.test.js", "src/tests/sentence.test.js", "src/tests/irregulars.test.js"],
    },
    {
        range: [12, 19],
        label: "Lecciones 12-19",
        directive: "Capa básica de cláusula nominal: Andrews dirige contratos absolutivos, posesivos, de clase de tronco nominal, pronominales y de suplementación sin agregar posición de tiempo.",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc.test.js", "src/tests/parsing.test.js"],
    },
    {
        range: [20, 27],
        label: "Lecciones 20-27",
        directive: "Capa de troncos verbales derivados: Andrews dirige límites de derivación no activa, pasiva, impersonal, de objeto, causativa, aplicativa y frecuentativa.",
        validationRefs: ["src/tests/registry.test.js", "src/tests/derivation.test.js", "src/tests/vnc.test.js", "src/tests/agreement.test.js"],
    },
    {
        range: [28, 34],
        label: "Lecciones 28-34",
        directive: "Capa de compuestos y troncos especiales: Andrews dirige límites de cláusula verbal/nominal compuesta, purposiva, afectiva, honorífica y numeral.",
        validationRefs: ["src/tests/registry.test.js", "src/tests/parsing.test.js", "src/tests/nnc.test.js"],
    },
    {
        range: [35, 43],
        label: "Lecciones 35-43",
        directive: "Capa de formación nominal y adjetival: Andrews dirige límites de nominalización, patientivo, función adjetival y modificación.",
        validationRefs: ["src/tests/registry.test.js", "src/tests/derivation.test.js", "src/tests/nnc_adjectival.test.js", "src/tests/modification.test.js"],
    },
    {
        range: [44, 50],
        label: "Lecciones 44-50",
        directive: "Capa relacional y adverbial: Andrews dirige cláusulas nucleares adverbiales, cláusulas nominales relacionales, formas de lugar/gentilicio y adjunción.",
        validationRefs: ["src/tests/registry.test.js", "src/tests/adverbial.test.js", "src/tests/adjunction.test.js"],
    },
    {
        range: [51, 58],
        label: "Lecciones 51-58",
        directive: "Capa de cláusula, denominal, nombres y miscelánea: Andrews dirige límites de complemento, conjunción, comparación, denominales, nombres y análisis.",
        validationRefs: ["src/tests/registry.test.js", "src/tests/complement.test.js", "src/tests/conjunction.test.js"],
    },
]);

const ANDREWS_FOUNDATION_TRAJECTORY_OVERRIDES = Object.freeze({
    1: {
        pdfRefs: ["Andrews Lesson 1"],
        directive: "Usa Andrews Lección 1 como capa de sistema operativo gramatical: unidades de cláusula nuclear, notación, morfo/morfema/forma, tronco, acervo, afijo y términos de límite dirigen la arquitectura posterior del motor.",
        implementationState: "implemented-audited",
        redirectAction: "keep",
        evidenceStatus: "direct-pdf-diagnostic",
        orthographyStatus: "not-surface-bearing",
        validationRefs: ["src/tests/registry.test.js", "src/tests/concepts.test.js"],
        plannedArrows: [
            {
                id: "lesson-1-behavior-correctness-audit",
                type: "metadata-diagnostic-test",
                aim: "Aplicar Corrección antes de existencia: auditar Andrews Lección 1 por la ruta de entrada a salida como comportamiento de términos, niveles y límites, con sonda de fallo para detectar etiquetas existentes que tratan cláusulas nucleares como palabras o mezclan morfema, morfo y forma.",
                andrewsRefs: ["Andrews Lesson 1"],
                expectedFeedbackRefs: ["src/tests/registry.test.js", "src/tests/concepts.test.js"],
            },
            {
                id: "lesson-1-formula-authority-audit",
                type: "formula-notation-test",
                aim: "Aplicar Corrección antes de existencia: auditar Andrews Lección 1 por la ruta de entrada a salida como comportamiento de notación de fórmula, con sonda de fallo para detectar existencia de símbolos #, paréntesis, + o guion tratados como superficie Nawat y no como contrato de motor.",
                andrewsRefs: ["Andrews Lesson 1"],
                expectedFeedbackRefs: ["src/tests/registry.test.js", "src/tests/concepts.test.js"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-1-behavior-correctness-audit",
                result: "hit",
                correction: "Corrección antes de existencia: la Lección 1 queda como pase cercano porque la ruta de entrada a salida conserva comportamiento diagnóstico de términos, niveles y límites; la sonda de fallo contra existencia sola es que una etiqueta visible o metadato vuelva a llamar palabra a la cláusula nuclear o confunda morfema, morfo y forma.",
                andrewsRefs: ["Andrews Lesson 1"],
                feedbackRefs: ["src/tests/registry.test.js", "src/tests/concepts.test.js"],
            },
            {
                id: "lesson-1-formula-authority-audit",
                result: "hit",
                correction: "Corrección antes de existencia: la notación de fórmula de Andrews queda como comportamiento de contrato en la ruta de entrada a salida; la sonda de fallo contra existencia sola es que #, paréntesis, + o guion se traten como superficie Nawat o licencia de generación.",
                andrewsRefs: ["Andrews Lesson 1"],
                feedbackRefs: ["src/tests/registry.test.js", "src/tests/concepts.test.js"],
            },
        ],
    },
    2: {
        pdfRefs: ["Andrews Lesson 2.1-2.16"],
        directive: "Usa Andrews Lección 2 para las categorías clásicas de sonido y escritura, y luego enruta las superficies por el puente ortográfico Nawat/Pipil antes de cualquier realización Nawat.",
        implementationState: "partial",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "orthography-bridge-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/orthography.test.js"],
        plannedArrows: [
            {
                id: "lesson-2-subsection-coverage-audit",
                type: "metadata-diagnostic-test",
                aim: "Aplicar Corrección antes de existencia: auditar Andrews Lección 2.1-2.16 por la ruta de entrada a salida como comportamiento de sonido, escritura y puente ortográfico, con sonda de fallo para detectar un puente existente que confunda -h de núm2, saltillo silábico o evidencia léxica Nawat.",
                andrewsRefs: ["Andrews Lesson 2.1-2.16"],
                expectedFeedbackRefs: ["src/tests/orthography.test.js", "docs/GRAMMAR_SPEC.md"],
            },
            {
                id: "lesson-2-formula-orthography-authority-audit",
                type: "orthography-formula-test",
                aim: "Aplicar Corrección antes de existencia: auditar Andrews Lección 2 por la ruta de entrada a salida como comportamiento de puente ortográfico subordinado a ranuras de fórmula, con sonda de fallo para detectar conversión existente que cambie dueño de ranura, trate h de núm2 como j glotal o trate h silábica final como t de núm2.",
                andrewsRefs: ["Andrews Lesson 2.1-2.16"],
                expectedFeedbackRefs: ["src/tests/orthography.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-2-subsection-coverage-audit",
                result: "hit",
                correction: "Corrección antes de existencia: la cobertura de Lección 2 ahora lleva referencias de PDF por subsección, acciones de redirección, referencias de validación y política sin generación; la ruta de entrada a salida se conserva como comportamiento diagnóstico, y la sonda de fallo contra existencia sola es cualquier conversión que trate toda h final como una sola categoría o como evidencia léxica Nawat.",
                andrewsRefs: ["Andrews Lesson 2.1-2.16"],
                feedbackRefs: ["src/tests/orthography.test.js", "docs/GRAMMAR_SPEC.md"],
            },
            {
                id: "lesson-2-formula-orthography-authority-audit",
                result: "hit",
                correction: "Corrección antes de existencia: el puente ortográfico de Andrews queda subordinado a ranuras de fórmula como comportamiento verificable en la ruta de entrada a salida; la sonda de fallo contra existencia sola es h de núm2 como j glotal, h final silábica como t de núm2, o conversión que cambie dueño de ranura.",
                andrewsRefs: ["Andrews Lesson 2.1-2.16"],
                feedbackRefs: ["src/tests/orthography.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen bloqueadas, solo diagnósticas o pendientes de evidencia Nawat: longitud vocálica, acento/prosodia, consonantes largas, alternancia glotal y elecciones ortográficas sensibles a evidencia.",
    },
    3: {
        pdfRefs: ["Andrews Lesson 3"],
        directive: "Usa Andrews Lección 3 para clasificar partículas como unidades menores sensibles a colocación; mantener modo Partícula como diagnóstico salvo que evidencia local Nawat confirme superficies y funciones.",
        implementationState: "partial",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "orthography-adapted-seed-only",
        validationRefs: ["src/tests/registry.test.js", "src/tests/particles.test.js"],
        plannedArrows: [
            {
                id: "lesson-3-pdf-example-transfer-audit",
                type: "metadata-diagnostic-test",
                aim: "Aplicar Corrección antes de existencia: auditar Andrews Lección 3 por la ruta de entrada a salida como comportamiento de partícula menor, colocación y no inflexión, con sonda de fallo para detectar inventario existente que parezca generación, ejemplo fijo Nawat confirmado o unidad de cláusula nuclear.",
                andrewsRefs: ["Andrews Lesson 3.2.5", "Andrews Lesson 3.4"],
                expectedFeedbackRefs: ["src/tests/particles.test.js", "docs/GRAMMAR_SPEC.md"],
            },
            {
                id: "lesson-3-formula-boundary-audit",
                type: "particle-formula-boundary-test",
                aim: "Aplicar Corrección antes de existencia: auditar Andrews Lección 3 por la ruta de entrada a salida como comportamiento de partícula fuera de fórmula de cláusula verbal o nominal, con sonda de fallo para detectar partícula existente tratada como ranura de fórmula, predicado o superficie generada.",
                andrewsRefs: ["Andrews Lesson 3"],
                expectedFeedbackRefs: ["src/tests/particles.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-3-pdf-example-transfer-audit",
                result: "hit",
                correction: "Corrección antes de existencia: los ejemplos faltantes de interjección y colocación de Lección 3 ahora están en el inventario semilla derivado de Andrews con glosas en español, formas visibles adaptadas ortográficamente y generación desactivada; la ruta de entrada a salida queda como comportamiento solo diagnóstico, y la sonda de fallo contra existencia sola es una fila de partícula que prometa superficie Nawat confirmada o generación.",
                andrewsRefs: ["Andrews Lesson 3.2.5", "Andrews Lesson 3.4"],
                feedbackRefs: ["src/tests/particles.test.js", "docs/GRAMMAR_SPEC.md"],
            },
            {
                id: "lesson-3-formula-boundary-audit",
                result: "hit",
                correction: "Corrección antes de existencia: Lección 3 queda separada de fórmula de cláusula verbal o nominal como comportamiento de partícula menor en la ruta de entrada a salida; la sonda de fallo contra existencia sola es que una partícula se trate como ranura de fórmula, predicado o superficie generada.",
                andrewsRefs: ["Andrews Lesson 3"],
                feedbackRefs: ["src/tests/particles.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen pendientes de evidencia: inventario local confirmado de partículas Nawat/Pipil, evidencia de colocación y generación; modo Partícula permanece solo diagnóstico.",
    },
    4: {
        pdfRefs: ["Andrews Lesson 4.1-4.6"],
        directive: "Usa Andrews Lección 4 para dirigir la arquitectura de cláusula nuclear: sujeto más predicado, marcos de cláusula verbal y nominal, límites de fórmula y ningún colapso a nivel de palabra.",
        implementationState: "partial",
        redirectAction: "reframe-metadata",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: ["src/tests/registry.test.js", "src/tests/clause.test.js", "src/tests/ui.test.js"],
        plannedArrows: [
            {
                id: "lesson-4-subsection-coverage-audit",
                type: "metadata-diagnostic-test",
                aim: "Aplicar Corrección antes de existencia: auditar Andrews Lección 4.1-4.6 por la ruta de entrada a salida como comportamiento de sujeto más predicado, orden de fórmula y propiedad de ranuras, con sonda de fallo para detectar fórmula existente con tiempo en cláusula nominal o número dentro del predicado.",
                andrewsRefs: ["Andrews Lesson 4.1-4.6"],
                expectedFeedbackRefs: ["src/tests/clause.test.js", "docs/GRAMMAR_SPEC.md"],
            },
            {
                id: "lesson-4-formula-authority-audit",
                type: "formula-engine-test",
                aim: "Aplicar Corrección antes de existencia: auditar Andrews Lección 4.3-4.5 por la ruta de entrada a salida como comportamiento de autoridad de fórmula de cláusula verbal o nominal, con sonda de fallo para detectar fórmula existente que cambie orden, dueño de ranura, límite de predicado o ausencia de tiempo en cláusula nominal.",
                andrewsRefs: ["Andrews Lesson 4.1-4.6"],
                expectedFeedbackRefs: ["src/tests/clause.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-4-subsection-coverage-audit",
                result: "hit",
                correction: "Corrección antes de existencia: el marco de Lección 4 ahora lleva referencias de PDF por subsección, directivas en español, acciones de redirección, referencias de validación y política sin generación; la ruta de entrada a salida conserva comportamiento de ranuras y límites, y la sonda de fallo contra existencia sola es una fórmula visible o metadato con orden, dueño de ranura o límite de predicado contrario a Andrews.",
                andrewsRefs: ["Andrews Lesson 4.1-4.6"],
                feedbackRefs: ["src/tests/clause.test.js", "docs/GRAMMAR_SPEC.md"],
            },
            {
                id: "lesson-4-formula-authority-audit",
                result: "hit",
                correction: "Corrección antes de existencia: la autoridad de fórmula de Andrews queda explícita en la ruta de entrada a salida como comportamiento de contrato de cláusula verbal o nominal; la sonda de fallo contra existencia sola es un metadato o eco visible que cambie orden, dueño de ranura, límite de predicado o ausencia de tiempo en cláusula nominal.",
                andrewsRefs: ["Andrews Lesson 4.1-4.6"],
                feedbackRefs: ["src/tests/clause.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: sintaxis oracional, registro de datos de fórmula, contexto de referencia de tercera persona y paradigmas detallados de rellenador de cláusula verbal/nominal.",
    },
    5: {
        pdfRefs: ["Andrews Lesson 5.1-5.5"],
        directive: "Usa Andrews Lección 5 para dirigir la fórmula intransitiva de cláusula verbal, la distribución de la posición del pronombre de sujeto, el inventario de morfemas de tiempo y el límite de realización Nawat/Pipil.",
        implementationState: "implemented-audited",
        redirectAction: "keep",
        evidenceStatus: "direct-pdf-with-nawat-realization",
        orthographyStatus: "nawat-direct-generation-for-lesson-6-object-dyads",
        validationRefs: ["src/tests/registry.test.js", "src/tests/vnc.test.js"],
        plannedArrows: [
            {
                id: "lesson-5-intransitive-vnc-audit",
                type: "metadata-engine-test",
                aim: "Aplicar Corrección antes de existencia: auditar Andrews Lección 5.1-5.5 por la ruta de entrada a salida como comportamiento de fórmula de cláusula verbal intransitiva, posiciones de sujeto, rutas de tiempo y puente ortográfico Nawat, con sonda de fallo para detectar superficie optativa shi con metadatos pers1 todavía ti o an.",
                andrewsRefs: ["Andrews Lesson 5.1-5.5"],
                expectedFeedbackRefs: ["src/tests/vnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
            {
                id: "lesson-5-optative-formula-authority-audit",
                type: "formula-engine-test",
                aim: "Aplicar Corrección antes de existencia: auditar Andrews Lección 5.4-5.5 por la ruta de entrada a salida como comportamiento de autoridad de fórmula optativa, con sonda de fallo para detectar existencia de salida plural optativa que conserve Ø-t, k-et o sufijo plegado en vez de k-an en num1-num2.",
                andrewsRefs: ["Andrews Lesson 5.1-5.5"],
                expectedFeedbackRefs: ["src/tests/vnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
            {
                id: "lesson-5-tense-morph-formula-authority-audit",
                type: "formula-engine-test",
                aim: "Aplicar Corrección antes de existencia: auditar Andrews Lección 5.5 por la ruta de entrada a salida como comportamiento de morfo en la ranura tiempo para cada tiempo finito implementado, con sonda de fallo para detectar existencia de fórmula que muestre presente-desiderativo, condicional, perfecto, pluscuamperfecto o condicional-perfecto como texto de ranura.",
                andrewsRefs: ["Andrews Lesson 5.1-5.5"],
                expectedFeedbackRefs: ["src/tests/vnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-5-intransitive-vnc-audit",
                result: "hit",
                correction: "Corrección antes de existencia: la Lección 5 lleva referencias de PDF por subsección, directivas en español, fórmula intransitiva, paradigmas de sujeto, inventario de tiempo y política Nawat; la ruta de entrada a salida corrige el comportamiento del relleno de sujeto optativo shi, y la sonda de fallo contra existencia sola es una fórmula visible que deje ti/an en pers1 cuando la superficie generada usa shi.",
                andrewsRefs: ["Andrews Lesson 5.1-5.5"],
                feedbackRefs: ["src/tests/vnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
            {
                id: "lesson-5-optative-formula-authority-audit",
                result: "hit",
                correction: "Corrección antes de existencia: la autoridad de fórmula de Andrews ahora domina la ruta de entrada a salida como comportamiento de optativo plural; la sonda de fallo contra existencia sola es una salida o metadato plural optativo que deje Ø-t, k-et o sufijo plegado donde num1-num2 debe ser k-an.",
                andrewsRefs: ["Andrews Lesson 5.1-5.5"],
                feedbackRefs: ["src/tests/vnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
            {
                id: "lesson-5-tense-morph-formula-authority-audit",
                result: "hit",
                correction: "Corrección antes de existencia: la ranura tiempo de fórmula ahora usa morfos de tiempo por la ruta de entrada a salida como comportamiento de las rutas finitas implementadas; la sonda de fallo contra existencia sola es que una clave como condicional-perfecto aparezca en la fórmula donde debe estar el morfo tuskia.",
                andrewsRefs: ["Andrews Lesson 5.1-5.5"],
                feedbackRefs: ["src/tests/vnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "none",
    },
    6: {
        pdfRefs: ["Andrews Lesson 6.1-6.7"],
        directive: "Usa Andrews Lección 6 para dirigir la valencia transitiva de cláusula verbal: categorías de pronombre objetivo, posiciones de valencia monádica y diádica, paradigmas de objeto proyectivo y límites de objeto reflexivo/recíproco.",
        implementationState: "implemented-audited",
        redirectAction: "keep",
        evidenceStatus: "direct-pdf-with-nawat-realization",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/vnc.test.js", "src/tests/agreement.test.js", "src/tests/combo_validation.test.js"],
        plannedArrows: [
            {
                id: "lesson-6-transitive-vnc-audit",
                type: "metadata-engine-test",
                aim: "Aplicar Corrección antes de existencia: auditar Andrews Lección 6.1-6.7 por la ruta de entrada a salida como comportamiento de valencia transitiva, categorías de objeto y realización Nawat, con sonda de fallo para detectar metadatos que existan sin separar valencia monádica, diádica, específica, inespecífica y reflexiva.",
                andrewsRefs: ["Andrews Lesson 6.1-6.7"],
                expectedFeedbackRefs: ["src/tests/vnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
            {
                id: "lesson-6-valence-formula-authority-audit",
                type: "formula-engine-test",
                aim: "Aplicar autoridad de fórmula de Andrews: verificar por la ruta de entrada a salida que los objetos específicos y el reflexivo principal usen val1-val2, que te/ta inespecíficos usen val, y que mu no se duplique como objeto y reflexivo; la sonda de fallo es una salida que rinda ki como monádico, ta como diádico o mu-mu.",
                andrewsRefs: ["Andrews Lesson 6.1-6.7"],
                expectedFeedbackRefs: ["src/tests/vnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
            {
                id: "lesson-6-shuntline-ne-direct-generation-audit",
                type: "formula-engine-test",
                aim: "Aplicar autoridad de fórmula de Andrews: verificar por la ruta de entrada a salida que ne de línea secundaria conserve fórmula monádica y genere como Nawat directo; la sonda de fallo es bloquear ne o un metadato que lo llame mu de línea principal.",
                andrewsRefs: ["Andrews Lesson 6.1-6.7"],
                expectedFeedbackRefs: ["src/tests/vnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-6-transitive-vnc-audit",
                result: "hit",
                correction: "Corrección antes de existencia: la Lección 6 conserva referencias de PDF por subsección, directivas en español, metadatos de valencia monádica y diádica, categorías de objeto, paradigmas proyectivo/reflexivo y política Nawat; la sonda de fallo contra existencia sola es que la ruta de entrada a salida no distinga comportamiento específico, inespecífico y reflexivo.",
                andrewsRefs: ["Andrews Lesson 6.1-6.7"],
                feedbackRefs: ["src/tests/vnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
            {
                id: "lesson-6-valence-formula-authority-audit",
                result: "hit",
                correction: "Corrección antes de existencia: la autoridad de fórmula de Andrews ahora decide la posición de valencia en la ruta de entrada a salida; los objetos específicos usan val1-val2, te/ta usan val, y mu no se duplica como mu-mu.",
                andrewsRefs: ["Andrews Lesson 6.1-6.7"],
                feedbackRefs: ["src/tests/vnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
            {
                id: "lesson-6-shuntline-ne-direct-generation-audit",
                result: "hit",
                correction: "Corrección antes de existencia: ne de línea secundaria queda como fórmula monádica activa por la ruta de entrada a salida; la sonda de fallo contra existencia sola es bloquear la superficie Nawat ne o confundirla con mu de línea principal.",
                andrewsRefs: ["Andrews Lesson 6.1-6.7"],
                feedbackRefs: ["src/tests/vnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "none",
    },
    7: {
        pdfRefs: ["Andrews Lesson 7.1-7.10"],
        directive: "Usa Andrews Lección 7 para dirigir la cita de núcleo verbal, la estructura morfémica del tronco verbal, la arquitectura de clases A/B/C/D, la formación predicativa perfectiva/imperfectiva, los límites de análisis de cláusula verbal, las relaciones de objeto y la derivación por fusión ta.",
        implementationState: "implemented-audited",
        redirectAction: "keep",
        evidenceStatus: "direct-pdf-with-nawat-realization",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/vnc.test.js", "src/tests/preterit.test.js"],
        plannedArrows: [
            {
                id: "lesson-7-verbstem-class-audit",
                type: "metadata-engine-test",
                aim: "Auditar Andrews Lección 7.1-7.10 contra cita de núcleo verbal, clases de tronco verbal, rutas de clase perfectiva/imperfectiva, marcos de análisis, relaciones de objeto y límites de derivación por fusión ta.",
                andrewsRefs: ["Andrews Lesson 7.1-7.10"],
                expectedFeedbackRefs: ["src/tests/vnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-7-verbstem-class-audit",
                result: "hit",
                correction: "La Lección 7 ahora lleva referencias de PDF por subsección, directivas en español, política de cita de núcleo verbal, marcos de clase A/B/C/D, inventario de formación predicativa, límites de análisis, metadatos de relación de objeto y política de derivación por fusión ta.",
                andrewsRefs: ["Andrews Lesson 7.1-7.10"],
                feedbackRefs: ["src/tests/vnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "none",
    },
    8: {
        pdfRefs: ["Andrews Lesson 8.1-8.6"],
        directive: "Usa Andrews Lección 8 para dirigir límites de prefijo de cláusula verbal expandida, categorías de oración básica frente a transformada, reglas de aserción afirmativa simple, comportamiento de aserción negativa/enfática y diagnósticos de pregunta sí/no.",
        implementationState: "partial",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: ["src/tests/registry.test.js", "src/tests/sentence.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-8-expanded-vnc-basic-sentence-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 8.1-8.6 contra colocación de límites de cláusula verbal expandida, categorías de oración básica/transformada y posiciones oracionales solo diagnósticas.",
                andrewsRefs: ["Andrews Lesson 8.1-8.6"],
                expectedFeedbackRefs: ["src/tests/sentence.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-8-expanded-vnc-basic-sentence-audit",
                result: "hit",
                correction: "La Lección 8 ahora lleva referencias de PDF por subsección, directivas en español, metadatos de límites de cláusula verbal expandida, marcos de oración básica/transformada y bloqueos explícitos de generación para oraciones negativas, enfáticas y de pregunta sí/no.",
                andrewsRefs: ["Andrews Lesson 8.1-8.6"],
                feedbackRefs: ["src/tests/sentence.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen solo diagnósticas o pendientes de evidencia: generación oracional, realización confirmada de partículas Nawat/Pipil de la Lección 8 y controles generativos de prefijos direccionales/locativos de cláusula verbal.",
    },
    9: {
        pdfRefs: ["Andrews Lesson 9.1-9.9"],
        directive: "Usa Andrews Lección 9 para dirigir el uso optativo de cláusula verbal, oraciones de deseo, oraciones de mandato y exhortación, comportamiento de deseo negativo y el límite explícito de que el náhuatl no tiene modo de mandato separado.",
        implementationState: "partial",
        redirectAction: "reframe-metadata",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: ["src/tests/registry.test.js", "src/tests/sentence.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-9-optative-sentence-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 9.1-9.9 contra uso optativo de cláusula verbal, oraciones de deseo, oraciones de mandato/exhortación y el límite sin modo de mandato separado.",
                andrewsRefs: ["Andrews Lesson 9.1-9.9"],
                expectedFeedbackRefs: ["src/tests/sentence.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-9-optative-sentence-audit",
                result: "hit",
                correction: "La Lección 9 ahora lleva referencias de PDF por subsección, directivas en español, metadatos de uso optativo de cláusula verbal, marcos de deseo/deseo negativo, marcos de mandato/exhortación, clave finita optativo y bloqueos explícitos para tratar etiquetas de mandato como modo separado de Andrews.",
                andrewsRefs: ["Andrews Lesson 9.1-9.9"],
                feedbackRefs: ["src/tests/sentence.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen solo diagnósticas o pendientes de evidencia: generación oracional, realización confirmada de partículas Nawat/Pipil de la Lección 9 y semántica oracional optativa/mandato dirigida por Andrews.",
    },
    10: {
        pdfRefs: ["Andrews Lesson 10.1-10.5"],
        directive: "Usa Andrews Lección 10 para dirigir el significado admonitivo de cláusula verbal, formación admonitiva no pasada, transformaciones oracionales admonitivas afirmativas y negativas, y diagnósticos de contraste con formas optativas e indicativas.",
        implementationState: "partial",
        redirectAction: "reframe-metadata",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: ["src/tests/registry.test.js", "src/tests/sentence.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-10-admonitive-sentence-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 10.1-10.5 contra significado del modo admonitivo, formación admonitiva no pasada de cláusula verbal, transformaciones de oración admonitiva y diagnósticos de contraste admonitivo/optativo/indicativo.",
                andrewsRefs: ["Andrews Lesson 10.1-10.5"],
                expectedFeedbackRefs: ["src/tests/sentence.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-10-admonitive-sentence-audit",
                result: "hit",
                correction: "La Lección 10 ahora lleva referencias de PDF por subsección, directivas en español, metadatos de modo admonitivo, formación admonitiva no pasada de cláusula verbal, marcos de admonición afirmativa/negativa y diagnósticos de contraste que bloquean tratar formas admonitivas como mandatos negativos.",
                andrewsRefs: ["Andrews Lesson 10.1-10.5"],
                feedbackRefs: ["src/tests/sentence.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen solo diagnósticas o pendientes de evidencia: generación oracional, realización confirmada de partículas Nawat/Pipil de la Lección 10 y semántica oracional admonitiva/optativa dirigida por Andrews.",
    },
    11: {
        pdfRefs: ["Andrews Lesson 11.1-11.6"],
        directive: "Usa Andrews Lección 11 para dirigir la taxonomía irregular de cláusula verbal: irregularidad de tronco perfectivo, dislocación entre forma de tiempo y significado, paradigmas defectivos, supleción y límites idiomáticos; mantener las superficies Nawat/Pipil sujetas a evidencia.",
        implementationState: "partial",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/irregulars.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-11-irregular-vnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 11.1-11.6 contra naturaleza irregular de cláusula verbal, irregularidad de tronco perfectivo, dislocación forma de tiempo/significado, supleción y límites idiomáticos.",
                andrewsRefs: ["Andrews Lesson 11.1-11.6"],
                expectedFeedbackRefs: ["src/tests/irregulars.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-11-irregular-vnc-audit",
                result: "hit",
                correction: "La Lección 11 ahora lleva referencias de PDF por subsección, directivas en español, taxonomía irregular de tronco perfectivo, metadatos de dislocación forma de tiempo/significado, marcos de supleción, límites idiomáticos y bloqueos explícitos contra generación irregular clásica-a-Nawat no licenciada.",
                andrewsRefs: ["Andrews Lesson 11.1-11.6"],
                feedbackRefs: ["src/tests/irregulars.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "El subconjunto supletivo Nawat actual está implementado, pero siguen solo diagnósticas o pendientes de evidencia: taxonomía irregular completa de tronco perfectivo de Andrews, dislocaciones forma de tiempo/significado, paradigmas defectivos y modismos.",
    },
    12: {
        pdfRefs: ["Andrews Lesson 12.1-12.7"],
        directive: "Usa Andrews Lección 12 para dirigir la arquitectura absolutiva de cláusula nominal: contraste entre cláusula nominal y cláusula verbal, posición de Estado vacante, posiciones de sujeto pers1-pers2 y núm1-núm2, sin posición de tiempo, comportamiento del tronco nominal predicado, animacidad/referencia y límites estado/tronco nominal.",
        implementationState: "partial",
        redirectAction: "reframe-metadata",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-12-absolutive-nnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 12.1-12.7 contra el contraste cláusula nominal/cláusula verbal, posiciones de fórmula de estado absolutivo, posiciones de pronombre sujeto, comportamiento predicativo, animacidad y límites estado/tronco nominal.",
                andrewsRefs: ["Andrews Lesson 12.1-12.7"],
                expectedFeedbackRefs: ["src/tests/nnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-12-absolutive-nnc-audit",
                result: "hit",
                correction: "La Lección 12 ahora lleva referencias de PDF por subsección, directivas en español, metadatos de fórmula absolutiva de cláusula nominal, propiedad del sujeto sobre núm1-núm2, límites predicativos sin tiempo, diagnósticos de animacidad y bloqueos de generación para paradigmas conectores clásicos no licenciados.",
                andrewsRefs: ["Andrews Lesson 12.1-12.7"],
                feedbackRefs: ["src/tests/nnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: posiciones de fórmula de cláusula nominal ordinaria activas, inventario completo de conectores pronominales de sujeto absolutivo de Andrews, comportamiento de tiempo/referencia discursiva, anulaciones metafóricas de animacidad y excepciones de restricción de estado.",
    },
    13: {
        pdfRefs: ["Andrews Lesson 13.1-13.6"],
        directive: "Usa Andrews Lección 13 para dirigir la arquitectura posesiva de cláusula nominal: fórmulas de Estado monádico y diádico, conectores de sujeto de estado posesivo, taxonomía de poseedor monádico ne/te/ta, distribución de categorías de estado uno/estado dos y pronombres específicos de poseedor.",
        implementationState: "partial",
        redirectAction: "reframe-metadata",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-13-possessive-nnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 13.1-13.6 contra fórmulas de cláusula nominal de estado posesivo, comportamiento de conectores de sujeto, posiciones de Estado monádico y diádico e inventarios de pronombres de poseedor.",
                andrewsRefs: ["Andrews Lesson 13.1-13.6"],
                expectedFeedbackRefs: ["src/tests/nnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-13-possessive-nnc-audit",
                result: "hit",
                correction: "La Lección 13 ahora lleva referencias de PDF por subsección, directivas en español, metadatos de fórmula de estado posesivo, propiedad del sujeto sobre núm1-núm2, taxonomía de Estado monádico y diádico, marcos de poseedor específico y bloqueos para paradigmas posesivos clásicos-no-licenciados en Nawat.",
                andrewsRefs: ["Andrews Lesson 13.1-13.6"],
                feedbackRefs: ["src/tests/nnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: prefijos actuales de poseedor específico respaldados por evidencia, inventario completo de conectores de sujeto de estado posesivo de Andrews, generación de poseedor monádico ne/te/ta, alomorfía de estado uno/estado dos, advertencias ortográficas y selección de tronco de la Lección 14.",
    },
    14: {
        pdfRefs: ["Andrews Lesson 14.1-14.8"],
        directive: "Usa Andrews Lección 14 para dirigir la arquitectura de clases de tronco nominal: troncos de uso restringido y general, mapeo de clases t/ti/in/cero, número como rasgo solo del sujeto, derivación de troncos de afinidad y distributivos/varietales, selección de tronco por estado y diagnósticos de análisis constituyente.",
        implementationState: "partial",
        redirectAction: "reframe-metadata",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-14-nounstem-class-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 14.1-14.8 contra clases de tronco de uso, clases de tronco nominal, límites de número, selección de tronco por estado/número y advertencias de análisis constituyente.",
                andrewsRefs: ["Andrews Lesson 14.1-14.8"],
                expectedFeedbackRefs: ["src/tests/nnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-14-nounstem-class-audit",
                result: "hit",
                correction: "La Lección 14 ahora lleva referencias de PDF por subsección, directivas en español, metadatos de tronco de uso y clase de tronco nominal, límites de número/tronco derivado, marcos de selección de tronco por estado y bloqueos para generación no licenciada de clase/subclase.",
                andrewsRefs: ["Andrews Lesson 14.1-14.8"],
                feedbackRefs: ["src/tests/nnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: compatibilidad activa de clase Nawat t/ti/in/cero, pertenencia completa de clase léxica de Andrews, alternancia de tronco de uso restringido/general, derivación de tronco nominal de afinidad/distributivo, alternativas de sujeto plural, subclases posesivas y ambigüedades de análisis constituyente.",
    },
    15: {
        pdfRefs: ["Andrews Lesson 15.1-15.3"],
        directive: "Usa Andrews Lección 15 para dirigir límites adicionales de cláusula nominal: peculiaridades de estado posesivo, casos de estado de posesión natural, poseedor nuclear frente a suplementación y diagnósticos de estructura oracional de cláusula nominal.",
        implementationState: "partial",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-15-further-nnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 15.1-15.3 contra peculiaridades de estado posesivo, troncos nominales poseídos naturalmente y límites de estructura oracional de cláusula nominal.",
                andrewsRefs: ["Andrews Lesson 15.1-15.3"],
                expectedFeedbackRefs: ["src/tests/nnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-15-further-nnc-audit",
                result: "hit",
                correction: "La Lección 15 ahora lleva referencias de PDF por subsección, directivas en español, metadatos de peculiaridad posesiva, límites de evidencia de posesión natural, diagnósticos de estructura oracional de cláusula nominal y bloqueos para casos de estado u oraciones no licenciados.",
                andrewsRefs: ["Andrews Lesson 15.1-15.3"],
                feedbackRefs: ["src/tests/nnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: asimilación de plural posesivo, troncos posesivos supletivos, troncos secundarios te/ta, casos de estado de posesión natural y estructura oracional de cláusula nominal.",
    },
    16: {
        pdfRefs: ["Andrews Lesson 16.1-16.9"],
        directive: "Usa Andrews Lección 16 para dirigir la arquitectura pronominal de cláusula nominal: cláusulas nominales pronominales solo absolutivas, subtipos entitativo y cuantitativo, inventarios personal/interrogativo/demostrativo/indefinido, troncos de matriz cuantitativa, diagnósticos de ortografía fusionada y bloqueos de generación.",
        implementationState: "partial",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-16-pronominal-nnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 16.1-16.9 contra clases pronominales de cláusula nominal, subtipos entitativo y cuantitativo, estado solo absolutivo, advertencias de ortografía fusionada y bloqueos de generación.",
                andrewsRefs: ["Andrews Lesson 16.1-16.9"],
                expectedFeedbackRefs: ["src/tests/nnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-16-pronominal-nnc-audit",
                result: "hit",
                correction: "La Lección 16 ahora lleva referencias de PDF por subsección, directivas en español, metadatos de subtipo pronominal de cláusula nominal, límites solo absolutivos, diagnósticos de ortografía fusionada, marcos de matriz cuantitativa y bloqueos para generación pronominal no licenciada.",
                andrewsRefs: ["Andrews Lesson 16.1-16.9"],
                feedbackRefs: ["src/tests/nnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: ejemplos Nawat/Pipil confirmados de cláusula nominal pronominal, contrato seguro de ruta pronominal, manejo de ortografía fusionada, alomorfía de matriz cuantitativa y comportamiento de suplementación/función adjetival.",
    },
    17: {
        pdfRefs: ["Andrews Lesson 17.1-17.6"],
        directive: "Usa Andrews Lección 17 para dirigir la arquitectura de suplementación: grupos de varios núcleos, núcleos de pronombre personal, roles suplementarios de sujeto/objeto/poseedor, contacto de referente compartido, topicalización, diagnósticos de ambigüedad recursiva y transformaciones de pregunta de información.",
        implementationState: "partial",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: ["src/tests/registry.test.js", "src/tests/sentence.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-17-supplementation-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 17.1-17.6 contra estructura de varios núcleos, roles de suplementación, contacto de referente compartido, topicalización y transformaciones de pregunta de información.",
                andrewsRefs: ["Andrews Lesson 17.1-17.6"],
                expectedFeedbackRefs: ["src/tests/sentence.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-17-supplementation-audit",
                result: "hit",
                correction: "La Lección 17 ahora lleva referencias de PDF por subsección, directivas en español, metadatos de varios núcleos, marcos de rol de suplementación, diagnósticos de referente compartido, límites de topicalización y bloqueos de transformación interrogativa.",
                andrewsRefs: ["Andrews Lesson 17.1-17.6"],
                feedbackRefs: ["src/tests/sentence.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: ejecución de AST de suplementación, ejemplos confirmados de cláusulas Nawat/Pipil, controles de interfaz de tópico/comentario, resolución de ambigüedad recursiva y generación de preguntas de información.",
    },
    18: {
        pdfRefs: ["Andrews Lesson 18.1-18.12"],
        directive: "Usa Andrews Lección 18 para dirigir la segunda parte de la arquitectura de suplementación: movimiento integrado o#, límites de cláusulas nominales pronominales personales cortas, marcación en adjunción, discontinuidad, excepciones de acuerdo, suplementos de pareja nombrada y vínculo masculino, núcleos de objeto silencioso, eliminación de principal, vocativos y orden libre de constituyentes.",
        implementationState: "partial",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/sentence.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-18-supplementation-part-two-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 18.1-18.12 contra suplementos integrados, cláusulas nominales pronominales cortas, suplementación marcada y discontinua, excepciones de acuerdo, suplementos de pareja nombrada/vínculo masculino, núcleos de objeto silencioso, eliminación de principal, vocativos y orden de constituyentes de oración.",
                andrewsRefs: ["Andrews Lesson 18.1-18.12"],
                expectedFeedbackRefs: ["src/tests/sentence.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-18-supplementation-part-two-audit",
                result: "hit",
                correction: "La Lección 18 ahora lleva referencias de PDF por subsección, directivas en español, metadatos de suplemento integrado, límites pronominales cortos, diagnósticos marcados/discontinuos, excepciones de acuerdo y referente, bloqueos de objeto silencioso, límites vocativos y advertencias anti-traducción de orden oracional.",
                andrewsRefs: ["Andrews Lesson 18.1-18.12"],
                feedbackRefs: ["src/tests/sentence.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: AST ejecutables de suplementación, análisis de suplementos marcados y discontinuos, resolución de núcleo de objeto silencioso, comportamiento de superficie/prosodia vocativa, interpretación de orden libre de constituyentes y evidencia confirmada de cláusula Nawat/Pipil.",
    },
    19: {
        pdfRefs: ["Andrews Lesson 19.1-19.6"],
        directive: "Usa Andrews Lección 19 para dirigir la tercera parte de la arquitectura de suplementación: cláusulas verbales como suplementos, suplementación pronominal plural, suplementación de referente incluido, condiciones de traducción infinitiva, reporte de rumor y principales de decir eliminados.",
        implementationState: "partial",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/sentence.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-19-supplementation-part-three-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 19.1-19.6 contra suplementos de cláusula verbal, suplementación pronominal plural, arquitectura de referente incluido, condiciones de traducción infinitiva, reporte de rumor y principales de decir eliminados.",
                andrewsRefs: ["Andrews Lesson 19.1-19.6"],
                expectedFeedbackRefs: ["src/tests/sentence.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-19-supplementation-part-three-audit",
                result: "hit",
                correction: "La Lección 19 ahora lleva referencias de PDF por subsección, directivas en español, roles de suplemento de cláusula verbal, metadatos de suplementación pronominal plural, marcos de referente incluido, grupos semánticos de habla/complemento, bloqueos de reporte de rumor y diagnósticos de decir eliminado.",
                andrewsRefs: ["Andrews Lesson 19.1-19.6"],
                feedbackRefs: ["src/tests/sentence.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: AST ejecutables de suplemento de cláusula verbal y referente incluido, contratos de ruta pronominal plural, análisis de habla directa/indirecta, manejo de reporte de rumor, recuperación de principal de decir eliminado y evidencia confirmada de cláusula Nawat/Pipil.",
    },
    20: {
        pdfRefs: ["Andrews Lesson 20.1-20.8"],
        directive: "Usa Andrews Lección 20 para dirigir la derivación de tronco verbal no activo: selección de fuente activa imperfectiva, familias de sufijos u/lu/wa y combinaciones, realización Nawat u/lu/wa/uwa/luwa/walu, límites de excepción y rutas de Clase A-2.",
        implementationState: "implemented-audited",
        redirectAction: "keep",
        evidenceStatus: "direct-pdf-with-nawat-realization",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/derivation.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-20-nonactive-verbstem-audit",
                type: "metadata-engine-test",
                aim: "Auditar Andrews Lección 20.1-20.8 contra las familias actuales de sufijos no activos Nawat, selección de fuente activa imperfectiva, correspondencias de sufijo, límites de excepción y rutas de Clase A-2.",
                andrewsRefs: ["Andrews Lesson 20.1-20.8"],
                expectedFeedbackRefs: ["src/tests/derivation.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-20-nonactive-verbstem-audit",
                result: "hit",
                correction: "La Lección 20 ahora lleva referencias de PDF por subsección, directivas en español, metadatos de puente para familias de sufijos Nawat, límites de tronco fuente, familias actuales de opción del motor y evidencia de rutas de Clase A-2.",
                andrewsRefs: ["Andrews Lesson 20.1-20.8"],
                feedbackRefs: ["src/tests/derivation.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "none",
    },
    21: {
        pdfRefs: ["Andrews Lesson 21.1-21.4"],
        directive: "Usa Andrews Lección 21 para dirigir la arquitectura de voz pasiva de cláusula verbal: fuente activa con objeto específico, eliminación del sujeto activo, reemplazo por tronco no activo, reasignación de objeto a sujeto, sin agente pasivo expresado, reglas de caso de generación pasiva, límites de modo oracional pasivo y diagnósticos de noción pasiva activa-reflexiva.",
        implementationState: "partial",
        redirectAction: "refactor-engine",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/vnc.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-21-passive-voice-audit",
                type: "metadata-engine-test",
                aim: "Auditar Andrews Lección 21.1-21.4 contra la ruta actual no activa/pasiva, mapeo de objeto a sujeto, casos de generación pasiva, límites de modo oracional y noción pasiva activa-reflexiva.",
                andrewsRefs: ["Andrews Lesson 21.1-21.4"],
                expectedFeedbackRefs: ["src/tests/vnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-21-passive-voice-audit",
                result: "hit",
                correction: "La Lección 21 ahora registra la transformación pasiva de Andrews, el inventario de casos 21.2, soporte actual de anulación de sujeto pasivo Nawat, deriva combinada pasiva/impersonal y brechas explícitas antes de reclamar pase más cercano.",
                andrewsRefs: ["Andrews Lesson 21.1-21.4"],
                feedbackRefs: ["src/tests/vnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: rutas visibles y generadas combinadas pasiva/impersonal, compuertas pasivas de ta/te no específico, rutas de caso pasivo reflexivo y de varios objetos, comportamiento oracional pasivo optativo/admonitivo y diagnósticos de noción pasiva activa-reflexiva.",
    },
    22: {
        pdfRefs: ["Andrews Lesson 22.1-22.6"],
        directive: "Usa Andrews Lección 22 para dirigir la arquitectura impersonal de cláusula verbal: sujetos impersonales inherentes, distinción entre no animado e impersonal, transformación de voz impersonal, generación con la misma fórmula, preservación de objeto no específico, testigo reflexivo ne, límites de modo oracional y troncos derivacionales ta-impersonales.",
        implementationState: "partial",
        redirectAction: "refactor-engine",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/vnc.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-22-impersonal-voice-audit",
                type: "metadata-engine-test",
                aim: "Auditar Andrews Lección 22.1-22.6 contra las rutas actuales de voz pasiva/impersonal, comportamiento de sujeto impersonal, distinción no animada, restricciones de fuente, objetos no específicos preservados, testigo reflexivo ne, modos oracionales y derivación ta-impersonal.",
                andrewsRefs: ["Andrews Lesson 22.1-22.6"],
                expectedFeedbackRefs: ["src/tests/vnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-22-impersonal-voice-audit",
                result: "hit",
                correction: "La Lección 22 ahora registra el contrato de sujeto impersonal de Andrews, distinción no animada, transformación impersonal, reglas de generación 22.4, límite de modo oracional, límite de derivación ta-impersonal, soporte actual del motor y brechas explícitas antes de reclamar pase más cercano.",
                andrewsRefs: ["Andrews Lesson 22.1-22.6"],
                feedbackRefs: ["src/tests/vnc.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: rutas visibles y generadas combinadas pasiva/impersonal, inventario léxico impersonal inherente, interpretación no animada frente a impersonal, compuertas de objeto fuente, preservación te/ta no específica, comportamiento del testigo reflexivo ne, modos oracionales e inventario derivacional ta-impersonal.",
    },
    23: {
        pdfRefs: ["Andrews Lesson 23.1-23.5"],
        directive: "Usa Andrews Lección 23 para dirigir la arquitectura de objetos verbales: clases de objeto directivo, causativo y aplicativo; posiciones múltiples de valencia; niveles de objeto de línea principal y línea desviada; morfemas silenciosos; prioridades de secuencia de objeto; y adaptación ortográfica Nawat para marcadores de objeto.",
        implementationState: "partial",
        redirectAction: "refactor-engine",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/agreement.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-23-verb-objects-audit",
                type: "metadata-engine-test",
                aim: "Auditar Andrews Lección 23.1-23.5 contra las posiciones actuales de objeto, metadatos de función de objeto, posiciones de línea principal/línea desviada, morfemas silenciosos, prioridades de secuencia y puente ortográfico Nawat.",
                andrewsRefs: ["Andrews Lesson 23.1-23.5"],
                expectedFeedbackRefs: ["src/tests/agreement.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-23-verb-objects-audit",
                result: "hit",
                correction: "La Lección 23 ahora registra clases de objeto de Andrews, posiciones múltiples de valencia, límites de fórmula +va, reglas de línea principal/línea desviada, prioridades de secuencia de objeto, soporte actual de posiciones de objeto y brechas explícitas antes de reclamar pase más cercano.",
                andrewsRefs: ["Andrews Lesson 23.1-23.5"],
                feedbackRefs: ["src/tests/agreement.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: ambigüedad de función de objeto, contratos discontinuos de objeto-más-sufijo, historias completas de línea principal/línea desviada, tablas de morfemas silenciosos, las trece combinaciones de objeto de Andrews, inventario del Apéndice C y excepciones Nawat/Pipil.",
    },
    24: {
        pdfRefs: ["Andrews Lesson 24.1-24.9"],
        directive: "Usa Andrews Lección 24 para dirigir la arquitectura causativa de primer tipo: límites de valencia por vocal final, troncos neutrales de valencia, reemplazo/adición de a causativa, formantes de acervo y tronco desacervales, transformación de sujeto fuente a objeto y control de la a causativa sobre el núcleo fuente.",
        implementationState: "partial",
        redirectAction: "refactor-engine",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/derivation.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-24-first-type-causative-audit",
                type: "metadata-engine-test",
                aim: "Auditar Andrews Lección 24.1-24.9 contra la generación causativa actual de primer tipo, límites neutrales de valencia, arquitectura de tronco desacerval, transformaciones de sujeto fuente a objeto y evidencia ortográfica Nawat.",
                andrewsRefs: ["Andrews Lesson 24.1-24.9"],
                expectedFeedbackRefs: ["src/tests/derivation.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-24-first-type-causative-audit",
                result: "hit",
                correction: "La Lección 24 ahora registra límites de vocal final de Andrews, troncos neutrales de valencia, procedimientos de a causativa de primer tipo, arquitectura de acervo desacerval, transformación generativa 24.8, soporte actual del motor y brechas explícitas antes de reclamar pase más cercano.",
                andrewsRefs: ["Andrews Lesson 24.1-24.9"],
                feedbackRefs: ["src/tests/derivation.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: léxico de valencia por vocal final, compuertas de tronco neutral de valencia, selección de reemplazo/adición de primer tipo, inventarios desacervales y pertenencia de clase, transformación de sujeto fuente de cláusula verbal a objeto y análisis compuesto/matriz de a causativa.",
    },
    25: {
        pdfRefs: ["Andrews Lesson 25.1-25.16"],
        directive: "Usa Andrews Lección 25 para dirigir la arquitectura causativa de segundo tipo: familias fuente tia, lia y wia; pertenencia a Clase C; compactación de cláusula verbal fuente; transformaciones causativas de uno, dos y tres objetos; ambigüedad; causativos pasivos/impersonales; modos oracionales; y suplementación de objetos silenciosos.",
        implementationState: "partial",
        redirectAction: "refactor-engine",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/derivation.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-25-second-type-causative-audit",
                type: "metadata-engine-test",
                aim: "Auditar Andrews Lección 25.1-25.16 contra la generación causativa actual de segundo tipo, selección de familia fuente, transformaciones de uno/dos/tres objetos, ambigüedad, voces, modos oracionales y suplementación de objeto silencioso.",
                andrewsRefs: ["Andrews Lesson 25.1-25.16"],
                expectedFeedbackRefs: ["src/tests/derivation.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-25-second-type-causative-audit",
                result: "hit",
                correction: "La Lección 25 ahora registra familias fuente causativas de segundo tipo de Andrews, límites tia/lia/wia, política de Clase C, reglas de transformación de cláusula verbal fuente, comportamiento de profundidad de objeto, ambigüedad, límites de voz y oración, soporte actual del motor y brechas explícitas antes de reclamar pase más cercano.",
                andrewsRefs: ["Andrews Lesson 25.1-25.16"],
                feedbackRefs: ["src/tests/derivation.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: inventarios de familias fuente de segundo tipo, fuentes no activas inesperadas, casos supletivos y solo honoríficos, transformaciones de cláusula verbal fuente de uno/dos/tres objetos, objetos silenciosos de línea desviada, ambigüedad causativa, causativos pasivos/impersonales, modos oracionales y suplementación de objeto silencioso.",
    },
    26: {
        pdfRefs: ["Andrews Lesson 26.1-26.23"],
        directive: "Usa Andrews Lección 26 para dirigir la arquitectura aplicativa: roles de objeto aplicativo; familias fuente ia, lia, wia y tia rara; pertenencia a Clase C; transformaciones de cláusula verbal fuente; cláusulas verbales aplicativas de uno, dos y tres objetos; ambigüedad; aplicativos pasivos/impersonales; modos oracionales; interpretación alternativa de objeto; cláusulas verbales engañosas; y la unidad discontinua objeto-más-sufijo.",
        implementationState: "partial",
        redirectAction: "refactor-engine",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/derivation.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-26-applicative-audit",
                type: "metadata-engine-test",
                aim: "Auditar Andrews Lección 26.1-26.23 contra la generación aplicativa actual, selección de forma fuente, transformaciones de uno/dos/tres objetos, ambigüedad, voces, modos oracionales y control de unidad objeto-más-sufijo.",
                andrewsRefs: ["Andrews Lesson 26.1-26.23"],
                expectedFeedbackRefs: ["src/tests/derivation.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-26-applicative-audit",
                result: "hit",
                correction: "La Lección 26 ahora registra familias fuente aplicativas de Andrews, límites ia/lia/wia/tia, política de Clase C, reglas de transformación de cláusula verbal fuente, comportamiento de profundidad de objeto, ambigüedad, límites de voz y oración, soporte actual del motor y brechas explícitas antes de reclamar pase más cercano.",
                andrewsRefs: ["Andrews Lesson 26.1-26.23"],
                feedbackRefs: ["src/tests/derivation.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: inventarios fuente aplicativos ia/lia/wia/tia, troncos irregulares y neutrales de valencia, excepciones de forma fuente, troncos paralelos de primer/segundo tipo, transformaciones de cláusula verbal fuente de uno/dos/tres objetos, objetos silenciosos de línea desviada, cobertura del Apéndice C, ambigüedad aplicativa, aplicativos pasivos/impersonales, modos oracionales, interpretación alternativa de objeto, cláusulas verbales engañosas y análisis de unidad objeto-más-sufijo.",
    },
    27: {
        pdfRefs: ["Andrews Lesson 27.1-27.6"],
        directive: "Usa Andrews Lección 27 para dirigir la arquitectura frecuentativa: formas ordinarias de prefijo reduplicativo, reduplicación de pronombre objeto, frecuentativos desacervales, formaciones frecuentativas inciertas, frecuentativos no activos y separación estricta de ayudantes genéricos de reduplicación hasta que evidencia Nawat/Pipil autorice salida.",
        implementationState: "partial",
        redirectAction: "block-generation",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/frequentative.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-27-frequentative-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 27.1-27.6 contra los metadatos actuales de límite frecuentativo, ayudantes genéricos de reduplicación, reduplicación de pronombre objeto, frecuentativos desacervales, formaciones inciertas y frecuentativos no activos.",
                andrewsRefs: ["Andrews Lesson 27.1-27.6"],
                expectedFeedbackRefs: ["src/tests/frequentative.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-27-frequentative-audit",
                result: "hit",
                correction: "La Lección 27 ahora registra categorías frecuentativas ordinarias, de pronombre objeto, desacervales, inciertas y no activas de Andrews, manteniendo la generación bloqueada y los ayudantes genéricos actuales de reduplicación marcados como no evidencia.",
                andrewsRefs: ["Andrews Lesson 27.1-27.6"],
                feedbackRefs: ["src/tests/frequentative.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: ejemplos frecuentativos Nawat/Pipil confirmados, selección ordinaria de forma de prefijo, reduplicación de pronombre objeto, generación frecuentativa desacerval, derivación frecuentativa incierta, generación frecuentativa no activa, ambigüedad causativa/aplicativa y validación contra falsos positivos de reduplicación genérica.",
    },
    28: {
        pdfRefs: ["Andrews Lesson 28.1-28.12"],
        directive: "Usa Andrews Lección 28 para dirigir la arquitectura de troncos verbales compuestos con incrustación verbal: fórmulas de composición, orden matriz-después-de-incrustación, cohesión enlazada frente a integrada, morfología conectiva -t, inventarios limitados de matriz, formaciones especiales pasivas/impersonales, posesión acompañante, compuestos con matriz reflexiva, compuestos con objeto compartido, compuestos con incrustación futura y recursión.",
        implementationState: "partial",
        redirectAction: "refactor-engine",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/parsing.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-28-verbal-embed-compound-audit",
                type: "metadata-parser-test",
                aim: "Auditar Andrews Lección 28.1-28.12 contra los metadatos actuales de análisis de compuestos, orden matriz/incrustación, límites enlazados/integrados, patrones conectivos -t, matrices intransitivas/reflexivas/de objeto compartido, comportamiento de incrustación futura y recursión.",
                andrewsRefs: ["Andrews Lesson 28.1-28.12"],
                expectedFeedbackRefs: ["src/tests/parsing.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-28-verbal-embed-compound-audit",
                result: "hit",
                correction: "La Lección 28 ahora registra las fórmulas compuestas de Andrews, arquitectura de matriz/incrustación, cohesión, requisitos conectivos -t, marcos intransitivos/reflexivos/de objeto compartido/de incrustación futura, formaciones especiales, posesión acompañante y recursión, dejando bloqueada la generación ampliada.",
                andrewsRefs: ["Andrews Lesson 28.1-28.12"],
                feedbackRefs: ["src/tests/parsing.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: metadatos actuales de análisis de compuestos y marcos de compuesto sin generación de incrustación de pretérito con conectivo -t, inventarios limitados de matrices intransitivas, formaciones especiales ye/yaj/kak/itz, rutas de compuesto pasivo/impersonal, suplementación de posesión acompañante, compuestos de matriz reflexiva intransitivizada, compuestos de objeto compartido, compuestos de incrustación futura, recursión y ejemplos Nawat/Pipil confirmados.",
    },
    29: {
        pdfRefs: ["Andrews Lesson 29.1-29.7"],
        directive: "Usa Andrews Lección 29 para dirigir la arquitectura de cláusulas verbales purposivas: compuestos enlazados sin conectivo con incrustación futura, morfemas direccionales internos de salida t y entrada k, morfemas silenciosos de incrustación futura, paradigmas de tiempo/modo salientes y entrantes, incrustaciones no activas pasivas e impersonales, incrustaciones con tronco compuesto y alternativas direccionales externas wal/on.",
        implementationState: "partial",
        redirectAction: "block-generation",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/purposive.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-29-purposive-vnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 29.1-29.7 contra los metadatos actuales de límite purposivo/direccional, morfemas direccionales internos del tronco, paradigmas salientes/entrantes, incrustaciones pasivas/impersonales, incrustaciones con tronco compuesto y alternativas direccionales externas wal/on.",
                andrewsRefs: ["Andrews Lesson 29.1-29.7"],
                expectedFeedbackRefs: ["src/tests/purposive.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-29-purposive-vnc-audit",
                result: "hit",
                correction: "La Lección 29 ahora registra la arquitectura de troncos verbales purposivos de Andrews, paradigmas salientes y entrantes, incrustaciones no activas y con tronco compuesto, alternativas direccionales externas y separación frente a prefijos direccionales ordinarios, compuestos progresivos con conectivo -t y terminaciones admonitivas, manteniendo la generación bloqueada.",
                andrewsRefs: ["Andrews Lesson 29.1-29.7"],
                feedbackRefs: ["src/tests/purposive.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: ejemplos Nawat/Pipil purposivos confirmados, generación finita saliente/entrante, comportamiento de morfema futuro silencioso, distinciones de longitud vocálica y saltillo, comportamiento opcional o#, plural irregular n, desambiguación purposiva/progresiva/admonitiva, incrustaciones no activas pasivas/impersonales, incrustaciones con tronco compuesto, alternativas direccionales externas wal/on, lecturas de propósito cumplido y movimiento metafórico.",
    },
    30: {
        pdfRefs: ["Andrews Lesson 30.1-30.18"],
        directive: "Usa Andrews Lección 30 para dirigir troncos verbales compuestos con incrustación nominal: arquitectura integrada de cláusula nominal + cláusula verbal, selección de tronco nominal de uso general, reducción de valencia por objeto incorporado, roles adverbiales incorporados, transformaciones de suplemento a adverbial, complementos incorporados, reduplicación, rutas no activas y advertencias de que la incrustación no es agente ni sujeto.",
        implementationState: "partial",
        redirectAction: "refactor-engine",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/parsing.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-30-nominal-embed-compound-audit",
                type: "metadata-parser-test",
                aim: "Auditar Andrews Lección 30.1-30.18 contra los metadatos actuales de incrustación léxica del análisis de compuestos, clasificaciones fijas de cláusula nominal, categorías de objeto/adverbial/complemento incorporado, transformaciones de suplemento, reduplicación, rutas no activas y advertencias contra traducción directa.",
                andrewsRefs: ["Andrews Lesson 30.1-30.18"],
                expectedFeedbackRefs: ["src/tests/parsing.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-30-nominal-embed-compound-audit",
                result: "hit",
                correction: "La Lección 30 ahora registra la arquitectura integrada de cláusula nominal + cláusula verbal de Andrews, reducción de valencia por objeto incorporado, roles adverbiales incorporados y transformaciones de suplemento, comportamiento de complemento incorporado, reduplicación, rutas de voz no activa y advertencias de que la incrustación no es agente ni sujeto, dejando bloqueada la generación ampliada.",
                andrewsRefs: ["Andrews Lesson 30.1-30.18"],
                feedbackRefs: ["src/tests/parsing.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: selección de tronco nominal de uso general, excepciones de subclase, reducción de valencia por objeto incorporado, análisis excepcional de fusión ta, transformaciones de suplemento a adverbial, complementos incorporados, reduplicación de incrustación y matriz, rutas pasivas/impersonales, incrustaciones únicas, modismos y ejemplos Nawat/Pipil confirmados.",
    },
    31: {
        pdfRefs: ["Andrews Lesson 31.1-31.13"],
        directive: "Usa Andrews Lección 31 para dirigir la arquitectura de troncos nominales compuestos: control de fórmula cláusula nominal + cláusula nominal = cláusula nominal, estructuras enlazadas e integradas, orden incrustación-antes-de-matriz, clase de tronco nominal gobernada por matriz, roles semánticos de incrustación, orientación de poseedor, importancia de matriz, comportamiento de clase de incrustación, rellenadores únicos, compuestos conjuntivos, rellenadores recursivos, formaciones de sexo/progenie/compañerismo, troncos de afinidad y troncos distributivos/varietales.",
        implementationState: "partial",
        redirectAction: "block-generation",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc_compound.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-31-compound-nounstem-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 31.1-31.13 contra los metadatos actuales de límite compuesto/afectivo de cláusula nominal, control de fórmula cláusula nominal + cláusula nominal, orden matriz/incrustación, orientación de poseedor, rellenadores únicos, compuestos conjuntivos y recursivos, formaciones de sexo/progenie/compañerismo, troncos de afinidad y troncos distributivos/varietales.",
                andrewsRefs: ["Andrews Lesson 31.1-31.13"],
                expectedFeedbackRefs: ["src/tests/nnc_compound.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-31-compound-nounstem-audit",
                result: "hit",
                correction: "La Lección 31 ahora registra la arquitectura de troncos nominales compuestos de Andrews, gobierno de matriz/incrustación, orientación de poseedor, comportamiento de clase de incrustación, rellenadores únicos, estructuras conjuntivas y recursivas, formaciones semánticas especiales, troncos de afinidad y troncos distributivos/varietales, manteniendo la generación bloqueada.",
                andrewsRefs: ["Andrews Lesson 31.1-31.13"],
                feedbackRefs: ["src/tests/nnc_compound.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: generación de troncos nominales compuestos, análisis compuesto específico de cláusula nominal, segmentación enlazada/sin conectivo/integrada, orientación de poseedor, alomorfía de clase de incrustación, rellenadores únicos, clases de matriz ka/yu, compuestos conjuntivos, compuestos recursivos, patrones de sexo/progenie/compañerismo, troncos de afinidad, troncos distributivos/varietales y ejemplos Nawat/Pipil confirmados.",
    },
    32: {
        pdfRefs: ["Andrews Lesson 32.1-32.8"],
        directive: "Usa Andrews Lección 32 para dirigir la arquitectura afectiva de cláusulas nominales: actitud valorativa/despectiva en troncos nominales compuestos afectivos o cláusulas nominales de sujeto defectuoso, comportamiento de clase de tronco nominal con matriz afectiva para pil, pol, tzin, ton y zol, troncos afectivos con forma de afinidad, ambigüedad pil niño/noble, comportamiento de número afectivo no animado y silenciamiento de número uno en sujeto defectuoso.",
        implementationState: "partial",
        redirectAction: "block-generation",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc_compound.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-32-affective-nnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 32.1-32.8 contra los metadatos actuales de límite compuesto/afectivo de cláusula nominal, clases de tronco nominal con matriz afectiva, afectivos con forma de afinidad, ambigüedad pil niño/noble, comportamiento de número afectivo no animado y cláusulas nominales de sujeto defectuoso.",
                andrewsRefs: ["Andrews Lesson 32.1-32.8"],
                expectedFeedbackRefs: ["src/tests/nnc_compound.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-32-affective-nnc-audit",
                result: "hit",
                correction: "La Lección 32 ahora registra la arquitectura afectiva de cláusulas nominales de Andrews, comportamiento de clase con matriz afectiva, troncos afectivos con forma de afinidad, ambigüedad pil niño/noble, comportamiento de número no animado y cláusulas nominales de sujeto defectuoso, manteniendo la generación bloqueada.",
                andrewsRefs: ["Andrews Lesson 32.1-32.8"],
                feedbackRefs: ["src/tests/nnc_compound.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: generación afectiva de cláusula nominal, rutas de clase con matriz afectiva para pil/pol/tzin/ton/zol, cambios lexicalizados de clase, variantes vocativas, afectivos con forma de afinidad, ambigüedad pil niño/noble, comportamiento de concordancia de número no animado, silenciamiento de número uno en sujeto defectuoso, inventarios de troncos defectivos y ejemplos afectivos Nawat/Pipil confirmados.",
    },
    33: {
        pdfRefs: ["Andrews Lesson 33.1-33.10"],
        directive: "Usa Andrews Lección 33 para dirigir la arquitectura honorífica y peyorativa de cláusulas verbales: transformaciones reflexivas honoríficas causativas/aplicativas, ambigüedad de objeto proyectivo, cláusulas verbales fuente causativas/aplicativas, compuestos de línea principal con incrustación de pretérito de fuente reflexiva con tzin-u-a, duplicación reverencial, compuestos peyorativos con incrustación de pretérito con pul-u-a y blanco de transformación honorífica/peyorativa en tronco verbal compuesto.",
        implementationState: "partial",
        redirectAction: "block-generation",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/honorific_pejorative.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-33-honorific-pejorative-vnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 33.1-33.10 contra los metadatos actuales de límite honorífico/peyorativo, rutas reflexivas causativas/aplicativas, ambigüedad de objeto proyectivo, incrustaciones de pretérito con fuente reflexiva, duplicación reverencial, compuestos peyorativos pul-u-a y transformaciones de tronco verbal compuesto.",
                andrewsRefs: ["Andrews Lesson 33.1-33.10"],
                expectedFeedbackRefs: ["src/tests/honorific_pejorative.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-33-honorific-pejorative-vnc-audit",
                result: "hit",
                correction: "La Lección 33 ahora registra la arquitectura honorífica y peyorativa de cláusulas verbales de Andrews, rutas honoríficas reflexivas causativas/aplicativas, ambigüedad de objeto proyectivo, incrustaciones de pretérito con fuente reflexiva, duplicación reverencial, compuestos peyorativos pul-u-a y límites de transformación de tronco verbal compuesto, manteniendo la generación bloqueada.",
                andrewsRefs: ["Andrews Lesson 33.1-33.10"],
                feedbackRefs: ["src/tests/honorific_pejorative.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: generación honorífica, generación peyorativa, generación reverencial, selección de ruta reflexiva causativa/aplicativa, ambigüedad de entidad honrada como objeto proyectivo, rutas de incrustación de pretérito tzin-u-a, rutas de incrustación de pretérito pul-u-a, blanco de transformación de tronco verbal compuesto y ejemplos honoríficos o peyorativos Nawat/Pipil confirmados.",
    },
    34: {
        pdfRefs: ["Andrews Lesson 34.1-34.16"],
        directive: "Usa Andrews Lección 34 para dirigir arquitectura de cláusulas nominales de numerales cardinales: órdenes vigesimales, fórmula cardinal de estado absolutivo, conteos ordinarios frente a conteos gruesos, troncos numerales básicos, matrices compuestas de orden alto, cláusulas numerales conjuntadas, conjuntos clasificadores, reduplicación, modificadores aproximativos/de más y cláusulas nominales de medida.",
        implementationState: "partial",
        redirectAction: "block-generation",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc_numerals.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-34-cardinal-numeral-nnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 34.1-34.16 contra los metadatos actuales de límite de numerales en cláusula nominal, orden vigesimal, fórmula cardinal de estado absolutivo, conteos simples/gruesos, conjuntos básicos y clasificadores, numerales conjuntados, reduplicación, aproximación y medidas.",
                andrewsRefs: ["Andrews Lesson 34.1-34.16"],
                expectedFeedbackRefs: ["src/tests/nnc_numerals.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-34-cardinal-numeral-nnc-audit",
                result: "hit",
                correction: "La Lección 34 ahora registra la arquitectura de cláusulas nominales de numerales cardinales de Andrews, órdenes vigesimales, límite de fórmula de estado absolutivo, conteos simples y gruesos, troncos básicos, compuestos de orden alto, numerales conjuntados, conjuntos clasificadores, reduplicación, aproximación y medidas, manteniendo la generación bloqueada.",
                andrewsRefs: ["Andrews Lesson 34.1-34.16"],
                feedbackRefs: ["src/tests/nnc_numerals.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: generación de numerales cardinales, troncos numerales básicos, rutas de conteo grueso, formaciones excepcionales de conteo grueso en estado posesivo, matrices compuestas de orden alto, estructuras numerales conjuntadas, conjuntos clasificadores, reduplicación, modificadores aproximativos/de más, cláusulas nominales de medida y ejemplos Nawat/Pipil confirmados.",
    },
    35: {
        pdfRefs: ["Andrews Lesson 35.1-35.12"],
        directive: "Usa Andrews Lección 35 para dirigir la arquitectura de nominalización agentiva de pretérito: conversión estructural de cláusula nuclear verbal a cláusula nuclear nominal, troncos agentivos de pretérito de uso restringido y general, estados absolutivo y posesivo, alternancias de posición de número, incrustaciones compuestas, formaciones de anciana/anciano, matrices de posesión y posesión abundante, límites de traducción y roles de objeto/adverbial incrustados desde cláusula verbal.",
        implementationState: "partial",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc_nominalization.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-35-preterit-agentive-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 35.1-35.12 contra los metadatos actuales de límite de nominalización, troncos agentivos de pretérito de uso restringido/general, estado posesivo, incrustaciones compuestas, formaciones de persona anciana, posesión, posesión abundante y continuaciones de incrustación/adverbial desde cláusula verbal.",
                andrewsRefs: ["Andrews Lesson 35.1-35.12"],
                expectedFeedbackRefs: ["src/tests/nnc_nominalization.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-35-preterit-agentive-audit",
                result: "hit",
                correction: "La Lección 35 ahora registra la arquitectura de nominalización agentiva de pretérito de Andrews, troncos de uso restringido y general, alternancias de posición de número, comportamiento de estado posesivo, incrustaciones compuestas, formaciones de persona anciana, matrices de posesión y posesión abundante, límites de traducción y roles de incrustación/adverbial desde cláusula verbal, preservando las compuertas de evidencia.",
                andrewsRefs: ["Andrews Lesson 35.1-35.12"],
                feedbackRefs: ["src/tests/nnc_nominalization.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: generación agentiva de pretérito completa, alternancias de posición de número, selección de tronco de afinidad, híbridos activados de objeto proyectivo, límites léxicos de persona anciana, absolutivos raros con matriz que, selección completa de subclases de posesión e/wa/yua, matrices adverbiales centradas en objeto, excepciones reflexivas lexicalizadas y ejemplos Nawat/Pipil confirmados.",
    },
    36: {
        pdfRefs: ["Andrews Lesson 36.1-36.12"],
        directive: "Usa Andrews Lección 36 para dirigir la arquitectura de cláusulas verbales nominalizadas más allá de la Lección 35: reanálisis agentivo de presente habitual y nominalización plena, patientivos de presente habitual, instrumentivos, cláusulas nominales agentivas de presente y futuro, cláusulas nominales de acción pasiva y activa, troncos de acción de uso restringido/general y contrastes entre acción activa y agentivo de pretérito.",
        implementationState: "partial",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc_nominalization.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-36-nominalized-vnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 36.1-36.12 contra los metadatos actuales de límite de nominalización, reanálisis/nominalización plena agentiva de presente habitual, patientivos de presente habitual, instrumentivos, agentivos de presente/futuro, cláusulas nominales de acción, acción pasiva, acción activa y contrastes entre acción activa y agentivo de pretérito.",
                andrewsRefs: ["Andrews Lesson 36.1-36.12"],
                expectedFeedbackRefs: ["src/tests/nnc_nominalization.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-36-nominalized-vnc-audit",
                result: "hit",
                correction: "La Lección 36 ahora registra la arquitectura de cláusulas verbales nominalizadas de Andrews para reanálisis y nominalización plena agentiva de presente habitual, patientivos de presente habitual, instrumentivos, agentivos de presente y futuro, cláusulas nominales de acción, fuentes de acción pasiva y activa y límites contrastivos, preservando las compuertas de evidencia actuales.",
                andrewsRefs: ["Andrews Lesson 36.1-36.12"],
                feedbackRefs: ["src/tests/nnc_nominalization.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: paradigmas agentivos completos de presente habitual, enrutamiento de reanálisis frente a nominalización plena, reanálisis posesivo raro, híbridos de objeto activado, variantes pasivas patientivas de presente habitual, excepciones de fuente de estado instrumentivo, incrustaciones lexicalizadas de agentivo futuro, alternancias de acción pasiva y activa de uso restringido/general, sentidos de acción lexicalizados y ejemplos Nawat/Pipil confirmados.",
    },
    37: {
        pdfRefs: ["Andrews Lesson 37.1-37.9"],
        directive: "Usa Andrews Lección 37 para dirigir la arquitectura de troncos nominales deverbales: derivación desde núcleo verbal frente a reanálisis de nominalización, acción activa z/liz, valores de traducción de liz, valores de paciente potencial, nombres de acción impersonal, incrustaciones compuestas, contraste acción activa/pasiva, usos de suplemento de varios núcleos, familias de fuente patientiva y compuertas de fuente patientiva pasiva.",
        implementationState: "partial",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc_nominalization.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-37-deverbal-nounstem-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 37.1-37.9 contra los metadatos actuales de límite de nominalización, generación de acción activa z/liz, límites de traducción, valores de paciente potencial y acción impersonal, contrastes de acción activa/pasiva, suplementos de varios núcleos, familias de fuente patientiva y compuertas de fuente patientiva pasiva.",
                andrewsRefs: ["Andrews Lesson 37.1-37.9"],
                expectedFeedbackRefs: ["src/tests/nnc_nominalization.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-37-deverbal-nounstem-audit",
                result: "hit",
                correction: "La Lección 37 ahora registra la arquitectura de troncos nominales deverbales de Andrews, acción activa z/liz, valores de traducción de liz, particularidades de paciente potencial y acción impersonal, contraste de rol de poseedor en acción activa/pasiva, uso de suplemento de varios núcleos, familias de fuente patientiva y compuertas de fuente patientiva pasiva, preservando los límites actuales de evidencia.",
                andrewsRefs: ["Andrews Lesson 37.1-37.9"],
                feedbackRefs: ["src/tests/nnc_nominalization.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: generación completa de acción activa z/liz, enrutamiento de paciente potencial, enrutamiento de acción impersonal, incrustaciones compuestas, sintaxis de suplemento de varios núcleos, compuertas de fuente patientiva pasiva, eliminación de sufijo no activo, advertencias de fuente pasiva irregular, asimilación tzin y ejemplos Nawat/Pipil confirmados.",
    },
    38: {
        pdfRefs: ["Andrews Lesson 38.1-38.2"],
        directive: "Usa Andrews Lección 38 para dirigir la arquitectura de tronco nominal patientivo impersonal: fuente de núcleo verbal impersonal, familias de fuente intransitiva, ne reflexivo de línea desviada, tla proyectivo no humano, enrutamiento pasivo impersonalizado humano te-a-tla, contraste humano/no humano, traslape de traducción con nombres de acción activa y límites de patientivo compuesto.",
        implementationState: "partial",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc_nominalization.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-38-impersonal-patientive-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 38.1-38.2 contra los metadatos actuales de familias patientivas, enrutamiento de núcleo fuente patientivo impersonal, familias de fuente intransitiva, ne reflexivo de línea desviada, tla proyectivo no humano, enrutamiento pasivo impersonalizado humano te-a-tla, contraste humano/no humano, traslape de traducción y límites de tronco nominal patientivo compuesto.",
                andrewsRefs: ["Andrews Lesson 38.1-38.2"],
                expectedFeedbackRefs: ["src/tests/nnc_nominalization.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-38-impersonal-patientive-audit",
                result: "hit",
                correction: "La Lección 38 ahora registra la arquitectura patientiva impersonal de Andrews, familias de fuente intransitiva, comportamiento reflexivo de línea desviada, enrutamiento proyectivo no humano, enrutamiento pasivo impersonalizado humano te-a-tla, contraste humano/no humano, traslape de traducción con nombres de acción activa y límites de patientivo compuesto, preservando las compuertas de evidencia.",
                andrewsRefs: ["Andrews Lesson 38.1-38.2"],
                feedbackRefs: ["src/tests/nnc_nominalization.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: generación patientiva impersonal completa, selección de fuente intransitiva raíz-más-ya, detalles de fuente lo/o/o-hua/hua/hua-lo, acortamiento vocálico, reemplazo de a final, contraste humano/no humano, patientivos te anómalos, desambiguación de homónimos, comportamiento de fuente y matriz de patientivo compuesto y ejemplos Nawat/Pipil confirmados.",
    },
    39: {
        pdfRefs: ["Andrews Lesson 39.1-39.9"],
        directive: "Usa Andrews Lección 39 para dirigir operaciones patientivas más allá de fuentes pasivas e impersonales: patientivos perfectivos e imperfectivos, patientivos de propiedad característica con matriz yo, patientivos de raíz/acervo, derivación patientiva múltiple, troncos nominales patientivos como incrustaciones compuestas, complementos incorporados, objetos incorporados e incrustaciones de propiedad característica.",
        implementationState: "partial",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc_nominalization.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-39-patientive-operations-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 39.1-39.9 contra los metadatos actuales de familias patientivas, compuertas de fuente patientiva perfectiva e imperfectiva, comportamiento de matriz yo de propiedad característica, contratos patientivos de raíz/acervo, metadatos de derivación múltiple, incrustaciones compuestas, complementos incorporados, objetos incorporados y continuaciones de incrustación de propiedad característica.",
                andrewsRefs: ["Andrews Lesson 39.1-39.9"],
                expectedFeedbackRefs: ["src/tests/nnc_nominalization.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-39-patientive-operations-audit",
                result: "hit",
                correction: "La Lección 39 ahora registra operaciones patientivas de Andrews para comportamiento perfectivo, imperfectivo, de propiedad característica, raíz/acervo, derivación múltiple, incrustación compuesta, complemento incorporado, objeto incorporado e incrustación de propiedad característica, preservando las compuertas de evidencia actuales.",
                andrewsRefs: ["Andrews Lesson 39.1-39.9"],
                feedbackRefs: ["src/tests/nnc_nominalization.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: generación patientiva perfectiva completa, generación patientiva imperfectiva, enrutamiento de matriz yo de propiedad característica, contrastes de posesión orgánica, elección de variante raíz/acervo, selección de salida de derivación múltiple, matrices de incrustación compuesta, matrices de complemento incorporado, matrices de objeto incorporado, omisión de incrustación de propiedad característica, manejo de violación de valencia, restricciones idiomáticas y ejemplos Nawat/Pipil confirmados.",
    },
    40: {
        pdfRefs: ["Andrews Lesson 40.1-40.12"],
        directive: "Usa Andrews Lección 40 para dirigir la arquitectura de función adjetival nominal: adjetivo como función sintáctica, cláusulas nominales adjetivales excepcionales, traducción predicativa nominal/verbal, troncos nominales derivados, predicados verbales nominalizados, predicados agentivos habituales y patientivos, comportamiento de clase agentiva de pretérito, pretérito obsoleto raíz-más-ya, pares y tríos sinónimos y oraciones predicado-adjetivo.",
        implementationState: "partial",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc_adjectival.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-40-adjectival-nnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 40.1-40.12 contra los metadatos actuales de función adjetival nominal, cláusulas nominales adjetivales excepcionales, traducción predicativa nominal/verbal, adjetivos de tronco nominal derivado, rutas adjetivales de cláusula verbal nominalizada, clases agentivas de pretérito, pretérito obsoleto raíz-más-ya, conjuntos sinónimos y límites de oración predicado-adjetivo.",
                andrewsRefs: ["Andrews Lesson 40.1-40.12"],
                expectedFeedbackRefs: ["src/tests/nnc_adjectival.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-40-adjectival-nnc-audit",
                result: "hit",
                correction: "La Lección 40 ahora registra la arquitectura de función adjetival nominal de Andrews en límites ordinarios, excepcionales, nominales/verbales, de tronco nominal derivado, de cláusula verbal nominalizada, agentivos de pretérito, pretérito obsoleto, conjuntos sinónimos y oraciones predicado-adjetivo, preservando las compuertas de evidencia actuales.",
                andrewsRefs: ["Andrews Lesson 40.1-40.12"],
                feedbackRefs: ["src/tests/nnc_adjectival.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: cláusulas nominales adjetivales excepcionales, cobertura completa de función adjetival nominal/verbal, conjuntos sinónimos de fuente, sintaxis de oración predicado-adjetivo, comportamiento AST de modificación, comportamiento adjetival agentivo de pretérito específico por clase, excepciones raíz-más-ya y ejemplos Nawat/Pipil confirmados.",
    },
    41: {
        pdfRefs: ["Andrews Lesson 41.1-41.4"],
        directive: "Usa Andrews Lección 41 para dirigir la arquitectura de intensificación adjetival nominal y fuente compuesta: troncos intensificados por reduplicación, matrices pah/cal/tzon/afectivas, intensificación por metáfora y símil, troncos verbales compuestos con incrustaciones nominales, troncos verbales denominales desde troncos nominales compuestos y troncos nominales adjetivales incrustados en cláusulas nominales de tronco compuesto.",
        implementationState: "partial",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc_adjectival.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-41-adjectival-nnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 41.1-41.4 contra la salida adjetival intensificada actual, rutas adjetivales de tronco verbal compuesto con incrustación nominal, rutas denominales de tronco nominal compuesto y límites de incrustación de tronco nominal adjetival.",
                andrewsRefs: ["Andrews Lesson 41.1-41.4"],
                expectedFeedbackRefs: ["src/tests/nnc_adjectival.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-41-adjectival-nnc-audit",
                result: "hit",
                correction: "La Lección 41 ahora registra familias adjetivales nominales intensificadas de Andrews, subtipos de fuente de tronco verbal compuesto con incrustación nominal, fuentes denominales de tronco nominal compuesto y troncos nominales adjetivales como incrustaciones compuestas, preservando las compuertas actuales de generación y evidencia.",
                andrewsRefs: ["Andrews Lesson 41.1-41.4"],
                feedbackRefs: ["src/tests/nnc_adjectival.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: familias de troncos intensificados, intensificación de matrices pah/cal/tzon/afectivas, intensificación por metáfora o símil, intensificadores sintácticos, subtipos completos de fuente de tronco verbal compuesto, desambiguación de fuente patientiva de objeto incorporado, troncos nominales adjetivales incrustados en cláusulas nominales de tronco compuesto, sintaxis modificador/núcleo y ejemplos Nawat/Pipil confirmados.",
    },
    42: {
        pdfRefs: ["Andrews Lesson 42.1-42.10"],
        directive: "Usa Andrews Lección 42 para dirigir la arquitectura de modificación adjetival de varios núcleos: relaciones de cláusula modificador/núcleo, anteposición, unidades adjuntas y principales, ambigüedad de suplementación, comportamiento de núcleo compuesto, inventario de tipos de cláusula modificadora, recursión y estructuras incorporadas modificador-núcleo.",
        implementationState: "partial",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: ["src/tests/registry.test.js", "src/tests/modification.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-42-adjectival-modification-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 42.1-42.10 contra los metadatos actuales de límite de modificación adjetival, composición AST, orden modificador/núcleo, comportamiento de unidad adjunta/principal, ambigüedad de suplementación, inventario de tipos de cláusula modificadora, recursión y estructuras de modificación incorporada.",
                andrewsRefs: ["Andrews Lesson 42.1-42.10"],
                expectedFeedbackRefs: ["src/tests/modification.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-42-adjectival-modification-audit",
                result: "hit",
                correction: "La Lección 42 ahora registra la arquitectura de modificación adjetival de Andrews en modificación de varios núcleos, anteposición, unidades adjuntas/principales, ambigüedad de suplementación, comportamiento de núcleo compuesto, tipos de cláusula modificadora, recursión y estructuras de modificación incorporada, manteniendo bloqueada la generación.",
                andrewsRefs: ["Andrews Lesson 42.1-42.10"],
                feedbackRefs: ["src/tests/modification.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: sintaxis de modificación de varios núcleos, patrones de orden modificador/núcleo, resolución de ambigüedad de suplementación, selección de matriz en núcleo compuesto, ambigüedad de modificador verbal transitivo, comportamiento de núcleo pronominal/cuantitativo/numeral, comportamiento de núcleo nominal de medida, recursión, estructuras de modificación incorporada, detección de analizador/búsqueda, ejemplos de cláusula con respaldo estático y evidencia Nawat/Pipil confirmada.",
    },
    43: {
        pdfRefs: ["Andrews Lesson 43.1-43.9"],
        directive: "Usa Andrews Lección 43 para dirigir la segunda parte de la arquitectura de modificación adjetival: peculiaridades del modificador no antepuesto, cooperación entre antepuesto y no antepuesto, discontinuidad, núcleos pronominales interrogativos, núcleos oc ce, violaciones idiomáticas de referente compartido, expresiones uno-de/ninguno-de, modificadores de vínculo masculino y modificadores de pareja nombrada.",
        implementationState: "partial",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: ["src/tests/registry.test.js", "src/tests/modification.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-43-adjectival-modification-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 43.1-43.9 contra los metadatos actuales de límite de modificación adjetival, comportamiento de modificador no antepuesto, cooperación antepuesta/no antepuesta, discontinuidad, núcleos interrogativos, núcleos oc ce, violaciones de referente compartido, construcciones uno-de/ninguno-de, modificadores de vínculo masculino y modificadores de pareja nombrada.",
                andrewsRefs: ["Andrews Lesson 43.1-43.9"],
                expectedFeedbackRefs: ["src/tests/modification.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-43-adjectival-modification-audit",
                result: "hit",
                correction: "La Lección 43 ahora registra la segunda parte de la arquitectura de modificación adjetival de Andrews para modificadores no antepuestos, cooperación con el mismo núcleo, discontinuidad, núcleos interrogativos, oc ce, violaciones idiomáticas de referente compartido, expresiones uno-de/ninguno-de, modificadores de vínculo masculino y modificadores de pareja nombrada, manteniendo bloqueada la generación.",
                andrewsRefs: ["Andrews Lesson 43.1-43.9"],
                feedbackRefs: ["src/tests/modification.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o diagnósticos: análisis de modificador no antepuesto, resolución de elemento suplementario distante, cooperación antepuesta/no antepuesta con el mismo núcleo, discontinuidad con núcleos topicalizados o modificadores desplazados, ambigüedad de núcleo interrogativo ac/tleh y advertencias internas de unidad, núcleos oc ce, violaciones de referente compartido, modismos uno-de/ninguno-de, modificadores de vínculo masculino, modificadores de pareja nombrada, detección de analizador/búsqueda, ejemplos de cláusula con respaldo estático y evidencia Nawat/Pipil confirmada.",
    },
    44: {
        pdfRefs: ["Andrews Lesson 44.1-44.9"],
        directive: "Usa Andrews Lección 44 para dirigir la arquitectura de cláusulas nucleares adverbiales: pronombres de sujeto adverbializados, adverbialización de primer y segundo grado, cláusulas nucleares verbales y nominales adverbializadas, cláusulas nominales que parecen partículas, otros adverbiales de estado absolutivo, adverbiales agentivos de pretérito, adverbiales de estado posesivo y modificadores adverbiales incorporados.",
        implementationState: "partial",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/adverbial.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-44-adverbial-nuclear-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 44.1-44.9 contra los metadatos actuales de límite de cláusula nuclear adverbial, marcos de salida de adverbio configurado, grados de adverbialización, inventarios de cláusulas nucleares adverbializadas, cláusulas nominales que parecen partículas, adverbiales agentivos de pretérito, adverbiales de estado posesivo y modificadores adverbiales incorporados.",
                andrewsRefs: ["Andrews Lesson 44.1-44.9"],
                expectedFeedbackRefs: ["src/tests/adverbial.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-44-adverbial-nuclear-audit",
                result: "hit",
                correction: "La Lección 44 ahora registra la arquitectura de cláusulas nucleares adverbiales de Andrews: pronombres de sujeto adverbializados, restricciones de grado, cláusulas nucleares adverbializadas, cláusulas nominales que parecen partículas, adverbiales de estado absolutivo y posesivo, adverbiales agentivos de pretérito y modificadores adverbiales incorporados, manteniendo bloqueada la expansión de generación.",
                andrewsRefs: ["Andrews Lesson 44.1-44.9"],
                feedbackRefs: ["src/tests/adverbial.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: generación completa de cláusulas nucleares adverbiales, adverbiales nominales absolutivos de segundo grado, evidencia estática de cláusulas nominales que parecen partículas, otros adverbiales de estado absolutivo, adverbiales agentivos de pretérito, adverbiales de estado posesivo, modificadores adverbiales incorporados, detección de analizador/búsqueda, datos estáticos adverbiales, acciones visibles de interfaz y ejemplos Nawat/Pipil confirmados.",
    },
    45: {
        pdfRefs: ["Andrews Lesson 45.1-45.4"],
        directive: "Usa Andrews Lección 45 para dirigir la primera parte de la arquitectura de cláusulas nominales relacionales: sin preposiciones ni posposiciones, troncos nominales relacionales como troncos nominales, significados relacionales de alta generalidad, cuatro opciones de uso relacional, cinco agrupaciones de opciones, troncos solo de opción uno, límites de poseedor suplementario y comportamiento de ic como medio/propósito/razón/tiempo/uso especial.",
        implementationState: "partial",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc_relational.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-45-relational-nnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 45.1-45.4 contra los metadatos actuales de límite relacional nominal, encuadre sin preposición, opciones de uso de tronco nominal relacional, agrupaciones de opciones, troncos solo de opción uno, límites de poseedor suplementario, funciones de ic y bloqueos de espejismo por traducción.",
                andrewsRefs: ["Andrews Lesson 45.1-45.4"],
                expectedFeedbackRefs: ["src/tests/nnc_relational.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-45-relational-nnc-audit",
                result: "hit",
                correction: "La Lección 45 ahora registra la arquitectura nominal relacional de Andrews: advertencias sin preposición, cuatro opciones de uso, cinco agrupaciones de opciones, troncos solo de opción uno, límites de poseedor suplementario y comportamiento de ic como medio/propósito/razón/tiempo/uso especial, manteniendo bloqueada la generación.",
                andrewsRefs: ["Andrews Lesson 45.1-45.4"],
                feedbackRefs: ["src/tests/nnc_relational.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: generación relacional nominal, datos estáticos relacionales, resolución de roles contextuales de alta generalidad, troncos relacionales afectivos, incrustaciones compuestas de opción cuatro, inventarios de troncos solo de opción uno, análisis de poseedor suplementario, usos especiales de ic, detección de analizador/búsqueda, acciones visibles de interfaz y ejemplos Nawat/Pipil confirmados.",
    },
    46: {
        pdfRefs: ["Andrews Lesson 46.1-46.15"],
        directive: "Usa Andrews Lección 46 para dirigir la segunda parte de la arquitectura de cláusulas nominales relacionales: troncos matriz solo de opción dos, locativos con n, incrustaciones ca+n, correspondencias de estado fuente imperfectivo y perfectivo, troncos locativos/direccionales/frecuenciales, advertencias de co/c de parte corporal, inferencia contextual de oración y bloqueo continuo de superficies Nawat/Pipil sin evidencia.",
        implementationState: "partial",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc_relational.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-46-relational-nnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 46.1-46.15 contra los metadatos actuales de límite relacional nominal, troncos matriz solo de opción dos, locativos con n, incrustaciones ca+n, correspondencias de fuente imperfectiva/perfectiva, troncos locativos/direccionales/frecuenciales, advertencias de matriz de parte corporal y restricciones contextuales de uso oracional.",
                andrewsRefs: ["Andrews Lesson 46.1-46.15"],
                expectedFeedbackRefs: ["src/tests/nnc_relational.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-46-relational-nnc-audit",
                result: "hit",
                correction: "La Lección 46 ahora registra la segunda parte de la arquitectura nominal relacional de Andrews: once troncos matriz solo de opción dos, formaciones locativas con n, incrustaciones ca+n, reglas de estado fuente imperfectivo/perfectivo, advertencias co/c de parte corporal, separación de pa direccional/frecuencial e inferencia por contexto oracional, manteniendo bloqueada la generación.",
                andrewsRefs: ["Andrews Lesson 46.1-46.15"],
                feedbackRefs: ["src/tests/nnc_relational.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: generación relacional nominal, datos estáticos relacionales solo de matriz, confirmación ortográfica Nawat/Pipil, verificación ortográfica visible por posición, análisis de poseedor/objeto suplementario, comportamiento interrogativo can/canin, lexicalización co/c de parte corporal, desambiguación de homónimo pa, enrutamiento de adverbio incorporado, detección de analizador/búsqueda, acciones visibles de interfaz y ejemplos Nawat/Pipil confirmados.",
    },
    47: {
        pdfRefs: ["Andrews Lesson 47.1-47.5"],
        directive: "Usa Andrews Lección 47 para dirigir la tercera parte de la arquitectura de cláusulas nominales relacionales: grupos relacionales de opción uno/dos, opción uno/tres y opción uno/dos/tres; cláusulas nominales de entidad asociada; reemplazo silencioso de co/c; cláusulas nominales de pertinencia; y bloqueo de superficies Nawat/Pipil guiadas por traducción o sin evidencia.",
        implementationState: "partial",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc_relational.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-47-relational-nnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 47.1-47.5 contra los metadatos actuales de límite relacional nominal, grupos de troncos de opción uno/dos, opción uno/tres y opción uno/dos/tres, cláusulas nominales de entidad asociada, cláusulas nominales de pertinencia y bloqueos de complejidad por traducción.",
                andrewsRefs: ["Andrews Lesson 47.1-47.5"],
                expectedFeedbackRefs: ["src/tests/nnc_relational.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-47-relational-nnc-audit",
                result: "hit",
                correction: "La Lección 47 ahora registra la tercera parte de la arquitectura nominal relacional de Andrews: troncos de opción uno/dos, opción uno/tres y opción uno/dos/tres, formación de entidad asociada, reemplazo silencioso co/c y formación de pertinencia, manteniendo bloqueada la generación.",
                andrewsRefs: ["Andrews Lesson 47.1-47.5"],
                feedbackRefs: ["src/tests/nnc_relational.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: generación relacional nominal, datos estáticos relacionales, confirmación ortográfica Nawat/Pipil, verificación ortográfica visible por posición, análisis de poseedor suplementario, incrustación pa/copa, compuestos relacionales con t conectiva, distinciones de compuestos de parte corporal, contraste entidad asociada frente a gentilicio, enrutamiento de pertinencia, detección de analizador/búsqueda, acciones visibles de interfaz y ejemplos Nawat/Pipil confirmados.",
    },
    48: {
        pdfRefs: ["Andrews Lesson 48.1-48.13"],
        directive: "Usa Andrews Lección 48 para dirigir la arquitectura de nombres de lugar y gentilicios nominales: referencia única de nombre de lugar adverbializado, siete grupos de nombres de lugar, cuatro rutas de formación gentilicia, ambigüedad ortográfica, incorporación, uso gentilicio adjetival, colectividad, extensiones de profesión/título y bloqueo de superficies Nawat/Pipil guiadas por traducción o sin evidencia.",
        implementationState: "partial",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc_place_gentilic.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-48-place-gentilic-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 48.1-48.13 contra los metadatos actuales de límite de nombres de lugar/gentilicios nominales, unicidad de nombre de lugar, siete grupos de nombres de lugar, cuatro rutas de formación gentilicia, incorporación, uso adjetival, colectividad, extensiones de profesión/título y bloqueos de traducción/evidencia.",
                andrewsRefs: ["Andrews Lesson 48.1-48.13"],
                expectedFeedbackRefs: ["src/tests/nnc_place_gentilic.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-48-place-gentilic-audit",
                result: "hit",
                correction: "La Lección 48 ahora registra la arquitectura de nombres de lugar y gentilicios de Andrews: referencia social única, siete grupos de nombres de lugar, cuatro rutas de formación gentilicia, ambigüedad ortográfica, incorporación, uso adjetival, colectividad y extensiones de profesión/título, manteniendo bloqueada la generación.",
                andrewsRefs: ["Andrews Lesson 48.1-48.13"],
                feedbackRefs: ["src/tests/nnc_place_gentilic.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: generación de nombres de lugar, generación gentilicia, datos estáticos de lugar, datos estáticos de gentilicio, confirmación ortográfica Nawat/Pipil, verificación ortográfica visible por posición, resolución de referencia única, análisis de grupos de nombres de lugar, enrutamiento de derivación gentilicia, ambigüedad de ortografía tradicional, incorporación, colectividad, extensión de profesión/título, detección de analizador/búsqueda, acciones visibles de interfaz y ejemplos Nawat/Pipil confirmados.",
    },
    49: {
        pdfRefs: ["Andrews Lesson 49.1-49.10"],
        directive: "Usa Andrews Lección 49 para dirigir la primera parte de la arquitectura de modificación adverbial: orden simple modificador/núcleo, estructuras de varios núcleos, puntos recursivos en modificador, núcleo o ambos, alcance interrogativo e intensificador, colocaciones lexicalizadas partícula-adverbial, aposición de lugar/tiempo, cláusulas principales adverbializadas y bloqueo continuo de superficies Nawat/Pipil sin evidencia.",
        implementationState: "partial",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: ["src/tests/registry.test.js", "src/tests/adjunction.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-49-adverbial-adjunction-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 49.1-49.10 contra los metadatos actuales de límite de adjunción adverbial, comportamiento AST de superficie provista, modificación simple y de varios núcleos, puntos recursivos, alcance interrogativo/intensificador, colocaciones, aposición y comportamiento de cláusula principal adverbial.",
                andrewsRefs: ["Andrews Lesson 49.1-49.10"],
                expectedFeedbackRefs: ["src/tests/adjunction.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-49-adverbial-adjunction-audit",
                result: "hit",
                correction: "La Lección 49 ahora registra la primera parte de la arquitectura de modificación adverbial de Andrews: orden modificador/núcleo, estructuras de varios núcleos, puntos recursivos en núcleo, modificador o ambos, alcance interrogativo e intensificador, colocaciones partícula-adverbial, aposición y cláusulas principales adverbializadas, manteniendo bloqueada la generación.",
                andrewsRefs: ["Andrews Lesson 49.1-49.10"],
                feedbackRefs: ["src/tests/adjunction.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: datos estáticos de adjunción adverbial, detección recursiva de analizador/búsqueda, resolución de varios núcleos, ambigüedad de manera comparada, análisis de cláusula principal interrogativa, enrutamiento de intensificador, inventario de colocaciones partícula-adverbial lexicalizadas, ejemplos estáticos de aposición lugar/tiempo, verificación ortográfica visible por posición si los ejemplos se vuelven visibles, acciones visibles de interfaz y ejemplos Nawat/Pipil confirmados.",
    },
    50: {
        pdfRefs: ["Andrews Lesson 50.1-50.11"],
        directive: "Usa Andrews Lección 50 para dirigir la segunda parte de la arquitectura de modificación adverbial: unidades de cláusula adjunta no adverbializadas, diez tipos de significado, límites de tiempo/lugar/manera/consideración/propósito/condición/concesión/consecuencia/proviso/razón, alcance de partículas y colocaciones, y bloqueo de superficies Nawat/Pipil guiadas por traducción o sin evidencia.",
        implementationState: "partial",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: ["src/tests/registry.test.js", "src/tests/adjunction.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-50-adverbial-adjunction-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 50.1-50.11 contra los metadatos actuales de límite de adjunción adverbial, comportamiento AST de superficie provista, unidades de cláusula adjunta no adverbializadas, diez tipos de significado, partículas de propósito/condición/concesión y comportamiento de ca como introductor de cláusula principal de razón.",
                andrewsRefs: ["Andrews Lesson 50.1-50.11"],
                expectedFeedbackRefs: ["src/tests/adjunction.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-50-adverbial-adjunction-audit",
                result: "hit",
                correction: "La Lección 50 ahora registra la segunda parte de la arquitectura de modificación adverbial de Andrews: unidades de cláusula adjunta no adverbializadas y relaciones de tiempo, lugar, manera, consideración, propósito, condición, concesión, consecuencia, proviso y razón, manteniendo bloqueada la generación.",
                andrewsRefs: ["Andrews Lesson 50.1-50.11"],
                feedbackRefs: ["src/tests/adjunction.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: datos estáticos de adjunción adverbial, detección de analizador/búsqueda, análisis de ejemplos estáticos de tiempo/lugar/manera, consideración frente a suplementación de referente incluido, ambigüedad entre propósito y conjunción, análisis de condición abierta e hipotética, inventario de colocaciones de concesión, detección de consecuencia/proviso/razón, verificación ortográfica visible por posición si los ejemplos se vuelven visibles, acciones visibles de interfaz y ejemplos Nawat/Pipil confirmados.",
    },
    51: {
        pdfRefs: ["Andrews Lesson 51.1-51.4"],
        directive: "Usa Andrews Lección 51 para dirigir la arquitectura de complementación: estructuras de complemento de doble núcleo, complementos de objeto, complementos de sujeto, complementos adverbiales, enlaces pronominales compartidos, transformaciones pasivas de complemento de objeto, complementos relacionales lexicalizados y bloqueo continuo de superficies Nawat/Pipil sin evidencia.",
        implementationState: "partial",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: ["src/tests/registry.test.js", "src/tests/complement.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-51-complement-clause-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 51.1-51.4 contra los metadatos actuales de límite de complemento, comportamiento AST de superficie provista, estructura de doble núcleo, categorías de complemento de objeto/sujeto/adverbial, enlaces pronominales compartidos, transformaciones pasivas y complementos adverbiales relacionales lexicalizados.",
                andrewsRefs: ["Andrews Lesson 51.1-51.4"],
                expectedFeedbackRefs: ["src/tests/complement.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-51-complement-clause-audit",
                result: "hit",
                correction: "La Lección 51 ahora registra la arquitectura de complementación de Andrews: estructura de complemento de doble núcleo, categorías de complemento de objeto, categorías de complemento de sujeto, familias de troncos de complemento adverbial, transformaciones pasivas de complemento de objeto y comportamiento de complementos relacionales lexicalizados, manteniendo bloqueada la generación.",
                andrewsRefs: ["Andrews Lesson 51.1-51.4"],
                feedbackRefs: ["src/tests/complement.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: datos estáticos de complemento, detección de complemento por analizador/búsqueda, inventarios de troncos verbales de complemento de objeto, análisis de estado de complemento de sujeto, enrutamiento de familias de troncos de complemento adverbial, vocabulario relacional lexicalizado, detección de transformación pasiva, verificación ortográfica visible por posición si los ejemplos se vuelven visibles, acciones visibles de interfaz y ejemplos Nawat/Pipil confirmados.",
    },
    52: {
        pdfRefs: ["Andrews Lesson 52.1-52.7"],
        directive: "Usa Andrews Lección 52 para dirigir la arquitectura de conjunción: concatenación equilibrada sin núcleo, miembros coordinados del mismo rango, conjunción no marcada y marcada, modificadores adverbiales que no son conjuncores, emparejamiento correlativo, innovación léxica por cláusulas nominales coordinadas, estructura paralela reformulativa/progresiva/combinada y bloqueo continuo de superficies Nawat/Pipil sin evidencia.",
        implementationState: "partial",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: ["src/tests/registry.test.js", "src/tests/conjunction.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-52-conjunction-clause-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 52.1-52.7 contra los metadatos actuales de límite de conjunción, comportamiento AST de superficie provista, conjunción equilibrada sin núcleo, conjunción no marcada y marcada, modificadores adverbiales cercanos a la conjunción, conjunción correlativa, innovación léxica y estructura paralela.",
                andrewsRefs: ["Andrews Lesson 52.1-52.7"],
                expectedFeedbackRefs: ["src/tests/conjunction.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-52-conjunction-clause-audit",
                result: "hit",
                correction: "La Lección 52 ahora registra la arquitectura de conjunción de Andrews: conjunción equilibrada sin núcleo, relaciones no marcadas aditivas/alternativas/adversativas, estructura marcada con auh, modificadores adverbiales que no son conjuncores, emparejamiento correlativo, innovación léxica por cláusulas nominales coordinadas y estructura paralela reformulativa/progresiva/combinada, manteniendo bloqueada la generación.",
                andrewsRefs: ["Andrews Lesson 52.1-52.7"],
                feedbackRefs: ["src/tests/conjunction.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: datos estáticos de conjunción, detección de conjunción por analizador/búsqueda, inferencia de relación no marcada, decisiones auh/ortografía, detección de modificador adverbial frente a conjunctor, emparejamiento correlativo, clasificación de biclausalismo/triclausalismo, análisis de estructura paralela, verificación ortográfica visible por posición si los ejemplos se vuelven visibles, acciones visibles de interfaz y ejemplos Nawat/Pipil confirmados.",
    },
    53: {
        pdfRefs: ["Andrews Lesson 53.1-53.7"],
        directive: "Usa Andrews Lección 53 para dirigir la arquitectura de semejanza y comparación: siete rutas de semejanza, comparación de igualdad frente a diferencia, igualdad, igualdad de tamaño, grado comparativo, preguntas de cuánto más, grado superlativo y bloqueo continuo de deriva hacia salida adjetival o superficies Nawat/Pipil sin evidencia.",
        implementationState: "partial",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: ["src/tests/registry.test.js", "src/tests/comparison.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-53-comparison-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 53.1-53.7 contra los metadatos actuales de límite de comparación, rutas de semejanza, comparación de igualdad, comparación de tamaño, grado comparativo, preguntas de cuánto más y grado superlativo, bloqueando la deriva hacia salida adjetival.",
                andrewsRefs: ["Andrews Lesson 53.1-53.7"],
                expectedFeedbackRefs: ["src/tests/comparison.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-53-comparison-audit",
                result: "hit",
                correction: "La Lección 53 ahora registra la arquitectura de semejanza/comparación de Andrews: siete rutas de semejanza, comparación de igualdad frente a diferencia, igualdad, comparación de tamaño, grado comparativo, preguntas de cuánto más y grado superlativo, manteniendo bloqueada la generación.",
                andrewsRefs: ["Andrews Lesson 53.1-53.7"],
                feedbackRefs: ["src/tests/comparison.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: AST de comparación, datos estáticos de comparación, detección de analizador/búsqueda, clasificación de rutas de semejanza, análisis de iuhqui/ihuan/tloc/tlapanahuia, detección de igualdad y comparación de tamaño, integración de conjunción comparativa, enrutamiento de superlativo, verificación ortográfica visible por posición si los ejemplos se vuelven visibles, acciones visibles de interfaz y ejemplos Nawat/Pipil confirmados.",
    },
    54: {
        pdfRefs: ["Andrews Lesson 54.1-54.6"],
        directive: "Usa Andrews Lección 54 para dirigir la primera parte de la arquitectura de troncos verbales denominales: formación de tronco nominal a tronco verbal, ti/hui/ya/a/hua incoativos/estativos, ti con poseedor incluido, ti posesivo, límites de ti-lia, ti-a y t-ia, con evidencia Nawat/Pipil controlando las superficies.",
        implementationState: "partial",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "orthography-bridge-plus-nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/state.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-54-denominal-verbstem-audit",
                type: "metadata-engine-test",
                aim: "Auditar Andrews Lección 54.1-54.6 contra el inventario actual de contratos denominales, contratos de regla ejecutable, compuertas de evidencia de fuente, puente ortográfico y bloqueos de generación finita.",
                andrewsRefs: ["Andrews Lesson 54.1-54.6"],
                expectedFeedbackRefs: ["src/tests/state.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-54-denominal-verbstem-audit",
                result: "hit",
                correction: "La Lección 54 ahora registra la primera parte de la arquitectura de troncos verbales denominales de Andrews: sufijos incoativos/estativos, ti con poseedor incluido, ti posesivo, ti-lia, ti-a y t-ia, manteniendo visibles las compuertas de evidencia de fuente y realización Nawat/Pipil.",
                andrewsRefs: ["Andrews Lesson 54.1-54.6"],
                feedbackRefs: ["src/tests/state.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: clasificación completa de fuentes léxicas de la Lección 54, análisis de estado de fuente, semántica de ti posesivo, ti-a de dos objetos en estado posesivo, inventarios limitados de a/hua, ejemplos estáticos Nawat/Pipil, acciones visibles de interfaz y superficies Nawat/Pipil confirmadas.",
    },
    55: {
        pdfRefs: ["Andrews Lesson 55.1-55.7"],
        directive: "Usa Andrews Lección 55 para dirigir la segunda parte de la arquitectura de troncos verbales denominales: tia temporal, tla causativo e intransitivo, o-a intransitivo con contrapartes huia, huia adverbial, o-a/huia de compuesto relacional, i-hui/a-hui hacia o-a e i-a transitivo, con evidencia Nawat/Pipil controlando las superficies.",
        implementationState: "partial",
        redirectAction: "needs-nawat-evidence",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "orthography-bridge-plus-nawat-evidence-required",
        validationRefs: ["src/tests/registry.test.js", "src/tests/state.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-55-denominal-verbstem-audit",
                type: "metadata-engine-test",
                aim: "Auditar Andrews Lección 55.1-55.7 contra el inventario actual de contratos denominales, contratos de regla ejecutable, compuertas de evidencia de fuente, puente ortográfico, soporte actual de rutas i-hui/a-hui y bloqueos de generación finita.",
                andrewsRefs: ["Andrews Lesson 55.1-55.7"],
                expectedFeedbackRefs: ["src/tests/state.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-55-denominal-verbstem-audit",
                result: "hit",
                correction: "La Lección 55 ahora registra la segunda parte de la arquitectura de troncos verbales denominales de Andrews: tia temporal, tla causativo e intransitivo, o-a y huia intransitivos, huia adverbial, o-a/huia de compuesto relacional, i-hui/a-hui hacia o-a e i-a transitivo, manteniendo visibles las compuertas de evidencia de fuente y realización Nawat/Pipil.",
                andrewsRefs: ["Andrews Lesson 55.1-55.7"],
                feedbackRefs: ["src/tests/state.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: clasificación completa de fuentes léxicas de la Lección 55, análisis de compuestos temporales, inventarios de tla causativo frente a tla intransitivo, sentidos léxicos de o-a/huia, detección de fuentes adverbiales y relacionales, ejemplos estáticos Nawat/Pipil, acciones visibles de interfaz y superficies Nawat/Pipil confirmadas.",
    },
    56: {
        pdfRefs: ["Andrews Lesson 56.1-56.5"],
        directive: "Usa Andrews Lección 56 para dirigir la arquitectura de cláusulas nominales de nombre personal: predicados de enunciado degradados de dos niveles, separación de sujeto interno/externo, fuentes de cláusula única, fuentes de adjunción, fuentes de conjunción, uso oracional y no generación hasta que exista evidencia Nawat/Pipil confirmada de nombres personales.",
        implementationState: "partial",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: ["src/tests/registry.test.js", "src/tests/nnc_names.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-56-personal-name-nnc-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 56.1-56.5 contra los metadatos actuales de límites de nombres personales, clasificadores de falsos positivos, preguntas estructurales y compuertas de no generación.",
                andrewsRefs: ["Andrews Lesson 56.1-56.5"],
                expectedFeedbackRefs: ["src/tests/nnc_names.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-56-personal-name-nnc-audit",
                result: "hit",
                correction: "La Lección 56 ahora registra la arquitectura de dos niveles de nombres personales de Andrews en límites de cláusula única, adjunción, conjunción, uso oracional, título, vocativo, degradación de nombre divino e incrustación de topónimo, manteniendo bloqueada la generación.",
                andrewsRefs: ["Andrews Lesson 56.1-56.5"],
                feedbackRefs: ["src/tests/nnc_names.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: análisis completo de fuentes de nombre personal de la Lección 56, ejemplos Nawat/Pipil confirmados de nombres personales, datos estáticos de nombres/calendario, AST de uso oracional, diagnósticos vocativos, rutas de degradación de nombre divino, rutas de incrustación de topónimo, detección de analizador/búsqueda, acciones visibles de interfaz y verificación ortográfica visible por posición.",
    },
    57: {
        pdfRefs: ["Andrews Lesson 57.1-57.7"],
        directive: "Usa Andrews Lección 57 para dirigir los diagnósticos de miscelánea parte uno: uso no sistémico de tiempo, valencia irregular, tópico absoluto, desacuerdo entre suplemento y núcleo, suplementos de cláusula nominal adverbial, morfos pers1 silenciosos y límites de l formadora de tronco nominal antes de tratar cualquier comportamiento textual como implementado.",
        implementationState: "partial",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: ["src/tests/registry.test.js", "src/tests/analysis.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-57-analysis-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 57.1-57.7 contra los metadatos actuales de límites de análisis textual, clasificadores de falsos positivos, preguntas estructurales y compuertas de no generación.",
                andrewsRefs: ["Andrews Lesson 57.1-57.7"],
                expectedFeedbackRefs: ["src/tests/analysis.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-57-analysis-audit",
                result: "hit",
                correction: "La Lección 57 ahora registra diagnósticos de miscelánea parte uno de Andrews sobre desajuste tiempo/tiempo verbal, valencia excepcional, tópico absoluto, desacuerdo, suplementos de cláusula nominal adverbial, morfos pers1 silenciosos y límites de l formadora de tronco nominal, manteniendo bloqueada la generación.",
                andrewsRefs: ["Andrews Lesson 57.1-57.7"],
                feedbackRefs: ["src/tests/analysis.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: ejemplos textuales completos de la Lección 57, comportamiento del analizador con contexto oracional, detección de atracción temporal, léxico de irregularidad de valencia, AST de tópico absoluto, rastreo de referente suplemento/núcleo, detección de suplemento de cláusula nominal adverbial, diagnósticos de pers1 silenciosa, datos léxicos de l formadora de tronco nominal, acciones visibles de interfaz y verificación ortográfica visible por posición.",
    },
    58: {
        pdfRefs: ["Andrews Lesson 58.1-58.8"],
        directive: "Usa Andrews Lección 58 para dirigir los diagnósticos de miscelánea parte dos: troncos nominales instrumentales az, formaciones problemáticas de tronco, expresiones exclamativas, construcciones mah, advertencias de sujeto con nombre incorporado y problemas textuales antes de tratar cualquier comportamiento de análisis como implementado.",
        implementationState: "partial",
        redirectAction: "diagnostic-only",
        evidenceStatus: "direct-pdf-partial",
        orthographyStatus: "not-surface-bearing",
        validationRefs: ["src/tests/registry.test.js", "src/tests/analysis.test.js", "docs/GRAMMAR_SPEC.md"],
        plannedArrows: [
            {
                id: "lesson-58-analysis-audit",
                type: "metadata-diagnostic-test",
                aim: "Auditar Andrews Lección 58.1-58.8 contra los metadatos actuales de límites de análisis textual, clasificadores de falsos positivos, preguntas estructurales y compuertas de no generación.",
                andrewsRefs: ["Andrews Lesson 58.1-58.8"],
                expectedFeedbackRefs: ["src/tests/analysis.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        firedArrows: [
            {
                id: "lesson-58-analysis-audit",
                result: "hit",
                correction: "La Lección 58 ahora registra diagnósticos de miscelánea parte dos de Andrews sobre troncos nominales instrumentales az, formaciones problemáticas, exclamaciones, variantes de construcción mah, advertencias de sujeto con nombre incorporado y problemas textuales, manteniendo bloqueada la generación.",
                andrewsRefs: ["Andrews Lesson 58.1-58.8"],
                feedbackRefs: ["src/tests/analysis.test.js", "docs/GRAMMAR_SPEC.md"],
            },
        ],
        remainingGap: "Siguen parciales o pendientes de evidencia: ejemplos textuales completos de la Lección 58, datos léxicos de troncos nominales instrumentales, análisis de construcciones problemáticas, clasificación de exclamaciones, AST de construcciones mah, diagnósticos de sujeto con nombre incorporado, flujo de corrección de problemas textuales, comportamiento de analizador/búsqueda, acciones visibles de interfaz y verificación ortográfica visible por posición.",
    },
});

function getAndrewsTrajectoryGroup(lessonId) {
    return ANDREWS_TRAJECTORY_GROUPS.find((group) => lessonId >= group.range[0] && lessonId <= group.range[1]);
}

function getAndrewsTrajectoryImplementationState(lesson) {
    if (lesson.status === "implemented") {
        return "implemented-audited";
    }
    if (lesson.status === "partially-implemented") {
        return "partial";
    }
    if (lesson.status === "not-mapped") {
        return "unmapped";
    }
    return "placeholder";
}

function getAndrewsTrajectoryRedirectAction(lesson) {
    if (lesson.status === "implemented") {
        return "keep";
    }
    if (lesson.status === "not-mapped" || lesson.status === "placeholder") {
        return "block-generation";
    }
    if (/Diagnostic|diagnostic|no confirmed|not modeled|not yet mapped/.test(lesson.notes || "")) {
        return "diagnostic-only";
    }
    return "needs-nawat-evidence";
}

function getAndrewsTrajectoryEvidenceStatus(lesson) {
    if (lesson.status === "implemented") {
        return "direct-pdf-audited";
    }
    if (lesson.status === "partially-implemented") {
        return "direct-pdf-partial";
    }
    return "pdf-index-placeholder";
}

function getAndrewsTrajectoryOrthographyStatus(lesson) {
    if (lesson.id === 2) {
        return "orthography-bridge-required";
    }
    if (lesson.status === "not-mapped" || /no generation|metadata|Diagnostic|syntax|AST|sentence|boundary/.test(lesson.notes || "")) {
        return "not-surface-bearing";
    }
    return "nawat-evidence-required";
}

function getAndrewsPlanPursuitAimStatus(lesson) {
    if (lesson.status === "implemented") {
        return "closest-pass";
    }
    if (lesson.status === "partially-implemented") {
        return "shooting";
    }
    if (lesson.status === "not-mapped") {
        return "blocked";
    }
    return "queued";
}

function buildAndrewsPlannedArrows(lesson, trajectory) {
    return [
        {
            id: `lesson-${lesson.id}-andrews-aim`,
            type: "grammar-trajectory",
            aim: trajectory.directive,
            andrewsRefs: trajectory.pdfRefs,
            expectedFeedbackRefs: trajectory.validationRefs,
        },
    ];
}

function buildAndrewsFiredArrows(lesson, trajectory) {
    if (lesson.status === "not-mapped" || lesson.status === "placeholder") {
        return [];
    }
    return [
        {
            id: `lesson-${lesson.id}-current-alignment`,
            result: "hit",
            correction: lesson.status === "implemented"
                ? "La implementación actual se conserva como el pase más cercano dirigido por Andrews para este paso de lección."
                : "La implementación parcial actual se conserva como un tiro limitado dirigido por Andrews con brechas expuestas.",
            andrewsRefs: trajectory.pdfRefs,
            feedbackRefs: trajectory.validationRefs,
        },
    ];
}

function getAndrewsLessonSourceGatedRouteSpec(lessonId) {
    if (lessonId === 1) {
        return {
            routeFamily: "foundation-metadata-route",
            routeKind: "grammar-concept-route",
            sourceUnit: "grammar term or notation source",
            targetUnit: "grammar concept frame",
            sourceFormulaType: "TEXT/TERM",
            targetFormulaType: "CONCEPT_FRAME",
            formulaTemplate: "CONCEPT_TOKEN -> GRAMMAR_CONCEPT_FRAME(CN/CNV/CNN/STEM/SLOT/AFFIX)",
            operation: "source-term-to-andrews-grammar-concept-frame",
            requirementIds: ["grammar-term-source", "notation-token-source"],
        };
    }
    if (lessonId === 2) {
        return {
            routeFamily: "foundation-metadata-route",
            routeKind: "orthography-bridge-route",
            sourceUnit: "Andrews grammar-rule spelling",
            targetUnit: "Nawat/Pipil spelling profile",
            sourceFormulaType: "CLASSICAL_LETTERS",
            targetFormulaType: "NAWAT_LETTERS",
            formulaTemplate: "ANDREWS_SPELLING(SLOT/POSITION) -> NAWAT_ORTHOGRAPHY_FRAME",
            operation: "slot-sensitive-classical-to-nawat-orthography-bridge",
            requirementIds: ["source-spelling", "grammar-slot-source", "syllable-position-source"],
        };
    }
    if (lessonId === 3) {
        return {
            routeFamily: "foundation-metadata-route",
            routeKind: "particle-boundary-route",
            sourceUnit: "particle candidate source",
            targetUnit: "particle boundary frame",
            sourceFormulaType: "PARTICLE_CANDIDATE",
            targetFormulaType: "PARTICLE_BOUNDARY",
            formulaTemplate: "PARTICLE_CANDIDATE -> PARTICLE_BOUNDARY_FRAME(FUNCTION/PLACEMENT)",
            operation: "particle-candidate-to-boundary-classification",
            requirementIds: ["particle-candidate-source", "function-class-source", "placement-source"],
        };
    }
    if (lessonId === 4) {
        return {
            routeFamily: "foundation-route",
            routeKind: "nuclear-clause-formula",
            sourceUnit: "CN source slots",
            targetUnit: "CNV/CNN formula contract",
            sourceFormulaType: "CN",
            targetFormulaType: "CNV/CNN",
            formulaTemplate: "SOURCE_SLOTS -> #pers1-pers2(STEM)tense-num1-num2# OR #pers1-pers2(STEM)num1-num2#",
            operation: "source-slots-to-nuclear-clause-formula",
            requirementIds: ["predicate-source", "subject-slot-source", "formula-type-source"],
        };
    }
    if (lessonId >= 5 && lessonId <= 11) {
        const kinds = {
            5: ["intransitive-vnc", "#pers1(STEM)tense-num1#", "intransitive-stem-source"],
            6: ["transitive-vnc", "#pers1-val1-val2(STEM)tense-num1# OR #pers1-val(STEM)tense-num1#", "transitive-stem-source"],
            7: ["verbstem-class", "VERBCORE_SOURCE -> CLASSIFIED_VERBSTEM(A/B/C/D)", "verbcore-source"],
            8: ["expanded-vnc-sentence", "CNV_SOURCE+SENTENCE_LAYER -> EXPANDED_VNC_SENTENCE", "sentence-transform-source"],
            9: ["optative-sentence", "OPTATIVE_CNV_SOURCE -> WISH_OR_COMMAND_SENTENCE", "optative-vnc-source"],
            10: ["admonitive-sentence", "ADMONITIVE_CNV_SOURCE -> ADMONITION_SENTENCE", "admonitive-vnc-source"],
            11: ["irregular-vnc", "IRREGULAR_CNV_SOURCE -> IRREGULAR_VNC_ROUTE", "irregular-stem-source"],
        }[lessonId];
        return {
            routeFamily: "foundation-route",
            routeKind: kinds[0],
            sourceUnit: "CNV source",
            targetUnit: "CNV or sentence route",
            sourceFormulaType: lessonId === 7 ? "VERBCORE" : "CNV",
            targetFormulaType: lessonId >= 8 && lessonId <= 10 ? "SENTENCE" : "CNV",
            formulaTemplate: kinds[1],
            operation: `${kinds[0]}-source-routing`,
            requirementIds: [kinds[2], "subject-or-context-source"],
        };
    }
    if (lessonId >= 12 && lessonId <= 19) {
        const kinds = {
            12: ["absolutive-nnc", "#pers1-pers2(STEM)num1-num2#", "absolutive-state-source"],
            13: ["possessive-nnc", "#pers1-pers2(POSESSIVE_STEM+STATE)num1-num2#", "possessive-state-source"],
            14: ["nounstem-class", "NOUNSTEM_SOURCE -> CNN_STEM(CLASS/NUMBER/STATE)", "nounstem-class-source"],
            15: ["possessive-peculiarities", "POSSESSIVE_CNN_SOURCE -> POSSESSIVE_NNC_ROUTE", "natural-possession-source"],
            16: ["pronominal-nnc", "PRONOMINAL_SOURCE -> CNN(PRONOMINAL_ABSOLUTIVE_NNC)", "pronominal-source"],
            17: ["supplementation", "HEAD(CN)+SUPPLEMENT(CN) -> SUPPLEMENTATION_FRAME", "supplement-source"],
            18: ["supplementation-part-two", "HEAD(CN)+SUPPLEMENT_VARIANT(CN) -> SUPPLEMENTATION_FRAME", "supplement-variant-source"],
            19: ["supplementation-part-three", "PRINCIPAL(CN)+VNC_SUPPLEMENT(CNV) -> SUPPLEMENTATION_OR_REPORT_FRAME", "vnc-supplement-source"],
        }[lessonId];
        return {
            routeFamily: "foundation-route",
            routeKind: kinds[0],
            sourceUnit: lessonId >= 17 ? "CN/CNV relation source" : "CNN predicate source",
            targetUnit: lessonId >= 17 ? "sentence relation frame" : "CNN formula route",
            sourceFormulaType: lessonId >= 17 ? "CN+CN" : (lessonId === 14 ? "NOUNSTEM" : "CNN"),
            targetFormulaType: lessonId >= 17 ? "SENTENCE_RELATION" : "CNN",
            formulaTemplate: kinds[1],
            operation: `${kinds[0]}-source-routing`,
            requirementIds: [kinds[2], "subject-or-relation-source"],
        };
    }
    if (lessonId >= 20 && lessonId <= 27) {
        const kinds = {
            20: ["nonactive-verbstem", "CNV(ACTIVE_IMPERFECTIVE_STEM) -> CNV(NONACTIVE_STEM[-lu/-luwa/-u/-uwa/-wa/-walu])", "active-imperfective-stem-source"],
            21: ["passive-transform", "CNV(SOURCE_WITH_PROMOTABLE_OBJECT) -> CNV(PASSIVE_SOURCE_STEM)", "promotable-object-source"],
            22: ["impersonal-transform", "CNV(SOURCE_WITH_IMPERSONAL_COMPATIBLE_SUBJECT) -> CNV(IMPERSONAL_SOURCE_STEM)", "impersonal-compatible-source"],
            23: ["verb-object-valence", "CNV(SOURCE_STEM+OBJECT_ROLES) -> CNV(MAINLINE/SHUNTLINE_OBJECT_FORMULA)", "object-role-source"],
            24: ["first-type-causative", "CNV(SOURCE_STEM -> TYPE_ONE_CAUSATIVE_STEM[-a])", "type-one-causative-source-stem"],
            25: ["second-type-causative", "CNV(SOURCE_STEM -> TYPE_TWO_CAUSATIVE_STEM[-tia/-lia/-wia])", "type-two-causative-source-stem"],
            26: ["applicative", "CNV(SOURCE_STEM -> APPLICATIVE_STEM[-ia/-lia/-wia/-tia])", "applicative-compatible-source-stem"],
            27: ["frequentative", "CNV(SOURCE_STEM) -> CNV(FREQUENTATIVE_STEM[REDUP])", "frequentative-type-source"],
        }[lessonId];
        return {
            routeFamily: lessonId <= 23 ? "vnc-source-route" : "forward-derivation",
            routeKind: kinds[0],
            sourceUnit: "CNV source",
            targetUnit: "derived CNV route",
            sourceFormulaType: "CNV",
            targetFormulaType: "CNV",
            formulaTemplate: kinds[1],
            operation: `${kinds[0]}-source-routing`,
            requirementIds: [kinds[2], "valence-or-stem-source"],
        };
    }
    if (lessonId >= 28 && lessonId <= 34) {
        const kinds = {
            28: ["verbal-embed-compound", "EMBED(CNV/CNN)+MATRIX -> COMPOUND(CNV/CNN)", "embedded-source-formula", "CNV/CNN", "CNV/CNN"],
            29: ["purposive-directional", "CNV(FUTURE_EMBED)+DIRECTIONAL_MATRIX -> CNV(PURPOSIVE_STEM)", "future-embed-source", "CNV+CNV", "CNV"],
            30: ["nominal-embed-compound", "CNN(NOMINAL_EMBED)+CNV(MATRIX) -> CNV(COMPOUND_STEM)", "general-use-nounstem-source", "CNN+CNV", "CNV"],
            31: ["compound-nounstem", "CNN(EMBED)+CNN(MATRIX) -> CNN(COMPOUND_NOUNSTEM)", "nounstem-embed-source", "CNN+CNN", "CNN"],
            32: ["affective-nnc", "CNN(SOURCE_NOUNSTEM)+AFFECTIVE_MATRIX -> CNN(AFFECTIVE_NNC)", "affective-matrix-source", "CNN+MATRIX", "CNN"],
            33: ["honorific-pejorative", "CNV(SOURCE_STEM) -> CNV(HONORIFIC_OR_PEJORATIVE_STEM)", "honored-or-pejorated-participant-source", "CNV", "CNV"],
            34: ["cardinal-numeral-nnc", "NUMERAL_SOURCE -> CNN(ABSOLUTIVE_CARDINAL_NUMERAL_NNC)", "numeral-lexeme-source", "NUMERAL", "CNN"],
        }[lessonId];
        return {
            routeFamily: "derivational-boundary",
            routeKind: kinds[0],
            sourceUnit: "compound or special-source route",
            targetUnit: "derived CNV/CNN route",
            sourceFormulaType: kinds[3],
            targetFormulaType: kinds[4],
            formulaTemplate: kinds[1],
            operation: `${kinds[0]}-source-routing`,
            requirementIds: [kinds[2], "matrix-or-context-source"],
        };
    }
    if (lessonId >= 35 && lessonId <= 39) {
        const kinds = {
            35: ["preterit-agentive-nominalization", "CNV(PRETERIT_SOURCE_CORE) -> CNN(PRETERIT_AGENTIVE_NOUNSTEM)", "preterit-vnc-core-source"],
            36: ["nominalized-vnc", "CNV(SOURCE_CORE) -> CNN(NOMINALIZED_VNC_STEM)", "nominalizable-vnc-source"],
            37: ["deverbal-nounstem", "CNV(SOURCE_CORE) -> CNN(DEVERBAL_NOUNSTEM[-s/-lis/PATIENTIVE])", "deverbal-source-core"],
            38: ["impersonal-patientive", "CNV(IMPERSONAL_SOURCE_CORE) -> CNN(IMPERSONAL_PATIENTIVE_NOUNSTEM)", "impersonal-core-source"],
            39: ["patientive-operations", "CNV/ROOT/STOCK(SOURCE) -> CNN(PATIENTIVE_FAMILY_NOUNSTEM)", "patientive-family-source"],
        }[lessonId];
        return {
            routeFamily: "nominalization",
            routeKind: kinds[0],
            sourceUnit: "CNV/core/root source",
            targetUnit: "CNN nominal route",
            sourceFormulaType: lessonId === 39 ? "CNV/ROOT/STOCK" : "CNV",
            targetFormulaType: "CNN",
            formulaTemplate: kinds[1],
            operation: `${kinds[0]}-source-routing`,
            requirementIds: [kinds[2], "nominalization-role-source"],
        };
    }
    if (lessonId >= 40 && lessonId <= 48) {
        const kinds = {
            40: ["adjectival-nnc-function", "CNN/CNV(SOURCE) -> ADJECTIVAL_FUNCTION(SOURCE_STEM)", "adjectival-nnc-source", "CNN/CNV", "ADJECTIVAL"],
            41: ["intensified-compound-adjectival-nnc", "ADJECTIVAL_SOURCE -> INTENSIFIED_OR_COMPOUND_ADJECTIVAL_NNC", "adjectival-source-disambiguation", "CNN/CNV", "ADJECTIVAL"],
            42: ["adjectival-modification", "HEAD(CN)+MODIFIER(CN) -> ADJECTIVAL_MODIFICATION_AST", "head-clause-source", "CN+CN", "MODIFICATION"],
            43: ["adjectival-modification-topology", "HEAD(CN)+MODIFIER_TOPOLOGY(CN) -> ADJECTIVAL_MODIFICATION_AST", "modifier-topology-source", "CN+CN", "MODIFICATION"],
            44: ["adverbial-nuclear-clause", "CNV/CNN(SOURCE) -> ADVERBIAL_FUNCTION(SOURCE)", "adverbializable-vnc-or-nnc-source", "CNV/CNN", "ADVERBIAL"],
            45: ["relational-nnc-options", "CNN(RELATIONAL_SOURCE)+OPTION_FRAME -> CNN(RELATIONAL_NNC)", "relational-nounstem-source", "CNN", "CNN"],
            46: ["relational-nnc-option-two", "SOURCE+RELATIONAL_MATRIX -> CNN(OPTION_TWO_RELATIONAL_NNC)", "option-two-relational-source", "CNN/CNV", "CNN"],
            47: ["relational-associated-pertinency", "CNN(RELATIONAL_COMPOUND_SOURCE)+MATRIX(ca/yo) -> CNN(ASSOCIATED_OR_PERTINENCY_NNC)", "associated-entity-or-pertinency-matrix-source", "CNN", "CNN"],
            48: ["place-gentilic-nnc", "PLACE_OR_GENTILIC_SOURCE -> CNN(PLACE_NAME_OR_GENTILIC_NNC)", "place-or-gentilic-source", "CNN", "CNN"],
        }[lessonId];
        return {
            routeFamily: "nnc-function",
            routeKind: kinds[0],
            sourceUnit: "CN/CNV/CNN function source",
            targetUnit: "NNC/function route",
            sourceFormulaType: kinds[3],
            targetFormulaType: kinds[4],
            formulaTemplate: kinds[1],
            operation: `${kinds[0]}-source-routing`,
            requirementIds: [kinds[2], "contextual-reference-source"],
        };
    }
    if (lessonId >= 49 && lessonId <= 53) {
        const kinds = {
            49: ["adverbial-adjunction", "HEAD(CN)+ADVERBIAL_MODIFIER(CN) -> ADVERBIAL_ADJUNCTION_AST", "adverbial-modifier-source"],
            50: ["nonadverbialized-adjoined-clause", "HEAD(CN)+ADJOINED_UNIT(CN) -> ADVERBIAL_RELATION_AST", "adjoined-unit-source"],
            51: ["complement-clause", "PRINCIPAL(CN)+COMPLEMENT(CN) -> COMPLEMENT_AST", "complement-clause-source"],
            52: ["conjunction-clause", "CONJUNCT(CN)+CONJUNCT(CN) -> CONJUNCTION_AST", "conjunct-source"],
            53: ["comparison", "COMPARAND(CN)+STANDARD(CN)+COMPARISON_MARKER -> COMPARISON_STRUCTURE", "comparison-marker-source"],
        }[lessonId];
        return {
            routeFamily: "clause-relation",
            routeKind: kinds[0],
            sourceUnit: "source clause relation",
            targetUnit: "clause relation AST",
            sourceFormulaType: "CN+CN",
            targetFormulaType: "CLAUSE_RELATION",
            formulaTemplate: kinds[1],
            operation: `${kinds[0]}-source-routing`,
            requirementIds: [kinds[2], "relation-kind-source"],
        };
    }
    if (lessonId === 54 || lessonId === 55) {
        return {
            routeFamily: "denominal-lesson",
            routeKind: lessonId === 54 ? "denominal-verbstem-part-one" : "denominal-verbstem-part-two",
            sourceUnit: "CNN source",
            targetUnit: "CNV denominal verbstem",
            sourceFormulaType: "CNN",
            targetFormulaType: "CNV",
            formulaTemplate: lessonId === 54
                ? "CNN_SOURCE -> CNV(DENOMINAL_VERBSTEM[-ti/-hui/-ya/-a/-hua/-lia])"
                : "CNN/RELATIONAL_SOURCE -> CNV(DENOMINAL_VERBSTEM[-tia/-tla/-oa/-huia/-i-a])",
            operation: "nounstem-source-to-denominal-verbstem-route-family",
            requirementIds: ["nounstem-source", "source-evidence-contract", "target-stem-class-contract"],
        };
    }
    return {
        routeFamily: "diagnostic-analysis",
        routeKind: lessonId === 56 ? "personal-name-nnc" : "analysis-diagnostics",
        sourceUnit: lessonId === 56 ? "name source clause" : "textual source",
        targetUnit: lessonId === 56 ? "personal-name CNN" : "diagnostic frame",
        sourceFormulaType: lessonId === 56 ? "CN" : "TEXT",
        targetFormulaType: lessonId === 56 ? "CNN" : "DIAGNOSTIC",
        formulaTemplate: lessonId === 56
            ? "SOURCE_STATEMENT(CN) -> CNN(PERSONAL_NAME_NNC)"
            : `TEXT_SOURCE -> ANDREWS_${lessonId}_DIAGNOSTIC_FRAME`,
        operation: lessonId === 56 ? "personal-name-source-routing" : "textual-analysis-source-routing",
        requirementIds: lessonId === 56
            ? ["name-source-clause", "inner-outer-subject-source"]
            : ["text-source", "sentence-context-source", "diagnostic-kind-source"],
    };
}

function expandAndrewsLessonRouteRefs(pdfRefs, fallbackLessonId) {
    const refs = [];
    (ANDREWS_SECTION_DIGEST_ROUTE_REFS_BY_LESSON[String(fallbackLessonId)] || []).forEach((ref) => {
        refs.push(ref);
    });
    (Array.isArray(pdfRefs) ? pdfRefs : []).forEach((ref) => {
        const text = String(ref || "");
        const rangeMatch = text.match(/^Andrews Lesson\s+(\d+)\.(\d+)-(\d+)\.(\d+)$/);
        if (rangeMatch && rangeMatch[1] === rangeMatch[3]) {
            const lessonId = Number(rangeMatch[1]);
            const start = Number(rangeMatch[2]);
            const end = Number(rangeMatch[4]);
            for (let section = start; section <= end; section += 1) {
                refs.push(`Andrews Lesson ${lessonId}.${section}`);
            }
            return;
        }
        refs.push(text || `Andrews Lesson ${fallbackLessonId}`);
    });
    const dedupedRefs = Array.from(new Set(refs));
    return dedupedRefs.length ? dedupedRefs : [`Andrews Lesson ${fallbackLessonId}`];
}

function slugifyAndrewsRouteToken(value) {
    return String(value || "andrews")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "") || "andrews";
}

function buildAndrewsRoutePuzzleStackTemplate(route = {}) {
    const structuralInfo = route.structuralInfo || {};
    const sourceGate = route.sourceGate || {};
    const sourcePathFormula = structuralInfo.sourcePathFormula || route.sourcePathFormula || "";
    const buildStep = (stage, piece, label, formula, note) => ({
        stage,
        piece,
        label,
        formula,
        note,
    });
    const buildAction = (stage, inputFormula, selectablePiece, operation, outputFormula, note) => ({
        stage,
        inputFormula,
        selectablePiece,
        operation,
        outputFormula,
        note,
    });
    const buildConjugatorRun = ({
        id,
        stage,
        activeEntrada,
        process,
        internalPath = [],
        contributes,
        attachTo = "",
        output,
        note,
    }) => ({
        id,
        stage,
        activeEntrada,
        process,
        internalPath,
        contributes,
        attachTo,
        output,
        note,
    });
    const buildProfile = (profileKind, steps, options = {}) => ({
        kind: "andrews-route-puzzle-stack-template",
        model: "entrada-formula-salida",
        profileKind,
        userBuildable: true,
        routeKind: route.routeKind || "",
        steps,
        ...(Array.isArray(options.actions) && options.actions.length
            ? {
                actionModel: "ordered-selectable-piece-transform",
                actions: options.actions,
            }
            : {}),
        ...(Array.isArray(options.conjugatorRuns) && options.conjugatorRuns.length
            ? {
                buildModel: "single-entrada-conjugator-orchestration",
                conjugatorEntradas: {
                    activeSlotPolicy: "one-source-at-a-time",
                    runs: options.conjugatorRuns,
                },
            }
            : {}),
    });

    if (route.routeKind === "preterit-agentive-embedded-source-locative") {
        const exampleSource = structuralInfo.exampleSource || "(mich-namaka)";
        const exampleTargetFormula = structuralInfo.exampleTargetFormula || "(mich-namaka-0-ka-n)-0-";
        const exampleSurface = structuralInfo.exampleSurface || "michnamakakan";
        const preteritCore = exampleSource.replace(/\)$/, "-0)");
        const agentiveStem = exampleSource.replace(/\)$/, "-0-ka)");
        const locativeStem = exampleSource.replace(/\)$/, "-0-ka-n)");
        return buildProfile(
            "exact-46-3-1-a-preterit-agentive-locative",
            [
                buildStep("#1 entrada", "source", "embedded source", exampleSource, "CNV source stem supplied by the user"),
                buildStep("#2 formula", "-0", "VNC preterit", preteritCore, "tense layer inside the embedded VNC core"),
                buildStep("#2 formula", "-ka < (ka)-t", "VNC-NNC conversion", agentiveStem, "preterit-agentive embedded NNC, without standalone -t"),
                buildStep("#2 formula", "-n < (n)-ti ~ (ni)-t", "relational NNC", locativeStem, "locative relational matrix stem element"),
                buildStep("#2 formula", "-0-", "NNC connector", exampleTargetFormula, "outer zero connector/adverbial layer"),
                buildStep("#3 salida", "surface", "realization", exampleSurface, "formula boundaries and zero markers are not surface letters"),
            ],
            {
                conjugatorRuns: [
                    buildConjugatorRun({
                        id: "predicate-preterit-core",
                        stage: "#2 formula",
                        activeEntrada: exampleSource,
                        process: "Conjugator builds the embedded predicate VNC core with preterit -0",
                        internalPath: [
                            "#pers1-pers2(mich-namaka)tense+num1-num2#",
                            "(mich-namaka-0)",
                        ],
                        contributes: "main-stack",
                        output: preteritCore,
                        note: "entrada holds only the embedded source while the Conjugator produces the preterit core",
                    }),
                    buildConjugatorRun({
                        id: "processed-layer-ka",
                        stage: "#2 formula",
                        activeEntrada: "(ka)",
                        process: "VNC-NNC conversion: Conjugator processes the verb (ka) as the general-use preterit-agentive nominal layer",
                        internalPath: [
                            "(ka)",
                            "(ka)-t",
                            "-ka",
                        ],
                        contributes: "processed-layer",
                        attachTo: preteritCore,
                        output: agentiveStem,
                        note: "the stack receives the processed usable layer -ka, not an unprocessed raw suffix",
                    }),
                    buildConjugatorRun({
                        id: "processed-layer-n",
                        stage: "#2 formula",
                        activeEntrada: "(ni)",
                        process: "VNC-NNC conversion: Conjugator processes the verb (ni) as the locative relational layer",
                        internalPath: [
                            "(ni)",
                            "(n)-ti",
                            "-n",
                        ],
                        contributes: "processed-layer",
                        attachTo: agentiveStem,
                        output: locativeStem,
                        note: "the stack receives the processed usable layer -n from the relational nominalization path",
                    }),
                    buildConjugatorRun({
                        id: "zero-connector",
                        stage: "#2 formula",
                        activeEntrada: "Ø",
                        process: "Conjugator applies the outer zero connector/adverbial layer",
                        internalPath: [
                            "Ø",
                            "-0-",
                        ],
                        contributes: "connector-layer",
                        attachTo: locativeStem,
                        output: exampleTargetFormula,
                        note: "the connector closes the target formula before surface realization",
                    }),
                    buildConjugatorRun({
                        id: "final-relational-nnc-generation",
                        stage: "#3 salida",
                        activeEntrada: exampleSource,
                        process: "Conjugator runs Andrews 46.3.1.a relational NNC generation",
                        internalPath: [
                            "sourceVerb: namaka",
                            "incorporatedNounStem: mich",
                            exampleTargetFormula,
                            exampleSurface,
                        ],
                        contributes: "salida",
                        attachTo: exampleTargetFormula,
                        output: exampleSurface,
                        note: "the final surface comes from the Conjugator route, not from a separate PuzzleStack spelling shortcut",
                    }),
                ],
            }
        );
    }

    if (route.routeKind === "nuclear-clause-formula") {
        return buildProfile("exact-nuclear-clause-shell", [
            buildStep("#1 entrada", "SOURCE_SLOTS", "source slots", "subject + predicate + category", "user supplies clause category and source slots"),
            buildStep("#2 formula", "pers1-pers2", "subject connector", "#pers1-pers2", "subject connector stays outside the predicate parentheses"),
            buildStep("#2 formula", "(STEM)", "predicate stem", "(STEM)", "predicate stem belongs inside parentheses"),
            buildStep("#2 formula", "tense / no tense", "category slot", "CNV: tense · CNN: no tense", "CNV can carry tense; ordinary CNN does not"),
            buildStep("#2 formula", "num1-num2", "number/reference connector", "num1-num2#", "subject/reference connector stays outside the predicate"),
            buildStep("#3 salida", "surface", "realization gate", route.targetUnit || "CNV/CNN formula contract", "surface is built only after a concrete CNV/CNN route supplies fillers"),
        ]);
    }

    if (route.routeKind === "intransitive-vnc" || route.routeKind === "intransitive-source-route") {
        return buildProfile("exact-intransitive-cnv-shell", [
            buildStep("#1 entrada", "CNV source", "intransitive source", route.sourceUnit || "CNV source", "user supplies an intransitive verbstem/source"),
            buildStep("#2 formula", "pers1", "subject prefix", "#pers1", "single subject connector opens the CNV shell"),
            buildStep("#2 formula", "(STEM)", "predicate stem", "(STEM)", "intransitive predicate stem is inside parentheses"),
            buildStep("#2 formula", "tense", "tense/mood layer", "tense", "tense/mood belongs to the CNV predicate layer"),
            buildStep("#2 formula", "num1", "subject number", "num1#", "subject number closes the CNV shell"),
            buildStep("#3 salida", "surface", "realization gate", route.targetUnit || "CNV surface", "Nawat/Pipil spelling realizes the filled CNV shell when licensed"),
        ]);
    }

    if (
        route.routeKind === "transitive-vnc"
        || route.routeKind === "transitive-source-route"
        || route.routeKind === "object-role-source-route"
        || route.routeKind === "verb-object-valence"
    ) {
        return buildProfile("exact-transitive-cnv-shell", [
            buildStep("#1 entrada", "CNV source", "transitive source", route.sourceUnit || "CNV source", "user supplies a transitive stem plus valence context"),
            buildStep("#2 formula", "pers1", "subject connector", "#pers1", "subject connector opens the CNV shell"),
            buildStep("#2 formula", "val1-val2", "object/valence connector", "val1-val2", "object and valence slots precede the predicate stem"),
            buildStep("#2 formula", "(STEM)", "predicate stem", "(STEM)", "transitive predicate stem stays inside parentheses"),
            buildStep("#2 formula", "tense", "tense/mood layer", "tense", "tense/mood applies after the predicate stem"),
            buildStep("#2 formula", "num1", "subject number", "num1#", "subject number closes the CNV shell"),
            buildStep("#3 salida", "surface", "realization gate", route.targetUnit || "CNV surface", "surface waits for object/person/tense fillers and Nawat/Pipil spelling"),
        ]);
    }

    if (route.routeKind === "absolutive-nnc" || route.routeKind === "absolutive-state-source-route") {
        return buildProfile("exact-absolutive-cnn-shell", [
            buildStep("#1 entrada", "CNN source", "nounstem source", route.sourceUnit || "CNN predicate source", "user supplies the predicate nounstem"),
            buildStep("#2 formula", "pers1-pers2", "subject connector", "#pers1-pers2", "subject connector stays outside the predicate parentheses"),
            buildStep("#2 formula", "(STEM)", "predicate nounstem", "(STEM)", "predicate nounstem belongs inside parentheses"),
            buildStep("#2 formula", "state", "absolutive state", "absolutive state", "state belongs to the predicate, not to the connector"),
            buildStep("#2 formula", "num1-num2", "reference/number connector", "num1-num2#", "ordinary CNN has no tense slot"),
            buildStep("#3 salida", "surface", "realization gate", route.targetUnit || "CNN surface", "surface waits for state and connector fillers"),
        ]);
    }

    if (route.routeKind === "possessive-nnc" || route.routeKind === "possessive-state-source-route" || route.routeKind === "possessive-nnc-route") {
        return buildProfile("exact-possessive-cnn-shell", [
            buildStep("#1 entrada", "CNN possessive source", "possessive predicate source", route.sourceUnit || "CNN predicate source", "user supplies nounstem plus possessor context"),
            buildStep("#2 formula", "pers1-pers2", "subject connector", "#pers1-pers2", "subject connector stays outside the predicate parentheses"),
            buildStep("#2 formula", "(POSESSIVE_STEM)", "possessive predicate stem", "(POSESSIVE_STEM)", "possessive material belongs inside the predicate stem"),
            buildStep("#2 formula", "state", "possessive state", "possessive state", "state belongs to the predicate layer"),
            buildStep("#2 formula", "num1-num2", "reference/number connector", "num1-num2#", "ordinary possessive CNN has no tense slot"),
            buildStep("#3 salida", "surface", "realization gate", route.targetUnit || "CNN surface", "surface waits for possessor, state, and connector fillers"),
        ]);
    }

    if (/causative/.test(route.routeKind || "")) {
        return buildProfile("exact-causative-route", [
            buildStep("#1 entrada", route.sourceFormulaType || "CNV", "causative-compatible source", route.sourceUnit || "CNV source stem", "user supplies a source stem that can take a causative layer"),
            buildStep("#2 formula", "source gate", "valence/source condition", sourceGate.status || route.requirementIds?.[0] || "causative-source-stem", "the route checks that the source is causative-compatible"),
            buildStep("#2 formula", "causative suffix", "causative layer", "type one -a / type two -tia/-lia/-wia", "causative material is added inside the target verbstem"),
            buildStep("#2 formula", "CNV target", "causative target stem", route.formulaTemplate || "CNV(SOURCE_STEM) -> CNV(CAUSATIVE_STEM)", "target formula records the derived causative verbstem"),
            buildStep("#3 salida", "surface", "realization gate", route.targetUnit || "causative CNV surface", "finite output waits for object/person/tense fillers and Nawat/Pipil evidence"),
        ]);
    }

    if (/applicative/.test(route.routeKind || "")) {
        return buildProfile("exact-applicative-route", [
            buildStep("#1 entrada", route.sourceFormulaType || "CNV", "applicative-compatible source", route.sourceUnit || "CNV source stem", "user supplies a source stem that can take an applicative layer"),
            buildStep("#2 formula", "source gate", "object/source condition", sourceGate.status || route.requirementIds?.[0] || "applicative-compatible-source-stem", "the route checks object/source compatibility before adding applicative material"),
            buildStep("#2 formula", "applicative suffix", "applicative layer", "-ia / -lia / -wia / -tia", "applicative material is added inside the target verbstem"),
            buildStep("#2 formula", "CNV target", "applicative target stem", route.formulaTemplate || "CNV(SOURCE_STEM) -> CNV(APPLICATIVE_STEM)", "target formula records the derived applicative verbstem"),
            buildStep("#3 salida", "surface", "realization gate", route.targetUnit || "applicative CNV surface", "finite output waits for object/person/tense fillers and Nawat/Pipil evidence"),
        ]);
    }

    if (/frequentative/.test(route.routeKind || "")) {
        return buildProfile("exact-frequentative-route", [
            buildStep("#1 entrada", route.sourceFormulaType || "CNV", "repeatable source", route.sourceUnit || "CNV repeatable source", "user supplies a source compatible with frequentative reduplication"),
            buildStep("#2 formula", "source gate", "frequentative source condition", sourceGate.status || route.requirementIds?.[0] || "frequentative-type-source", "the route checks that the source can be repeated"),
            buildStep("#2 formula", "REDUP", "frequentative layer", "FREQUENTATIVE_STEM[REDUP]", "the frequentative piece is a stem-internal reduplication layer"),
            buildStep("#2 formula", "CNV target", "frequentative target stem", route.formulaTemplate || "CNV(SOURCE_STEM) -> CNV(FREQUENTATIVE_STEM[REDUP])", "target formula records the derived frequentative verbstem"),
            buildStep("#3 salida", "surface", "realization gate", route.targetUnit || "frequentative CNV surface", "finite output waits for person/tense and Nawat/Pipil evidence"),
        ]);
    }

    if (/passive/.test(route.routeKind || "")) {
        return buildProfile("exact-passive-voice-route", [
            buildStep("#1 entrada", route.sourceFormulaType || "CNV", "source with promotable object", route.sourceUnit || "CNV source with promotable object", "user supplies a verbal source whose object can be promoted"),
            buildStep("#2 formula", "object promotion", "passive source condition", sourceGate.status || route.requirementIds?.[0] || "promotable-object-source", "the object role is promoted before passive stem output"),
            buildStep("#2 formula", "passive stem", "passive voice layer", route.formulaTemplate || "CNV(SOURCE_WITH_PROMOTABLE_OBJECT) -> CNV(PASSIVE_SOURCE_STEM)", "target formula records the passive source stem"),
            buildStep("#3 salida", "surface", "realization gate", route.targetUnit || "passive CNV surface", "finite passive output waits for subject/tense and evidence fillers"),
        ]);
    }

    if (/impersonal/.test(route.routeKind || "")) {
        return buildProfile("exact-impersonal-voice-route", [
            buildStep("#1 entrada", route.sourceFormulaType || "CNV", "impersonal-compatible source", route.sourceUnit || "CNV impersonal source", "user supplies a verbal source compatible with impersonal voice"),
            buildStep("#2 formula", "subject gate", "impersonal source condition", sourceGate.status || route.requirementIds?.[0] || "impersonal-compatible-source", "the subject/source compatibility gate is checked first"),
            buildStep("#2 formula", "impersonal stem", "impersonal voice layer", route.formulaTemplate || "CNV(SOURCE_WITH_IMPERSONAL_COMPATIBLE_SUBJECT) -> CNV(IMPERSONAL_SOURCE_STEM)", "target formula records the impersonal source stem"),
            buildStep("#3 salida", "surface", "realization gate", route.targetUnit || "impersonal CNV surface", "finite impersonal output waits for tense and evidence fillers"),
        ]);
    }

    if (/nonactive/.test(route.routeKind || "")) {
        return buildProfile("exact-nonactive-verbstem-route", [
            buildStep("#1 entrada", route.sourceFormulaType || "CNV", "active imperfective source", route.sourceUnit || "CNV active imperfective stem", "user supplies the active source stem"),
            buildStep("#2 formula", "active source gate", "nonactive source condition", sourceGate.status || route.requirementIds?.[0] || "active-imperfective-stem-source", "the route checks the active stem before deriving nonactive shape"),
            buildStep("#2 formula", "nonactive suffix", "nonactive layer", "[-lu/-luwa/-u/-uwa/-wa/-walu]", "nonactive material is added inside the target verbstem"),
            buildStep("#2 formula", "CNV target", "nonactive target stem", route.formulaTemplate || "CNV(ACTIVE_IMPERFECTIVE_STEM) -> CNV(NONACTIVE_STEM)", "target formula records the nonactive stem"),
            buildStep("#3 salida", "surface", "realization gate", route.targetUnit || "nonactive CNV surface", "finite output waits for person/tense and Nawat/Pipil evidence"),
        ]);
    }

    if (/active-voice/.test(route.routeKind || "")) {
        return buildProfile("exact-active-voice-route", [
            buildStep("#1 entrada", route.sourceFormulaType || "CNV", "active source", route.sourceUnit || "CNV active source", "user supplies the active voice source"),
            buildStep("#2 formula", "active voice", "voice layer", route.requirementIds?.[0] || sourceGate.requirementIds?.[0] || "active-voice-source", "the route preserves active voice source structure"),
            buildStep("#2 formula", "CNV target", "active target formula", route.formulaTemplate || route.targetUnit || "CNV(ACTIVE_SOURCE_STEM) -> CNV(ACTIVE_VOICE_ROUTE)", "target formula records active voice routing"),
            buildStep("#3 salida", "surface", "realization gate", route.targetUnit || "active CNV surface", "finite output waits for tense/person fillers"),
        ]);
    }

    if (/perfective|present|past/.test(route.routeKind || "")) {
        return buildProfile("exact-cnv-tense-source-route", [
            buildStep("#1 entrada", route.sourceFormulaType || "CNV", "tense-compatible source", route.sourceUnit || "CNV source stem", "user supplies a source compatible with the tense/aspect route"),
            buildStep("#2 formula", "stem class gate", "tense source condition", sourceGate.status || route.requirementIds?.[0] || "tense-source", "the tense route checks stem class and source evidence"),
            buildStep("#2 formula", "tense", "tense/aspect layer", route.routeKind || "tense source", "tense/aspect material belongs to the CNV predicate layer"),
            buildStep("#2 formula", "CNV target", "tense target formula", route.formulaTemplate || route.targetUnit || "CNV target", "target formula records the tense/aspect route"),
            buildStep("#3 salida", "surface", "realization gate", route.targetUnit || "CNV surface", "surface waits for person/number and Nawat/Pipil spelling evidence"),
        ]);
    }

    if (/preterit-agentive/.test(route.routeKind || "")) {
        return buildProfile("exact-preterit-agentive-nominalization", [
            buildStep("#1 entrada", route.sourceFormulaType || "CNV", "preterit source", route.sourceUnit || "CNV preterit source", "user supplies a preterit VNC core/source"),
            buildStep("#2 formula", "-0", "preterit core", "CNV(PRETERIT_SOURCE_CORE)", "the preterit core is the embedded source layer"),
            buildStep("#2 formula", "-ka < (ka)-t", "preterit-agentive layer", "CNN(PRETERIT_AGENTIVE_STEM)", "agentive stem layer derives from the preterit source"),
            buildStep("#2 formula", "CNN target", "nominal target formula", route.formulaTemplate || route.targetUnit || "CNN preterit-agentive stem", "target formula records the preterit-agentive CNN stem/function"),
            buildStep("#3 salida", "surface", "realization gate", route.targetUnit || "preterit-agentive CNN surface", "surface waits for state, number, possessor, or later embedding evidence"),
        ]);
    }

    if (/patientive/.test(route.routeKind || "")) {
        return buildProfile("exact-patientive-nominalization", [
            buildStep("#1 entrada", route.sourceFormulaType || "CNV/ROOT/STOCK", "patientive source", route.sourceUnit || "CNV/root/stock patientive source", "user supplies the source that can receive patientive interpretation"),
            buildStep("#2 formula", "source family gate", "patientive source condition", sourceGate.status || route.requirementIds?.[0] || "patientive-family-source", "the route checks whether the source is CNV, root, stock, or impersonal patientive"),
            buildStep("#2 formula", "patientive layer", "patientive nominal layer", route.formulaTemplate || "CNV/ROOT/STOCK(SOURCE) -> CNN(PATIENTIVE_NOUNSTEM)", "patientive material builds a CNN patientive nounstem"),
            buildStep("#3 salida", "surface", "realization gate", route.targetUnit || "patientive CNN surface", "surface waits for state, number, possessor, or Nawat/Pipil evidence"),
        ]);
    }

    if (/deverbal/.test(route.routeKind || "")) {
        return buildProfile("exact-deverbal-nounstem-route", [
            buildStep("#1 entrada", route.sourceFormulaType || "CNV", "deverbal source", route.sourceUnit || "CNV source core", "user supplies the verbal source core"),
            buildStep("#2 formula", "source core", "deverbal source condition", sourceGate.status || route.requirementIds?.[0] || "deverbal-source-core", "the route works from a source core rather than a finished surface"),
            buildStep("#2 formula", "nominal suffix", "deverbal nominal layer", "[-s/-lis/PATIENTIVE]", "deverbal nominal material builds a CNN nounstem"),
            buildStep("#2 formula", "CNN target", "deverbal target formula", route.formulaTemplate || route.targetUnit || "CNN deverbal nounstem", "target formula records the deverbal nounstem"),
            buildStep("#3 salida", "surface", "realization gate", route.targetUnit || "deverbal CNN surface", "surface waits for state, number, possessor, or evidence gates"),
        ]);
    }

    if (/active-action/.test(route.routeKind || "")) {
        return buildProfile("exact-active-action-nominalization", [
            buildStep("#1 entrada", route.sourceFormulaType || "CNV", "active-action source", route.sourceUnit || "CNV active-action source", "user supplies the active-action source"),
            buildStep("#2 formula", "active-action core", "source core", route.sourceFormulaType || "CNV(ACTIVE_ACTION_SOURCE)", "the route embeds the active-action source"),
            buildStep("#2 formula", "nominal layer", "active-action nominal layer", route.formulaTemplate || "CNV(ACTIVE_ACTION_SOURCE) -> CNN(ACTIVE_ACTION_NOMINAL_STEM)", "active-action material builds a CNN nominal stem"),
            buildStep("#3 salida", "surface", "realization gate", route.targetUnit || "active-action CNN surface", "surface waits for state, possessor, context, or evidence gates"),
        ]);
    }

    if (route.routeKind === "nominalized-vnc") {
        return buildProfile("exact-nominalized-vnc-route", [
            buildStep("#1 entrada", route.sourceFormulaType || "CNV", "nominalizable VNC source", route.sourceUnit || "CNV/core/root source", "user supplies a VNC/core source that can be nominalized"),
            buildStep("#2 formula", "source gate", "nominalization role condition", sourceGate.status || route.requirementIds?.[0] || "nominalizable-vnc-source", "the route checks that the source can serve a nominal role"),
            buildStep("#2 formula", "CNV(SOURCE_CORE)", "embedded VNC core", "CNV(SOURCE_CORE)", "the verbal source stays visible as the embedded source core"),
            buildStep("#2 formula", "NOMINALIZED_VNC_STEM", "nominalizing stem layer", "CNN(NOMINALIZED_VNC_STEM)", "the nominalizing layer turns the VNC source into a CNN stem"),
            buildStep("#2 formula", "CNN target", "nominal target formula", route.formulaTemplate || "CNV(SOURCE_CORE) -> CNN(NOMINALIZED_VNC_STEM)", "target formula records the nominalized VNC route"),
            buildStep("#3 salida", "surface", "realization gate", route.targetUnit || "nominalized VNC CNN surface", "surface waits for state, possessor, number, and Nawat/Pipil evidence"),
        ]);
    }

    if (/destockal/.test(route.routeKind || "")) {
        return buildProfile("exact-destockal-denominal-route", [
            buildStep("#1 entrada", route.sourceFormulaType || "CNN/STOCK", "stock/noun source", route.sourceUnit || "CNN/stock source", "user supplies the stock or nounstem source"),
            buildStep("#2 formula", "stock gate", "destockal source condition", sourceGate.status || route.requirementIds?.[0] || "nounstem-source", "the source must satisfy the destockal/denominal source gate"),
            buildStep("#2 formula", "verbalizer", "destockal verbal layer", route.formulaTemplate || "CNN/STOCK(SOURCE) -> CNV(DENOMINAL_VERBSTEM)", "the verbalizer builds a CNV denominal verbstem"),
            buildStep("#2 formula", "target class", "target stem class", route.targetUnit || "CNV denominal verbstem", "target class stays explicit before finite generation"),
            buildStep("#3 salida", "surface", "realization gate", route.targetUnit || "denominal CNV surface", "finite output waits for tense/object/source evidence"),
        ]);
    }

    if (/denominal-verbstem-part-one/.test(route.routeKind || "")) {
        return buildProfile("exact-denominal-part-one-route", [
            buildStep("#1 entrada", "CNN source", "nounstem source", route.sourceUnit || "CNN source", "user supplies the nounstem source"),
            buildStep("#2 formula", "source evidence", "source contract", sourceGate.status || "source-evidence-contract", "source evidence decides which denominal verbalizer can apply"),
            buildStep("#2 formula", "-ti/-hui/-ya/-a/-hua/-lia", "part-one verbalizer", route.formulaTemplate || "CNN_SOURCE -> CNV(DENOMINAL_VERBSTEM[-ti/-hui/-ya/-a/-hua/-lia])", "the selected verbalizer is added inside the target verbstem"),
            buildStep("#2 formula", "CNV target", "denominal target stem", route.targetUnit || "CNV denominal verbstem", "target stem class and continuation gates remain explicit"),
            buildStep("#3 salida", "surface", "realization gate", route.targetUnit || "denominal CNV surface", "finite output waits for tense/object/source evidence"),
        ]);
    }

    if (/denominal-verbstem-part-two/.test(route.routeKind || "")) {
        return buildProfile("exact-denominal-part-two-route", [
            buildStep("#1 entrada", "CNN/RELATIONAL source", "nounstem/relational source", route.sourceUnit || "CNN/relational source", "user supplies nounstem or relational source evidence"),
            buildStep("#2 formula", "source evidence", "source contract", sourceGate.status || "source-evidence-contract", "source evidence decides which part-two verbalizer can apply"),
            buildStep("#2 formula", "-tia/-tla/-oa/-huia/-i-a", "part-two verbalizer", route.formulaTemplate || "CNN/RELATIONAL_SOURCE -> CNV(DENOMINAL_VERBSTEM[-tia/-tla/-oa/-huia/-i-a])", "the selected verbalizer is added inside the target verbstem"),
            buildStep("#2 formula", "CNV target", "denominal target stem", route.targetUnit || "CNV denominal verbstem", "target stem class and transitivity gates remain explicit"),
            buildStep("#3 salida", "surface", "realization gate", route.targetUnit || "denominal CNV surface", "finite output waits for tense/object/source evidence"),
        ]);
    }

    if (/purposive-directional/.test(route.routeKind || "")) {
        return buildProfile("exact-purposive-directional-route", [
            buildStep("#1 entrada", "CNV future embed", "future embed source", route.sourceUnit || "future embed source", "user supplies a future-compatible embedded VNC source"),
            buildStep("#2 formula", "future embed", "embedded purpose source", "CNV(FUTURE_EMBED)", "the future embed supplies the intended action"),
            buildStep("#2 formula", "directional matrix", "directional/purposive matrix", "DIRECTIONAL_MATRIX", "the matrix creates purposive/directional force"),
            buildStep("#2 formula", "CNV target", "purposive target stem", route.formulaTemplate || "CNV(FUTURE_EMBED)+DIRECTIONAL_MATRIX -> CNV(PURPOSIVE_STEM)", "target formula records the purposive CNV stem"),
            buildStep("#3 salida", "surface", "realization gate", route.targetUnit || "purposive CNV surface", "finite output waits for person, tense, direction, and Nawat/Pipil evidence"),
        ]);
    }

    if (/verbal-embed-compound|embedded-source-compound|compound-source-route/.test(route.routeKind || "")) {
        return buildProfile("exact-verbal-embed-compound-route", [
            buildStep("#1 entrada", route.sourceFormulaType || "CNV/CNN", "embedded source", route.sourceUnit || "compound source", "user supplies an embed plus a matrix source"),
            buildStep("#2 formula", "EMBED", "embedded predicate/source", "EMBED(CNV/CNN)", "the embedded source remains structurally visible"),
            buildStep("#2 formula", "MATRIX", "matrix stem", "MATRIX", "the matrix receives or governs the embed"),
            buildStep("#2 formula", "compound stem", "compound target", route.formulaTemplate || "EMBED(CNV/CNN)+MATRIX -> COMPOUND(CNV/CNN)", "target formula records the compound stem route"),
            buildStep("#3 salida", "surface", "realization gate", route.targetUnit || "compound surface", "surface waits for matrix/embed compatibility and Nawat/Pipil evidence"),
        ]);
    }

    if (/nominal-embed-compound|compound-nounstem/.test(route.routeKind || "")) {
        return buildProfile("exact-nominal-compound-route", [
            buildStep("#1 entrada", route.sourceFormulaType || "CNN+CNN", "nominal embed source", route.sourceUnit || "nominal compound source", "user supplies a nounstem embed and a matrix"),
            buildStep("#2 formula", "CNN embed", "nominal embed", "CNN(EMBED)", "the nominal embed is kept as a source layer"),
            buildStep("#2 formula", "matrix", "nominal/verbal matrix", "MATRIX", "the matrix determines the compound target category"),
            buildStep("#2 formula", "compound target", "compound formula", route.formulaTemplate || "CNN(EMBED)+MATRIX -> COMPOUND_TARGET", "target formula records the compound nounstem/verbstem"),
            buildStep("#3 salida", "surface", "realization gate", route.targetUnit || "compound surface", "surface waits for state/class/evidence gates"),
        ]);
    }

    if (/honorific-pejorative/.test(route.routeKind || "")) {
        return buildProfile("exact-honorific-pejorative-route", [
            buildStep("#1 entrada", "CNV source", "honorific/pejorative source", route.sourceUnit || "CNV source", "user supplies the participant/source being honored or pejorated"),
            buildStep("#2 formula", "participant gate", "honorific/pejorative condition", sourceGate.status || route.requirementIds?.[0] || "honored-or-pejorated-participant-source", "the participant relation selects the honorific or pejorative route"),
            buildStep("#2 formula", "honorific/pejorative layer", "evaluative stem layer", route.formulaTemplate || "CNV(SOURCE_STEM) -> CNV(HONORIFIC_OR_PEJORATIVE_STEM)", "the evaluative layer is added inside the target stem"),
            buildStep("#3 salida", "surface", "realization gate", route.targetUnit || "honorific/pejorative surface", "finite output waits for reflexive/object/tense and evidence gates"),
        ]);
    }

    if (/affective/.test(route.routeKind || "")) {
        return buildProfile("exact-affective-nnc-route", [
            buildStep("#1 entrada", "CNN source", "affective nounstem source", route.sourceUnit || "CNN source", "user supplies the source nounstem and affective context"),
            buildStep("#2 formula", "affective matrix", "affective layer", "AFFECTIVE_MATRIX", "the affective matrix modifies the CNN stem/function"),
            buildStep("#2 formula", "CNN target", "affective target formula", route.formulaTemplate || "CNN(SOURCE_NOUNSTEM)+AFFECTIVE_MATRIX -> CNN(AFFECTIVE_NNC)", "target formula records the affective CNN"),
            buildStep("#3 salida", "surface", "realization gate", route.targetUnit || "affective CNN surface", "surface waits for state, reference, and evidence gates"),
        ]);
    }

    if (/cardinal-numeral|numeral-source/.test(route.routeKind || "")) {
        return buildProfile("exact-numeral-nnc-route", [
            buildStep("#1 entrada", "NUMERAL source", "numeral source", route.sourceUnit || "numeral source", "user supplies the numeral source"),
            buildStep("#2 formula", "numeral stem", "cardinal stem piece", "NUMERAL_SOURCE", "the numeral source becomes the predicate stem/function"),
            buildStep("#2 formula", "CNN target", "cardinal CNN formula", route.formulaTemplate || "NUMERAL_SOURCE -> CNN(ABSOLUTIVE_CARDINAL_NUMERAL_NNC)", "target formula records the cardinal numeral CNN"),
            buildStep("#3 salida", "surface", "realization gate", route.targetUnit || "numeral CNN surface", "surface waits for state/reference and evidence gates"),
        ]);
    }

    if (/matrix-source-route/.test(route.routeKind || "")) {
        return buildProfile("exact-matrix-source-route", [
            buildStep("#1 entrada", route.sourceFormulaType || "MATRIX", "matrix source", route.sourceUnit || "matrix source", "user supplies the matrix source"),
            buildStep("#2 formula", "matrix gate", "matrix condition", sourceGate.status || route.requirementIds?.[0] || "matrix-source", "the route checks matrix compatibility"),
            buildStep("#2 formula", "matrix target", "matrix-composed formula", route.formulaTemplate || "SOURCE+MATRIX -> MATRIX_COMPOSED_ROUTE", "target formula records the matrix-composed route"),
            buildStep("#3 salida", "surface", "realization gate", route.targetUnit || "matrix-composed surface", "surface waits for source/matrix evidence"),
        ]);
    }

    if (
        route.routeFamily === "forward-derivation"
        || /causative|applicative|frequentative/.test(route.routeKind || "")
    ) {
        const derivationLabel = structuralInfo.derivationalLayer || route.routeKind || "derivation";
        return buildProfile("exact-forward-derivation", [
            buildStep("#1 entrada", route.sourceFormulaType || "source", "source stem", route.sourceUnit || "source stem", "user supplies a source compatible with the derivation"),
            buildStep("#2 formula", "source gate", "source condition", sourceGate.status || route.requirementIds?.[0] || "source gate", "route checks that the source can take this derivational layer"),
            buildStep("#2 formula", derivationLabel, "derivational layer", derivationLabel, "the derivational piece is added inside the target stem"),
            buildStep("#2 formula", route.targetFormulaType || "target", "derived target", route.formulaTemplate || route.targetUnit || "derived target", "target formula records the derived stem class"),
            buildStep("#3 salida", "surface", "realization gate", route.targetUnit || "derived surface", "finite surface waits for a licensed generation request"),
        ]);
    }

    if (route.routeFamily === "nominalization") {
        const nominalLayer = structuralInfo.derivationalLayer || route.routeKind || "nominalization";
        return buildProfile("exact-nominalization-route", [
            buildStep("#1 entrada", route.sourceFormulaType || "source", "nominalizable source", route.sourceUnit || "source core", "user supplies the CNV/core/root source"),
            buildStep("#2 formula", "source core", "embedded source core", route.sourceFormulaType || "SOURCE_CORE", "the route works from the source core, not a free surface echo"),
            buildStep("#2 formula", nominalLayer, "nominalizing layer", nominalLayer, "the nominalizing piece builds a CNN stem/function"),
            buildStep("#2 formula", route.targetFormulaType || "CNN", "target nominal formula", route.formulaTemplate || route.targetUnit || "CNN target", "target formula records the nominal stem/function"),
            buildStep("#3 salida", "surface", "realization gate", route.targetUnit || "CNN surface", "surface waits for state, possessor, number, or evidence gates"),
        ]);
    }

    if (route.routeFamily === "denominal-lesson") {
        return buildProfile("exact-denominal-route", [
            buildStep("#1 entrada", "CNN source", "denominal source", route.sourceUnit || "CNN source", "user supplies the nounstem/source evidence"),
            buildStep("#2 formula", "source evidence", "source contract", sourceGate.status || "source-evidence-contract", "Andrews source evidence must be satisfied before verbalization"),
            buildStep("#2 formula", "verbalizer", "denominal verbalizer", route.formulaTemplate || "CNN_SOURCE -> CNV(DENOMINAL_VERBSTEM)", "the verbalizer is added inside the target verbstem"),
            buildStep("#2 formula", "target class", "target stem class", route.targetUnit || "CNV denominal verbstem", "target stem class and object requirements stay explicit"),
            buildStep("#3 salida", "surface", "realization gate", route.targetUnit || "CNV surface", "finite CNV output waits for tense/object/source evidence"),
        ]);
    }

    if (route.routeFamily === "clause-relation") {
        if (/complement/.test(route.routeKind || "")) {
            return buildProfile("exact-complement-clause-route", [
                buildStep("#1 entrada", "PRINCIPAL(CN)", "principal clause", "PRINCIPAL(CN)", "user supplies the principal clause"),
                buildStep("#2 formula", "COMPLEMENT(CN)", "complement clause", "COMPLEMENT(CN)", "the complement clause is linked to the principal clause"),
                buildStep("#2 formula", "complement AST", "complement frame", route.formulaTemplate || "PRINCIPAL(CN)+COMPLEMENT(CN) -> COMPLEMENT_AST", "target formula records complement roles"),
                buildStep("#3 salida", "surface", "relation output", route.targetUnit || "complement AST", "output is a complement relation frame unless later generation is licensed"),
            ]);
        }
        if (/conjunction/.test(route.routeKind || "")) {
            return buildProfile("exact-conjunction-clause-route", [
                buildStep("#1 entrada", "CONJUNCT(CN)", "first conjunct", "CONJUNCT(CN)", "user supplies the first conjunct"),
                buildStep("#2 formula", "CONJUNCT(CN)", "second conjunct", "CONJUNCT(CN)", "user supplies the second conjunct or parallel unit"),
                buildStep("#2 formula", "conjunction frame", "conjunction relation", route.formulaTemplate || "CONJUNCT(CN)+CONJUNCT(CN) -> CONJUNCTION_AST", "target formula records the conjunction relation"),
                buildStep("#3 salida", "surface", "relation output", route.targetUnit || "conjunction AST", "output is a conjunction frame unless a later lexical route applies"),
            ]);
        }
        if (/comparison/.test(route.routeKind || "")) {
            return buildProfile("exact-comparison-route", [
                buildStep("#1 entrada", "COMPARAND(CN)", "comparand", "COMPARAND(CN)", "user supplies the item being compared"),
                buildStep("#2 formula", "STANDARD(CN)", "standard", "STANDARD(CN)", "user supplies the standard of comparison"),
                buildStep("#2 formula", "comparison marker", "comparison piece", "COMPARISON_MARKER", "the marker determines comparison structure"),
                buildStep("#2 formula", "comparison frame", "comparison formula", route.formulaTemplate || "COMPARAND(CN)+STANDARD(CN)+COMPARISON_MARKER -> COMPARISON_STRUCTURE", "target formula records the comparison frame"),
                buildStep("#3 salida", "surface", "relation output", route.targetUnit || "comparison structure", "output is a comparison structure unless later generation is licensed"),
            ]);
        }
        if (/adjoined|adjunction|adverbial/.test(route.routeKind || "")) {
            return buildProfile("exact-adjunction-clause-route", [
                buildStep("#1 entrada", "HEAD(CN)", "head clause", "HEAD(CN)", "user supplies the head/principal clause"),
                buildStep("#2 formula", "ADJOINED_UNIT(CN)", "adjoined unit", "ADJOINED_UNIT(CN)", "the adjoined/adverbial unit is attached as a relation"),
                buildStep("#2 formula", "adjunction frame", "adjoined-clause formula", route.formulaTemplate || "HEAD(CN)+ADJOINED_UNIT(CN) -> ADVERBIAL_RELATION_AST", "target formula records the adjoined relation"),
                buildStep("#3 salida", "surface", "relation output", route.targetUnit || "adverbial relation AST", "output is a relation frame unless later word generation is licensed"),
            ]);
        }
        return buildProfile("exact-clause-relation-route", [
            buildStep("#1 entrada", "CN+CN", "source clauses", route.sourceUnit || "source clause relation", "user supplies the principal/source clauses"),
            buildStep("#2 formula", "relation marker", "relation piece", route.requirementIds?.[0] || sourceGate.requirementIds?.[0] || "relation-kind-source", "the relation piece chooses complement, conjunction, comparison, or adjunction behavior"),
            buildStep("#2 formula", "AST frame", "relation frame", route.formulaTemplate || route.targetUnit || "clause relation AST", "the formula builds a clause-relation frame, not a new word surface"),
            buildStep("#3 salida", "surface", "diagnostic/render gate", route.targetUnit || "clause relation AST", "output is a relation frame unless a later route licenses word generation"),
        ]);
    }

    if (route.routeFamily === "vnc-source-route") {
        return buildProfile("exact-vnc-source-route", [
            buildStep("#1 entrada", route.sourceFormulaType || "CNV", "CNV source", route.sourceUnit || "CNV source", "user supplies the verbal source and its role evidence"),
            buildStep("#2 formula", "source role", "voice/valence source piece", route.requirementIds?.[0] || sourceGate.requirementIds?.[0] || route.routeKind || "source role", "the source role controls voice, object, tense, or active/nonactive routing"),
            buildStep("#2 formula", "target CNV", "target verbal formula", route.formulaTemplate || route.targetUnit || "CNV target", "the route builds a target CNV source/formula frame"),
            buildStep("#3 salida", "surface", "realization gate", route.targetUnit || "CNV surface", "surface waits for finite person, tense, valence, and evidence fillers"),
        ]);
    }

    if (route.routeFamily === "derivational-boundary") {
        if (route.routeKind === "formation-procedure-source-route") {
            return buildProfile("exact-formation-procedure-route", [
                buildStep("#1 entrada", route.sourceFormulaType || "FORMATION_SOURCE", "formation source", route.sourceUnit || "formation procedure source", "user supplies the Andrews formation procedure source"),
                buildStep("#2 formula", "INPUT_SOURCE", "input source", "INPUT_SOURCE", "the procedure takes an explicit source/input before forming a route"),
                buildStep("#2 formula", "formation procedure", "formation layer", structuralInfo.derivationalLayer || "formation procedure", "the formation procedure controls how the input is converted"),
                buildStep("#2 formula", "FORMED_ROUTE", "formed target route", route.formulaTemplate || "FORMATION_SOURCE+INPUT_SOURCE -> FORMED_ROUTE", "target formula records the formed grammar route"),
                buildStep("#3 salida", "surface", "realization gate", route.targetUnit || "formed grammar route", "surface waits for the formed route to license a concrete generated output"),
            ]);
        }
        return buildProfile("exact-derivational-boundary-route", [
            buildStep("#1 entrada", route.sourceFormulaType || "source", "embed/source", route.sourceUnit || "compound or special-source route", "user supplies the embedded source or matrix source"),
            buildStep("#2 formula", "embed/matrix boundary", "boundary piece", route.requirementIds?.[0] || sourceGate.requirementIds?.[0] || "matrix-or-context-source", "the boundary identifies how embed and matrix combine"),
            buildStep("#2 formula", "compound target", "derived formula", route.formulaTemplate || route.targetUnit || "derived CNV/CNN route", "the formula builds the compound or special derived target"),
            buildStep("#3 salida", "surface", "realization gate", route.targetUnit || "derived surface", "surface waits for the target route and Nawat/Pipil evidence"),
        ]);
    }

    if (route.routeFamily === "nnc-function") {
        if (/adjectival/.test(route.routeKind || "")) {
            return buildProfile("exact-adjectival-function-route", [
                buildStep("#1 entrada", route.sourceFormulaType || "CNN/CNV", "adjectival source", route.sourceUnit || "CNN/CNV adjectival source", "user supplies the source that can function adjectivally"),
                buildStep("#2 formula", "adjectival function", "function layer", structuralInfo.functionLayer || "ADJECTIVAL_FUNCTION", "the source is routed into adjectival function"),
                buildStep("#2 formula", "modifier target", "adjectival target formula", route.formulaTemplate || "CNN/CNV(SOURCE) -> ADJECTIVAL_FUNCTION(SOURCE_STEM)", "target formula records the adjectival function frame"),
                buildStep("#3 salida", "surface", "function output", route.targetUnit || "adjectival function frame", "output waits for head/modifier context or evidence gates"),
            ]);
        }
        if (/adverbial/.test(route.routeKind || "")) {
            return buildProfile("exact-adverbial-function-route", [
                buildStep("#1 entrada", route.sourceFormulaType || "CNV/CNN", "adverbializable source", route.sourceUnit || "CNV/CNN adverbializable source", "user supplies the source that can function adverbially"),
                buildStep("#2 formula", "adverbial function", "function layer", structuralInfo.functionLayer || "ADVERBIAL_FUNCTION", "the source is routed into adverbial function"),
                buildStep("#2 formula", "adverbial target", "adverbial target formula", route.formulaTemplate || "CNV/CNN(SOURCE) -> ADVERBIAL_FUNCTION(SOURCE)", "target formula records the adverbial function frame"),
                buildStep("#3 salida", "surface", "function output", route.targetUnit || "adverbial function frame", "output waits for clause context or evidence gates"),
            ]);
        }
        if (/place|gentilic/.test(route.routeKind || "")) {
            return buildProfile("exact-place-gentilic-route", [
                buildStep("#1 entrada", route.sourceFormulaType || "PLACE_SOURCE", "place/community source", route.sourceUnit || "place or community source", "user supplies place or community evidence"),
                buildStep("#2 formula", "place/gentilic piece", "place/gentilic layer", route.requirementIds?.[0] || sourceGate.requirementIds?.[0] || "place-or-gentilic-source", "the route chooses place-name or gentilic function"),
                buildStep("#2 formula", "CNN target", "place/gentilic formula", route.formulaTemplate || route.targetUnit || "CNN place/gentilic target", "target formula records the place-name or gentilic CNN"),
                buildStep("#3 salida", "surface", "realization gate", route.targetUnit || "place/gentilic surface", "surface waits for lexical/place evidence"),
            ]);
        }
        if (/relational|tli-state/.test(route.routeKind || "")) {
            return buildProfile("exact-relational-function-route", [
                buildStep("#1 entrada", route.sourceFormulaType || "CNN/CNV", "relational/function source", route.sourceUnit || "relational function source", "user supplies the source compatible with a relational or state matrix"),
                buildStep("#2 formula", "matrix/state piece", "relational function layer", structuralInfo.relationalMatrix || "RELATIONAL_OR_STATE_MATRIX", "matrix/state material is added inside the target CNN/function"),
                buildStep("#2 formula", "target function", "relational target formula", route.formulaTemplate || route.targetUnit || "NNC/function route", "target formula records the relational/state function"),
                buildStep("#3 salida", "surface", "realization gate", route.targetUnit || "relational function surface", "surface waits for state, possessor, connector, or evidence gates"),
            ]);
        }
        return buildProfile("exact-nnc-function-route", [
            buildStep("#1 entrada", route.sourceFormulaType || "CNN/CNV", "function source", route.sourceUnit || "CN/CNV/CNN function source", "user supplies the CNV/CNN/CN source for the function"),
            buildStep("#2 formula", "function piece", "function/matrix layer", structuralInfo.relationalMatrix || structuralInfo.functionLayer || route.requirementIds?.[0] || sourceGate.requirementIds?.[0] || route.routeKind, "the function piece turns the source into an adjectival, adverbial, relational, place, or gentilic frame"),
            buildStep("#2 formula", "target function", "target formula", route.formulaTemplate || route.targetUnit || "NNC/function route", "target formula records whether this is CNN, modifier, adverbial, or other function output"),
            buildStep("#3 salida", "surface", "realization gate", route.targetUnit || "NNC/function surface", "surface waits for state, connector, context, or evidence gates"),
        ]);
    }

    if (route.routeFamily === "relational-nnc") {
        return buildProfile("exact-relational-nnc-route", [
            buildStep("#1 entrada", route.sourceFormulaType || "CNN/CNV", "relational source", route.sourceUnit || "relational source", "user supplies the locus/source compatible with a relational matrix"),
            buildStep("#2 formula", "matrix", "relational matrix", structuralInfo.relationalMatrix || route.requirementIds?.[0] || sourceGate.requirementIds?.[0] || "RELATIONAL_MATRIX", "the relational matrix is added inside the CNN stem/function"),
            buildStep("#2 formula", "CNN target", "relational target", route.formulaTemplate || route.targetUnit || "CNN relational target", "target formula records the relational CNN build"),
            buildStep("#3 salida", "surface", "realization gate", route.targetUnit || "relational surface", "surface waits for possessor, state, connector, and Nawat/Pipil evidence"),
        ]);
    }

    if (route.routeFamily === "foundation-metadata-route") {
        if (route.routeKind === "grammar-concept-route") {
            return buildProfile("exact-grammar-concept-route", [
                buildStep("#1 entrada", route.sourceFormulaType || "TEXT/TERM", "grammar term source", route.sourceUnit || "grammar term or notation source", "user supplies a grammar term, notation token, or concept source"),
                buildStep("#2 formula", "CONCEPT_TOKEN", "concept token", "CONCEPT_TOKEN", "the token is read as an Andrews grammar concept, not as a surface word"),
                buildStep("#2 formula", "CN/CNV/CNN/STEM/SLOT/AFFIX", "concept category", "GRAMMAR_CONCEPT_FRAME(CN/CNV/CNN/STEM/SLOT/AFFIX)", "the category identifies the reusable grammar role"),
                buildStep("#3 salida", "surface", "concept output", route.targetUnit || "grammar concept frame", "output is a concept frame that later generation routes can reference"),
            ]);
        }
        if (route.routeKind === "orthography-bridge-route") {
            return buildProfile("exact-orthography-bridge-route", [
                buildStep("#1 entrada", route.sourceFormulaType || "CLASSICAL_LETTERS", "Andrews spelling source", route.sourceUnit || "Andrews grammar-rule spelling", "user supplies an Andrews grammar-rule spelling or slot spelling"),
                buildStep("#2 formula", "SLOT/POSITION", "orthography context", "ANDREWS_SPELLING(SLOT/POSITION)", "the spelling is interpreted with its grammar slot and position"),
                buildStep("#2 formula", "letter bridge", "Nawat/Pipil conversion", route.formulaTemplate || "ANDREWS_SPELLING(SLOT/POSITION) -> NAWAT_ORTHOGRAPHY_FRAME", "the bridge converts letters only; it does not add lexical evidence"),
                buildStep("#3 salida", "surface", "orthography output", route.targetUnit || "Nawat/Pipil spelling profile", "output is a spelling profile used by later licensed surfaces"),
            ]);
        }
        if (route.routeKind === "particle-boundary-route") {
            return buildProfile("exact-particle-boundary-route", [
                buildStep("#1 entrada", route.sourceFormulaType || "PARTICLE_CANDIDATE", "particle candidate", route.sourceUnit || "particle candidate source", "user supplies a particle candidate source"),
                buildStep("#2 formula", "FUNCTION", "function class", "FUNCTION", "the function class decides how the particle can attach or frame a clause"),
                buildStep("#2 formula", "PLACEMENT", "placement layer", "PLACEMENT", "placement marks the particle boundary outside the predicate stem"),
                buildStep("#2 formula", "PARTICLE_BOUNDARY_FRAME", "particle boundary frame", route.formulaTemplate || "PARTICLE_CANDIDATE -> PARTICLE_BOUNDARY_FRAME(FUNCTION/PLACEMENT)", "target formula records the particle function and placement boundary"),
                buildStep("#3 salida", "surface", "boundary output", route.targetUnit || "particle boundary frame", "output is a boundary frame unless a later route licenses a surface"),
            ]);
        }
        return buildProfile("exact-foundation-metadata-route", [
            buildStep("#1 entrada", route.sourceFormulaType || "source", "metadata source", route.sourceUnit || "foundation source", "user supplies the term, spelling, particle, or boundary candidate"),
            buildStep("#2 formula", "classification", "metadata piece", route.requirementIds?.[0] || sourceGate.requirementIds?.[0] || route.routeKind, "the source is classified by Andrews grammar role"),
            buildStep("#2 formula", "frame", "target metadata frame", route.formulaTemplate || route.targetUnit || "metadata frame", "the target is a grammar/orthography/particle frame"),
            buildStep("#3 salida", "surface", "diagnostic gate", route.targetUnit || "metadata output", "metadata routes diagnose or frame later generation rather than generating a word alone"),
        ]);
    }

    if (route.routeFamily === "foundation-route") {
        if (route.routeKind === "stem-classification-source-route") {
            return buildProfile("exact-stem-classification-route", [
                buildStep("#1 entrada", route.sourceFormulaType || "STEM_SOURCE", "stem source", route.sourceUnit || "stem class source", "user supplies a stem source for classification"),
                buildStep("#2 formula", "class gate", "stem class condition", sourceGate.status || "stem-class-source", "the route checks the Andrews stem-class evidence"),
                buildStep("#2 formula", "CLASS", "class layer", "CLASS/NUMBER/STATE", "class, number, and state are identified as stem-frame pieces"),
                buildStep("#2 formula", "CLASSIFIED_STEM", "classified stem frame", route.formulaTemplate || "STEM_SOURCE -> CLASSIFIED_STEM(CLASS/NUMBER/STATE)", "target formula records the classified stem"),
                buildStep("#3 salida", "surface", "classification output", route.targetUnit || "classified stem frame", "surface waits for a later CNV/CNN route to realize the classified stem"),
            ]);
        }
        if (route.routeKind === "verbstem-class") {
            return buildProfile("exact-verbstem-class-route", [
                buildStep("#1 entrada", route.sourceFormulaType || "VERBCORE", "verbcore source", route.sourceUnit || "CNV source", "user supplies the verbcore/source stem"),
                buildStep("#2 formula", "class gate", "verbstem class condition", sourceGate.status || "verbcore-source", "the route checks the source before assigning verbstem class"),
                buildStep("#2 formula", "A/B/C/D", "verbstem class layer", "CLASSIFIED_VERBSTEM(A/B/C/D)", "the verbcore is classified by Andrews verbstem class"),
                buildStep("#2 formula", "CNV target", "classified CNV route", route.formulaTemplate || "VERBCORE_SOURCE -> CLASSIFIED_VERBSTEM(A/B/C/D)", "target formula records the classified verbstem route"),
                buildStep("#3 salida", "surface", "realization gate", route.targetUnit || "CNV route", "finite output waits for person, tense, and evidence fillers"),
            ]);
        }
        if (route.routeKind === "nounstem-class") {
            return buildProfile("exact-nounstem-class-route", [
                buildStep("#1 entrada", route.sourceFormulaType || "NOUNSTEM", "nounstem source", route.sourceUnit || "CNN predicate source", "user supplies the nounstem source"),
                buildStep("#2 formula", "class gate", "nounstem class condition", sourceGate.status || "nounstem-class-source", "the route checks nounstem class/source evidence"),
                buildStep("#2 formula", "CLASS/NUMBER/STATE", "nounstem class layer", "CNN_STEM(CLASS/NUMBER/STATE)", "class, number, and state belong to the nounstem/CNN stem frame"),
                buildStep("#2 formula", "CNN target", "classified CNN route", route.formulaTemplate || "NOUNSTEM_SOURCE -> CNN_STEM(CLASS/NUMBER/STATE)", "target formula records the classified nounstem route"),
                buildStep("#3 salida", "surface", "realization gate", route.targetUnit || "CNN formula route", "surface waits for subject/reference and state realization"),
            ]);
        }
        if (route.routeKind === "pronominal-source-route" || route.routeKind === "pronominal-nnc") {
            return buildProfile("exact-pronominal-cnn-route", [
                buildStep("#1 entrada", route.sourceFormulaType || "PRONOMINAL", "pronominal source", route.sourceUnit || "pronominal source", "user supplies the pronominal source"),
                buildStep("#2 formula", "source gate", "pronominal condition", sourceGate.status || "pronominal-source", "the route checks pronominal source evidence"),
                buildStep("#2 formula", "PRONOMINAL_SOURCE", "pronominal stem layer", "CNN(PRONOMINAL_ABSOLUTIVE_NNC)", "the pronominal source becomes the CNN predicate stem"),
                buildStep("#2 formula", "absolutive CNN", "CNN target formula", route.formulaTemplate || "PRONOMINAL_SOURCE -> CNN(PRONOMINAL_ABSOLUTIVE_NNC)", "target formula records the pronominal absolutive CNN"),
                buildStep("#3 salida", "surface", "realization gate", route.targetUnit || "CNN pronominal route", "surface waits for state/reference and Nawat/Pipil evidence"),
            ]);
        }
        if (route.routeKind === "formula-subposition-source-route") {
            return buildProfile("exact-formula-subposition-route", [
                buildStep("#1 entrada", route.sourceFormulaType || "FORMULA_SLOT", "formula slot source", route.sourceUnit || "formula subposition source", "user supplies the slot/subposition source"),
                buildStep("#2 formula", "slot gate", "slot source condition", sourceGate.status || "formula-slot-source", "the route checks the Andrews slot source"),
                buildStep("#2 formula", "subposition", "position layer", "FORMULA_SUBPOSITION_SOURCE", "the subposition is chosen before the target formula is filled"),
                buildStep("#2 formula", "POSITIONED_SLOT_FRAME", "positioned slot frame", route.formulaTemplate || "FORMULA_SUBPOSITION_SOURCE -> POSITIONED_SLOT_FRAME", "target formula records the positioned slot frame"),
                buildStep("#3 salida", "surface", "formula output", route.targetUnit || "slot-positioned formula frame", "surface waits for the CNV/CNN formula that uses the positioned slot"),
            ]);
        }
        if (route.routeKind === "subject-slot-source-route") {
            return buildProfile("exact-subject-slot-route", [
                buildStep("#1 entrada", route.sourceFormulaType || "CN", "subject source", route.sourceUnit || "subject slot source", "user supplies subject and predicate source evidence"),
                buildStep("#2 formula", "SUBJECT_SOURCE", "subject connector source", "SUBJECT_SOURCE", "the subject source fills the connector outside the predicate"),
                buildStep("#2 formula", "PREDICATE_SOURCE", "predicate source", "PREDICATE_SOURCE", "the predicate source supplies the parenthesized stem"),
                buildStep("#2 formula", "#pers1-pers2(STEM)...#", "CN formula shell", route.formulaTemplate || "SUBJECT_SOURCE+PREDICATE_SOURCE -> #pers1-pers2(STEM)...#", "target formula records the CNV/CNN participant shell"),
                buildStep("#3 salida", "surface", "realization gate", route.targetUnit || "CN participant formula route", "surface waits for concrete person, predicate, tense/state, and number fillers"),
            ]);
        }
        if (route.routeKind === "tense-slot-source-route") {
            return buildProfile("exact-tense-slot-route", [
                buildStep("#1 entrada", route.sourceFormulaType || "CNV", "CNV tense source", route.sourceUnit || "CNV tense source", "user supplies the CNV source stem and tense source"),
                buildStep("#2 formula", "CNV(SOURCE_STEM)", "predicate core", "CNV(SOURCE_STEM)", "the source stem remains inside the CNV predicate layer"),
                buildStep("#2 formula", "TENSE_SOURCE", "tense layer", "tense", "the tense source fills the CNV tense slot"),
                buildStep("#2 formula", "#pers1-...(STEM)tense-num1#", "tensed CNV shell", route.formulaTemplate || "CNV(SOURCE_STEM)+TENSE_SOURCE -> #pers1-...(STEM)tense-num1#", "target formula records the tensed CNV shell"),
                buildStep("#3 salida", "surface", "realization gate", route.targetUnit || "CNV tense formula route", "surface waits for person, number, and Nawat/Pipil evidence"),
            ]);
        }
        if (route.routeKind === "prefix-slot-source-route") {
            return buildProfile("exact-prefix-slot-route", [
                buildStep("#1 entrada", route.sourceFormulaType || "PREFIX+STEM", "prefix and stem source", route.sourceUnit || "prefix source", "user supplies the prefix source and stem source"),
                buildStep("#2 formula", "PREFIX_SOURCE", "prefix piece", "PREFIX_SOURCE", "the prefix is selected before the stem is routed"),
                buildStep("#2 formula", "STEM_SOURCE", "stem piece", "STEM_SOURCE", "the stem source supplies the predicate or target stem"),
                buildStep("#2 formula", "PREFIXED_FORMULA_ROUTE", "prefixed formula route", route.formulaTemplate || "PREFIX_SOURCE+STEM_SOURCE -> PREFIXED_FORMULA_ROUTE", "target formula records the prefixed route"),
                buildStep("#3 salida", "surface", "realization gate", route.targetUnit || "prefixed formula route", "surface waits for the target CNV/CNN route to license output"),
            ]);
        }
        if (route.routeKind === "suffix-slot-source-route") {
            return buildProfile("exact-suffix-slot-route", [
                buildStep("#1 entrada", route.sourceFormulaType || "STEM+SUFFIX", "stem and suffix source", route.sourceUnit || "suffix source", "user supplies source stem and suffix source"),
                buildStep("#2 formula", "SOURCE_STEM", "stem piece", "SOURCE_STEM", "the source stem is preserved before suffixing"),
                buildStep("#2 formula", "SUFFIX_SOURCE", "suffix piece", "SUFFIX_SOURCE", "the suffix source is added after the stem source"),
                buildStep("#2 formula", "SUFFIXED_ROUTE", "suffixed route", route.formulaTemplate || "SOURCE_STEM+SUFFIX_SOURCE -> SUFFIXED_ROUTE", "target formula records the suffixed stem or inflection route"),
                buildStep("#3 salida", "surface", "realization gate", route.targetUnit || "suffixed route", "surface waits for the derived route and evidence gates"),
            ]);
        }
        if (route.routeKind === "root-source-route") {
            return buildProfile("exact-root-to-stem-route", [
                buildStep("#1 entrada", route.sourceFormulaType || "ROOT", "root source", route.sourceUnit || "root source", "user supplies the root source"),
                buildStep("#2 formula", "root gate", "root source condition", sourceGate.status || "root-source", "the route checks root-source evidence"),
                buildStep("#2 formula", "STEM_SOURCE", "stem source layer", route.formulaTemplate || "ROOT_SOURCE -> STEM_SOURCE", "the root is promoted to a stem source"),
                buildStep("#3 salida", "surface", "stem output gate", route.targetUnit || "stem route", "surface waits for a later CNV/CNN route to use the stem"),
            ]);
        }
        if (route.routeKind === "irregular-vnc") {
            return buildProfile("exact-irregular-cnv-route", [
                buildStep("#1 entrada", route.sourceFormulaType || "CNV", "irregular CNV source", route.sourceUnit || "CNV source", "user supplies the irregular CNV source"),
                buildStep("#2 formula", "irregular gate", "irregular stem condition", sourceGate.status || "irregular-stem-source", "the route checks that the source is an irregular stem route"),
                buildStep("#2 formula", "IRREGULAR_CNV_SOURCE", "irregular stem layer", route.formulaTemplate || "IRREGULAR_CNV_SOURCE -> IRREGULAR_VNC_ROUTE", "target formula records the irregular CNV route"),
                buildStep("#3 salida", "surface", "realization gate", route.targetUnit || "irregular VNC route", "finite surface waits for person, tense, and evidence fillers"),
            ]);
        }
        if (route.routeKind === "expanded-vnc-sentence") {
            return buildProfile("exact-expanded-cnv-sentence-route", [
                buildStep("#1 entrada", route.sourceFormulaType || "CNV", "CNV source", route.sourceUnit || "CNV source", "user supplies the CNV source"),
                buildStep("#2 formula", "CNV_SOURCE", "clause source", "CNV_SOURCE", "the CNV supplies the sentence predicate source"),
                buildStep("#2 formula", "SENTENCE_LAYER", "sentence layer", "SENTENCE_LAYER", "the sentence layer expands the CNV beyond the nuclear clause"),
                buildStep("#2 formula", "EXPANDED_VNC_SENTENCE", "expanded sentence formula", route.formulaTemplate || "CNV_SOURCE+SENTENCE_LAYER -> EXPANDED_VNC_SENTENCE", "target formula records the expanded VNC sentence"),
                buildStep("#3 salida", "surface", "sentence output gate", route.targetUnit || "expanded VNC sentence", "surface waits for sentence context and concrete CNV realization"),
            ]);
        }
        if (route.routeKind === "optative-source-route" || route.routeKind === "optative-sentence") {
            return buildProfile("exact-optative-sentence-route", [
                buildStep("#1 entrada", route.sourceFormulaType || "CNV", "optative CNV source", route.sourceUnit || "optative CNV source", "user supplies the CNV source compatible with optative force"),
                buildStep("#2 formula", "optative gate", "optative condition", sourceGate.status || "optative-vnc-source", "the route checks optative source evidence"),
                buildStep("#2 formula", "OPTATIVE_CNV_SOURCE", "optative CNV layer", "OPTATIVE_CNV_SOURCE", "the CNV source is routed into wish/command force"),
                buildStep("#2 formula", "WISH_OR_COMMAND_SENTENCE", "optative sentence formula", route.formulaTemplate || "OPTATIVE_CNV_SOURCE -> WISH_OR_COMMAND_SENTENCE", "target formula records the optative sentence"),
                buildStep("#3 salida", "surface", "sentence output gate", route.targetUnit || "wish or command sentence", "surface waits for concrete optative morphology and context"),
            ]);
        }
        if (route.routeKind === "admonitive-sentence") {
            return buildProfile("exact-admonitive-sentence-route", [
                buildStep("#1 entrada", route.sourceFormulaType || "CNV", "admonitive CNV source", route.sourceUnit || "CNV source", "user supplies the CNV source compatible with admonitive force"),
                buildStep("#2 formula", "admonitive gate", "admonitive condition", sourceGate.status || "admonitive-vnc-source", "the route checks admonitive source evidence"),
                buildStep("#2 formula", "ADMONITIVE_CNV_SOURCE", "admonitive CNV layer", "ADMONITIVE_CNV_SOURCE", "the CNV source is routed into admonition force"),
                buildStep("#2 formula", "ADMONITION_SENTENCE", "admonitive sentence formula", route.formulaTemplate || "ADMONITIVE_CNV_SOURCE -> ADMONITION_SENTENCE", "target formula records the admonitive sentence"),
                buildStep("#3 salida", "surface", "sentence output gate", route.targetUnit || "admonition sentence", "surface waits for concrete admonitive morphology and context"),
            ]);
        }
        if (/supplementation/.test(route.routeKind || "")) {
            return buildProfile("exact-supplementation-relation-route", [
                buildStep("#1 entrada", route.sourceFormulaType || "CN+CN", "head/principal clause", "HEAD_OR_PRINCIPAL(CN)", "user supplies the head or principal clause"),
                buildStep("#2 formula", "SUPPLEMENT(CN/CNV)", "supplement piece", "SUPPLEMENT(CN/CNV)", "the supplement is attached as a separate clause/unit"),
                buildStep("#2 formula", "relation frame", "supplementation formula", route.formulaTemplate || "HEAD(CN)+SUPPLEMENT(CN) -> SUPPLEMENTATION_FRAME", "target formula records the supplementation relation"),
                buildStep("#3 salida", "surface", "relation output", route.targetUnit || "supplementation frame", "output is a relation frame unless a later route licenses word generation"),
            ]);
        }
        if (route.routeKind === "nominal-state-source-route") {
            return buildProfile("exact-nominal-state-slot-route", [
                buildStep("#1 entrada", route.sourceFormulaType || "CNN", "CNN state source", route.sourceUnit || "CNN state source", "user supplies the CNN stem and state source"),
                buildStep("#2 formula", "STEM", "predicate stem", "CNN(STEM)", "the predicate stem remains inside the CNN"),
                buildStep("#2 formula", "STATE_SOURCE", "state layer", "STEM+STATE_SOURCE", "state belongs to the predicate, not the connector"),
                buildStep("#2 formula", "#pers1-pers2(STEM)num1-num2#", "CNN formula shell", route.formulaTemplate || "CNN(STEM+STATE_SOURCE) -> #pers1-pers2(STEM)num1-num2#", "target formula records the ordinary CNN shell without tense"),
                buildStep("#3 salida", "surface", "realization gate", route.targetUnit || "CNN state formula route", "surface waits for subject/reference and Nawat/Pipil state realization"),
            ]);
        }
        if (route.routeKind === "possessive-source-route" || route.routeKind === "possessive-peculiarities") {
            return buildProfile("exact-possessive-source-route", [
                buildStep("#1 entrada", route.sourceFormulaType || "CNN", "possessive CNN source", route.sourceUnit || "possessive CNN source", "user supplies the possessive CNN source"),
                buildStep("#2 formula", "possession gate", "possessive source condition", sourceGate.status || "possessive-state-source", "the route checks natural/possessive source evidence"),
                buildStep("#2 formula", "POSSESSIVE_CNN_SOURCE", "possessive stem layer", "POSSESSIVE_CNN_SOURCE", "possessive material belongs inside the CNN predicate source"),
                buildStep("#2 formula", "POSSESSIVE_NNC_ROUTE", "possessive CNN target", route.formulaTemplate || "POSSESSIVE_CNN_SOURCE -> POSSESSIVE_NNC_ROUTE", "target formula records the possessive NNC route"),
                buildStep("#3 salida", "surface", "realization gate", route.targetUnit || "CNN possessive route", "surface waits for possessor, state, and reference fillers"),
            ]);
        }
        return buildProfile("exact-foundation-formula-route", [
            buildStep("#1 entrada", route.sourceFormulaType || "source", "foundation source", route.sourceUnit || "foundation source", "user supplies the basic CNV/CNN/source slot evidence"),
            buildStep("#2 formula", "foundation piece", "slot/category piece", route.requirementIds?.[0] || sourceGate.requirementIds?.[0] || route.routeKind, "the route adds the Andrews category, slot, state, class, or supplement relation"),
            buildStep("#2 formula", "target formula", "formula target", route.formulaTemplate || route.targetUnit || "foundation target", "target formula records the foundation generation shape"),
            buildStep("#3 salida", "surface", "realization gate", route.targetUnit || "foundation output", "surface waits for concrete fillers and route evidence"),
        ]);
    }

    if (route.routeFamily === "diagnostic-analysis") {
        const diagnosticTargetProfiles = {
            ADJECTIVAL: {
                profileKind: "exact-diagnostic-adjectival-frame-route",
                piece: "ADJECTIVAL",
                label: "adjectival target frame",
                note: "the diagnostic source is routed into an adjectival function frame",
            },
            ADVERBIAL: {
                profileKind: "exact-diagnostic-adverbial-frame-route",
                piece: "ADVERBIAL",
                label: "adverbial target frame",
                note: "the diagnostic source is routed into an adverbial function frame",
            },
            CLASSIFIED_ROUTE: {
                profileKind: "exact-diagnostic-classified-route",
                piece: "CLASSIFIED_ROUTE",
                label: "classified route frame",
                note: "the diagnostic source is classified into a reusable route frame",
            },
            CLAUSE_RELATION: {
                profileKind: "exact-diagnostic-clause-relation-route",
                piece: "CLAUSE_RELATION",
                label: "clause relation frame",
                note: "the diagnostic source builds a clause-relation frame",
            },
            CNN: {
                profileKind: "exact-diagnostic-cnn-route",
                piece: "CNN",
                label: "CNN target frame",
                note: "the diagnostic source is routed toward a CNN stem or CNN function frame",
            },
            CNV: {
                profileKind: "exact-diagnostic-cnv-route",
                piece: "CNV",
                label: "CNV target frame",
                note: "the diagnostic source is routed toward a CNV stem or CNV function frame",
            },
            "CNV/CNN": {
                profileKind: "exact-diagnostic-cnv-cnn-route",
                piece: "CNV/CNN",
                label: "CNV/CNN target frame",
                note: "the diagnostic source can feed either a CNV or CNN formula frame",
            },
            CONCEPT_FRAME: {
                profileKind: "exact-diagnostic-concept-frame-route",
                piece: "CONCEPT_FRAME",
                label: "concept frame",
                note: "the diagnostic source is identified as a grammar concept frame",
            },
            DERIVED_ROUTE: {
                profileKind: "exact-diagnostic-derived-route",
                piece: "DERIVED_ROUTE",
                label: "derived route frame",
                note: "the diagnostic source identifies a derived route without licensing a finite surface by itself",
            },
            DIAGNOSTIC: {
                profileKind: "exact-diagnostic-text-route",
                piece: "DIAGNOSTIC",
                label: "diagnostic frame",
                note: "the source is classified or cross-referenced without generating a word",
            },
            FORMULA_SLOT: {
                profileKind: "exact-diagnostic-formula-slot-route",
                piece: "FORMULA_SLOT",
                label: "formula slot frame",
                note: "the diagnostic source fills or explains a formula slot",
            },
            GRAMMAR_FRAME: {
                profileKind: "exact-diagnostic-grammar-frame-route",
                piece: "GRAMMAR_FRAME",
                label: "grammar frame",
                note: "the diagnostic source builds a reusable grammar frame",
            },
            MODIFICATION: {
                profileKind: "exact-diagnostic-modification-route",
                piece: "MODIFICATION",
                label: "modification frame",
                note: "the diagnostic source builds a head/modifier relation frame",
            },
            NAWAT_LETTERS: {
                profileKind: "exact-diagnostic-orthography-route",
                piece: "NAWAT_LETTERS",
                label: "orthography frame",
                note: "the diagnostic source records a spelling bridge or orthography frame",
            },
            PARTICLE_BOUNDARY: {
                profileKind: "exact-diagnostic-particle-boundary-route",
                piece: "PARTICLE_BOUNDARY",
                label: "particle boundary frame",
                note: "the diagnostic source identifies a particle boundary or introducer frame",
            },
            PHONOLOGY_FRAME: {
                profileKind: "exact-diagnostic-phonology-route",
                piece: "PHONOLOGY_FRAME",
                label: "phonology frame",
                note: "the diagnostic source builds a sound or phonology frame",
            },
            SENTENCE: {
                profileKind: "exact-diagnostic-sentence-route",
                piece: "SENTENCE",
                label: "sentence frame",
                note: "the diagnostic source is routed into a sentence frame",
            },
            STEM: {
                profileKind: "exact-diagnostic-stem-route",
                piece: "STEM",
                label: "stem frame",
                note: "the diagnostic source is routed into a stem frame for later CNV/CNN use",
            },
            TARGET_ROUTE: {
                profileKind: "exact-diagnostic-target-route",
                piece: "TARGET_ROUTE",
                label: "target route frame",
                note: "the diagnostic source points from a source route to a resulting target route",
            },
        };
        const diagnosticTargetProfile = diagnosticTargetProfiles[route.targetFormulaType || ""];
        if (diagnosticTargetProfile) {
            return buildProfile(diagnosticTargetProfile.profileKind, [
                buildStep("#1 entrada", route.sourceFormulaType || "TEXT", "diagnostic source", route.sourceUnit || "textual/diagnostic source", "user supplies source text, example evidence, or diagnostic material"),
                buildStep("#2 formula", "source gate", "diagnostic source condition", sourceGate.status || route.requirementIds?.[0] || route.routeKind, "the route checks the Andrews source before assigning a target frame"),
                buildStep("#2 formula", diagnosticTargetProfile.piece, diagnosticTargetProfile.label, route.formulaTemplate || route.targetUnit || diagnosticTargetProfile.piece, diagnosticTargetProfile.note),
                buildStep("#3 salida", "surface", "diagnostic output", route.targetUnit || diagnosticTargetProfile.piece, "output remains a diagnostic/frame result unless a later route licenses a surface"),
            ]);
        }
        return buildProfile("exact-diagnostic-analysis-route", [
            buildStep("#1 entrada", route.sourceFormulaType || "TEXT", "analysis source", route.sourceUnit || "textual/diagnostic source", "user supplies source text, example evidence, or diagnostic material"),
            buildStep("#2 formula", "diagnostic piece", "classification piece", route.requirementIds?.[0] || sourceGate.requirementIds?.[0] || route.routeKind, "the route classifies the source without inventing a generated surface"),
            buildStep("#2 formula", "diagnostic frame", "target diagnostic frame", route.formulaTemplate || route.targetUnit || "diagnostic frame", "target formula records the analysis frame"),
            buildStep("#3 salida", "surface", "diagnostic gate", route.targetUnit || "diagnostic output", "diagnostic output remains non-generative unless a later route licenses a surface"),
        ]);
    }

    const steps = [
        buildStep(
            "#1 entrada",
            route.sourceFormulaType || "source",
            "source gate",
            route.sourceUnit || route.andrewsRefs?.[0] || route.routeKind || "source",
            sourceGate.status || "source-gated Andrews route"
        ),
    ];
    (Array.isArray(sourceGate.requirementIds) ? sourceGate.requirementIds : route.requirementIds || []).forEach((requirementId) => {
        steps.push(buildStep(
            "#2 formula",
            requirementId,
            "required piece",
            requirementId,
            "route cannot build without this source condition"
        ));
    });
    if (sourcePathFormula) {
        steps.push(buildStep(
            "#2 formula",
            "source path",
            "route path",
            sourcePathFormula,
            structuralInfo.logicPathType || structuralInfo.keywordRouteBasis || route.operation || "Andrews source-to-target path"
        ));
    }
    if (route.formulaTemplate) {
        steps.push(buildStep(
            "#2 formula",
            "target template",
            "formula build",
            route.formulaTemplate,
            route.operation || "target formula template"
        ));
    }
    steps.push(buildStep(
        "#3 salida",
        structuralInfo.exampleSurface ? "surface" : (route.targetFormulaType || "target"),
        structuralInfo.exampleSurface ? "realization" : "target gate",
        structuralInfo.exampleSurface || route.targetUnit || route.targetFormulaType || route.routeKind || "target",
        structuralInfo.exampleSurface ? "licensed route example surface" : "surface is built only when the route has enough evidence"
    ));
    return buildProfile("source-gated-scaffold", steps);
}

function withAndrewsRoutePuzzleStackTemplate(route = {}) {
    return {
        ...route,
        puzzleStackTemplate: buildAndrewsRoutePuzzleStackTemplate(route),
    };
}

const ANDREWS_INTERNAL_KEYWORD_ROUTE_SPECS = Object.freeze([
    ["causative", {
        routeFamily: "forward-derivation",
        routeKind: "causative-source-route",
        sourceUnit: "CNV causative-compatible source",
        targetUnit: "derived CNV causative stem",
        sourceFormulaType: "CNV",
        targetFormulaType: "CNV",
        formulaTemplate: "CNV(SOURCE_STEM) -> CNV(CAUSATIVE_STEM)",
        operation: "source-stem-to-causative-route",
        requirementIds: ["causative-source-stem"],
        structuralInfo: { derivationalLayer: "causative" },
    }],
    ["applicative", {
        routeFamily: "forward-derivation",
        routeKind: "applicative-source-route",
        sourceUnit: "CNV applicative-compatible source",
        targetUnit: "derived CNV applicative stem",
        sourceFormulaType: "CNV",
        targetFormulaType: "CNV",
        formulaTemplate: "CNV(SOURCE_STEM) -> CNV(APPLICATIVE_STEM)",
        operation: "source-stem-to-applicative-route",
        requirementIds: ["applicative-compatible-source-stem"],
        structuralInfo: { derivationalLayer: "applicative" },
    }],
    ["frequentative", {
        routeFamily: "forward-derivation",
        routeKind: "frequentative-source-route",
        sourceUnit: "CNV repeatable source",
        targetUnit: "derived CNV frequentative stem",
        sourceFormulaType: "CNV",
        targetFormulaType: "CNV",
        formulaTemplate: "CNV(SOURCE_STEM) -> CNV(FREQUENTATIVE_STEM[REDUP])",
        operation: "source-stem-to-frequentative-route",
        requirementIds: ["frequentative-type-source"],
        structuralInfo: { derivationalLayer: "frequentative" },
    }],
    ["passive", {
        routeFamily: "vnc-source-route",
        routeKind: "passive-source-route",
        sourceUnit: "CNV source with promotable object",
        targetUnit: "CNV passive source stem",
        sourceFormulaType: "CNV",
        targetFormulaType: "CNV",
        formulaTemplate: "CNV(SOURCE_WITH_PROMOTABLE_OBJECT) -> CNV(PASSIVE_SOURCE_STEM)",
        operation: "source-with-promotable-object-to-passive-route",
        requirementIds: ["promotable-object-source"],
        structuralInfo: { voiceLayer: "passive" },
    }],
    ["impersonal-voice", {
        routeFamily: "vnc-source-route",
        routeKind: "impersonal-source-route",
        sourceUnit: "CNV impersonal-compatible source",
        targetUnit: "CNV impersonal source stem",
        sourceFormulaType: "CNV",
        targetFormulaType: "CNV",
        formulaTemplate: "CNV(SOURCE_WITH_IMPERSONAL_COMPATIBLE_SUBJECT) -> CNV(IMPERSONAL_SOURCE_STEM)",
        operation: "source-with-compatible-subject-to-impersonal-route",
        requirementIds: ["impersonal-compatible-source"],
        structuralInfo: { voiceLayer: "impersonal" },
    }],
    ["patientive", {
        routeFamily: "nominalization",
        routeKind: "patientive-source-route",
        sourceUnit: "CNV/root/stock patientive source",
        targetUnit: "CNN patientive nounstem",
        sourceFormulaType: "CNV/ROOT/STOCK",
        targetFormulaType: "CNN",
        formulaTemplate: "CNV/ROOT/STOCK(SOURCE) -> CNN(PATIENTIVE_NOUNSTEM)",
        operation: "source-to-patientive-nounstem-route",
        requirementIds: ["patientive-family-source"],
        structuralInfo: { derivationalLayer: "patientive" },
    }],
    ["destockal", {
        routeFamily: "denominal-lesson",
        routeKind: "destockal-denominal-source-route",
        sourceUnit: "CNN/stock source",
        targetUnit: "CNV denominal verbstem",
        sourceFormulaType: "CNN/STOCK",
        targetFormulaType: "CNV",
        formulaTemplate: "CNN/STOCK(SOURCE) -> CNV(DENOMINAL_VERBSTEM)",
        operation: "stock-or-noun-source-to-denominal-verbstem-route",
        requirementIds: ["nounstem-source", "target-stem-class-contract"],
        structuralInfo: { derivationalLayer: "denominal/destockal" },
    }],
    ["deverbal", {
        routeFamily: "nominalization",
        routeKind: "deverbal-nounstem-source-route",
        sourceUnit: "CNV source core",
        targetUnit: "CNN deverbal nounstem",
        sourceFormulaType: "CNV",
        targetFormulaType: "CNN",
        formulaTemplate: "CNV(SOURCE_CORE) -> CNN(DEVERBAL_NOUNSTEM)",
        operation: "source-core-to-deverbal-nounstem-route",
        requirementIds: ["deverbal-source-core"],
        structuralInfo: { derivationalLayer: "deverbal" },
    }],
    ["adjectival", {
        routeFamily: "nnc-function",
        routeKind: "adjectival-function-source-route",
        sourceUnit: "CNN/CNV adjectival source",
        targetUnit: "adjectival function frame",
        sourceFormulaType: "CNN/CNV",
        targetFormulaType: "ADJECTIVAL",
        formulaTemplate: "CNN/CNV(SOURCE) -> ADJECTIVAL_FUNCTION(SOURCE_STEM)",
        operation: "source-to-adjectival-function-route",
        requirementIds: ["adjectival-nnc-source"],
        structuralInfo: { functionLayer: "adjectival" },
    }],
    ["adverbial", {
        routeFamily: "nnc-function",
        routeKind: "adverbial-function-source-route",
        sourceUnit: "CNV/CNN adverbializable source",
        targetUnit: "adverbial function frame",
        sourceFormulaType: "CNV/CNN",
        targetFormulaType: "ADVERBIAL",
        formulaTemplate: "CNV/CNN(SOURCE) -> ADVERBIAL_FUNCTION(SOURCE)",
        operation: "source-to-adverbial-function-route",
        requirementIds: ["adverbializable-vnc-or-nnc-source"],
        structuralInfo: { functionLayer: "adverbial" },
    }],
    ["locative", {
        routeFamily: "relational-nnc",
        routeKind: "locative-relational-matrix-route",
        sourceUnit: "CNV/CNN locative-compatible source",
        targetUnit: "CNN locative relational stem",
        sourceFormulaType: "CNV/CNN",
        targetFormulaType: "CNN",
        formulaTemplate: "SOURCE+LOCATIVE_MATRIX(-n) -> CNN(LOCATIVE_RELATIONAL_NNC)",
        operation: "source-plus-locative-matrix-route",
        requirementIds: ["locative-source", "locative-matrix-source"],
        structuralInfo: { relationalMatrix: "(-n)-tli-" },
    }],
    ["place-name", {
        routeFamily: "nnc-function",
        routeKind: "place-name-source-route",
        sourceUnit: "place source",
        targetUnit: "CNN place-name stem",
        sourceFormulaType: "PLACE_SOURCE",
        targetFormulaType: "CNN",
        formulaTemplate: "PLACE_SOURCE -> CNN(PLACE_NAME_NNC)",
        operation: "place-source-to-place-name-route",
        requirementIds: ["place-or-gentilic-source"],
        structuralInfo: { functionLayer: "place-name" },
    }],
    ["gentilic", {
        routeFamily: "nnc-function",
        routeKind: "gentilic-source-route",
        sourceUnit: "place or community source",
        targetUnit: "CNN gentilic stem",
        sourceFormulaType: "PLACE_SOURCE",
        targetFormulaType: "CNN",
        formulaTemplate: "PLACE_OR_COMMUNITY_SOURCE -> CNN(GENTILIC_NNC)",
        operation: "place-source-to-gentilic-route",
        requirementIds: ["place-or-gentilic-source"],
        structuralInfo: { functionLayer: "gentilic" },
    }],
    ["possessive-state", {
        routeFamily: "foundation-route",
        routeKind: "possessive-state-source-route",
        sourceUnit: "CNN possessive-state source",
        targetUnit: "CNN possessive formula route",
        sourceFormulaType: "CNN",
        targetFormulaType: "CNN",
        formulaTemplate: "#pers1-pers2(POSESSIVE_STEM+STATE)num1-num2#",
        operation: "possessive-state-source-to-cnn-route",
        requirementIds: ["possessive-state-source"],
        structuralInfo: { stateLayer: "possessive-state" },
    }],
    ["absolutive-state", {
        routeFamily: "foundation-route",
        routeKind: "absolutive-state-source-route",
        sourceUnit: "CNN absolutive-state source",
        targetUnit: "CNN absolutive formula route",
        sourceFormulaType: "CNN",
        targetFormulaType: "CNN",
        formulaTemplate: "#pers1-pers2(STEM)num1-num2#",
        operation: "absolutive-state-source-to-cnn-route",
        requirementIds: ["absolutive-state-source"],
        structuralInfo: { stateLayer: "absolutive-state" },
    }],
    ["supplementary", {
        routeFamily: "foundation-route",
        routeKind: "supplementation-source-route",
        sourceUnit: "CN/CNV supplement source",
        targetUnit: "supplementation frame",
        sourceFormulaType: "CN+CN",
        targetFormulaType: "SENTENCE_RELATION",
        formulaTemplate: "HEAD(CN)+SUPPLEMENT(CN) -> SUPPLEMENTATION_FRAME",
        operation: "source-clauses-to-supplementation-route",
        requirementIds: ["supplement-source"],
        structuralInfo: { relationLayer: "supplementation" },
    }],
    ["conjunction", {
        routeFamily: "clause-relation",
        routeKind: "conjunction-source-route",
        sourceUnit: "conjunct CN source",
        targetUnit: "conjunction AST",
        sourceFormulaType: "CN+CN",
        targetFormulaType: "CLAUSE_RELATION",
        formulaTemplate: "CONJUNCT(CN)+CONJUNCT(CN) -> CONJUNCTION_AST",
        operation: "conjunct-sources-to-conjunction-route",
        requirementIds: ["conjunct-source"],
        structuralInfo: { relationLayer: "conjunction" },
    }],
    ["comparison", {
        routeFamily: "clause-relation",
        routeKind: "comparison-source-route",
        sourceUnit: "comparison source clauses",
        targetUnit: "comparison structure",
        sourceFormulaType: "CN+CN",
        targetFormulaType: "CLAUSE_RELATION",
        formulaTemplate: "COMPARAND(CN)+STANDARD(CN)+COMPARISON_MARKER -> COMPARISON_STRUCTURE",
        operation: "comparison-sources-to-comparison-route",
        requirementIds: ["comparison-marker-source"],
        structuralInfo: { relationLayer: "comparison" },
    }],
    ["complement", {
        routeFamily: "clause-relation",
        routeKind: "complement-source-route",
        sourceUnit: "principal and complement CN source",
        targetUnit: "complement AST",
        sourceFormulaType: "CN+CN",
        targetFormulaType: "CLAUSE_RELATION",
        formulaTemplate: "PRINCIPAL(CN)+COMPLEMENT(CN) -> COMPLEMENT_AST",
        operation: "source-clauses-to-complement-route",
        requirementIds: ["complement-clause-source"],
        structuralInfo: { relationLayer: "complement" },
    }],
    ["adjoined", {
        routeFamily: "clause-relation",
        routeKind: "adjoined-clause-source-route",
        sourceUnit: "head and adjoined CN source",
        targetUnit: "adverbial relation AST",
        sourceFormulaType: "CN+CN",
        targetFormulaType: "CLAUSE_RELATION",
        formulaTemplate: "HEAD(CN)+ADJOINED_UNIT(CN) -> ADVERBIAL_RELATION_AST",
        operation: "source-clauses-to-adjoined-route",
        requirementIds: ["adjoined-unit-source"],
        structuralInfo: { relationLayer: "adjoined-clause" },
    }],
    ["optative", {
        routeFamily: "foundation-route",
        routeKind: "optative-source-route",
        sourceUnit: "optative CNV source",
        targetUnit: "wish or command sentence",
        sourceFormulaType: "CNV",
        targetFormulaType: "SENTENCE",
        formulaTemplate: "OPTATIVE_CNV_SOURCE -> WISH_OR_COMMAND_SENTENCE",
        operation: "optative-cnv-source-routing",
        requirementIds: ["optative-vnc-source"],
        structuralInfo: { sentenceLayer: "optative" },
    }],
    ["intransitive", {
        routeFamily: "foundation-route",
        routeKind: "intransitive-source-route",
        sourceUnit: "intransitive CNV source",
        targetUnit: "CNV formula route",
        sourceFormulaType: "CNV",
        targetFormulaType: "CNV",
        formulaTemplate: "#pers1(STEM)tense-num1#",
        operation: "intransitive-stem-source-routing",
        requirementIds: ["intransitive-stem-source"],
        structuralInfo: { valenceLayer: "intransitive" },
    }],
    ["transitive", {
        routeFamily: "foundation-route",
        routeKind: "transitive-source-route",
        sourceUnit: "transitive CNV source",
        targetUnit: "CNV formula route",
        sourceFormulaType: "CNV",
        targetFormulaType: "CNV",
        formulaTemplate: "#pers1-val1-val2(STEM)tense-num1# OR #pers1-val(STEM)tense-num1#",
        operation: "transitive-stem-source-routing",
        requirementIds: ["transitive-stem-source"],
        structuralInfo: { valenceLayer: "transitive" },
    }],
    ["object", {
        routeFamily: "vnc-source-route",
        routeKind: "object-role-source-route",
        sourceUnit: "CNV object-role source",
        targetUnit: "CNV object formula route",
        sourceFormulaType: "CNV",
        targetFormulaType: "CNV",
        formulaTemplate: "CNV(SOURCE_STEM+OBJECT_ROLES) -> CNV(MAINLINE/SHUNTLINE_OBJECT_FORMULA)",
        operation: "object-role-source-routing",
        requirementIds: ["object-role-source"],
        structuralInfo: { valenceLayer: "object-role" },
    }],
    ["nonactive", {
        routeFamily: "vnc-source-route",
        routeKind: "nonactive-source-route",
        sourceUnit: "active imperfective CNV source",
        targetUnit: "CNV nonactive stem",
        sourceFormulaType: "CNV",
        targetFormulaType: "CNV",
        formulaTemplate: "CNV(ACTIVE_IMPERFECTIVE_STEM) -> CNV(NONACTIVE_STEM)",
        operation: "active-source-to-nonactive-route",
        requirementIds: ["active-imperfective-stem-source"],
        structuralInfo: { voiceLayer: "nonactive" },
    }],
    ["pronoun", {
        routeFamily: "foundation-route",
        routeKind: "pronominal-source-route",
        sourceUnit: "pronominal source",
        targetUnit: "CNN pronominal route",
        sourceFormulaType: "PRONOMINAL",
        targetFormulaType: "CNN",
        formulaTemplate: "PRONOMINAL_SOURCE -> CNN(PRONOMINAL_ABSOLUTIVE_NNC)",
        operation: "pronominal-source-routing",
        requirementIds: ["pronominal-source"],
        structuralInfo: { sourceLayer: "pronominal" },
    }],
    ["numeral", {
        routeFamily: "derivational-boundary",
        routeKind: "numeral-source-route",
        sourceUnit: "numeral source",
        targetUnit: "CNN numeral route",
        sourceFormulaType: "NUMERAL",
        targetFormulaType: "CNN",
        formulaTemplate: "NUMERAL_SOURCE -> CNN(ABSOLUTIVE_CARDINAL_NUMERAL_NNC)",
        operation: "numeral-source-to-nnc-route",
        requirementIds: ["numeral-lexeme-source"],
        structuralInfo: { sourceLayer: "numeral" },
    }],
    ["compound", {
        routeFamily: "derivational-boundary",
        routeKind: "compound-source-route",
        sourceUnit: "compound source",
        targetUnit: "compound stem route",
        sourceFormulaType: "CNV/CNN+MATRIX",
        targetFormulaType: "CNV/CNN",
        formulaTemplate: "SOURCE+MATRIX -> COMPOUND_STEM_ROUTE",
        operation: "source-plus-matrix-to-compound-route",
        requirementIds: ["compound-source", "matrix-or-context-source"],
        structuralInfo: { derivationalLayer: "compound" },
    }],
    ["matrix", {
        routeFamily: "derivational-boundary",
        routeKind: "matrix-source-route",
        sourceUnit: "matrix-bearing source",
        targetUnit: "matrix-composed route",
        sourceFormulaType: "SOURCE+MATRIX",
        targetFormulaType: "DERIVED_ROUTE",
        formulaTemplate: "SOURCE+MATRIX -> MATRIX_COMPOSED_ROUTE",
        operation: "source-plus-matrix-route",
        requirementIds: ["matrix-or-context-source"],
        structuralInfo: { derivationalLayer: "matrix composition" },
    }],
    ["subject", {
        routeFamily: "foundation-route",
        routeKind: "subject-slot-source-route",
        sourceUnit: "subject slot source",
        targetUnit: "CN participant formula route",
        sourceFormulaType: "CN",
        targetFormulaType: "CNV/CNN",
        formulaTemplate: "SUBJECT_SOURCE+PREDICATE_SOURCE -> #pers1-pers2(STEM)...#",
        operation: "subject-source-to-nuclear-clause-route",
        requirementIds: ["subject-slot-source", "predicate-source"],
        structuralInfo: { participantLayer: "subject" },
    }],
    ["subposition", {
        routeFamily: "foundation-route",
        routeKind: "formula-subposition-source-route",
        sourceUnit: "formula subposition source",
        targetUnit: "slot-positioned formula frame",
        sourceFormulaType: "FORMULA_SLOT",
        targetFormulaType: "CNV/CNN",
        formulaTemplate: "FORMULA_SUBPOSITION_SOURCE -> POSITIONED_SLOT_FRAME",
        operation: "subposition-source-to-slot-frame-route",
        requirementIds: ["formula-slot-source"],
        structuralInfo: { boundaryLayer: "formula subposition" },
    }],
    ["tense", {
        routeFamily: "foundation-route",
        routeKind: "tense-slot-source-route",
        sourceUnit: "CNV tense source",
        targetUnit: "CNV tense formula route",
        sourceFormulaType: "CNV",
        targetFormulaType: "CNV",
        formulaTemplate: "CNV(SOURCE_STEM)+TENSE_SOURCE -> #pers1-...(STEM)tense-num1#",
        operation: "tense-source-to-cnv-route",
        requirementIds: ["tense-source", "predicate-source"],
        structuralInfo: { inflectionLayer: "tense" },
    }],
    ["state", {
        routeFamily: "foundation-route",
        routeKind: "nominal-state-source-route",
        sourceUnit: "CNN state source",
        targetUnit: "CNN state formula route",
        sourceFormulaType: "CNN",
        targetFormulaType: "CNN",
        formulaTemplate: "CNN(STEM+STATE_SOURCE) -> #pers1-pers2(STEM)num1-num2#",
        operation: "state-source-to-cnn-route",
        requirementIds: ["nominal-state-source"],
        structuralInfo: { stateLayer: "nominal-state" },
    }],
    ["root", {
        routeFamily: "foundation-route",
        routeKind: "root-source-route",
        sourceUnit: "root source",
        targetUnit: "stem route",
        sourceFormulaType: "ROOT",
        targetFormulaType: "STEM",
        formulaTemplate: "ROOT_SOURCE -> STEM_SOURCE",
        operation: "root-source-to-stem-route",
        requirementIds: ["root-source"],
        structuralInfo: { stemLayer: "root" },
    }],
    ["suffix", {
        routeFamily: "foundation-route",
        routeKind: "suffix-slot-source-route",
        sourceUnit: "suffix source",
        targetUnit: "suffixed stem or inflection route",
        sourceFormulaType: "STEM+SUFFIX",
        targetFormulaType: "DERIVED_ROUTE",
        formulaTemplate: "SOURCE_STEM+SUFFIX_SOURCE -> SUFFIXED_ROUTE",
        operation: "suffix-source-to-route",
        requirementIds: ["suffix-source"],
        structuralInfo: { affixLayer: "suffix" },
    }],
    ["prefix", {
        routeFamily: "foundation-route",
        routeKind: "prefix-slot-source-route",
        sourceUnit: "prefix source",
        targetUnit: "prefixed formula route",
        sourceFormulaType: "PREFIX+STEM",
        targetFormulaType: "CNV/CNN",
        formulaTemplate: "PREFIX_SOURCE+STEM_SOURCE -> PREFIXED_FORMULA_ROUTE",
        operation: "prefix-source-to-route",
        requirementIds: ["prefix-source"],
        structuralInfo: { affixLayer: "prefix" },
    }],
    ["perfective", {
        routeFamily: "vnc-source-route",
        routeKind: "perfective-source-route",
        sourceUnit: "CNV perfective source",
        targetUnit: "CNV perfective formula route",
        sourceFormulaType: "CNV",
        targetFormulaType: "CNV",
        formulaTemplate: "CNV(SOURCE_STEM)+PERFECTIVE_SOURCE -> CNV(PERFECTIVE_ROUTE)",
        operation: "perfective-source-to-cnv-route",
        requirementIds: ["perfective-source"],
        structuralInfo: { tenseAspectLayer: "perfective" },
    }],
    ["present", {
        routeFamily: "vnc-source-route",
        routeKind: "present-source-route",
        sourceUnit: "CNV present source",
        targetUnit: "CNV present formula route",
        sourceFormulaType: "CNV",
        targetFormulaType: "CNV",
        formulaTemplate: "CNV(SOURCE_STEM)+PRESENT_SOURCE -> CNV(PRESENT_ROUTE)",
        operation: "present-source-to-cnv-route",
        requirementIds: ["present-source"],
        structuralInfo: { tenseAspectLayer: "present" },
    }],
    ["past", {
        routeFamily: "vnc-source-route",
        routeKind: "past-source-route",
        sourceUnit: "CNV past source",
        targetUnit: "CNV past formula route",
        sourceFormulaType: "CNV",
        targetFormulaType: "CNV",
        formulaTemplate: "CNV(SOURCE_STEM)+PAST_SOURCE -> CNV(PAST_ROUTE)",
        operation: "past-source-to-cnv-route",
        requirementIds: ["past-source"],
        structuralInfo: { tenseAspectLayer: "past" },
    }],
    ["active", {
        routeFamily: "vnc-source-route",
        routeKind: "active-voice-source-route",
        sourceUnit: "CNV active source",
        targetUnit: "CNV active voice route",
        sourceFormulaType: "CNV",
        targetFormulaType: "CNV",
        formulaTemplate: "CNV(ACTIVE_SOURCE_STEM) -> CNV(ACTIVE_VOICE_ROUTE)",
        operation: "active-source-to-voice-route",
        requirementIds: ["active-source"],
        structuralInfo: { voiceLayer: "active" },
    }],
    ["formation", {
        routeFamily: "derivational-boundary",
        routeKind: "formation-procedure-source-route",
        sourceUnit: "formation procedure source",
        targetUnit: "formed grammar route",
        sourceFormulaType: "FORMATION_SOURCE",
        targetFormulaType: "DERIVED_ROUTE",
        formulaTemplate: "FORMATION_SOURCE+INPUT_SOURCE -> FORMED_ROUTE",
        operation: "formation-source-to-derived-route",
        requirementIds: ["formation-source"],
        structuralInfo: { derivationalLayer: "formation procedure" },
    }],
    ["tli", {
        routeFamily: "nnc-function",
        routeKind: "tli-state-source-route",
        sourceUnit: "CNN tli-state source",
        targetUnit: "CNN tli-state route",
        sourceFormulaType: "CNN",
        targetFormulaType: "CNN",
        formulaTemplate: "CNN(STEM+tli_STATE_SOURCE) -> CNN(tli_STATE_ROUTE)",
        operation: "tli-state-source-to-cnn-route",
        requirementIds: ["tli-state-source"],
        structuralInfo: { stateLayer: "tli" },
    }],
    ["locus", {
        routeFamily: "relational-nnc",
        routeKind: "locus-relational-source-route",
        sourceUnit: "locus source",
        targetUnit: "relational NNC route",
        sourceFormulaType: "LOCUS_SOURCE",
        targetFormulaType: "CNN",
        formulaTemplate: "LOCUS_SOURCE+RELATIONAL_MATRIX -> CNN(RELATIONAL_NNC)",
        operation: "locus-source-to-relational-route",
        requirementIds: ["locus-source", "relational-nounstem-source"],
        structuralInfo: { relationalLayer: "locus" },
    }],
    ["possessive", {
        routeFamily: "foundation-route",
        routeKind: "possessive-source-route",
        sourceUnit: "possessive CNN source",
        targetUnit: "CNN possessive route",
        sourceFormulaType: "CNN",
        targetFormulaType: "CNN",
        formulaTemplate: "POSSESSIVE_CNN_SOURCE -> POSSESSIVE_NNC_ROUTE",
        operation: "possessive-source-to-cnn-route",
        requirementIds: ["possessive-state-source"],
        structuralInfo: { stateLayer: "possessive" },
    }],
    ["absolutive", {
        routeFamily: "foundation-route",
        routeKind: "absolutive-source-route",
        sourceUnit: "absolutive CNN source",
        targetUnit: "CNN absolutive route",
        sourceFormulaType: "CNN",
        targetFormulaType: "CNN",
        formulaTemplate: "ABSOLUTIVE_CNN_SOURCE -> ABSOLUTIVE_NNC_ROUTE",
        operation: "absolutive-source-to-cnn-route",
        requirementIds: ["absolutive-state-source"],
        structuralInfo: { stateLayer: "absolutive" },
    }],
    ["class", {
        routeFamily: "foundation-route",
        routeKind: "stem-classification-source-route",
        sourceUnit: "stem class source",
        targetUnit: "classified stem frame",
        sourceFormulaType: "STEM_SOURCE",
        targetFormulaType: "CLASSIFIED_STEM",
        formulaTemplate: "STEM_SOURCE -> CLASSIFIED_STEM(CLASS/NUMBER/STATE)",
        operation: "stem-source-to-classification-route",
        requirementIds: ["stem-class-source"],
        structuralInfo: { classificationLayer: "stem-class" },
    }],
    ["embed", {
        routeFamily: "derivational-boundary",
        routeKind: "embedded-source-compound-route",
        sourceUnit: "embedded CNV/CNN source",
        targetUnit: "compound CNV/CNN route",
        sourceFormulaType: "CNV/CNN",
        targetFormulaType: "CNV/CNN",
        formulaTemplate: "EMBED(CNV/CNN)+MATRIX -> COMPOUND(CNV/CNN)",
        operation: "embedded-source-to-compound-route",
        requirementIds: ["embedded-source-formula", "matrix-or-context-source"],
        structuralInfo: { derivationalLayer: "embedded compound" },
    }],
]);

const ANDREWS_INTERNAL_FALLBACK_KEYWORD_ROUTE_SPECS = Object.freeze([
    ["referenced internally; pypdf did not expose a clean item boundary", "cross-reference", "TEXT", "DIAGNOSTIC", "ANDREWS_CROSS_REFERENCE_SOURCE -> INTERNAL_ROUTE_POINTER"],
    ["structure", "structural-frame", "STRUCTURE_SOURCE", "GRAMMAR_FRAME", "STRUCTURE_SOURCE -> GRAMMAR_FRAME"],
    ["construction", "construction-frame", "CONSTRUCTION_SOURCE", "GRAMMAR_FRAME", "CONSTRUCTION_SOURCE -> CONSTRUCTION_FRAME"],
    ["type", "type-classification", "TYPE_SOURCE", "CLASSIFIED_ROUTE", "TYPE_SOURCE -> CLASSIFIED_ROUTE_FRAME"],
    ["number", "number-slot", "NUMBER_SOURCE", "CNV/CNN", "NUMBER_SOURCE+PREDICATE_SOURCE -> NUMBERED_FORMULA_ROUTE"],
    ["amount", "amount-quantification", "QUANTITY_SOURCE", "CNN", "QUANTITY_SOURCE -> QUANTIFIED_NNC_ROUTE"],
    ["person", "person-slot", "PERSON_SOURCE", "CNV/CNN", "PERSON_SOURCE+PREDICATE_SOURCE -> PARTICIPANT_FORMULA_ROUTE"],
    ["pronominal", "pronominal-source", "PRONOMINAL", "CNN", "PRONOMINAL_SOURCE -> CNN(PRONOMINAL_ROUTE)"],
    ["pronouns", "pronominal-source", "PRONOMINAL", "CNN", "PRONOMINAL_SOURCE -> CNN(PRONOMINAL_ROUTE)"],
    ["translated", "translation-diagnostic", "TEXT", "DIAGNOSTIC", "SOURCE_TEXT+TRANSLATION_SOURCE -> TRANSLATION_DIAGNOSTIC_FRAME"],
    ["means", "semantic-equivalence", "TEXT", "DIAGNOSTIC", "SOURCE_MEANING -> SEMANTIC_FUNCTION_FRAME"],
    ["meaning", "semantic-equivalence", "TEXT", "DIAGNOSTIC", "SOURCE_MEANING -> SEMANTIC_FUNCTION_FRAME"],
    ["modification", "modification-relation", "CN+CN", "MODIFICATION", "HEAD(CN)+MODIFIER(CN) -> MODIFICATION_FRAME"],
    ["token-level", "token-representation", "TOKEN_SOURCE", "REPRESENTATION_FRAME", "TOKEN_SOURCE -> REPRESENTATION_FRAME"],
    ["representation", "representation-frame", "SOURCE_TOKEN", "REPRESENTATION_FRAME", "SOURCE_TOKEN -> REPRESENTATION_FRAME"],
    ["tenses", "tense-slot", "CNV", "CNV", "TENSE_SOURCE+CNV(SOURCE_STEM) -> TENSED_CNV_ROUTE"],
    ["verb", "verbal-source", "CNV", "CNV", "VERB_SOURCE -> CNV_ROUTE"],
    ["ending", "ending-slot", "STEM+ENDING", "DERIVED_ROUTE", "SOURCE_STEM+ENDING_SOURCE -> ENDING_ROUTE"],
    ["doings", "action-nominal-source", "CNV", "CNN", "CNV(ACTION_SOURCE) -> CNN(ACTION_NOMINAL_ROUTE)"],
    ["dos", "action-nominal-source", "CNV", "CNN", "CNV(ACTION_SOURCE) -> CNN(ACTION_NOMINAL_ROUTE)"],
    ["m-o", "reflexive-prefix-source", "CNV", "CNV", "REFLEXIVE_PREFIX_SOURCE+CNV(SOURCE_STEM) -> REFLEXIVE_CNV_ROUTE"],
    ["location", "locative-source", "LOCATIVE_SOURCE", "CNN", "LOCATION_SOURCE -> CNN(LOCATIVE_ROUTE)"],
    ["place", "place-source", "PLACE_SOURCE", "CNN", "PLACE_SOURCE -> CNN(PLACE_ROUTE)"],
    ["phonological", "phonological-frame", "SOUND_SOURCE", "PHONOLOGY_FRAME", "SOUND_SOURCE -> PHONOLOGY_FRAME"],
    ["vowel", "vowel-phonology", "VOWEL_SOURCE", "PHONOLOGY_FRAME", "VOWEL_SOURCE -> PHONOLOGY_FRAME"],
    ["consonant", "consonant-phonology", "CONSONANT_SOURCE", "PHONOLOGY_FRAME", "CONSONANT_SOURCE -> PHONOLOGY_FRAME"],
    ["forms", "form-source", "FORM_SOURCE", "GRAMMAR_FRAME", "FORM_SOURCE -> FORM_CLASSIFICATION_FRAME"],
    ["spelling", "orthography-source", "CLASSICAL_LETTERS", "NAWAT_LETTERS", "SPELLING_SOURCE -> ORTHOGRAPHY_FRAME"],
    ["interrogative", "interrogative-source", "CN", "SENTENCE", "INTERROGATIVE_SOURCE+CN -> INTERROGATIVE_SENTENCE_ROUTE"],
    ["projective", "projective-object-source", "CNV", "CNV", "CNV(SOURCE_STEM+PROJECTIVE_OBJECT) -> PROJECTIVE_OBJECT_ROUTE"],
    ["projective-object", "projective-object-source", "CNV", "CNV", "CNV(SOURCE_STEM+PROJECTIVE_OBJECT) -> PROJECTIVE_OBJECT_ROUTE"],
    ["transform", "transform-source", "SOURCE_ROUTE", "TARGET_ROUTE", "SOURCE_ROUTE+TRANSFORM_SOURCE -> TARGET_ROUTE"],
    ["cause", "causative-semantic-source", "CNV", "CNV", "CAUSE_SOURCE+CNV(SOURCE_STEM) -> CAUSATIVE_ROUTE"],
    ["double-object", "double-object-source", "CNV", "CNV", "CNV(SOURCE_STEM+DOUBLE_OBJECT_ROLES) -> DOUBLE_OBJECT_ROUTE"],
    ["compound-stemmed", "compound-stem-source", "CNV/CNN+MATRIX", "CNV/CNN", "COMPOUND_STEM_SOURCE -> COMPOUND_STEM_ROUTE"],
    ["base", "base-stem-source", "BASE_STEM", "STEM", "BASE_STEM_SOURCE -> STEM_ROUTE"],
    ["adjective", "adjectival-source", "ADJECTIVAL_SOURCE", "ADJECTIVAL", "ADJECTIVE_SOURCE -> ADJECTIVAL_FUNCTION_ROUTE"],
    ["personal-name", "personal-name-source", "CN", "CNN", "SOURCE_STATEMENT(CN) -> CNN(PERSONAL_NAME_NNC)"],
    ["see", "cross-reference", "TEXT", "DIAGNOSTIC", "ANDREWS_REFERENCE_SOURCE -> REFERENCED_ROUTE_FRAME"],
    ["examples", "example-evidence", "EXAMPLE_SOURCE", "DIAGNOSTIC", "EXAMPLE_SOURCE -> EVIDENCE_FRAME"],
    ["subclass", "subclass-classification", "CLASS_SOURCE", "CLASSIFIED_ROUTE", "SUBCLASS_SOURCE -> CLASSIFIED_ROUTE_FRAME"],
    ["subclasses", "subclass-classification", "CLASS_SOURCE", "CLASSIFIED_ROUTE", "SUBCLASS_SOURCE -> CLASSIFIED_ROUTE_FRAME"],
    ["such", "exemplified-type", "TYPE_SOURCE", "CLASSIFIED_ROUTE", "EXEMPLIFIED_SOURCE -> TYPE_ROUTE_FRAME"],
    ["thing", "entity-nominal-source", "ENTITY_SOURCE", "CNN", "ENTITY_SOURCE -> CNN(ENTITY_NNC_ROUTE)"],
    ["entity", "entity-nominal-source", "ENTITY_SOURCE", "CNN", "ENTITY_SOURCE -> CNN(ENTITY_NNC_ROUTE)"],
    ["between", "relation-boundary", "CN+CN", "CLAUSE_RELATION", "LEFT_SOURCE+RIGHT_SOURCE -> RELATION_BOUNDARY_FRAME"],
    ["group", "grouping-source", "GROUP_SOURCE", "CLASSIFIED_ROUTE", "GROUP_SOURCE -> GROUPED_ROUTE_FRAME"],
    ["filler", "formula-filler", "FILLER_SOURCE", "FORMULA_SLOT", "FILLER_SOURCE -> FORMULA_SLOT_FRAME"],
    ["use", "usage-source", "USAGE_SOURCE", "DIAGNOSTIC", "USAGE_SOURCE -> USAGE_ROUTE_FRAME"],
    ["certain", "specified-source", "SPECIFIED_SOURCE", "CLASSIFIED_ROUTE", "SPECIFIED_SOURCE -> SPECIFIC_ROUTE_FRAME"],
    ["specific", "specified-source", "SPECIFIED_SOURCE", "CLASSIFIED_ROUTE", "SPECIFIED_SOURCE -> SPECIFIC_ROUTE_FRAME"],
    ["tla", "indefinite-object-source", "CNV", "CNV", "INDEFINITE_OBJECT_SOURCE+CNV(SOURCE_STEM) -> INDEFINITE_OBJECT_ROUTE"],
    ["objects", "object-role-source", "CNV", "CNV", "OBJECT_ROLE_SOURCE+CNV(SOURCE_STEM) -> OBJECT_ROUTE"],
    ["serves", "function-source", "FUNCTION_SOURCE", "GRAMMAR_FRAME", "FUNCTION_SOURCE -> FUNCTION_ROUTE_FRAME"],
    ["serve", "function-source", "FUNCTION_SOURCE", "GRAMMAR_FRAME", "FUNCTION_SOURCE -> FUNCTION_ROUTE_FRAME"],
    ["signified", "semantic-function", "MEANING_SOURCE", "GRAMMAR_FRAME", "SIGNIFIED_SOURCE -> SEMANTIC_FUNCTION_FRAME"],
    ["members", "member-class-source", "MEMBER_SOURCE", "CLASSIFIED_ROUTE", "MEMBER_SOURCE -> CLASS_MEMBERSHIP_FRAME"],
    ["they", "anaphoric-source", "TEXT", "DIAGNOSTIC", "ANAPHORIC_SOURCE -> REFERENCE_FRAME"],
    ["english", "translation-diagnostic", "TEXT", "DIAGNOSTIC", "SOURCE_TEXT+ENGLISH_GLOSS -> TRANSLATION_DIAGNOSTIC_FRAME"],
    ["any", "indefinite-source", "INDEFINITE_SOURCE", "GRAMMAR_FRAME", "INDEFINITE_SOURCE -> INDEFINITE_ROUTE_FRAME"],
    ["occur", "occurrence-source", "OCCURRENCE_SOURCE", "DIAGNOSTIC", "OCCURRENCE_SOURCE -> OCCURRENCE_FRAME"],
    ["becomes", "transformation-result", "SOURCE_ROUTE", "TARGET_ROUTE", "SOURCE_ROUTE -> RESULTING_TARGET_ROUTE"],
    ["which", "selection-source", "SELECTION_SOURCE", "CLASSIFIED_ROUTE", "SELECTION_SOURCE -> SELECTED_ROUTE_FRAME"],
    ["other", "alternate-source", "ALTERNATE_SOURCE", "CLASSIFIED_ROUTE", "ALTERNATE_SOURCE -> ALTERNATE_ROUTE_FRAME"],
    ["num1", "number-slot", "NUMBER_SOURCE", "CNV/CNN", "num1_SOURCE+PREDICATE_SOURCE -> NUMBERED_FORMULA_ROUTE"],
    ["denoting", "semantic-function", "MEANING_SOURCE", "GRAMMAR_FRAME", "DENOTATION_SOURCE -> SEMANTIC_FUNCTION_FRAME"],
    ["untied", "unbound-source", "UNBOUND_SOURCE", "GRAMMAR_FRAME", "UNBOUND_SOURCE -> UNBOUND_ROUTE_FRAME"],
    ["become", "transformation-result", "SOURCE_ROUTE", "TARGET_ROUTE", "SOURCE_ROUTE -> RESULTING_TARGET_ROUTE"],
    ["counting", "counting-source", "NUMERAL", "CNN", "COUNTING_SOURCE -> COUNTING_NNC_ROUTE"],
    ["adjunct", "adjunction-source", "CN+CN", "CLAUSE_RELATION", "HEAD(CN)+ADJUNCT(CN) -> ADJUNCTION_FRAME"],
    ["marked", "marked-form-source", "MARKED_SOURCE", "GRAMMAR_FRAME", "MARKED_SOURCE -> MARKED_ROUTE_FRAME"],
    ["recompense", "recompense-relation", "CNV", "CNV", "RECOMPENSE_SOURCE+CNV(SOURCE_STEM) -> RECOMPENSE_ROUTE"],
    ["nounstem-final", "nounstem-final-source", "CNN", "CNN", "NOUNSTEM_FINAL_SOURCE+CNN(STEM) -> CNN(FINAL_ALLOMORPHY_ROUTE)"],
    ["refer", "reference-source", "TEXT", "DIAGNOSTIC", "REFERENCE_SOURCE -> REFERENCED_ROUTE_FRAME"],
    ["term", "grammar-term-source", "TEXT/TERM", "CONCEPT_FRAME", "GRAMMAR_TERM_SOURCE -> CONCEPT_FRAME"],
    ["addition", "grammar-addition-source", "TEXT/TERM", "CONCEPT_FRAME", "ADDITION_SOURCE -> GRAMMAR_CONCEPT_FRAME"],
    ["sememe", "semantic-unit-source", "SEMEME_SOURCE", "CONCEPT_FRAME", "SEMEME_SOURCE -> SEMANTIC_UNIT_FRAME"],
    ["meaningless", "structural-unit-source", "STRUCTURAL_UNIT_SOURCE", "CONCEPT_FRAME", "STRUCTURAL_UNIT_SOURCE -> STRUCTURAL_UNIT_FRAME"],
    ["meaningful", "morpheme-unit-source", "MORPHEME_SOURCE", "CONCEPT_FRAME", "MORPHEME_SOURCE -> MEANINGFUL_UNIT_FRAME"],
    ["vocable", "vocable-source", "VOCABLE_SOURCE", "CONCEPT_FRAME", "VOCABLE_SOURCE -> VOCABLE_STRUCTURE_FRAME"],
    ["sonorants", "sonorant-phonology", "SOUND_SOURCE", "PHONOLOGY_FRAME", "SONORANT_SOURCE -> PHONOLOGY_FRAME"],
    ["fricatives", "fricative-phonology", "SOUND_SOURCE", "PHONOLOGY_FRAME", "FRICATIVE_SOURCE -> PHONOLOGY_FRAME"],
    ["stops", "stop-phonology", "SOUND_SOURCE", "PHONOLOGY_FRAME", "STOP_SOURCE -> PHONOLOGY_FRAME"],
    ["affricates", "affricate-phonology", "SOUND_SOURCE", "PHONOLOGY_FRAME", "AFFRICATE_SOURCE -> PHONOLOGY_FRAME"],
    ["isl", "orthographic-cluster-source", "CLASSICAL_LETTERS", "NAWAT_LETTERS", "ORTHOGRAPHIC_CLUSTER_SOURCE -> ORTHOGRAPHY_FRAME"],
    ["followed", "assimilation-environment-source", "PHONOLOGY_SOURCE", "PHONOLOGY_FRAME", "FOLLOWING_ENVIRONMENT_SOURCE -> ASSIMILATION_FRAME"],
    ["inf", "inflectional-environment-source", "INFLECTION_SOURCE", "GRAMMAR_FRAME", "INFLECTIONAL_ENVIRONMENT_SOURCE -> GRAMMAR_FRAME"],
    ["occasionally", "exceptional-usage-source", "USAGE_SOURCE", "DIAGNOSTIC", "EXCEPTIONAL_USAGE_SOURCE -> USAGE_ROUTE_FRAME"],
    ["introducers", "particle-introducer-source", "PARTICLE_SOURCE", "PARTICLE_BOUNDARY", "INTRODUCER_SOURCE -> PARTICLE_BOUNDARY_FRAME"],
    ["adjunctors", "adjunctor-source", "PARTICLE_SOURCE", "CLAUSE_RELATION", "ADJUNCTOR_SOURCE+ADJOINED_CLAUSE -> ADJUNCTION_FRAME"],
    ["sentence", "sentence-source", "CN", "SENTENCE", "SENTENCE_SOURCE -> SENTENCE_FRAME"],
    ["changing", "change-source", "SOURCE_ROUTE", "TARGET_ROUTE", "CHANGE_SOURCE+SOURCE_ROUTE -> TARGET_ROUTE"],
    ["direct", "direct-command-source", "CNV", "SENTENCE", "DIRECT_COMMAND_SOURCE+CNV -> COMMAND_SENTENCE_ROUTE"],
    ["indirect", "indirect-command-source", "CNV", "SENTENCE", "INDIRECT_COMMAND_SOURCE+CNV -> COMMAND_SENTENCE_ROUTE"],
    ["exhortations", "exhortation-source", "CNV", "SENTENCE", "EXHORTATION_SOURCE+CNV -> EXHORTATION_SENTENCE_ROUTE"],
    ["pil-ca", "irregular-stem-source", "IRREGULAR_SOURCE", "CNV", "IRREGULAR_STEM_SOURCE -> IRREGULAR_CNV_ROUTE"],
    ["monadic", "monadic-state-source", "CNN", "CNN", "MONADIC_STATE_SOURCE+CNN(STEM) -> CNN(MONADIC_STATE_ROUTE)"],
    ["dyadic", "dyadic-state-source", "CNN", "CNN", "DYADIC_STATE_SOURCE+CNN(STEM) -> CNN(DYADIC_STATE_ROUTE)"],
    ["affinity", "semantic-class-source", "CLASS_SOURCE", "CLASSIFIED_ROUTE", "AFFINITY_SOURCE -> SEMANTIC_CLASS_FRAME"],
    ["possibilities", "variant-formation-source", "SOURCE_ROUTE", "TARGET_ROUTE", "VARIANT_FORMATION_SOURCE -> TARGET_ROUTE"],
    ["possibility", "variant-formation-source", "SOURCE_ROUTE", "TARGET_ROUTE", "VARIANT_FORMATION_SOURCE -> TARGET_ROUTE"],
    ["even", "permitted-variant-source", "SOURCE_ROUTE", "TARGET_ROUTE", "PERMITTED_VARIANT_SOURCE -> TARGET_ROUTE"],
    ["simple", "simple-variant-source", "SOURCE_ROUTE", "TARGET_ROUTE", "SIMPLE_VARIANT_SOURCE -> TARGET_ROUTE"],
    ["sentences", "sentence-source", "CN", "SENTENCE", "SENTENCE_SOURCE -> SENTENCE_FRAME"],
    ["itl-ah", "pronominal-embed-source", "PRONOMINAL+EMBED", "CNN", "PRONOMINAL_EMBED_SOURCE -> CNN(PRONOMINAL_ROUTE)"],
    ["adjunctive", "adjunctive-transform-source", "CN+CN", "CLAUSE_RELATION", "ADJUNCTIVE_SOURCE+CN -> ADJUNCTION_FRAME"],
    ["principal", "principal-clause-source", "CN+CN", "CLAUSE_RELATION", "PRINCIPAL(CN)+DEPENDENT(CN) -> CLAUSE_RELATION_FRAME"],
    ["causing", "causative-complement-source", "CNV+CNV", "CLAUSE_RELATION", "CAUSING_SOURCE+COMPLEMENT(CNV) -> COMPLEMENT_FRAME"],
    ["wanting", "desiderative-complement-source", "CNV+CNV", "CLAUSE_RELATION", "DESIDERATIVE_SOURCE+COMPLEMENT(CNV) -> COMPLEMENT_FRAME"],
    ["knowing", "cognitive-complement-source", "CNV+CNV", "CLAUSE_RELATION", "COGNITIVE_SOURCE+COMPLEMENT(CNV) -> COMPLEMENT_FRAME"],
    ["local structural detail", "local-structural-source", "SOURCE_DETAIL", "GRAMMAR_FRAME", "LOCAL_STRUCTURAL_DETAIL_SOURCE -> GRAMMAR_FRAME"],
    ["directive", "directive-object-source", "CNV", "CNV", "DIRECTIVE_SOURCE+CNV(SOURCE_STEM) -> DIRECTIVE_OBJECT_ROUTE"],
    ["rightward", "suffix-sequence-source", "STEM+SUFFIX", "DERIVED_ROUTE", "RIGHTWARD_SUFFIX_SEQUENCE_SOURCE -> SUFFIX_SEQUENCE_ROUTE"],
    ["stock-formative", "stock-formative-source", "STOCK+FORMATIVE", "STEM", "STOCK_FORMATIVE_SOURCE -> STEM_ROUTE"],
    ["istem", "i-stem-source", "STEM_SOURCE", "STEM", "I_STEM_SOURCE -> STEM_ROUTE"],
    ["tstem", "t-stem-source", "STEM_SOURCE", "STEM", "T_STEM_SOURCE -> STEM_ROUTE"],
    ["mani", "verbal-lexeme-source", "CNV", "CNV", "VERBAL_LEXEME_SOURCE -> CNV_ROUTE"],
    ["tlehco", "verbal-lexeme-source", "CNV", "CNV", "VERBAL_LEXEME_SOURCE -> CNV_ROUTE"],
    ["directional", "directional-source", "CNV", "CNV", "DIRECTIONAL_SOURCE+CNV(SOURCE_STEM) -> DIRECTIONAL_ROUTE"],
    ["considering", "cognitive-embed-source", "CNV/CNN", "CNV", "COGNITIVE_EMBED_SOURCE+MATRIX -> COMPOUND_ROUTE"],
    ["incorporated-object", "incorporated-object-source", "CNN+CNV", "CNV", "INCORPORATED_OBJECT_SOURCE+CNV(MATRIX) -> COMPOUND_CNV_ROUTE"],
    ["incorporated-adverb", "incorporated-adverb-source", "ADVERBIAL+CNV", "CNV", "INCORPORATED_ADVERB_SOURCE+CNV(MATRIX) -> COMPOUND_CNV_ROUTE"],
    ["incorporated-complement", "incorporated-complement-source", "CN+CNV", "CNV", "INCORPORATED_COMPLEMENT_SOURCE+CNV(MATRIX) -> COMPOUND_CNV_ROUTE"],
    ["pol", "affective-pejorative-source", "CNN", "CNN", "AFFECTIVE_SOURCE+CNN(STEM) -> CNN(AFFECTIVE_ROUTE)"],
    ["child", "affective-child-source", "CNN", "CNN", "CHILD_AFFECTIVE_SOURCE+CNN(STEM) -> CNN(AFFECTIVE_ROUTE)"],
    ["noble", "affective-rank-source", "CNN", "CNN", "RANK_AFFECTIVE_SOURCE+CNN(STEM) -> CNN(AFFECTIVE_ROUTE)"],
    ["eyi", "numeral-variant-source", "NUMERAL", "CNN", "NUMERAL_VARIANT_SOURCE -> CNN(NUMERAL_NNC_ROUTE)"],
    ["nahui", "numeral-variant-source", "NUMERAL", "CNN", "NUMERAL_VARIANT_SOURCE -> CNN(NUMERAL_NNC_ROUTE)"],
    ["old", "preterit-agentive-example-source", "CNV", "CNN", "PRETERIT_EXAMPLE_SOURCE -> CNN(PRETERIT_AGENTIVE_ROUTE)"],
    ["green", "color-adjectival-source", "ADJECTIVAL_SOURCE", "ADJECTIVAL", "COLOR_SOURCE -> ADJECTIVAL_FUNCTION_ROUTE"],
    ["diminished", "quality-adjectival-source", "ADJECTIVAL_SOURCE", "ADJECTIVAL", "QUALITY_SOURCE -> ADJECTIVAL_FUNCTION_ROUTE"],
    ["dirty", "quality-adjectival-source", "ADJECTIVAL_SOURCE", "ADJECTIVAL", "QUALITY_SOURCE -> ADJECTIVAL_FUNCTION_ROUTE"],
    ["ashen", "quality-adjectival-source", "ADJECTIVAL_SOURCE", "ADJECTIVAL", "QUALITY_SOURCE -> ADJECTIVAL_FUNCTION_ROUTE"],
    ["faded", "quality-adjectival-source", "ADJECTIVAL_SOURCE", "ADJECTIVAL", "QUALITY_SOURCE -> ADJECTIVAL_FUNCTION_ROUTE"],
    ["black", "color-adjectival-source", "ADJECTIVAL_SOURCE", "ADJECTIVAL", "COLOR_SOURCE -> ADJECTIVAL_FUNCTION_ROUTE"],
    ["wrinkled", "quality-adjectival-source", "ADJECTIVAL_SOURCE", "ADJECTIVAL", "QUALITY_SOURCE -> ADJECTIVAL_FUNCTION_ROUTE"],
    ["adverb", "incorporated-adverb-source", "ADVERBIAL+CNV", "CNV", "INCORPORATED_ADVERB_SOURCE+CNV(MATRIX) -> COMPOUND_CNV_ROUTE"],
    ["cardinal-numeral", "cardinal-numeral-source", "NUMERAL", "CNN", "CARDINAL_NUMERAL_SOURCE -> CNN(NUMERAL_NNC_ROUTE)"],
    ["annnc", "adjectival-nnc-source", "CNN", "ADJECTIVAL", "ADJECTIVAL_NNC_SOURCE -> ADJECTIVAL_FUNCTION_ROUTE"],
    ["first-degree", "adverbialization-degree-source", "CNV/CNN", "ADVERBIAL", "FIRST_DEGREE_SOURCE+CNV/CNN(SOURCE) -> ADVERBIAL_FUNCTION"],
    ["huan", "relational-lexeme-source", "CNN", "CNN", "RELATIONAL_LEXEME_SOURCE -> CNN(RELATIONAL_NNC_ROUTE)"],
    ["tloc", "relational-lexeme-source", "CNN", "CNN", "RELATIONAL_LEXEME_SOURCE -> CNN(RELATIONAL_NNC_ROUTE)"],
    ["purpose", "purpose-relational-source", "CN+CN", "CLAUSE_RELATION", "PURPOSE_SOURCE+CN -> PURPOSE_RELATION_FRAME"],
    ["reason", "reason-relational-source", "CN+CN", "CLAUSE_RELATION", "REASON_SOURCE+CN -> REASON_RELATION_FRAME"],
    ["time", "temporal-relational-source", "CN+CN", "CLAUSE_RELATION", "TIME_SOURCE+CN -> TEMPORAL_RELATION_FRAME"],
    ["special", "special-relational-source", "CN+CN", "CLAUSE_RELATION", "SPECIAL_RELATION_SOURCE+CN -> RELATIONAL_FUNCTION_FRAME"],
    ["relational", "relational-source", "CNN", "CNN", "RELATIONAL_SOURCE+MATRIX -> CNN(RELATIONAL_NNC_ROUTE)"],
    ["ordinary", "ordinary-place-source", "PLACE_SOURCE", "CNN", "ORDINARY_PLACE_SOURCE -> CNN(PLACE_NAME_NNC)"],
    ["active-voice", "active-voice-source", "CNV", "CNV", "ACTIVE_VOICE_SOURCE+CNV(SOURCE_STEM) -> ACTIVE_VOICE_ROUTE"],
    ["cr6nica", "place-name-evidence-source", "PLACE_SOURCE", "CNN", "PLACE_NAME_EVIDENCE_SOURCE -> CNN(PLACE_NAME_NNC)"],
    ["manner", "manner-adjunction-source", "CN+CN", "CLAUSE_RELATION", "MANNER_SOURCE+CN -> ADVERBIAL_ADJUNCTION_FRAME"],
    ["clarifying", "clarifying-appositive-source", "CN+CN", "CLAUSE_RELATION", "CLARIFYING_APPOSITIVE_SOURCE -> CONJUNCTION_FRAME"],
    ["summarizing", "summarizing-appositive-source", "CN+CN", "CLAUSE_RELATION", "SUMMARIZING_APPOSITIVE_SOURCE -> CONJUNCTION_FRAME"],
    ["complicated", "complex-conjunction-source", "CN+CN", "CLAUSE_RELATION", "COMPLEX_CONJUNCTION_SOURCE -> CONJUNCTION_FRAME"],
    ["denominal", "denominal-source", "CNN", "CNV", "DENOMINAL_SOURCE+VERBALIZER -> CNV(DENOMINAL_VERBSTEM)"],
    ["hui", "hui-denominal-source", "CNN", "CNV", "CNN_SOURCE+hui -> CNV(DENOMINAL_VERBSTEM)"],
    ["te-ix", "substitute-role-denominal-source", "CNN", "CNV", "ROLE_SOURCE+DENOMINAL_MATRIX -> CNV(DENOMINAL_VERBSTEM)"],
    ["te-hui", "surrogate-role-denominal-source", "CNN", "CNV", "SURROGATE_SOURCE+DENOMINAL_MATRIX -> CNV(DENOMINAL_VERBSTEM)"],
    ["te-pa", "proxy-role-denominal-source", "CNN", "CNV", "PROXY_SOURCE+DENOMINAL_MATRIX -> CNV(DENOMINAL_VERBSTEM)"],
    ["inceptive", "inceptive-stative-denominal-source", "CNN", "CNV", "CNN_SOURCE+INCEPTIVE_STATIVE_VERBALIZER -> CNV(DENOMINAL_VERBSTEM)"],
    ["ti-of", "possession-denominal-source", "CNN", "CNV", "POSSESSION_SOURCE+ti -> CNV(DENOMINAL_VERBSTEM)"],
]);

function getAndrewsInternalSubsectionRouteSpec(parentSpec, entry) {
    const keywords = new Set(Array.from(entry.focusKeywords || []).map((keyword) => String(keyword).toLowerCase()));
    const has = (keyword) => keywords.has(keyword);
    const withParent = (overlay) => ({
        ...parentSpec,
        ...overlay,
        requirementIds: overlay.requirementIds || parentSpec.requirementIds,
        structuralInfo: overlay.structuralInfo || {},
    });

    if (entry.id === "46.3.1.a") {
        return withParent({
            routeFamily: "relational-nnc",
            routeKind: "preterit-agentive-embedded-source-locative",
            sourceUnit: "embedded CNV preterit-agentive source",
            targetUnit: "CNN relational locative",
            sourceFormulaType: "CNV",
            targetFormulaType: "CNN",
            formulaTemplate: "(SOURCE-0-ka-n)-0-",
            operation: "preterit-agentive-general-use-plus-locative-n-plus-zero-connector",
            requirementIds: ["embedded-source-formula", "preterit-agentive-source", "locative-matrix-source"],
            structuralInfo: {
                logicPathType: "source-gated derivational route",
                sourceLayer: "embedded source action",
                preteritAgentiveLayer: "-0-ka",
                relationalMatrix: "(-n)-tli-",
                connectorLayer: "-0-",
                exampleSource: "(mich-namaka)",
                exampleTargetFormula: "(mich-namaka-0-ka-n)-0-",
                exampleSurface: "michnamakakan",
            },
        });
    }

    if (entry.id === "46.3.1.b") {
        return withParent({
            routeFamily: "relational-nnc",
            routeKind: "active-action-embedded-source-locative",
            sourceUnit: "embedded CNV active-action source",
            targetUnit: "CNN relational locative",
            sourceFormulaType: "CNV",
            targetFormulaType: "CNN",
            formulaTemplate: "(ACTIVE_ACTION_SOURCE-n)-0-",
            operation: "active-action-embed-plus-locative-n-plus-zero-connector",
            requirementIds: ["embedded-source-formula", "active-action-source", "locative-matrix-source"],
            structuralInfo: {
                logicPathType: "source-gated derivational route",
                sourceLayer: "embedded active-action source",
                relationalMatrix: "(-n)-tli-",
                connectorLayer: "-0-",
                implementationNote: "Structural route only until a Nawat/Pipil surface is licensed.",
            },
        });
    }

    if (has("preterit-agentive")) {
        return withParent({
            routeFamily: "nominalization",
            routeKind: "preterit-agentive-source-route",
            sourceUnit: "CNV preterit source",
            targetUnit: "CNN preterit-agentive stem",
            sourceFormulaType: "CNV",
            targetFormulaType: "CNN",
            formulaTemplate: "CNV(PRETERIT_SOURCE_CORE) -> CNN(PRETERIT_AGENTIVE_STEM)",
            operation: "preterit-source-to-agentive-nominal-route",
            requirementIds: ["preterit-vnc-core-source", "preterit-agentive-source"],
            structuralInfo: {
                logicPathType: "source-gated derivational route",
                derivationalLayer: "preterit-agentive",
            },
        });
    }

    if (has("active-action")) {
        return withParent({
            routeFamily: "nominalization",
            routeKind: "active-action-nominal-source-route",
            sourceUnit: "CNV active-action source",
            targetUnit: "CNN active-action nominal stem",
            sourceFormulaType: "CNV",
            targetFormulaType: "CNN",
            formulaTemplate: "CNV(ACTIVE_ACTION_SOURCE) -> CNN(ACTIVE_ACTION_NOMINAL_STEM)",
            operation: "active-action-source-to-nominal-route",
            requirementIds: ["active-action-source", "nominalization-role-source"],
            structuralInfo: {
                logicPathType: "source-gated derivational route",
                derivationalLayer: "active-action",
            },
        });
    }

    for (const [keyword, overlay] of ANDREWS_INTERNAL_KEYWORD_ROUTE_SPECS) {
        if (has(keyword)) {
            return withParent({
                ...overlay,
                structuralInfo: {
                    logicPathType: "source-gated derivational route",
                    keywordRouteBasis: keyword,
                    ...overlay.structuralInfo,
                },
            });
        }
    }

    for (const [keyword, routeToken, sourceFormulaType, targetFormulaType, formulaTemplate] of ANDREWS_INTERNAL_FALLBACK_KEYWORD_ROUTE_SPECS) {
        if (has(keyword)) {
            return withParent({
                routeFamily: "diagnostic-analysis",
                routeKind: `${routeToken}-route`,
                sourceUnit: `${routeToken.replaceAll("-", " ")} source`,
                targetUnit: `${routeToken.replaceAll("-", " ")} route frame`,
                sourceFormulaType,
                targetFormulaType,
                formulaTemplate,
                operation: `${routeToken}-source-routing`,
                requirementIds: [`${routeToken}-source`],
                structuralInfo: {
                    logicPathType: "source-gated derivational route",
                    keywordRouteBasis: keyword,
                    semanticRouteLayer: routeToken,
                },
            });
        }
    }

    const internalToken = slugifyAndrewsRouteToken(entry.id);
    const parentToken = slugifyAndrewsRouteToken(parentSpec.routeKind).toUpperCase().replaceAll("-", "_");
    return withParent({
        routeKind: `${parentSpec.routeKind}-internal-${internalToken}`,
        sourceUnit: `Andrews ${entry.id} internal source`,
        formulaTemplate: `ANDREWS_INTERNAL_SUBSECTION(${entry.id})+SOURCE_GATE -> ${parentSpec.targetFormulaType}(${parentToken})`,
        operation: `${parentSpec.operation}-internal-${internalToken}`,
        requirementIds: [...parentSpec.requirementIds, `andrews-${internalToken}-source`],
        structuralInfo: {
            logicPathType: "source-gated derivational route",
            derivationStatus: "entry-specific-andrews-internal-route",
            internalFormulaAuthority: "Andrews section digest plus parent lesson route",
        },
    });
}

function buildAndrewsSubsectionSourceGatedRoutes(lesson, trajectory, spec) {
    return expandAndrewsLessonRouteRefs(trajectory.pdfRefs, lesson.id).map((andrewsRef) => {
        const sectionMatch = String(andrewsRef).match(/^Andrews Lesson\s+(\d+)(?:\.(\d+))?/);
        const sectionId = sectionMatch?.[2] ? `${sectionMatch[1]}.${sectionMatch[2]}` : `${lesson.id}`;
        const internalEntries = ANDREWS_INTERNAL_SUBSECTION_ROUTE_INDEX[sectionId] || [];
        const internalRoutes = internalEntries.map((entry) => {
            const routeSpec = getAndrewsInternalSubsectionRouteSpec(spec, entry);
            const requirementIds = Array.from(new Set([
                ...routeSpec.requirementIds,
                "andrews-section-source",
                "andrews-internal-subsection-source",
            ]));
            return withAndrewsRoutePuzzleStackTemplate({
                kind: "andrews-internal-subsection-source-gated-route-contract",
                id: `lesson-${lesson.id}-internal-${String(entry.id).replaceAll(".", "-")}-source-gated-route`,
                parentRouteId: `lesson-${lesson.id}-section-${String(sectionId).replace(".", "-")}-source-gated-route`,
                routeFamily: routeSpec.routeFamily,
                routeKind: routeSpec.routeKind,
                andrewsRefs: [entry.ref],
                sourceUnit: routeSpec.sourceUnit,
                targetUnit: routeSpec.targetUnit,
                sourceFormulaType: routeSpec.sourceFormulaType,
                targetFormulaType: routeSpec.targetFormulaType,
                formulaTransition: `${routeSpec.sourceFormulaType}->${routeSpec.targetFormulaType}`,
                formulaTemplate: routeSpec.formulaTemplate,
                operation: routeSpec.operation,
                structuralInfo: {
                    lesson: lesson.id,
                    section: sectionId,
                    internalSubsection: entry.id,
                    routeScope: "andrews-internal-subsection",
                    itemKind: entry.itemKind,
                    page: entry.page,
                    focusKeywords: Array.from(entry.focusKeywords || []),
                    digest: entry.digest,
                    uiHost: "tense-tabs-column",
                    ...routeSpec.structuralInfo,
                    sourcePathFormula: routeSpec.sourcePathFormula || `ANDREWS_INTERNAL_SUBSECTION(${entry.id})+SOURCE_GATE -> ${routeSpec.targetFormulaType}(${routeSpec.routeKind})`,
                },
                sourceGate: {
                    gated: true,
                    status: `${routeSpec.routeKind}-internal-subsection-source-required`,
                    requirementIds,
                    evidenceStatus: trajectory.evidenceStatus,
                },
                generationAllowed: false,
            });
        });
        return withAndrewsRoutePuzzleStackTemplate({
            kind: "andrews-subsection-source-gated-route-contract",
            id: `lesson-${lesson.id}-section-${String(sectionId).replace(".", "-")}-source-gated-route`,
            parentRouteId: `lesson-${lesson.id}-source-gated-route`,
            routeFamily: spec.routeFamily,
            routeKind: spec.routeKind,
            andrewsRefs: [andrewsRef],
            sourceUnit: spec.sourceUnit,
            targetUnit: spec.targetUnit,
            sourceFormulaType: spec.sourceFormulaType,
            targetFormulaType: spec.targetFormulaType,
            formulaTransition: `${spec.sourceFormulaType}->${spec.targetFormulaType}`,
            formulaTemplate: spec.formulaTemplate,
            operation: spec.operation,
            structuralInfo: {
                lesson: lesson.id,
                section: sectionId,
                routeScope: "andrews-section",
                parentRouteKind: spec.routeKind,
                lessonTitle: lesson.title,
                logicPathType: "source-gated derivational route",
                uiHost: "tense-tabs-column",
            },
            sourceGate: {
                gated: true,
                status: `${spec.routeKind}-section-source-required`,
                requirementIds: [...spec.requirementIds, "andrews-section-source"],
                evidenceStatus: trajectory.evidenceStatus,
            },
            internalRoutes,
            internalRouteCount: internalRoutes.length,
            generationAllowed: false,
        });
    });
}

function buildAndrewsLessonSourceGatedRouteContract(lesson, trajectory) {
    const spec = getAndrewsLessonSourceGatedRouteSpec(lesson.id);
    const subsectionRoutes = buildAndrewsSubsectionSourceGatedRoutes(lesson, trajectory, spec);
    return withAndrewsRoutePuzzleStackTemplate({
        kind: "andrews-lesson-source-gated-route-contract",
        id: `lesson-${lesson.id}-source-gated-route`,
        routeFamily: spec.routeFamily,
        routeKind: spec.routeKind,
        andrewsRefs: Array.from(trajectory.pdfRefs),
        sourceUnit: spec.sourceUnit,
        targetUnit: spec.targetUnit,
        sourceFormulaType: spec.sourceFormulaType,
        targetFormulaType: spec.targetFormulaType,
        formulaTransition: `${spec.sourceFormulaType}->${spec.targetFormulaType}`,
        formulaTemplate: spec.formulaTemplate,
        operation: spec.operation,
        structuralInfo: {
            lesson: lesson.id,
            lessonTitle: lesson.title,
            lessonStatus: lesson.status,
            implementationState: trajectory.implementationState,
            redirectAction: trajectory.redirectAction,
            orthographyStatus: trajectory.orthographyStatus,
            validationRefs: Array.from(trajectory.validationRefs),
            remainingGap: trajectory.remainingGap,
            logicPathType: "source-gated derivational route",
            uiHost: "tense-tabs-column",
            uiHostRole: "route-family-and-source-gate-summary",
        },
        sourceGate: {
            gated: true,
            status: `${spec.routeKind}-source-required`,
            requirementIds: Array.from(spec.requirementIds),
            evidenceStatus: trajectory.evidenceStatus,
        },
        subsectionRoutes,
        subsectionRouteCount: subsectionRoutes.length,
        internalRouteCount: subsectionRoutes.reduce((count, route) => count + route.internalRouteCount, 0),
        generationAllowed: false,
    });
}

function buildAndrewsLessonTrajectory(lesson) {
    const group = getAndrewsTrajectoryGroup(lesson.id) || ANDREWS_TRAJECTORY_GROUPS[0];
    const override = ANDREWS_FOUNDATION_TRAJECTORY_OVERRIDES[lesson.id] || {};
    const trajectory = {
        pdfRefs: override.pdfRefs || [`Andrews Lesson ${lesson.id}`],
        directive: override.directive || group.directive,
        implementationState: override.implementationState || getAndrewsTrajectoryImplementationState(lesson),
        redirectAction: override.redirectAction || getAndrewsTrajectoryRedirectAction(lesson),
        evidenceStatus: override.evidenceStatus || getAndrewsTrajectoryEvidenceStatus(lesson),
        orthographyStatus: override.orthographyStatus || getAndrewsTrajectoryOrthographyStatus(lesson),
        validationRefs: override.validationRefs || group.validationRefs,
    };
    const aimStatus = getAndrewsPlanPursuitAimStatus(lesson);
    const plannedArrows = Array.isArray(override.plannedArrows)
        ? override.plannedArrows.map((arrow) => ({ ...arrow }))
        : buildAndrewsPlannedArrows(lesson, trajectory);
    const firedArrows = Array.isArray(override.firedArrows)
        ? override.firedArrows.map((arrow) => ({ ...arrow }))
        : buildAndrewsFiredArrows(lesson, trajectory);
    const hitCount = firedArrows.filter((arrow) => arrow.result === "hit").length;
    const missCount = firedArrows.filter((arrow) => arrow.result === "miss").length;
    const remainingGap = aimStatus === "closest-pass" ? "none" : (override.remainingGap || lesson.notes || "Not yet mapped");
    const routeTrajectory = { ...trajectory, remainingGap };
    return {
        ...trajectory,
        stepNumber: lesson.id,
        aimStatus,
        plannedArrows,
        firedArrows,
        hitCount,
        missCount,
        remainingGap,
        closestPass: aimStatus === "closest-pass",
        sourceGatedRoute: buildAndrewsLessonSourceGatedRouteContract(lesson, routeTrajectory),
    };
}

const LESSON_REGISTRY_BASE = [
    {
        id: 1,
        title: "Preliminares lingüísticos",
        status: "implemented",
        engineDependencies: ["core/concepts"],
        exampleVerbs: [],
        notes: "El registro diagnóstico de conceptos y notación más el glosario visible de Lección 1 están implementados; no se licencia generación",
    },
    {
        id: 2,
        title: "Pronunciación. Ortografía",
        status: "partially-implemented",
        engineDependencies: ["core/phonology", "core/orthography"],
        exampleVerbs: [],
        notes: "Existen soporte de fonología moderna y silabificación; la ortografía de Andrews/clásica no está modelada por completo",
    },
    {
        id: 3,
        title: "Partículas",
        status: "partially-implemented",
        engineDependencies: ["core/particles"],
        exampleVerbs: [],
        notes: "Existen modo Partícula diagnóstico visible, metadatos de colocación de partículas e inventario semilla derivado de Andrews con ortografía adaptada; no hay inventario local confirmado ni generación",
    },
    {
        id: 4,
        title: "Cláusulas nucleares",
        status: "partially-implemented",
        engineDependencies: ["core/clause"],
        exampleVerbs: [],
        notes: "Existen metadatos de envoltura de cláusula nuclear; la sintaxis oracional completa no está modelada",
    },
    {
        id: 5,
        title: "Fórmula intransitiva de cláusula verbal. Pronombres de sujeto. Morfemas de tiempo",
        status: "implemented",
        engineDependencies: ["core/agreement", "core/vnc", "core/preterit"],
        exampleVerbs: ["nemi", "yawi", "kisa", "miki"],
        notes: "El paradigma intransitivo central está implementado con pase más cercano",
    },
    {
        id: 6,
        title: "Fórmula transitiva de cláusula verbal. Pronombres de objeto",
        status: "implemented",
        engineDependencies: ["core/agreement", "core/vnc"],
        exampleVerbs: ["kua", "itta", "maka"],
        notes: "El paradigma transitivo central está implementado con pase más cercano",
    },
    {
        id: 7,
        title: "Clases de tronco verbal",
        status: "implemented",
        engineDependencies: ["core/vnc", "core/preterit"],
        exampleVerbs: ["nemi", "pewa", "maka", "itta"],
        notes: "Todas las clases de pretérito (A/B/C/D) están implementadas con pase más cercano",
    },
    {
        id: 8,
        title: "Observaciones adicionales sobre cláusulas verbales. Oraciones básicas",
        status: "partially-implemented",
        engineDependencies: ["core/vnc", "core/agreement", "core/sentence"],
        exampleVerbs: [],
        notes: "Existen metadatos mecánicos de cláusula verbal y capa oracional diagnóstica; la generación oracional no está modelada",
    },
    {
        id: 9,
        title: "Modo optativo. Oraciones de deseo. Oraciones de mandato/exhortación",
        status: "partially-implemented",
        engineDependencies: ["core/vnc", "core/sentence"],
        exampleVerbs: ["nemi", "kua"],
        notes: "Las formas finitas optativas de cláusula verbal están implementadas; las construcciones optativas de nivel oracional no están modeladas",
    },
    {
        id: 10,
        title: "Modo admonitivo. Oraciones de advertencia",
        status: "partially-implemented",
        engineDependencies: ["core/vnc", "core/sentence"],
        exampleVerbs: ["nemi", "kua"],
        notes: "Las formas finitas admonitivas de cláusula verbal están implementadas; las construcciones admonitivas de nivel oracional no están modeladas",
    },
    {
        id: 11,
        title: "Cláusulas verbales irregulares",
        status: "partially-implemented",
        engineDependencies: ["core/irregulars"],
        exampleVerbs: ["kati", "yawi", "witzi", "weya"],
        notes: "El subconjunto supletivo Nawat está implementado; los perfectivos irregulares de Andrews, verbos defectivos y desplazamientos tiempo-significado siguen incompletos",
    },
    {
        id: 12,
        title: "Fórmula de cláusula nominal de estado absolutivo. Pronombres de sujeto",
        status: "partially-implemented",
        engineDependencies: ["core/nnc"],
        exampleVerbs: [],
        notes: "Existen derivaciones nominales, pero la generación completa de paradigmas de cláusula nominal sigue incompleta",
    },
    {
        id: 13,
        title: "Fórmula de cláusula nominal de estado posesivo. Pronombres de sujeto y poseedor",
        status: "partially-implemented",
        engineDependencies: ["core/nnc", "core/agreement"],
        exampleVerbs: [],
        notes: "La cláusula nominal de estado posesivo está implementada parcialmente",
    },
    {
        id: 14,
        title: "Clases de tronco nominal",
        status: "partially-implemented",
        engineDependencies: ["core/nnc"],
        exampleVerbs: [],
        notes: "Existe detección de clase de tronco, pero la generación completa de cláusula nominal por clase sigue incompleta",
    },
    {
        id: 15,
        title: "Observaciones adicionales sobre cláusulas nominales",
        status: "partially-implemented",
        engineDependencies: ["core/nnc"],
        exampleVerbs: [],
        notes: "Los límites adicionales de estado posesivo, posesión natural y estructura oracional son diagnósticos; la generación completa de casos de estado sigue sin mapear",
    },
    {
        id: 16,
        title: "Cláusulas nominales pronominales",
        status: "partially-implemented",
        engineDependencies: ["core/nnc", "core/agreement"],
        exampleVerbs: [],
        notes: "Subtipo pronominal, límite solo absolutivo y ortografía fusionada son diagnósticos; no hay generación pronominal de cláusula nominal",
    },
    {
        id: 17,
        title: "Suplementación (parte uno)",
        status: "partially-implemented",
        engineDependencies: ["core/sentence", "core/clause"],
        exampleVerbs: [],
        notes: "La suplementación de varios núcleos, roles de referente compartido, topicalización y transformaciones de pregunta de información son diagnósticos; no hay AST ni generación de suplementación",
    },
    {
        id: 18,
        title: "Suplementación (parte dos)",
        status: "partially-implemented",
        engineDependencies: ["core/sentence", "core/clause"],
        exampleVerbs: [],
        notes: "La suplementación integrada, marcada, discontinua, excepcional, de objeto silencioso, vocativa y de orden libre es diagnóstica; no hay AST ni generación de suplementación",
    },
    {
        id: 19,
        title: "Suplementación (parte tres)",
        status: "partially-implemented",
        engineDependencies: ["core/sentence", "core/clause"],
        exampleVerbs: [],
        notes: "Los suplementos de cláusula verbal, suplementación pronominal plural, cláusulas de referente incluido, reporte y estructuras de decir eliminado son diagnósticos; no hay AST oracional ni generación",
    },
    {
        id: 20,
        title: "Tronco verbal no activo",
        status: "implemented",
        engineDependencies: ["core/derivation"],
        exampleVerbs: ["nemi", "kua", "maka"],
        notes: "La derivación no activa está implementada con pase más cercano para Andrews 20.1-20.8",
    },
    {
        id: 21,
        title: "Cláusula verbal de voz pasiva",
        status: "partially-implemented",
        engineDependencies: ["core/derivation", "core/vnc"],
        exampleVerbs: ["kua", "maka"],
        notes: "La cláusula verbal pasiva tiene soporte de tronco no activo y sujeto pasivo, pero Andrews 21.1-21.4 sigue necesitando separación pasiva/impersonal, compuertas de objeto no específico, rutas pasivas reflexivas y de varios objetos, y diagnósticos de capa oracional",
    },
    {
        id: 22,
        title: "Cláusulas verbales impersonales",
        status: "partially-implemented",
        engineDependencies: ["core/derivation", "core/vnc"],
        exampleVerbs: ["nemi", "kua"],
        notes: "La cláusula verbal impersonal tiene soporte de tronco no activo y sujeto impersonal, pero Andrews 22.1-22.6 sigue necesitando separación pasiva/impersonal, inventario impersonal inherente, distinción no animada, compuertas de objeto fuente, ruta del testigo reflexivo ne, diagnósticos de capa oracional y evidencia de derivación ta-impersonal",
    },
    {
        id: 23,
        title: "Más sobre objetos verbales",
        status: "partially-implemented",
        engineDependencies: ["core/agreement", "core/vnc"],
        exampleVerbs: [],
        notes: "Existen alomorfía y combinaciones de prefijos de objeto, pero Andrews 23.1-23.5 sigue necesitando tipificación de función de objeto, contratos discontinuos de objeto causativo/aplicativo, rutas completas de línea principal/línea desviada, tablas de morfemas silenciosos y evidencia del Apéndice C",
    },
    {
        id: 24,
        title: "Troncos verbales causativos (primer tipo). Troncos desacervales",
        status: "partially-implemented",
        engineDependencies: ["core/derivation"],
        exampleVerbs: ["nemi", "kisa", "miki"],
        notes: "Existe derivación causativa de tipo uno y desacerval, pero Andrews 24.1-24.9 sigue necesitando límites de valencia por vocal final, compuertas de tronco neutral de valencia, inventarios desacervales completos, transformaciones de sujeto fuente de cláusula verbal a objeto y diagnósticos de control de a causativa",
    },
    {
        id: 25,
        title: "Troncos verbales causativos (segundo tipo)",
        status: "partially-implemented",
        engineDependencies: ["core/derivation"],
        exampleVerbs: ["temu", "tema", "nemi"],
        notes: "Existe salida causativa de tipo dos, pero Andrews 25.1-25.16 sigue necesitando inventarios de familias fuente, transformaciones de cláusula verbal fuente de uno/dos/tres objetos, diagnósticos de ambigüedad, causativos pasivos/impersonales, modos oracionales y suplementación de objeto silencioso",
    },
    {
        id: 26,
        title: "Troncos verbales aplicativos",
        status: "partially-implemented",
        engineDependencies: ["core/derivation"],
        exampleVerbs: ["maka", "itta", "nemi"],
        notes: "Existe salida aplicativa, pero Andrews 26.1-26.23 sigue necesitando inventarios de familias fuente, excepciones de forma fuente, transformaciones de cláusula verbal fuente de uno/dos/tres objetos, diagnósticos de ambigüedad, aplicativos pasivos/impersonales, modos oracionales, interpretación alternativa de objeto, cláusulas verbales engañosas y control de unidad objeto-más-sufijo",
    },
    {
        id: 27,
        title: "Troncos verbales frecuentativos",
        status: "partially-implemented",
        engineDependencies: ["core/derivation/frequentative"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos de límite frecuentativo para Andrews 27.1-27.6, pero siguen pendientes de evidencia: ejemplos frecuentativos Nawat/Pipil confirmados, selección de forma de prefijo, reduplicación de pronombre objeto, frecuentativos desacervales, formaciones inciertas, frecuentativos no activos y generación",
    },
    {
        id: 28,
        title: "Troncos verbales compuestos: incrustación verbal",
        status: "partially-implemented",
        engineDependencies: ["core/parsing", "core/vnc"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos de análisis de compuestos y marcos de compuesto para Andrews 28.1-28.12, pero siguen parciales o pendientes de evidencia: generación de incrustación de pretérito con conectivo -t, inventarios limitados de matriz, formaciones especiales pasivas/impersonales, posesión acompañante, compuestos con matriz reflexiva, compuestos de objeto compartido, compuestos de incrustación futura, recursión y ejemplos Nawat/Pipil confirmados",
    },
    {
        id: 29,
        title: "Cláusulas verbales purposivas",
        status: "partially-implemented",
        engineDependencies: ["core/vnc/purposive"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos de límite purposivo/direccional para Andrews 29.1-29.7, pero siguen parciales o pendientes de evidencia: generación purposiva saliente/entrante, comportamiento de morfema futuro silencioso, desambiguación de longitud vocálica y saltillo, comportamiento opcional o#, plural irregular n, incrustaciones pasivas/impersonales, incrustaciones con tronco compuesto, alternativas externas wal/on, lecturas de propósito cumplido y ejemplos Nawat/Pipil confirmados",
    },
    {
        id: 30,
        title: "Troncos verbales compuestos: incrustación nominal",
        status: "partially-implemented",
        engineDependencies: ["core/parsing", "core/vnc"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos de incrustación léxica en análisis de compuestos para Andrews 30.1-30.18, pero siguen parciales o pendientes de evidencia: selección de tronco nominal de uso general, reducción de valencia por objeto incorporado, análisis excepcional de fusión ta, transformaciones fuente de adverbial incorporado, transformaciones de suplemento a adverbial, complementos incorporados, reduplicación, rutas no activas y ejemplos Nawat/Pipil confirmados",
    },
    {
        id: 31,
        title: "Troncos nominales compuestos",
        status: "partially-implemented",
        engineDependencies: ["core/nnc", "core/nnc/compound"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos de tronco nominal compuesto para Andrews 31.1-31.13, pero siguen parciales o pendientes de evidencia: análisis compuesto específico de cláusula nominal, segmentación enlazada/sin conectivo/integrada, orientación de poseedor, alomorfía de clase de incrustación, rellenadores únicos, comportamiento de matriz ka/yu, compuestos conjuntivos, compuestos recursivos, patrones de sexo/progenie/compañerismo, troncos de afinidad, troncos distributivos/varietales y ejemplos Nawat/Pipil confirmados",
    },
    {
        id: 32,
        title: "Cláusulas nominales afectivas",
        status: "partially-implemented",
        engineDependencies: ["core/nnc", "core/nnc/compound"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos de cláusula nominal afectiva para Andrews 32.1-32.8, pero siguen parciales o pendientes de evidencia: rutas de clase con matriz afectiva para pil/pol/tzin/ton/zol, cambios lexicalizados de clase, variantes vocativas, afectivos con forma de afinidad, ambigüedad pil niño/noble, comportamiento de número no animado, silenciamiento de número uno en sujeto defectuoso, inventarios de troncos defectivos y ejemplos Nawat/Pipil confirmados",
    },
    {
        id: 33,
        title: "Cláusulas verbales honoríficas. Cláusulas verbales peyorativas",
        status: "partially-implemented",
        engineDependencies: ["core/vnc", "core/vnc/honorific_pejorative"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos honoríficos/peyorativos de cláusula verbal para Andrews 33.1-33.10, pero siguen parciales o pendientes de evidencia: generación honorífica, peyorativa y reverencial, selección de ruta reflexiva causativa/aplicativa, ambigüedad de objeto proyectivo, rutas de incrustación de pretérito tzin-u-a y pul-u-a, blanco de transformación de tronco verbal compuesto y ejemplos Nawat/Pipil confirmados",
    },
    {
        id: 34,
        title: "Cláusulas nominales de numerales cardinales",
        status: "partially-implemented",
        engineDependencies: ["core/nnc", "core/nnc/numerals"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos de numerales cardinales en cláusula nominal para Andrews 34.1-34.16, pero siguen parciales o pendientes de evidencia: generación de numerales cardinales, troncos básicos, conteos gruesos, compuestos de orden alto, numerales conjuntados, conjuntos clasificadores, reduplicación, aproximación, medidas y ejemplos Nawat/Pipil confirmados",
    },
    {
        id: 35,
        title: "Nominalización de cláusulas verbales (parte uno)",
        status: "partially-implemented",
        engineDependencies: ["core/nnc", "core/nnc/nominalization", "core/derivation"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos de nominalización agentiva de pretérito para Andrews 35.1-35.12, y algunas continuaciones Nawat generadas de agentivo de pretérito/uso general/posesión/adverbial existen, pero siguen parciales o pendientes de evidencia: alternancias de número, troncos de afinidad, híbridos de objeto activado, límites de persona anciana, variantes raras, subclases completas de posesión, adverbiales centrados en objeto, reflexivos lexicalizados y ejemplos Nawat/Pipil confirmados",
    },
    {
        id: 36,
        title: "Nominalización de cláusulas verbales (parte dos)",
        status: "partially-implemented",
        engineDependencies: ["core/nnc", "core/nnc/nominalization", "core/derivation"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos de cláusula verbal nominalizada para Andrews 36.1-36.12, y algunas salidas Nawat agentivas habituales, patientivas, instrumentivas, agentivas de presente/futuro, de acción pasiva y de acción activa existen, pero siguen parciales o pendientes de evidencia: enrutamiento de reanálisis/nominalización plena, posesivos raros, híbridos de objeto activado, excepciones de fuente de estado, incrustaciones futuras lexicalizadas, alternancias de acción de uso restringido/general, sentidos lexicalizados y ejemplos Nawat/Pipil confirmados",
    },
    {
        id: 37,
        title: "Troncos nominales deverbales (parte uno)",
        status: "partially-implemented",
        engineDependencies: ["core/nnc", "core/nnc/nominalization", "core/derivation"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos de tronco nominal deverbal para Andrews 37.1-37.9, y algunas compuertas Nawat generadas de acción activa s/lis, paciente potencial, acción impersonal y patientivo pasivo existen, pero siguen parciales o pendientes de evidencia: cobertura completa z/liz, incrustaciones compuestas, sintaxis de varios núcleos, compuertas de fuente patientiva pasiva, asimilación tzin y ejemplos Nawat/Pipil confirmados",
    },
    {
        id: 38,
        title: "Troncos nominales deverbales (parte dos)",
        status: "partially-implemented",
        engineDependencies: ["core/nnc", "core/nnc/nominalization", "core/derivation"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos de patientivo impersonal para Andrews 38.1-38.2, y algunas continuaciones Nawat generadas de patientivo impersonal, ne reflexivo, ta proyectivo, te-a-ta y patientivo compuesto existen, pero siguen parciales o pendientes de evidencia: enrutamiento completo de familias de fuente, selección raíz-más-ya, contraste humano/no humano, formas te anómalas, desambiguación de homónimos, comportamiento patientivo compuesto y ejemplos Nawat/Pipil confirmados",
    },
    {
        id: 39,
        title: "Troncos nominales deverbales (parte tres)",
        status: "partially-implemented",
        engineDependencies: ["core/nnc", "core/nnc/nominalization", "core/derivation"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos de operaciones patientivas para Andrews 39.1-39.9, y algunas continuaciones Nawat generadas perfectivas, imperfectivas, de raíz/acervo, propiedad característica, derivación múltiple, incrustación compuesta, complemento incorporado, objeto incorporado e incrustación de propiedad característica existen, pero siguen parciales o pendientes de evidencia: compuertas completas de fuente, contrastes de posesión orgánica, elección de variante raíz/acervo, inventarios de matriz, manejo de violación de valencia, restricciones idiomáticas y ejemplos Nawat/Pipil confirmados",
    },
    {
        id: 40,
        title: "Cláusulas nominales adjetivales (parte uno)",
        status: "partially-implemented",
        engineDependencies: ["core/nnc", "core/nnc/adjectival"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos de función adjetival nominal para Andrews 40.1-40.12, y algunas continuaciones Nawat optativas de nominal ordinario, verbal, patientivo, verbal nominalizado y raíz-más-ya adjetival existen, pero siguen parciales o pendientes de evidencia: cláusulas nominales adjetivales excepcionales, cobertura completa de función nominal/verbal, conjuntos sinónimos, sintaxis de oración predicado-adjetivo, comportamiento AST de modificación, comportamiento agentivo de pretérito específico por clase, excepciones raíz-más-ya y ejemplos Nawat/Pipil confirmados",
    },
    {
        id: 41,
        title: "Cláusulas nominales adjetivales (parte dos)",
        status: "partially-implemented",
        engineDependencies: ["core/nnc", "core/nnc/adjectival"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos adjetivales nominales para Andrews 41.1-41.4, y algunas continuaciones Nawat optativas intensificadas, de fuente compuesta y de compuesto denominal existen, pero siguen parciales o pendientes de evidencia: familias de troncos intensificados, intensificación de matriz pah/cal/tzon/afectiva, intensificación por metáfora o símil, intensificadores sintácticos, subtipos completos de fuente de tronco verbal compuesto, desambiguación de fuente patientiva con objeto incorporado, troncos nominales adjetivales incrustados en cláusulas nominales de tronco compuesto, sintaxis modificador/núcleo y ejemplos Nawat/Pipil confirmados",
    },
    {
        id: 42,
        title: "Modificación adjetival (parte uno)",
        status: "partially-implemented",
        engineDependencies: ["core/clause", "core/clause/modification"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos de modificación adjetival para Andrews 42.1-42.10, y el AST actual compone superficies Nawat provistas para órdenes seleccionados de modificador/núcleo, pero siguen parciales o diagnósticos: sintaxis de varios núcleos, resolución de ambigüedad de suplementación, selección de matriz en núcleo compuesto, ambigüedad de modificador verbal transitivo, comportamiento de núcleo pronominal/cuantitativo/numeral, comportamiento de núcleo nominal de medida, recursión, estructuras de modificación incorporada, detección de analizador/búsqueda, ejemplos de cláusula con respaldo estático y evidencia Nawat/Pipil confirmada",
    },
    {
        id: 43,
        title: "Modificación adjetival (parte dos)",
        status: "partially-implemented",
        engineDependencies: ["core/clause", "core/clause/modification"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos de modificación adjetival para Andrews 43.1-43.9, y el AST actual puede marcar orden discontinuo en superficies Nawat provistas, pero siguen parciales o diagnósticos: análisis de modificador no antepuesto, cooperación con el mismo núcleo, ambigüedad de núcleo interrogativo, núcleos oc ce, violaciones de referente compartido, modismos uno-de/ninguno-de, modificadores de vínculo masculino, modificadores de pareja nombrada, detección de analizador/búsqueda, ejemplos de cláusula con respaldo estático y evidencia Nawat/Pipil confirmada",
    },
    {
        id: 44,
        title: "Cláusulas nucleares adverbiales",
        status: "partially-implemented",
        engineDependencies: ["core/clause", "core/clause/adverbial"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos de cláusula nuclear adverbial para Andrews 44.1-44.9, y una superficie configurada de adverbio lleva un marco de adverbialización de primer grado, pero siguen parciales o pendientes de evidencia: adverbiales nominales absolutivos de segundo grado, evidencia de cláusulas nominales que parecen partículas, otros adverbiales absolutivos, adverbiales agentivos de pretérito, adverbiales de estado posesivo, modificadores adverbiales incorporados, detección de analizador/búsqueda, datos estáticos adverbiales, acciones visibles de interfaz y ejemplos Nawat/Pipil confirmados",
    },
    {
        id: 45,
        title: "Cláusulas nominales relacionales (parte uno)",
        status: "partially-implemented",
        engineDependencies: ["core/nnc", "core/nnc/relational"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos relacionales nominales para Andrews 45.1-45.4, y los marcos de uso registran advertencias sin preposición, cuatro opciones relacionales, compuerta de estado posesivo para opción uno, agrupaciones de opciones, troncos solo de opción uno y funciones de ic, pero siguen parciales o pendientes de evidencia: generación relacional, datos estáticos relacionales, análisis de poseedor suplementario, incrustaciones de opción cuatro, detección de analizador/búsqueda, acciones visibles de interfaz y ejemplos Nawat/Pipil confirmados",
    },
    {
        id: 46,
        title: "Cláusulas nominales relacionales (parte dos)",
        status: "partially-implemented",
        engineDependencies: ["core/nnc", "core/nnc/relational"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos relacionales nominales para Andrews 46.1-46.15, y el marco de persecución de la Lección 46 registra troncos matriz solo de opción dos, locativos con n, incrustaciones ca+n, reglas de estado fuente imperfectivo/perfectivo, advertencias co/c de parte corporal, separación pa direccional/frecuencial e inferencia por contexto oracional, pero siguen parciales o pendientes de evidencia: generación relacional, datos relacionales solo de matriz, análisis de poseedor/objeto suplementario, detección de analizador/búsqueda, acciones visibles de interfaz y ejemplos Nawat/Pipil confirmados",
    },
    {
        id: 47,
        title: "Cláusulas nominales relacionales (parte tres)",
        status: "partially-implemented",
        engineDependencies: ["core/nnc", "core/nnc/relational"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos relacionales nominales para Andrews 47.1-47.5, y el marco de persecución de la Lección 47 registra grupos relacionales de opción uno/dos, opción uno/tres y opción uno/dos/tres, cláusulas de entidad asociada, reemplazo silencioso co/c y cláusulas de pertinencia, pero siguen parciales o pendientes de evidencia: generación relacional, datos estáticos relacionales, incrustación pa/copa, compuestos con t conectiva, contraste entidad asociada frente a gentilicio, enrutamiento de pertinencia, detección de analizador/búsqueda, acciones visibles de interfaz y ejemplos Nawat/Pipil confirmados",
    },
    {
        id: 48,
        title: "Nombres de lugar. Gentilicios",
        status: "partially-implemented",
        engineDependencies: ["core/nnc", "core/nnc/place_gentilic"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos de nombres de lugar/gentilicios para Andrews 48.1-48.13, y el marco de persecución de la Lección 48 registra referencia social única de nombre de lugar, siete grupos de nombres de lugar, cuatro rutas de formación gentilicia, ambigüedad ortográfica, incorporación, uso gentilicio adjetival, colectividad y extensiones de profesión/título, pero siguen parciales o pendientes de evidencia: generación de nombres de lugar, generación gentilicia, datos estáticos de lugar/gentilicio, resolución de referencia única, detección de analizador/búsqueda, acciones visibles de interfaz y ejemplos Nawat/Pipil confirmados",
    },
    {
        id: 49,
        title: "Modificación adverbial (parte uno)",
        status: "partially-implemented",
        engineDependencies: ["core/clause", "core/clause/adjunction"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos de adjunción adverbial para Andrews 49.1-49.10, y el marco de persecución de la Lección 49 registra orden modificador/núcleo simple, estructuras de varios núcleos, puntos recursivos, alcance interrogativo e intensificador, colocaciones, aposición y cláusulas principales adverbializadas, pero siguen parciales o pendientes de evidencia: datos estáticos de adjunción adverbial, detección recursiva de analizador/búsqueda, acciones visibles de interfaz y ejemplos Nawat/Pipil confirmados",
    },
    {
        id: 50,
        title: "Modificación adverbial (parte dos)",
        status: "partially-implemented",
        engineDependencies: ["core/clause", "core/clause/adjunction"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos de adjunción adverbial para Andrews 50.1-50.11, y el marco de persecución de la Lección 50 registra unidades de cláusula adjunta no adverbializadas, diez tipos de significado, límites de tiempo/lugar/manera/consideración/propósito/condición/concesión/consecuencia/proviso/razón y ca como introductor de cláusula principal, no como conjunción, pero siguen parciales o pendientes de evidencia: datos estáticos de adjunción adverbial, detección de analizador/búsqueda, acciones visibles de interfaz y ejemplos Nawat/Pipil confirmados",
    },
    {
        id: 51,
        title: "Complementación",
        status: "partially-implemented",
        engineDependencies: ["core/clause", "core/clause/complement"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos de complemento para Andrews 51.1-51.4, y el marco de persecución de la Lección 51 registra estructuras de doble núcleo, complementos de objeto, complementos de sujeto, complementos adverbiales, transformaciones pasivas de complemento de objeto y complementos relacionales lexicalizados, pero siguen parciales o pendientes de evidencia: datos estáticos de complemento, detección de analizador/búsqueda, acciones visibles de interfaz y ejemplos Nawat/Pipil confirmados",
    },
    {
        id: 52,
        title: "Conjunción",
        status: "partially-implemented",
        engineDependencies: ["core/clause", "core/clause/conjunction"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos de conjunción para Andrews 52.1-52.7, y el marco de persecución de la Lección 52 registra conjunción equilibrada sin núcleo, conjunción no marcada y marcada, modificadores adverbiales que no son conjuncores, emparejamiento correlativo, innovación léxica por cláusulas nominales coordinadas y estructura paralela reformulativa/progresiva/combinada, pero siguen parciales o pendientes de evidencia: datos estáticos de conjunción, detección de analizador/búsqueda, acciones visibles de interfaz y ejemplos Nawat/Pipil confirmados",
    },
    {
        id: 53,
        title: "Noción de semejanza. Comparación",
        status: "partially-implemented",
        engineDependencies: ["core/comparison"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos de comparación para Andrews 53.1-53.7, y el marco de persecución de la Lección 53 registra siete rutas de semejanza, comparación de igualdad frente a diferencia, igualdad, comparación de tamaño, grado comparativo, preguntas de cuánto más y grado superlativo, pero siguen parciales o pendientes de evidencia: AST de comparación, datos estáticos de comparación, detección de analizador/búsqueda, acciones visibles de interfaz y ejemplos Nawat/Pipil confirmados",
    },
    {
        id: 54,
        title: "Troncos verbales denominales (parte uno)",
        status: "partially-implemented",
        engineDependencies: ["core/derivation", "core/vnc"],
        exampleVerbs: [],
        notes: "Existe inventario de contratos denominales y soporte de rutas con evidencia de fuente para Andrews 54.1-54.6, pero siguen parciales o pendientes de evidencia: clasificación completa de fuentes léxicas, semántica de ti posesivo, ti-a de dos objetos, inventarios limitados de a/hua, ejemplos estáticos Nawat/Pipil y acciones visibles de interfaz",
    },
    {
        id: 55,
        title: "Troncos verbales denominales (parte dos)",
        status: "partially-implemented",
        engineDependencies: ["core/derivation", "core/vnc"],
        exampleVerbs: [],
        notes: "Existe inventario de contratos denominales y soporte de rutas con evidencia de fuente para Andrews 55.1-55.7, incluidos tia temporal, tla causativo/intransitivo, o-a/huia, huia adverbial, o-a/huia de compuesto relacional, i-hui/a-hui hacia o-a e i-a transitivo, pero siguen parciales o pendientes de evidencia: clasificación de fuentes léxicas, ejemplos estáticos Nawat/Pipil, acciones visibles de interfaz y superficies confirmadas",
    },
    {
        id: 56,
        title: "Cláusulas nominales de nombre personal",
        status: "partially-implemented",
        engineDependencies: ["core/nnc", "core/nnc/names"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos de nombres personales para Andrews 56.1-56.5, y el marco de persecución de la Lección 56 registra predicados de enunciado degradados de dos niveles, separación de sujeto interno/externo, fuentes de cláusula única, fuentes de adjunción, fuentes de conjunción, uso oracional, límites de título/vocativo, degradaciones de nombre divino e incrustaciones de topónimo, pero siguen parciales o pendientes de evidencia: análisis de fuentes de nombre personal, datos estáticos de nombres/calendario, detección de analizador/búsqueda, acciones de interfaz y ejemplos Nawat/Pipil confirmados",
    },
    {
        id: 57,
        title: "Miscelánea (parte uno)",
        status: "partially-implemented",
        engineDependencies: ["core/analysis"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos de análisis para Andrews 57.1-57.7, y el marco de persecución de la Lección 57 registra uso no sistémico de tiempo, valencia irregular, tópico absoluto, desacuerdo suplemento/núcleo, suplementos de cláusula nominal adverbial, morfos pers1 silenciosos y límites de l formadora de tronco nominal, pero siguen parciales o pendientes de evidencia: ejemplos textuales, detección de analizador/búsqueda, AST, acciones de interfaz y ejemplos Nawat/Pipil confirmados",
    },
    {
        id: 58,
        title: "Miscelánea (parte dos)",
        status: "partially-implemented",
        engineDependencies: ["core/analysis"],
        exampleVerbs: [],
        notes: "Existen metadatos diagnósticos de análisis para Andrews 58.1-58.8, y el marco de persecución de la Lección 58 registra troncos nominales instrumentales az, formaciones problemáticas de tronco, expresiones exclamativas, construcciones mah, advertencias de sujeto con nombre incorporado y problemas textuales, pero siguen parciales o pendientes de evidencia: ejemplos textuales, comportamiento de analizador/búsqueda, AST, acciones visibles de interfaz y ejemplos Nawat/Pipil confirmados",
    },
];

export const LESSON_REGISTRY = LESSON_REGISTRY_BASE.map((lesson) => ({
    ...lesson,
    trajectory: buildAndrewsLessonTrajectory(lesson),
}));

export const LESSON_STATUS_COUNTS = LESSON_REGISTRY.reduce((acc, lesson) => {
    acc[lesson.status] = (acc[lesson.status] || 0) + 1;
    return acc;
}, {});

export function createLessonRegistryApi() {
    return {
        ANDREWS_PLAN_PURSUIT_AIM_STATUSES,
        ANDREWS_PLAN_PURSUIT_ARROW_RESULTS,
        ANDREWS_TRAJECTORY_GROUPS,
        ANDREWS_TRAJECTORY_REDIRECT_ACTIONS,
        LESSON_REGISTRY,
        LESSON_STATUS_COUNTS,
    };
}

export function installLessonRegistryGlobals(targetObject = globalThis) {
    const api = createLessonRegistryApi();
    Object.keys(api).forEach((key) => {
        targetObject[key] = api[key];
    });
    return api;
}
