# Rules

## Workflow
- Plan mode for any 3+ step task. Re-plan if stuck.
- Subagents for parallel/independent work; one task per agent.
- Never mark done without proving it works (run build, tests, curl).
- After user correction: update `tasks/lessons.md`.

## Task Management
- Write plan to `tasks/todo.md` before implementing.
- Mark items complete as you go.
- Update `tasks/lessons.md` after mistakes.

## Code Principles
- Simplicity first. Minimal impact. Root causes only.
- No mutation — return new objects.
- No hardcoded secrets. Validate at system boundaries.
- Strict TypeScript — no `any`.

## Project: ContentConcepts
- Stack: Next.js 15, TypeScript, Tailwind v4, shadcn/ui, next-intl v3, Supabase, Vercel
- Brief: `cc-briefing-docs/contentconcepts-project-brief.md`
- 10 build phases — implement in order, verify each before next.
- No lorem ipsum. Use content from `cc-briefing-docs/`.
- Never commit `.env.local`. Never set `published: true` in AI API.
