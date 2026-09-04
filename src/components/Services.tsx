import { useTranslations } from "next-intl";

const services = ["film", "reels", "teaser"] as const;

export default function Services() {
  const t = useTranslations("Services");

  return (
    <section
      id="usluge"
      className="scroll-mt-24 border-t border-line px-6 py-20 sm:px-10 lg:px-16 lg:py-28"
    >
      <h2 className="mb-10 font-display text-4xl lg:text-5xl">{t("title")}</h2>

      <ul>
        {services.map((service) => (
          <li
            key={service}
            className="grid gap-3 border-b border-line py-8 lg:grid-cols-12 lg:items-baseline lg:gap-8"
          >
            <h3 className="text-2xl lg:col-span-4">{t(`${service}.name`)}</h3>
            <p className="leading-relaxed text-ink-2 text-pretty lg:col-span-6">
              {t(`${service}.description`)}
            </p>
            <p className="text-rose lg:col-span-2 lg:text-right">
              {t("from")} {t(`${service}.price`)}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
