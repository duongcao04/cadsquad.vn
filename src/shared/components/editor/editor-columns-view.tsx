import { GripVertical } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { NodeViewContent, NodeViewWrapper } from '@tiptap/react'

import { useMediaQuery } from '#/hooks/use-media-query'

import {
  EDITOR_COLUMNS_MOBILE_QUERY,
  MIN_COLUMN_WIDTH,
  parseColumnWidths,
  serializeColumnWidths,
} from './_utils/column-widths'

import type { NodeViewProps } from '@tiptap/react'

export function EditorColumnsView({
  node,
  selected,
  updateAttributes,
}: NodeViewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery(EDITOR_COLUMNS_MOBILE_QUERY)
  const [widths, setWidths] = useState(() =>
    parseColumnWidths(node.attrs.widths, node.childCount),
  )
  const widthsRef = useRef(widths)

  useEffect(() => {
    const nextWidths = parseColumnWidths(node.attrs.widths, node.childCount)
    widthsRef.current = nextWidths
    setWidths(nextWidths)

    // Tiptap v3 bọc contentDOM trong một div riêng. Bỏ layout box của wrapper
    // để các node `column` trở thành grid item trực tiếp.
    const contentWrapper = containerRef.current?.querySelector<HTMLElement>(
      '[data-node-view-content-react]',
    )
    if (contentWrapper) contentWrapper.style.display = 'contents'
  }, [node.attrs.widths, node.childCount])

  const startResize = (dividerIndex: number, startX: number) => {
    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const initial = [...widthsRef.current]
    const initialLeftWidth = initial[dividerIndex]
    const initialRightWidth = initial[dividerIndex + 1]
    if (initialLeftWidth == null || initialRightWidth == null) return
    const pairWidth = initialLeftWidth + initialRightWidth
    const startPercentage = ((startX - rect.left) / rect.width) * 100

    const handlePointerMove = (event: PointerEvent) => {
      const pointerPercentage = ((event.clientX - rect.left) / rect.width) * 100
      const delta = pointerPercentage - startPercentage
      const leftWidth = Math.min(
        pairWidth - MIN_COLUMN_WIDTH,
        Math.max(MIN_COLUMN_WIDTH, initialLeftWidth + delta),
      )
      const nextWidths = [...initial]
      nextWidths[dividerIndex] = leftWidth
      nextWidths[dividerIndex + 1] = pairWidth - leftWidth
      widthsRef.current = nextWidths
      setWidths(nextWidths)
    }

    const handlePointerUp = () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
      updateAttributes({ widths: serializeColumnWidths(widthsRef.current) })
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
  }

  let accumulatedWidth = 0

  return (
    <NodeViewWrapper
      ref={containerRef}
      className={`group relative my-6 rounded-lg ${
        selected ? 'ring-2 ring-primary/30' : ''
      }`}
    >
      <NodeViewContent
        as="div"
        className="gap-6"
        style={{
          display: 'grid',
          width: '100%',
          textAlign: node.attrs.horizontalAlign,
          alignItems:
            node.attrs.verticalAlign === 'bottom'
              ? 'end'
              : node.attrs.verticalAlign === 'center'
                ? 'center'
                : 'start',
          gridTemplateColumns: isMobile
            ? 'minmax(0, 1fr)'
            : widths.map((width) => `minmax(0, ${width}fr)`).join(' '),
        }}
      />

      {!isMobile &&
        widths.slice(0, -1).map((width, index) => {
          accumulatedWidth += width
          return (
            <button
              key={index}
              type="button"
              aria-label={`Thay đổi độ rộng cột ${index + 1} và ${index + 2}`}
              contentEditable={false}
              className="absolute inset-y-0 z-10 flex w-5 -translate-x-1/2 touch-none cursor-col-resize items-center justify-center opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
              style={{ left: `${accumulatedWidth}%` }}
              onPointerDown={(event) => {
                event.preventDefault()
                startResize(index, event.clientX)
              }}
            >
              <span className="flex h-10 w-4 items-center justify-center rounded-full border bg-background text-muted-foreground shadow-sm">
                <GripVertical className="size-3" />
              </span>
            </button>
          )
        })}
    </NodeViewWrapper>
  )
}
