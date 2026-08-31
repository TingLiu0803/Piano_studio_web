import Image from "next/image";
import { type Locale } from "@/content/site";
import {
  GAMES_APP_URL,
  PRACTICE_GAMES_PATH,
  getPracticeGamesCopy,
  mianbaoPhoto,
} from "@/content/practice-games";
import Band from "@/components/ui/Band";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

type PracticeGameInviteProps = {
  locale: Locale;
  /** GA `data-ga-placement` so hub vs play clicks can be split by surface. */
  placement: string;
};

/**
 * Server-rendered invitation to the practice-games hub. Visible in initial HTML.
 * Primary CTA stays on-site; play is an optional outbound shortcut.
 */
export default function PracticeGameInvite({
  locale,
  placement,
}: PracticeGameInviteProps) {
  const copy = getPracticeGamesCopy(locale);

  return (
    <Band tone="soft" divider py="lg">
      <div className="grid min-w-0 items-center gap-10 md:grid-cols-[0.85fr_1.15fr]">
        <figure className="min-w-0">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--border)] shadow-[var(--shadow-card)]">
            <Image
              src={mianbaoPhoto.src}
              alt={mianbaoPhoto.alt}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover object-[center_20%]"
            />
          </div>
          <figcaption className="mt-2.5 text-xs leading-relaxed text-[color:var(--text-muted)]">
            {copy.mianbaoCaption}
          </figcaption>
        </figure>
        <div className="min-w-0">
          <Badge tone="neutral" icon="music_note">
            {copy.inviteEyebrow}
          </Badge>
          <h2 className="mt-4 text-[length:var(--text-h2)] font-bold leading-[var(--leading-heading)] text-[color:var(--foreground)]">
            {copy.inviteTitle}
          </h2>
          <p className="mt-3 max-w-[52ch] text-base leading-relaxed text-[color:var(--text-body,var(--foreground))]">
            {copy.inviteBody}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              href={`/${locale}${PRACTICE_GAMES_PATH}`}
              variant="primary"
              size="lg"
              icon="arrow_forward"
              iconPosition="right"
              data-ga-event="practice_game_hub_click"
              data-ga-placement={placement}
            >
              {copy.invitePrimaryCta}
            </Button>
            <Button
              href={GAMES_APP_URL}
              newTab
              variant="outline"
              size="lg"
              icon="open_in_new"
              data-ga-event="practice_game_play_click"
              data-ga-placement={placement}
              data-ga-slug="music-theory-hub"
            >
              {copy.invitePlayCta}
            </Button>
          </div>
        </div>
      </div>
    </Band>
  );
}
