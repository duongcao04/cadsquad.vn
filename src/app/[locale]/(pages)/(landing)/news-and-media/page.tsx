'use client'

import React from 'react'

import { Button } from '@heroui/react'
import { Link } from '@tanstack/react-router'

import { POSTS } from '@/shared/database/posts'

import FeaturedPosts from './_components/FeaturedPosts'
import RecentPosts from './_components/RecentPosts'

export default function NewsAndMediaPage() {
    const featuredPosts = POSTS
    const recentPosts = POSTS

    return (
        <div className="container pb-20">
            <section className="mt-6">
                <FeaturedPosts data={featuredPosts} />
            </section>
            <section className="mt-14 space-y-8">
                <div className="flex items-center justify-between gap-5">
                    <h2 className="text-3xl font-semibold">Recent Posts</h2>
                    <Link to="/news-and-media/all-posts">
                        <Button variant="ghost" className="font-semibold">
                            All Posts
                        </Button>
                    </Link>
                </div>
                <RecentPosts data={recentPosts} />
            </section>
        </div>
    )
}
