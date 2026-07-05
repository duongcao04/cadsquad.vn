'use client'

import React from 'react'

import { useTranslations } from 'next-intl'

import { ABOUT_US_NAVIGATE } from '@/shared/constants/about-us-navigate'
import { useDevice } from '@/shared/hooks/useDevice'

export default function AboutUsNavigate() {
    const { isMobile } = useDevice()
    const t = useTranslations('landing.aboutUs.navigate')

    return (
        <nav className="bg-border">
            <ul
                className="container flex items-center overflow-x-auto scroll-none"
                style={{
                    justifyContent: isMobile ? 'start' : 'center',
                }}
            >
                {ABOUT_US_NAVIGATE.map((item, idx) => {
                    return (
                        <li
                            key={item.key}
                            className="py-3 pr-16 flex items-center justify-center text-nowrap"
                        >
                            <p className="text-[#aaa9a9] text-lg font-medium font-saira uppercase">
                                {t(item.key)}
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
