'use client'

import { Button } from '@heroui/react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Link, useLocation } from '@tanstack/react-router'
import { Image } from 'antd'
import { ChevronRight } from 'lucide-react'
import { Variants } from 'motion'

import { MotionButton, MotionDiv, MotionLi, MotionP } from '@/lib/motion'
import { getServiceMenu } from '@/lib/utils'
import { serviceListOptions } from '@/queires'

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

export default function Navbar() {
    const {
        data: { services },
    } = useSuspenseQuery(serviceListOptions)

    const cadServiceMenus = getServiceMenu(
        '/cad-services',
        services.filter((it) => it.serviceType?.code === 'CAD_SER'),
        'EN'
    )

    const digitalServiceMenus = getServiceMenu(
        '/digital-services',
        services.filter((it) => it.serviceType?.code === 'WEB_DEV'),
        'EN'
    )
    return (
        <nav className="z-50 flex items-center justify-start gap-2">
            <NavbarItem
                index={0}
                data={{
                    enLabel: 'About us',
                    viLabel: 'Về chúng tôi',
                    href: '/about-us',
                    menus: [
                        {
                            viLabel: 'Tổng quan',
                            enLabel: 'Overview',
                            image: 'https://res.cloudinary.com/dqx1guyc0/image/upload/v1773729545/Cadsquad/teams_n80vcv.webp',
                            href: '/about-us#overview',
                        },
                        {
                            viLabel: 'Tầm nhìn',
                            enLabel: 'Vision',
                            image: 'https://res.cloudinary.com/dqx1guyc0/image/upload/v1773729544/Cadsquad/vision_iiees6.webp',
                            href: '/about-us/vision',
                        },
                        {
                            viLabel: 'Hành trình của chúng tôi',
                            enLabel: 'Our journey',
                            image: 'https://res.cloudinary.com/dqx1guyc0/image/upload/v1773729544/Cadsquad/journey_pyg7s7.webp',
                            href: '/about-us#our-journey',
                        },
                    ],
                }}
            />
            <NavbarItem
                index={1}
                data={{
                    enLabel: 'CAD Services',
                    viLabel: 'Dịch vụ CAD',
                    href: '/cad-services',
                    menus: cadServiceMenus,
                }}
            />
            <NavbarItem
                index={2}
                data={{
                    enLabel: 'Digital Services',
                    viLabel: 'Dịch vụ kỹ thuật số',
                    href: '/digital-services',
                    menus: digitalServiceMenus,
                }}
            />
            <NavbarItem
                index={3}
                data={{
                    enLabel: 'Academy',
                    viLabel: 'Khóa học',
                    href: 'https://courses.csdvietnam.com',
                    outSite: true,
                }}
            />
            <NavbarItem
                index={4}
                data={{
                    enLabel: 'News & Media',
                    viLabel: 'Tin tức',
                    href: '/news-and-media',
                }}
            />
        </nav>
    )
}

function NavbarItem({ data, index }: { data: NavigateItem; index: number }) {
    const { pathname } = useLocation()
    const isCurrentPath =
        data.href.startsWith('/') &&
        pathname.split('/').includes(data.href.split('/')[1])

    const label = data.enLabel

    const labelVariants: Variants = {
        init: { opacity: 0, y: 10 },
        animate: (i: number) => ({
            opacity: 1,
            color: isCurrentPath ? 'var(--color-primary)' : 'var(--foreground)',
            y: 0,
            transition: { delay: i * 0.1, type: 'spring', stiffness: 120 },
        }),
        hover: { opacity: 1, y: 0, color: 'var(--color-primary)' },
    }

    const bottomLineVariants: Variants = {
        init: {
            opacity: 0,
            width: 0,
            height: '2px',
            backgroundColor: 'var(--color-primary)',
        },
        animate: { width: isCurrentPath ? '100%' : 0, height: '2px', opacity: 1 },
        hover: {
            opacity: 1,
            width: '100%',
            height: '2px',
            backgroundColor: 'var(--color-primary)',
            transition: { delay: 0.1 },
        },
    }

    const dropdownWrapperVariants: Variants = {
        init: {
            opacity: 0,
            display: 'none',
            boxShadow:
                'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px',
        },
        hover: {
            opacity: 1,
            display: 'grid',
            boxShadow:
                'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px',
        },
    }

    const itemLabelVariants: Variants = {
        init: { opacity: 0 },
        animate: { opacity: 1 },
        hover: { opacity: 1, textDecoration: 'underline', textUnderlineOffset: '1px' },
    }

    return (
        <MotionDiv initial="init" animate="animate" whileHover="hover">
            <Link
                className="block mx-3 size-fit"
                to={data.href}
                title={label}
                target={data.outSite ? '_blank' : undefined}
            >
                <MotionButton
                    variants={labelVariants}
                    custom={index}
                    className="space-y-2 cursor-pointer"
                >
                    <p className="px-4 mt-2 font-bold uppercase">{label}</p>
                    <MotionDiv variants={bottomLineVariants} />
                </MotionButton>
            </Link>
            {data.menus && (
                <MotionDiv
                    variants={dropdownWrapperVariants}
                    className="absolute left-0 top-[100%] z-50 container bg-white rounded-b-3xl p-9 grid grid-cols-[350px_1fr] gap-5"
                >
                    <div className="space-y-14">
                        <p className="text-3xl font-semibold font-saira">
                            {label}
                        </p>
                        <Link
                            to={data.href}
                            className="block size-fit"
                            title={`Go to ${label}`}
                            target={data.outSite ? '_blank' : undefined}
                        >
                            <Button
                                isIconOnly
                                className="rounded-full size-14 text-primary border-primary"
                                variant="outline"
                            >
                                <ChevronRight size={30} />
                            </Button>
                        </Link>
                    </div>
                    <ul className="grid grid-cols-3 gap-6 max-h-[80vh] overflow-y-auto pr-5">
                        {data.menus.map((menuItem, idx) => (
                            <MotionLi
                                key={idx + menuItem.enLabel}
                                initial="init"
                                animate="animate"
                                whileHover="hover"
                                className="group"
                            >
                                <Link
                                    to={menuItem.href}
                                    className="block space-y-2 size-full"
                                    target={menuItem.outSite ? '_blank' : undefined}
                                >
                                    <Image
                                        src={menuItem?.image}
                                        alt={`${menuItem.enLabel} image`}
                                        preview={false}
                                        rootClassName="aspect-video overflow-hidden"
                                        className="size-full object-cover transition duration-300 rounded-sm group-hover:scale-110"
                                    />
                                    <MotionP
                                        variants={itemLabelVariants}
                                        className="font-medium text-center align-middle"
                                    >
                                        {menuItem.enLabel}
                                    </MotionP>
                                </Link>
                            </MotionLi>
                        ))}
                    </ul>
                </MotionDiv>
            )}
        </MotionDiv>
    )
}
