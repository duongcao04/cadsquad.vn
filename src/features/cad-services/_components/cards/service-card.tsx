'use client'

import React from 'react'

import { Button, Skeleton } from '@heroui/react'
import { Image } from 'antd'
import { ChevronRight } from 'lucide-react'
import { Variants } from 'motion'
import { useLocale, useTranslations } from 'next-intl'

import { Link } from '@/i18n/navigation'
import { MotionDiv } from '@/lib/motion'
import { useDevice } from '@/shared/hooks/useDevice'
import { CadService } from '@/validationSchemas/cad-service.schema'

type Props = {
    data: CadService
}

export default function ServiceCard({ data }: Props) {
    const locale = useLocale()
    const tButton = useTranslations('button')
    const { isMobile } = useDevice()

    const title = locale === 'vi' ? data?.title?.vi : data?.title?.original
    const shortDescription =
        locale === 'vi'
            ? data?.shortDescription?.vi
            : data?.shortDescription?.original

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
                <Link
                    href={destination}
                    passHref
                    className="block"
                    title={title}
                >
                    <Image
                        src={data?.thumbnail?.vertical}
                        alt={title}
                        className="object-cover h-full aspect-video"
                        preview={false}
                    />
                </Link>
            </div>
            <div className="mt-6 lg:mt-0 w-full">
                <Link
                    href={destination}
                    className="text-2xl font-semibold line-clamp-1 hover:underline underline-offset-4"
                    title={title}
                >
                    {title}
                </Link>
                <p className="mt-3 lg:mt-5 text-lg text-gray-700">
                    {shortDescription}
                </p>
                <Link href={destination} className="block">
                    <Button
                        className="mt-8 capitalize rounded-full"
                        variant="bordered"
                        color="primary"
                        title={tButton('getStartedNow')}
                    >
                        {tButton('getStartedNow')}
                        <ChevronRight />
                    </Button>
                </Link>
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
