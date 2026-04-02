(function () {
  const raws = ['-(matsa)', '-(pitsa)', '-(tajta)', '-(iksa)'];
  const out = {};
  raws.forEach((raw) => {
    const parsedVerb = parseVerbInput(raw);
    const generated = generateWord({
      silent: true,
      skipValidation: true,
      override: {
        tenseMode: TENSE_MODE.sustantivo,
        derivationMode: DERIVATION_MODE.active,
        voiceMode: VOICE_MODE.active,
        derivationType: DERIVATION_TYPE.direct,
        subjectPrefix: '',
        subjectSuffix: '',
        objectPrefix: '',
        verb: raw,
        tense: 'patientivo',
        parsedVerb,
        patientivoSource: 'nonactive',
        patientivoOwnership: 'absolute',
        patientivoNominalSuffix: null,
      },
    });
    out[raw] = generated;
  });
  return JSON.stringify(out);
})();
