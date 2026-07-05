'use client'

import React from 'react'

import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'

import FounderStoryImg from '@/assets/images/founder-banner.webp'

export default function FounderStory() {
    const locale = useLocale()
    const tFounderStory = useTranslations(
        'landing.aboutUs.sections.founderStory'
    )
    return (
        <div>
            <style jsx>{`
                /* width */
                .scrollbar {
                    direction: rtl;
                }
                .scrollbar::-webkit-scrollbar {
                    width: 2px;
                }

                /* Track */
                .scrollbar::-webkit-scrollbar-track {
                    background: #f1f1f1;
                }

                /* Handle */
                .scrollbar::-webkit-scrollbar-thumb {
                    background: #e74e07;
                }

                /* Handle on hover */
                .scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #ff7c05;
                }
            `}</style>
            <section className="relative space-y-9 mt-24">
                <div>
                    <Image
                        src={FounderStoryImg}
                        alt="Founder Banner"
                        width={1920}
                    />
                </div>
                {/* <div className="absolute top-[220px] left-[126px] text-white">
                    <h1 className="font-saira text-2xl font-semibold uppercase">
                        Câu chuyện người sáng lập
                    </h1>
                    <p className="leading-inherit pr-7 text-justify mt-3 max-w-[605px] max-h-[10lh] overflow-y-scroll">
                        Mr. Pham Tien Phong is a young mechanical engineer with
                        hands-on experience working for leading corporations in
                        the heavy industry and food processing sectors.
                        <br />
                        <br />
                        Throughout his career, he has been deeply involved in
                        machine design, technical drawings, and real-world
                        manufacturing processes — giving him a strong
                        understanding of the gap between engineering ideas and
                        practical execution.
                        <br />
                        Driven by the desire to bridge that gap, he founded
                        CADSquad — a service-oriented company that delivers
                        mechanical design, CAD data conversion, engineering
                        simulation, and professional CAD training.
                        <br />
                        His goal is to provide high-quality, reliable technical
                        services that empower engineers, manufacturers, and
                        students to master modern design technology and apply it
                        with confidence.
                        <br />
                        At CADSquad, we are committed to being more than just a
                        service provider — we are your technical partner,
                        helping turn ideas into real-world solutions.
                    </p>
                </div> */}
                <div className="absolute top-0 right-0 w-[780px] h-full max bg-gradient-to-l from-[#111111] via-[#111111] to-transparent"></div>
                <div className="absolute top-[90px] right-[126px] text-white">
                    <h1 className="font-saira text-2xl font-semibold uppercase">
                        {tFounderStory('title')}
                    </h1>
                    <div
                        className="scrollbar pl-6 mt-5 max-w-[600px] max-h-[14lh] overflow-y-scroll"
                        style={{
                            textAlign: locale === 'en' ? 'left' : 'justify',
                        }}
                    >
                        <div
                            style={{ direction: 'ltr' }}
                            className="space-y-4 leading-relaxed"
                        >
                            {tFounderStory.rich('body', {
                                paragraph: (chunk) => <p>{chunk}</p>,
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
