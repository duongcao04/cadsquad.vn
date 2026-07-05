'use client'

import React from 'react'

import { StaticImageData } from 'next/image'
import Image from 'next/image'

import { MotionSpan } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { smoothTransition } from '@/shared/components/section'

/** Word-by-word rising fade, shared by the title and description. */
function AnimatedWords({
    text,
    className,
    wordClassName,
    baseDelay = 0,
    step = 0.1,
    y = 10,
}: {
    text: string
    className?: string
    wordClassName?: string
    baseDelay?: number
    step?: number
    y?: number
}) {
    return (
        <span className={cn('flex flex-wrap', className)}>
            {text.split(' ').map((word, idx) => (
                <MotionSpan
                    key={idx}
                    initial={{ opacity: 0, y }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        transition: {
                            ...smoothTransition,
                            delay: baseDelay + idx * step,
                        },
                    }}
                    className={wordClassName}
                >
                    {word}
                </MotionSpan>
            ))}
        </span>
    )
}

export type HeroBannerProps = {
    /** Desktop image (also used on mobile when `mobileImage` is omitted). */
    image: StaticImageData
    /** Optional dedicated mobile image. */
    mobileImage?: StaticImageData
    /** Big heading, animated word-by-word. */
    title: string
    /** Sub-heading, animated word-by-word. */
    description?: string
    /** Extra classes for the <Image> (e.g. `object-cover` for photos). */
    imageClassName?: string
    /** Height / wrapper override. */
    className?: string
    /** Optional CTA area rendered under the description. */
    children?: React.ReactNode
}

/**
 * Full-bleed hero banner: background image, white→dark gradient, and an
 * animated title + description anchored to the bottom-left. Extracted from the
 * Home banner so any landing page can reuse the same section 1 treatment.
 */
export default function HeroBanner({
    image,
    mobileImage,
    title,
    description,
    imageClassName = 'pt-3',
    className,
    children,
}: HeroBannerProps) {
    return (
        <div
            className={cn(
                'w-full h-[580px] lg:h-[750px] overflow-hidden',
                className
            )}
        >
            <div className="size-full relative">
                {mobileImage ? (
                    <>
                        <Image
                            src={image}
                            quality={100}
                            alt={title}
                            priority
                            placeholder="blur"
                            className={cn(
                                'size-full hidden lg:block',
                                imageClassName
                            )}
                        />
                        <Image
                            src={mobileImage}
                            quality={100}
                            alt={title}
                            priority
                            placeholder="blur"
                            className={cn(
                                'size-full block lg:hidden',
                                imageClassName
                            )}
                        />
                    </>
                ) : (
                    <Image
                        src={image}
                        quality={100}
                        alt={title}
                        priority
                        placeholder="blur"
                        className={cn('size-full', imageClassName)}
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-white/100 via-white/10 to-black/100" />
            </div>
            <div className="container relative">
                <div className="absolute bottom-10 text-background">
                    <AnimatedWords
                        text={title}
                        className="text-4xl lg:text-7xl font-bold lg:font-semibold tracking-normal"
                        wordClassName="pr-2 lg:pr-5"
                        baseDelay={0.1}
                        step={0.1}
                        y={10}
                    />
                    {description && (
                        <AnimatedWords
                            text={description}
                            className="mt-2 ml-1 text-base lg:text-lg opacity-80"
                            wordClassName="pr-1"
                            step={0.03}
                            y={20}
                        />
                    )}
                    {children}
                </div>
            </div>
        </div>
    )
}
