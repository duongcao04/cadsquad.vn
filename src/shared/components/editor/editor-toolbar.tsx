import { Button, Spinner, Tooltip } from '@heroui/react'
import { ImagePlus } from 'lucide-react'

import type { ReactNode } from 'react'

import type { EditorAction } from './editor-actions'

import { editorCx } from './_utils/class-names'
import { useEditorContext } from './editor-context'
import { EditorLineHeightControl } from './editor-line-height-control'
import { EditorHtmlControl } from './editor-html-control'
import { EditorLinkControl } from './editor-link-control'
import { EditorButton } from './editor-tool-button'
import { EditorColumnsAlignmentControl } from './editor-columns-alignment-control'

export type EditorToolbarItem =
  | EditorAction
  | 'link'
  | 'image'
  | 'html'
  | 'lineHeight'
  | 'columnsAlignment'
  | '|'

type EditorToolbarProps = {
  /** Tự ghép các tool bằng JSX; ưu tiên cao hơn `actions`. */
  children?: ReactNode
  /** Chỉ hiện các action liệt kê ở đây, `'|'` là separator. */
  actions?: Array<EditorToolbarItem>
  className?: string
}

export function EditorToolbar({
  children,
  actions,
  className,
}: EditorToolbarProps) {
  const { editor } = useEditorContext()

  if (!editor) {
    return (
      <div className="h-12 animate-pulse border-b border-slate-200 bg-slate-50" />
    )
  }

  return (
    <div
      className={editorCx(
        'flex min-h-12 flex-wrap items-center gap-1 border-b border-slate-200 bg-slate-50/90 px-3 py-2',
        className,
      )}
    >
      {children ??
        (actions ? renderToolbarItems(actions) : <EditorDefaultTools />)}
    </div>
  )
}

export function renderToolbarItems(items: Array<EditorToolbarItem>) {
  return items.map((item, index) => {
    if (item === '|') return <EditorSeparator key={index} />
    if (item === 'link') return <EditorLinkControl key={index} />
    if (item === 'image') return <EditorImageButton key={index} />
    if (item === 'html') return <EditorHtmlControl key={index} />
    if (item === 'lineHeight') return <EditorLineHeightControl key={index} />
    if (item === 'columnsAlignment') {
      return <EditorColumnsAlignmentControl key={index} />
    }
    return <EditorButton key={index} action={item} />
  })
}

function EditorDefaultTools() {
  return (
    <>
      <EditorButton action="undo" />
      <EditorButton action="redo" />

      <EditorSeparator />

      <EditorButton action="heading1" />
      <EditorButton action="heading2" />
      <EditorButton action="heading3" />
      <EditorButton action="bulletList" />
      <EditorButton action="orderedList" />
      <EditorButton action="blockquote" />

      <EditorSeparator />

      <EditorButton action="bold" />
      <EditorButton action="italic" />
      <EditorButton action="strike" />
      <EditorButton action="underline" />
      <EditorButton action="highlight" />
      <EditorButton action="code" />
      <EditorLinkControl />
      <EditorButton action="superscript" />
      <EditorButton action="subscript" />

      <EditorSeparator />

      <EditorButton action="alignLeft" />
      <EditorButton action="alignCenter" />
      <EditorButton action="alignRight" />
      <EditorButton action="alignJustify" />
      <EditorLineHeightControl />

      <EditorSeparator />

      <EditorButton action="columns2" />
      <EditorButton action="columns3" />
      <EditorButton action="columns4" />
      <EditorColumnsAlignmentControl />
      <EditorButton action="columnsOff" />

      <EditorSeparator />

      <EditorImageButton />
      <EditorHtmlControl />
    </>
  )
}

export function EditorSeparator() {
  return <span className="mx-1 h-6 w-px bg-slate-200" aria-hidden />
}

export function EditorSpacer() {
  return <span className="flex-1" aria-hidden />
}

export function EditorImageButton({ label = 'Thêm ảnh' }: { label?: string }) {
  const { imageUpload, isDisabled } = useEditorContext()

  return (
    <Tooltip>
      <Tooltip.Trigger>
        <Button
          size="sm"
          variant="ghost"
          isDisabled={isDisabled || imageUpload.isUploading}
          onPress={imageUpload.openFilePicker}
          className="gap-1.5 text-slate-600"
        >
          {imageUpload.isUploading ? (
            <Spinner size="sm" />
          ) : (
            <ImagePlus className="size-4" />
          )}
          {label}
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Content>
        {imageUpload.error ?? 'Tải ảnh lên và chèn vào nội dung'}
      </Tooltip.Content>
    </Tooltip>
  )
}
