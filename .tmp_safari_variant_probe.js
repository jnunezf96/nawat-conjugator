(function () {
  try {
    const raws = ['-(iksa)', '-(ketza)', '-(metza)', '-(pitsa)', '-(matsa)', '-(witza)', '-(tasa)'];
    const out = {};
    raws.forEach((raw) => {
      const p = parseVerbInput(raw);
      const base = p.analysisVerb || p.verb;
      out[raw] = {
        visible: getVisibleNonactiveDerivationOptions(base, base, {
          isTransitive: Boolean(getBaseObjectSlots(p) > 0 || p.isMarkedTransitive || p.isTaFusion),
          ruleBase: base,
        }).map((o) => `${o.suffix}:${o.stem}`),
        nonactive: generateWord({
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
            parsedVerb: p,
          },
        })?.result || '',
      };
    });
    return JSON.stringify(out);
  } catch (error) {
    return JSON.stringify({ error: String(error && error.message || error), stack: String(error && error.stack || '') });
  }
})();
