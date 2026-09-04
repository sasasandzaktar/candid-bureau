import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Jezici koje stranica podržava
  locales: ["hr", "en"],

  // Jezik koji se koristi kad se posjetiocev ne može utvrditi
  defaultLocale: "hr",
});

export type Locale = (typeof routing.locales)[number];
