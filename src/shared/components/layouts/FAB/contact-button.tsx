'use client'

import React, { useEffect, useState } from 'react'

import { X } from 'lucide-react'
import Image from 'next/image'

import FabZalo from '@/shared/components/icons/fab/FabZalo.webp'

import { FabCall } from '../../icons/fab/FabCall'
import { FabMail } from '../../icons/fab/FabMail'
import { FabMessenger } from '../../icons/fab/FabMessenger'

type Props = {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

export default function ContactButton({ isOpen, onOpen, onClose }: Props) {
    const slides: {
        id: number
        title: string
        body: React.ReactNode
    }[] = [
        {
            id: 1,
            title: 'Contact us',
            body: (
                <div className="flex items-center justify-center flex-col">
                    <FabMail width={24} height={24} className="text-white" />
                    <p className="text-white mt-0.5 text-[10px] font-semibold">
                        Contact us
                    </p>
                </div>
            ),
        },
        {
            id: 2,
            title: 'Whatsapp',
            body: (
                <div className="p-3 bg-white rounded-full text-[#ef4444]">
                    <FabCall width={34} height={34} />
                </div>
            ),
        },
        {
            id: 3,
            title: 'Messenger',
            body: (
                <div className="p-3 bg-white rounded-full text-[#ef4444]">
                    <FabMessenger width={34} height={34} />
                </div>
            ),
        },
        {
            id: 4,
            title: 'Zalo',
            body: (
                <div className="p-3 bg-white rounded-full text-[#ef4444]">
                    <Image
                        src={FabZalo}
                        width={32}
                        height={32}
                        className="size-[32px] hue-rotate-170"
                        alt="Zalo"
                    />
                </div>
            ),
        },
    ]

    const [currentSlide, setCurrentSlide] = useState<(typeof slides)[0]>(
        slides[0]
    )

    const toggleHandler = () => {
        if (isOpen) {
            onClose()
        } else {
            onOpen()
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => {
                const currentIndex = slides.findIndex(
                    (slide) => slide.id === prevSlide.id
                )
                const nextIndex = (currentIndex + 1) % slides.length
                return slides[nextIndex]
            })
        }, 800)

        return () => clearInterval(interval)
    }, [])

    if (isOpen) {
        return (
            <button onClick={toggleHandler} className="size-20 cursor-pointer">
                <div className="size-full rounded-full bg-[#ef4444] flex items-center justify-center">
                    <div className="flex items-center justify-center flex-col text-white">
                        <X size={40} />
                    </div>
                </div>
            </button>
        )
    }

    return (
        <div className="relative">
            <style jsx>{`
                /* Ring Pulse Animation */
                @keyframes ringPulse {
                    0% {
                        transform: scale(1);
                        opacity: 0.7;
                    }
                    50% {
                        transform: scale(1.4);
                        opacity: 0.3;
                    }
                    100% {
                        transform: scale(1.8);
                        opacity: 0;
                    }
                }

                /* Ring Elements */
                .ring-pulse-btn::before,
                .ring-pulse-btn::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    border: 2px solid #ef4444;
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 0;
                }

                .ring-pulse-btn::before {
                    animation: ringPulse 2s infinite;
                }

                .ring-pulse-btn::after {
                    animation: ringPulse 2s infinite 1s;
                }

                .ring-pulse-btn {
                    position: relative;
                }

                .ring-pulse-btn > div {
                    position: relative;
                    z-index: 2;
                }
            `}</style>
            <button
                onClick={toggleHandler}
                className="ring-pulse-btn size-20 cursor-pointer relative"
            >
                <div className="size-full rounded-full bg-[#ef4444] flex items-center justify-center relative z-10">
                    {currentSlide.body}
                </div>
            </button>
        </div>
    )
}