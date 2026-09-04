import { setRequestLocale } from "next-intl/server";
import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import WorkStrip from "@/components/WorkStrip";
import About from "@/components/About";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import SiteFooter from "@/components/SiteFooter";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      {/* Prvi ekran: zaglavlje i showreel zajedno zauzimaju punu visinu */}
      <div className="flex min-h-svh flex-col">
        <SiteHeader />
        <Hero />
      </div>

      <main>
        <WorkStrip />
        <About />
        <Services />
        <Contact />
      </main>

      <SiteFooter />
    </>
  );
}
