import { z } from 'zod'

export const PartnerSchema = z.object({
    id: z.string().optional(),
    name: z.string().optional(),
    imageUrl: z.string().optional(),
    order: z.string().optional(),
})
export type Partner = z.infer<typeof PartnerSchema>
