import { type Locale, content, siteConfig } from "@/content/site";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import AuthorByline from "@/components/AuthorByline";
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

  return (
    <>
      <BreadcrumbJsonLd locale={typed} path={`/${typed}/about`} />
      <div className="flex flex-col gap-12">
        <section className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            <div className="shrink-0">
              <div className="relative h-32 w-32 overflow-hidden rounded-full border border-[color:var(--border)] bg-[color:var(--surface-muted)] md:h-40 md:w-40">
                <Image
                  src={siteConfig.images.teacher}
                  alt={`${siteConfig.ownerName}, ${siteConfig.city} piano teacher`}
                  fill
                  sizes="(min-width: 768px) 160px, 128px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-semibold">{localized.about.title}</h1>
              <div className="mt-2">
                <AuthorByline locale={typed} />
              </div>
              {(localized.about as { summaryBullets?: string[] }).summaryBullets?.length ? (
                <ul className="mt-4 space-y-2 text-sm text-[color:var(--muted-foreground)]">
                  {(localized.about as { summaryBullets: string[] }).summaryBullets.map(
                    (line) => (
                      <li key={line} className="flex items-start gap-2">
                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[color:var(--accent)]" />
                        <span>{line}</span>
                      </li>
                    ),
                  )}
                </ul>
              ) : null}
            </div>
          </div>
          <div className="mt-6 space-y-4 text-sm text-[color:var(--muted-foreground)]">
            {localized.about.body.split("\n\n").map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-8 rounded-2xl border border-[color:var(--accent)] bg-[color:var(--tag)] p-5">
            <h2 className="text-lg font-semibold text-[color:var(--foreground)]">
              {entityLinksTitle}
            </h2>
            <p className="mt-2 text-sm text-[color:var(--muted-foreground)]">{entityIntro}</p>
            <ul className="mt-3 space-y-1.5 text-sm">
              <li>
                <a
                  href={siteConfig.entityLinks.sfcm.url}
                  target="_blank"
                  rel="noopener"
                  className="font-semibold text-[color:var(--link)] underline-offset-4 hover:underline"
                >
                  {siteConfig.entityLinks.sfcm.name}
                </a>
                <span className="ml-1 text-[color:var(--muted-foreground)]">
                  {typed === "en"
                    ? "— trained under Erna Gulabyan"
                    : "— 师从 Erna Gulabyan"}
                </span>
              </li>
              <li>
                <a
                  href={siteConfig.entityLinks.stanford.url}
                  target="_blank"
                  rel="noopener"
                  className="font-semibold text-[color:var(--link)] underline-offset-4 hover:underline"
                >
                  {siteConfig.entityLinks.stanford.name}
                </a>
                <span className="ml-1 text-[color:var(--muted-foreground)]">
                  {typed === "en"
                    ? "— trained under Frank Levy"
                    : "— 师从 Frank Levy"}
                </span>
              </li>
              <li>
                <a
                  href={siteConfig.entityLinks.musicnbrain.url}
                  target="_blank"
                  rel="noopener"
                  className="font-semibold text-[color:var(--link)] underline-offset-4 hover:underline"
                >
                  {siteConfig.entityLinks.musicnbrain.name}
                </a>
                <span className="ml-1 text-[color:var(--muted-foreground)]">
                  {typed === "en"
                    ? "— board member; partner nonprofit for youth performance and community music programs"
                    : "— 理事；青少年演出与社区音乐项目公益伙伴"}
                </span>
              </li>
            </ul>
          </div>
          <div className="mt-6 rounded-2xl border border-[color:var(--accent)] bg-[color:var(--tag)] p-5">
            <h2 className="text-lg font-semibold text-[color:var(--foreground)]">
              {localized.sections.partnershipBoardMemberTitle}
            </h2>
            <p className="mt-2 text-sm text-[color:var(--muted-foreground)]">
              {localized.sections.partnershipBoardMemberBody}
            </p>
            <a
              href="https://www.musicnbrain.com/"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex text-sm font-semibold text-[color:var(--link)] underline-offset-4 hover:text-[color:var(--link-hover)] hover:underline"
            >
              {localized.sections.partnershipCta}
            </a>
          </div>
          <div className="mt-6 grid gap-4 text-sm text-[color:var(--muted-foreground)] md:grid-cols-2">
            <div>
              <div className="text-xs uppercase tracking-wide text-[color:var(--muted-foreground)]">
                Studio focus
              </div>
              <p className="mt-2">
                Technique, decoding of music language, highly personalized coaching
              </p>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-[color:var(--muted-foreground)]">
                Formats
              </div>
              <p className="mt-2">{siteConfig.lessonFormats.join(" · ")}</p>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide text-[color:var(--muted-foreground)]">
                Partnership
              </div>
              <p className="mt-2">
                In collaboration with MusicNBrain performance and community programs.
              </p>
              <Link
                href={`/${typed}/contact`}
                className="mt-2 inline-flex text-xs font-semibold text-[color:var(--link)]"
              >
                Contact for partnership projects
              </Link>
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-sm">
            <h2 className="text-xl font-semibold">{localized.services.title}</h2>
            <ul className="mt-4 flex list-disc flex-col gap-2 pl-5 text-sm text-[color:var(--muted-foreground)]">
              {localized.services.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Who I teach</h2>
            <p className="mt-3 text-sm text-[color:var(--muted-foreground)]">
              {siteConfig.ageRange} · {siteConfig.serviceArea}
            </p>
            <p className="mt-3 text-sm text-[color:var(--muted-foreground)]">
              Every student receives clear highly customized lesson plans to enable meaningful progress without sacrificing artistic identity.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
