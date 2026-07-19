# Readiness Policy

`npm run verify:readiness` is the repository handoff gate. It passes only when every responsibility below has a successful proof for its exact current inputs.

| Responsibility | Command | Required proof |
| --- | --- | --- |
| Foundation | `npm run verify:foundation` | Canonical runtime manifest, shared-action alignment, grammar data, and the exact regular suite. |
| Canvas Lessons 20–22 | `npm run verify:canvas:lessons20-22` | Exhaustive Lesson 20 coverage and cross-lesson formula/layer coverage. |
| Canvas Lessons 24–26 | `npm run verify:canvas:lessons24-26` | Complete examples, selected witnesses, productive families, and complete Lesson 26 coverage. |
| Lexical evidence | `npm run verify:evidence` | Karttunen inventory integrity and proof that lexical evidence cannot authorize grammar. |
| Browser delivery | `npm run verify:delivery` | The shipped single-module browser path consumes canonical typed authority without formula-string authority. |

The overlap is deliberate. Each responsibility tests a different failure boundary. A passing regular suite or a set of focused changed-path tests does not substitute for any later responsibility.

The readiness runner is content-addressed and resumable. Each atomic stage hashes its command and owning source inputs. Orchestration-only edits do not invalidate grammar proofs; a fingerprint-policy change must increment the runner's cache schema. A matching successful proof is reused, while a changed owning input reruns only the affected stages. Alignment and browser delivery always run fresh because they depend on live worktree and browser state. Independent cache misses use bounded parallelism. `npm run verify:readiness:fresh` deliberately bypasses every reusable proof, and `npm run verify:readiness:status` reports missing or stale proof without running it. The cache lives in ignored `.readiness-cache/` and is never source authority.

Focused suites may be used while implementing a bounded slice. They must be reported as focused evidence, not readiness. At a formal lesson or repository handoff, run `npm run verify:readiness` through browser delivery. If the command is stopped, skipped, or fails at any stage, record readiness as incomplete and name the missing responsibility. Completed atomic proofs survive interruption only while their exact fingerprints remain current. A one-run instruction to stop does not remove or waive the standing gate.

New checks belong first to the narrowest owning responsibility and must declare their inputs in `scripts/verify_readiness.mjs`. Add a new top-level readiness responsibility only when it protects a genuinely different failure boundary; do not append phase history directly to `verify:readiness`.
