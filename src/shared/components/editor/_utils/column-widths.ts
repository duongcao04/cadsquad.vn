export const MIN_COLUMN_WIDTH = 10
export const EDITOR_COLUMNS_MOBILE_QUERY = '(max-width: 767px)'

export function equalColumnWidths(count: number): Array<number> {
  const safeCount = Math.min(4, Math.max(2, Math.round(count)))
  const width = 100 / safeCount
  return Array.from({ length: safeCount }, () => width)
}

export function parseColumnWidths(
  value: unknown,
  count: number,
): Array<number> {
  const equalWidths = equalColumnWidths(count)
  const widths = String(value ?? '')
    .split(',')
    .map(Number)

  if (
    widths.length !== equalWidths.length ||
    widths.some((width) => !Number.isFinite(width) || width < MIN_COLUMN_WIDTH)
  ) {
    return equalWidths
  }

  const total = widths.reduce((sum, width) => sum + width, 0)
  if (total <= 0) return equalWidths
  return widths.map((width) => (width / total) * 100)
}

export function serializeColumnWidths(widths: Array<number>): string {
  return widths.map((width) => width.toFixed(2)).join(',')
}
