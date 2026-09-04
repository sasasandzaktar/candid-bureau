"use client";

import { useActionState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { submitContact } from "@/app/actions/contact";
import { initialContactState } from "@/lib/contact";

const fieldClass =
  "w-full border border-line bg-paper-2 px-4 py-3 text-ink outline-none transition placeholder:text-ink-3 focus:border-rose";

const labelClass = "mb-2 block text-sm text-ink-2";

export default function ContactForm() {
  const t = useTranslations("ContactForm");
  const locale = useLocale();
  const [state, action, pending] = useActionState(
    submitContact,
    initialContactState,
  );

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="border border-line-rose bg-paper-2 px-6 py-10 text-center"
      >
        <p className="mb-3 font-display text-3xl text-rose-light">
          {t("success.title")}
        </p>
        <p className="text-ink-2">{t("success.body")}</p>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="flex flex-col gap-6">
      <input type="hidden" name="locale" value={locale} />

      {/* Zamka za botove — sakrivena od ljudi i od čitača ekrana */}
      <div aria-hidden="true" className="hidden">
        <label>
          {t("fields.website")}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            {t("fields.name")} <span className="text-rose">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={state.values?.name}
            aria-invalid={state.fieldErrors?.name ? true : undefined}
            aria-describedby={state.fieldErrors?.name ? "name-error" : undefined}
            className={fieldClass}
          />
          {state.fieldErrors?.name && (
            <p id="name-error" className="mt-2 text-sm text-rose">
              {state.fieldErrors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            {t("fields.email")} <span className="text-rose">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            defaultValue={state.values?.email}
            aria-invalid={state.fieldErrors?.email ? true : undefined}
            aria-describedby={
              state.fieldErrors?.email ? "email-error" : undefined
            }
            className={fieldClass}
          />
          {state.fieldErrors?.email && (
            <p id="email-error" className="mt-2 text-sm text-rose">
              {state.fieldErrors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="date" className={labelClass}>
            {t("fields.date")}
          </label>
          <input
            id="date"
            name="date"
            type="date"
            defaultValue={state.values?.date}
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="location" className={labelClass}>
            {t("fields.location")}
          </label>
          <input
            id="location"
            name="location"
            type="text"
            defaultValue={state.values?.location}
            placeholder={t("fields.locationPlaceholder")}
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          {t("fields.message")} <span className="text-rose">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          defaultValue={state.values?.message}
          placeholder={t("fields.messagePlaceholder")}
          aria-invalid={state.fieldErrors?.message ? true : undefined}
          aria-describedby={
            state.fieldErrors?.message ? "message-error" : undefined
          }
          className={`${fieldClass} resize-y`}
        />
        {state.fieldErrors?.message && (
          <p id="message-error" className="mt-2 text-sm text-rose">
            {state.fieldErrors.message}
          </p>
        )}
      </div>

      {state.formError && (
        <p role="alert" className="border border-rose/40 px-4 py-3 text-rose">
          {state.formError}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="bg-bordo px-8 py-4 text-sm text-rose-light transition hover:bg-rose hover:text-paper disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? t("sending") : t("submit")}
        </button>
        <p className="text-sm text-ink-3">{t("required")}</p>
      </div>
    </form>
  );
}
