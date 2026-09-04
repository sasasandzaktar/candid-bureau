export default function SiteFooter() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-3 px-6 py-7 text-sm text-ink-3 sm:px-10 lg:px-16">
      <span>&copy; {new Date().getFullYear()} Candid Bureau</span>
      <span>candidbureau.com</span>
    </footer>
  );
}
