import { Element, Text, htmlToDOM } from 'html-react-parser'
import type { DOMNode } from 'html-react-parser'

export type HtmlHeading = {
    id: string
    text: string
    level: number
}

const HEADING_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

export function slugifyHeading(text: string) {
    const slug = text
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'd')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')

    return slug || 'heading'
}

/**
 * Sinh id duy nhất cho heading theo thứ tự xuất hiện — heading trùng chữ
 * nhận hậu tố `-2`, `-3`… `getHeadings` và `HtmlContent` dùng chung logic này
 * nên id ở TOC và id render ra luôn khớp nhau.
 */
export function createHeadingIdGenerator() {
    const counts = new Map<string, number>()

    return (text: string) => {
        const base = slugifyHeading(text)
        const count = (counts.get(base) ?? 0) + 1
        counts.set(base, count)
        return count > 1 ? `${base}-${count}` : base
    }
}

export function getNodeText(node: DOMNode): string {
    if (node instanceof Text) return node.data
    if (node instanceof Element) {
        return node.children
            .map((child) => getNodeText(child as DOMNode))
            .join('')
    }
    return ''
}

export function getHeadingLevel(node: Element) {
    return HEADING_TAGS.indexOf(node.tagName.toLowerCase()) + 1
}

/** Trích danh sách heading (id, text, level) từ chuỗi HTML, tới `maxLevel`. */
export function getHeadings(html: string, maxLevel = 6): Array<HtmlHeading> {
    const nextId = createHeadingIdGenerator()
    const headings: Array<HtmlHeading> = []

    const walk = (nodes: Array<DOMNode>) => {
        for (const node of nodes) {
            if (!(node instanceof Element)) continue

            const level = getHeadingLevel(node)
            if (level > 0) {
                const text = getNodeText(node).trim()
                const id = node.attribs.id || nextId(text)
                if (level <= maxLevel) headings.push({ id, text, level })
            } else {
                walk(node.children as Array<DOMNode>)
            }
        }
    }

    walk(htmlToDOM(html))
    return headings
}
