import { useEffect, useRef, useState } from 'react'
import { Button, ButtonGroup, Modal, TextArea } from '@heroui/react'
import { NodeViewWrapper } from '@tiptap/react'
import {
  CodeXml,
  Columns2,
  Eye,
  Minimize2,
  Pencil,
  Trash2,
  TriangleAlert,
} from 'lucide-react'

import type { NodeViewProps } from '@tiptap/react'

import { editorCx } from './_utils/class-names'
import { containsExecutableHtml } from './html-safety'
import { EditorHtmlPreview } from './editor-html-preview'
import {
  clampHtmlEmbedHeight,
  HTML_EMBED_MAX_HEIGHT,
  HTML_EMBED_MIN_HEIGHT,
} from './html-embed-size'

type HtmlViewMode = 'edit' | 'split' | 'preview'

export function EditorHtmlEmbedView({
  deleteNode,
  node,
  selected,
  updateAttributes,
}: NodeViewProps) {
  const html = String(node.attrs.html ?? '')
  const height = clampHtmlEmbedHeight(node.attrs.height)
  const resizeRef = useRef<HTMLDivElement | null>(null)
  const savedHeightRef = useRef(height)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [draftHtml, setDraftHtml] = useState(html)
  const [viewMode, setViewMode] = useState<HtmlViewMode>('edit')
  const hasExecutableHtml = containsExecutableHtml(draftHtml)

  useEffect(() => {
    savedHeightRef.current = height
  }, [height])

  useEffect(() => {
    const element = resizeRef.current
    if (!element) return

    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return
      const nextHeight = Math.round(
        clampHtmlEmbedHeight(entry.contentRect.height),
      )
      if (nextHeight === savedHeightRef.current) return
      savedHeightRef.current = nextHeight
      updateAttributes({ height: nextHeight })
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [updateAttributes])

  return (
    <NodeViewWrapper
      className={editorCx(
        'not-prose my-6 overflow-hidden rounded-xl border bg-white',
        selected
          ? 'border-indigo-500 ring-2 ring-indigo-500/20'
          : 'border-slate-200',
      )}
      contentEditable={false}
    >
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-3 py-2">
        <span className="flex items-center gap-2 text-xs font-semibold text-slate-600">
          <CodeXml className="size-4" /> HTML block
        </span>
        <span className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => updateAttributes({ height: HTML_EMBED_MIN_HEIGHT })}
            aria-label="Thu gọn HTML block còn một dòng"
            title="Chiều cao 1 dòng"
            className="grid size-7 place-items-center rounded-md text-slate-400 hover:bg-slate-200 hover:text-slate-600"
          >
            <Minimize2 className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              setDraftHtml(html)
              setViewMode('edit')
              setIsEditOpen(true)
            }}
            aria-label="Sửa HTML block"
            className="grid size-7 place-items-center rounded-md text-slate-400 hover:bg-indigo-50 hover:text-indigo-600"
          >
            <Pencil className="size-4" />
          </button>
          <button
            type="button"
            onClick={deleteNode}
            aria-label="Xóa HTML block"
            className="grid size-7 place-items-center rounded-md text-slate-400 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="size-4" />
          </button>
        </span>
      </div>

      <div
        ref={resizeRef}
        className="resize-y overflow-hidden"
        style={{
          height,
          minHeight: HTML_EMBED_MIN_HEIGHT,
          maxHeight: HTML_EMBED_MAX_HEIGHT,
        }}
      >
        <iframe
          title="HTML block preview"
          srcDoc={html}
          sandbox=""
          className="h-[calc(100%_-_24px)] w-full border-0 bg-white"
        />
        <div className="flex h-6 items-center justify-end border-t border-slate-100 bg-slate-50 px-3 text-[10px] text-slate-400">
          Kéo góc dưới bên phải để resize · {height}px
        </div>
      </div>

      <Modal.Backdrop isOpen={isEditOpen} onOpenChange={setIsEditOpen}>
        <Modal.Container placement="auto">
          <Modal.Dialog
            className={viewMode === 'split' ? 'sm:max-w-6xl' : 'sm:max-w-3xl'}
          >
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-indigo-50 text-indigo-600">
                <CodeXml className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Sửa HTML block</Modal.Heading>
            </Modal.Header>
            <Modal.Body className="gap-4">
              <div className="flex gap-2 rounded-lg border border-sky-200 bg-sky-50 p-3 text-sm text-sky-800">
                <TriangleAlert className="mt-0.5 size-4 shrink-0" />
                <p>
                  Hỗ trợ HTML, &lt;style&gt; và inline style. Không cho phép
                  JavaScript thực thi.
                </p>
              </div>
              <div className="my-4 flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-slate-700">
                  Chế độ hiển thị
                </span>
                <ButtonGroup size="sm" variant="secondary">
                  <Button
                    aria-pressed={viewMode === 'edit'}
                    className={
                      viewMode === 'edit' ? 'bg-slate-200' : 'bg-slate-50'
                    }
                    onPress={() => setViewMode('edit')}
                  >
                    <CodeXml className="size-4" /> HTML
                  </Button>
                  <Button
                    aria-pressed={viewMode === 'split'}
                    className={
                      viewMode === 'split' ? 'bg-slate-200' : 'bg-slate-50'
                    }
                    onPress={() => setViewMode('split')}
                  >
                    <ButtonGroup.Separator />
                    <Columns2 className="size-4" /> Song song
                  </Button>
                  <Button
                    aria-pressed={viewMode === 'preview'}
                    className={
                      viewMode === 'preview' ? 'bg-slate-200' : 'bg-slate-50'
                    }
                    onPress={() => setViewMode('preview')}
                  >
                    <ButtonGroup.Separator />
                    <Eye className="size-4" /> Preview
                  </Button>
                </ButtonGroup>
              </div>
              <div
                className={
                  viewMode === 'split' ? 'grid gap-4 lg:grid-cols-2' : undefined
                }
              >
                {viewMode !== 'preview' ? (
                  <TextArea
                    aria-label="Nội dung HTML block"
                    value={draftHtml}
                    onChange={(event) => setDraftHtml(event.target.value)}
                    rows={18}
                    className="min-h-80 w-full resize-y font-mono text-sm leading-6"
                  />
                ) : null}
                {viewMode !== 'edit' ? (
                  <EditorHtmlPreview html={draftHtml} />
                ) : null}
              </div>
              {hasExecutableHtml ? (
                <p className="text-sm font-medium text-red-600">
                  Hãy xoá script, thuộc tính on* hoặc URL javascript: trước khi
                  lưu.
                </p>
              ) : null}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onPress={() => setIsEditOpen(false)}>
                Hủy
              </Button>
              <Button
                isDisabled={!draftHtml.trim() || hasExecutableHtml}
                onPress={() => {
                  updateAttributes({ html: draftHtml })
                  setIsEditOpen(false)
                }}
              >
                Lưu HTML
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </NodeViewWrapper>
  )
}
