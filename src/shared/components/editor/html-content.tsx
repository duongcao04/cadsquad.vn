import { useMemo } from 'react'
import parse, {
  attributesToProps,
  domToReact,
  Element,
} from 'html-react-parser'

import type { DOMNode, HTMLReactParserOptions } from 'html-react-parser'

import {
  createHeadingIdGenerator,
  getHeadingLevel,
  getNodeText,
} from './_utils/html-parser'
import { clampHtmlEmbedHeight } from './html-embed-size'
import { useMediaQuery } from '#/hooks/use-media-query'
import { EDITOR_COLUMNS_MOBILE_QUERY } from './_utils/column-widths'

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
  const isMobile = useMediaQuery(EDITOR_COLUMNS_MOBILE_QUERY)
  const requiresSandbox = /<(?:script|style)\b/i.test(html)
  const content = useMemo(() => {
    const nextId = createHeadingIdGenerator()

    const options: HTMLReactParserOptions = {
      replace: (node) => {
        if (!(node instanceof Element)) return undefined
        if (node.attribs['data-type'] === 'columns' && isMobile) {
          const props = attributesToProps(node.attribs)
          return (
            <div
              {...props}
              style={{
                ...(props.style ?? {}),
                gridTemplateColumns: 'minmax(0, 1fr)',
              }}
            >
              {domToReact(node.children as Array<DOMNode>, options)}
            </div>
          )
        }
        if (node.attribs['data-type'] === 'html-embed') {
          const height = clampHtmlEmbedHeight(node.attribs['data-height'])
          return (
            <iframe
              title="HTML block"
              srcDoc={node.attribs['data-html'] ?? ''}
              sandbox=""
              className="my-6 w-full border-0"
              style={{ height }}
            />
          )
        }
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
  }, [html, isMobile])

  if (requiresSandbox) {
    return (
      <iframe
        title="Nội dung HTML tùy chỉnh"
        srcDoc={html}
        sandbox=""
        className={className ?? 'min-h-160 w-full border-0'}
      />
    )
  }

  return <div className={className}>{content}</div>
}
