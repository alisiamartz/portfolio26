import { defineCollection, z } from "astro:content";

const work = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date().optional(), // or required if you prefer
    featured: z.boolean().default(false),

    // Browsing + filters
    tags: z.array(z.string()).default([]),
    roles: z.array(z.string()).default([]),

    // Case study meta
    timeline: z.string().optional(),
    tools: z.array(z.string()).default([]),

    // Media
    hero: z
      .object({
        type: z.enum(["image", "video", "phone", "pair", "motion"]).default("image"),
        src: z.string().optional(),
        alt: z.string().optional(),
        caption: z.string().optional(),
        leftSrc: z.string().optional(),
        leftAlt: z.string().optional(),
        rightSrc: z.string().optional(),
        rightAlt: z.string().optional(),
        loop: z.boolean().optional(),
        autoplay: z.boolean().optional(),
        muted: z.boolean().optional(),
        controls: z.boolean().optional(),
      })
      .optional(),

    // “At a glance”
    atAGlance: z
      .object({
        problem: z.string(),
        built: z.string(),
        impact: z.string(),
      })
      .optional(),

    // Links (optional, safe)
    links: z
      .object({
        demo: z.string().optional(),
        video: z.string().optional(),
        repo: z.string().optional(),
      })
      .optional(),
  }),
});

export const collections = { work };
