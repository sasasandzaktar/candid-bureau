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
    <nav aria-label={t("label")} className="flex items-center gap-1 text-sm">
      {routing.locales.map((locale) => {
        const isActive = locale === activeLocale;

        return (
          <Link
            key={locale}
            href={pathname}
            locale={locale}
            aria-current={isActive ? "true" : undefined}
            className={
              isActive
                ? "px-2 py-1 font-medium underline underline-offset-4"
                : "px-2 py-1 opacity-60 hover:opacity-100"
            }
          >
            {locale.toUpperCase()}
          </Link>
        );
      })}
    </nav>
  );
}
