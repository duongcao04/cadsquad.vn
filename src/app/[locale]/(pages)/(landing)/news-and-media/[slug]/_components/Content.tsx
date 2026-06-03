import React, { Suspense } from 'react'

import { Skeleton } from 'antd'
import { LinkIcon } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

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
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        h1: ({ children, ...props }) => {
                            const text = String(children)
                            return (
                                <a
                                    href={`#${getHeadingId(text)}`}
                                    className="no-underline w-fit flex items-start justify-start gap-2 group"
                                >
                                    <h1
                                        id={getHeadingId(text)}
                                        className="transition duration-150 hover:text-blue-600 cursor-pointer"
                                        {...props}
                                    >
                                        {children}
                                    </h1>
                                    <LinkIcon className="mt-1.5 hidden group-hover:block" />
                                </a>
                            )
                        },
                        h2: ({ children, ...props }) => {
                            const text = String(children)
                            return <h2 id={getHeadingId(text)} {...props}>{children}</h2>
                        },
                        img: ({ src, alt }) => (
                            <img
                                src={src}
                                alt={alt}
                                className="rounded-2xl my-0 max-w-full"
                            />
                        ),
                    }}
                >
                    {source}
                </ReactMarkdown>
            </div>
        </Suspense>
    )
}
