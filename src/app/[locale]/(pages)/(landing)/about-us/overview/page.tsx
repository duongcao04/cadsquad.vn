import React from 'react'

import ImgFounderBanner from '@/assets/images/founder-banner.webp'

// import InformationTable from '../_components/tables/InformationTable'

export default function OverviewPage() {
    return (
        <div className="pb-32 max-w-screen overflow-hidden">
            <section className="container space-y-9 mt-14">
                <div className="flex flex-col items-center font-saira space-y-2">
                    <h2 className="uppercase font-medium text-xl">Overview</h2>
                    <h1 className="uppercase font-bold text-4xl">
                        About CADSQUAD
                    </h1>
                </div>
                {/* <InformationTable /> */}
            </section>
            <section className="mt-32">
                <p>Câu chuyện người sáng lập</p>
                <img src={ImgFounderBanner as unknown as string} alt="Founder Banner Image" />
            </section>
        </div>
    )
}
