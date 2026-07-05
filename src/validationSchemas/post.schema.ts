import { z } from 'zod'

export const PostSchema = z.object({
    id: z.string().optional(),
    title: z.string().optional(),
    slug: z.string().optional(),
    shortDescription: z.string().nullable().optional(),
    keywords: z.array(z.string()).nullable().optional(),
    thumbnailUrl: z.string().optional(),
    bgCoverUrl: z.string().nullable().optional(),
    content: z.string().optional(),
    tags: z.array(z.string()).optional(),
    countView: z.number().optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
})
export type Post = z.infer<typeof PostSchema>
