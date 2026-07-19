import { BubbleMenu } from '@tiptap/react/menus'

import type { ReactNode } from 'react'

import type { EditorToolbarItem } from './editor-toolbar'

import { editorCx } from './_utils/class-names'
import { useEditorContext } from './editor-context'
import { EditorLinkControl } from './editor-link-control'
import { EditorButton } from './editor-tool-button'
import { renderToolbarItems } from './editor-toolbar'

type EditorFloatingToolbarProps = {
  /** Tự ghép các tool bằng JSX; ưu tiên cao hơn `actions`. */
  children?: ReactNode
  /** Chỉ hiện các action liệt kê ở đây, `'|'` là separator. */
  actions?: Array<EditorToolbarItem>
  className?: string
}

/**
 * Toolbar nổi hiện phía trên vùng văn bản đang bôi đen (bubble menu).
 * Tự ẩn khi selection rỗng, editor bị khoá, hoặc đang chọn ảnh
 * (ảnh đã có toolbar riêng trong NodeView).
 */
export function EditorFloatingToolbar({
  children,
  actions,
  className,
}: EditorFloatingToolbarProps) {
  const { editor } = useEditorContext()

  if (!editor) return null

  return (
    <BubbleMenu
      editor={editor}
      options={{ placement: 'top', offset: 8 }}
      shouldShow={({ editor: currentEditor }) =>
        currentEditor.isEditable &&
        !currentEditor.state.selection.empty &&
        !currentEditor.isActive('image')
      }
      className={editorCx(
        'flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1 shadow-lg',
        className,
      )}
    >
      {children ??
        (actions ? renderToolbarItems(actions) : <FloatingDefaultTools />)}
    </BubbleMenu>
  )
}

function FloatingDefaultTools() {
  return (
    <>
      <EditorButton action="bold" />
      <EditorButton action="italic" />
      <EditorButton action="underline" />
      <EditorButton action="strike" />
      <EditorButton action="code" />
      <EditorLinkControl />
    </>
  )
}
