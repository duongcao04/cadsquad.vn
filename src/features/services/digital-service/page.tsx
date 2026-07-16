'use client'

import React from 'react'

import { Breadcrumb } from 'antd'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

import ServiceCard from '@/features/services/digital-service/_components/cards/service-card'

import ImgDigitalService from '@/assets/images/cad-services.webp'
import { Link } from '@/i18n/navigation'
import ButtonDownloadBrochure from '@/shared/components/button-download-brochure'
import { DIGITAL_SERVICES } from '@/shared/database/digitalServices'

export default function DigitalServices() {
    const tBreadcrumb = useTranslations('breadcrumbs')
    const tDigitalServices = useTranslations('landing.digitalServices')

    return (
        <div className="min-h-screen pb-16 max-w-screen">
            <section className="relative w-full overflow-hidden h-[760px] lg:h-[500px]">
                <div className="relative size-full">
                    <Image
                        src={ImgDigitalService}
                        alt={tDigitalServices('heading.title')}
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
                                            {tBreadcrumb('digitalService')}
                                        </p>
                                    ),
                                },
                            ]}
                            style={{ color: '#99a1af' }}
                            separator={<p className="text-gray-400">/</p>}
                        />
                        <h2 className="mt-5 text-6xl font-bold font-saira">
                            {tDigitalServices('heading.title')}
                        </h2>
                        <p className="mt-5 leading-normal max-w-[95%] lg:max-w-[85%] text-justify">
                            {tDigitalServices('heading.description')}
                        </p>
                        <ButtonDownloadBrochure />
                    </div>
                </div>
            </section>
            <section className="container space-y-10 mt-14">
                {DIGITAL_SERVICES.map((service) => (
                    <ServiceCard key={service.id} data={service} />
                ))}
            </section>
        </div>
    )
}
