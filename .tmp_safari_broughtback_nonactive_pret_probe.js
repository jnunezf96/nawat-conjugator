(function () {
  try {
    const cases = ['-(iksa)', '(temi)', '(mali)', '-(kwi)'];
    const out = {};
    const prev = typeof getSelectedNonactiveSuffix === 'function' ? getSelectedNonactiveSuffix() : null;
    const make = (raw, suffix, tense) => {
      const parsedVerb = parseVerbInput(raw);
      if (typeof setSelectedNonactiveSuffix === 'function') setSelectedNonactiveSuffix(suffix);
      return generateWord({
        silent: true,
        skipValidation: true,
        override: {
          tenseMode: TENSE_MODE.verbo,
          derivationMode: DERIVATION_MODE.nonactive,
          voiceMode: VOICE_MODE.active,
          derivationType: DERIVATION_TYPE.direct,
          subjectPrefix: '',
          subjectSuffix: '',
          objectPrefix: '',
          verb: raw,
          tense,
          parsedVerb,
        },
      })?.result || '';
    };
    cases.forEach((raw) => {
      out[raw] = {
        perfecto_any: make(raw, null, 'perfecto'),
        perfecto_u: make(raw, 'u', 'perfecto'),
        perfecto_lu: make(raw, 'lu', 'perfecto'),
        preterito_any: make(raw, null, 'preterito'),
        preterito_u: make(raw, 'u', 'preterito'),
        preterito_lu: make(raw, 'lu', 'preterito'),
      };
    });
    if (typeof setSelectedNonactiveSuffix === 'function') setSelectedNonactiveSuffix(prev);
    return JSON.stringify(out);
  } catch (error) {
    return JSON.stringify({ error: String(error && error.message || error), stack: String(error && error.stack || '') });
  }
})();
