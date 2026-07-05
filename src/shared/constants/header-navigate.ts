import { StaticImageData } from 'next/image'

import ImgCsdDigital from '@/assets/images/cadsquad-card.webp'
import ImgCsdHeart from '@/assets/images/cadsquad-heart.webp'
import ImgTeam from '@/assets/images/teams.webp'
import ImgVision from '@/assets/images/vision.webp'
import { SupportLanguages } from '@/i18n/routing'
import { CadService } from '@/validationSchemas/cad-service.schema'

/**
 * A label is either an i18n key (`labelKey`, resolved against
 * `landing.layout.header`) for static entries, or a per-locale map (`label`)
 * for entries whose text comes from dynamic data such as CAD_SERVICES.
 */
type LocaleLabel = Record<SupportLanguages, string>

export type NavigateMenuItem = {
    labelKey?: string
    label?: LocaleLabel
    image: string | StaticImageData
    href: string
    outSite?: boolean
}

export type NavigateItem = {
    labelKey?: string
    label?: LocaleLabel
    href: string
    outSite?: boolean
    menus?: NavigateMenuItem[]
}

function getServiceMenu(
    services: CadService[],
    basePath: string
): NavigateMenuItem[] {
    return services.map((item) => {
        return {
            label: {
                en: item.title.original!,
                vi: item.title.vi!,
            },
            href: `${basePath}/${item.slug!}`,
            image: item.thumbnail.vertical!,
        }
    })
}

export const STATIC_HEADER_NAVIGATES: NavigateItem[] = [
    {
        labelKey: 'aboutUs.label',
        href: '/about-us',
        menus: [
            {
                labelKey: 'aboutUs.menu.overview',
                image: ImgTeam,
                href: '/about-us#overview',
            },
            {
                labelKey: 'aboutUs.menu.vision',
                image: ImgVision,
                href: '/about-us/vision',
            },
            {
                labelKey: 'aboutUs.menu.ourJourney',
                image: ImgCsdHeart,
                href: '/about-us#our-journey',
            },
            {
                labelKey: 'aboutUs.menu.aboutCadsquadDigital',
                image: ImgCsdDigital,
                href: '/about-us/about-cadsquad-digital',
            },
        ],
    },
    {
        labelKey: 'cadServices',
        href: '/cad-services',
    },
    {
        labelKey: 'digitalServices',
        href: '/digital-services',
    },
    {
        labelKey: 'academy',
        href: '/academy',
    },
    {
        labelKey: 'newsMedia',
        href: '/news-and-media',
    },
]

export function buildHeaderNavigates(
    cadServices: CadService[],
    digitalServices: CadService[] = []
): NavigateItem[] {
    return STATIC_HEADER_NAVIGATES.map((item) => {
        if (item.href === '/cad-services') {
            return {
                ...item,
                menus: getServiceMenu(cadServices, '/cad-services'),
            }
        }

        if (item.href === '/digital-services') {
            return {
                ...item,
                menus: getServiceMenu(digitalServices, '/digital-services'),
            }
        }

        return item
    })
}
