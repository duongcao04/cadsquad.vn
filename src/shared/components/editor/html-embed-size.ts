export const HTML_EMBED_MIN_HEIGHT = 48
export const HTML_EMBED_DEFAULT_HEIGHT = 320
export const HTML_EMBED_MAX_HEIGHT = 1200

export function clampHtmlEmbedHeight(value: unknown): number {
  const height = Number(value)
  if (!Number.isFinite(height)) return HTML_EMBED_DEFAULT_HEIGHT
  return Math.min(
    HTML_EMBED_MAX_HEIGHT,
    Math.max(HTML_EMBED_MIN_HEIGHT, height),
  )
}
