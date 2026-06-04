import { buildLlmsFullTxt } from "@/lib/llms";

/**
 * Serves `/llms-full.txt`: the long-form companion to `/llms.txt`, containing
 * the studio's page summaries and full FAQ answers (both locales) so AI systems
 * can quote them verbatim. Generated from `content/*` via `lib/llms.ts`; static
 * at build time.
 */
export const dynamic = "force-static";

export function GET() {
  return new Response(buildLlmsFullTxt(), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, must-revalidate",
    },
  });
}
