import { useState } from 'react'
import { Button, ButtonGroup, Modal, TextArea } from '@heroui/react'
import { CodeXml, Columns2, Eye, TriangleAlert } from 'lucide-react'

import { containsExecutableHtml } from './html-safety'
import { useEditorContext } from './editor-context'
import { EditorToolButton } from './editor-tool-button'
import { EditorHtmlPreview } from './editor-html-preview'

type HtmlViewMode = 'edit' | 'split' | 'preview'

export function EditorHtmlControl() {
  const { editor, isDisabled } = useEditorContext()
  const [isOpen, setIsOpen] = useState(false)
  const [html, setHtml] = useState('')
  const [viewMode, setViewMode] = useState<HtmlViewMode>('edit')
  const hasExecutableHtml = containsExecutableHtml(html)

  if (!editor) return null

  return (
    <>
      <EditorToolButton
        label="Chèn HTML"
        isDisabled={isDisabled}
        onPress={() => {
          setHtml('')
          setViewMode('edit')
          setIsOpen(true)
        }}
      >
        <CodeXml className="size-4" />
      </EditorToolButton>

      <Modal.Backdrop isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Container placement="auto">
          <Modal.Dialog
            className={viewMode === 'split' ? 'sm:max-w-6xl' : 'sm:max-w-3xl'}
          >
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-indigo-50 text-indigo-600">
                <CodeXml className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Chèn HTML block</Modal.Heading>
              <p className="text-sm text-slate-500">
                Block HTML độc lập được chèn tại vị trí con trỏ.
              </p>
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
                    aria-label="HTML block"
                    value={html}
                    onChange={(event) => setHtml(event.target.value)}
                    placeholder={
                      '<style>...</style>\n<section class="custom">...</section>'
                    }
                    rows={18}
                    className="w-full min-h-80 resize-y font-mono text-sm leading-6"
                  />
                ) : null}
                {viewMode !== 'edit' ? <EditorHtmlPreview html={html} /> : null}
              </div>
              {hasExecutableHtml ? (
                <p className="text-sm font-medium text-red-600">
                  Hãy xoá script, thuộc tính on* hoặc URL javascript: trước khi
                  chèn.
                </p>
              ) : null}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onPress={() => setIsOpen(false)}>
                Hủy
              </Button>
              <Button
                isDisabled={!html.trim() || hasExecutableHtml}
                onPress={() => {
                  editor.chain().focus().insertHtmlEmbed({ html }).run()
                  setIsOpen(false)
                  setHtml('')
                }}
              >
                Chèn HTML
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </>
  )
}
