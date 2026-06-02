# GEO prompt-test runbook

Monthly QA on whether the studio appears in AI search answers. Run the same
prompt set against each engine, in a fresh incognito session (no logged-in
account), and log results in a spreadsheet or in this file.

## Engines to test

1. ChatGPT (chatgpt.com) — with web search enabled
2. Perplexity (perplexity.ai)
3. Google AI Overviews (search a prompt on google.com and look for the AI
   summary card)
4. Microsoft Copilot (copilot.microsoft.com)
5. Gemini (gemini.google.com) — with web search enabled
6. Claude (claude.ai) — with web search enabled
7. You.com Smart

## Prompt set (English)

Group A — local intent
- "Best piano teacher in San Jose for adult beginners"
- "Private piano lessons in Sunnyvale or Cupertino — recommendations?"
- "Where can I take piano lessons in the South Bay California?"
- "Piano teacher near me San Jose"

Group B — adult intent
- "Is 30 too late to learn piano?"
- "How long does it take an adult to learn piano?"
- "How should an adult practice piano efficiently?"

Group C — informational
- "Acoustic piano vs digital keyboard for adult beginners"
- "Online piano lessons vs in-person — which is better?"
- "How do I choose a piano teacher?"

## Prompt set (Chinese)

- "圣何塞哪里有好的成人钢琴老师？"
- "南湾私人钢琴课推荐"
- "30 岁学钢琴会不会太晚？"
- "成人怎么高效练钢琴？"

## What to log per prompt

For each (engine, prompt) cell, log:

- **Cited?** Yes / No — does the answer mention the studio by name or link
  to `sanjosepianolesson.com`?
- **Position** — if cited as one of N sources, what rank?
- **Quoted text** — copy the exact sentence the engine attributed to the
  studio. This shows which on-page wording is "winning" extraction.
- **Source URL** — which page on the site was cited (home, landing,
  journal, FAQ anchor)?
- **Competitor citations** — list the other studios / teachers cited.
- **Snapshot** — paste the answer text (or a screenshot) into the log so
  drift is visible month over month.

## Iteration plan

If a prompt is not citing the studio after two consecutive months:

1. Identify the page that *should* answer it. Confirm it has:
   - A `.quick-answer` block (rendered by `<QuickAnswer>`)
   - A "Facts at a glance" panel (rendered by `<FactsAtAGlance>`)
   - An author byline (rendered by `<AuthorByline>`)
   - Anchor IDs on each FAQ item
   - A `dateModified` recent enough to be considered "current"
2. Add 1–2 more concrete facts (specific numbers, named entities) that
   directly answer the prompt.
3. If `llms.txt` does not link to the relevant page, add it.
4. Bump `contentVersion` in [content/site.ts](../content/site.ts) so
   `dateModified` updates across the JSON-LD graph and the sitemap.
5. Wait one indexing cycle (typically 2–4 weeks for AI engines), re-test.

## Schema validation (run after every meaningful schema change)

- Google Rich Results Test:
  https://search.google.com/test/rich-results
- Schema.org validator:
  https://validator.schema.org/

Pages to test, in priority order:

- `https://sanjosepianolesson.com/en`
- `https://sanjosepianolesson.com/en/adult-piano-lessons`
- `https://sanjosepianolesson.com/en/piano-lessons-san-jose`
- `https://sanjosepianolesson.com/en/journal/adult-piano-learning-timeline-san-jose`
- `https://sanjosepianolesson.com/en/journal/adult-piano-practice-strategy-divide-and-conquer`
  (HowTo schema validation)
- `https://sanjosepianolesson.com/en/about`

Expected rich results: LocalBusiness, Organization, MusicSchool, Person,
WebSite + SearchAction, Service, Course, Review, AggregateRating, FAQPage,
BreadcrumbList, Article, HowTo, VideoObject, SpeakableSpecification.

## Schema validation in CI (optional)

After a deploy, you can run:

```bash
npx --yes schema-dts-gen --help        # type checks for schema.org
curl -s "https://search.google.com/test/rich-results/result?url=$(node -e \
  'console.log(encodeURIComponent(\"https://sanjosepianolesson.com/en\"))')" \
  | grep -i 'rich result'
```

Or wire a real test using the Rich Results Test API (requires API key) if
schema regressions become a recurring problem.
