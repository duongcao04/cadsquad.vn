'use client'

import { Button, useOverlayState } from '@heroui/react'

import { CallLoopIcon } from '@/shared/components/icons/CallLoopIcon'

import ContactModal from '../../ContactModal'

export default function CTAButton() {
    const { isOpen, open, close } = useOverlayState()
    const gradientColors = [
        '#f87171',
        '#ef4444',
        '#dc2626',
        '#b91c1c',
        '#dc2626',
    ]

    return (
        <div className="relative">
            <ContactModal isOpen={isOpen} onClose={close} />
            <div
                className="absolute inset-0 rounded-full animate-pulse blur-sm opacity-60"
                style={{
                    background: `linear-gradient(45deg, ${gradientColors.join(', ')})`,
                    backgroundSize: '300% 300%',
                }}
            />
            <Button
                className="relative overflow-hidden font-semibold text-white uppercase transition-all duration-300 border-0 rounded-full px-7 group hover:scale-105"
                style={{
                    background: `linear-gradient(45deg, ${gradientColors.join(', ')})`,
                    backgroundSize: '300% 300%',
                }}
                onPress={open}
            >
                <div className="absolute inset-0 transition-transform duration-700 ease-in-out -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full" />
                <span className="relative z-10">Contact Us</span>
                <CallLoopIcon />
            </Button>
        </div>
    )
}
