import { StaticImageData } from 'next/image'

import ImgCsdHeart from '@/assets/images/cadsquad-heart.webp'
import ImgTeam from '@/assets/images/teams.webp'
import ImgVision from '@/assets/images/vision.webp'
import { CAD_SERVICES } from '@/shared/database/cadServices'

const getCadServiceMenu: () => NavigateItem['menus'] = () => {
    return CAD_SERVICES.map((item) => {
        return {
            enLabel: item.title.original!,
            viLabel: item.title.vi!,
            href: `/cad-services/${item.slug!}`,
            image: item.thumbnail.vertical!,
        }
    })
}

export type NavigateItem = {
    viLabel: string
    enLabel: string
    href: string
    outSite?: boolean
    menus?: {
        viLabel: string
        enLabel: string
        image: string | StaticImageData
        href: string
        outSite?: boolean
    }[]
}
export const HEADER_NAVIGATES: NavigateItem[] = [
    {
        enLabel: 'About us',
        viLabel: 'Về chúng tôi',
        href: '/about-us',
        menus: [
            {
                viLabel: 'Tổng quan',
                enLabel: 'Overview',
                image: ImgTeam,
                href: '/about-us#overview',
            },
            {
                viLabel: 'Tầm nhìn',
                enLabel: 'Vision',
                image: ImgVision,
                href: '/about-us/vision',
            },
            {
                viLabel: 'Hành trình của chúng tôi',
                enLabel: 'Our journey',
                image: ImgCsdHeart,
                href: '/about-us#our-journey',
            },
        ],
    },
    {
        enLabel: 'CAD Services',
        viLabel: 'Dịch vụ CAD',
        href: '/cad-services',
        menus: getCadServiceMenu(),
    },
    {
        enLabel: 'Digital Services',
        viLabel: 'Dịch vụ kỹ thuật số',
        href: '/digital-services',
        menus: getCadServiceMenu(),
    },
    {
        enLabel: 'Academy',
        viLabel: 'Khóa học',
        href: 'https://courses.csdvietnam.com',
        outSite: true,
    },
    {
        enLabel: 'News & Media',
        viLabel: 'Tin tức',
        href: '/news-and-media',
    },
]
