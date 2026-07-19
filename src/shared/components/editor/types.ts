import type { ReactNode } from 'react'

export type EditorImageUpload = (file: File) => Promise<string>

export type EditorImageDelete = (src: string) => Promise<void>

export type EditorRootProps = {
  value?: string
  defaultValue?: string
  onChange?: (html: string) => void
  onBlur?: (html: string) => void
  placeholder?: string
  className?: string
  isDisabled?: boolean
  uploadImage?: EditorImageUpload
  uploadFolder?: string
  maxImageSize?: number
  /** Gọi khi ảnh bị xoá khỏi nội dung hoặc bị thay bằng ảnh crop mới. */
  onDeleteImage?: EditorImageDelete
  ariaLabel?: string
  children: ReactNode
}

export type RichTextEditorProps = Omit<EditorRootProps, 'children'> & {
  contentClassName?: string
  minHeight?: number
}
