import { type Locale, content, siteConfig } from "@/content/site";
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
  const localized = content[locale as Locale];

  return (
    <div className="flex flex-col gap-12">
      <section className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-8 shadow-sm">
        <h1 className="text-3xl font-semibold">{localized.about.title}</h1>
        <p className="mt-4 text-sm text-[color:var(--muted-foreground)]">
          {localized.about.body}
        </p>
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
  );
}
