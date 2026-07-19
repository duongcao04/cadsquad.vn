import { createContext, useContext } from 'react'

import type { Editor as TiptapEditor } from '@tiptap/react'

import type { useEditorImageUpload } from './_hooks/use-editor-image-upload'

export type EditorImageUploadState = ReturnType<typeof useEditorImageUpload>

type EditorContextValue = {
  editor: TiptapEditor | null
  imageUpload: EditorImageUploadState
  isDisabled: boolean
}

export const EditorContext = createContext<EditorContextValue | null>(null)

export function useEditorContext() {
  const context = useContext(EditorContext)
  if (!context) {
    throw new Error('Các component Editor.* phải nằm bên trong <Editor>.')
  }
  return context
}
