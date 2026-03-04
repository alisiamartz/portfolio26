export type TagStyle = {
  bg: string;
  border: string;
  text: string;
};

// Your existing palettes (kept as-is)
const PALETTE = {
  blue:   { bg: "#E6F4FF", border: "#B6DDFC", text: "#0F4C81" },
  orange: { bg: "#FFF3E8", border: "#F5D1B0", text: "#8A3D0B" },
  green:  { bg: "#ECF9EF", border: "#BDE7C7", text: "#1E6A39" },
  purple: { bg: "#F5EEFF", border: "#D7C3F7", text: "#5F2A94" },
  gold:   { bg: "#FFF5CC", border: "#F1DD8A", text: "#6F5600" },
  pink:   { bg: "#FFECEF", border: "#F8C8D2", text: "#8E2742" },

  // New: soft “badge red” for Confidential
  red:    { bg: "#FFE8E8", border: "#F5B5B5", text: "#8A1F1F" },
} satisfies Record<string, TagStyle>;

const FALLBACK_TAG_PALETTE: TagStyle[] = [
  PALETTE.blue,
  PALETTE.orange,
  PALETTE.green,
  PALETTE.purple,
  PALETTE.gold,
  PALETTE.pink,
];

// 1) Explicit overrides (special cases, legacy names, etc.)
export const TAG_STYLE_BY_NAME: Record<string, TagStyle> = {
  // Special
  Confidential: PALETTE.red,

  // Keep any “branding” choices you want locked
  "Mixed Reality": PALETTE.blue,
  Education: PALETTE.blue,
  "Cognitive Science": PALETTE.purple,

  // If you have legacy tags you still want supported:
  "Game Dev": PALETTE.pink,
};

// 2) Semantic defaults by category (easy to extend)
const TAG_GROUPS: Record<string, keyof typeof PALETTE> = {
  // Industries / domains
  Automotive: "blue",
  Healthcare: "green",
  Research: "purple",

  // Context / format
  Hackathon: "orange",
  Game: "pink",
  Installation: "gold",

  // Medium / platform
  VR: "purple",
  XR: "purple",
  Hardware: "blue",

  // Roles / craft
  Lead: "gold",
  Design: "pink",
  Prototyping: "orange",
  Development: "blue",
  Perception: "purple",

  // Themes / values
  Accessibility: "green",
  "Interactive Narrative": "pink",
};

export function getTagStyle(tag: string, index = 0): TagStyle {
  // 1) Explicit style always wins
  const explicit = TAG_STYLE_BY_NAME[tag];
  if (explicit) return explicit;

  // 2) Semantic group mapping
  const groupKey = TAG_GROUPS[tag];
  if (groupKey) return PALETTE[groupKey];

  // 3) Fallback rotation (keeps new tags looking fine)
  return FALLBACK_TAG_PALETTE[index % FALLBACK_TAG_PALETTE.length];
}