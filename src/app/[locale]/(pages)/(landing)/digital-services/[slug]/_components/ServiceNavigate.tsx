'use client'

import React from 'react'

import { ChevronsLeft, ChevronsRight } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'

import { Link } from '@/i18n/navigation'
import { CAD_SERVICES } from '@/shared/database/cadServices'
import { CadService } from '@/validationSchemas/cad-service.schema'

type Props = { service: CadService }

const cadServices = CAD_SERVICES
export default function ServiceNavigate({ service }: Props) {
    const locale = useLocale()
    const tButton = useTranslations('button')

    const lastService = cadServices.find(
        (item) => item?.order === cadServices.length - 1
    )
    const firstService = cadServices.find((item) => item?.order === 1)

    const prevService =
        Number(service?.order) - 1 === 0
            ? lastService
            : cadServices.find(
                  (item) => item?.order === Number(service?.order) - 1
              )
    const nextService =
        Number(service?.order) === cadServices.length
            ? firstService
            : cadServices.find(
                  (item) => item?.order === Number(service?.order) + 1
              )

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
                        {locale === 'vi'
                            ? prevService?.title?.vi
                            : prevService?.title.original}
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
                        {locale === 'vi'
                            ? nextService?.title?.vi
                            : nextService?.title.original}
                    </p>
                </button>
            </Link>
        </>
    )
}
