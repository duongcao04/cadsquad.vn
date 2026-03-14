import { z, ZodType } from 'zod'
import { Language } from '../types'

export const LanguageSchema: ZodType<Language> = z.enum(['EN', 'VI'])