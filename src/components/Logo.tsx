/**
 * Privremeni znak — aproksimacija pravog logotipa.
 * Kad stigne fajl, zamijeniti sadržaj ovog fajla s <Image src="/logo.svg" ... />.
 */
export default function Logo() {
  return (
    <span className="flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose font-display text-lg leading-none text-rose-light">
        CB
      </span>
      <span className="font-hand text-xl leading-none text-rose-light">
        candid bureau.
      </span>
    </span>
  );
}
