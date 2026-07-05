import React, { Suspense } from 'react'

import { Image, Skeleton } from 'antd'
import { LinkIcon } from 'lucide-react'
import { MDXRemote } from 'next-mdx-remote-client/rsc'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'
import remarkParse from 'remark-parse'

import { Link } from '@/i18n/navigation'
import { getHeadingId } from '@/lib/markdown'

type Props = {
    source: string
}
export default function Content({ source }: Props) {
    return (
        <Suspense
            fallback={
                <div className="post_container">
                    <Skeleton />
                </div>
            }
        >
            <div className="prose prose-img:rounded-2xl prose-img:my-0 prose-h1:text-3xl prose-h1:mb-3 prose-h1:font-bold prose-h2:text-2xl prose-h2:my-3 prose-h3:text-xl prose-h3:my-3 prose-a:text-blue-600 prose-a:underline-offset-2 !post_container">
                <MDXRemote
                    source={source.replaceAll('img', 'Image')}
                    options={{
                        mdxOptions: {
                            remarkPlugins: [remarkParse, remarkGfm, remarkHtml],
                        },
                    }}
                    components={{
                        h1: (props) => {
                            return (
                                <Link
                                    href={`#${getHeadingId(props.children)}`}
                                    className="no-underline w-fit flex items-start justify-start gap-2 group"
                                >
                                    <h1
                                        id={getHeadingId(props.children)}
                                        className="transition duration-150 hover:text-blue-600 cursor-pointer"
                                        {...props}
                                    />
                                    <LinkIcon className="mt-1.5 hidden group-hover:block" />
                                </Link>
                            )
                        },
                        h2: (props) => (
                            <h2 id={getHeadingId(props.children)} {...props} />
                        ),
                        Image: ({ src, alt, ...props }) => (
                            <Image
                                src={src}
                                alt={alt}
                                {...props}
                                preview={{
                                    maskClassName: 'hover:!opacity-0',
                                    classNames: {
                                        wrapper: 'scale-125',
                                    },
                                }}
                            />
                        ),
                        img: ({ src, alt, ...props }) => (
                            <Image
                                src={src}
                                alt={alt}
                                {...props}
                                preview={{
                                    maskClassName: 'hover:!opacity-0',
                                    classNames: {
                                        wrapper: 'scale-125',
                                    },
                                }}
                            />
                        ),
                        wrapper: ({ children }) => (
                            <div suppressHydrationWarning>{children}</div>
                        ),
                    }}
                    onError={(err) => {
                        console.log(err)

                        return (
                            <p>{`Couldn't load content!${JSON.stringify(err)}`}</p>
                        )
                    }}
                />
            </div>
        </Suspense>
    )
}
