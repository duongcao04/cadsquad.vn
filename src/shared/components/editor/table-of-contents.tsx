import { useEffect, useMemo, useState } from 'react'

import { editorCx } from './_utils/class-names'
import { getHeadings } from './_utils/html-parser'

type TableOfContentsProps = {
  /** Chuỗi HTML từ editor — phải là cùng HTML đã render bằng HtmlContent. */
  html: string
  /** Lấy heading tới level này (1–6). Mặc định 3. */
  maxLevel?: number
  title?: string
  className?: string
}

export function TableOfContents({
  html,
  maxLevel = 3,
  title = 'Trên trang này',
  className,
}: TableOfContentsProps) {
  const headings = useMemo(() => getHeadings(html, maxLevel), [html, maxLevel])
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
            break
          }
        }
      },
      { rootMargin: '0px 0px -70% 0px' },
    )

    for (const heading of headings) {
      const element = document.getElementById(heading.id)
      if (element) observer.observe(element)
    }

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  const baseLevel = Math.min(...headings.map((heading) => heading.level))

  return (
    <nav aria-label={title} className={editorCx('text-sm', className)}>
      <p className="mb-2 font-bold text-slate-900">{title}</p>
      <ul className="m-0 list-none p-0">
        {headings.map((heading) => (
          <li key={heading.id} className="m-0 p-0">
            <a
              href={`#${heading.id}`}
              aria-current={activeId === heading.id ? 'location' : undefined}
              className={editorCx(
                'block border-l-2 py-1.5 pr-2 leading-snug no-underline transition-colors',
                activeId === heading.id
                  ? 'border-slate-900 font-medium text-slate-950'
                  : 'border-transparent text-slate-500 hover:text-slate-900',
              )}
              style={{
                paddingLeft: `${12 + (heading.level - baseLevel) * 14}px`,
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
