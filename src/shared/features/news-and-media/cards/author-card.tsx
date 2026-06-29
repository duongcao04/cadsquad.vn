'use client'

import React from 'react'

import dayjs from 'dayjs'
import 'dayjs/locale/vi'

import Logo from '@/shared/components/Logo'

dayjs.locale('vi')
type Props = {
    postCreatedAt: string
}
export default function AuthorCard({ postCreatedAt }: Props) {
    return (
        <div className="flex items-center justify-start gap-3.5">
            <div className="size-12">
                <Logo
                    classNames={{
                        root: '!size-full p-2 bg-white aspect-square grid place-items-center border border-primary-500 rounded-full',
                        logo: 'object-cover',
                    }}
                />
            </div>
            <div>
                <p className="font-medium">Cadsquad</p>
                <p className="text-sm font-medium">
                    {dayjs(postCreatedAt).format('DD MMMM, YYYY').toString()}
                </p>
            </div>
        </div>
    )
}
