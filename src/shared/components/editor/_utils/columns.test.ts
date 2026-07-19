// @vitest-environment jsdom
import { Editor } from '@tiptap/core'
import { describe, expect, it } from 'vitest'

import { createEditorExtensions } from './extensions'
import { parseColumnWidths, serializeColumnWidths } from './column-widths'

function createEditor(content = '<p>Xin chào</p>') {
  return new Editor({
    extensions: createEditorExtensions('placeholder'),
    content,
  })
}

function countColumns(html: string) {
  return (html.match(/data-type="column"/g) ?? []).length
}

describe('setColumns', () => {
  it('bọc khối hiện tại vào layout 2 cột', () => {
    const editor = createEditor('<p>Xin chào</p>')
    editor.commands.setColumns(2)
    const html = editor.getHTML()
    expect(html).toContain('data-type="columns"')
    expect(html).toContain('data-count="2"')
    expect(html).toContain('data-widths="50.00,50.00"')
    expect(html).toContain('data-horizontal-align="left"')
    expect(html).toContain('data-vertical-align="top"')
    expect(html).toMatch(/grid-template-columns:\s*minmax\(0,\s*50fr\)/)
    expect(html).toContain('Xin chào')
    expect(countColumns(html)).toBe(2)
    expect(editor.isActive('columns', { count: 2 })).toBe(true)
  })

  it('lưu options căn ngang và dọc vào HTML', () => {
    const editor = createEditor('<p>Nội dung</p>')
    editor.commands.setColumns(2)
    editor.commands.updateAttributes('columns', {
      horizontalAlign: 'right',
      verticalAlign: 'bottom',
    })
    const html = editor.getHTML()
    expect(html).toContain('data-horizontal-align="right"')
    expect(html).toContain('data-vertical-align="bottom"')
    expect(html).toContain('text-align: right')
    expect(html).toContain('align-items: end')
  })

  it('đổi số cột tại chỗ, dồn nội dung cột thừa khi giảm', () => {
    const editor = createEditor('<p>Một</p>')
    editor.commands.setColumns(4)
    expect(countColumns(editor.getHTML())).toBe(4)

    editor.commands.setColumns(2)
    const html = editor.getHTML()
    expect(html).toContain('data-count="2"')
    expect(countColumns(html)).toBe(2)
    expect(html).toContain('Một')
  })

  it('cho phép chèn ảnh vào trong cột', () => {
    const editor = createEditor('<p></p>')
    editor.commands.setColumns(2)
    editor.commands.setImage({ src: 'https://example.com/a.png' })
    const html = editor.getHTML()
    expect(html).toContain('data-type="columns"')
    expect(html).toContain('example.com/a.png')
  })

  it('bọc được ảnh đang chọn vào layout cột', () => {
    const editor = createEditor('<p>x</p>')
    editor.commands.setImage({ src: 'https://example.com/b.png' })
    let imagePos = -1
    editor.state.doc.descendants((node, pos) => {
      if (node.type.name === 'image') imagePos = pos
      return true
    })
    editor.commands.setNodeSelection(imagePos)
    editor.commands.setColumns(2)
    const html = editor.getHTML()
    expect(html).toContain('data-type="columns"')
    expect(html).toContain('example.com/b.png')
  })
})

describe('column widths', () => {
  it('chuẩn hoá tỷ lệ độ rộng đã lưu', () => {
    expect(serializeColumnWidths(parseColumnWidths('30,70', 2))).toBe(
      '30.00,70.00',
    )
    expect(serializeColumnWidths(parseColumnWidths('5,95', 2))).toBe(
      '50.00,50.00',
    )
  })
})

describe('unsetColumns', () => {
  it('gỡ layout cột nhưng giữ nguyên nội dung', () => {
    const editor = createEditor('<p>Nội dung</p>')
    editor.commands.setColumns(3)
    editor.commands.unsetColumns()
    const html = editor.getHTML()
    expect(html).not.toContain('data-type="columns"')
    expect(html).toContain('Nội dung')
  })
})

describe('parse HTML đã lưu', () => {
  it('round-trip qua setContent giữ nguyên cấu trúc cột', () => {
    const editor = createEditor('<p>a</p>')
    editor.commands.setColumns(3)
    const saved = editor.getHTML()

    const editor2 = createEditor(saved)
    expect(editor2.getHTML()).toBe(saved)
    expect(countColumns(editor2.getHTML())).toBe(3)
  })
})
