import { Language } from "./_language.type"
import { TService } from "./_service.type"

export type TServiceType = {
	id: string
	code: string

	services: TService[]
	translations: TServiceTypeTranslation[]

	createdAt: string | Date
	updatedAt: string | Date
}


export type TServiceTypeTranslation = {
	id: string
	serviceTypeId: string
	language: Language

	displayName: string
	description: string | null
	brochureUrl: string | null

	serviceType?: TServiceType
}