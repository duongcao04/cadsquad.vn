import React from 'react'

import { getLocale, getTranslations } from 'next-intl/server'

import { getPostsList, toPostView } from '@/features/news-and-media/_actions'
import FeaturedPosts from '@/features/news-and-media/_components/featured-posts'
import RecentPosts from '@/features/news-and-media/_components/recent-posts'

import { Link } from '@/i18n/navigation'

export default async function NewsAndMediaPage() {
    const [locale, tNewMedia, posts] = await Promise.all([
        getLocale(),
        getTranslations('landing.newsMedia'),
        getPostsList(),
    ])
    const postViews = posts.map((post) => toPostView(post, locale))
    const featuredPosts = postViews.slice(0, 6)
    const recentPosts = postViews.slice(0, 6)

    return (
        <div className="container pb-20">
            <section className="mt-6">
                <FeaturedPosts data={featuredPosts} />
            </section>
            <section className="mt-14 space-y-8">
                <div className="flex items-center justify-between gap-5">
                    <h2 className="text-3xl font-semibold">
                        {tNewMedia('recentPosts')}
                    </h2>
                    <Link href="/news-and-media/all-posts">
                        <span className="inline-flex min-h-10 items-center rounded-xl px-4 font-semibold transition hover:bg-default-100">
                            {tNewMedia('button.allPosts')}
                        </span>
                    </Link>
                </div>
                <RecentPosts data={recentPosts} />
            </section>
        </div>
    )
}
