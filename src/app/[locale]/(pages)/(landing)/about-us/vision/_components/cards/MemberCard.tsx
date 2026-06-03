import React from 'react'

import { Member } from '@/shared/constants/teams'

type Props = {
    data: Member
}

export default function MemberCard({ data }: Props) {
    return (
        <div className="flex flex-col items-center justify-center gap-3 bg-border p-8 rounded-xl">
            <img
                src={data.avatar as unknown as string}
                alt={`${data.name} avatar`}
                className="aspect-square size-44 object-cover rounded-full"
            />
            {data.name}
        </div>
    )
}
