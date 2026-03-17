import { Language } from '@/types'
import { z, ZodType } from 'zod'

export const LanguageSchema: ZodType<Language> = z.enum(['EN', 'VI'])