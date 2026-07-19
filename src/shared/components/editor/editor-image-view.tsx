import { useContext, useRef, useState } from 'react'
import { Button, Spinner } from '@heroui/react'
import { NodeViewWrapper } from '@tiptap/react'
import { Check, Crop, Maximize2, Trash2, X } from 'lucide-react'

import type { NodeViewProps } from '@tiptap/react'

import { editorCx } from './_utils/class-names'
import { imageBorderStyle, normalizeImageBorder } from './_utils/image-border'
import { EditorContext } from './editor-context'
import { EditorImageBorderControl } from './editor-image-border-control'
import { EditorImagePreview } from './editor-image-preview'

const MIN_IMAGE_WIDTH = 80
const MIN_CROP_SIZE = 32

type CropRect = { x: number; y: number; width: number; height: number }
type CropMode = 'move' | 'nw' | 'ne' | 'sw' | 'se'

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function computeCrop(
  initial: CropRect,
  mode: CropMode,
  dx: number,
  dy: number,
  bounds: { width: number; height: number },
): CropRect {
  if (mode === 'move') {
    return {
      ...initial,
      x: clamp(initial.x + dx, 0, bounds.width - initial.width),
      y: clamp(initial.y + dy, 0, bounds.height - initial.height),
    }
  }

  let { x, y, width, height } = initial
  const right = initial.x + initial.width
  const bottom = initial.y + initial.height

  if (mode.includes('w')) {
    x = clamp(initial.x + dx, 0, right - MIN_CROP_SIZE)
    width = right - x
  }
  if (mode.includes('e')) {
    width = clamp(initial.width + dx, MIN_CROP_SIZE, bounds.width - initial.x)
  }
  if (mode.includes('n')) {
    y = clamp(initial.y + dy, 0, bottom - MIN_CROP_SIZE)
    height = bottom - y
  }
  if (mode.includes('s')) {
    height = clamp(
      initial.height + dy,
      MIN_CROP_SIZE,
      bounds.height - initial.y,
    )
  }

  return { x, y, width, height }
}

