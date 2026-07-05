'use client'

import React from 'react'

import { Variants } from 'motion'
import { useLocale, useTranslations } from 'next-intl'

import { Link } from '@/i18n/navigation'
import { SupportLanguages } from '@/i18n/routing'
import { MotionDiv, MotionP } from '@/lib/motion'
import Logo from '@/shared/components/Logo'
import { CONTACT_INFORMATIONS, SOCIALS } from '@/shared/constants/appConstant'
import { FOOTER_LINKS } from '@/shared/constants/footerLinks'
import { resolveNavLabel } from '@/shared/utils/navLabel'

import Decorate from './Decorate'
import SocialButton from './SocialButton'

export default function Footer() {
    const locale = useLocale() as SupportLanguages
    const currentYear = new Date().getFullYear()

    const tLanding = useTranslations('landing')
    const tFooter = useTranslations('landing.layout.footer')

    const groupTitleLineVariants: Variants = {
        init: {
            width: 0,
        },
        animate: {
            width: '40%',
        },
        hover: {
            width: '100%',
        },
    }

    return (
        <div className="max-w-screen xl:mx-20 relative h-full overflow-hidden text-white bg-linear-150 from-secondary-900 via-secondary-900 to-secondary-800 py-10 lg:py-6 px-6 lg:px-14 rounded-t-xl min-h-96">
            <div className="absolute bottom-0 right-0 z-0 object-cover opacity-40">
                <Decorate />
            </div>
            <div className="relative z-10">
                <div className="md:flex items-end justify-between">
                    <div className="xl:flex items-end justify-start gap-5">
                        <Logo
                            logoTheme="white"
                            classNames={{
                                logo: 'max-w-[150px] xl:max-w-[200px]',
                            }}
                        />
                        <div className="hidden xl:block h-20 w-[1px] bg-border opacity-30" />
                        <p className="mt-4 xl:mt-0 text-base xl:text-2xl font-semibold font-saira">
                            {tLanding('home.slogan')}
                        </p>
                    </div>
                    <div className="mt-5 flex items-end md:items-center justify-start xl:justify-end gap-3 xl:gap-5">
                        <p className="hidden md:block">
                            {tLanding('layout.followUsOn')}:
                        </p>
                        <ul className="flex items-center justify-start gap-3 xl:gap-4">
                            {SOCIALS.map((soc, idx) => (
                                <li key={idx}>
                                    <SocialButton data={soc} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="lg:grid grid-cols-4 gap-5 mt-10 lg:mt-8 md:mt-6">
                    <ul className="col-span-1 space-y-6">
                        {CONTACT_INFORMATIONS.map((contact, index) => (
                            <li
                                key={index}
                                className="gap-4 overflow-hidden w-fit flex items-center underline-offset-4"
                            >
                                <contact.icon />
                                <MotionP
                                    initial={{
                                        opacity: 0,
                                    }}
                                    animate={{
                                        opacity: 1,
                                    }}
                                    whileHover={{
                                        opacity: 1,
                                        textDecoration: 'underline',
                                    }}
                                >
                                    <Link
                                        href={contact.path}
                                        target="_blank"
                                        className="overflow-hidden text-base"
                                        title={contact.name}
                                    >
                                        {contact.name}
                                    </Link>
                                </MotionP>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-10 lg:mt-0 col-span-3">
                        <div className="lg:grid grid-cols-3 space-y-10 xl:space-y-0">
                            {FOOTER_LINKS.map((item, index) => {
                                const groupName = tFooter(item.groupNameKey)

                                return (
                                    <MotionDiv
                                        key={index}
                                        initial="init"
                                        animate="animate"
                                        whileHover="hover"
                                        className="pb-2 h-fit"
                                    >
                                        <div className="relative pb-1 w-fit">
                                            <p className="text-lg font-semibold cursor-default">
                                                {groupName}
                                            </p>
                                            <MotionDiv
                                                variants={
                                                    groupTitleLineVariants
                                                }
                                                className="absolute bottom-0 h-[2px] w-[40%] bg-white"
                                            />
                                        </div>
                                        <ul className="mt-5 space-y-3">
                                            {item.children &&
                                                item.children.map(
                                                    (child, index) => {
                                                        const label =
                                                            resolveNavLabel(
                                                                child,
                                                                tFooter,
                                                                locale
                                                            )

                                                        return (
                                                            <Link
                                                                key={index}
                                                                title={label}
                                                                href={
                                                                    child.href
                                                                }
                                                                className="block hover:underline underline-offset-2 text-sm w-fit"
                                                            >
                                                                {label}
                                                            </Link>
                                                        )
                                                    }
                                                )}
                                        </ul>
                                    </MotionDiv>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div
                id="copyright"
                className="border-t border-border text-sm mt-10 xl:mt-5 pt-5"
            >
                <p>
                    Copyright @ {currentYear} by{' '}
                    <Link
                        href={'https://www.cadsquad.vn'}
                        className="hover:underline underline-offset-2"
                    >
                        CADSQUAD
                    </Link>{' '}
                    - All Right Reserved
                </p>
            </div>
        </div>
    )
}
