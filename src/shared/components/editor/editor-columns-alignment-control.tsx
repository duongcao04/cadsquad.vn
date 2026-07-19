import { Button, Dropdown, Header, Label } from '@heroui/react'
import {
  AlignHorizontalJustifyCenter,
  AlignHorizontalJustifyEnd,
  AlignHorizontalJustifyStart,
  AlignVerticalJustifyCenter,
  AlignVerticalJustifyEnd,
  AlignVerticalJustifyStart,
  Check,
  PanelsTopLeft,
} from 'lucide-react'
import { useEditorState } from '@tiptap/react'

import { useEditorContext } from './editor-context'

import type { Key } from 'react-aria-components'

const HORIZONTAL_OPTIONS = [
  {
    id: 'horizontal-left',
    label: 'Căn trái',
    value: 'left',
    icon: AlignHorizontalJustifyStart,
  },
  {
    id: 'horizontal-center',
    label: 'Căn giữa',
    value: 'center',
    icon: AlignHorizontalJustifyCenter,
  },
  {
    id: 'horizontal-right',
    label: 'Căn phải',
    value: 'right',
    icon: AlignHorizontalJustifyEnd,
  },
] as const

const VERTICAL_OPTIONS = [
  {
    id: 'vertical-top',
    label: 'Căn trên',
    value: 'top',
    icon: AlignVerticalJustifyStart,
  },
  {
    id: 'vertical-center',
    label: 'Căn giữa',
    value: 'center',
    icon: AlignVerticalJustifyCenter,
  },
  {
    id: 'vertical-bottom',
    label: 'Căn dưới',
    value: 'bottom',
    icon: AlignVerticalJustifyEnd,
  },
] as const

export function EditorColumnsAlignmentControl() {
  const { editor, isDisabled } = useEditorContext()
  const state = useEditorState({
    editor,
    selector: ({ editor: currentEditor }) => {
      if (!currentEditor?.isActive('columns')) return null
      const attrs = currentEditor.getAttributes('columns')
      return {
        horizontalAlign: attrs.horizontalAlign ?? 'left',
        verticalAlign: attrs.verticalAlign ?? 'top',
      }
    },
  })

  if (!editor) return null

  const handleAction = (key: Key) => {
    const horizontal = HORIZONTAL_OPTIONS.find((option) => option.id === key)
    if (horizontal) {
      editor
        .chain()
        .focus()
        .updateAttributes('columns', { horizontalAlign: horizontal.value })
        .run()
      return
    }

    const vertical = VERTICAL_OPTIONS.find((option) => option.id === key)
    if (vertical) {
      editor
        .chain()
        .focus()
        .updateAttributes('columns', { verticalAlign: vertical.value })
        .run()
    }
  }

  return (
    <Dropdown>
      <Button
        isIconOnly
        size="sm"
        variant="ghost"
        aria-label="Căn nội dung trong columns"
        isDisabled={isDisabled || !state}
        className="size-8 min-w-8 rounded-lg text-slate-500"
      >
        <PanelsTopLeft className="size-4" />
      </Button>
      <Dropdown.Popover className="min-w-52">
        <Dropdown.Menu onAction={handleAction}>
          <Dropdown.Section>
            <Header>Căn theo chiều ngang</Header>
            {HORIZONTAL_OPTIONS.map((option) => (
              <Dropdown.Item
                key={option.id}
                id={option.id}
                textValue={option.label}
              >
                <option.icon className="size-4 text-muted" />
                <Label>{option.label}</Label>
                {state?.horizontalAlign === option.value && (
                  <Check className="ms-auto size-4" />
                )}
              </Dropdown.Item>
            ))}
          </Dropdown.Section>
          <Dropdown.Section>
            <Header>Căn theo chiều dọc</Header>
            {VERTICAL_OPTIONS.map((option) => (
              <Dropdown.Item
                key={option.id}
                id={option.id}
                textValue={option.label}
              >
                <option.icon className="size-4 text-muted" />
                <Label>{option.label}</Label>
                {state?.verticalAlign === option.value && (
                  <Check className="ms-auto size-4" />
                )}
              </Dropdown.Item>
            ))}
          </Dropdown.Section>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  )
}