export function EditorImageView({
  node,
  editor,
  selected,
  updateAttributes,
  deleteNode,
}: NodeViewProps) {
  const context = useContext(EditorContext)
  const figureRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const draftWidthRef = useRef<number | null>(null)
  const [draftWidth, setDraftWidth] = useState<number | null>(null)
  const [cropRect, setCropRect] = useState<CropRect | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const isEditable = editor.isEditable
  const isCropping = cropRect !== null
  const width = draftWidth ?? (node.attrs.width as number | null) ?? undefined
  const border = imageBorderStyle(node.attrs.border)

  const startResize = (event: React.PointerEvent, direction: 1 | -1) => {
    event.preventDefault()
    event.stopPropagation()
    const startX = event.clientX
    const startWidth = imageRef.current?.clientWidth ?? 0
    const maxWidth =
      figureRef.current?.parentElement?.clientWidth ?? Number.POSITIVE_INFINITY

    const onMove = (moveEvent: PointerEvent) => {
      const delta = direction * (moveEvent.clientX - startX)
      const next = clamp(
        Math.round(startWidth + delta),
        MIN_IMAGE_WIDTH,
        maxWidth,
      )
      draftWidthRef.current = next
      setDraftWidth(next)
    }
    const onUp = () => {
      window.removeEventListener('pointermove', onMove)
      if (draftWidthRef.current !== null) {
        updateAttributes({ width: draftWidthRef.current })
      }
      draftWidthRef.current = null
      setDraftWidth(null)
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp, { once: true })
  }

  const startCrop = () => {
    const image = imageRef.current
    if (!image) return
    setCropRect({
      x: 0,
      y: 0,
      width: image.clientWidth,
      height: image.clientHeight,
    })
  }

  const startCropDrag = (event: React.PointerEvent, mode: CropMode) => {
    event.preventDefault()
    event.stopPropagation()
    const image = imageRef.current
    const initial = cropRect
    if (!image || !initial) return

    const startX = event.clientX
    const startY = event.clientY
    const bounds = { width: image.clientWidth, height: image.clientHeight }

    const onMove = (moveEvent: PointerEvent) => {
      setCropRect(
        computeCrop(
          initial,
          mode,
          moveEvent.clientX - startX,
          moveEvent.clientY - startY,
          bounds,
        ),
      )
    }
    const onUp = () => window.removeEventListener('pointermove', onMove)

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp, { once: true })
  }

  const applyCrop = async () => {
    const image = imageRef.current
    if (!image || !cropRect || !context) return

    setIsSaving(true)
    try {
      const source = new window.Image()
      source.crossOrigin = 'anonymous'
      source.src = node.attrs.src as string
      await source.decode()

      const scaleX = source.naturalWidth / image.clientWidth
      const scaleY = source.naturalHeight / image.clientHeight
      const canvas = document.createElement('canvas')
      canvas.width = Math.max(1, Math.round(cropRect.width * scaleX))
      canvas.height = Math.max(1, Math.round(cropRect.height * scaleY))

      const canvasContext = canvas.getContext('2d')
      if (!canvasContext) throw new Error('Không thể khởi tạo canvas.')
      canvasContext.drawImage(
        source,
        cropRect.x * scaleX,
        cropRect.y * scaleY,
        cropRect.width * scaleX,
        cropRect.height * scaleY,
        0,
        0,
        canvas.width,
        canvas.height,
      )

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, 'image/webp', 0.92),
      )
      if (!blob) throw new Error('Không thể tạo ảnh đã cắt.')

      const file = new File([blob], `cropped-${Date.now()}.webp`, {
        type: 'image/webp',
      })
      const previousSrc = node.attrs.src as string
      const src = await context.imageUpload.uploadFile(file)
      updateAttributes({ src, width: Math.round(cropRect.width) })
      setCropRect(null)
      if (src !== previousSrc) {
        void context.imageUpload.deleteImage(previousSrc)
      }
    } catch (reason) {
      context.imageUpload.setError(
        reason instanceof Error ? reason.message : 'Không thể cắt ảnh.',
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <NodeViewWrapper
      ref={figureRef}
      className="group relative mx-auto my-6 w-fit max-w-full"
      data-drag-handle
    >
      <img
        ref={imageRef}
        src={node.attrs.src as string}
        alt={(node.attrs.alt as string | null) ?? ''}
        title={(node.attrs.title as string | null) ?? undefined}
        draggable={false}
        className={editorCx(
          'h-auto max-w-full rounded-xl',
          selected && !isCropping && 'ring-2 ring-indigo-400 ring-offset-2',
          !isEditable && 'cursor-zoom-in',
        )}
        style={{
          ...(width ? { width: `${width}px` } : undefined),
          ...border,
        }}
        onClick={() => {
          if (!isEditable) setIsPreviewOpen(true)
        }}
        onDoubleClick={() => {
          if (!isCropping) setIsPreviewOpen(true)
        }}
      />

      {isEditable && !isCropping ? (
        <>
          {/* Tay kéo resize hai bên */}
          <span
            role="presentation"
            onPointerDown={(event) => startResize(event, -1)}
            className="absolute top-1/2 left-1 h-8 w-1.5 -translate-y-1/2 cursor-ew-resize rounded-full bg-slate-900/60 opacity-0 transition group-hover:opacity-100"
          />
          <span
            role="presentation"
            onPointerDown={(event) => startResize(event, 1)}
            className="absolute top-1/2 right-1 h-8 w-1.5 -translate-y-1/2 cursor-ew-resize rounded-full bg-slate-900/60 opacity-0 transition group-hover:opacity-100"
          />

          {/* Toolbar hiện khi hover */}
          <div className="absolute top-2 right-2 flex gap-1 rounded-lg bg-slate-900/70 p-1 opacity-0 shadow-sm backdrop-blur transition group-hover:opacity-100">
            <Button
              isIconOnly
              size="sm"
              variant="ghost"
              aria-label="Xem ảnh"
              className="size-7 min-w-7 text-white"
              onPress={() => setIsPreviewOpen(true)}
            >
              <Maximize2 className="size-4" />
            </Button>
            {context ? (
              <Button
                isIconOnly
                size="sm"
                variant="ghost"
                aria-label="Cắt ảnh"
                className="size-7 min-w-7 text-white"
                onPress={startCrop}
              >
                <Crop className="size-4" />
              </Button>
            ) : null}
            <EditorImageBorderControl
              border={normalizeImageBorder(node.attrs.border)}
              onChange={(nextBorder) =>
                updateAttributes({ border: nextBorder })
              }
            />
            <Button
              isIconOnly
              size="sm"
              variant="ghost"
              aria-label="Xoá ảnh"
              className="size-7 min-w-7 text-white"
              onPress={() => {
                const src = node.attrs.src as string
                deleteNode()
                void context?.imageUpload.deleteImage(src)
              }}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </>
      ) : null}

      {isCropping && cropRect ? (
        <div className="absolute inset-0 overflow-hidden rounded-xl">
          <div className="absolute inset-0 bg-slate-950/50" />
          <div
            role="presentation"
            onPointerDown={(event) => startCropDrag(event, 'move')}
            className="absolute cursor-move border-2 border-white shadow-[0_0_0_9999px_rgba(2,6,23,0.5)]"
            style={{
              left: cropRect.x,
              top: cropRect.y,
              width: cropRect.width,
              height: cropRect.height,
            }}
          >
            {(['nw', 'ne', 'sw', 'se'] as const).map((corner) => (
              <span
                key={corner}
                role="presentation"
                onPointerDown={(event) => startCropDrag(event, corner)}
                className={editorCx(
                  'absolute size-3 rounded-sm border border-slate-300 bg-white',
                  corner === 'nw' && '-top-1.5 -left-1.5 cursor-nwse-resize',
                  corner === 'ne' && '-top-1.5 -right-1.5 cursor-nesw-resize',
                  corner === 'sw' && '-bottom-1.5 -left-1.5 cursor-nesw-resize',
                  corner === 'se' &&
                    '-right-1.5 -bottom-1.5 cursor-nwse-resize',
                )}
              />
            ))}
          </div>

          <div className="absolute right-2 bottom-2 flex gap-1 rounded-lg bg-slate-900/70 p-1 backdrop-blur">
            <Button
              isIconOnly
              size="sm"
              variant="ghost"
              aria-label="Áp dụng cắt ảnh"
              className="size-7 min-w-7 text-white"
              isDisabled={isSaving}
              onPress={() => void applyCrop()}
            >
              {isSaving ? <Spinner size="sm" /> : <Check className="size-4" />}
            </Button>
            <Button
              isIconOnly
              size="sm"
              variant="ghost"
              aria-label="Huỷ cắt ảnh"
              className="size-7 min-w-7 text-white"
              isDisabled={isSaving}
              onPress={() => setCropRect(null)}
            >
              <X className="size-4" />
            </Button>
          </div>
        </div>
      ) : null}

      {isPreviewOpen ? (
        <EditorImagePreview
          src={node.attrs.src as string}
          alt={(node.attrs.alt as string | null) ?? ''}
          onClose={() => setIsPreviewOpen(false)}
        />
      ) : null}
    </NodeViewWrapper>
  )
}
