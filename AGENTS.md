# AGENTS.md

## Project Rule

Treat Andrews as grammar architecture: order, roles, slots, boundaries, and dependencies. Do not import Classical Nahuatl surfaces directly into Nawat/Pipil behavior.

Nawat/Pipil evidence in this repo and user-provided forms decide actual forms, allomorphy, and examples.

## Coordination Rule

Before editing code:

1. Read `docs/CODEX_BOARD.md`.
2. Check current git status.
3. Identify the current explicit implementation target.
4. Keep changes scoped to that target.
5. Do not edit files assigned to another Codex thread or agent unless the board says the assignment is complete.

When coordination is needed, use the board as the stable shared file. Side-channel relays are architecture input; repo changes happen only from explicit implementation targets.

## NNC/S Rule

For ordinary nominal nuclear clause work:

- The formula is `#pers1-pers2(STEM)num1-num2#`.
- The predicate stem belongs inside parentheses.
- Subject connectors belong outside parentheses.
- State belongs to the predicate, not to the connector.
- There is no tense slot.
- Prefer dynamic behavior from input plus UI state over static fixture shortcuts.

## Done When

- Rules are represented in engine/data logic.
- UI reflects the grammar categories clearly and minimally.
- Old behavior that conflicts with the target is removed, blocked, or marked deprecated.
- Focused tests or validation examples exist for changed behavior.
- Validation and relevant test suites pass.
