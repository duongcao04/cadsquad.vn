import { StaticImageData } from 'next/image'

import ImgCsdHeart from '@/assets/images/cadsquad-heart.webp'
import ImgTeam from '@/assets/images/teams.webp'
import ImgVision from '@/assets/images/vision.webp'
import { SupportLanguages } from '@/i18n/routing'
import { CAD_SERVICES } from '@/shared/database/cadServices'

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

const getCadServiceMenu: () => NavigateMenuItem[] = () => {
    return CAD_SERVICES.map((item) => {
        return {
            label: {
                en: item.title.original!,
                vi: item.title.vi!,
            },
            href: `/cad-services/${item.slug!}`,
            image: item.thumbnail.vertical!,
        }
    })
}

export const HEADER_NAVIGATES: NavigateItem[] = [
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
        ],
    },
    {
        labelKey: 'cadServices',
        href: '/cad-services',
        menus: getCadServiceMenu(),
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
