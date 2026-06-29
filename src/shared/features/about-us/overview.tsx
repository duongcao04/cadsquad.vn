import React from 'react'

import { useTranslations } from 'next-intl'

import InformationTable from './tables/information-table'

export default function Overview() {
    const tOverview = useTranslations('landing.aboutUs.sections.overview')
    return (
        <section className="container space-y-7 lg:space-y-9 pt-16 lg:pt-24">
            <div className="flex flex-col items-center space-y-2">
                <h2 className="uppercase font-medium text-xl text-danger">
                    {tOverview('title')}
                </h2>
                <h1 className="uppercase font-bold text-4xl font-saira ">
                    {tOverview('aboutCadsquad')}
                </h1>
            </div>
            <InformationTable />
        </section>
    )
}
