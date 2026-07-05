'use client'

import React from 'react'

import { Image } from 'antd'

import { PARTNER } from '@/lib/seeds/partner'
import { InfiniteMovingCards } from '@/shared/components/ui/infinite-moving-cards'

export default function Partner() {
    return (
        <div className="max-w-screen">
            <InfiniteMovingCards
                items={PARTNER}
                direction="right"
                speed="slow"
                pauseOnHover={false}
                className={{
                    root: 'max-h-28',
                    item: '!p-0 flex items-center justify-center max-w-[250px] border-none',
                }}
            >
                {(item) => (
                    <div className="max-w-[300px] max-h-[90px]">
                        <Image
                            src={item.imageUrl}
                            alt="Thumbnail"
                            className="max-w-[200px] max-h-[70px] lg:max-w-[300px] lg:max-h-[90px] object-scale-down"
                            preview={false}
                        />
                    </div>
                )}
            </InfiniteMovingCards>
        </div>
    )
}
