'use client'

import React from 'react'

import { useLocale, useTranslations } from 'next-intl'

import { AnimatedTestimonials } from '@/shared/components/ui/animated-testimonials'
import { TESTIMONIALS, VI_TESTIMONIALS } from '@/shared/database/testimonials'
import { Section } from '@/features/home/_components/section'

export default function Testimonials() {
    const locale = useLocale()
    const tHome = useTranslations('landing.home')

    const testimonials = locale === 'vi' ? VI_TESTIMONIALS : TESTIMONIALS

    return (
        <Section.Wrapper layout="block">
            <Section.Title className="text-center">
                {tHome.rich('sections.customerReview.title', {
                    highlight: (chunk) => (
                        <span className="text-primary">{chunk}</span>
                    ),
                })}
            </Section.Title>
            <div>
                <AnimatedTestimonials testimonials={testimonials} autoplay />
            </div>
        </Section.Wrapper>
    )
}
