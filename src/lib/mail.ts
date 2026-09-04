/**
 * Slanje poruka s kontakt forme.
 *
 * Način slanja se bira postavkama okoline, da se stranica ne veže za
 * jedan servis:
 *
 *   CONTACT_WEBHOOK_URL  — pošalje JSON na tu adresu (npr. n8n webhook,
 *                          koji dalje šalje mail)
 *   RESEND_API_KEY       — pošalje preko Resenda; traži i CONTACT_TO_EMAIL
 *                          te CONTACT_FROM_EMAIL
 *
 * Ako nijedno nije postavljeno, slanje namjerno pukne s jasnom porukom
 * umjesto da tiho proguta upit klijenta.
 */

export type ContactMessage = {
  name: string;
  email: string;
  /** Datum vjenčanja — nije obavezan. */
  date?: string;
  /** Lokacija — nije obavezna. */
  location?: string;
  message: string;
  /** Jezik s kojeg je poslano, da se zna kako odgovoriti. */
  locale: string;
};

export class MailNotConfiguredError extends Error {
  constructor() {
    super(
      "Slanje maila nije postavljeno. Postavi CONTACT_WEBHOOK_URL ili RESEND_API_KEY u .env.local",
    );
    this.name = "MailNotConfiguredError";
  }
}

async function sendViaWebhook(url: string, message: ContactMessage) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message),
  });

  if (!response.ok) {
    throw new Error(`Webhook je odgovorio sa ${response.status}`);
  }
}

async function sendViaResend(apiKey: string, message: ContactMessage) {
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!to || !from) {
    throw new Error(
      "Resend traži i CONTACT_TO_EMAIL i CONTACT_FROM_EMAIL u .env.local",
    );
  }

  const lines = [
    `Ime: ${message.name}`,
    `Email: ${message.email}`,
    message.date ? `Datum: ${message.date}` : null,
    message.location ? `Lokacija: ${message.location}` : null,
    `Jezik stranice: ${message.locale}`,
    "",
    message.message,
  ].filter(Boolean);

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      // Odgovor ide direktno klijentu, ne natrag na stranicu.
      reply_to: message.email,
      subject: `Upit sa stranice — ${message.name}`,
      text: lines.join("\n"),
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend je odgovorio sa ${response.status}`);
  }
}

export async function sendContactMessage(message: ContactMessage) {
  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    return sendViaWebhook(webhook, message);
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    return sendViaResend(resendKey, message);
  }

  throw new MailNotConfiguredError();
}
