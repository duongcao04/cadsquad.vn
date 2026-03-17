import { Language } from "./_language.type"
import { TServiceBackgroundCover } from "./_service-background-cover.type"
import { TServiceThumbnail } from "./_service-thumbnail.type"
import { TServiceType } from "./_service-type.type"


export type TService = {
	id: string

	orderNumber: number

	serviceTypeId?: string

	thumbnailId?: string | null

	thumbnail?: TServiceThumbnail | null

	serviceBackgroundCoverId?: string | null

	backgroundCoverId?: string | null

	backgroundCover?: TServiceBackgroundCover | null

	// Relations
	serviceType?: TServiceType

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