import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Zamjene za Next.js Link i useRouter koje same dodaju jezik u adresu.
// Uvijek koristiti ove umjesto onih iz "next/link" i "next/navigation".
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
