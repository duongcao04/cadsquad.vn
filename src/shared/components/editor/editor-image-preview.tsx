// Fullscreen image lightbox with flip / rotate / zoom / drag-pan controls,
// modeled on antd's Image preview but built with Tailwind + lucide only.
// Render it conditionally: {open ? <ImagePreview src={url} onClose={…} /> : null}
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  FlipHorizontal2,
  FlipVertical2,
  RotateCcw,
  RotateCw,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react'

import { cx } from '#/components/ui/primitives'

import type { PointerEvent as ReactPointerEvent, ReactNode } from 'react'

const MIN_SCALE = 1
const MAX_SCALE = 6
const SCALE_STEP = 0.5

export function EditorImagePreview({
  src,
  alt = '',
  onClose,
}: {
  src: string
  alt?: string
  onClose: () => void
}) {
  const [scale, setScale] = useState(1)
  const [rotate, setRotate] = useState(0)
  const [flipX, setFlipX] = useState(false)
  const [flipY, setFlipY] = useState(false)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const dragRef = useRef<{
    pointerId: number
    startX: number
    startY: number
    baseX: number
    baseY: number
  } | null>(null)

  useEffect(() => {
    setScale(1)
    setRotate(0)
    setFlipX(false)
    setFlipY(false)
    setOffset({ x: 0, y: 0 })
  }, [src])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  const zoomBy = (delta: number) => {
    setScale((current) => {
      const next = Math.min(MAX_SCALE, Math.max(MIN_SCALE, current + delta))
      if (next === MIN_SCALE) setOffset({ x: 0, y: 0 })
      return next
    })
  }

  const onPointerDown = (event: ReactPointerEvent<HTMLImageElement>) => {
    event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      baseX: offset.x,
      baseY: offset.y,
    }
    setIsDragging(true)
  }

  const onPointerMove = (event: ReactPointerEvent<HTMLImageElement>) => {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    setOffset({
      x: drag.baseX + (event.clientX - drag.startX),
      y: drag.baseY + (event.clientY - drag.startY),
    })
  }

  const onPointerUp = (event: ReactPointerEvent<HTMLImageElement>) => {
    if (dragRef.current?.pointerId !== event.pointerId) return
    dragRef.current = null
    setIsDragging(false)
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Xem ảnh"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={onClose}
      onWheel={(event) => zoomBy(event.deltaY < 0 ? SCALE_STEP : -SCALE_STEP)}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Đóng"
        className="absolute top-4 right-4 grid size-10 place-items-center rounded-full bg-black/50 text-white/80 hover:text-white"
      >
        <X className="size-5" />
      </button>

      <img
        src={src}
        alt={alt}
        draggable={false}
        onClick={(event) => event.stopPropagation()}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px) rotate(${rotate}deg) scale(${
            flipX ? -scale : scale
          }, ${flipY ? -scale : scale})`,
          touchAction: 'none',
        }}
        className={cx(
          'max-h-[85vh] max-w-[90vw] object-contain select-none',
          isDragging ? 'cursor-grabbing' : 'cursor-grab transition-transform',
        )}
      />

      <div
        onClick={(event) => event.stopPropagation()}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-black/60 px-4 py-1.5"
      >
        <ToolButton label="Lật dọc" onPress={() => setFlipY((v) => !v)}>
          <FlipVertical2 className="size-4.5" />
        </ToolButton>
        <ToolButton label="Lật ngang" onPress={() => setFlipX((v) => !v)}>
          <FlipHorizontal2 className="size-4.5" />
        </ToolButton>
        <ToolButton label="Xoay trái" onPress={() => setRotate((d) => d - 90)}>
          <RotateCcw className="size-4.5" />
        </ToolButton>
        <ToolButton label="Xoay phải" onPress={() => setRotate((d) => d + 90)}>
          <RotateCw className="size-4.5" />
        </ToolButton>
        <ToolButton
          label="Thu nhỏ"
          onPress={() => zoomBy(-SCALE_STEP)}
          isDisabled={scale <= MIN_SCALE}
        >
          <ZoomOut className="size-4.5" />
        </ToolButton>
        <ToolButton
          label="Phóng to"
          onPress={() => zoomBy(SCALE_STEP)}
          isDisabled={scale >= MAX_SCALE}
        >
          <ZoomIn className="size-4.5" />
        </ToolButton>
      </div>
    </div>,
    document.body,
  )
}

function ToolButton({
  children,
  label,
  onPress,
  isDisabled = false,
}: {
  children: ReactNode
  label: string
  onPress: () => void
  isDisabled?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onPress}
      disabled={isDisabled}
      aria-label={label}
      title={label}
      className={cx(
        'grid size-9 place-items-center rounded-full',
        isDisabled
          ? 'cursor-not-allowed text-white/30'
          : 'text-white/80 hover:bg-white/10 hover:text-white',
      )}
    >
      {children}
    </button>
  )
}
