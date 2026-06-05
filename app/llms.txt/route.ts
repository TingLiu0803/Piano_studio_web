import { buildLlmsTxt } from "@/lib/llms";

/**
 * Serves `/llms.txt`, generated from `content/*` (see `lib/llms.ts`). Replaces
 * the former hand-maintained `public/llms.txt` so the AI-facing summary stays
 * in sync with the site. Static at build time; content only changes when the
 * source content does.
 */
export const dynamic = "force-static";

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, must-revalidate",
    },
  });
}
