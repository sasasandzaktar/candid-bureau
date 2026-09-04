import { getTranslations, setRequestLocale } from "next-intl/server";
import LanguageSwitcher from "@/components/LanguageSwitcher";

// Privremena stranica — služi samo da se vidi da dvojezičnost radi.
// Pravi izgled dolazi u sljedećem koraku.
export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Home");
  const nav = await getTranslations("Nav");

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-6 py-16">
      <header className="flex items-center justify-between">
        <span className="font-medium tracking-tight">Candid Bureau</span>
        <LanguageSwitcher />
      </header>

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-medium tracking-tight text-balance sm:text-4xl">
          {t("tagline")}
        </h1>
        <p className="text-lg opacity-70 text-pretty">{t("intro")}</p>
      </div>

      <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm opacity-70">
        <span>{nav("work")}</span>
        <span>{nav("about")}</span>
        <span>{nav("services")}</span>
        <span>{nav("contact")}</span>
      </nav>

      <p className="mt-auto text-xs opacity-50">
        Trenutni jezik: <code>{locale}</code>
      </p>
    </main>
  );
}
