import { EditorContent, useEditorState } from '@tiptap/react'

import { editorCx } from './_utils/class-names'
import { useEditorContext } from './editor-context'

type EditorContentAreaProps = {
  className?: string
  /** Chiều cao tối thiểu của vùng soạn thảo, đơn vị pixel. */
  minHeight?: number
}

export function EditorContentArea({
  className,
  minHeight = 360,
}: EditorContentAreaProps) {
  const { editor, imageUpload } = useEditorContext()

  return (
    <div
      className={editorCx(
        'relative overflow-y-auto [&_.ProseMirror]:min-h-[var(--editor-min-height)] [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left [&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0 [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-slate-400 [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]',
        className,
      )}
      style={{ '--editor-min-height': `${minHeight}px` } as React.CSSProperties}
      onPasteCapture={(event) => {
        const images = Array.from(event.clipboardData.files).filter((file) =>
          file.type.startsWith('image/'),
        )
        if (images.length > 0) {
          event.preventDefault()
          void imageUpload.uploadFiles(images)
        }
      }}
      onDropCapture={(event) => {
        const images = Array.from(event.dataTransfer.files).filter((file) =>
          file.type.startsWith('image/'),
        )
        if (images.length > 0) {
          event.preventDefault()
          void imageUpload.uploadFiles(images)
        }
      }}
    >
      <EditorContent editor={editor} />
    </div>
  )
}

export function EditorCount({ className }: { className?: string }) {
  const { editor } = useEditorContext()
  const stats = useEditorState({
    editor,
    selector: ({ editor: currentEditor }) => {
      if (!currentEditor) return null
      const text = currentEditor.getText().trim()
      return {
        words: text ? text.split(/\s+/).length : 0,
        characters: text.length,
      }
    },
  })

  if (!stats) return null

  return (
    <p
      className={editorCx(
        'border-t border-slate-200 bg-slate-50/60 px-4 py-2 text-right text-xs text-slate-500',
        className,
      )}
    >
      {stats.words} từ · {stats.characters} ký tự
    </p>
  )
}

export function EditorError({ className }: { className?: string }) {
  const { imageUpload } = useEditorContext()

  if (!imageUpload.error) return null

  return (
    <p
      role="alert"
      className={editorCx(
        'border-t border-red-100 bg-red-50 px-4 py-2 text-xs text-red-600',
        className,
      )}
    >
      {imageUpload.error}
    </p>
  )
}
