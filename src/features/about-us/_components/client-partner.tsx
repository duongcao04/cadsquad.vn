'use client'

import React from 'react'

import { Image as Img } from 'antd'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

import ClientPartnerImg from '@/assets/images/client-partnert-bg.webp'
import { PARTNER } from '@/lib/seeds/partner'

export default function ClientPartner() {
    const tClientPartner = useTranslations(
        'landing.aboutUs.sections.clientAndPartner'
    )
    return (
        <section className="relative w-full overflow-hidden min-h-[780px] pt-24">
            <div className="relative w-full min-h-[1400px] lg:min-h-[780px]">
                <Image
                    src={ClientPartnerImg}
                    alt="Image"
                    fill={true}
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80" />
                <div className="absolute w-full top-0 left-0">
                    <div className="container">
                        <h2 className="mt-16 text-white text-center uppercase font-semibold text-xl">
                            {tClientPartner('title')}
                        </h2>

                        {/* <div className="mt-10 flex items-center justify-center gap-6">
                            <Button
                                className="rounded-full px-8 font-medium uppercase border-white text-white bg-danger"
                                variant="solid"
                            >
                                {tClientPartner('button.client')}
                            </Button>
                            <Button
                                className="rounded-full px-8 font-medium uppercase border-white text-white"
                                variant="ghost"
                                isDisabled
                            >
                                {tClientPartner('button.partner')}
                            </Button>
                        </div> */}
                        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
                            {PARTNER.map((pNer, idx) => {
                                return (
                                    <div
                                        key={idx}
                                        className="w-full aspect-square bg-white grid place-items-center rounded-xl p-2"
                                    >
                                        <Img
                                            src={pNer.imageUrl}
                                            alt="Partner Logo"
                                            preview={false}
                                            className="size-full"
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
