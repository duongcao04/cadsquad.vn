import React from 'react'

import Image from 'next/image'

import { Member } from '@/shared/constants/teams'

type Props = {
    data: Member
}

export default function MemberCard({ data }: Props) {
    return (
        <div className="flex flex-col items-center justify-center gap-3 bg-border p-8 rounded-xl">
            <Image
                src={data.avatar}
                alt={`${data.name} avatar`}
                className="aspect-square size-44 object-cover rounded-full"
            />
            {data.name}
        </div>
    )
}
