(function () {
  const raw = '-(iksa)';
  const parsedVerb = parseVerbInput(raw);
  const previous = (typeof getSelectedNonactiveSuffix === 'function') ? getSelectedNonactiveSuffix() : null;
  const make = (suffix) => {
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
    });
  };
  const result = {
    any: make(null),
    u: make('u'),
    lu: make('lu'),
  };
  if (typeof setSelectedNonactiveSuffix === 'function') setSelectedNonactiveSuffix(previous);
  return JSON.stringify(result);
})();
