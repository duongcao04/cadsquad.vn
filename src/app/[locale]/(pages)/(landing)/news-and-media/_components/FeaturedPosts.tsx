import React from 'react'

import { Post } from '@/validationSchemas/post.schema'

import PostCard from './cards/PostCard'

type Props = {
    data: Post[]
}
export default function FeaturedPosts({ data }: Props) {
    const firstFeaturedPost = data?.[0]
    const otherPosts = data?.slice(1, 6)

    return (
        <div className="lg:grid grid-cols-3 gap-7">
            <div className="col-span-2 w-full aspect-[4/2.4]">
                <PostCard variant="lg" data={firstFeaturedPost} />
            </div>
            <div className="mt-6 lg:mt-0 col-span-1 space-y-2">
                <h2 className="mt-1 text-2xl font-semibold">
                    Other featured posts
                </h2>
                <div className="grid grid-rows-5 gap-2">
                    {otherPosts.map((post, idx) => {
                        return <PostCard key={post.id ?? idx} data={post} />
                    })}
                </div>
            </div>
        </div>
    )
}
