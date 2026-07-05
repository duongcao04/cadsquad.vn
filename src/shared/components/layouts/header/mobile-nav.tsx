'use client'

import React, { useState } from 'react'

import { Button } from '@heroui/react'
import { Drawer } from 'antd'
import { ArrowUpRight, ChevronLeft, ChevronRight, HomeIcon } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'

import { Link, usePathname } from '@/i18n/navigation'
import { SupportLanguages } from '@/i18n/routing'
import {
    HEADER_NAVIGATES,
    NavigateItem,
} from '@/shared/constants/headerNavigate'
import { resolveNavLabel } from '@/shared/utils/navLabel'

import Logo from '../../Logo'
import CTAButton from './CTAButton'
import ChangeLanguage from './ChangeLanguage'

type Props = {
    isOpen: boolean
    onClose: () => void
}
export default function MobileNav({ isOpen, onClose }: Props) {
    const [currentNav, setCurrentNav] = useState<NavigateItem | null>(null)

    return (
        <Drawer
            title={
                <div className="flex items-center justify-between">
                    <Logo
                        classNames={{
                            root: 'h-10 flex items-center justify-center',
                            logo: 'max-h-full',
                        }}
                    />
                    <ChangeLanguage />
                </div>
            }
            closable={false}
            onClose={() => {
                onClose()
                setCurrentNav(null)
            }}
            open={isOpen}
            width="85%"
            placement="left"
            classNames={{
                body: '!p-0',
            }}
        >
            {!currentNav && (
                <RootNav setCurrentNav={setCurrentNav} onClose={onClose} />
            )}
            {currentNav && (
                <NavItem
                    data={currentNav}
                    setCurrentNav={setCurrentNav}
                    onClose={onClose}
                />
            )}
        </Drawer>
    )
}

function RootNav({
    setCurrentNav,
    onClose,
}: {
    setCurrentNav: React.Dispatch<React.SetStateAction<NavigateItem | null>>
    onClose: () => void
}) {
    const pathname = usePathname()
    const isHomePath = pathname === '/'
    const locale = useLocale() as SupportLanguages
    const t = useTranslations('landing.layout.header')

    return (
        <nav className="py-3 w-full">
            <ul className="w-full space-y-4">
                <li className="mx-4 w-fit py-0.5 flex items-center justify-between border-b-2 border-danger cursor-pointer">
                    <Link href="/" className="block">
                        <Button isIconOnly variant="light">
                            <HomeIcon
                                className={
                                    isHomePath ? 'text-danger' : 'text-black'
                                }
                            />
                        </Button>
                    </Link>
                </li>
                {HEADER_NAVIGATES.map((item, idx) => {
                    if (item.menus) {
                        return (
                            <li
                                key={idx}
                                className="py-2 border-b border-border cursor-pointer"
                            >
                                <div
                                    className="mx-4 flex items-center justify-between"
                                    onClick={() => {
                                        setCurrentNav(item)
                                    }}
                                >
                                    <p className="uppercase font-semibold text-lg">
                                        {resolveNavLabel(item, t, locale)}
                                    </p>
                                    <div className="size-12 flex items-center justify-center">
                                        <ChevronRight
                                            className="!text-danger"
                                            size={24}
                                        />
                                    </div>
                                </div>
                            </li>
                        )
                    } else {
                        return (
                            <Link
                                href={item.href}
                                key={idx}
                                className="block py-2 border-b border-border cursor-pointer"
                                onClick={onClose}
                                target={item.outSite ? '_blank' : ''}
                            >
                                <div className="mx-4 flex items-center justify-between">
                                    <p className="!text-black uppercase font-semibold text-lg">
                                        {resolveNavLabel(item, t, locale)}
                                    </p>

                                    <div className="size-12 flex items-center justify-center">
                                        {item.outSite && (
                                            <ArrowUpRight
                                                className="!text-danger"
                                                size={20}
                                            />
                                        )}
                                    </div>
                                </div>
                            </Link>
                        )
                    }
                })}
                <li className="mt-8 mx-4 w-fit">
                    <CTAButton />
                </li>
            </ul>
        </nav>
    )
}

function NavItem({
    data,
    setCurrentNav,
    onClose,
}: {
    data: NavigateItem
    setCurrentNav: React.Dispatch<React.SetStateAction<NavigateItem | null>>
    onClose: () => void
}) {
    const locale = useLocale() as SupportLanguages
    const t = useTranslations('landing.layout.header')

    return (
        <div className="py-3">
            <div
                onClick={() => {
                    setCurrentNav(null)
                }}
                className="mx-4 flex items-center justify-start gap-6 cursor-pointer"
            >
                <Button
                    isIconOnly
                    color="danger"
                    size="sm"
                    onPress={() => {
                        setCurrentNav(null)
                    }}
                >
                    <ChevronLeft />
                </Button>
                <p className="uppercase font-bold text-xl text-black">
                    {resolveNavLabel(data, t, locale)}
                </p>
            </div>
            <ul className="mt-8 flex flex-col gap-5">
                {data?.menus?.map((item, idx) => {
                    const itemLabel = resolveNavLabel(item, t, locale)
                    return (
                        <li key={idx}>
                            <div className="py-2.5 border-b border-border cursor-pointer">
                                <div className="max-w-full mx-4 grid grid-cols-[80px_1fr] items-center gap-5">
                                    <div className="w-[80px] aspect-video overflow-hidden rounded-sm">
                                        <Image
                                            src={item.image}
                                            alt={itemLabel}
                                            width={100}
                                            height={100}
                                        />
                                    </div>
                                    <Link
                                        href={item.href}
                                        className="!text-black w-fit font-semibold text-lg line-clamp-2"
                                        onClick={onClose}
                                    >
                                        {itemLabel}
                                    </Link>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
