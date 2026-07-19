// @vitest-environment jsdom
import { Editor } from '@tiptap/core'
import { createRoot } from 'react-dom/client'
import { act } from 'react'
import { EditorContent } from '@tiptap/react'
import { describe, expect, it } from 'vitest'

import { createEditorExtensions } from './_utils/extensions'

describe('EditorColumnsView', () => {
  it('render các column theo chiều ngang', async () => {
    const editor = new Editor({
      extensions: createEditorExtensions('placeholder'),
      content: '<p>Nội dung</p>',
    })
    editor.commands.setColumns(3)
    const host = document.createElement('div')
    const root = createRoot(host)

    await act(async () => {
      root.render(<EditorContent editor={editor} />)
    })

    const content = host.querySelector<HTMLElement>('[data-node-view-content]')
    const contentWrapper = content?.querySelector<HTMLElement>(
      '[data-node-view-content-react]',
    )
    const columns = contentWrapper?.querySelectorAll(
      ':scope > [data-type="column"]',
    )
    expect(content?.style.display).toBe('grid')
    expect(content?.style.gridTemplateColumns).toContain('minmax')
    expect(contentWrapper?.style.display).toBe('contents')
    expect(columns).toHaveLength(3)

    await act(async () => root.unmount())
    editor.destroy()
  })
})
