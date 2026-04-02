(function () {
  return JSON.stringify({
    akwi: getVisibleNonactiveDerivationOptions('akwi', 'akwi', { isTransitive: true, ruleBase: 'akwi' }).map((o) => o.suffix),
    temi: getVisibleNonactiveDerivationOptions('temi', 'temi', { isTransitive: false, ruleBase: 'temi' }).map((o) => o.suffix),
    iksa: getVisibleNonactiveDerivationOptions('iksa', 'iksa', { isTransitive: true, ruleBase: 'iksa' }).map((o) => o.suffix),
  });
})();
