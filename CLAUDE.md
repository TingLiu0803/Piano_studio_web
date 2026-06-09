# Project guide for Claude

- Any UI/visual work: follow the `piano-studio-design-system` skill.
- Any change touching pages, content/*.ts, metadata, or routes: run the
  `piano-studio-geo-guardrails` checklist before finishing.
- Design rationale lives in docs/design/ (01 diagnosis, 02 design language, 03 this workflow).
- All user-facing copy lives in content/*.ts with both en and zh; never hardcode strings.
- After UI changes, verify both /en and /zh render and `npm run lint` passes.