import React from 'react'

import { MotionH2 } from '@/lib/motion'
import { cn } from '@/lib/utils'

export default function HeadingSection({
    children,
    className,
}: {
    children: React.ReactNode
    className?: string
}) {
    return (
        <MotionH2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                    delay: 0.1,
                    type: 'spring',
                    stiffness: 120,
                    damping: 20,
                },
            }}
            viewport={{ once: true }}
            className={cn(
                'text-3xl lg:text-5xl font-bold font-saira',
                className
            )}
        >
            {children}
        </MotionH2>
    )
}
