import { Extension } from '@tiptap/core'

export const LINE_HEIGHT_OPTIONS = [
  { value: '1', label: 'Đơn (1.0)' },
  { value: '1.15', label: 'Hẹp (1.15)' },
  { value: '1.5', label: 'Vừa (1.5)' },
  { value: '1.75', label: 'Rộng (1.75)' },
  { value: '2', label: 'Đôi (2.0)' },
] as const

export type LineHeightValue = (typeof LINE_HEIGHT_OPTIONS)[number]['value']

declare module '@tiptap/core' {
  // eslint-disable-next-line @typescript-eslint/naming-convention -- tên type parameter do Tiptap quy định
  interface Commands<ReturnType> {
    lineHeight: {
      /** Đặt line-height cho các khối văn bản đang chọn. */
      setLineHeight: (value: LineHeightValue) => ReturnType
      /** Trả line-height về mặc định. */
      unsetLineHeight: () => ReturnType
    }
  }
}

export const LineHeight = Extension.create({
  name: 'lineHeight',

  addOptions() {
    return { types: ['paragraph', 'heading'] }
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          lineHeight: {
            default: null,
            parseHTML: (element) => element.style.lineHeight || null,
            renderHTML: (attributes) =>
              attributes.lineHeight
                ? { style: `line-height:${attributes.lineHeight}` }
                : {},
          },
        },
      },
    ]
  },

  addCommands() {
    return {
      setLineHeight:
        (value) =>
        ({ commands }) =>
          this.options.types
            .map((type) =>
              commands.updateAttributes(type, { lineHeight: value }),
            )
            .some(Boolean),

      unsetLineHeight:
        () =>
        ({ commands }) =>
          this.options.types
            .map((type) => commands.resetAttributes(type, 'lineHeight'))
            .some(Boolean),
    }
  },
})
