"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { VideoSource } from "@/lib/works";

/**
 * Vraća adresu za ugradnju, ovisno o izvoru. Svi embedovi dobijaju
 * autoplay jer se učitavaju tek nakon klika.
 */
function embedUrl(source: VideoSource): string | null {
  switch (source.type) {
    case "youtube":
      // nocookie varijanta ne postavlja kolačiće dok se video ne pusti
      return `https://www.youtube-nocookie.com/embed/${source.id}?autoplay=1&rel=0`;
    case "tiktok":
      return `https://www.tiktok.com/embed/v2/${source.id}`;
    case "instagram":
      return `https://www.instagram.com/reel/${source.id}/embed`;
    case "file":
      return null;
  }
}

type Props = {
  source: VideoSource;
  poster?: string;
  /** Opis za čitače ekrana — npr. ime para. */
  label: string;
  /** Tailwind klasa omjera, npr. "aspect-[9/16]". */
  aspect?: string;
  className?: string;
};

/**
 * Video se NE učitava dok posjetilac ne klikne. Bez toga bi svaki
 * YouTube/TikTok/Instagram okvir na stranici povlačio svoje skripte
 * i kolačiće čim se stranica otvori — sporo i nepotrebno prati ljude.
 */
export default function VideoEmbed({
  source,
  poster,
  label,
  aspect = "aspect-video",
  className = "",
}: Props) {
  const [playing, setPlaying] = useState(false);
  const t = useTranslations("Video");

  const url = embedUrl(source);

  return (
    <div
      className={`relative ${aspect} overflow-hidden bg-paper-3 ${className}`}
    >
      {playing ? (
        source.type === "file" ? (
          <video
            src={source.src}
            poster={poster}
            controls
            autoPlay
            playsInline
            className="h-full w-full object-cover"
          />
        ) : (
          <iframe
            src={url ?? undefined}
            title={label}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full border-0"
          />
        )
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`${t("play")} — ${label}`}
          className="group absolute inset-0 flex cursor-pointer items-center justify-center"
          style={
            poster
              ? {
                  backgroundImage: `url(${poster})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : undefined
          }
        >
          {!poster && <span className="absolute inset-0 bg-paper-3" />}

          <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-line-rose bg-paper/40 backdrop-blur-sm transition group-hover:border-rose group-hover:bg-paper/60">
            <svg
              width="16"
              height="18"
              viewBox="0 0 24 26"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M22 11.27a2 2 0 0 1 0 3.46L4 25.12A2 2 0 0 1 1 23.39V2.6A2 2 0 0 1 4 .87l18 10.4Z"
                fill="var(--rose)"
              />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
