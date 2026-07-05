'use client'

import React, { useEffect, useRef, useState } from 'react'

import { Button } from '@heroui/react'
import { Fade as Hamburger } from 'hamburger-react'
import { Variants } from 'motion'

import { MotionDiv } from '@/lib/motion'

import Logo from '../../Logo'
import MobileNav from './MobileNav'

export default function MobileHeader() {
    const wrapperRef = useRef<HTMLDivElement | null>(null)
    const imageRef = useRef<HTMLDivElement | null>(null)
    const [isOpen, setOpen] = useState(false)

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

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 40) {
                if (wrapperRef.current && imageRef.current) {
                    wrapperRef.current.style.transition = 'all 0.05s'
                    imageRef.current.style.transition = 'all 0.05s'
                    wrapperRef.current.style.paddingBlock = '8px'
                    wrapperRef.current.style.background = 'white'
                    wrapperRef.current.style.boxShadow =
                        'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px'
                    imageRef.current.style.height = '40px'
                }
            } else {
                if (wrapperRef.current && imageRef.current) {
                    wrapperRef.current.style.transition = 'all 0.05s'
                    imageRef.current.style.transition = 'all 0.05s'
                    wrapperRef.current.style.paddingBlock = '16px'
                    wrapperRef.current.style.background = 'transparent'
                    wrapperRef.current.style.boxShadow = 'none'
                    imageRef.current.style.height = '80px'
                }
            }
        }

        window.addEventListener('scroll', handleScroll)
        // Call once to set initial state
        handleScroll()

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <MotionDiv
            ref={wrapperRef}
            variants={wrapperVariants}
            initial="init"
            animate="extend"
        >
            <MobileNav isOpen={isOpen} onClose={() => setOpen(false)} />
            <div className="container grid grid-cols-[minmax(100px,_120px)_1fr_50px] items-center">
                <div ref={imageRef} className="flex items-center justify-start">
                    <Logo
                        classNames={{
                            root: 'h-full flex items-center',
                            logo: 'max-h-full',
                        }}
                    />
                </div>
                <div />
                <Button
                    startContent={
                        <Hamburger
                            toggled={isOpen}
                            onToggle={setOpen}
                            direction="left"
                            size={24}
                            rounded
                        />
                    }
                    onPress={() => {
                        setOpen(!isOpen)
                    }}
                    variant="light"
                    color="secondary"
                    isIconOnly
                    className="w-full"
                />
            </div>
        </MotionDiv>
    )
}
