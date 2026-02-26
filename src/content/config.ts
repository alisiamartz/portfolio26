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
        type: z.enum(["image", "video"]).default("image"),
        src: z.string(),
        alt: z.string().optional(),
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