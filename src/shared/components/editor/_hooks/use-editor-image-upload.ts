import { useCallback, useRef, useState } from 'react';

import type { Editor } from '@tiptap/react';
import type { EditorImageDelete, EditorImageUpload } from '../types';

import {
  DEFAULT_MAX_IMAGE_SIZE,
  getImagesFromFiles,
  validateEditorImage,
} from '../_utils/image-files';
import { uploadEditorImageToSupabase } from '../_utils/image-uploads/supabase-image-upload/handler';

type UseEditorImageUploadOptions = {
  editor: Editor | null;
  uploadImage?: EditorImageUpload;
  onDeleteImage?: EditorImageDelete;
  folder?: string;
  maxSize?: number;
};

export function useEditorImageUpload({
  editor,
  uploadImage,
  onDeleteImage,
  folder = 'editor',
  maxSize = DEFAULT_MAX_IMAGE_SIZE,
}: UseEditorImageUploadOptions) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = useCallback(
    async (file: File) => {
      validateEditorImage(file, maxSize);
      return uploadImage
        ? await uploadImage(file)
        : await uploadEditorImageToSupabase(file, folder);
    },
    [folder, maxSize, uploadImage],
  );

  const uploadFiles = useCallback(
    async (files: FileList | Array<File>) => {
      const images = getImagesFromFiles(files);
      if (!editor || images.length === 0) return;

      setError(null);
      setIsUploading(true);

      try {
        for (const file of images) {
          const src = await uploadFile(file);
          editor.chain().focus().setImage({ src, alt: file.name }).run();
        }
      } catch (reason) {
        setError(
          reason instanceof Error ? reason.message : 'Không thể tải ảnh lên.',
        );
      } finally {
        setIsUploading(false);
      }
    },
    [editor, uploadFile],
  );

  const deleteImage = useCallback(
    async (src: string) => {
      if (!onDeleteImage) return;
      try {
        await onDeleteImage(src);
      } catch (reason) {
        setError(
          reason instanceof Error ? reason.message : 'Không thể xoá ảnh.',
        );
      }
    },
    [onDeleteImage],
  );

  return {
    inputRef,
    isUploading,
    error,
    setError,
    openFilePicker: () => inputRef.current?.click(),
    uploadFile,
    uploadFiles,
    deleteImage,
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) void uploadFiles(event.target.files);
      event.target.value = '';
    },
  };
}
