"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

// Zadržava trenutnu stranicu i mijenja samo jezik u adresi.
export default function LanguageSwitcher() {
  const activeLocale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("LanguageSwitcher");

  return (
    <nav aria-label={t("label")} className="flex items-center gap-1">
      {routing.locales.map((locale, index) => (
        <span key={locale} className="flex items-center gap-1">
          {index > 0 && <span className="text-ink-3">/</span>}
          <Link
            href={pathname}
            locale={locale}
            aria-current={locale === activeLocale ? "true" : undefined}
            className={
              locale === activeLocale
                ? "eyebrow text-rose"
                : "eyebrow text-ink-3 transition hover:text-ink-2"
            }
          >
            {locale.toUpperCase()}
          </Link>
        </span>
      ))}
    </nav>
  );
}
