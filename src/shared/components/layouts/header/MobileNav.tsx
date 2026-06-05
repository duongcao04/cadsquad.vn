'use client'

import React, { useState } from 'react'

import { Button } from '@heroui/react'
import { Link, useLocation } from '@tanstack/react-router'
import { Drawer } from 'antd'
import { ArrowUpRight, ChevronLeft, ChevronRight, HomeIcon } from 'lucide-react'

import {
    HEADER_NAVIGATES,
    NavigateItem,
} from '@/shared/constants/headerNavigate'

import Logo from '../../Logo'
import CTAButton from './CTAButton'

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
    const { pathname } = useLocation()
    const isHomePath = pathname === '/'

    return (
        <nav className="py-3 w-full">
            <ul className="w-full space-y-4">
                <li className="mx-4 w-fit py-0.5 flex items-center justify-between border-b-2 border-danger cursor-pointer">
                    <Link to="/" className="block">
                        <Button isIconOnly variant="ghost">
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
                                    onClick={() => setCurrentNav(item)}
                                >
                                    <p className="uppercase font-semibold text-lg">
                                        {item.enLabel}
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
                                to={item.href}
                                key={idx}
                                className="block py-2 border-b border-border cursor-pointer"
                                onClick={onClose}
                                target={item.outSite ? '_blank' : undefined}
                            >
                                <div className="mx-4 flex items-center justify-between">
                                    <p className="!text-black uppercase font-semibold text-lg">
                                        {item.enLabel}
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
    return (
        <div className="py-3">
            <div
                onClick={() => setCurrentNav(null)}
                className="mx-4 flex items-center justify-start gap-6 cursor-pointer"
            >
                <Button
                    isIconOnly
                    variant="danger"
                    size="sm"
                    onPress={() => setCurrentNav(null)}
                >
                    <ChevronLeft />
                </Button>
                <p className="uppercase font-bold text-xl text-black">
                    {data.enLabel}
                </p>
            </div>
            <ul className="mt-8 flex flex-col gap-5">
                {data?.menus?.map((item, idx) => (
                    <li key={idx}>
                        <div className="py-2.5 border-b border-border cursor-pointer">
                            <div className="max-w-full mx-4 grid grid-cols-[80px_1fr] items-center gap-5">
                                <div className="w-[80px] aspect-video overflow-hidden rounded-sm">
                                    <img
                                        src={item.image}
                                        alt={item.enLabel}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <Link
                                    to={item.href}
                                    className="!text-black w-fit font-semibold text-lg line-clamp-2"
                                    onClick={onClose}
                                >
                                    {item.enLabel}
                                </Link>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
