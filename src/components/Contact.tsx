import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Contact() {
  const t = useTranslations("Contact");

  return (
    <section
      id="kontakt"
      className="scroll-mt-24 bg-rose px-6 py-24 text-paper sm:px-10 lg:px-16 lg:py-32"
    >
      <div className="flex flex-col justify-between gap-12 lg:flex-row lg:items-end">
        <div>
          <h2 className="mb-5 font-display text-5xl leading-[1.06] text-rose-light text-pretty lg:text-6xl">
            {t("titleLead")} <em>{t("titleAccent")}</em>
          </h2>
          <p className="mb-8 max-w-md text-lg leading-relaxed text-paper/80">
            {t("body")}
          </p>
          <Link
            href="/kontakt"
            className="inline-block bg-paper px-8 py-4 text-sm text-rose-light transition hover:bg-bordo"
          >
            {t("cta")}
          </Link>
        </div>

        <ul className="flex flex-col gap-2.5 text-rose-light lg:text-right">
          <li>
            <a href={`mailto:${t("email")}`} className="hover:underline">
              {t("email")}
            </a>
          </li>
          <li>
            <a href={`tel:${t("phone")}`} className="hover:underline">
              {t("phone")}
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/candid.bureau/"
              target="_blank"
              rel="noreferrer"
              className="text-rose-light/75 hover:text-rose-light"
            >
              @candid.bureau
            </a>
          </li>
          <li>
            <a
              href="https://www.tiktok.com/@candid.bureau"
              target="_blank"
              rel="noreferrer"
              className="text-rose-light/75 hover:text-rose-light"
            >
              TikTok
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
