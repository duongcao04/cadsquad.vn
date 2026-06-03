'use client'

import React, { useEffect, useRef } from 'react'

import { Button } from '@heroui/react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { MotionDiv } from '@/lib/motion'
import { TESTIMONIALS } from '@/shared/database/testimonials'
import { useDevice } from '@/shared/hooks/useDevice'

import HeadingSection from './HeadingSection'
import CustomerReviewCard from './cards/CustomerReviewCard'

export default function CustomerReview() {
    const { isMobile } = useDevice()

    const [emblaRef, emblaApi] = useEmblaCarousel()
    const prevButtonRef = useRef<HTMLButtonElement | null>(null)
    const nextButtonRef = useRef<HTMLButtonElement | null>(null)

    const testimonials = TESTIMONIALS

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
        <div className="container space-y-5 lg:space-y-8">
            <div className="flex items-center justify-between">
                <HeadingSection>
                    Customer <span className="text-primary">Review</span>
                </HeadingSection>
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
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        delay: idx * 0.1,
                                        type: 'spring',
                                        stiffness: 120,
                                        damping: 20,
                                    },
                                }}
                                viewport={{ once: true }}
                                className="flex-shrink-0 p-2"
                            >
                                <CustomerReviewCard data={tes} />
                            </MotionDiv>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
