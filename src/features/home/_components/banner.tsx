'use client'

import React from 'react'

import { useTranslations } from 'next-intl'

import BannerImg from '@/assets/images/banner.webp'
import MobileBannerImg from '@/assets/images/mobile-banner.webp'
import HeroBanner from '@/shared/components/hero-banner'

export default function Banner() {
    const tHome = useTranslations('landing.home')

    return (
        <HeroBanner
            image={BannerImg}
            mobileImage={MobileBannerImg}
            title={tHome('slogan')}
            description={tHome('sloganDescription')}
        />
    )
}
