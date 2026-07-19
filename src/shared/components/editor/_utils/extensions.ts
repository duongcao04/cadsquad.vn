import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import TextAlign from '@tiptap/extension-text-align'
import { ReactNodeViewRenderer } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { EditorImageView } from '../editor-image-view'
import { Column, Columns } from './columns'
import { HtmlEmbed } from './html-embed'
import { imageBorderCss, normalizeImageBorder } from './image-border'
import { LineHeight } from './line-height'

const ResizableImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        parseHTML: (element) => {
          const width = element.getAttribute('width')
          return width ? Number(width) : null
        },
        renderHTML: (attributes) =>
          attributes.width ? { width: attributes.width } : {},
      },
      border: {
        default: null,
        parseHTML: (element) =>
          normalizeImageBorder(element.getAttribute('data-border')),
        renderHTML: (attributes) => {
          const color = normalizeImageBorder(attributes.border)
          const style = imageBorderCss(color)
          return color && style ? { 'data-border': color, style } : {}
        },
      },
    }
  },
  addNodeView() {
    return ReactNodeViewRenderer(EditorImageView)
  },
})

export function createEditorExtensions(placeholder: string) {
  return [
    StarterKit.configure({
      heading: { levels: [1, 2, 3] },
      link: {
        autolink: true,
        defaultProtocol: 'https',
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-indigo-600 underline underline-offset-2',
          rel: 'noopener noreferrer nofollow',
        },
      },
    }),
    ResizableImage.configure({
      allowBase64: false,
      HTMLAttributes: {
        class: 'mx-auto my-6 h-auto max-w-full rounded-xl',
        loading: 'lazy',
      },
    }),
    Placeholder.configure({ placeholder }),
    TextAlign.configure({ types: ['heading', 'paragraph'] }),
    Highlight.configure({ multicolor: false }),
    Superscript,
    Subscript,
    LineHeight,
    Columns,
    Column,
    HtmlEmbed,
  ]
}
