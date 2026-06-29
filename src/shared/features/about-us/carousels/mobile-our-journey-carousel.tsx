'use client'

import React, { useEffect, useRef, useState } from 'react'

import { Image } from 'antd'
import useEmblaCarousel from 'embla-carousel-react'
import { AnimatePresence } from 'framer-motion'
import { useLocale } from 'next-intl'

import { MotionDiv, MotionLi, MotionP } from '@/lib/motion'
import { OUR_JOURNEY, VI_OUR_JOURNEY } from '@/shared/database/ourJourney'

export default function MobileOurJourneyCarousel() {
    const locale = useLocale()
    const ourJourneys = locale === 'vi' ? VI_OUR_JOURNEY : OUR_JOURNEY
    const [focusedSlide, setFocusedSlide] = useState(0)

    const [emblaTimeRef, emblaTimeApi] = useEmblaCarousel()
    const [emblaMainRef, emblaMainApi] = useEmblaCarousel({
        containScroll: 'keepSnaps',
        dragFree: true,
    })
    const prevButtonRef = useRef<HTMLButtonElement | null>(null)
    const nextButtonRef = useRef<HTMLButtonElement | null>(null)

    useEffect(() => {
        if (!emblaMainApi || !emblaTimeApi) return

        const onSelect = () => {
            if (prevButtonRef.current)
                prevButtonRef.current.disabled = !emblaMainApi.canScrollPrev()
            if (nextButtonRef.current)
                nextButtonRef.current.disabled = !emblaMainApi.canScrollNext()
            const selectedIndex = emblaMainApi.selectedScrollSnap()
            emblaMainApi.scrollTo(selectedIndex)
            emblaTimeApi.scrollTo(selectedIndex)
            setFocusedSlide(selectedIndex)
        }
        emblaMainApi.on('select', onSelect)
        emblaTimeApi.on('scroll', () => {
            const selectedIndex = emblaTimeApi.selectedScrollSnap()
            emblaMainApi.scrollTo(selectedIndex)
        })
        onSelect()

        return () => {
            emblaMainApi.off('select', onSelect)
        }
    }, [emblaMainApi, emblaTimeApi])

    return (
        <>
            <div className="relative overflow-hidden pl-auto pt-[17px]">
                <div className="h-0.5 w-screen bg-[#dcdcdc]" />
                <div ref={emblaTimeRef} className="-mt-[8px]">
                    <div className="flex first:ml-[80px] last:mr-[80px]">
                        {ourJourneys.map((jNey, idx) => {
                            const isFocus = idx === focusedSlide

                            return (
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
                                    className="flex-shrink-0 w-[150px]"
                                    style={{
                                        filter: !isFocus
                                            ? 'grayscale(100%)'
                                            : '',
                                    }}
                                >
                                    <button
                                        className="w-full flex justify-center cursor-pointer"
                                        onClick={() => {
                                            emblaMainApi?.scrollTo(idx)
                                            emblaTimeApi?.scrollTo(idx)
                                        }}
                                    >
                                        <div className="flex flex-col items-center justify-center gap-3 w-fit">
                                            <div className="size-4 bg-danger rounded-full p-2 ring ring-offset-[6px] ring-danger" />
                                            <p className="text-xl lg:text-2xl font-bold text-danger select-none">
                                                {jNey.time}
                                            </p>
                                        </div>
                                    </button>
                                </MotionDiv>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="relative max-w-screen">
                <div ref={emblaMainRef} className="mt-8 lg:mt-10">
                    <div className="flex gap-5">
                        {ourJourneys.map((jNey, idx) => {
                            const isFocus = idx === focusedSlide

                            return (
                                <AnimatePresence key={idx}>
                                    <MotionDiv
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
                                        exit={{
                                            opacity: 0,
                                            y: 10,
                                        }}
                                        viewport={{ once: true }}
                                        className="flex-shrink-0 w-full aspect-video"
                                        style={{
                                            filter: !isFocus
                                                ? 'grayscale(100%)'
                                                : '',
                                        }}
                                    >
                                        <Image
                                            src={jNey.imageUrl}
                                            alt="Journey image"
                                            rootClassName="!w-full aspect-video"
                                            className="!w-full aspect-video"
                                            preview={false}
                                        />
                                        {isFocus && (
                                            <div>
                                                <MotionP
                                                    initial={{
                                                        opacity: 0,
                                                        y: 10,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                        transition: {
                                                            delay: 0.2,
                                                            type: 'spring',
                                                            stiffness: 120,
                                                            damping: 20,
                                                        },
                                                    }}
                                                    className="mt-5 text-center text-4xl font-bold text-danger"
                                                >
                                                    {jNey.year}
                                                </MotionP>
                                                <MotionP
                                                    initial={{
                                                        opacity: 0,
                                                        y: 10,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                        transition: {
                                                            delay: 0.3,
                                                            type: 'spring',
                                                            stiffness: 120,
                                                            damping: 20,
                                                        },
                                                    }}
                                                    className="mt-1 text-center text-lg font-semibold tracking-wide text-danger"
                                                >
                                                    {jNey.title}
                                                </MotionP>
                                                <ul className="mt-4 list-disc px-18 space-y-2.5 opacity-75">
                                                    {jNey.achievements.map(
                                                        (ach, idx) => {
                                                            return (
                                                                <MotionLi
                                                                    key={idx}
                                                                    initial={{
                                                                        opacity: 0,
                                                                        y: 10,
                                                                    }}
                                                                    animate={{
                                                                        opacity: 1,
                                                                        y: 0,
                                                                        transition:
                                                                            {
                                                                                delay:
                                                                                    (idx +
                                                                                        3) *
                                                                                    0.1,
                                                                                type: 'spring',
                                                                                stiffness: 120,
                                                                                damping: 20,
                                                                            },
                                                                    }}
                                                                >
                                                                    <p>{ach}</p>
                                                                </MotionLi>
                                                            )
                                                        }
                                                    )}
                                                </ul>
                                            </div>
                                        )}
                                    </MotionDiv>
                                </AnimatePresence>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}
