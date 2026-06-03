import ImgCsdHeart from '@/assets/images/cadsquad-heart.webp'
import ImgTeam from '@/assets/images/teams.webp'
import ImgVision from '@/assets/images/vision.webp'

export type NavigateItem = {
    viLabel: string
    enLabel: string
    href: string
    outSite?: boolean
    menus?: {
        viLabel: string
        enLabel: string
        image: string
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
                image: ImgTeam as unknown as string,
                href: '/about-us#overview',
            },
            {
                viLabel: 'Tầm nhìn',
                enLabel: 'Vision',
                image: ImgVision as unknown as string,
                href: '/about-us/vision',
            },
            {
                viLabel: 'Hành trình của chúng tôi',
                enLabel: 'Our journey',
                image: ImgCsdHeart as unknown as string,
                href: '/about-us#our-journey',
            },
        ],
    },
    {
        enLabel: 'CAD Services',
        viLabel: 'Dịch vụ CAD',
        href: '/cad-services',
    },
    {
        enLabel: 'Digital Services',
        viLabel: 'Dịch vụ kỹ thuật số',
        href: '/digital-services',
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
