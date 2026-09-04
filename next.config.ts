import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  // Pravi samostalan build koji ne treba node_modules — potrebno za Docker.
  output: "standalone",
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
