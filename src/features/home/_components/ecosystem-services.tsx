'use client'

import React from 'react'

import { MoveUpRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image, { StaticImageData } from 'next/image'

import ImgCad from '@/assets/images/cad-services.webp'
import ImgAffiliate from '@/assets/images/cadsquad-heart.webp'
import ImgAcademy from '@/assets/images/team.webp'
import ImgDigital from '@/assets/images/cadsquad-card.webp'
import { Link } from '@/i18n/navigation'
import { MotionDiv } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { Section, fadeInUp } from '@/shared/components/section'

type EcosystemUnit = {
    /** i18n key under `landing.home.sections.ecosystem.items`. */
    key: 'cad' | 'digital' | 'academy' | 'affiliate'
    image: StaticImageData
    href: string
    /** No route yet — render as a non-clickable "coming soon" card. */
    comingSoon?: boolean
}

const UNITS: EcosystemUnit[] = [
    { key: 'cad', image: ImgCad, href: '/cad-services' },
    { key: 'digital', image: ImgDigital, href: '/about-us/about-cadsquad-digital' },
    { key: 'academy', image: ImgAcademy, href: '/academy' },
    { key: 'affiliate', image: ImgAffiliate, href: '/affiliate', comingSoon: true },
]

function UnitCard({ unit, index }: { unit: EcosystemUnit; index: number }) {
    const tEco = useTranslations('landing.home.sections.ecosystem')
    const tButton = useTranslations('button')

    const inner = (
        <>
            <Image
                src={unit.image}
                alt={tEco(`items.${unit.key}.title`)}
                className="absolute inset-0 size-full object-cover brightness-[0.4] transition duration-300 group-hover:scale-110 group-hover:brightness-[0.3]"
                placeholder="blur"
            />
            <div className="relative flex size-full flex-col justify-between p-6 text-white">
                <div className="flex items-start justify-between gap-3">
                    <h3 className="max-w-[80%] font-saira text-xl font-semibold lg:text-2xl">
                        {tEco(`items.${unit.key}.title`)}
                    </h3>
                    {unit.comingSoon ? (
                        <span className="rounded-full border border-white/40 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                            {tEco('comingSoon')}
                        </span>
                    ) : (
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/40 backdrop-blur-sm transition group-hover:bg-white group-hover:text-black">
                            <MoveUpRight size={16} />
                        </span>
                    )}
                </div>
                <p className="mt-4 max-w-[95%] text-sm leading-relaxed text-white/85 lg:text-base">
                    {tEco(`items.${unit.key}.description`)}
                </p>
                {!unit.comingSoon && (
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-white/90">
                        {tButton('explorer')}
                        <MoveUpRight size={14} />
                    </span>
                )}
            </div>
        </>
    )

    const cardClass = cn(
        'group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border md:aspect-[1/1.15]',
        unit.comingSoon ? 'cursor-default' : 'cursor-pointer'
    )

    return (
        <MotionDiv {...fadeInUp(index * 0.1)}>
            {unit.comingSoon ? (
                <div className={cardClass} title={tEco('comingSoon')}>
                    {inner}
                </div>
            ) : (
                <Link href={unit.href} className={cn(cardClass, 'block')}>
                    {inner}
                </Link>
            )}
        </MotionDiv>
    )
}

export default function EcosystemServices() {
    const tEco = useTranslations('landing.home.sections.ecosystem')

    return (
        <Section.Wrapper className="gap-6 lg:gap-10">
            <div className="flex flex-col gap-3">
                <Section.Title>
                    {tEco.rich('title', {
                        highlight: (chunk) => (
                            <span className="text-primary">{chunk}</span>
                        ),
                    })}
                </Section.Title>
                <Section.Description>{tEco('subtitle')}</Section.Description>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {UNITS.map((unit, idx) => (
                    <UnitCard key={unit.key} unit={unit} index={idx} />
                ))}
            </div>
        </Section.Wrapper>
    )
}
