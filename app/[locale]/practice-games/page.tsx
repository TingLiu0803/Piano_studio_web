import Image from "next/image";
import { type Locale, content } from "@/content/site";
import {
  PRACTICE_GAMES_PATH,
  getPracticeGamesCopy,
  practiceGames,
} from "@/content/practice-games";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import JsonLd from "@/components/JsonLd";
import QuickAnswer from "@/components/QuickAnswer";
import AuthorByline from "@/components/AuthorByline";
import FactsAtAGlance from "@/components/FactsAtAGlance";
import Band from "@/components/ui/Band";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Icon from "@/components/ui/Icon";
import SectionHeading from "@/components/ui/SectionHeading";
import { buildMetadata, buildSpeakableJsonLd } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typed = locale as Locale;
  const copy = getPracticeGamesCopy(typed);
  return buildMetadata(typed, `/${typed}${PRACTICE_GAMES_PATH}`, undefined, {
    title: copy.seo.title,
    description: copy.seo.description,
  });
}

export default async function PracticeGamesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typed = locale as Locale;
  const copy = getPracticeGamesCopy(typed);
  const localized = content[typed];
  const path = `/${typed}${PRACTICE_GAMES_PATH}`;
  const quickAnswerLabel = typed === "en" ? "Quick answer" : "速答";

  return (
    <>
      <BreadcrumbJsonLd locale={typed} path={path} />
      <JsonLd data={buildSpeakableJsonLd(typed, path)} />

      <Band tone="white" py="lg">
        <Badge tone="neutral" icon="music_note">
          {copy.badge}
        </Badge>
        <h1 className="mt-4 max-w-full text-[2.25rem] font-black leading-[1.06] tracking-[-0.01em] text-[color:var(--mnb-ink)] md:max-w-[22ch] md:text-[3rem]">
          {copy.h1}
        </h1>
        <div className="mt-3">
          <AuthorByline locale={typed} />
        </div>
        <p className="mt-4 max-w-[70ch] break-words text-[length:var(--text-body-lg)] leading-relaxed text-[color:var(--text-muted)]">
          {copy.intro}
        </p>
        <div className="mt-8">
          <QuickAnswer label={quickAnswerLabel} text={copy.quickAnswer} />
        </div>
      </Band>

      <Band tone="white" py="none">
        <div className="flex flex-col gap-8 pb-12">
          <FactsAtAGlance
            title={copy.factsTitle}
            eyebrow={copy.factsEyebrow}
            facts={copy.facts}
          />
        </div>
      </Band>

      <Band tone="soft" divider py="lg">
        <SectionHeading
          eyebrow={copy.catalogEyebrow}
          title={copy.catalogTitle}
          subtitle={copy.catalogSubtitle}
        />
        <ul className="mt-8 grid min-w-0 gap-5 md:grid-cols-2">
          {practiceGames.map((game) => (
            <li key={game.id} className="min-w-0">
              <Card padding="none" className="h-full min-w-0 overflow-hidden" style={{ minWidth: 0 }}>
                <figure className="min-w-0">
                  <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-[color:var(--border)] bg-[color:var(--surface-soft)]">
                    <Image
                      src={game.screenshot.src}
                      alt={game.screenshot.alt[typed]}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-top"
                    />
                  </div>
                </figure>
                <div className="p-[var(--space-6)]">
                  <span className="text-[length:var(--text-label)] font-bold uppercase tracking-[var(--tracking-label)] text-[color:var(--tag-foreground)]">
                    {copy.badge}
                  </span>
                  <h3 className="mt-2 text-[length:var(--text-h3)] font-bold leading-[var(--leading-heading)] text-[color:var(--foreground)]">
                    {game.title[typed]}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[color:var(--text-body,var(--foreground))]">
                    {game.skill[typed]}
                  </p>
                  <p className="mt-2 text-[15px] leading-relaxed text-[color:var(--text-muted)]">
                    {game.audience[typed]}
                  </p>
                  <div className="mt-5 flex flex-col items-start gap-2">
                    <Button
                      href={game.url}
                      newTab
                      variant="primary"
                      icon="open_in_new"
                      data-ga-event="practice_game_play_click"
                      data-ga-placement="practice_games_hub"
                      data-ga-slug={game.id}
                    >
                      {copy.playCta}
                    </Button>
                    <p className="text-xs text-[color:var(--text-muted)]">{copy.playNote}</p>
                  </div>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      </Band>

      <Band tone="white" py="lg">
        <div className="grid min-w-0 items-start gap-8 md:grid-cols-[0.9fr_1.1fr]">
          <h2 className="text-[length:var(--text-h2)] font-bold leading-[var(--leading-heading)] text-[color:var(--foreground)]">
            {copy.howWeUseTitle}
          </h2>
          <div className="min-w-0">
            <p className="text-base leading-relaxed text-[color:var(--text-body,var(--foreground))]">
              {copy.howWeUseBody}
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {copy.howWeUseBullets.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-[15px] leading-relaxed text-[color:var(--text-body,var(--foreground))]"
                >
                  <Icon
                    name="music_note"
                    size={18}
                    style={{ color: "var(--accent)", flexShrink: 0, marginTop: "2px" }}
                  />
                  <span className="min-w-0">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Band>

      <Band tone="inverse" py="sm">
        <div className="grid min-w-0 items-center gap-8 md:grid-cols-[1.2fr_0.8fr]">
          <div className="min-w-0">
            <h2 className="text-[2rem] font-black">{localized.trial.title}</h2>
            <p className="mt-3 max-w-[48ch] text-base opacity-85">
              {localized.trial.description}
            </p>
          </div>
          <div className="flex min-w-0 flex-col items-start gap-2.5">
            <Button
              href={`/${typed}/trial`}
              variant="secondary"
              size="lg"
              icon="calendar_month"
              data-ga-event="trial_cta_click"
              data-ga-placement="practice_games_footer"
            >
              {localized.hero.primaryCta}
            </Button>
            <p className="text-xs opacity-75">{localized.hero.ctaNote}</p>
          </div>
        </div>
      </Band>
    </>
  );
}
