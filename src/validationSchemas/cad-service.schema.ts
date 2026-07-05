import { z } from 'zod'

export const CadServiceSchema = z.object({
    id: z.number().optional(),
    order: z.number().optional(),
    title: z.object({
        original: z.string().optional(),
        vi: z.string().optional(),
    }),
    slug: z.string().optional(),
    description: z.object({
        original: z.string().optional(),
        vi: z.string().optional(),
    }),
    plainDescription: z.object({
        original: z.string().optional(),
        vi: z.string().optional(),
    }),
    shortDescription: z.object({
        original: z.string().optional(),
        vi: z.string().optional(),
    }),
    thumbnail: z.object({
        vertical: z.string().optional(),
        horizontal: z.string().optional(),
        verticalType: z.string().optional(),
        horizontalType: z.string().optional(),
    }),
    images: z.array(z.string()).optional(),
    content: z.object({
        original: z.string().optional(),
        vi: z.string().optional(),
    }),
})
export type CadService = z.infer<typeof CadServiceSchema>
