import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations("About");

  return (
    <section
      id="o-nama"
      className="scroll-mt-24 border-t border-line px-6 py-20 sm:px-10 lg:px-16 lg:py-28"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Portret — mjesto za sliku dok ne stigne prava */}
        <div className="lg:col-span-5">
          <div className="aspect-[4/5] rounded-sm bg-paper-3" />
        </div>

        <div className="flex flex-col justify-center lg:col-span-6 lg:col-start-7">
          <p className="eyebrow mb-5 text-rose">{t("eyebrow")}</p>
          <h2 className="mb-6 font-display text-4xl leading-tight text-pretty lg:text-5xl">
            {t("title")}
          </h2>
          <p className="mb-5 text-lg leading-relaxed text-ink-2 text-pretty">
            {t("body")}
          </p>
          <p className="text-[0.95rem] text-rose">{t("signature")}</p>
        </div>
      </div>
    </section>
  );
}
