import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Jezici koje stranica podržava
  locales: ["hr", "en"],

  // Jezik koji se koristi kad se posjetiočev ne može utvrditi
  defaultLocale: "hr",

  // Adrese se prevode. U kodu se uvijek koristi lijevi ključ
  // (npr. <Link href="/kontakt">), a next-intl ispiše pravu adresu
  // za trenutni jezik.
  pathnames: {
    "/": "/",
    "/kontakt": {
      hr: "/kontakt",
      en: "/contact",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
