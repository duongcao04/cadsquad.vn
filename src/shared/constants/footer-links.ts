import { SupportLanguages } from '@/i18n/routing'
import { CAD_SERVICES } from '@/shared/database/cadServices'

/**
 * A label is either an i18n key (`labelKey`, resolved against
 * `landing.layout.footer`) for static entries, or a per-locale map (`label`)
 * for entries whose text comes from dynamic data such as CAD_SERVICES.
 */
type LocaleLabel = Record<SupportLanguages, string>

export type FooterChild = {
    labelKey?: string
    label?: LocaleLabel
    href: string
}

export type FooterLink = {
    /** i18n key under `landing.layout.footer.groups` (empty for no heading). */
    groupNameKey: string
    children?: FooterChild[]
}

const getCadServiceMenu: () => FooterChild[] = () => {
    return CAD_SERVICES.map((item) => {
        return {
            label: {
                en: item.title.original!,
                vi: item.title.vi!,
            },
            href: `/cad-services/${item.slug!}`,
        }
    })
}

export const FOOTER_LINKS: FooterLink[] = [
    {
        groupNameKey: 'groups.company',
        children: [
            { labelKey: 'company.aboutUs', href: '/about-us' },
            { labelKey: 'company.overview', href: '/about-us#overview' },
            { labelKey: 'company.vision', href: '/about-us/vision' },
            { labelKey: 'company.ourJourney', href: '/about-us#our-journey' },
        ],
    },
    {
        groupNameKey: 'groups.academy',
        children: [
            {
                labelKey: 'academy.inventorBasic',
                href: '/academy/autodesk-inventor-basic',
            },
            {
                labelKey: 'academy.inventorAdvance',
                href: '/academy/autodesk-inventor-advance',
            },
            {
                labelKey: 'academy.autocad',
                href: '/academy/autodesk-autoCAD',
            },
        ],
    },
    {
        groupNameKey: 'groups.cadServices',
        children: getCadServiceMenu(),
    },
]
