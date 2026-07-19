import { Fragment } from '@tiptap/pm/model'
import { NodeSelection, TextSelection } from '@tiptap/pm/state'
import { Node, mergeAttributes } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'

import { EditorColumnsView } from '../editor-columns-view'
import {
  equalColumnWidths,
  parseColumnWidths,
  serializeColumnWidths,
} from './column-widths'

import type { Node as ProseMirrorNode, ResolvedPos } from '@tiptap/pm/model'
import type { EditorState } from '@tiptap/pm/state'

export type ColumnsCount = 2 | 3 | 4

declare module '@tiptap/core' {
  // eslint-disable-next-line @typescript-eslint/naming-convention -- tên type parameter do Tiptap quy định
  interface Commands<ReturnType> {
    columns: {
      /** Chia khối hiện tại thành `count` cột, hoặc đổi số cột nếu đang ở trong layout cột. */
      setColumns: (count: ColumnsCount) => ReturnType
      /** Gỡ layout cột, đưa toàn bộ nội dung các cột về dòng thường. */
      unsetColumns: () => ReturnType
    }
  }
}

export const Column = Node.create({
  name: 'column',
  content: 'block+',
  isolating: true,

  parseHTML() {
    return [{ tag: 'div[data-type="column"]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'column',
        style: 'min-width:0',
      }),
      0,
    ]
  },
})

export const Columns = Node.create({
  name: 'columns',
  group: 'block',
  content: 'column{2,4}',
  isolating: true,
  defining: true,

  addAttributes() {
    return {
      count: {
        default: 2,
        parseHTML: (element) => {
          const count = Number(element.getAttribute('data-count'))
          return count >= 2 && count <= 4 ? count : 2
        },
        renderHTML: (attributes) => ({ 'data-count': attributes.count }),
      },
      widths: {
        default: serializeColumnWidths(equalColumnWidths(2)),
        parseHTML: (element) =>
          serializeColumnWidths(
            parseColumnWidths(
              element.getAttribute('data-widths'),
              Number(element.getAttribute('data-count')) || 2,
            ),
          ),
        renderHTML: (attributes) => {
          const widths = parseColumnWidths(attributes.widths, attributes.count)
          return {
            'data-widths': serializeColumnWidths(widths),
            style: `display:grid;grid-template-columns:${widths
              .map((width) => `minmax(0,${width}fr)`)
              .join(' ')};gap:1.5rem`,
          }
        },
      },
      horizontalAlign: {
        default: 'left',
        parseHTML: (element) => {
          const value = element.getAttribute('data-horizontal-align')
          return value === 'center' || value === 'right' ? value : 'left'
        },
        renderHTML: (attributes) => ({
          'data-horizontal-align': attributes.horizontalAlign,
          style: `text-align:${attributes.horizontalAlign}`,
        }),
      },
      verticalAlign: {
        default: 'top',
        parseHTML: (element) => {
          const value = element.getAttribute('data-vertical-align')
          return value === 'center' || value === 'bottom' ? value : 'top'
        },
        renderHTML: (attributes) => ({
          'data-vertical-align': attributes.verticalAlign,
          style: `align-items:${
            attributes.verticalAlign === 'bottom'
              ? 'end'
              : attributes.verticalAlign === 'center'
                ? 'center'
                : 'start'
          }`,
        }),
      },
    }
  },

  parseHTML() {
    return [{ tag: 'div[data-type="columns"]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, { 'data-type': 'columns' }),
      0,
    ]
  },

  addCommands() {
    return {
      setColumns:
        (count) =>
        ({ state, tr, dispatch }) => {
          const { schema, selection } = state
          const columnsType = schema.nodes.columns
          const columnType = schema.nodes.column
          const paragraphType = schema.nodes.paragraph
          if (!columnsType || !columnType || !paragraphType) return false
          const emptyColumn = () =>
            columnType.create(null, paragraphType.create())

          // Đang ở trong layout cột: chỉ đổi số cột, dồn nội dung cột thừa vào cột cuối.
          const active = findParentColumns(selection.$from)
          if (active) {
            if (active.node.childCount === count) return false
            if (!dispatch) return true

            const columns: Array<ProseMirrorNode> = []
            active.node.forEach((column) => columns.push(column))
            if (count > columns.length) {
              while (columns.length < count) columns.push(emptyColumn())
            } else {
              const overflow = columns.splice(count)
              const last = columns[count - 1]
              if (last) {
                columns[count - 1] = columnType.create(
                  last.attrs,
                  overflow.reduce(
                    (content, column) => content.append(column.content),
                    last.content,
                  ),
                )
              }
            }

            tr.replaceWith(
              active.pos,
              active.pos + active.node.nodeSize,
              columnsType.create(
                {
                  ...active.node.attrs,
                  count,
                  widths: serializeColumnWidths(equalColumnWidths(count)),
                },
                columns,
              ),
            )
            dispatch(tr)
            return true
          }

          // Chưa có layout: bọc các khối đang chọn vào cột đầu, các cột còn lại để trống.
          const range = getTopLevelRange(state)
          if (!range) return false
          if (!dispatch) return true

          const wrapped = state.doc.slice(range.from, range.to).content
          const first = wrapped.childCount
            ? columnType.create(null, wrapped)
            : emptyColumn()
          const columns = [
            first,
            ...Array.from({ length: count - 1 }, emptyColumn),
          ]

          tr.replaceWith(
            range.from,
            range.to,
            columnsType.create(
              {
                count,
                widths: serializeColumnWidths(equalColumnWidths(count)),
              },
              columns,
            ),
          )
          tr.setSelection(TextSelection.near(tr.doc.resolve(range.from + 2)))
          dispatch(tr)
          return true
        },

      unsetColumns:
        () =>
        ({ state, tr, dispatch }) => {
          const active = findParentColumns(state.selection.$from)
          if (!active) return false
          if (!dispatch) return true

          let content = Fragment.empty
          active.node.forEach((column) => {
            content = content.append(column.content)
          })
          tr.replaceWith(active.pos, active.pos + active.node.nodeSize, content)
          tr.setSelection(TextSelection.near(tr.doc.resolve(active.pos + 1)))
          dispatch(tr)
          return true
        },
    }
  },

  addNodeView() {
    return ReactNodeViewRenderer(EditorColumnsView)
  },
})

function findParentColumns(
  $pos: ResolvedPos,
): { node: ProseMirrorNode; pos: number } | null {
  for (let depth = $pos.depth; depth > 0; depth--) {
    const node = $pos.node(depth)
    if (node.type.name === 'columns') {
      return { node, pos: $pos.before(depth) }
    }
  }
  return null
}

function getTopLevelRange(state: EditorState) {
  const { selection } = state
  if (selection instanceof NodeSelection && selection.$from.depth === 0) {
    return { from: selection.from, to: selection.to }
  }
  const { $from, $to } = selection
  if ($from.depth === 0 || $to.depth === 0) return null
  return { from: $from.before(1), to: $to.after(1) }
}
