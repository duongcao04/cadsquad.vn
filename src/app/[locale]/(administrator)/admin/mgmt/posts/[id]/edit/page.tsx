'use client'

import { useEffect, useState } from 'react'
import { postsApi } from '@/lib/supabase-api'
import EditPostForm from '../../_components/EditPostForm'

interface Props {
    id: string
}

export default function EditPostPage({ id }: Props) {
    const [post, setPost] = useState<{
        id: string
        title: string
        slug: string
        shortDescription: string | null
        keywords: string[]
        thumbnailUrl: string
        bgCoverUrl: string | null
        content: string
        tags: string[]
    } | null>(null)
    const [loading, setLoading] = useState(true)
    const [notFound, setNotFound] = useState(false)

    useEffect(() => {
        postsApi.getById(id).then((data) => {
            const enTranslation = data.translations.find(
                (t: { language: string }) => t.language === 'EN'
            ) ?? data.translations[0]

            if (!enTranslation) {
                setNotFound(true)
                return
            }

            setPost({
                id: data.id,
                title: enTranslation.title || '',
                slug: enTranslation.slug || '',
                shortDescription: enTranslation.shortDescription ?? null,
                keywords: Array.isArray(enTranslation.seoKeywords) ? enTranslation.seoKeywords : [],
                thumbnailUrl: data.thumbnailUrl || '',
                bgCoverUrl: data.bgCoverUrl ?? null,
                content: enTranslation.content || '',
                tags: Array.isArray(enTranslation.tags) ? enTranslation.tags : [],
            })
        }).catch(() => {
            setNotFound(true)
        }).finally(() => {
            setLoading(false)
        })
    }, [id])

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-6">
                <p className="text-gray-500">Loading...</p>
            </div>
        )
    }

    if (notFound || !post) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-6">
                <p className="text-red-500">Post not found.</p>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Post</h1>
            <EditPostForm post={post} />
        </div>
    )
}
