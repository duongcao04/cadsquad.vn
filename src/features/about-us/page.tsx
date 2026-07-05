'use client'

import React from 'react'

import AboutUsHeading from '@/features/about-us/_components/about-us-heading'
import AboutUsNavigate from '@/features/about-us/_components/about-us-navigate'
import ClientPartner from '@/features/about-us/_components/client-partner'
import FounderStory from '@/features/about-us/_components/founder-story'
import MobileFounderStory from '@/features/about-us/_components/mobile-founder-story'
import OurJourney from '@/features/about-us/_components/our-journey'
import Overview from '@/features/about-us/_components/overview'

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
