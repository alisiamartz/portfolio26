export type TagStyle = {
  bg: string;
  border: string;
  text: string;
};

/**
 * Families = semantic meaning (blue=build/tech, green=people/health, etc.)
 * Variants per family = visual variety when tags sit next to each other.
 */
const PALETTE_FAMILIES = {
  blue: [
    { bg: "#E6F4FF", border: "#B6DDFC", text: "#0F4C81" }, // original
    { bg: "#EAF2FF", border: "#B7CCFF", text: "#203B7A" },
    { bg: "#E8FAFF", border: "#AEE6F5", text: "#0B4E63" },
  ],
  orange: [
    { bg: "#FFF3E8", border: "#F5D1B0", text: "#8A3D0B" }, // original
    { bg: "#FFF0E0", border: "#F2C59A", text: "#7A3A12" },
    { bg: "#FFF7E6", border: "#F0D39A", text: "#6B4B00" },
  ],
  green: [
    { bg: "#ECF9EF", border: "#BDE7C7", text: "#1E6A39" }, // original
    { bg: "#E9F7F3", border: "#AEE2D1", text: "#0F5A4B" },
    { bg: "#F0FAE8", border: "#C7E7A7", text: "#2C5E16" },
  ],
  purple: [
    { bg: "#F5EEFF", border: "#D7C3F7", text: "#5F2A94" }, // original
    { bg: "#F3F0FF", border: "#CFC8FF", text: "#3E2A8E" },
    { bg: "#F7EDFF", border: "#E2BFF7", text: "#6A1B7A" },
  ],
  gold: [
    { bg: "#FFF5CC", border: "#F1DD8A", text: "#6F5600" }, // original
    { bg: "#FFF7D9", border: "#EBD27B", text: "#5F4B00" },
    { bg: "#FFF2B8", border: "#E6CC6A", text: "#584100" },
  ],
  pink: [
    { bg: "#FFECEF", border: "#F8C8D2", text: "#8E2742" }, // original
    { bg: "#FFEAF6", border: "#F2C1E1", text: "#7B2358" },
    { bg: "#FFF0F0", border: "#F2B9BF", text: "#7A2230" },
  ],
} satisfies Record<string, TagStyle[]>;

type FamilyName = keyof typeof PALETTE_FAMILIES;

const CONFIDENTIAL_RED: TagStyle = {
  bg: "#FFE8E8",
  border: "#F5B5B5",
  text: "#8A1F1F",
};

// Semantic mapping: tag -> family
const TAG_TO_FAMILY: Record<string, FamilyName> = {
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

  // Values / themes
  Accessibility: "green",
  "Interactive Narrative": "pink",
};

// Explicit overrides always win
export const TAG_STYLE_BY_NAME: Record<string, TagStyle> = {
  Confidential: CONFIDENTIAL_RED,

  // Legacy / extra tags you mentioned you already have in the project:
  "Mixed Reality": PALETTE_FAMILIES.blue[0],
  Education: PALETTE_FAMILIES.blue[0],
  "Cognitive Science": PALETTE_FAMILIES.purple[0],
  "Game Dev": PALETTE_FAMILIES.pink[0],
};

function hashString(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  return hash;
}

function familyForTag(tag: string): FamilyName {
  // If unknown, deterministically assign a family so it stays stable.
  const explicit = TAG_STYLE_BY_NAME[tag];
  if (explicit) return "blue"; // unused when explicit hits, but keeps typing happy

  const mapped = TAG_TO_FAMILY[tag];
  if (mapped) return mapped;

  const families = Object.keys(PALETTE_FAMILIES) as FamilyName[];
  return families[hashString(tag) % families.length]!;
}

function stylesEqual(a: TagStyle, b: TagStyle) {
  return a.bg === b.bg && a.border === b.border && a.text === b.text;
}

/**
 * Row-aware: given a list of tags, assign styles so repeated families
 * cycle through variants (and avoid adjacent identical styles).
 *
 * This is what you should call in WorkCard + WorkPages.
 */
export function getTagStyles(tags: string[]): Record<string, TagStyle> {
  const result: Record<string, TagStyle> = {};
  const familyCounts: Partial<Record<FamilyName, number>> = {};
  let prevStyle: TagStyle | null = null;

  for (const tag of tags) {
    // explicit overrides (e.g., Confidential)
    const explicit = TAG_STYLE_BY_NAME[tag];
    if (explicit) {
      result[tag] = explicit;
      prevStyle = explicit;
      continue;
    }

    const family = familyForTag(tag);
    const variants = PALETTE_FAMILIES[family];

    // Cycle variants within family *based on occurrence in this row*
    const count = (familyCounts[family] ?? 0);
    familyCounts[family] = count + 1;

    // Start index is deterministic per-tag, then offset by row count to reduce collisions
    let idx = (hashString(tag) + count) % variants.length;
    let style = variants[idx];

    // Avoid adjacent identical style (bump once or twice if needed)
    if (prevStyle && stylesEqual(style, prevStyle)) {
      idx = (idx + 1) % variants.length;
      style = variants[idx];
      if (prevStyle && stylesEqual(style, prevStyle)) {
        idx = (idx + 1) % variants.length;
        style = variants[idx];
      }
    }

    result[tag] = style;
    prevStyle = style;
  }

  return result;
}

/**
 * Back-compat: if some older code calls getTagStyle(tag),
 * it still returns a deterministic style (not row-aware).
 * Prefer getTagStyles(tags) where tags render together.
 */
export function getTagStyle(tag: string): TagStyle {
  const explicit = TAG_STYLE_BY_NAME[tag];
  if (explicit) return explicit;

  const family = TAG_TO_FAMILY[tag] ?? familyForTag(tag);
  const variants = PALETTE_FAMILIES[family];
  return variants[hashString(tag) % variants.length];
}