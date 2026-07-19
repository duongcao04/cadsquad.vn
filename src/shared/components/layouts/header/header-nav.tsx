'use client'

import React, { useEffect, useState } from 'react'

import { useWindowScroll } from '@uidotdev/usehooks'
import { Variants } from 'motion'

import { MotionDiv, MotionHeader } from '@/lib/motion'
import Logo from '@/shared/components/logo'

import Actions from './action-buttons'
import Navbar from './navbar-menu'

const BREAKPOINT = 20

export default function Header() {
    const [{ y }] = useWindowScroll()
    const [isExtend, setExtend] = useState(true)

    useEffect(() => {
        if (y && y > BREAKPOINT) {
            setExtend(false)
        } else {
            setExtend(true)
        }
    }, [y])

    const wrapperVariants: Variants = {
        init: { opacity: 0 },
        collapse: {
            opacity: 1,
            boxShadow:
                'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px',
            transition: {
                duration: 0.05,
            },
            background: 'var(--background)',
        },
        extend: {
            opacity: 1,
            boxShadow: 'none',
            transition: {
                duration: 0.05,
            },
            // background: 'var(--background)',
        },
    }

    const logoVariants: Variants = {
        init: { opacity: 0, y: 10, height: '64px' },
        collapse: {
            opacity: 1,
            y: 0,
            height: '40px',
            transition: {
                delay: 0,
                type: 'spring',
                stiffness: 120,
                damping: 20,
            },
        },
        extend: {
            opacity: 1,
            y: 0,
            height: '64px',
            transition: {
                delay: 0,
                type: 'spring',
                stiffness: 120,
                damping: 20,
            },
        },
    }

    return (
        <MotionHeader
            variants={wrapperVariants}
            initial="init"
            animate={isExtend ? 'extend' : 'collapse'}
            className="backdrop-blur-sm"
        >
            <div className="container relative py-3 xl:grid grid-cols-[190px_1fr] gap-5">
                <MotionDiv
                    variants={logoVariants}
                    initial="init"
                    animate={isExtend ? 'extend' : 'collapse'}
                >
                    <Logo
                        classNames={{
                            root: 'h-full',
                            logo: 'max-h-full',
                        }}
                    />
                </MotionDiv>
                <div className="flex items-center justify-end gap-3">
                    <Navbar />
                    <div className="mr-7 w-[2px] h-[30px] bg-border" />
                    <Actions />
                </div>
            </div>
        </MotionHeader>
    )
}
