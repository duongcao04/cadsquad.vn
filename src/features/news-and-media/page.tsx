'use client'

import React from 'react'

import { Button } from '@heroui/react'
import { useTranslations } from 'next-intl'

import { Link } from '@/i18n/navigation'
import { POSTS } from '@/shared/database/posts'
import FeaturedPosts from '@/features/news-and-media/_components/featured-posts'
import RecentPosts from '@/features/news-and-media/_components/recent-posts'

export default function NewsAndMediaPage() {
    const tNewMedia = useTranslations('landing.newsMedia')
    const featuredPosts = POSTS
    const recentPosts = POSTS

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
                        <Button variant="ghost" className="font-semibold">
                            {tNewMedia('button.allPosts')}
                        </Button>
                    </Link>
                </div>
                <RecentPosts data={recentPosts} />
            </section>
        </div>
    )
}
