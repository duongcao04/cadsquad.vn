import { Eye } from 'lucide-react'

export function EditorHtmlPreview({ html }: { html: string }) {
  return (
    <div className="min-h-80 overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="flex h-9 items-center gap-2 border-b border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-500">
        <Eye className="size-3.5" /> Preview
      </div>
      {html.trim() ? (
        <iframe
          title="Xem trước HTML block"
          srcDoc={html}
          sandbox=""
          className="h-96 w-full border-0 bg-white"
        />
      ) : (
        <div className="grid h-72 place-items-center px-6 text-center text-sm text-slate-400">
          Nhập HTML để xem trước nội dung.
        </div>
      )}
    </div>
  )
}
