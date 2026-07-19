"use strict";

// Transitional import location for maintenance tooling that still refers to the
// former harness module. Runtime construction is asynchronous and uses the
// canonical ESM installer graph; classic script evaluation is intentionally gone.
const { createModuleRuntime } = require("./module_runtime");

module.exports = {
  createModuleRuntime,
};
