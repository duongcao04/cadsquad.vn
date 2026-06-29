import React from 'react'

import { MotionDiv, MotionH2, MotionP } from '@/lib/motion'
import { cn } from '@/lib/utils'

/**
 * Shared fade-in spring used across the home sections.
 * Mirrors the animation in `WhyChooseUs` / `HeadingSection`.
 */
const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: {
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.1,
            type: 'spring' as const,
            stiffness: 120,
            damping: 20,
        },
    },
    viewport: { once: true },
}

/**
 * Responsive helpers
 */
type Responsive<T> = T | Partial<Record<'base' | 'sm' | 'md' | 'lg' | 'xl', T>>

const COLS_MAP: Record<string, Record<number, string>> = {
    base: {
        1: 'grid-cols-1',
        2: 'grid-cols-2',
        3: 'grid-cols-3',
        4: 'grid-cols-4',
    },
    sm: {
        1: 'sm:grid-cols-1',
        2: 'sm:grid-cols-2',
        3: 'sm:grid-cols-3',
        4: 'sm:grid-cols-4',
    },
    md: {
        1: 'md:grid-cols-1',
        2: 'md:grid-cols-2',
        3: 'md:grid-cols-3',
        4: 'md:grid-cols-4',
    },
    lg: {
        1: 'lg:grid-cols-1',
        2: 'lg:grid-cols-2',
        3: 'lg:grid-cols-3',
        4: 'lg:grid-cols-4',
    },
    xl: {
        1: 'xl:grid-cols-1',
        2: 'xl:grid-cols-2',
        3: 'xl:grid-cols-3',
        4: 'xl:grid-cols-4',
    },
}

/** Static gap tokens so Tailwind's scanner can detect the full class names. */
const GAP_MAP: Record<number, string> = {
    0: 'gap-0',
    2: 'gap-2',
    3: 'gap-3',
    4: 'gap-4',
    5: 'gap-5',
    6: 'gap-6',
    7: 'gap-7',
    8: 'gap-8',
    10: 'gap-10',
    12: 'gap-12',
}

function resolveCols(cols?: Responsive<number>): string {
    if (cols == null) return ''
    if (typeof cols === 'number') return COLS_MAP.base[cols] ?? ''

    return Object.entries(cols)
        .map(([bp, value]) => COLS_MAP[bp]?.[value as number] ?? '')
        .filter(Boolean)
        .join(' ')
}

/**
 * Section.Wrapper
 *
 * Centered, responsive container for a landing section.
 * Supports a `grid` or `flex` layout out of the box.
 */
type WrapperProps = {
    children: React.ReactNode
    className?: string
    /** Inner layout. Defaults to `flex` column (heading + body stack). */
    layout?: 'grid' | 'flex' | 'block'
    /** Grid columns — single value or responsive map (only for `layout="grid"`). */
    cols?: Responsive<number>
    /** Flex direction (only for `layout="flex"`). */
    direction?: 'row' | 'col'
    /** Tailwind gap token, e.g. 5, 7, 8. */
    gap?: number
    /** Cross-axis alignment. */
    align?: 'start' | 'center' | 'end' | 'stretch'
    /** Main-axis alignment. */
    justify?: 'start' | 'center' | 'end' | 'between'
    /** Disable the default `container` utility (full-bleed sections). */
    fluid?: boolean
    /** Animate the wrapper on scroll into view. */
    animate?: boolean
}

const ALIGN_MAP = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
} as const

const JUSTIFY_MAP = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
} as const

function Wrapper({
    children,
    className,
    layout = 'flex',
    cols,
    direction = 'col',
    gap = 5,
    align,
    justify,
    fluid = false,
    animate = false,
}: WrapperProps) {
    const layoutClass = cn(
        layout === 'grid' && cn('grid', resolveCols(cols)),
        layout === 'flex' &&
            cn('flex', direction === 'col' ? 'flex-col' : 'flex-row'),
        align && ALIGN_MAP[align],
        justify && JUSTIFY_MAP[justify]
    )

    const Comp = animate ? MotionDiv : 'div'

    return (
        <Comp
            {...(animate ? fadeInUp : {})}
            className={cn(
                !fluid && 'container',
                layoutClass,
                GAP_MAP[gap] ?? 'gap-5',
                className
            )}
        >
            {children}
        </Comp>
    )
}

/**
 * Section.Title
 */
type TitleProps = {
    children: React.ReactNode
    className?: string
}

function Title({ children, className }: TitleProps) {
    return (
        <MotionH2
            {...fadeInUp}
            className={cn(
                'text-3xl lg:text-5xl font-bold font-saira',
                className
            )}
        >
            {children}
        </MotionH2>
    )
}

/**
 * Section.Description
 */
type DescriptionProps = {
    children: React.ReactNode
    className?: string
}

function Description({ children, className }: DescriptionProps) {
    return (
        <MotionP
            {...fadeInUp}
            className={cn(
                'text-base lg:text-lg text-muted-foreground max-w-2xl',
                className
            )}
        >
            {children}
        </MotionP>
    )
}

/**
 * Section.CTA
 */
type CTAProps = {
    children: React.ReactNode
    className?: string
}

function CTA({ children, className }: CTAProps) {
    return (
        <MotionDiv
            {...fadeInUp}
            className={cn('flex flex-wrap items-center gap-4', className)}
        >
            {children}
        </MotionDiv>
    )
}

export const Section = {
    Wrapper,
    Title,
    Description,
    CTA,
}

export default Section
