import React from 'react'

import { useTranslations } from 'next-intl'

import { Post } from '@/validationSchemas/post.schema'

import PostCard from '@/features/news-and-media/_components/cards/post-card'

type Props = {
    data: Post[]
}

export default function RelatedPosts({ data }: Props) {
    const tNewMedia = useTranslations('landing.newsMedia')
    return (
        <div className="space-y-5">
            <h4 className="text-lg lg:text-sm font-semibold">
                {tNewMedia('relatedPosts')}
            </h4>
            <div className="lg:max-h-[72vh] pb-12 lg:pb-0 overflow-y-auto space-y-1.5">
                {data.map((post) => {
                    return (
                        <PostCard
                            key={post.id}
                            data={post}
                            showDescription={false}
                            classNames={{
                                image: {
                                    rootClassName:
                                        '!h-[50px] aspect-[1.5/1] !rounded-sm',
                                    className:
                                        '!h-[50px] aspect-[1.5/1] !rounded-sm',
                                },
                                title: 'text-sm',
                            }}
                        />
                    )
                })}
            </div>
        </div>
    )
}
