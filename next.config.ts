import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  // Pravi samostalan build koji ne treba node_modules — potrebno za Docker.
  output: "standalone",

  // Prijevodi se učitavaju dinamički (messages/${locale}.json), pa ih
  // Next ne prepozna sam pri pakovanju. Bez ovoga stranica u Dockeru
  // padne jer ne nađe tekstove.
  outputFileTracingIncludes: {
    "/**": ["./messages/**"],
  },

  turbopack: {
    // Turbopack inače traži korijen projekta po najbližem lockfileu i zna
    // odlutati izvan foldera (npr. u C:\Users\sasas ako tamo postoji
    // package-lock.json). Tada next-intl ne nađe svoju konfiguraciju u dev
    // režimu. Ovime mu se korijen izričito zaključava na ovaj projekt.
    root: process.cwd(),
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
