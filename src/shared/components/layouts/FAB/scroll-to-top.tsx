import React from 'react'

import { Tooltip } from '@heroui/react'
import { ArrowUpFromLine } from 'lucide-react'

import { MotionButton, MotionDiv } from '@/lib/motion'

type Props = {
    onScroll: () => void
}

export default function ScrollToTop({ onScroll }: Props) {
    return (
        <MotionDiv
            className="fixed bottom-4 md:bottom-10 right-4 md:right-8 z-10"
            initial={{ y: 5 }}
            animate={{ y: 0 }}
        >
            <Tooltip content="Scroll to top" placement="left">
                <MotionButton
                    className="p-2 rounded-full bg-danger text-white cursor-pointer"
                    onClick={onScroll}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <ArrowUpFromLine size={20} />
                </MotionButton>
            </Tooltip>
        </MotionDiv>
    )
}
