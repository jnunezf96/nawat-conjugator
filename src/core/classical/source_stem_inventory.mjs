// Canonical modern ESM module.

export function createClassicalNahuatlSourceStemInventoryApi() {
    const SOURCE_DOCUMENT = "ANDREWS_TRANSCRIPTION_CANVAS.md";
    const VNC_SOURCE_ROWS = Object.freeze([
      ["ā-miqui", "intransitive", "26.1"], ["ahci", "intransitive", "24.2"], ["ahci", "transitive", "24.2"], ["ahhuiā-ya", "intransitive", "25.5.2"],
      ["āhui-ya", "intransitive", "25.4.8"], ["āna", "transitive", "26.7"], ["aqui", "intransitive", "24.3.1.b"], ["āyacach-o-ā", "intransitive", "26.9"],
      ["āyi", "transitive", "26.4"], ["caqui", "transitive", "25.2.1"], ["ce-ce-ya", "intransitive", "25.5.2"], ["ce-li-liā", "transitive", "26.6"],
      ["ce-liā", "transitive", "26.6"], ["ce-ya", "intransitive", "26.8"], ["chacu-ā-ni", "intransitive", "24.5.7"], ["chay-ā-hui", "intransitive", "24.5.7"],
      ["chich-ī-ni", "intransitive", "24.5.7"], ["chichi-ya", "intransitive", "25.5.2"], ["chīhua", "transitive", "25.4"], ["chip-ā-hua", "intransitive", "24.6.5"],
      ["chōca", "intransitive", "25.2.1"], ["chol-o-ā", "intransitive", "25.4"], ["ciy-ā-hua", "intransitive", "24.6.5"], ["ciya-hui", "intransitive", "24.2"],
      ["ciya-hui", "transitive", "24.2"], ["cochi", "intransitive", "25.2"], ["coco-a", "transitive", "26.9"], ["coco-ya", "intransitive", "24.3.2.b"],
      ["cōhua", "transitive", "26.2"], ["cot-ō-ni", "intransitive", "24.5.7"], ["cuā", "transitive", "25.4"], ["cual-ā-ni", "intransitive", "25.3"],
      ["cuepi", "intransitive", "24.3.1.a"], ["cui", "transitive", "26.2"], ["cuica-ti", "intransitive", "26.2"], ["ē-hua", "intransitive", "24.3.2.a"],
      ["huā-qui", "intransitive", "24.3.1.a"], ["huāl-la-uh", "intransitive", "25.1"], ["hue-tz-ca", "intransitive", "25.2.4"], ["hue-tz-ca", "transitive", "25.2.4"],
      ["huetzi", "intransitive", "26.4"], ["huī-tequi", "intransitive", "24.2"], ["huī-tequi", "transitive", "24.2"], ["ī", "transitive", "25.2"],
      ["ih-tlani", "transitive", "26.2"], ["ihc-i-hui", "intransitive", "25.2.4"], ["ihcuil-o-ā", "transitive", "26.9"], ["iht-o-ā", "transitive", "26.9"],
      ["ihtzoma", "transitive", "26.2"], ["ihza", "intransitive", "25.2.2"], ["il-pītza", "transitive", "26.7"], ["ilpi", "intransitive", "24.3.1.b"],
      ["imacaci", "transitive", "25.4.4"], ["ināya", "transitive", "26.7"], ["itqui", "transitive", "25.2"], ["itt-a", "transitive", "25.2.3"],
      ["iuc-ci", "intransitive", "25.2.2"], ["ix-tlā-hu-a", "transitive", "25.4.5"], ["ix-tlā-hu-iā", "transitive", "26.6"], ["ix-tlā-hui", "intransitive", "24.3.1.a"],
      ["ixca", "transitive", "26.2"], ["maca", "transitive", "25.4.1"], ["mahui", "intransitive", "25.3"], ["māmā", "transitive", "26.8"],
      ["mani", "intransitive", "24.3.1.a"], ["mati", "intransitive", "24.2"], ["mati", "transitive", "24.2"], ["mayāna", "intransitive", "24.2"],
      ["mayāna", "transitive", "24.2"], ["mazā-ti", "intransitive", "25.5.1"], ["miqui", "intransitive", "25.3"], ["mix-i-hui", "intransitive", "25.2.4"],
      ["mōtla", "transitive", "26.7"], ["nāhua-ti", "intransitive", "26.2"], ["namaca", "transitive", "26.11"], ["nāmoyā", "transitive", "26.8"],
      ["nāpal-o-ā", "transitive", "26.9"], ["nec-ō", "intransitive", "26.11"], ["nēci", "intransitive", "25.2.2"], ["nel-ti", "intransitive", "25.5.1"],
      ["nemi", "intransitive", "26.4"], ["nene-hc-i-hui", "intransitive", "26.1"], ["nequi", "transitive", "26.11"], ["nōtza", "transitive", "26.7"],
      ["oh-quetza", "intransitive", "26.2"], ["ōl-ī-ni", "intransitive", "24.5.7"], ["on-o", "intransitive", "25.6"], ["ōya", "transitive", "26.7"],
      ["pā", "transitive", "26.8"], ["pā-hua-ci", "transitive", "26.4"], ["pa-tla", "transitive", "26.7"], ["pā-tz-ca", "transitive", "26.7"],
      ["pāca-l-tiā", "transitive", "26.6"], ["pach-i-hui", "intransitive", "25.2.4"], ["pach-o-ā", "transitive", "26.9"], ["pah-ti", "intransitive", "24.3.1.b"],
      ["panō", "intransitive", "25.6"], ["pāqui", "intransitive", "24.2"], ["pāqui", "transitive", "24.2"], ["pil-ca", "intransitive", "24.7 note 2"],
      ["pil-o-ā", "transitive", "26.9"], ["pīn-ā-hua", "intransitive", "25.8"], ["pix-a-hui", "intransitive", "24.7"], ["pix-ca", "intransitive", "24.2"],
      ["pix-ca", "transitive", "24.2"], ["piya", "transitive", "26.8"], ["pōhui", "intransitive", "24.3.1.a"], ["pol-i-hui", "intransitive", "24.7"],
      ["pol-o-ā", "transitive", "26.9"], ["poz-tequi", "intransitive", "24.2"], ["poz-tequi", "transitive", "24.2"], ["quēmi", "transitive", "25.3"],
      ["quetza", "transitive", "26.7"], ["quiy-a-hui", "intransitive", "26.2"], ["quīza", "intransitive", "25.3"], ["te-ti-ya", "intransitive", "25.5.2"],
      ["teci", "intransitive", "24.2"], ["teci", "transitive", "24.2"], ["tēm-o-ā", "transitive", "26.9"], ["tēmi", "intransitive", "24.3.1.a"],
      ["tēmiqui", "intransitive", "24.2"], ["tēmiqui", "transitive", "24.2"], ["temō", "intransitive", "25.6"], ["teo-hc-i-hui", "intransitive", "26.1"],
      ["tla-chiya", "intransitive", "26.8"], ["tlā-ti-ā", "transitive", "25.4"], ["tla-zo-h-ti", "intransitive", "26.7"],
      ["tla-zo-h-tla", "transitive", "26.7"], ["tlāca-ti", "intransitive", "25.5.1"], ["tlal-i-hui", "intransitive", "24.7"], ["tlami-ā", "transitive", "26.6"],
      ["tlaōco-ya", "intransitive", "25.4.8"], ["tlap-ā-ni", "intransitive", "24.5.7"], ["tlap-ī-hui", "intransitive", "24.5.7"], ["tlap-ī-hui-ya", "intransitive", "24.3.2.b"],
      ["tlap-o-ā", "transitive", "26.9"], ["tlap-o-hui", "intransitive", "24.7 note 1"], ["tlatz-i-hui", "intransitive", "25.2.4"], ["tlāza", "transitive", "26.7"],
      ["tlehcō", "intransitive", "25.6"], ["tōca", "intransitive", "24.2"], ["tōca", "transitive", "24.2"], ["tomi", "intransitive", "24.3.1.a"],
      ["tōn-ē-hua", "intransitive", "24.6.5"], ["top-ē-hua", "intransitive", "24.6.5"], ["tōy-ā-hui", "intransitive", "24.5.7"], ["tzacu-a", "transitive", "25.4.3"],
      ["tzacui", "intransitive", "24.3.1.a"], ["tzay-ā-ni", "intransitive", "24.5.7"], ["tzitz-qu-iā", "transitive", "26.6"], ["tzoy-ō-ni", "intransitive", "24.5.7"],
      ["xel-o-ā", "transitive", "26.9"], ["xo-xō-hui-ya", "intransitive", "25.5.2"], ["xoco-ya", "intransitive", "25.5.2"], ["ya-uh", "intransitive", "25.1"],
      ["yaca", "intransitive", "26.2"], ["yōco-ya", "intransitive", "24.3.2.b"], ["yōco-ya", "transitive", "26.8"], ["zaca-mo-ā", "intransitive", "26.9"],
      ["zahui", "intransitive", "24.3.1.a"]
    ]);
    const NNC_SOURCE_ROWS = Object.freeze([
      "a-c-ah", "a-chi", "a-qui", "cal", "ce-qui", "cem-ix-qui-ch", "chichi", "cā", "cā-tl-e-in", "cā-tl-eh", "cā-tl-eh-huā",
      "eh", "eh-eh-huā", "eh-huā", "itl-ah", "ix-a-chi", "ix-qui-ch", "iz-qui", "mich", "miya-c", "miya-qui", "miye-c", "miye-qui",
      "mo-ch", "mo-ch-eh-huā", "mo-chi", "pah", "quē-c-iz-qui", "quē-x-ix-qui-ch", "quē-x-qui-ch", "quē-z-qui", "tl-eh", "tl-eh-huā",
      "yeh", "yeh-huā", "yeh-yeh-huā", "ā-0", "īn", "ōn"
    ]);
    function makeRecord(stem, basalUnit, valence, section) {
      const citation = basalUnit === "vnc" && valence === "transitive" ? `...-(${stem})` : `(${stem})`;
      return Object.freeze({
        kind: "classical-nahuatl-canonical-source-stem-record",
        version: 1,
        stem,
        basalUnit,
        stemKind: basalUnit === "vnc" ? "verbstem" : "nounstem",
        valenceDisplay: basalUnit === "vnc" ? valence : "not-applicable",
        citation,
        sourceDocument: SOURCE_DOCUMENT,
        sourceSection: section || "12-16",
        selectionAuthority: "source-only",
        grammarAuthority: false,
        formulaStringAuthority: false
      });
    }
    const INVENTORY = Object.freeze([
      ...VNC_SOURCE_ROWS.map(([stem, valence, section]) => makeRecord(stem, "vnc", valence, section)),
      ...NNC_SOURCE_ROWS.map(stem => makeRecord(stem, "nnc", "not-applicable", "12-16"))
    ]);
    function getClassicalNahuatlCanonicalSourceStemInventory(basalUnit = "") {
      const normalizedUnit = String(basalUnit || "").trim().toLowerCase();
      return INVENTORY.filter(record => !normalizedUnit || record.basalUnit === normalizedUnit);
    }
    function isClassicalNahuatlCanonicalSourceStemRecord(record = null) {
      if (!record || record.kind !== "classical-nahuatl-canonical-source-stem-record" || record.version !== 1) return false;
      if (!['vnc', 'nnc'].includes(record.basalUnit) || !record.stem || record.grammarAuthority !== false || record.formulaStringAuthority !== false) return false;
      if (/[#>+=□]/u.test(record.citation)) return false;
      const expected = record.basalUnit === "vnc" && record.valenceDisplay === "transitive" ? `...-(${record.stem})` : `(${record.stem})`;
      return record.citation === expected;
    }
    function auditClassicalNahuatlCanonicalSourceStemInventory() {
      const invalidRecords = INVENTORY.filter(record => !isClassicalNahuatlCanonicalSourceStemRecord(record));
      const duplicateKeys = [];
      const seen = new Set();
      INVENTORY.forEach(record => {
        const key = `${record.basalUnit}|${record.valenceDisplay}|${record.stem}`;
        if (seen.has(key)) duplicateKeys.push(key);
        seen.add(key);
      });
      const quantityConflictPresent = INVENTORY.some(record => record.stem === "pin-ā-hua");
      const canonicalQuantityPresent = INVENTORY.some(record => record.stem === "pīn-ā-hua");
      return Object.freeze({
        kind: "classical-nahuatl-canonical-source-stem-inventory-audit",
        version: 1,
        recordCount: INVENTORY.length,
        vncCount: INVENTORY.filter(record => record.basalUnit === "vnc").length,
        nncCount: INVENTORY.filter(record => record.basalUnit === "nnc").length,
        invalidRecordCount: invalidRecords.length,
        duplicateCount: duplicateKeys.length,
        quantityConflictPresent,
        canonicalQuantityPresent,
        ok: invalidRecords.length === 0 && duplicateKeys.length === 0 && !quantityConflictPresent && canonicalQuantityPresent
      });
    }
    return {
      getClassicalNahuatlCanonicalSourceStemInventory,
      isClassicalNahuatlCanonicalSourceStemRecord,
      auditClassicalNahuatlCanonicalSourceStemInventory
    };
}

export function installClassicalNahuatlSourceStemInventoryGlobals(targetObject = globalThis) {
    const api = createClassicalNahuatlSourceStemInventoryApi();
    Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
    return api;
}
