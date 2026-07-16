'use client'

import React from 'react'

import { ChevronsLeft, ChevronsRight } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'

import { type Service } from '@/features/services/_actions'

import { Link } from '@/i18n/navigation'

type Props = {
    service: Service
    services: Service[]
}

function getLocalizedTitle(service: Service | undefined, locale: string) {
    if (!service?.title) return ''

    return (
        service.title[locale]?.trim() ||
        service.title.en?.trim() ||
        Object.values(service.title).find((item) => item.trim()) ||
        ''
    )
}

export default function ServiceNavigate({ service, services }: Props) {
    const locale = useLocale()
    const tButton = useTranslations('button')

    const currentIndex = services.findIndex((item) => item.id === service.id)
    const previousIndex =
        currentIndex <= 0 ? services.length - 1 : currentIndex - 1
    const nextIndex =
        currentIndex === services.length - 1 ? 0 : currentIndex + 1
    const prevService = services[previousIndex]
    const nextService = services[nextIndex]

    if (services.length < 2 || currentIndex < 0) return null

    return (
        <>
            <Link href={`/cad-services/${prevService?.slug}`} className="block">
                <button className="hidden lg:block text-left border border-border rounded-lg px-7 py-4 group transition duration-250 hover:border-danger cursor-pointer">
                    <div className="flex items-center justify-start gap-1">
                        <ChevronsLeft
                            size={16}
                            className="group-hover:text-danger transition duration-250"
                        />
                        <p className="text-sm font-semibold opacity-75">
                            {tButton('previous')}
                        </p>
                    </div>
                    <p className="mt-1 text-lg font-semibold line-clamp-2 w-[350px] max-h-[2lh] leading-normal group-hover:text-danger transition duration-250">
                        {getLocalizedTitle(prevService, locale)}
                    </p>
                </button>
            </Link>
            <Link href={`/cad-services/${nextService?.slug}`} className="block">
                <button className="text-right border border-border rounded-lg px-7 py-4 group transition duration-250 hover:border-danger cursor-pointer">
                    <div className="flex items-center justify-end gap-1">
                        <p className="text-sm font-semibold opacity-75">
                            {tButton('next')}
                        </p>
                        <ChevronsRight
                            size={16}
                            className="group-hover:text-danger transition duration-250"
                        />
                    </div>
                    <p className="mt-1 text-lg font-semibold line-clamp-2 w-[350px] max-h-[2lh] leading-normal group-hover:text-danger transition duration-250">
                        {getLocalizedTitle(nextService, locale)}
                    </p>
                </button>
            </Link>
        </>
    )
}
