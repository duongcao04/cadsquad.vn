import { NavigateItem } from "../../shared/components/layouts/header/Navbar"
import { TService, TServiceTranslation } from "../../types"

export const getServiceMenu: (parentHref: string, services: TService[], locale?: string) => NavigateItem['menus'] = (parentHref, services, locale = 'EN') => {
	return services.map((item) => {
		const serviceTranslation = (item?.translations.find(
			(it) => it.language === locale.toUpperCase()
		) ??
			item?.translations.find(
				(it) => it.language === 'EN'
			)) as TServiceTranslation

		return {
			enLabel: serviceTranslation.title,
			viLabel: serviceTranslation.title,
			href: `${parentHref}/${serviceTranslation.slug}`,
			image: item.thumbnail?.url as string,
		}
	})
}