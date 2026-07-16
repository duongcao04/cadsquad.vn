'use client'

import React from 'react'

import { Button, Skeleton } from '@heroui/react'
import { Image } from 'antd'
import { ChevronRight } from 'lucide-react'
import { Variants } from 'motion'
import { useLocale, useTranslations } from 'next-intl'

import { type Service } from '@/features/services/_actions'

import { MotionDiv } from '@/lib/motion'
import { useDevice } from '@/shared/hooks/useDevice'

type Props = {
    data: Service
}

function getLocalizedText(
    value: Record<string, string> | null,
    locale: string
) {
    if (!value) return ''

    return (
        value[locale]?.trim() ||
        value.en?.trim() ||
        Object.values(value).find((item) => item.trim()) ||
        ''
    )
}

export default function ServiceCard({ data }: Props) {
    const locale = useLocale()
    const tButton = useTranslations('button')
    const { isMobile } = useDevice()

    const title = getLocalizedText(data.title, locale)
    const shortDescription = getLocalizedText(data.shortDescription, locale)

    const wrapperVariants: Variants = {
        init: {
            opacity: 0,
            borderColor: 'transparent',
        },
        animate: {
            opacity: 1,
            borderColor: 'transparent',
            boxShadow: isMobile ? 'rgba(0, 0, 0, 0.24) 0px 3px 8px' : 'none',
        },
        hover: {
            opacity: 1,
            borderColor: 'var(--border)',
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        },
    }

    const destination = `/cad-services/${data.slug}`

    return (
        <MotionDiv
            variants={wrapperVariants}
            initial="init"
            whileInView="animate"
            whileHover="hover"
            className="lg:grid grid-cols-[600px_1fr] gap-10 border-1 p-4 rounded-lg"
        >
            <div className="h-full overflow-hidden rounded-lg aspect-video">
                <a href={destination} className="block" title={title}>
                    <Image
                        src={
                            data.thumbnail?.vertical ??
                            data.thumbnail?.horizontal
                        }
                        alt={title}
                        className="object-cover h-full aspect-video"
                        preview={false}
                    />
                </a>
            </div>
            <div className="mt-6 lg:mt-0 w-full">
                <a
                    href={destination}
                    className="text-2xl font-semibold line-clamp-1 hover:underline underline-offset-4"
                    title={title}
                >
                    {title}
                </a>
                <p className="mt-3 lg:mt-5 text-lg text-gray-700">
                    {shortDescription}
                </p>
                <a href={destination} className="block">
                    <Button
                        className="mt-8 capitalize rounded-full"
                        variant="bordered"
                        color="primary"
                        title={tButton('getStartedNow')}
                    >
                        {tButton('getStartedNow')}
                        <ChevronRight />
                    </Button>
                </a>
            </div>
        </MotionDiv>
    )
}

export function ServiceCardSkeleton() {
    return (
        <div className="grid grid-cols-[600px_1fr] gap-10 p-4 rounded-lg">
            <Skeleton className="h-full overflow-hidden rounded-lg aspect-video"></Skeleton>
            <div className="w-full">
                <Skeleton className="w-full h-10 rounded-lg" />
                <Skeleton className="w-full h-4 mt-5 rounded-lg" />
                <Skeleton className="w-full h-4 mt-2 rounded-lg" />
                <Skeleton className="w-full h-4 mt-2 rounded-lg" />
                <Skeleton className="mt-8 w-[190px] h-[43px] rounded-full" />
            </div>
        </div>
    )
}
