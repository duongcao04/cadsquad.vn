export const DEFAULT_MAX_IMAGE_SIZE = 5 * 1024 * 1024

export const ACCEPTED_IMAGE_TYPES = [
  'image/avif',
  'image/gif',
  'image/jpeg',
  'image/png',
  'image/webp',
]

export const EDITOR_IMAGE_ACCEPT = ACCEPTED_IMAGE_TYPES.join(',')

export function validateEditorImage(
  file: File,
  maxSize = DEFAULT_MAX_IMAGE_SIZE,
) {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    throw new Error('Chỉ hỗ trợ ảnh AVIF, GIF, JPEG, PNG hoặc WebP.')
  }

  if (file.size > maxSize) {
    throw new Error(`Ảnh không được vượt quá ${formatBytes(maxSize)}.`)
  }
}

export function getImagesFromFiles(files: FileList | Array<File>) {
  return Array.from(files).filter((file) => file.type.startsWith('image/'))
}

export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 ** 2) return `${Math.round(bytes / 1024)} KB`
  return `${Math.round((bytes / 1024 ** 2) * 10) / 10} MB`
}

export function safeImageName(fileName: string) {
  const extension = fileName.includes('.')
    ? fileName.split('.').pop()?.toLowerCase()
    : undefined
  const base = fileName
    .replace(/\.[^/.]+$/, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()

  return `${base || 'image'}${extension ? `.${extension}` : ''}`
}
