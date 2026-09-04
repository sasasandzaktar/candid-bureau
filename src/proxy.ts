import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Presreće svaki zahtjev i preusmjerava na /hr ili /en prema jeziku browsera.
// U Next.js 16 se ovaj fajl zove "proxy" (ranije "middleware").
export default createMiddleware(routing);

export const config = {
  // Preskoči: API rute, interne Next.js fajlove, Sanity studio i sve
  // što ima tačku u imenu (slike, fontovi, robots.txt...).
  matcher: "/((?!api|_next|_vercel|studio|.*\\..*).*)",
};
