// @vitest-environment jsdom
import { Editor } from '@tiptap/core'
import { describe, expect, it } from 'vitest'

import { createEditorExtensions } from './extensions'

function createEditor(content = '<p>Xin chào</p>') {
  return new Editor({
    extensions: createEditorExtensions('placeholder'),
    content,
  })
}

describe('setLineHeight', () => {
  it('đặt line-height cho đoạn văn đang chọn', () => {
    const editor = createEditor('<p>Xin chào</p>')
    editor.commands.selectAll()
    editor.commands.setLineHeight('1.75')
    expect(editor.getHTML()).toMatch(/line-height:\s*1\.75/)
    expect(editor.getAttributes('paragraph').lineHeight).toBe('1.75')
  })

  it('đặt line-height cho heading', () => {
    const editor = createEditor('<h2>Tiêu đề</h2>')
    editor.commands.selectAll()
    editor.commands.setLineHeight('2')
    expect(editor.getHTML()).toMatch(/<h2[^>]*line-height:\s*2/)
  })

  it('unsetLineHeight trả về mặc định', () => {
    const editor = createEditor('<p>Nội dung</p>')
    editor.commands.selectAll()
    editor.commands.setLineHeight('1.5')
    editor.commands.unsetLineHeight()
    expect(editor.getHTML()).not.toContain('line-height')
  })

  it('round-trip HTML đã lưu giữ nguyên line-height', () => {
    const editor = createEditor('<p style="line-height: 1.15">a</p>')
    expect(editor.getAttributes('paragraph').lineHeight).toBe('1.15')
    expect(editor.getHTML()).toMatch(/line-height:\s*1\.15/)
  })
})
