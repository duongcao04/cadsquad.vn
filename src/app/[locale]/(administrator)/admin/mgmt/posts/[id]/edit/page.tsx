import { notFound } from 'next/navigation'

import { prisma } from '../../../../../../lib/prisma'
import EditPostForm from '../../_components/EditPostForm'

interface EditPostPageProps {
    params: Promise<{ id: string }>
}

export default async function EditPostPage({ params }: EditPostPageProps) {
    const { id } = await params

    const post = await prisma.post.findUnique({
        where: { id },
    })

    if (!post) {
        notFound()
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Post</h1>
            <EditPostForm post={post} />
        </div>
    )
}
