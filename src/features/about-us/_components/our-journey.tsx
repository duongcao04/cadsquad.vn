import React from 'react'

import { useTranslations } from 'next-intl'

import MobileOurJourneyCarousel from './carousels/mobile-our-journey-carousel'
import OurJourneyCarousel from './carousels/our-journey-carousel'

export default function OurJourney() {
    const tOurJourney = useTranslations('landing.aboutUs.sections.ourJourney')
    return (
        <section className="container space-y-7 lg:space-y-9 pt-20 lg:pt-24">
            <div className="flex flex-col items-center space-y-2">
                <h2 className="uppercase font-medium text-xl text-danger">
                    {tOurJourney('title')}
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
