'use client'

import { useRef } from 'react'

import { Button } from '@heroui/react'
import { Link } from '@tanstack/react-router'

import Decorate from '@/shared/components/layouts/footer/Decorate'
import { CONTACT_INFORMATIONS } from '@/shared/constants/appConstant'
import { useDevice } from '@/shared/hooks/useDevice'

import ContactForm from './forms/ContactForm'

export default function ContactUs() {
    const { isMobile } = useDevice()
    const ref = useRef(null)

    return (
        <div
            ref={ref}
            className="pt-14 pb-16 relative bg-linear-150 from-secondary-900 via-secondary-900 to-secondary-800 space-y-2 overflow-hidden"
        >
            <div className="absolute bottom-0 right-0 z-0 object-cover opacity-40">
                <Decorate />
            </div>
            <div className="container lg:grid grid-cols-[1fr_1.2fr] gap-3">
                <div>
                    <h2 className="text-4xl lg:text-6xl font-bold text-white font-saira">
                        Get in <span className="text-primary">touch</span>
                    </h2>
                    <p className="mt-2 text-base lg:text-lg opacity-80 text-white">
                        Say something to start a live chat!
                    </p>
                    <div className="mt-8 flex items-center justify-start gap-4 w-full text-white">
                        {CONTACT_INFORMATIONS.map((contact, index) => (
                            <Link
                                to={contact.path}
                                key={index}
                                target="_blank"
                            >
                                <Button
                                    isIconOnly
                                    className="rounded-full"
                                    variant="ghost"
                                    size={isMobile ? 'sm' : 'lg'}
                                >
                                    <contact.icon className="text-white size-5 lg:size-6" />
                                </Button>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="mt-10 lg:mt-10">
                    <ContactForm />
                </div>
            </div>
        </div>
    )
}
