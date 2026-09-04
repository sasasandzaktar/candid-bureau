import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { showreel } from "@/lib/works";
import VideoEmbed from "./VideoEmbed";

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="relative flex flex-1 flex-col justify-center overflow-hidden px-6 pb-10 pt-16 sm:px-10 lg:px-16 lg:pb-16 lg:pt-24">
      {/* Topli sjaj iza naslova — daje dubinu tamnoj podlozi */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[70vh] bg-[radial-gradient(70%_60%_at_50%_0%,rgba(206,132,145,0.22),transparent_70%)]"
      />

      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-10 text-center">
        <p className="eyebrow text-rose">{t("eyebrow")}</p>

        <h1 className="font-display text-5xl leading-[1.04] text-balance sm:text-6xl lg:text-7xl">
          {t("titleLead")}{" "}
          <em className="text-rose">{t("titleAccent")}</em>
        </h1>

        <p className="max-w-xl text-lg leading-relaxed text-ink-2 text-pretty">
          {t("intro")}
        </p>

        <VideoEmbed
          source={showreel}
          label={t("showreelLabel")}
          aspect="aspect-video"
          className="w-full rounded-sm border border-line-rose"
        />

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/kontakt"
            className="bg-bordo px-8 py-4 text-sm text-rose-light transition hover:bg-rose hover:text-paper"
          >
            {t("ctaPrimary")}
          </Link>
          <a
            href="#radovi"
            className="border-b border-rose pb-1 text-sm text-ink-2 transition hover:text-rose-light"
          >
            {t("ctaSecondary")}
          </a>
        </div>
      </div>
    </section>
  );
}
