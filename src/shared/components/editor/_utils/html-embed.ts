import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'

import { EditorHtmlEmbedView } from '../editor-html-embed-view'
import {
  clampHtmlEmbedHeight,
  HTML_EMBED_DEFAULT_HEIGHT,
} from '../html-embed-size'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    htmlEmbed: {
      insertHtmlEmbed: (attributes: {
        html: string
        height?: number
      }) => ReturnType
    }
  }
}

export const HtmlEmbed = Node.create({
  name: 'htmlEmbed',
  group: 'block',
  atom: true,
  selectable: true,
  isolating: true,

  addAttributes() {
    return {
      html: {
        default: '',
        parseHTML: (element) => element.getAttribute('data-html') ?? '',
        renderHTML: ({ html }) => ({ 'data-html': html }),
      },
      height: {
        default: HTML_EMBED_DEFAULT_HEIGHT,
        parseHTML: (element) =>
          clampHtmlEmbedHeight(element.getAttribute('data-height')),
        renderHTML: ({ height }) => ({ 'data-height': height }),
      },
    }
  },

  parseHTML() {
    return [{ tag: 'div[data-type="html-embed"]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, { 'data-type': 'html-embed' }),
    ]
  },

  addCommands() {
    return {
      insertHtmlEmbed:
        (attributes) =>
        ({ commands }) =>
          commands.insertContent({ type: this.name, attrs: attributes }),
    }
  },

  addNodeView() {
    return ReactNodeViewRenderer(EditorHtmlEmbedView)
  },
})
