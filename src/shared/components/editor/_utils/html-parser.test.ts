import { describe, expect, it } from 'vitest'

import { getHeadings, slugifyHeading } from './html-parser'
import { containsExecutableHtml } from '../html-safety'
import {
  clampHtmlEmbedHeight,
  HTML_EMBED_DEFAULT_HEIGHT,
  HTML_EMBED_MAX_HEIGHT,
  HTML_EMBED_MIN_HEIGHT,
} from '../html-embed-size'

describe('clampHtmlEmbedHeight', () => {
  it('cho phép chiều cao một dòng và giới hạn khoảng resize', () => {
    expect(clampHtmlEmbedHeight(20)).toBe(HTML_EMBED_MIN_HEIGHT)
    expect(clampHtmlEmbedHeight(48)).toBe(48)
    expect(clampHtmlEmbedHeight(5000)).toBe(HTML_EMBED_MAX_HEIGHT)
    expect(clampHtmlEmbedHeight('invalid')).toBe(HTML_EMBED_DEFAULT_HEIGHT)
  })
})

describe('containsExecutableHtml', () => {
  it('cho phép style tag và inline style', () => {
    expect(
      containsExecutableHtml(
        '<style>.hero{color:red}</style><section style="padding: 2rem">OK</section>',
      ),
    ).toBe(false)
  })

  it('chặn script, event handler và javascript URL', () => {
    expect(containsExecutableHtml('<script>alert(1)</script>')).toBe(true)
    expect(containsExecutableHtml('<img src="x" onerror="alert(1)">')).toBe(
      true,
    )
    expect(containsExecutableHtml('<a href="javascript:alert(1)">X</a>')).toBe(
      true,
    )
  })
})

describe('slugifyHeading', () => {
  it('bỏ dấu tiếng Việt và tạo slug', () => {
    expect(slugifyHeading('Biến ý tưởng thành nội dung')).toBe(
      'bien-y-tuong-thanh-noi-dung',
    )
    expect(slugifyHeading('Đường kẻ ngang')).toBe('duong-ke-ngang')
  })

  it('fallback khi không còn ký tự hợp lệ', () => {
    expect(slugifyHeading('!!!')).toBe('heading')
  })
})

describe('getHeadings', () => {
  const html = [
    '<h1>Tiêu đề</h1>',
    '<p>đoạn văn</p>',
    '<h2>Phần <strong>một</strong></h2>',
    '<h3>Chi tiết</h3>',
    '<h2>Phần một</h2>',
    '<h4>Quá sâu</h4>',
  ].join('')

  it('trích heading tới maxLevel, khử trùng lặp id, đọc text lồng nhau', () => {
    expect(getHeadings(html, 3)).toEqual([
      { id: 'tieu-de', text: 'Tiêu đề', level: 1 },
      { id: 'phan-mot', text: 'Phần một', level: 2 },
      { id: 'chi-tiet', text: 'Chi tiết', level: 3 },
      { id: 'phan-mot-2', text: 'Phần một', level: 2 },
    ])
  })

  it('mặc định lấy tới h6', () => {
    expect(getHeadings(html)).toHaveLength(5)
  })

  it('giữ nguyên id có sẵn trong HTML', () => {
    expect(getHeadings('<h2 id="custom-id">Phần một</h2>')).toEqual([
      { id: 'custom-id', text: 'Phần một', level: 2 },
    ])
  })

  it('trả mảng rỗng khi không có heading', () => {
    expect(getHeadings('<p>chỉ có đoạn văn</p>')).toEqual([])
  })
})
