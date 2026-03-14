import { Language } from "./_language.type"
import { TServiceThumbnail } from "./_service-thumbnail.type"
import { TServiceType } from "./_service-type.type"


export type TService = {
	id: string

	orderNumber: number

	serviceTypeId?: string

	// Thumbnail Keys
	verticalThumbnailId?: string | null
	horizontalThumbnailId?: string | null

	// Relations
	serviceType?: TServiceType
	verticalThumbnail?: TServiceThumbnail
	horizontalThumbnail?: TServiceThumbnail
	translations: TServiceTranslation[]

	createdAt: string | Date
	updatedAt: string | Date
}

export type TServiceTranslation = {
	id: string
	serviceId: string
	language: Language

	// Localized Content
	slug: string
	title: string
	description: string
	shortDescription: string
	content: string

	// Localized SEO Metadata
	seoTitle?: string | null
	seoDescription?: string | null
	seoKeywords: string[]

	service?: TService | null
}