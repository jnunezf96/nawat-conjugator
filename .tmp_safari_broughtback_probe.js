(function () {
  const raws = ['-(matsa)', '-(pitsa)', '-(tajta)', '-(tema)', '-(iksa)'];
  if (typeof parseVerbInput !== 'function' || typeof buildPatientivoDerivations !== 'function' || typeof expandPatientivoNominalMarkerOptions !== 'function' || typeof buildPatientivoDerivationInput !== 'function') {
    return JSON.stringify({ error: 'missing-runtime-functions' });
  }
  const out = {};
  raws.forEach((raw) => {
    const p = parseVerbInput(raw);
    const input = buildPatientivoDerivationInput({
      verb: p.verb,
      analysisVerb: p.analysisVerb,
      rawAnalysisVerb: p.rawAnalysisVerb,
      sourceRawVerb: raw,
      isTransitive: Boolean(p.hasLeadingDash || p.isMarkedTransitive || p.isTaFusion || (typeof getBaseObjectSlots === 'function' && getBaseObjectSlots(p) > 0)),
      objectPrefix: '',
      directionalPrefix: p.directionalPrefix || '',
      isYawi: p.isYawi === true,
      hasImpersonalTaPrefix: p.hasImpersonalTaPrefix === true,
      boundPrefix: p.hasBoundMarker ? (p.sourcePrefix || '') : '',
      boundPrefixes: Array.isArray(p.boundPrefixes) ? p.boundPrefixes : [],
      boundExplicitFlags: Array.isArray(p.boundExplicitFlags) ? p.boundExplicitFlags : [],
      directionalPrefixFromSlash: p.directionalPrefixFromSlash || '',
      sourceSplitPrefix: p.hasBoundMarker ? (p.sourcePrefix || '') : '',
      sourcePrefix: p.sourcePrefix || '',
      sourceBase: p.sourceBase || p.canonical?.sourceBase || '',
      sourceCompositeBase: p.canonical?.slashCompositeRuleBase || '',
      hasSlashMarker: p.hasSlashMarker === true,
      hasSuffixSeparator: p.hasSuffixSeparator === true,
      hasLeadingDash: p.hasLeadingDash === true,
      hasBoundMarker: p.hasBoundMarker === true,
      hasCompoundMarker: p.hasCompoundMarker === true,
      hasOptionalSupportiveI: p.hasOptionalSupportiveI === true,
      hasNonspecificValence: (typeof resolveHasNonspecificValence === 'function' ? resolveHasNonspecificValence(p) : false),
      exactBaseVerb: p.exactBaseVerb || '',
      suppletiveStemSet: (typeof getSuppletiveStemSet === 'function' ? getSuppletiveStemSet(p) : null),
      rootPlusYaBase: p.rootPlusYaBase || '',
      rootPlusYaBasePronounceable: p.rootPlusYaBasePronounceable || '',
    });
    const rawDeriv = buildPatientivoDerivations(input) || [];
    const expanded = expandPatientivoNominalMarkerOptions(rawDeriv, 'nonactive') || [];
    out[raw] = {
      parsed: { verb: p.verb, analysisVerb: p.analysisVerb, exactBaseVerb: p.exactBaseVerb, hasLeadingDash: p.hasLeadingDash, isMarkedTransitive: p.isMarkedTransitive, baseSlots: (typeof getBaseObjectSlots === 'function' ? getBaseObjectSlots(p) : null) },
      rawDeriv: rawDeriv.map((e) => ({ verb: e.verb, suffix: e.subjectSuffix, stem: e.stem, sourceSuffix: e.nonactiveSourceSuffix || e.metadata?.nonactiveSourceSuffix || '' })),
      expanded: expanded.map((e) => ({ verb: e.verb, suffix: e.subjectSuffix, text: `${e.verb}${e.subjectSuffix}` })),
    };
  });
  return JSON.stringify(out);
})();
