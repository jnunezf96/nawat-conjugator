"use strict";

/**
 * Minimal test runner for Nawat Conjugator grammar tests.
 * No external dependencies. Works with Node.js vm_harness context.
 */

function createSuite(name) {
    let passed = 0;
    let failed = 0;
    const failures = [];

    return {
        name,
        /** Assert strict deep equality (via JSON round-trip). */
        eq(label, actual, expected) {
            const a = JSON.stringify(actual);
            const e = JSON.stringify(expected);
            if (a === e) {
                passed++;
            } else {
                failed++;
                failures.push(`  FAIL: ${label}\n    expected: ${e}\n    actual:   ${a}`);
            }
        },
        /** Assert truthiness. */
        ok(label, value) {
            if (value) {
                passed++;
            } else {
                failed++;
                failures.push(`  FAIL: ${label}\n    expected truthy, got: ${JSON.stringify(value)}`);
            }
        },
        /** Assert falsiness. */
        no(label, value) {
            if (!value) {
                passed++;
            } else {
                failed++;
                failures.push(`  FAIL: ${label}\n    expected falsy, got: ${JSON.stringify(value)}`);
            }
        },
        summarize() {
            const total = passed + failed;
            if (failed > 0) {
                process.stderr.write(`[FAIL] ${name}: ${passed}/${total} passed\n`);
                failures.forEach(f => process.stderr.write(f + "\n"));
            } else {
                process.stdout.write(`[PASS] ${name}: ${total}/${total} passed\n`);
            }
            return { name, total, passed, failed };
        },
    };
}

function runAll(suites) {
    const results = suites.map(s => s.summarize());
    const totalPassed = results.reduce((a, r) => a + r.passed, 0);
    const totalFailed = results.reduce((a, r) => a + r.failed, 0);
    const total = totalPassed + totalFailed;
    const line = `\nTotal: ${totalPassed}/${total} tests passed across ${results.length} suite(s)\n`;
    if (totalFailed > 0) {
        process.stderr.write(line);
        process.exit(1);
    } else {
        process.stdout.write(line);
    }
}

module.exports = { createSuite, runAll };
