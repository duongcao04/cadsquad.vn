'use client'

import React, { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

type InfiniteMovingCardsProps<T> = {
    items: T[]
    children: (item: T) => React.ReactNode
    direction?: 'left' | 'right'
    speed?: 'fast' | 'normal' | 'slow'
    pauseOnHover?: boolean
    className?: { root?: string; item?: string }
}
export const InfiniteMovingCards = <T,>({
    items,
    children,
    direction = 'left',
    speed = 'fast',
    pauseOnHover = true,
    className,
}: InfiniteMovingCardsProps<T>) => {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const scrollerRef = React.useRef<HTMLUListElement>(null)

    const [start, setStart] = useState(false)

    useEffect(() => {
        if (containerRef.current && scrollerRef.current) {
            const scrollerContent = Array.from(scrollerRef.current.children)

            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true)
                if (scrollerRef.current) {
                    scrollerRef.current.appendChild(duplicatedItem)
                }
            })

            containerRef.current.style.setProperty(
                '--animation-direction',
                direction === 'left' ? 'forwards' : 'reverse'
            )

            const duration = {
                fast: '20s',
                normal: '40s',
                slow: '95s',
            }[speed]

            containerRef.current.style.setProperty(
                '--animation-duration',
                duration
            )
            setStart(true)
        }
    }, [direction, speed])

    return (
        <div
            ref={containerRef}
            className={cn(
                'scroller relative z-20 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
                className?.root
            )}
        >
            <ul
                ref={scrollerRef}
                className={cn(
                    'flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4',
                    start && 'animate-scroll',
                    pauseOnHover && 'hover:[animation-play-state:paused]'
                )}
            >
                {items.map((item, idx) => (
                    <li
                        className={cn(
                            'relative w-[350px] max-w-full shrink-0 rounded-2xl border border-b-0 border-zinc-200 bg-[linear-gradient(180deg,#fafafa,#f5f5f5)] px-8 py-6 md:w-[450px] dark:border-zinc-700 dark:bg-[linear-gradient(180deg,#27272a,#18181b)]',
                            className?.item
                        )}
                        key={idx}
                    >
                        {children(item)}
                    </li>
                ))}
            </ul>
        </div>
    )
}
