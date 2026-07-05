'use client'

import React, { RefObject, createRef } from 'react'

import { Button } from '@heroui/react'
import { Carousel } from 'antd'
import { CarouselRef } from 'antd/es/carousel'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { MotionDiv } from '@/lib/motion'
import { CAD_SERVICES } from '@/shared/database/cadServices'
import { Section, fadeInUp } from '@/shared/components/section'
import { useDevice } from '@/shared/hooks/useDevice'

import ServiceCard from './cards/service-card'

const services = CAD_SERVICES

export default function OurServices() {
    const carouselRef: RefObject<CarouselRef | null> = createRef<CarouselRef>()
    const tHome = useTranslations('landing.home')
    const { isMobile, isTablet, isDesktop } = useDevice()

    return (
        <Section.Wrapper className="gap-5 lg:gap-8">
            <div className="flex items-center justify-between">
                <Section.Title>
                    {tHome.rich('sections.ourServices.title', {
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
                            carouselRef.current?.prev()
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
                            carouselRef.current?.next()
                        }}
                    >
                        <ChevronRight />
                    </Button>
                </div>
            </div>
            <Carousel
                autoplay
                speed={1400}
                ref={carouselRef}
                draggable
                lazyLoad="anticipated"
                slidesToShow={isDesktop ? 4 : isTablet ? 2 : 1}
                centerPadding="30"
                dots={false}
                className="!w-full"
                infinite
                slidesToScroll={isDesktop ? 4 : isTablet ? 2 : 1}
            >
                {services?.map((service, idx) => (
                    <MotionDiv key={idx} {...fadeInUp(idx * 0.1)}>
                        <ServiceCard data={service} />
                    </MotionDiv>
                ))}
            </Carousel>
        </Section.Wrapper>
    )
}
