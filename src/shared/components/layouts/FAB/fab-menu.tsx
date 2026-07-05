import React from 'react'

import { Variants } from 'motion/react'
import Image from 'next/image'

import { Link } from '@/i18n/navigation'
import { MotionDiv } from '@/lib/motion'
import { FLOAT_CONTACTS } from '@/shared/constants/appConstant'

type Props = {
    isOpen: boolean
}
export default function FABMenu({ isOpen }: Props) {
    const wrapperVariants: Variants = {
        show: {
            opacity: 1,
            x: 0,
            transition: {
                delayChildren: 1,
            },
        },
        hidden: {
            opacity: 0,
            x: 100,
        },
    }

    return (
        <MotionDiv
            initial="hidden"
            animate={isOpen ? 'show' : 'hidden'}
            variants={wrapperVariants}
        >
            {FLOAT_CONTACTS.map((contact, index) => (
                <MotionDiv
                    key={index}
                    className="group p-2 md:pr-4 lg:pl-3 lg:pr-6 lg:py-2 mb-3 bg-white dark:bg-black-900 rounded-xl shadow-lg dark:shadow-black-full dark:border dark:border-solid dark:border-gray-900 select-none"
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ x: -10 }}
                    initial={{ x: 0 }}
                >
                    <Link
                        href={contact.href}
                        target="_blank"
                        className="flex items-center"
                    >
                        <Image
                            src={contact.icon}
                            alt={contact.title}
                            width="40"
                            height="40"
                            className="mr-3"
                            quality={100}
                        />
                        <p className="dark:text-white">
                            <span className="group-hover:text-primary font-semibold">
                                {contact.title}
                            </span>
                            <br />
                            <span className="font-semibold text-sm opacity-60">
                                {contact.description}
                            </span>
                        </p>
                    </Link>
                </MotionDiv>
            ))}
        </MotionDiv>
    )
}
