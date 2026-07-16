import React from 'react'

import { getLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'

import {
    getPostDetail,
    getPostsList,
    toPostView,
} from '@/features/news-and-media/_actions'
import AuthorCard from '@/features/news-and-media/_components/cards/author-card'
import Content from '@/features/news-and-media/_components/detail/content'
import RelatedPosts from '@/features/news-and-media/_components/detail/related-posts'
import TableOfContent from '@/features/news-and-media/_components/detail/table-of-content'
import ReturnBtn from '@/features/news-and-media/_components/return-btn'

import { preparePostContent } from '@/lib/post-content'

export default async function PostDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const [locale, post, posts] = await Promise.all([
        getLocale(),
        getPostDetail(slug),
        getPostsList({ limit: 7 }),
    ])

    if (!post) notFound()

    const postView = toPostView(post, locale)
    const content = preparePostContent(postView.content ?? '')
    const relatedPosts = posts
        .filter((item) => item.id !== post.id)
        .slice(0, 6)
        .map((item) => toPostView(item, locale))

    return (
        <div className="px-4 lg:px-10 lg:grid grid-cols-[250px_1fr_400px] gap-5 h-full">
            <div className="hidden lg:block relative h-full">
                <div className="sticky top-24">
                    <TableOfContent source={content} />
                </div>
            </div>
            <div>
                <div className="post_container">
                    <div className="opacity-75">
                        <ReturnBtn />
                    </div>
                    <h2 className="my-5 text-3xl font-semibold text-secondary">
                        {postView.title}
                    </h2>
                    <AuthorCard postCreatedAt={postView.createdAt ?? ''} />
                </div>
                <div className="mt-10 pb-12 lg:pb-20">
                    <Content source={content} />
                </div>
            </div>
            <div className="lg:relative h-full">
                <div className="sticky top-24">
                    <RelatedPosts data={relatedPosts} />
                </div>
            </div>
        </div>
    )
}
