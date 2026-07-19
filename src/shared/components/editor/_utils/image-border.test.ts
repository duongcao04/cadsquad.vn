// @vitest-environment jsdom
import { Editor } from '@tiptap/core'
import { describe, expect, it } from 'vitest'

import { createEditorExtensions } from './extensions'
import { normalizeImageBorder } from './image-border'

function createEditor(content = '<p></p>') {
  return new Editor({
    extensions: createEditorExtensions('placeholder'),
    content,
  })
}

function createEditorWithImage(border?: string | null) {
  const editor = createEditor()
  editor.commands.setImage({ src: 'https://example.com/a.png' })
  if (border !== undefined) {
    editor.commands.updateAttributes('image', { border })
  }
  return editor
}

describe('normalizeImageBorder', () => {
  it('chấp nhận hex 3 và 6 ký tự, có hoặc không có #', () => {
    expect(normalizeImageBorder('#3b82f6')).toBe('#3b82f6')
    expect(normalizeImageBorder('3B82F6')).toBe('#3b82f6')
    expect(normalizeImageBorder('#fff')).toBe('#fff')
  })

  it('quy đổi giá trị legacy light/dark về hex', () => {
    expect(normalizeImageBorder('light')).toBe('#e2e8f0')
    expect(normalizeImageBorder('dark')).toBe('#334155')
  })

  it('từ chối giá trị không hợp lệ', () => {
    expect(normalizeImageBorder('red')).toBeNull()
    expect(normalizeImageBorder('#12345')).toBeNull()
    expect(normalizeImageBorder('')).toBeNull()
    expect(normalizeImageBorder(null)).toBeNull()
  })
})

describe('viền ảnh', () => {
  it('mặc định không có viền', () => {
    const editor = createEditorWithImage()
    const html = editor.getHTML()
    expect(html).not.toContain('data-border')
    expect(html).not.toContain('border:')
  })

  it('màu từ bảng màu render inline style', () => {
    const editor = createEditorWithImage('#3b82f6')
    const html = editor.getHTML()
    expect(html).toContain('data-border="#3b82f6"')
    expect(html).toMatch(/border:\s*1px solid/)
  })

  it('mã màu paste tay được chuẩn hoá và render', () => {
    const editor = createEditorWithImage(normalizeImageBorder('E11D48'))
    const html = editor.getHTML()
    expect(html).toContain('data-border="#e11d48"')
    expect(html).toMatch(/border:\s*1px solid/)
  })

  it('giá trị không hợp lệ không render viền', () => {
    const editor = createEditorWithImage('not-a-color')
    const html = editor.getHTML()
    expect(html).not.toContain('data-border')
    expect(html).not.toContain('border:')
  })

  it('HTML cũ với data-border="light"/"dark" vẫn parse được', () => {
    const editor = createEditor(
      '<img src="https://example.com/a.png" data-border="light">',
    )
    expect(editor.getAttributes('image').border).toBe('#e2e8f0')
    expect(editor.getHTML()).toMatch(/border:\s*1px solid/)
  })

  it('round-trip HTML đã lưu giữ nguyên màu viền', () => {
    const editor = createEditorWithImage('#22c55e')
    const saved = editor.getHTML()

    const editor2 = createEditor(saved)
    const html = editor2.getHTML()
    expect(html).toContain('data-border="#22c55e"')
    expect(html).toMatch(/border:\s*1px solid/)
  })

  it('bỏ viền xoá style và data-border', () => {
    const editor = createEditorWithImage('#0f172a')
    editor.commands.updateAttributes('image', { border: null })
    const html = editor.getHTML()
    expect(html).not.toContain('data-border')
    expect(html).not.toContain('border:')
  })
})
