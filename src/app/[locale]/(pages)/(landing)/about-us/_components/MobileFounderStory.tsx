'use client'

import React from 'react'

import FounderStoryImg from '@/assets/images/founder-banner-mobile.webp'

export default function MobileFounderStory() {
    return (
        <section className="pt-20 lg:pt-24">
            <h1 className=" text-center uppercase font-medium text-xl text-danger">
                Founder Story
            </h1>
            <div className="mt-5 w-full">
                <img
                    src={FounderStoryImg as unknown as string}
                    alt="Founder Banner"
                    width={1920}
                />
            </div>
            <div className="mt-4 container">
                <div className="mt-2 text-sm space-y-3">
                    <p>Mr. Pham Tien Phong is a young mechanical engineer with hands-on experience working for leading corporations in the heavy industry and food processing sectors. Throughout his career, he has been deeply involved in machine design, technical drawings, and real-world manufacturing processes-giving him a strong understanding of the gap between engineering ideas and practical execution.</p>
                    <p>Driven by the desire to bridge that gap, he founded CADSquad - a service-oriented company that delivers mechanical design, CAD data conversion, engineering simulation, and professional CAD training. His goal is to provide high-quality, reliable technical services that empower engineers, manufacturers, and students to master modern design technology and apply it with confidence.</p>
                    <p>At CADSquad, we are committed to being more than just a service provider - we are your technical partner, helping turn ideas into real-world solutions.</p>
                </div>
            </div>
        </section>
    )
}
