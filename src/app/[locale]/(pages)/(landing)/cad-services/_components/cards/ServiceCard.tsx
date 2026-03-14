'use client'

import { Button, Skeleton } from '@heroui/react'
import { Image } from 'antd'
import { ChevronRight } from 'lucide-react'
import { Variants } from 'motion'
import { useLocale, useTranslations } from 'next-intl'

import { Link } from '@/i18n/navigation'
import { INTERNAL_URLS } from '@/lib'
import { MotionDiv } from '@/lib/motion'
import { useDevice } from '@/shared/hooks/useDevice'
import { TService, TServiceTranslation } from '@/types'

type Props = {
    data: TService
}

export default function ServiceCard({ data }: Props) {
    const locale = useLocale().toUpperCase()
    const tButton = useTranslations('button')
    const { isMobile } = useDevice()

    const cadServiceTranslations = (data?.translations.find(
        (it) => it.language === locale
    ) ??
        data?.translations.find(
            (it) => it.language === 'EN'
        )) as TServiceTranslation

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
                    href={INTERNAL_URLS.cadServiceDetail(
                        cadServiceTranslations.slug
                    )}
                    passHref
                    className="block"
                    title={cadServiceTranslations.title}
                >
                    <Image
                        src={data?.horizontalThumbnail?.url}
                        alt={cadServiceTranslations.title}
                        className="object-cover h-full aspect-video"
                        preview={false}
                    />
                </Link>
            </div>
            <div className="mt-6 lg:mt-0 w-full">
                <Link
                    href={INTERNAL_URLS.cadServiceDetail(
                        cadServiceTranslations.slug
                    )}
                    className="text-2xl font-semibold line-clamp-1 hover:underline underline-offset-4"
                    title={cadServiceTranslations.title}
                >
                    {cadServiceTranslations.title}
                </Link>
                <p className="mt-3 lg:mt-5 text-lg text-gray-700">
                    {cadServiceTranslations.shortDescription}
                </p>
                <Link
                    href={INTERNAL_URLS.cadServiceDetail(
                        cadServiceTranslations.slug
                    )}
                    className="block"
                >
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
