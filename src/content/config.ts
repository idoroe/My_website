import { z, defineCollection } from "astro:content";

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.string().optional(),
  heroImage: z.string().optional(),
  badge: z.string().optional(),
  tags: z.array(z.string()).refine(items => new Set(items).size === items.length, {
    message: 'tags must be unique',
  }).optional(),
});

const projectSchema = z.object({
  title: z.string(),
  description: z.string(),
  heroImage: z.string().optional(),
  tags: z.array(z.string()).default([]),
  category: z.enum(['Full-Stack', 'ML', 'DevOps', 'Data', 'Mobile', 'Other']).default('Other'),
  featured: z.boolean().default(false),
  sortOrder: z.number().default(0),
  // Case study fields
  problem: z.string().optional(),
  role: z.string().optional(),
  techStack: z.array(z.string()).default([]),
  architecture: z.string().optional(),
  challenges: z.string().optional(),
  shipped: z.string().optional(),
  impact: z.string().optional(),
  liveUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  screenshots: z.array(z.string()).default([]),
});

export type BlogSchema = z.infer<typeof blogSchema>;
export type ProjectSchema = z.infer<typeof projectSchema>;

const blogCollection = defineCollection({ schema: blogSchema });
const projectCollection = defineCollection({ schema: projectSchema });

export const collections = {
  'blog': blogCollection,
  'projects': projectCollection,
}
