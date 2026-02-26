export type PlayLink = {
  label: string;
  url: string;
};

export type PlayItem = {
  id: string;
  title?: string;
  year: string;
  tags: string[];
  coverImage: string;
  hoverVideo?: string;
  links?: PlayLink[];
  note?: string;
};

export const playItems: PlayItem[] = [
  {
    id: "cognifisense-still",
    title: "Cognifisense Framing Study",
    year: "2025",
    tags: ["Interaction", "AI UX"],
    coverImage: "/media/cognifisense-hero.jpg",
    links: [{ label: "Related Work", url: "/work/cognifisense" }],
    note: "Interface framing exploration for assistant confidence signals.",
  },
  {
    id: "vw-motion",
    title: "Vehicle Worldbuilding Frames",
    year: "2024",
    tags: ["Speculative", "Narrative"],
    coverImage: "/media/vw-hero.jpg",
    links: [{ label: "Related Work", url: "/work/vw" }],
  },
  {
    id: "oculab-still",
    title: "Oculab Spatial Prototype",
    year: "2024",
    tags: ["XR", "Systems"],
    coverImage: "/media/oculab-hero.jpg",
    links: [{ label: "Related Work", url: "/work/oculab" }],
  },
  {
    id: "duet-motion",
    title: "Duet Interaction Loop",
    year: "2025",
    tags: ["Motion", "Prototype"],
    coverImage: "/media/play-placeholder.svg",
    hoverVideo: "/media/duet-hero.mp4",
    links: [{ label: "Related Work", url: "/work/duet" }],
    note: "TODO: replace placeholder still with exported keyframe.",
  },
  {
    id: "lift-motion",
    title: "Lift System Behavior",
    year: "2025",
    tags: ["Service", "Behavior"],
    coverImage: "/media/play-placeholder.svg",
    hoverVideo: "/media/lift-hero.mp4",
    links: [{ label: "Related Work", url: "/work/lift" }],
    note: "TODO: replace placeholder still with product capture.",
  },
  {
    id: "meta-motion",
    title: "Meta Prototyping Reels",
    year: "2024",
    tags: ["Rapid", "Concept"],
    coverImage: "/media/play-placeholder.svg",
    hoverVideo: "/media/meta-hero.mp4",
    links: [{ label: "Related Work", url: "/work/meta-prototyping-highlights" }],
  },
  {
    id: "editorial-07",
    title: "Atmosphere Test 07",
    year: "2026",
    tags: ["Editorial", "Visual"],
    coverImage: "/media/play-placeholder.svg",
    note: "TODO: add still from camera roll sequence.",
  },
  {
    id: "editorial-08",
    year: "2026",
    tags: ["Material", "Study"],
    coverImage: "/media/play-placeholder.svg",
    note: "TODO: add cover image and optional references.",
  },
];
