(function () {
  try {
    const raws = ['-(iksa)', '-(ketza)', '-(matsa)', '-(pitsa)'];
    const out = {};
    const prev = typeof getSelectedNonactiveSuffix === 'function' ? getSelectedNonactiveSuffix() : null;
    const make = (raw, tense, suffix) => {
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
    raws.forEach((raw) => {
      const p = parseVerbInput(raw);
      const base = p.analysisVerb || p.verb;
      out[raw] = {
        visible: getVisibleNonactiveDerivationOptions(base, base, {
          isTransitive: Boolean(getBaseObjectSlots(p) > 0 || p.isMarkedTransitive || p.isTaFusion),
          ruleBase: base,
        }).map((o) => `${o.suffix}:${o.stem}`),
        present: make(raw, 'presente', null),
        perfecto: make(raw, 'perfecto', null),
        preterito: make(raw, 'preterito', null),
        onlyU: make(raw, 'presente', 'u'),
      };
    });
    if (typeof setSelectedNonactiveSuffix === 'function') setSelectedNonactiveSuffix(prev);
    return JSON.stringify(out);
  } catch (error) {
    return JSON.stringify({ error: String(error && error.message || error), stack: String(error && error.stack || '') });
  }
})();
