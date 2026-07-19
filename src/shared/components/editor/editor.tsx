import type { EditorRootProps } from './types'

import { useEditorImageUpload } from './_hooks/use-editor-image-upload'
import { useRichTextEditor } from './_hooks/use-rich-text-editor'
import { editorCx } from './_utils/class-names'
import { EDITOR_IMAGE_ACCEPT } from './_utils/image-files'
import { EditorContentArea, EditorCount, EditorError } from './editor-content'
import { EditorContext } from './editor-context'
import { EditorFloatingToolbar } from './editor-floating-toolbar'
import { EditorLinkControl } from './editor-link-control'
import { EditorHtmlControl } from './editor-html-control'
import { EditorColumnsAlignmentControl } from './editor-columns-alignment-control'
import { EditorButton } from './editor-tool-button'
import {
  EditorImageButton,
  EditorSeparator,
  EditorSpacer,
  EditorToolbar,
} from './editor-toolbar'

function EditorRoot({
  value,
  defaultValue,
  onChange,
  onBlur,
  placeholder = 'Bắt đầu nhập nội dung…',
  className,
  isDisabled,
  uploadImage,
  uploadFolder,
  maxImageSize,
  onDeleteImage,
  ariaLabel = 'Trình soạn thảo nội dung',
  children,
}: EditorRootProps) {
  const editor = useRichTextEditor({
    value,
    defaultValue,
    onChange,
    onBlur,
    placeholder,
    isDisabled,
  })
  const imageUpload = useEditorImageUpload({
    editor,
    uploadImage,
    onDeleteImage,
    folder: uploadFolder,
    maxSize: maxImageSize,
  })

  return (
    <EditorContext.Provider
      value={{ editor, imageUpload, isDisabled: Boolean(isDisabled) }}
    >
      <section
        aria-label={ariaLabel}
        className={editorCx(
          'overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm',
          isDisabled && 'opacity-70',
          className,
        )}
      >
        <input
          ref={imageUpload.inputRef}
          type="file"
          accept={EDITOR_IMAGE_ACCEPT}
          multiple
          className="sr-only"
          tabIndex={-1}
          onChange={imageUpload.onInputChange}
        />
        {children}
      </section>
    </EditorContext.Provider>
  )
}

export const Editor = Object.assign(EditorRoot, {
  Toolbar: EditorToolbar,
  FixedToolbar: EditorToolbar,
  FloatingToolbar: EditorFloatingToolbar,
  Button: EditorButton,
  Separator: EditorSeparator,
  Spacer: EditorSpacer,
  Link: EditorLinkControl,
  Image: EditorImageButton,
  Html: EditorHtmlControl,
  ColumnsAlignment: EditorColumnsAlignmentControl,
  Content: EditorContentArea,
  Count: EditorCount,
  Error: EditorError,
})
