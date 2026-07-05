import { z } from 'zod'

export const ContactSchema = z.object({
    fullName: z.string().min(1),
    email: z.string().min(1).email(),
    message: z.string().min(1),
})

export type Contact = z.infer<typeof ContactSchema>
