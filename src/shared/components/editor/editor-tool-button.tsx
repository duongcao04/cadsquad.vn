import { Button, Tooltip } from '@heroui/react'
import { useEditorState } from '@tiptap/react'

import type { ReactNode } from 'react'

import type { EditorAction } from './editor-actions'

import { editorCx } from './_utils/class-names'
import { EDITOR_ACTIONS } from './editor-actions'
import { useEditorContext } from './editor-context'

type EditorToolButtonProps = {
  label: string
  children: ReactNode
  onPress: () => void
  isActive?: boolean
  isDisabled?: boolean
}

export function EditorToolButton({
  label,
  children,
  onPress,
  isActive,
  isDisabled,
}: EditorToolButtonProps) {
  return (
    <Tooltip delay={350}>
      <Tooltip.Trigger>
        <Button
          isIconOnly
          size="sm"
          variant="ghost"
          aria-label={label}
          isDisabled={isDisabled}
          onPress={onPress}
          className={editorCx(
            'size-8 min-w-8 rounded-lg text-slate-500',
            isActive && 'bg-slate-200 text-slate-950',
          )}
        >
          {children}
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Content>{label}</Tooltip.Content>
    </Tooltip>
  )
}

type EditorButtonProps = {
  /** Preset lệnh có sẵn (bold, heading1, alignCenter…). */
  action?: EditorAction
  /** Ghi đè nhãn tooltip/aria-label của preset, bắt buộc khi không có action. */
  label?: string
  isActive?: boolean
  isDisabled?: boolean
  /** Ẩn hẳn button thay vì disable khi lệnh không chạy được. */
  hideWhenUnavailable?: boolean
  /** Ghi đè hành vi của preset, bắt buộc khi không có action. */
  onPress?: () => void
  /** Ghi đè icon của preset. */
  children?: ReactNode
}

export function EditorButton({
  action,
  label,
  isActive,
  isDisabled,
  hideWhenUnavailable,
  onPress,
  children,
}: EditorButtonProps) {
  const { editor, isDisabled: isEditorDisabled } = useEditorContext()
  const preset = action ? EDITOR_ACTIONS[action] : undefined
  const state = useEditorState({
    editor,
    selector: ({ editor: currentEditor }) =>
      currentEditor && preset
        ? {
            isActive: preset.isActive?.(currentEditor) ?? false,
            canRun: preset.canRun?.(currentEditor) ?? true,
          }
        : null,
  })

  if (!editor) return null
  if (hideWhenUnavailable && state && !state.canRun) return null

  const Icon = preset?.icon

  return (
    <EditorToolButton
      label={label ?? preset?.label ?? ''}
      isActive={isActive ?? state?.isActive}
      isDisabled={
        isDisabled ?? (isEditorDisabled || !(state?.canRun ?? true))
      }
      onPress={onPress ?? (() => preset?.run(editor))}
    >
      {children ?? (Icon ? <Icon className="size-4" /> : null)}
    </EditorToolButton>
  )
}
