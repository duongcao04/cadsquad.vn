import { Breadcrumbs } from '@heroui/react'
import { Link } from '@tanstack/react-router'

import ButtonDownloadBrochure from '@/components/ButtonDownloadBrochure'

import AboutUsImage from '@/assets/images/about-us-banner.webp'
import { MotionH1 } from '@/lib/motion'
import { INTERNAL_URLS } from '@/lib/utils'

export default function AboutUsHeading() {
    return (
        <section className="relative w-full h-[450px] lg:h-[520px] overflow-hidden">
            {/* Background Image */}
            <img
                src={AboutUsImage as unknown as string}
                alt="About Us Banner"
                className="object-cover object-center"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/90 lg:from-black/50 lg:to-black/80" />

            {/* Content Container */}
            <div className="absolute inset-0">
                <div className="container mx-auto px-4 md:px-6 h-full flex flex-col items-start justify-center text-white font-saira font-semibold">
                    <PageBreadcrumbs />

                    <MotionH1 className="mt-4 md:mt-6 text-3xl md:text-5xl lg:text-[60px] uppercase leading-tight">
                        About Us
                    </MotionH1>

                    <p className="mt-2 md:mt-3 text-lg md:text-2xl lg:text-4xl text-danger font-medium tracking-wide">
                        CADSQUAD VIETNAM
                    </p>

                    <div className="mt-4 lg:mt-6 text-sm md:text-base lg:text-lg font-medium tracking-wide text-gray-200 lg:max-w-[75%] leading-relaxed">
                        <p className="mb-2 last:mb-0">CADSQUAD Vietnam is a global provider of tailored mechanical design solutions, specializing in high-quality CAD and engineering services. We transform innovative ideas into tangible, sustainable products, delivering exceptional value to industries worldwide.</p>
                        <p className="mb-2 last:mb-0">CADSQUAD Vietnam is ready to deliver world class engineering solutions that exceed your expectations.</p>
                    </div>

                    <div className="mt-8">
                        <ButtonDownloadBrochure />
                    </div>
                </div>
            </div>
        </section>
    )
}

function PageBreadcrumbs() {
    return (
        <Breadcrumbs className="[&_a]:text-white/70 [&_[aria-current=page]]:text-white [&_a:hover]:text-white">
            <Breadcrumbs.Item href={INTERNAL_URLS.home}>Home</Breadcrumbs.Item>
            <Breadcrumbs.Item>About us</Breadcrumbs.Item>
        </Breadcrumbs>
    )
}
