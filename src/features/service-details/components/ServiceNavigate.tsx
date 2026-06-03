'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { ChevronsLeft, ChevronsRight } from 'lucide-react'

import { serviceListOptions } from '@/queires'
import { Language, TService, TServiceTranslation } from '@/types'

const getServiceTranslation = (service: TService, locale: Language | string) => {
    return (service?.translations.find((it) => it.language === locale) ??
        service?.translations.find((it) => it.language === 'EN')) as TServiceTranslation
}

type Props = { service: TService }
export function ServiceNavigate({ service }: Props) {
    const {
        data: { services },
    } = useSuspenseQuery(serviceListOptions)

    const CAD_SERVICE_CODE = 'CAD_SER'
    const cadServices = services.filter(
        (s) => s.serviceType?.code === CAD_SERVICE_CODE
    )

    const lastService = cadServices.find(
        (item) => item?.orderNumber === services.length - 1
    ) as TService
    const firstService = cadServices.find(
        (item) => item?.orderNumber === 1
    ) as TService

    const prevService =
        Number(service?.orderNumber) - 1 === 0
            ? lastService
            : (cadServices.find(
                  (item) => item?.orderNumber === Number(service?.orderNumber) - 1
              ) as TService)

    const nextService =
        Number(service?.orderNumber) === cadServices.length
            ? firstService
            : (cadServices.find(
                  (item) => item?.orderNumber === Number(service?.orderNumber) + 1
              ) as TService)

    return (
        <>
            <Link
                to="/cad-services/$slug"
                params={{ slug: getServiceTranslation(prevService, 'EN')?.slug ?? '' }}
                className="block"
            >
                <button className="hidden lg:block text-left border border-border rounded-lg px-7 py-4 group transition duration-250 hover:border-danger cursor-pointer">
                    <div className="flex items-center justify-start gap-1">
                        <ChevronsLeft
                            size={16}
                            className="group-hover:text-danger transition duration-250"
                        />
                        <p className="text-sm font-semibold opacity-75">Previous</p>
                    </div>
                    <p className="mt-1 text-lg font-semibold line-clamp-2 w-[350px] max-h-[2lh] leading-normal group-hover:text-danger transition duration-250">
                        {getServiceTranslation(prevService, 'EN')?.title}
                    </p>
                </button>
            </Link>
            <Link
                to="/cad-services/$slug"
                params={{ slug: getServiceTranslation(nextService, 'EN')?.slug ?? '' }}
                className="block"
            >
                <button className="text-right border border-border rounded-lg px-7 py-4 group transition duration-250 hover:border-danger cursor-pointer">
                    <div className="flex items-center justify-end gap-1">
                        <p className="text-sm font-semibold opacity-75">Next</p>
                        <ChevronsRight
                            size={16}
                            className="group-hover:text-danger transition duration-250"
                        />
                    </div>
                    <p className="mt-1 text-lg font-semibold line-clamp-2 w-[350px] max-h-[2lh] leading-normal group-hover:text-danger transition duration-250">
                        {getServiceTranslation(nextService, 'EN')?.title}
                    </p>
                </button>
            </Link>
        </>
    )
}
