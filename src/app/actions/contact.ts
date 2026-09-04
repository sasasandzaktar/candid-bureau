"use server";

import { getTranslations } from "next-intl/server";
import {
  MailNotConfiguredError,
  sendContactMessage,
  type ContactMessage,
} from "@/lib/mail";
import { routing } from "@/i18n/routing";
import { hasLocale } from "next-intl";
import type { ContactState } from "@/lib/contact";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function submitContact(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const rawLocale = text(formData, "locale");
  const locale = hasLocale(routing.locales, rawLocale)
    ? rawLocale
    : routing.defaultLocale;

  const t = await getTranslations({ locale, namespace: "ContactForm" });

  const values = {
    name: text(formData, "name"),
    email: text(formData, "email"),
    date: text(formData, "date"),
    location: text(formData, "location"),
    message: text(formData, "message"),
  };

  // Zamka za botove: polje je skriveno od ljudi, pa ako je popunjeno,
  // upit je automatski. Pravimo se da je prošlo i ne šaljemo ništa.
  if (text(formData, "website")) {
    return { status: "success" };
  }

  const fieldErrors: ContactState["fieldErrors"] = {};

  if (!values.name) {
    fieldErrors.name = t("errors.nameRequired");
  }
  if (!values.email) {
    fieldErrors.email = t("errors.emailRequired");
  } else if (!EMAIL_PATTERN.test(values.email)) {
    fieldErrors.email = t("errors.emailInvalid");
  }
  if (values.message.length < 10) {
    fieldErrors.message = t("errors.messageTooShort");
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", fieldErrors, values };
  }

  const message: ContactMessage = {
    name: values.name,
    email: values.email,
    date: values.date || undefined,
    location: values.location || undefined,
    message: values.message,
    locale,
  };

  try {
    await sendContactMessage(message);
    return { status: "success" };
  } catch (error) {
    // Poruka klijentu je uvijek ista i neutralna; detalj ide u log
    // servera, jer nema smisla da posjetilac čita naše postavke.
    console.error("Slanje kontakt forme nije uspjelo:", error);

    return {
      status: "error",
      formError:
        error instanceof MailNotConfiguredError
          ? t("errors.notConfigured")
          : t("errors.sendFailed"),
      values,
    };
  }
}
