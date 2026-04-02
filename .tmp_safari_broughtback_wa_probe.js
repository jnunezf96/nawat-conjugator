(function () {
  try {
    const cases = ['-(kwi)', '(temi)', '(mali)', '(nemi)', '-(i)'];
    const out = {};
    const prev = typeof getSelectedNonactiveSuffix === 'function' ? getSelectedNonactiveSuffix() : null;
    const make = (raw, suffix) => {
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
          tense: 'presente',
          parsedVerb,
        },
      })?.result || '';
    };
    cases.forEach((raw) => {
      const parsed = parseVerbInput(raw);
      const base = parsed.analysisVerb || parsed.verb;
      out[raw] = {
        visible: getVisibleNonactiveDerivationOptions(base, base, {
          isTransitive: Boolean(getBaseObjectSlots(parsed) > 0 || parsed.isMarkedTransitive || parsed.isTaFusion),
          ruleBase: base,
        }).map((o) => o.suffix),
        any: make(raw, null),
        wa: make(raw, 'wa'),
        uwa: make(raw, 'uwa'),
        walu: make(raw, 'walu'),
      };
    });
    if (typeof setSelectedNonactiveSuffix === 'function') setSelectedNonactiveSuffix(prev);
    return JSON.stringify(out);
  } catch (error) {
    return JSON.stringify({ error: String(error && error.message || error), stack: String(error && error.stack || '') });
  }
})();
