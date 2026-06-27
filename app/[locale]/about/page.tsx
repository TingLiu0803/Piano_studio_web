import { type Locale, content, siteConfig } from "@/content/site";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import AuthorByline from "@/components/AuthorByline";
import Band from "@/components/ui/Band";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Icon from "@/components/ui/Icon";
import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata(locale as Locale, `/${locale}/about`, "about");
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typed = locale as Locale;
  const localized = content[typed];
  const entityLinksTitle = typed === "en" ? "Lineage and affiliations" : "训练背景与公益身份";
  const entityIntro =
    typed === "en"
      ? "Studio identity is grounded in named institutions and people. Direct links so you can verify each affiliation:"
      : "工作室的身份由具体的机构与人员支撑。以下链接可直接核对每一项关联：";

  const entityLinks: Array<[string, string, string]> = [
    [
      siteConfig.entityLinks.sfcm.name,
      siteConfig.entityLinks.sfcm.url,
      typed === "en" ? "trained under Erna Gulabyan" : "师从 Erna Gulabyan",
    ],
    [
      siteConfig.entityLinks.stanford.name,
      siteConfig.entityLinks.stanford.url,
      typed === "en" ? "trained under Frank Levy" : "师从 Frank Levy",
    ],
    [
      siteConfig.entityLinks.musicnbrain.name,
      siteConfig.entityLinks.musicnbrain.url,
      typed === "en"
        ? "board member; partner nonprofit for youth performance and community music programs"
        : "理事；青少年演出与社区音乐项目公益伙伴",
    ],
  ];

  return (
    <>
      <BreadcrumbJsonLd locale={typed} path={`/${typed}/about`} />

      {/* Hero */}
      <Band tone="white" py="lg">
        <div className="grid items-start gap-10 md:grid-cols-[0.85fr_1.15fr]">
          <div className="relative aspect-square w-full overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--border)] shadow-[var(--shadow-card)]">
            <Image
              src={siteConfig.images.teacher}
              alt={`${siteConfig.ownerName}, ${siteConfig.city} piano teacher`}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
          <div>
            <Badge tone="neutral" icon="person">{localized.nav.about}</Badge>
            <h1 className="mt-4 text-[2.25rem] font-black leading-[1.06] tracking-[-0.01em] text-[color:var(--mnb-ink)] md:text-[2.75rem]">
              {localized.about.title}
            </h1>
            <div className="mt-3">
              <AuthorByline locale={typed} />
            </div>
            <ul className="mt-5 flex flex-col gap-2.5">
              {localized.about.summaryBullets.map((line) => (
                <li key={line} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-[color:var(--text-body,var(--foreground))]">
                  <Icon name="check_circle" size={20} style={{ color: "var(--mnb-logo-green-deep)", flexShrink: 0, marginTop: "1px" }} />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-col gap-4">
              {localized.about.body.split("\n\n").map((paragraph) => (
                <p key={paragraph} className="text-base leading-relaxed text-[color:var(--text-body,var(--foreground))]">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Band>

      {/* Lineage + board member */}
      <Band tone="soft" divider py="lg">
        <div className="grid gap-5 lg:grid-cols-2">
          <Card padding="lg">
            <h2 className="text-[length:var(--text-h3)] font-bold text-[color:var(--foreground)]">{entityLinksTitle}</h2>
            <p className="mt-2 text-sm text-[color:var(--text-muted)]">{entityIntro}</p>
            <ul className="mt-4 flex flex-col gap-2.5 text-[15px]">
              {entityLinks.map(([name, url, note]) => (
                <li key={name}>
                  <a href={url} target="_blank" rel="noopener" className="font-bold text-[color:var(--link)] underline-offset-4 hover:underline">
                    {name}
                  </a>
                  <span className="text-[color:var(--text-muted)]"> — {note}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card padding="lg">
            <h2 className="text-[length:var(--text-h3)] font-bold text-[color:var(--foreground)]">
              {localized.sections.partnershipBoardMemberTitle}
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-[color:var(--text-muted)]">
              {localized.sections.partnershipBoardMemberBody}
            </p>
            <a
              href="https://www.musicnbrain.com/"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[color:var(--link)] underline-offset-4 hover:text-[color:var(--link-hover)] hover:underline"
            >
              <Icon name="open_in_new" size={16} />
              {localized.sections.partnershipCta}
            </a>
          </Card>
        </div>
      </Band>

      {/* Services + who + studio facts */}
      <Band tone="white" py="lg">
        <div className="grid gap-5 md:grid-cols-2">
          <Card padding="lg">
            <h2 className="text-[length:var(--text-h3)] font-bold text-[color:var(--foreground)]">{localized.services.title}</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {localized.services.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-[color:var(--text-body,var(--foreground))]">
                  <Icon name="music_note" size={18} style={{ color: "var(--accent)", flexShrink: 0, marginTop: "2px" }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card padding="lg">
            <h2 className="text-[length:var(--text-h3)] font-bold text-[color:var(--foreground)]">Who I teach</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[color:var(--text-body,var(--foreground))]">
              {siteConfig.ageRange} · {siteConfig.serviceArea}
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-[color:var(--text-body,var(--foreground))]">
              Every student receives clear highly customized lesson plans to enable meaningful progress without sacrificing artistic identity.
            </p>
          </Card>
        </div>

        <div className="mt-5 grid gap-5 text-sm text-[color:var(--text-muted)] md:grid-cols-3">
          <Card padding="md">
            <div className="text-[length:var(--text-label)] font-bold uppercase tracking-[var(--tracking-label)] text-[color:var(--text-muted)]">
              Studio focus
            </div>
            <p className="mt-2 text-[color:var(--text-body,var(--foreground))]">
              Technique, decoding of music language, highly personalized coaching
            </p>
          </Card>
          <Card padding="md">
            <div className="text-[length:var(--text-label)] font-bold uppercase tracking-[var(--tracking-label)] text-[color:var(--text-muted)]">
              Formats
            </div>
            <p className="mt-2 text-[color:var(--text-body,var(--foreground))]">{siteConfig.lessonFormats.join(" · ")}</p>
          </Card>
          <Card padding="md">
            <div className="text-[length:var(--text-label)] font-bold uppercase tracking-[var(--tracking-label)] text-[color:var(--text-muted)]">
              Partnership
            </div>
            <p className="mt-2 text-[color:var(--text-body,var(--foreground))]">
              In collaboration with MusicNBrain performance and community programs.
            </p>
            <Link href={`/${typed}/contact`} className="mt-2 inline-flex text-xs font-bold text-[color:var(--link)]">
              Contact for partnership projects
            </Link>
          </Card>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={`/${typed}/trial`} variant="primary" size="lg" icon="calendar_month">
            {localized.hero.primaryCta}
          </Button>
          <Button href={`/${typed}/contact`} variant="outline" size="lg">
            {localized.nav.contact}
          </Button>
        </div>
      </Band>
    </>
  );
}
