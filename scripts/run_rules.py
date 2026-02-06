#!/usr/bin/env python3
import json
import pathlib
import subprocess
import sys
import textwrap


def main() -> int:
    root = pathlib.Path(__file__).resolve().parent.parent
    rules_path = root / "data" / "exact_rules.json"
    if len(sys.argv) > 1:
        rules_path = pathlib.Path(sys.argv[1]).expanduser()
    if not rules_path.exists():
        print(f"Rules file not found: {rules_path}", file=sys.stderr)
        return 2

    script_path = root / "script.js"
    if not script_path.exists():
        print(f"script.js not found at: {script_path}", file=sys.stderr)
        return 2
    context_path = root / "pret_universal_context.js"
    if not context_path.exists():
        print(f"pret_universal_context.js not found at: {context_path}", file=sys.stderr)
        return 2
    engine_path = root / "pret_universal_engine.js"
    if not engine_path.exists():
        print(f"pret_universal_engine.js not found at: {engine_path}", file=sys.stderr)
        return 2

    phonology_path = root / "data" / "static_phonology.json"
    constants_path = root / "data" / "static_constants.json"
    static_rules_path = root / "data" / "static_rules.json"
    redup_path = root / "data" / "static_redup.json"

    js_runner = textwrap.dedent(
        """
        const fs = require("fs");
        const path = require("path");
        const vm = require("vm");

        const rulesPath = process.argv[1];
        const contextPath = process.argv[2];
        const enginePath = process.argv[3];
        const scriptPath = process.argv[4];
        const phonologyPath = process.argv[5];
        const constantsPath = process.argv[6];
        const staticRulesPath = process.argv[7];
        const redupPath = process.argv[8];
        const rules = JSON.parse(fs.readFileSync(rulesPath, "utf8"));
        const contextCode = fs.readFileSync(contextPath, "utf8");
        const engineCode = fs.readFileSync(enginePath, "utf8");
        const code = fs.readFileSync(scriptPath, "utf8");

        const noop = () => {};
        const context = {
          console,
          window: {},
          document: {
            addEventListener: noop,
            getElementById: () => null,
            querySelector: () => null,
            querySelectorAll: () => [],
            createElement: () => ({
              appendChild: noop,
              setAttribute: noop,
              classList: { add: noop, remove: noop, toggle: noop },
              dataset: {},
              style: {},
            }),
            body: {},
            documentElement: { classList: { add: noop, remove: noop, toggle: noop } },
          },
          navigator: { userAgent: "" },
          localStorage: { getItem: () => null, setItem: noop, removeItem: noop },
          sessionStorage: { getItem: () => null, setItem: noop, removeItem: noop },
          location: { search: "" },
          setTimeout,
          clearTimeout,
          URLSearchParams,
        };

        vm.createContext(context);
        vm.runInContext(contextCode, context, { filename: path.basename(contextPath) });
        vm.runInContext(engineCode, context, { filename: path.basename(enginePath) });
        vm.runInContext(code, context, { filename: path.basename(scriptPath) });

        const applyStaticPhonology = context.applyStaticPhonology;
        const applyStaticConstants = context.applyStaticConstants;
        const applyStaticRules = context.applyStaticRules;
        const applyStaticRedup = context.applyStaticRedup;
        if (applyStaticPhonology) {
          const phonology = JSON.parse(fs.readFileSync(phonologyPath, "utf8"));
          applyStaticPhonology(phonology);
        }
        if (applyStaticConstants) {
          const constants = JSON.parse(fs.readFileSync(constantsPath, "utf8"));
          applyStaticConstants(constants);
        }
        if (applyStaticRules) {
          const staticRules = JSON.parse(fs.readFileSync(staticRulesPath, "utf8"));
          applyStaticRules(staticRules);
        }
        if (applyStaticRedup) {
          const redup = JSON.parse(fs.readFileSync(redupPath, "utf8"));
          applyStaticRedup(redup);
        }

        const buildPretUniversalContext = context.buildPretUniversalContext;
        const getPretUniversalClassCandidates = context.getPretUniversalClassCandidates;
        const buildPretUniversalClassA = context.buildPretUniversalClassA;

        if (!buildPretUniversalContext || !getPretUniversalClassCandidates || !buildPretUniversalClassA) {
          console.error("Missing expected preterite functions from loaded scripts.");
          process.exit(2);
        }

        const normalizeList = (values) => Array.from(new Set(values)).sort();
        const isEqualList = (left, right) => (
          left.length === right.length && left.every((value, index) => value === right[index])
        );

        const failures = [];
        let total = 0;

        const addFailure = (name, label, message) => {
          failures.push(`${name} (${label}): ${message}`);
        };

        const checkExactFlags = (context, name, label, flags) => {
          if (!flags) {
            return;
          }
          Object.entries(flags).forEach(([key, expected]) => {
            if (context[key] !== expected) {
              addFailure(
                name,
                label,
                `${key} expected ${expected ? "true" : "false"} but got ${context[key] ? "true" : "false"}`
              );
            }
          });
        };

        const checkList = (name, label, kind, actual, expected) => {
          if (!actual) {
            addFailure(name, label, `${kind} expected ${expected.join(", ")} but got none`);
            return;
          }
          if (!isEqualList(actual, expected)) {
            addFailure(name, label, `${kind} expected ${expected.join(", ")} but got ${actual.join(", ")}`);
          }
        };

        rules.cases.forEach((rule) => {
          const exactKey = rule.exactKey || null;
          const caseFlags = rule.expectExactFlags || null;
          const caseOptions = rule.options || {};
          rule.forms.forEach((form) => {
            total += 1;
            const options = Object.assign({}, caseOptions, form.options || {});
            const context = buildPretUniversalContext(
              form.verb,
              form.verb,
              rule.isTransitive,
              options
            );
            if (!context) {
              addFailure(rule.name, form.label, "context missing");
              return;
            }
            if (exactKey && context[exactKey] !== true) {
              addFailure(
                rule.name,
                form.label,
                `${exactKey} expected true but got ${context[exactKey] ? "true" : "false"}`
              );
            }
            checkExactFlags(context, rule.name, form.label, caseFlags);
            checkExactFlags(context, rule.name, form.label, form.expectExactFlags || null);

            const expect = form.expect || {};
            if (Object.prototype.hasOwnProperty.call(expect, "isReduplicated")) {
              if (context.isReduplicated !== expect.isReduplicated) {
                addFailure(
                  rule.name,
                  form.label,
                  `isReduplicated expected ${expect.isReduplicated ? "true" : "false"} but got ${context.isReduplicated ? "true" : "false"}`
                );
              }
            }
            if (expect.candidates) {
              const candidates = normalizeList(Array.from(getPretUniversalClassCandidates(context)));
              checkList(rule.name, form.label, "candidates", candidates, normalizeList(expect.candidates));
            }
            if (Object.prototype.hasOwnProperty.call(expect, "classASuffixes")) {
              const variants = buildPretUniversalClassA(context);
              const suffixes = variants ? normalizeList(variants.map((variant) => variant.suffix)) : null;
              checkList(rule.name, form.label, "class A suffixes", suffixes, normalizeList(expect.classASuffixes));
            }
            if (Object.prototype.hasOwnProperty.call(expect, "hasJAlt")) {
              const variants = buildPretUniversalClassA(context);
              const hasJAlt = variants ? variants.some((variant) => variant.base.endsWith("j")) : false;
              if (hasJAlt !== expect.hasJAlt) {
                addFailure(
                  rule.name,
                  form.label,
                  `w/j alternation expected ${expect.hasJAlt ? "true" : "false"} but got ${hasJAlt ? "true" : "false"}`
                );
              }
            }
          });
        });

        const summary = {
          total,
          passed: total - failures.length,
          failed: failures.length,
          failures,
        };
        console.log(JSON.stringify(summary, null, 2));
        if (failures.length) {
          process.exit(1);
        }
        """
    ).strip()

    result = subprocess.run(
        [
            "node",
            "-e",
            js_runner,
            str(rules_path),
            str(context_path),
            str(engine_path),
            str(script_path),
            str(phonology_path),
            str(constants_path),
            str(static_rules_path),
            str(redup_path),
        ],
        text=True,
        capture_output=True,
    )
    if result.stdout:
        sys.stdout.write(result.stdout)
    if result.stderr:
        sys.stderr.write(result.stderr)
    return result.returncode


if __name__ == "__main__":
    raise SystemExit(main())
