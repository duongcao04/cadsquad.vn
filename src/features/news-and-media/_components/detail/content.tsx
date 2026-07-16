import React from 'react'

import { HtmlContent } from '@/shared/components/html-content'

type Props = {
    source: string
}
export default function Content({ source }: Props) {
    return (
        <HtmlContent
            html={source}
            className="post-content prose prose-slate max-w-none !post_container prose-headings:font-saira prose-headings:font-bold prose-headings:leading-tight prose-p:leading-relaxed prose-li:leading-relaxed prose-img:mx-auto prose-img:rounded-2xl prose-a:text-blue-600 prose-a:underline-offset-2"
        />
    )
}
