# Gotchas & Pitfalls

Things to watch out for in this codebase.

## [2026-01-26 11:03]
The .auto-claude directory is in .gitignore, so spec files (implementation_plan.json, build-progress.txt, deliverable documents) cannot be committed to git. Task progress is tracked via MCP tools and local files only.

_Context: Attempted to commit subtask-1-2 completion but git rejected due to .gitignore. Deliverables exist in .auto-claude/specs/ but are not version controlled._
