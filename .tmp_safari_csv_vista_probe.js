(function () {
    const raw = "-(i)sh/ilpia";
    const result = {};
    try {
        if (typeof setVerbInputMode === "function") {
            setVerbInputMode("regex", { syncFromInput: true });
        }
        const verbEl = document.getElementById("verb");
        if (!verbEl) {
            return JSON.stringify({ error: "missing-verb-input" });
        }
        verbEl.value = raw;
        verbEl.dataset.prevValue = raw;
        if (typeof generateWord === "function") {
            result.generate = generateWord();
        }
        if (typeof buildViewExportCSV === "function") {
            const csv = buildViewExportCSV();
            result.csv = csv;
            result.lines = String(csv || "").split("\n").slice(0, 16);
        } else {
            result.error = "missing-buildViewExportCSV";
        }
    } catch (error) {
        result.error = String(error && error.message ? error.message : error);
    }
    return JSON.stringify(result);
})();
