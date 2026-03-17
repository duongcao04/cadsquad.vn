'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import {
    CheckCircle2,
    Circle,
    Eye,
    FileText,
    MoreHorizontal,
    TrendingUp,
} from 'lucide-react'
import Link from 'next/link'

import { postsListOptions } from '@/queires'

export default function AdminDashboard() {
    // 1. Fetch data directly from Prisma
    const totalPosts = 0

    const {
        data: { posts },
    } = useSuspenseQuery(postsListOptions)

    const totalViews = 0

    return (
        <div className="space-y-6">
            {/* Getting Started Section */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4">
                    Getting Started
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex gap-3">
                        <CheckCircle2
                            className="text-blue-500 shrink-0 mt-0.5"
                            size={20}
                        />
                        <div>
                            <h3 className="font-medium text-slate-900">
                                Customize your profile
                            </h3>
                            <p className="text-sm text-slate-500 mt-1">
                                Set up your author details and preferences to
                                personalize your CMS.
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <CheckCircle2
                            className="text-blue-500 shrink-0 mt-0.5"
                            size={20}
                        />
                        <div>
                            <h3 className="font-medium text-slate-900">
                                Create your first post
                            </h3>
                            <p className="text-sm text-slate-500 mt-1">
                                Draft, format, and publish your very first piece
                                of content.
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Circle
                            className="text-slate-300 shrink-0 mt-0.5"
                            size={20}
                        />
                        <div>
                            <h3 className="font-medium text-slate-900">
                                Set up categories
                            </h3>
                            <p className="text-sm text-slate-500 mt-1">
                                Organize your content by adding standard tags
                                and keywords.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-3 text-slate-500 mb-2">
                        <FileText size={18} />
                        <h3 className="text-sm font-medium">Total Posts</h3>
                    </div>
                    <div className="flex items-end gap-3">
                        <span className="text-3xl font-bold text-slate-900">
                            {totalPosts}
                        </span>
                        <span className="text-sm font-medium text-green-500 mb-1">
                            +2 vs Last Month
                        </span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-3 text-slate-500 mb-2">
                        <Eye size={18} />
                        <h3 className="text-sm font-medium">Total Views</h3>
                    </div>
                    <div className="flex items-end gap-3">
                        <span className="text-3xl font-bold text-slate-900">
                            {totalViews.toLocaleString()}
                        </span>
                        <span className="text-sm font-medium text-green-500 mb-1">
                            +15% vs Last Month
                        </span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-3 text-slate-500 mb-2">
                        <TrendingUp size={18} />
                        <h3 className="text-sm font-medium">
                            Avg. Views / Post
                        </h3>
                    </div>
                    <div className="flex items-end gap-3">
                        <span className="text-3xl font-bold text-slate-900">
                            {totalPosts > 0
                                ? Math.round(totalViews / totalPosts)
                                : 0}
                        </span>
                        <span className="text-sm font-medium text-green-500 mb-1">
                            +5% vs Last Month
                        </span>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Top Posts Table (Takes up 2/3 width) */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center">
                        <h2 className="font-semibold text-lg text-slate-900">
                            Top Posts
                        </h2>
                        <Link
                            href="/admin/posts"
                            className="text-sm text-blue-600 font-medium hover:underline"
                        >
                            View All
                        </Link>
                    </div>
                    <div className="overflow-x-auto flex-1">
                        <table className="w-full text-sm text-left">
                            <thead className="text-slate-500 bg-slate-50/50 font-medium border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4">Post Title</th>
                                    <th className="px-6 py-4">Slug</th>
                                    <th className="px-6 py-4">Views</th>
                                    <th className="px-6 py-4">Created</th>
                                    <th className="px-6 py-4 text-right">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {posts.map((post) => (
                                    <tr
                                        key={post.id}
                                        className="hover:bg-slate-50/80 transition-colors"
                                    >
                                        <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-3">
                                            <div className="w-8 h-8 rounded bg-slate-100 border border-slate-200 overflow-hidden flex-shrink-0">
                                                {post.thumbnailUrl ? (
                                                    <img
                                                        src={post.thumbnailUrl}
                                                        alt={post.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <FileText className="w-4 h-4 m-2 text-slate-400" />
                                                )}
                                            </div>
                                            <span className="truncate max-w-[200px]">
                                                {post.title}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 truncate max-w-[150px]">
                                            /{post.slug}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-slate-900">
                                            {post.countView.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 text-slate-500">
                                            {new Date(
                                                post.createdAt
                                            ).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric',
                                            })}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-slate-400 hover:text-blue-600 transition-colors">
                                                <MoreHorizontal size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {posts.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-6 py-12 text-center text-slate-500"
                                        >
                                            No posts found. Get started by
                                            creating your first post!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Side Panel (Takes up 1/3 width) */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                    <h2 className="font-semibold text-lg text-slate-900 mb-6">
                        Recent Tags
                    </h2>
                    <div className="space-y-4">
                        {/* Mocked Tags List - You can wire this up to Prisma by grouping tags later */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                                    #
                                </div>
                                <span className="font-medium text-slate-700">
                                    Next.js
                                </span>
                            </div>
                            <span className="text-sm font-medium text-slate-900">
                                12 Posts
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xs">
                                    #
                                </div>
                                <span className="font-medium text-slate-700">
                                    React
                                </span>
                            </div>
                            <span className="text-sm font-medium text-slate-900">
                                8 Posts
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-green-50 text-green-600 flex items-center justify-center font-bold text-xs">
                                    #
                                </div>
                                <span className="font-medium text-slate-700">
                                    Prisma
                                </span>
                            </div>
                            <span className="text-sm font-medium text-slate-900">
                                5 Posts
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
