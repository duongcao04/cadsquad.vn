import { marked } from 'marked'

import { sanitizeServiceContent } from './sanitize-content'

/**
 * CMS posts mới lưu HTML; dữ liệu legacy có thể vẫn là Markdown.
 * Marked giữ nguyên raw HTML và chuyển Markdown sang HTML trước khi sanitize.
 */
export function preparePostContent(source: string) {
    const html = marked.parse(source, {
        async: false,
        gfm: true,
    }) as string

    return sanitizeServiceContent(html)
}
