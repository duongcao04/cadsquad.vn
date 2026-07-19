import type { CSSProperties } from 'react'

/** Bảng màu viền có sẵn cho ảnh. */
export const IMAGE_BORDER_COLORS = [
  { value: '#e2e8f0', label: 'Xám nhạt' },
  { value: '#334155', label: 'Xám đậm' },
  { value: '#0f172a', label: 'Đen' },
  { value: '#ef4444', label: 'Đỏ' },
  { value: '#f97316', label: 'Cam' },
  { value: '#eab308', label: 'Vàng' },
  { value: '#22c55e', label: 'Xanh lá' },
  { value: '#3b82f6', label: 'Xanh dương' },
  { value: '#8b5cf6', label: 'Tím' },
  { value: '#ec4899', label: 'Hồng' },
] as const

/** Giá trị cũ đã lưu trong HTML trước khi hỗ trợ chọn màu. */
const LEGACY_BORDERS: Record<string, string> = {
  light: '#e2e8f0',
  dark: '#334155',
}

const HEX_COLOR_PATTERN = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/

/**
 * Chuẩn hoá giá trị viền về mã màu hex, trả `null` nếu không hợp lệ.
 * Chấp nhận cả giá trị legacy `light`/`dark` và hex thiếu dấu `#`.
 */
export function normalizeImageBorder(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const raw = value.trim().toLowerCase()
  if (!raw) return null
  const legacy = LEGACY_BORDERS[raw]
  if (legacy) return legacy
  const hex = raw.startsWith('#') ? raw : `#${raw}`
  return HEX_COLOR_PATTERN.test(hex) ? hex : null
}

/**
 * Style viền dạng inline để HTML render đúng ở cả editor lẫn trang public
 * (không phụ thuộc CSS ngoài).
 */
export function imageBorderCss(value: unknown): string | null {
  const color = normalizeImageBorder(value)
  return color ? `border:1px solid ${color}` : null
}

export function imageBorderStyle(value: unknown): CSSProperties | undefined {
  const color = normalizeImageBorder(value)
  return color ? { border: `1px solid ${color}` } : undefined
}
