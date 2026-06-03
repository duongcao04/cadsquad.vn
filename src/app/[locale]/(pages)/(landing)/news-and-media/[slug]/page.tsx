import React from 'react'

import { POSTS } from '@/shared/database/posts'

import ReturnBtn from '../_components/ReturnBtn'
import AuthorCard from '../_components/cards/AuthorCard'
import Content from './_components/Content'
import RelatedPosts from './_components/RelatedPosts'
import TableOfContent from './_components/TableOfContent'

export default function PostDetailPage({ slug }: { slug: string }) {
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
