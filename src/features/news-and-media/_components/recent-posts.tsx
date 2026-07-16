import React from 'react'

import { Post } from '@/validationSchemas/post.schema'

import PostCard from './cards/post-card'

type Props = {
    data: Post[]
    limit?: number
}

export default function RecentPosts({ data, limit = 6 }: Props) {
    const recentPosts = data.slice(0, limit)

    return (
        <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-7 space-y-7 md:space-y-0">
            {recentPosts.map((post, idx) => {
                return (
                    <PostCard key={post.id ?? idx} variant="md" data={post} />
                )
            })}
        </div>
    )
}
