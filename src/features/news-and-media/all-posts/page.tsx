import React from 'react'

import { getLocale, getTranslations } from 'next-intl/server'

import { getPostsList, toPostView } from '@/features/news-and-media/_actions'
import RecentPosts from '@/features/news-and-media/_components/recent-posts'

export default async function AllPostsPage() {
    const [locale, tNewMedia, posts] = await Promise.all([
        getLocale(),
        getTranslations('landing.newsMedia'),
        getPostsList(),
    ])

    return (
        <div className="container pb-20 pt-8">
            <h1 className="mb-8 text-3xl font-semibold">
                {tNewMedia('button.allPosts')}
            </h1>
            <RecentPosts
                data={posts.map((post) => toPostView(post, locale))}
                limit={posts.length}
            />
        </div>
    )
}
