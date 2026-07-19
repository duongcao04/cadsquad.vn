import { useState } from 'react'
import { Button, Popover } from '@heroui/react'
import { useEditorState } from '@tiptap/react'
import { AlignVerticalSpaceAround } from 'lucide-react'

import type { LineHeightValue } from './_utils/line-height'

import { editorCx } from './_utils/class-names'
import { LINE_HEIGHT_OPTIONS } from './_utils/line-height'
import { useEditorContext } from './editor-context'

export function EditorLineHeightControl() {
  const { editor, isDisabled } = useEditorContext()
  const [isOpen, setIsOpen] = useState(false)
  const state = useEditorState({
    editor,
    selector: ({ editor: currentEditor }) => {
      if (!currentEditor) return null
      const current = (currentEditor.getAttributes('paragraph').lineHeight ??
        currentEditor.getAttributes('heading').lineHeight ??
        null) as string | null
      return { current }
    },
  })

  if (!editor) return null

  const current = state?.current ?? null

  const apply = (value: LineHeightValue | null) => {
    if (value === null) {
      editor.chain().focus().unsetLineHeight().run()
    } else {
      editor.chain().focus().setLineHeight(value).run()
    }
    setIsOpen(false)
  }

  return (
    <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger>
        <Button
          isIconOnly
          size="sm"
          variant="ghost"
          aria-label="Giãn dòng"
          isDisabled={isDisabled}
          className={current ? 'bg-slate-200 text-slate-950' : 'text-slate-500'}
        >
          <AlignVerticalSpaceAround className="size-4" />
        </Button>
      </Popover.Trigger>
      <Popover.Content placement="bottom">
        <Popover.Dialog className="w-40 p-2">
          <Popover.Heading className="mb-1 px-2 text-sm font-semibold">
            Giãn dòng
          </Popover.Heading>
          <div className="flex flex-col">
            <Button
              size="sm"
              variant="ghost"
              fullWidth
              className={editorCx(
                'justify-start',
                current === null && 'bg-slate-100 font-semibold',
              )}
              onPress={() => apply(null)}
            >
              Mặc định
            </Button>
            {LINE_HEIGHT_OPTIONS.map((option) => (
              <Button
                key={option.value}
                size="sm"
                variant="ghost"
                fullWidth
                className={editorCx(
                  'justify-start',
                  current === option.value && 'bg-slate-100 font-semibold',
                )}
                onPress={() => apply(option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  )
}
