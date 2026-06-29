import React from 'react'

import { POSTS } from '@/shared/database/posts'
import ReturnBtn from '@/shared/features/news-and-media/return-btn'
import AuthorCard from '@/shared/features/news-and-media/cards/author-card'
import Content from '@/shared/features/news-and-media/detail/content'
import RelatedPosts from '@/shared/features/news-and-media/detail/related-posts'
import TableOfContent from '@/shared/features/news-and-media/detail/table-of-content'

export default async function PostDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params

    const post = POSTS.find((item) => item.slug === slug)

    return (
        <div className="px-4 lg:px-10 lg:grid grid-cols-[250px_1fr_400px] gap-5 h-full">
            <div className="hidden lg:block relative h-full">
                <div className="sticky top-24">
                    <TableOfContent source={post!.content!} />
                </div>
            </div>
            <div>
                <div className="post_container">
                    <div className="opacity-75">
                        <ReturnBtn />
                    </div>
                    <h2 className="my-5 text-3xl font-semibold text-secondary">
                        {post?.title}
                    </h2>
                    <AuthorCard postCreatedAt={post?.createdAt as string} />
                </div>
                <div className="mt-10 pb-12 lg:pb-20">
                    <Content source={post!.content!} />
                </div>
            </div>
            <div className="lg:relative h-full">
                <div className="sticky top-24">
                    <RelatedPosts data={POSTS} />
                </div>
            </div>
        </div>
    )
}
