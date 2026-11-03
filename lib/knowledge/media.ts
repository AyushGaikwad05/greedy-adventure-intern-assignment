export interface MediaItem {
  id: string;
  type: "pdf" | "video";
  title: string;
  description: string;
  url: string;
  downloadUrl: string;
  filename: string;
  size?: string;
  duration?: string;
  isDemoMaterial: boolean;
  demoLabel: string;
  thumbnailUrl?: string;
}

export const MEDIA_CATALOG: MediaItem[] = [
  {
    id: "media-brochure-pdf",
    type: "pdf",
    title: "Sea View Skydiving Pattaya — Official Brochure",
    description:
      "Complete package details, jump schedule, safety guidelines, and dropzone pricing guide.",
    url: "/documents/sea-view-skydiving-brochure.pdf",
    downloadUrl: "/documents/sea-view-skydiving-brochure.pdf",
    filename: "sea-view-skydiving-brochure.pdf",
    size: "1.4 MB",
    isDemoMaterial: true,
    demoLabel: "Demo Material — Official Experience Brochure",
    thumbnailUrl: "/images/package-deluxe.jpg",
  },
  {
    id: "media-experience-video",
    type: "video",
    title: "Sea View Skydiving — Ocean Jump Experience Preview",
    description:
      "Watch an actual 13,000 FT freefall and canopy glide over the Gulf of Thailand coastline.",
    url: "/hero.mp4",
    downloadUrl: "/hero.mp4",
    filename: "sea-view-skydiving-preview.mp4",
    duration: "0:24",
    size: "12.7 MB",
    isDemoMaterial: true,
    demoLabel: "Demo Material — Actual Tandem Jump Video Preview",
    thumbnailUrl: "/images/glimpse.jpg",
  },
];

export function findMediaByType(type: "pdf" | "video"): MediaItem | undefined {
  return MEDIA_CATALOG.find((m) => m.type === type);
}

export function getAllMedia(): MediaItem[] {
  return MEDIA_CATALOG;
}

