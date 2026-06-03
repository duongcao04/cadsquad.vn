import React from 'react'

import InformationTable from './tables/InformationTable'

export default function Overview() {
    return (
        <section className="container space-y-7 lg:space-y-9 pt-16 lg:pt-24">
            <div className="flex flex-col items-center space-y-2">
                <h2 className="uppercase font-medium text-xl text-danger">
                    Overview
                </h2>
                <h1 className="uppercase font-bold text-4xl font-saira ">
                    CADSQUAD VIETNAM
                </h1>
            </div>
            <InformationTable />
        </section>
    )
}
