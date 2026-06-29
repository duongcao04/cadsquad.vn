import React from 'react'

import { Image } from 'antd'

import { IconQuotes } from '@/shared/components/icons/IconQuotes'
import { Testimonial } from '@/shared/database/testimonials'

export default function CustomerReviewCard({ data }: { data: Testimonial }) {
    return (
        <div className="w-[350px] lg:w-[530px] select-none rounded-2xl shadow-sm">
            <div className="bg-[#f1f5f9] rounded-2xl p-5">
                <div className="relative">
                    <div className="opacity-30 text-secondary">
                        <IconQuotes />
                    </div>
                    <span className="pl-5 leading-relaxed tracking-wide line-clamp-10 h-[280px] lg:line-clamp-5 opacity-85 lg:h-[160px] overflow-hidden text-base">
                        {data.quote}
                    </span>
                </div>
                <div className="mt-5 ml-3 flex items-center justify-start gap-3">
                    <div className="size-12 rounded-full aspect-square flex items-center justify-center">
                        <Image
                            preview={false}
                            src={data.src}
                            alt="Client"
                            className="size-full rounded-full aspect-square"
                        />
                    </div>
                    <div>
                        <p className="text-lg font-bold">{data.name}</p>
                        <div className="flex items-center justify-start gap-1">
                            <data.designation className="h-4 rounded-sm" />
                            <p className="opacity-85 font-semibold">
                                {data.destinationName}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
