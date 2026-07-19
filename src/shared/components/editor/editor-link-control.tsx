import { useState } from 'react'
import { Button, Input, Popover } from '@heroui/react'
import { useEditorState } from '@tiptap/react'
import { Link2, Unlink } from 'lucide-react'

import { useEditorContext } from './editor-context'

export function EditorLinkControl() {
  const { editor, isDisabled } = useEditorContext()
  const [isOpen, setIsOpen] = useState(false)
  const [url, setUrl] = useState('')
  const state = useEditorState({
    editor,
    selector: ({ editor: currentEditor }) =>
      currentEditor ? { isActive: currentEditor.isActive('link') } : null,
  })

  if (!editor) return null

  const isActive = state?.isActive ?? false

  const open = (nextOpen: boolean) => {
    setIsOpen(nextOpen)
    if (nextOpen) setUrl(editor.getAttributes('link').href ?? '')
  }

  const apply = () => {
    const href = url.trim()
    if (!href) {
      editor.chain().focus().unsetLink().run()
    } else {
      editor.chain().focus().extendMarkRange('link').setLink({ href }).run()
    }
    setIsOpen(false)
  }

  return (
    <Popover isOpen={isOpen} onOpenChange={open}>
      <Popover.Trigger>
        <Button
          isIconOnly
          size="sm"
          variant="ghost"
          aria-label="Thêm liên kết"
          isDisabled={isDisabled}
          className={
            isActive ? 'bg-slate-200 text-slate-950' : 'text-slate-500'
          }
        >
          <Link2 className="size-4" />
        </Button>
      </Popover.Trigger>
      <Popover.Content placement="bottom">
        <Popover.Dialog className="p-3 w-80">
          <Popover.Heading className="mb-2 text-sm font-semibold">
            Liên kết
          </Popover.Heading>
          <Input
            aria-label="URL liên kết"
            placeholder="https://example.com"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') apply()
            }}
            className="w-full"
          />
          <div className="flex justify-end gap-2 mt-3">
            {isActive ? (
              <Button
                size="sm"
                variant="ghost"
                onPress={() => {
                  editor.chain().focus().unsetLink().run()
                  setIsOpen(false)
                }}
              >
                <Unlink className="size-4" /> Gỡ link
              </Button>
            ) : null}
            <Button size="sm" onPress={apply}>
              Áp dụng
            </Button>
          </div>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  )
}
