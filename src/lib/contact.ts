/**
 * Oblik stanja kontakt forme.
 *
 * Živi odvojeno od same akcije jer fajl označen s "use server" smije
 * izvoziti isključivo async funkcije — ne i objekte poput početnog
 * stanja.
 */
export type ContactState = {
  status: "idle" | "success" | "error";
  /** Greške po polju, prikazuju se ispod tog polja. */
  fieldErrors?: Partial<Record<"name" | "email" | "message", string>>;
  /** Greška koja se tiče cijele forme (npr. slanje nije uspjelo). */
  formError?: string;
  /** Vraćeno da se polja ne isprazne kad validacija padne. */
  values?: Record<string, string>;
};

export const initialContactState: ContactState = { status: "idle" };
