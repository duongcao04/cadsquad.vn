import { ZodType, z } from "zod";
import { EServiceBackgroundCoverType, EServiceThumbnailType, TService, TServiceBackgroundCover, TServiceThumbnail, TServiceTranslation } from "@/types";
import { LanguageSchema } from "./_language.schema";
import { ServiceTypeSchema } from "./_service-type.schema";

export const ServiceSchema: ZodType<TService> = z.lazy(() => z.object({
	id: z.string().catch('N/A'),

	orderNumber: z.coerce.number(),

	thumbnailId: z.string().nullish(),

	thumbnail: z.lazy(() => ServiceThumbnailSchema).nullish(),

	backgroundCoverId: z.string().nullish(),

	backgroundCover: z.lazy(() => ServiceBackgroundCoverSchema).nullish(),

	services: z.array(z.lazy(() => ServiceSchema)).default([]),

	serviceTypeId: z.string().optional(),

	serviceType: z.lazy(() => ServiceTypeSchema).optional(),

	translations: z.array(z.lazy(() => ServiceTranslationSchema)).default([]),

	createdAt: z.coerce.date().catch(new Date()),
	updatedAt: z.coerce.date().catch(new Date()),
}));

export const ServiceThumbnailSchema: ZodType<TServiceThumbnail> = z.lazy(() => z.object({
	id: z.string().catch('N/A'),

	url: z.string().catch('unknown-url'),

	type: z.nativeEnum(EServiceThumbnailType)
}))

export const ServiceBackgroundCoverSchema: ZodType<TServiceBackgroundCover> = z.lazy(() => z.object({
	id: z.string().catch('N/A'),

	url: z.string().catch('unknown-url'),

	type: z.nativeEnum(EServiceBackgroundCoverType)
}))

export const ServiceTranslationSchema: ZodType<TServiceTranslation> = z.lazy(() => z.object({
	id: z.string().catch('N/A'),

	title: z.string().catch('Unknown'),

	slug: z.string().catch('UNKNOWN'),

	description: z.string(),

	shortDescription: z.string(),

	content: z.string(),

	seoTitle: z.string().nullish(),

	seoDescription: z.string().nullish(),

	seoKeywords: z.array(z.string()).default([]),

	serviceId: z.string(),

	service: z.lazy(() => ServiceSchema).nullish(),

	language: LanguageSchema
}));

export const CreateServiceTranslationSchema = z.object({
	language: LanguageSchema,
	title: z.string().min(1, 'Title is required'),
	slug: z.string().min(1, 'Slug is required'),
	description: z.string().min(1, 'Description is required'),
	shortDescription: z.string().min(1, 'Short description is required'),
	content: z.string().min(1, 'Content is required'),
	seoTitle: z.string().optional().transform(v => v === '' ? undefined : v),
	seoDescription: z.string().optional().transform(v => v === '' ? undefined : v),
	// Automatically convert comma-separated string "React, Nextjs" to array ["React", "Nextjs"]
	seoKeywords: z.string().optional().transform(v => v ? v.split(',').map(k => k.trim()).filter(Boolean) : []),
})
export const CreateServiceFormSchema = z.object({
	orderNumber: z.coerce.number().int().nonnegative('Order number must be positive'),
	serviceTypeId: z.string().optional().transform(v => v === '' ? undefined : v),

	// Đã đổi thành Url để khớp với logic "Find or Create Media"
	thumbnailUrl: z.string().optional().transform(v => v === '' ? undefined : v),
	backgroundCoverUrl: z.string().optional().transform(v => v === '' ? undefined : v),

	translations: z.array(CreateServiceTranslationSchema).min(1, 'At least one translation is required'),
})

export type TCreateServiceFormValues = z.infer<typeof CreateServiceFormSchema>

// Schema for updating (Makes ID required)
export const UpdateServiceFormSchema = CreateServiceFormSchema.extend({
	id: z.string().min(1, 'Service ID is required')
})

export type TUpdateServiceFormValues = z.infer<typeof UpdateServiceFormSchema>