'use client'

import { useSuspenseQueries } from '@tanstack/react-query'
import { Breadcrumb } from 'antd'
import { Link } from '@tanstack/react-router'

import ButtonDownloadBrochure from '@/components/ButtonDownloadBrochure'

import { ServiceCard } from '@/features/service-details'

import ImgCadService from '@/assets/images/cad-services.webp'
import { INTERNAL_URLS } from '@/lib'
import { serviceListOptions, serviceTypesListOptions } from '@/queires'

export default function CADServices() {
    const locale = 'EN'

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

    const CAD_SERVICE_CODE = 'CAD_SER'
    const cadServiceType = serviceTypes.find(
        (it) => it.code === CAD_SERVICE_CODE
    )
    const serviceTranslation =
        cadServiceType?.translations.find((it) => it.language === locale) ??
        cadServiceType?.translations.find((it) => it.language === 'EN')

    const cadServices = services.filter(
        (s) => s.serviceType?.code === CAD_SERVICE_CODE
    )

    return (
        <div className="min-h-screen pb-16 max-w-screen">
            <section className="relative w-full overflow-hidden h-[760px] lg:h-[500px]">
                <div className="relative size-full">
                    <img
                        src={ImgCadService as unknown as string}
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
                                            to={INTERNAL_URLS.home}
                                            style={{ color: 'hsl(0,0%,75%)' }}
                                        >
                                            Home
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
                            {serviceTranslation?.displayName}
                        </h2>
                        <p className="mt-5 leading-normal max-w-[95%] lg:max-w-[85%] text-justify">
                            {serviceTranslation?.description}
                        </p>
                        {serviceTranslation?.brochureUrl && (
                            <ButtonDownloadBrochure
                                downloadUrl={serviceTranslation?.brochureUrl}
                            />
                        )}
                    </div>
                </div>
            </section>
            <section className="container space-y-10 mt-14">
                {cadServices.map((service) => (
                    <ServiceCard key={service.id} data={service} />
                ))}
            </section>
        </div>
    )
}
