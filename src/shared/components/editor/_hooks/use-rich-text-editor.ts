import { useEffect, useMemo } from 'react'
import { useEditor } from '@tiptap/react'

import { createEditorExtensions } from '../_utils/extensions'

type UseRichTextEditorOptions = {
  value?: string
  defaultValue?: string
  placeholder: string
  isDisabled?: boolean
  onChange?: (html: string) => void
  onBlur?: (html: string) => void
}

export function useRichTextEditor({
  value,
  defaultValue,
  placeholder,
  isDisabled,
  onChange,
  onBlur,
}: UseRichTextEditorOptions) {
  const extensions = useMemo(
    () => createEditorExtensions(placeholder),
    [placeholder],
  )
  const editor = useEditor({
    extensions,
    content: value ?? defaultValue ?? '',
    editable: !isDisabled,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          'ProseMirror prose prose-slate max-w-none px-6 py-8 focus:outline-none prose-headings:tracking-tight prose-a:text-indigo-600 prose-img:rounded-xl',
      },
    },
    onUpdate: ({ editor: currentEditor }) => onChange?.(currentEditor.getHTML()),
    onBlur: ({ editor: currentEditor }) => onBlur?.(currentEditor.getHTML()),
  })

  useEffect(() => {
    editor?.setEditable(!isDisabled)
  }, [editor, isDisabled])

  useEffect(() => {
    if (value === undefined || !editor || editor.getHTML() === value) return
    editor.commands.setContent(value, { emitUpdate: false })
  }, [editor, value])

  return editor
}
