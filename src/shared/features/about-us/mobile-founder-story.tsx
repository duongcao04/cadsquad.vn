'use client'

import React from 'react'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

import FounderStoryImg from '@/assets/images/founder-banner-mobile.webp'

export default function MobileFounderStory() {
    const tFounderStory = useTranslations(
        'landing.aboutUs.sections.founderStory'
    )
    return (
        <section className="pt-20 lg:pt-24">
            <h1 className=" text-center uppercase font-medium text-xl text-danger">
                {tFounderStory('title')}
            </h1>
            <div className="mt-5 w-full">
                <Image
                    src={FounderStoryImg}
                    alt="Founder Banner"
                    width={1920}
                />
            </div>
            <div className="mt-4 container">
                <div className="mt-2 text-sm space-y-3">
                    {tFounderStory.rich('body', {
                        paragraph: (chunk) => <p>{chunk}</p>,
                    })}
                </div>
            </div>
        </section>
    )
}
