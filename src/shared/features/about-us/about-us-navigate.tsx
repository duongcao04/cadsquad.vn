'use client'

import React from 'react'

import { useLocale } from 'next-intl'

import {
    ABOUT_US_NAVIGATE,
    VI_ABOUT_US_NAVIGATE,
} from '@/shared/constants/aboutUsNavigate'
import { useDevice } from '@/shared/hooks/useDevice'

export default function AboutUsNavigate() {
    const { isMobile } = useDevice()
    const locale = useLocale()

    const aboutUsNavigate =
        locale === 'vi' ? VI_ABOUT_US_NAVIGATE : ABOUT_US_NAVIGATE

    return (
        <nav className="bg-border">
            <ul
                className="container flex items-center overflow-x-auto scroll-none"
                style={{
                    justifyContent: isMobile ? 'start' : 'center',
                }}
            >
                {aboutUsNavigate.map((item, idx) => {
                    return (
                        <li
                            key={idx}
                            className="py-3 pr-16 flex items-center justify-center text-nowrap"
                        >
                            <p className="text-[#aaa9a9] text-lg font-medium font-saira uppercase">
                                {item.title}
                            </p>
                            {idx !== ABOUT_US_NAVIGATE.length - 1 && (
                                <div className="h-[25px] w-[2px] bg-[#bdbdbd] ml-16" />
                            )}
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}
