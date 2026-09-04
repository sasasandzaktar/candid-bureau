# Candid Bureau

Portfolio stranica za [Candid Bureau](https://candidbureau.com) — wedding videografija i short-form content za društvene mreže.

## Tehnologije

- **Next.js 16** (App Router) + TypeScript + Tailwind CSS 4
- **next-intl** — dvojezično, hrvatski i engleski (`/hr`, `/en`)
- **Sanity** — CMS preko kojeg se dodaju radovi, studio na `/studio`
- **Docker** — hostano na vlastitom VPS-u iza Caddy reverse proxyja
- **GitHub Actions** — push na `main` builda image i objavljuje ga automatski

## Pokretanje lokalno

```bash
npm install
npm run dev
```

Stranica se otvara na `http://localhost:3000`.

Za rad sa sadržajem trebaju Sanity ključevi u `.env.local` — vidi `.env.example`.

## Struktura

```
src/app/[locale]/    stranice po jeziku
src/components/      komponente
messages/            prijevodi (hr.json, en.json)
sanity/              sheme sadržaja
```

## Video

Svaki rad u CMS-u bira vlastiti izvor videa: YouTube, TikTok, Instagram ili vlastiti upload. Embedovi se učitavaju tek na klik, da ne usporavaju stranicu.
