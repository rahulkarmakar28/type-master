import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Typing Test & Typing Tutor`,
    short_name: SITE_NAME,
    description:
      "Free typing test, typing tutor, and government exam typing practice. Works offline.",
    start_url: "/",
    display: "standalone",
    background_color: "#12161C",
    theme_color: "#12161C",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
  };
}