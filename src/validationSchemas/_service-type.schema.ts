import { ZodType, z } from "zod";
import { TServiceType, TServiceTypeTranslation } from "../types";
import { LanguageSchema } from "./_language.schema";
import { ServiceSchema } from "./_service.schema";

export const ServiceTypeSchema: ZodType<TServiceType> = z.lazy(() => z.object({
	id: z.string().catch('N/A'),

	code: z.string().catch('UNKNOWN'),

	services: z.array(z.lazy(() => ServiceSchema)).default([]),

	translations: z.array(z.lazy(() => ServiceTypeTranslationSchema)).default([]),

	createdAt: z.coerce.date().catch(new Date()),

	updatedAt: z.coerce.date().catch(new Date()),
}));

export const ServiceTypeTranslationSchema: ZodType<TServiceTypeTranslation> = z.lazy(() => z.object({
	id: z.string().catch('N/A'),

	displayName: z.string().catch('Unknown'),

	code: z.string().catch('UNKNOWN'),

	description: z.string().nullable(),

	brochureUrl: z.string().nullable(),

	serviceTypeId: z.string(),

	serviceType: z.lazy(() => ServiceTypeSchema).optional(),

	language: LanguageSchema
}));


export const CreateServiceTypeFormSchema = z.object({
	code: z.string().min(1, 'Code is required').toUpperCase(),
	translations: z.array(
		z.object({
			language: LanguageSchema,
			displayName: z.string().min(1, 'Display name is required'),
			// Convert empty strings to undefined so Prisma saves them as NULL
			description: z.string().optional().transform(val => val === '' ? undefined : val),
			brochureUrl: z.string().optional().transform(val => val === '' ? undefined : val),
		})
	).min(1, 'At least one translation is required')
})

export type TCreateServiceTypeFormValues = z.infer<typeof CreateServiceTypeFormSchema>

export const UpdateServiceTypeFormSchema = CreateServiceTypeFormSchema.extend({
	id: z.string().min(1, 'Service Type ID is required')
})

export type TUpdateServiceTypeFormValues = z.infer<typeof UpdateServiceTypeFormSchema>;