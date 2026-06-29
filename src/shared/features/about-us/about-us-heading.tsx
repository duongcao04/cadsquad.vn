import React from 'react'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

import ButtonDownloadBrochure from '@/components/ButtonDownloadBrochure'

import AboutUsImage from '@/assets/images/about-us-banner.webp'
import { MotionH1 } from '@/lib/motion'

export default function AboutUsHeading() {
    const tAboutUs = useTranslations('landing.aboutUs')

    return (
        <section className="relative w-full overflow-hidden h-[450px] lg:h-[520px]">
            <div className="relative w-full h-[450px] lg:h-[520px]">
                <Image
                    src={AboutUsImage}
                    alt="Image"
                    fill={true}
                    className="object-cover"
                />
                <div className="hidden lg:block absolute inset-0 bg-gradient-to-b from-black/50 to-black/80" />
                <div className="block lg:hidden absolute inset-0 bg-gradient-to-b from-black/70 to-black/90" />
                <div className="absolute top-0 left-0 size-full">
                    <div className="container size-full flex flex-col items-start justify-center leading-tight lg:text-6xl font-saira text-white font-semibold">
                        <MotionH1 className="uppercase text-3xl lg:text-[60px]">
                            {tAboutUs('heading.title')}
                        </MotionH1>
                        <p className="mt-0 lg:mt-1 text-lg lg:text-4xl text-danger font-medium tracking-wide">
                            {tAboutUs('heading.slogan')}
                        </p>
                        <div className="mt-2 lg:mt-5 text-sm lg:text-lg font-medium tracking-wide lg:max-w-[80%] leading-relaxed">
                            {tAboutUs.rich('heading.description', {
                                paragraph: (chunk) => <p>{chunk}</p>,
                            })}
                        </div>
                        <ButtonDownloadBrochure />
                    </div>
                </div>
            </div>
        </section>
    )
}
