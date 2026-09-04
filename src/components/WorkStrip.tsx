import { useTranslations } from "next-intl";
import { works } from "@/lib/works";
import VideoEmbed from "./VideoEmbed";

export default function WorkStrip() {
  const t = useTranslations("Work");

  return (
    <section id="radovi" className="scroll-mt-24 py-20 lg:py-28">
      <div className="mb-10 flex flex-wrap items-baseline justify-between gap-4 px-6 sm:px-10 lg:px-16">
        <h2 className="font-display text-4xl lg:text-5xl">{t("title")}</h2>
        <a
          href="#kontakt"
          className="eyebrow text-rose transition hover:text-rose-light"
        >
          {t("all")} &rarr;
        </a>
      </div>

      {/* Vodoravna traka: vertikalne kartice 9:16, kakav je i sadržaj */}
      <ul className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-2 sm:px-10 lg:px-16">
        {works.map((work) => (
          <li
            key={work.slug}
            className="w-[68vw] shrink-0 snap-start sm:w-[42vw] lg:w-[19rem]"
          >
            <VideoEmbed
              source={work.video}
              poster={work.poster}
              label={work.couple}
              aspect="aspect-[9/16]"
              className="rounded-sm border border-line-rose"
            />
            <div className="pt-4">
              <p className="text-[0.95rem] text-ink">{work.couple}</p>
              <p className="text-sm text-ink-3">
                {work.location} &middot; {work.year}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
