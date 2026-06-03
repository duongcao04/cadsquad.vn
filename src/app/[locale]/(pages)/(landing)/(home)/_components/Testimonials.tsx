'use client'

import React from 'react'

import { AnimatedTestimonials } from '@/shared/components/ui/animated-testimonials'
import { TESTIMONIALS } from '@/shared/database/testimonials'

export default function Testimonials() {
    const testimonials = TESTIMONIALS

    return (
        <div className="container">
            <h2 className="text-3xl lg:text-5xl font-bold text-center font-saira">
                What our <span className="text-primary">clients</span> say
            </h2>
            <div>
                <AnimatedTestimonials testimonials={testimonials} autoplay />
            </div>
        </div>
    )
}
