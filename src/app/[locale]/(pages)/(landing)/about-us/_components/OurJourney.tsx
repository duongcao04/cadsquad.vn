import React from 'react'

import MobileOurJourneyCarousel from './carousels/MobileOurJourneyCarousel'
import OurJourneyCarousel from './carousels/OurJourneyCarousel'

export default function OurJourney() {
    return (
        <section className="container space-y-7 lg:space-y-9 pt-20 lg:pt-24">
            <div className="flex flex-col items-center space-y-2">
                <h2 className="uppercase font-medium text-xl text-danger">
                    Our Journey
                </h2>
            </div>
            <div className="hidden lg:block">
                <OurJourneyCarousel />
            </div>
            <div className="block lg:hidden">
                <MobileOurJourneyCarousel />
            </div>
        </section>
    )
}
