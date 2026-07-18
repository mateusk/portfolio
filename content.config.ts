import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    projects: defineCollection({
      type: 'data',
      source: 'projects/*.md',
      schema: z.object({
        slug: z.string(),
        title: z.string(),
        tagline: z.string(),
        description: z.string(),
        client: z.string().optional(),
        developedAt: z.string().optional(),
        designCredits: z.string().optional(),
        tags: z.array(z.string()),
        liveUrl: z.string().optional(),
        order: z.number(),
        heroImage: z.string(),
        gallery: z.array(z.object({
          device: z.enum(['desktop', 'tablet', 'phone']),
          image: z.string(),
          alt: z.string().optional(),
        })),
      }),
    }),
    artworks: defineCollection({
      type: 'data',
      source: 'artworks/*.md',
      schema: z.object({
        slug: z.string(),
        title: z.string(),
        description: z.string(),
        medium: z.string().optional(),
        year: z.string().optional(),
        order: z.number(),
        images: z.array(z.object({
          image: z.string(),
          alt: z.string().optional(),
        })),
      }),
    }),
    pages: defineCollection({
      type: 'page',
      source: {
        include: 'pages/*.md',
        prefix: '',
      },
      schema: z.object({
        headline: z.string(),
      }),
    }),
  },
})
