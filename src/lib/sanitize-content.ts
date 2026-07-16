import sanitizeHtml from 'sanitize-html'

export function sanitizeServiceContent(html: string) {
    return sanitizeHtml(html, {
        allowedTags: [
            ...sanitizeHtml.defaults.allowedTags,
            'img',
            'figure',
            'figcaption',
            'section',
            'article',
        ],
        allowedAttributes: {
            ...sanitizeHtml.defaults.allowedAttributes,
            a: ['href', 'target', 'rel', 'title', 'class'],
            img: ['src', 'alt', 'title', 'width', 'height', 'loading', 'class'],
            '*': ['id', 'class'],
        },
        allowedSchemes: ['http', 'https', 'mailto', 'tel'],
        allowedSchemesByTag: {
            img: ['http', 'https'],
        },
        transformTags: {
            a: sanitizeHtml.simpleTransform('a', {
                rel: 'noopener noreferrer',
            }),
            img: sanitizeHtml.simpleTransform('img', {
                loading: 'lazy',
            }),
        },
    })
}
