'use client'

import React, { useEffect, useState } from 'react'

import { Tooltip, useOverlayState } from '@heroui/react'

import ContactButton from './ContactButton'
import FABMenu from './FABMenu'
import ScrollToTop from './ScrollToTop'

export default function FAB() {
    const { isOpen, open, close } = useOverlayState()
    const [canScroll, setCanScroll] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', controlShow)
        return () => {
            window.removeEventListener('scroll', controlShow)
        }
    }, [])
    const controlShow = () => {
        if (window.scrollY > 30) {
            setCanScroll(true)
        } else {
            setCanScroll(false)
        }
    }

    return (
        <div className="fixed bottom-10 right-10 z-[99]">
            {canScroll && (
                <ScrollToTop
                    onScroll={() => {
                        window.scrollTo(0, 0)
                        if (isOpen) {
                            close()
                        }
                    }}
                />
            )}

            <div
                className={`${
                    canScroll
                        ? 'bottom-[4.5rem] md:bottom-24'
                        : 'bottom-4 md:bottom-10'
                } fixed right-2 md:right-6 z-10`}
            >
                <Tooltip placement="left">
                    <Tooltip.Trigger>
                        <ContactButton
                            isOpen={isOpen}
                            onOpen={open}
                            onClose={close}
                        />
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                        {!isOpen ? 'Show social menu' : 'Close social menu'}
                    </Tooltip.Content>
                </Tooltip>
            </div>

            <div
                className={`${
                    canScroll
                        ? 'bottom-[8rem] md:bottom-44'
                        : 'bottom-[4.5rem] md:bottom-32'
                } fixed right-2 md:right-6 z-10`}
            >
                <FABMenu isOpen={isOpen} />
            </div>
        </div>
    )
}
