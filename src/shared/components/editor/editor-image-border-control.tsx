import { useState } from 'react'
import { Button, Input, Popover } from '@heroui/react'
import { Square } from 'lucide-react'

import { editorCx } from './_utils/class-names'
import {
  IMAGE_BORDER_COLORS,
  normalizeImageBorder,
} from './_utils/image-border'

type EditorImageBorderControlProps = {
  /** Màu viền hiện tại của ảnh (hex) hoặc `null` nếu không viền. */
  border: string | null
  onChange: (border: string | null) => void
}

export function EditorImageBorderControl({
  border,
  onChange,
}: EditorImageBorderControlProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [hex, setHex] = useState('')
  const [hasError, setHasError] = useState(false)

  const open = (nextOpen: boolean) => {
    setIsOpen(nextOpen)
    if (nextOpen) {
      setHex(border ?? '')
      setHasError(false)
    }
  }

  const apply = (value: string | null) => {
    onChange(value)
    setIsOpen(false)
  }

  const applyHex = () => {
    const color = normalizeImageBorder(hex)
    if (!color) {
      setHasError(true)
      return
    }
    apply(color)
  }

  return (
    <Popover isOpen={isOpen} onOpenChange={open}>
      <Popover.Trigger>
        <Button
          isIconOnly
          size="sm"
          variant="ghost"
          aria-label="Viền ảnh"
          className="size-7 min-w-7 text-white"
        >
          <Square className="size-4" />
        </Button>
      </Popover.Trigger>
      <Popover.Content placement="bottom">
        <Popover.Dialog className="w-60 p-3">
          <Popover.Heading className="mb-2 text-sm font-semibold">
            Viền ảnh
          </Popover.Heading>

          <div className="grid grid-cols-5 gap-1.5">
            {IMAGE_BORDER_COLORS.map((color) => (
              <button
                key={color.value}
                type="button"
                title={color.label}
                aria-label={color.label}
                onClick={() => apply(color.value)}
                className={editorCx(
                  'size-8 cursor-pointer rounded-md border border-slate-200 transition hover:scale-110',
                  border === color.value &&
                    'ring-2 ring-indigo-500 ring-offset-1',
                )}
                style={{ backgroundColor: color.value }}
              />
            ))}
          </div>

          <div className="mt-3 w-full grid grid-cols-2 gap-2">
            <Input
              aria-label="Mã màu viền"
              className="max-w-[120px]"
              placeholder="#94a3b8"
              value={hex}
              onChange={(event) => {
                setHex(event.target.value)
                setHasError(false)
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') applyHex()
              }}
            />
            <Button fullWidth size="sm" onPress={applyHex}>
              Áp dụng
            </Button>
          </div>
          {hasError ? (
            <p className="mt-1 text-xs text-red-600">
              Mã màu không hợp lệ, ví dụ #94a3b8.
            </p>
          ) : null}

          <Button
            size="sm"
            variant="ghost"
            className="mt-2 w-full justify-start"
            onPress={() => apply(null)}
          >
            Không viền
          </Button>
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  )
}
