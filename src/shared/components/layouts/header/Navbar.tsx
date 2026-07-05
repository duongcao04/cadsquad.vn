'use client'

import React from 'react'

import { Button } from '@heroui/react'
import { ChevronRight } from 'lucide-react'
import { Variants } from 'motion'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'

import { Link, usePathname } from '@/i18n/navigation'
import { SupportLanguages } from '@/i18n/routing'
import { MotionButton, MotionDiv, MotionLi, MotionP } from '@/lib/motion'
import { NavigateItem } from '@/shared/constants/header-navigate'
import { useHeaderNavigates } from '@/shared/hooks/use-header-navigates'
import { resolveNavLabel } from '@/shared/utils/navLabel'

export default function Navbar() {
    const navigates = useHeaderNavigates()

    return (
        <nav className="z-50 flex items-center justify-start gap-2">
            {navigates.map((item, index) => {
                return <NavbarItem key={index} data={item} index={index} />
            })}
        </nav>
    )
}

function NavbarItem({ data, index }: { data: NavigateItem; index: number }) {
    const locale = useLocale() as SupportLanguages
    const t = useTranslations('landing.layout.header')

    const pathname = usePathname()
    const isCurrentPath =
        data.href.startsWith('/') &&
        pathname.split('/').includes(data.href.split('/')[1])

    const label = resolveNavLabel(data, t, locale)

    const labelVariants: Variants = {
        init: {
            opacity: 0,
            y: 10,
        },
        animate: (i: number) => ({
            opacity: 1,
            color: isCurrentPath ? 'var(--color-primary)' : 'var(--foreground)',
            y: 0,
            transition: { delay: i * 0.1, type: 'spring', stiffness: 120 },
        }),
        hover: {
            opacity: 1,
            y: 0,
            color: 'var(--color-primary)',
        },
    }

    const bottomLineVariants: Variants = {
        init: {
            opacity: 0,
            width: 0,
            height: '2px',
            backgroundColor: 'var(--color-primary)',
        },
        animate: {
            width: isCurrentPath ? '100%' : 0,
            height: '2px',
            opacity: 1,
        },
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
        init: {
            opacity: 0,
        },
        animate: {
            opacity: 1,
        },
        hover: {
            opacity: 1,
            textDecoration: 'underline',
            textUnderlineOffset: '1px',
        },
    }

    return (
        <MotionDiv initial="init" animate="animate" whileHover="hover">
            <Link
                className="block mx-3 size-fit"
                href={data.href}
                title={label}
                target={data.outSite ? '_blank' : ''}
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
                            href={data.href}
                            className="block size-fit"
                            title={`Go to ${label}`}
                            target={data.outSite ? '_blank' : ''}
                        >
                            <Button
                                isIconOnly
                                className="rounded-full size-14 text-primary border-primary"
                                variant="bordered"
                            >
                                <ChevronRight size={30} />
                            </Button>
                        </Link>
                    </div>
                    <ul className="grid grid-cols-3 gap-6 max-h-[80vh] overflow-y-auto pr-5">
                        {data.menus.map((menuItem) => {
                            const itemLabel = resolveNavLabel(
                                menuItem,
                                t,
                                locale
                            )

                            return (
                                <MotionLi
                                    key={menuItem.href}
                                    initial="init"
                                    animate="animate"
                                    whileHover="hover"
                                    className="group"
                                >
                                    <Link
                                        href={menuItem.href}
                                        className="block space-y-2 size-full"
                                        target={
                                            menuItem.outSite ? '_blank' : ''
                                        }
                                    >
                                        <div className="w-full overflow-hidden rounded-sm aspect-video">
                                            <Image
                                                src={menuItem.image}
                                                alt={`${itemLabel} image`}
                                                className="object-cover transition duration-300 rounded-sm size-full group-hover:scale-110"
                                                width={500}
                                                height={500}
                                                quality={100}
                                            />
                                        </div>
                                        <MotionP
                                            variants={itemLabelVariants}
                                            className="font-medium text-center align-middle"
                                        >
                                            {itemLabel}
                                        </MotionP>
                                    </Link>
                                </MotionLi>
                            )
                        })}
                    </ul>
                </MotionDiv>
            )}
        </MotionDiv>
    )
}
