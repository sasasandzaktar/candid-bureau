import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ContactForm from "@/components/ContactForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ContactPage" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function ContactPage({
  params,
}: PageProps<"/[locale]/kontakt">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("ContactPage");

  return (
    <>
      <SiteHeader />

      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-16 sm:px-10 lg:py-24">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow mb-5 text-rose">{t("eyebrow")}</p>
          <h1 className="mb-6 font-display text-4xl leading-tight text-balance sm:text-5xl">
            {t("title")}
          </h1>
          <p className="text-lg leading-relaxed text-ink-2 text-pretty">
            {t("intro")}
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <h2 className="eyebrow mb-5 text-ink-3">{t("directTitle")}</h2>
            <ul className="flex flex-col gap-3 text-ink-2">
              <li>
                <a
                  href={`mailto:${t("email")}`}
                  className="transition hover:text-rose-light"
                >
                  {t("email")}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${t("phone")}`}
                  className="transition hover:text-rose-light"
                >
                  {t("phone")}
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/candid.bureau/"
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-rose-light"
                >
                  @candid.bureau
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@candid.bureau"
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-rose-light"
                >
                  TikTok
                </a>
              </li>
            </ul>

            <p className="mt-8 text-sm leading-relaxed text-ink-3">
              {t("responseTime")}
            </p>
          </aside>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
