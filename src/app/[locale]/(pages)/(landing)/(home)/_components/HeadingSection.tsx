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
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{
                opacity: 1,
                scale: 1,
                transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }, // Custom cubic-bezier cho độ mượt cao
            }}
            viewport={{ once: true, margin: '-50px' }}
            className={cn(
                'text-3xl lg:text-5xl font-bold font-saira tracking-tight',
                className
            )}
        >
            {children}
        </MotionH2>
    )
}
