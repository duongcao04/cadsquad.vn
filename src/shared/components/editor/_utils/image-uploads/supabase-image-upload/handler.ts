import { safeImageName } from '../../image-files'
import { supabase } from './supabase/client'

const MEDIA_BUCKET = 'media'

export async function uploadEditorImageToSupabase(
  file: File,
  folder = 'editor',
) {
  const path = `${folder}/${Date.now()}-${crypto.randomUUID()}-${safeImageName(file.name)}`
  const { error } = await supabase.storage
    .from(MEDIA_BUCKET)
    .upload(path, file, {
      cacheControl: '3600',
      contentType: file.type,
      upsert: false,
    })

  if (error) throw error

  const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path)
  return data.publicUrl
}

export async function deleteEditorImageFromSupabase(src: string) {
  const marker = `/storage/v1/object/public/${MEDIA_BUCKET}/`
  const index = src.indexOf(marker)
  if (index === -1) return

  const path = decodeURIComponent(
    src.slice(index + marker.length).split('?')[0] ?? '',
  )
  if (!path) return
  const { error } = await supabase.storage.from(MEDIA_BUCKET).remove([path])

  if (error) throw error
}
