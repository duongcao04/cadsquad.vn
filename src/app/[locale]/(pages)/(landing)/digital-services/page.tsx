'use client'

import { useSuspenseQueries } from '@tanstack/react-query'
import { Breadcrumb } from 'antd'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'

import ButtonDownloadBrochure from '@/components/ButtonDownloadBrochure'

import { ServiceCard } from '@/features/service-details'

import ImgCadService from '@/assets/images/cad-services.webp'
import { Link } from '@/i18n/navigation'
import { serviceListOptions, serviceTypesListOptions } from '@/queires'

export default function DigitalServicesPage() {
    const locale = useLocale().toUpperCase()
    const tBreadcrumb = useTranslations('breadcrumbs')
    const tCadServices = useTranslations('landing.digitalServices')

    const [
        {
            data: { serviceTypes },
        },
        {
            data: { services },
        },
    ] = useSuspenseQueries({
        queries: [serviceTypesListOptions, serviceListOptions],
    })

    const CAD_SERVICE_CODE = 'WEB_DEV'
    const cadServiceType = serviceTypes.find(
        (it) => it.code === CAD_SERVICE_CODE
    )
    const serviceTranslation =
        cadServiceType?.translations.find((it) => it.language === locale) ??
        cadServiceType?.translations.find((it) => it.language === 'EN')

    const digitalServices = services.filter(
        (s) => s.serviceType?.code === CAD_SERVICE_CODE
    )

    return (
        <div className="min-h-screen pb-16 max-w-screen">
            <section className="relative w-full overflow-hidden h-[760px] lg:h-[500px]">
                <div className="relative size-full">
                    <Image
                        src={ImgCadService}
                        alt="Image"
                        className="object-cover size-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/80" />
                </div>
                <div className="py-8 absolute top-[50%] translate-y-[-50%] left-0 w-screen">
                    <div className="container" style={{ color: 'white' }}>
                        <Breadcrumb
                            items={[
                                {
                                    title: (
                                        <Link
                                            href="/"
                                            style={{ color: 'hsl(0,0%,75%)' }}
                                        >
                                            {tBreadcrumb('home')}
                                        </Link>
                                    ),
                                },
                                {
                                    title: (
                                        <p
                                            style={{ color: 'hsl(0,0%,97%)' }}
                                            className="font-medium"
                                        >
                                            {serviceTranslation?.displayName}
                                        </p>
                                    ),
                                },
                            ]}
                            style={{
                                color: '#99a1af',
                            }}
                            separator={<p className="text-gray-400">/</p>}
                        />
                        <h2 className="mt-5 text-6xl font-bold font-saira">
                            {tCadServices('heading.title')}
                        </h2>
                        <p className="mt-5 leading-normal max-w-[95%] lg:max-w-[85%] text-justify">
                            {tCadServices('heading.description')}
                        </p>
                        {serviceTranslation?.brochureUrl && (
                            <ButtonDownloadBrochure />
                        )}
                    </div>
                </div>
            </section>
            <section className="container space-y-10 mt-14">
                {digitalServices.map((service) => (
                    <ServiceCard key={service.id} data={service} />
                ))}
            </section>
        </div>
    )
}
