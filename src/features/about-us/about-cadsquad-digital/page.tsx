'use client'

import React from 'react'

import { Button } from '@heroui/react'
import { Breadcrumb } from 'antd'
import {
    Globe,
    Palette,
    ShoppingCart,
    TrendingUp,
    type LucideIcon,
} from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

import ImgBanner from '@/assets/images/about-us-banner.webp'
import { Link } from '@/i18n/navigation'
import { MotionDiv } from '@/lib/motion'
import { Section, fadeInUp } from '@/shared/components/section'

type Offering = {
    /** i18n key under `landing.aboutCadsquadDigital.offerings.items`. */
    key: string
    icon: LucideIcon
}

const OFFERINGS: Offering[] = [
    { key: 'web', icon: Globe },
    { key: 'ecommerce', icon: ShoppingCart },
    { key: 'branding', icon: Palette },
    { key: 'optimization', icon: TrendingUp },
]

export default function AboutCadsquadDigitalPage() {
    const tBreadcrumb = useTranslations('breadcrumbs')
    const t = useTranslations('landing.aboutCadsquadDigital')
    const tOfferings = useTranslations(
        'landing.aboutCadsquadDigital.offerings'
    )

    return (
        <div className="min-h-screen max-w-screen overflow-hidden pb-24">
            <section className="relative h-80 w-full overflow-hidden lg:h-96">
                <div className="relative size-full">
                    <Image
                        src={ImgBanner}
                        alt={t('heading.title')}
                        className="size-full object-cover"
                        placeholder="blur"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/85" />
                </div>
                <div className="absolute top-1/2 left-0 w-screen -translate-y-1/2">
                    <div className="container text-white">
                        <Breadcrumb
                            items={[
                                {
                                    title: (
                                        <Link
                                            href="/"
                                            style={{ color: 'hsl(0,0%,75%)' }}
                                        >
                                            {tBreadcrumb('home')}
                                        </Link>
                                    ),
                                },
                                {
                                    title: (
                                        <Link
                                            href="/about-us"
                                            style={{ color: 'hsl(0,0%,75%)' }}
                                        >
                                            {tBreadcrumb('aboutUs')}
                                        </Link>
                                    ),
                                },
                                {
                                    title: (
                                        <p className="font-medium text-white">
                                            {tBreadcrumb('aboutCadsquadDigital')}
                                        </p>
                                    ),
                                },
                            ]}
                            separator={<p className="text-gray-400">/</p>}
                        />
                        <h1 className="mt-5 font-saira text-4xl font-bold lg:text-6xl">
                            {t('heading.title')}
                        </h1>
                        <p className="mt-4 max-w-[95%] leading-normal opacity-85 lg:max-w-[70%]">
                            {t('heading.description')}
                        </p>
                    </div>
                </div>
            </section>

            <section className="container mt-14 max-w-4xl space-y-4 text-lg leading-relaxed text-justify">
                <p className="indent-8">{t('intro.paraph1')}</p>
                <p className="indent-8">{t('intro.paraph2')}</p>
            </section>

            <Section.Wrapper className="mt-20 gap-8">
                <Section.Title className="!text-center">
                    {tOfferings.rich('title', {
                        highlight: (chunk) => (
                            <span className="text-primary">{chunk}</span>
                        ),
                    })}
                </Section.Title>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {OFFERINGS.map((item, idx) => {
                        const Icon = item.icon
                        return (
                            <MotionDiv
                                key={item.key}
                                {...fadeInUp(idx * 0.08)}
                                className="flex h-full flex-col gap-4 rounded-2xl border border-border p-6 transition hover:shadow-md"
                            >
                                <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <Icon size={24} />
                                </span>
                                <h3 className="font-saira text-lg font-semibold lg:text-xl">
                                    {tOfferings(`items.${item.key}.title`)}
                                </h3>
                                <p className="text-sm leading-relaxed text-muted-foreground lg:text-base">
                                    {tOfferings(`items.${item.key}.description`)}
                                </p>
                            </MotionDiv>
                        )
                    })}
                </div>
            </Section.Wrapper>

            <Section.Wrapper className="mt-20 items-center gap-4 text-center">
                <Section.Title>{t('cta.title')}</Section.Title>
                <Section.Description className="mx-auto text-center">
                    {t('cta.description')}
                </Section.Description>
                <Link href="/digital-services" className="mt-2">
                    <Button color="primary" size="lg" className="rounded-full">
                        {t('cta.button')}
                    </Button>
                </Link>
            </Section.Wrapper>
        </div>
    )
}
