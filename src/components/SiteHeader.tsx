import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";

// Sekcije žive na naslovnici, pa se na njih vodi punom adresom s
// sidrom — tako rade i s kontakt stranice, ne samo s naslovnice.
const sections = [
  { hash: "radovi", key: "work" },
  { hash: "o-nama", key: "about" },
  { hash: "usluge", key: "services" },
] as const;

function SectionLinks({ className = "" }: { className?: string }) {
  const t = useTranslations("Nav");
  const locale = useLocale();

  return (
    <ul className={className}>
      {sections.map((section) => (
        <li key={section.hash}>
          <a
            href={`/${locale}#${section.hash}`}
            className="eyebrow text-ink-2 transition hover:text-rose-light"
          >
            {t(section.key)}
          </a>
        </li>
      ))}
      <li>
        <Link
          href="/kontakt"
          className="eyebrow text-ink-2 transition hover:text-rose-light"
        >
          {t("contact")}
        </Link>
      </li>
    </ul>
  );
}

export default function SiteHeader() {
  return (
    <header className="px-6 py-6 sm:px-10 lg:px-16">
      <div className="flex items-center justify-between gap-4">
        <Link href="/" aria-label="Candid Bureau">
          <Logo />
        </Link>

        <div className="flex items-center gap-8">
          {/* Na širem ekranu navigacija stoji uz prebacivač jezika */}
          <SectionLinks className="hidden items-center gap-8 sm:flex" />
          <LanguageSwitcher />
        </div>
      </div>

      {/* Na mobitelu ide u vlastiti red ispod — inače bi je nestalo */}
      <nav aria-label="Candid Bureau">
        <SectionLinks className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 sm:hidden" />
      </nav>
    </header>
  );
}
