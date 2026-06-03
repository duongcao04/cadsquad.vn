'use client'

import React from 'react'

import { Image, ImageProps } from 'antd'

import { Link } from '@tanstack/react-router'
import { MotionDiv } from '@/lib/motion'
import { Post } from '@/validationSchemas/post.schema'

import { cn } from '../../../../../../../lib/utils'

type Props = {
    variant?: 'sm' | 'md' | 'lg'
    showDescription?: boolean
    data: Post
    classNames?: {
        title?: string
        image?: {
            rootClassName?: ImageProps['rootClassName']
            className?: ImageProps['className']
        }
        description?: string
    }
}
export default function PostCard({
    variant = 'sm',
    data,
    showDescription,
    classNames,
}: Props) {
    switch (variant) {
        case 'sm':
            return (
                <SmallPostCard
                    data={data}
                    showDescription={showDescription}
                    classNames={classNames}
                />
            )
        case 'md':
            return (
                <MediumPostCard data={data} showDescription={showDescription} />
            )
        case 'lg':
            return (
                <LargePostCard data={data} showDescription={showDescription} />
            )
        default:
            return (
                <SmallPostCard data={data} showDescription={showDescription} />
            )
    }
}

type VariantProps = {
    data: Post
    showDescription?: boolean
    classNames?: {
        title?: string
        image?: {
            rootClassName?: ImageProps['rootClassName']
            className?: ImageProps['className']
        }
        description?: string
    }
}
const SmallPostCard = ({
    data,
    showDescription = true,
    classNames,
}: VariantProps) => {
    const wrapperVariants = {
        init: {
            opacity: 0,
        },
        animate: {
            opacity: 1,
        },
        hover: {
            opacity: 1,
            boxShadow:
                'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px',
        },
    }
    return (
        <Link
            to="/news-and-media/$slug"
            params={{ slug: data.slug ?? '' }}
            className="block"
            title={data.title}
        >
            <MotionDiv
                variants={wrapperVariants}
                initial="init"
                animate="animate"
                whileHover="hover"
                className="group flex items-center justify-start gap-3 p-2 rounded-3xl"
            >
                <Image
                    src={data?.thumbnailUrl}
                    alt="post image"
                    preview={false}
                    rootClassName={cn(
                        'shrink-0 h-[80px] aspect-[1.1/1] rounded-3xl overflow-hidden',
                        classNames?.image?.rootClassName
                    )}
                    className={cn(
                        'h-full aspect-[1.1/1] object-cover rounded-3xl group-hover:scale-110 duration-300 transition',
                        classNames?.image?.className
                    )}
                />
                <div>
                    <p
                        className={cn(
                            'text-black font-medium line-clamp-2 text-lg leading-inherit',
                            classNames?.title
                        )}
                    >
                        {data.title}
                    </p>
                    {showDescription && (
                        <p
                            className={cn(
                                'mt-0.5 text-sm opacity-75 line-clamp-1',
                                classNames?.description
                            )}
                        >
                            {data.shortDescription}
                        </p>
                    )}
                </div>
            </MotionDiv>
        </Link>
    )
}

const MediumPostCard = ({
    data,
    showDescription = true,
    classNames,
}: VariantProps) => {
    return (
        <div className="w-full space-y-3">
            <Link
                to="/news-and-media/$slug"
                params={{ slug: data.slug ?? '' }}
                className="group block w-full aspect-[4/3]"
                title={data.title}
            >
                <Image
                    src={data?.thumbnailUrl}
                    alt="post image"
                    preview={false}
                    rootClassName={cn(
                        '!size-full overflow-hidden rounded-3xl',
                        classNames?.image?.rootClassName
                    )}
                    className={cn(
                        '!size-full object-cover rounded-3xl group-hover:scale-110 duration-300 transition',
                        classNames?.image?.className
                    )}
                />
            </Link>
            <div>
                <Link
                    to="/news-and-media/$slug"
                    params={{ slug: data.slug ?? '' }}
                    className={cn(
                        'text-black font-semibold line-clamp-2 text-xl leading-normal hover:text-blue-500 transition duration-200',
                        classNames?.title
                    )}
                    title={data.title}
                >
                    {data.title}
                </Link>
                {showDescription && (
                    <p
                        className={cn(
                            'mt-1 text-base opacity-75 line-clamp-2',
                            classNames?.description
                        )}
                    >
                        {data?.shortDescription}
                    </p>
                )}
            </div>
        </div>
    )
}

const LargePostCard = ({ data, classNames }: VariantProps) => {
    const wrapperVariants = {
        init: {
            opacity: 0,
        },
        animate: {
            opacity: 1,
        },
        hover: {
            opacity: 1,
            boxShadow:
                'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px',
        },
    }

    return (
        <MotionDiv
            variants={wrapperVariants}
            initial="init"
            animate="animate"
            whileHover="hover"
            className="group h-full relative overflow-hidden rounded-2xl"
        >
            <Link
                to="/news-and-media/$slug"
                params={{ slug: data.slug ?? '' }}
                className="block size-full"
                title={data.title}
            >
                <Image
                    src={data?.thumbnailUrl}
                    alt="post image"
                    preview={false}
                    rootClassName={cn(
                        '!size-full',
                        classNames?.image?.rootClassName
                    )}
                    className={cn(
                        '!size-full object-cover rounded-2xl group-hover:scale-110 duration-300 transition',
                        classNames?.image?.className
                    )}
                />
            </Link>
            <div className="rounded-b-2xl absolute bottom-0 backdrop-blur-2xl w-full py-3 px-6 md:py-6 xl:py-12 md:px-10">
                <Link
                    to="/news-and-media/$slug"
                    params={{ slug: data.slug ?? '' }}
                    className={cn(
                        'w-fit text-xl md:text-3xl font-medium text-white line-clamp-2 leading-normal',
                        classNames?.title
                    )}
                    title={data.title}
                >
                    {data?.title}
                </Link>
            </div>
        </MotionDiv>
    )
}
