'use client'

import React from 'react'

import AboutUsHeading from '@/shared/features/about-us/about-us-heading'
import AboutUsNavigate from '@/shared/features/about-us/about-us-navigate'
import ClientPartner from '@/shared/features/about-us/client-partner'
import FounderStory from '@/shared/features/about-us/founder-story'
import MobileFounderStory from '@/shared/features/about-us/mobile-founder-story'
import OurJourney from '@/shared/features/about-us/our-journey'
import Overview from '@/shared/features/about-us/overview'

export default function AboutUsPage() {
    return (
        <div className="relative pb-20 max-w-screen">
            <AboutUsHeading />
            <div className="hidden lg:block sticky top-[66px] z-10">
                <AboutUsNavigate />
            </div>
            <section id="overview">
                <Overview />
            </section>
            <section id="overview">
                <div className="hidden lg:block">
                    <FounderStory />
                </div>
                <div className="block lg:hidden">
                    <MobileFounderStory />
                </div>
            </section>
            <section id="our-journey" className="max-w-screen overflow-hidden">
                <OurJourney />
            </section>
            <section id="client-partner">
                <ClientPartner />
            </section>
        </div>
    )
}
