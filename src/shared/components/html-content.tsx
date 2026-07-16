'use client'

import { useMemo } from 'react'

import parse, {
    Element,
    attributesToProps,
    domToReact,
} from 'html-react-parser'
import type { DOMNode, HTMLReactParserOptions } from 'html-react-parser'

import {
    createHeadingIdGenerator,
    getHeadingLevel,
    getNodeText,
} from '@/utils/html-parser'

type HtmlContentProps = {
    /** Chuỗi HTML từ editor. Chỉ render HTML từ nguồn tin cậy hoặc đã sanitize. */
    html: string
    className?: string
}

/**
 * Render HTML của editor thành React elements qua html-react-parser,
 * tự gắn id vào các heading để anchor/TOC hoạt động.
 */
export function HtmlContent({ html, className }: HtmlContentProps) {
    const content = useMemo(() => {
        const nextId = createHeadingIdGenerator()

        const options: HTMLReactParserOptions = {
            replace: (node) => {
                if (!(node instanceof Element)) return undefined
                const level = getHeadingLevel(node)
                if (level === 0 || node.attribs.id) return undefined

                const Tag = node.tagName.toLowerCase() as 'h1'
                return (
                    <Tag
                        {...attributesToProps(node.attribs)}
                        id={nextId(getNodeText(node).trim())}
                    >
                        {domToReact(node.children as Array<DOMNode>, options)}
                    </Tag>
                )
            },
        }

        return parse(html, options)
    }, [html])

    return <div className={className}>{content}</div>
}
