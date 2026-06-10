'use client'

import { Button } from '@heroui/react'
import { HomeIcon } from 'lucide-react'

import { Link } from '@/i18n/navigation'

function InProgressIllustration() {
    return (
        <svg
            width="320"
            height="240"
            viewBox="0 0 320 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            {/* Ground */}
            <ellipse cx="160" cy="220" rx="120" ry="10" fill="#f0f0f0" />

            {/* Monitor body */}
            <rect x="80" y="60" width="160" height="110" rx="8" fill="#1e1e2e" />
            <rect x="88" y="68" width="144" height="90" rx="4" fill="#12121a" />

            {/* Code lines on screen */}
            <rect x="96" y="78" width="60" height="6" rx="3" fill="#a855f7" />
            <rect x="96" y="90" width="100" height="6" rx="3" fill="#6366f1" opacity="0.7" />
            <rect x="104" y="102" width="80" height="6" rx="3" fill="#6366f1" opacity="0.5" />
            <rect x="104" y="114" width="50" height="6" rx="3" fill="#a855f7" opacity="0.6" />
            <rect x="96" y="126" width="90" height="6" rx="3" fill="#6366f1" opacity="0.4" />
            <rect x="104" y="138" width="40" height="6" rx="3" fill="#a855f7" opacity="0.5" />

            {/* Blinking cursor */}
            <rect x="148" y="138" width="3" height="10" rx="1" fill="white" opacity="0.9">
                <animate attributeName="opacity" values="0.9;0;0.9" dur="1s" repeatCount="indefinite" />
            </rect>

            {/* Monitor stand */}
            <rect x="148" y="170" width="24" height="18" rx="2" fill="#2a2a3e" />
            <rect x="130" y="186" width="60" height="8" rx="4" fill="#2a2a3e" />

            {/* Gear left */}
            <g transform="translate(50, 130)">
                <circle cx="0" cy="0" r="22" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2">
                    <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="6s" repeatCount="indefinite" />
                </circle>
                <circle cx="0" cy="0" r="8" fill="white" stroke="#cbd5e1" strokeWidth="2">
                    <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="6s" repeatCount="indefinite" />
                </circle>
                <rect x="-4" y="-26" width="8" height="10" rx="2" fill="#e2e8f0">
                    <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="6s" repeatCount="indefinite" />
                </rect>
                <rect x="-4" y="16" width="8" height="10" rx="2" fill="#e2e8f0">
                    <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="6s" repeatCount="indefinite" />
                </rect>
                <rect x="16" y="-4" width="10" height="8" rx="2" fill="#e2e8f0">
                    <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="6s" repeatCount="indefinite" />
                </rect>
                <rect x="-26" y="-4" width="10" height="8" rx="2" fill="#e2e8f0">
                    <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="6s" repeatCount="indefinite" />
                </rect>
            </g>

            {/* Gear right (counter-rotate) */}
            <g transform="translate(270, 140)">
                <circle cx="0" cy="0" r="16" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2">
                    <animateTransform attributeName="transform" type="rotate" from="360" to="0" dur="4s" repeatCount="indefinite" />
                </circle>
                <circle cx="0" cy="0" r="6" fill="white" stroke="#cbd5e1" strokeWidth="2">
                    <animateTransform attributeName="transform" type="rotate" from="360" to="0" dur="4s" repeatCount="indefinite" />
                </circle>
                <rect x="-3" y="-19" width="6" height="7" rx="1.5" fill="#e2e8f0">
                    <animateTransform attributeName="transform" type="rotate" from="360" to="0" dur="4s" repeatCount="indefinite" />
                </rect>
                <rect x="-3" y="12" width="6" height="7" rx="1.5" fill="#e2e8f0">
                    <animateTransform attributeName="transform" type="rotate" from="360" to="0" dur="4s" repeatCount="indefinite" />
                </rect>
                <rect x="12" y="-3" width="7" height="6" rx="1.5" fill="#e2e8f0">
                    <animateTransform attributeName="transform" type="rotate" from="360" to="0" dur="4s" repeatCount="indefinite" />
                </rect>
                <rect x="-19" y="-3" width="7" height="6" rx="1.5" fill="#e2e8f0">
                    <animateTransform attributeName="transform" type="rotate" from="360" to="0" dur="4s" repeatCount="indefinite" />
                </rect>
            </g>

            {/* Progress bar */}
            <rect x="90" y="200" width="140" height="10" rx="5" fill="#e2e8f0" />
            <rect x="90" y="200" width="90" height="10" rx="5" fill="#a855f7">
                <animate attributeName="width" values="20;110;20" dur="3s" repeatCount="indefinite" />
            </rect>
        </svg>
    )
}

export default function AcademyPage() {
    return (
        <div className="container min-h-[calc(100vh-200px)] grid place-items-center text-center py-32">
            <div className="flex flex-col items-center">
                <InProgressIllustration />
                <h1 className="mt-8 text-4xl font-saira font-bold tracking-wide">
                    We&apos;re working on it!
                </h1>
                <p className="mt-4 text-lg font-saira text-gray-500 max-w-md">
                    Our Academy is currently being updated. Check back soon for
                    exciting courses and learning resources.
                </p>
                <Link href={'/'} className="block w-fit">
                    <Button
                        color="secondary"
                        startContent={<HomeIcon size={20} />}
                        className="mt-8"
                    >
                        Back to Home
                    </Button>
                </Link>
            </div>
        </div>
    )
}
