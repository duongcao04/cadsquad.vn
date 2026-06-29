'use client'

import { useRef } from 'react'

import { Button } from '@heroui/react'
import { useTranslations } from 'next-intl'

import { Link } from '@/i18n/navigation'
import Decorate from '@/shared/components/layouts/footer/Decorate'
import { CONTACT_INFORMATIONS } from '@/shared/constants/appConstant'
import { Section } from '@/shared/features/home/section'
import { useDevice } from '@/shared/hooks/useDevice'

import ContactForm from './forms/contact-form'

export default function ContactUs() {
    const { isMobile } = useDevice()
    const tHome = useTranslations('landing.home')
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
                    <Section.Title className="text-4xl lg:text-6xl text-white">
                        {tHome.rich('sections.contactUs.title', {
                            highlight: (chunk) => (
                                <span className="text-primary">{chunk}</span>
                            ),
                        })}
                    </Section.Title>
                    <Section.Description className="mt-2 max-w-none text-white opacity-80">
                        {tHome(
                            'sections.contactUs.contactInformation.description'
                        )}
                    </Section.Description>
                    <Section.CTA className="mt-8 w-full justify-start text-white">
                        {CONTACT_INFORMATIONS.map((contact, index) => (
                            <Link
                                href={contact.path}
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
                    </Section.CTA>
                </div>
                <div className="mt-10 lg:mt-10">
                    <ContactForm />
                </div>
            </div>
        </div>
    )
}
