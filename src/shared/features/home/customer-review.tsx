'use client'

import React, { useEffect, useRef } from 'react'

import { Button } from '@heroui/react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'

import { MotionDiv } from '@/lib/motion'
import { TESTIMONIALS, VI_TESTIMONIALS } from '@/shared/database/testimonials'
import { Section, fadeInUp } from '@/shared/features/home/section'
import { useDevice } from '@/shared/hooks/useDevice'

import CustomerReviewCard from './cards/customer-review-card'

export default function CustomerReview() {
    const locale = useLocale()
    const tHome = useTranslations('landing.home')
    const { isMobile } = useDevice()

    const [emblaRef, emblaApi] = useEmblaCarousel()
    const prevButtonRef = useRef<HTMLButtonElement | null>(null)
    const nextButtonRef = useRef<HTMLButtonElement | null>(null)

    const testimonials = locale === 'vi' ? VI_TESTIMONIALS : TESTIMONIALS

    useEffect(() => {
        if (emblaApi) {
            const onSelect = () => {
                if (prevButtonRef.current)
                    prevButtonRef.current.disabled = !emblaApi.canScrollPrev()
                if (nextButtonRef.current)
                    nextButtonRef.current.disabled = !emblaApi.canScrollNext()
            }

            emblaApi.on('select', onSelect)
            onSelect()
            return () => {
                emblaApi.off('select', onSelect)
            }
        }
    }, [emblaApi])
    return (
        <Section.Wrapper className="gap-5 lg:gap-8">
            <div className="flex items-center justify-between">
                <Section.Title>
                    {tHome.rich('sections.customerReview.title', {
                        highlight: (chunk) => (
                            <span className="text-primary">{chunk}</span>
                        ),
                    })}
                </Section.Title>
                <div className="flex items-center justify-end gap-3">
                    <Button
                        isIconOnly
                        variant="ghost"
                        size={isMobile ? 'md' : 'lg'}
                        className="rounded-full text-secondary"
                        onPress={() => {
                            emblaApi?.scrollPrev()
                        }}
                    >
                        <ChevronLeft />
                    </Button>
                    <Button
                        isIconOnly
                        variant="ghost"
                        size={isMobile ? 'md' : 'lg'}
                        className="rounded-full text-secondary"
                        onPress={() => {
                            emblaApi?.scrollNext()
                        }}
                    >
                        <ChevronRight />
                    </Button>
                </div>
            </div>
            <div className="relative max-w-screen pl-auto">
                <div ref={emblaRef}>
                    <div className="flex gap-5">
                        {testimonials.map((tes, idx) => (
                            <MotionDiv
                                key={idx}
                                {...fadeInUp(idx * 0.1)}
                                className="flex-shrink-0 p-2"
                            >
                                <CustomerReviewCard data={tes} />
                            </MotionDiv>
                        ))}
                    </div>
                </div>
            </div>
        </Section.Wrapper>
    )
}
