/**
 * Izvor videa za jedan rad. Svaki rad bira svoj tip — ista kartica
 * prikazuje YouTube, TikTok, Instagram ili vlastiti fajl.
 *
 * Kad Sanity preuzme sadržaj, ovi tipovi ostaju isti; mijenja se samo
 * odakle podaci dolaze.
 */
export type VideoSource =
  | { type: "youtube"; id: string }
  | { type: "tiktok"; id: string }
  | { type: "instagram"; id: string }
  | { type: "file"; src: string };

export type Work = {
  slug: string;
  /** Ime para. Placeholder dok ne stignu pravi radovi. */
  couple: string;
  location: string;
  year: number;
  video: VideoSource;
  /** Slika prije klika. Bez nje se crta obojena ploha. */
  poster?: string;
};

/**
 * Privremeni radovi — pokazuju sva četiri izvora videa da se vidi da
 * rade. Zamjenjuju se pravim sadržajem iz CMS-a.
 */
export const works: Work[] = [
  {
    slug: "rad-01",
    couple: "[Ime & Ime]",
    location: "[Lokacija]",
    year: 2025,
    video: { type: "youtube", id: "[YOUTUBE_ID]" },
  },
  {
    slug: "rad-02",
    couple: "[Ime & Ime]",
    location: "[Lokacija]",
    year: 2025,
    video: { type: "instagram", id: "[INSTAGRAM_KOD]" },
  },
  {
    slug: "rad-03",
    couple: "[Ime & Ime]",
    location: "[Lokacija]",
    year: 2025,
    video: { type: "tiktok", id: "[TIKTOK_ID]" },
  },
  {
    slug: "rad-04",
    couple: "[Ime & Ime]",
    location: "[Lokacija]",
    year: 2025,
    video: { type: "file", src: "/videos/[FAJL].mp4" },
  },
];

/** Showreel na vrhu stranice. */
export const showreel: VideoSource = { type: "youtube", id: "[YOUTUBE_ID]" };
