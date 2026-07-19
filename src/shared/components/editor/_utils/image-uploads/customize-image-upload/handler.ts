import type { EditorImageDelete, EditorImageUpload } from '../../../types';

import { safeImageName } from '../../image-files';

type CustomImageUploadOptions = {
  /** API endpoint nhận ảnh upload. */
  endpoint: string;
  method?: 'POST' | 'PUT';
  /** Tên field chứa file trong FormData. Mặc định `file`. */
  fieldName?: string;
  /** Headers tĩnh hoặc hàm trả về headers (vd. gắn token mới nhất). */
  headers?: HeadersInit | (() => HeadersInit | Promise<HeadersInit>);
  /** Các field phụ gửi kèm trong FormData (vd. folder, ownerId). */
  extraFields?: Record<string, string>;
  /** Gửi kèm cookie khi endpoint khác origin. */
  credentials?: RequestCredentials;
  /** Lấy URL ảnh từ response. Mặc định đọc `url` từ JSON trả về. */
  getImageUrl?: (response: Response) => string | Promise<string>;
};

async function defaultGetImageUrl(response: Response) {
  const data: unknown = await response.json();
  const url =
    data && typeof data === 'object' && 'url' in data ? data.url : undefined;

  if (typeof url !== 'string' || !url) {
    throw new Error('Response không chứa trường `url` hợp lệ.');
  }
  return url;
}

export function createCustomImageUpload({
  endpoint,
  method = 'POST',
  fieldName = 'file',
  headers,
  extraFields,
  credentials,
  getImageUrl = defaultGetImageUrl,
}: CustomImageUploadOptions): EditorImageUpload {
  return async (file: File) => {
    const formData = new FormData();
    formData.append(fieldName, file, safeImageName(file.name));
    for (const [key, value] of Object.entries(extraFields ?? {})) {
      formData.append(key, value);
    }

    const response = await fetch(endpoint, {
      method,
      headers: typeof headers === 'function' ? await headers() : headers,
      credentials,
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Tải ảnh lên thất bại (HTTP ${response.status}).`);
    }

    return getImageUrl(response);
  };
}

type CustomImageDeleteOptions = {
  /** API endpoint nhận yêu cầu xoá ảnh. Body là JSON `{ url }`. */
  endpoint: string;
  method?: 'POST' | 'DELETE';
  /** Headers tĩnh hoặc hàm trả về headers (vd. gắn token mới nhất). */
  headers?: HeadersInit | (() => HeadersInit | Promise<HeadersInit>);
  /** Gửi kèm cookie khi endpoint khác origin. */
  credentials?: RequestCredentials;
};

export function createCustomImageDelete({
  endpoint,
  method = 'DELETE',
  headers,
  credentials,
}: CustomImageDeleteOptions): EditorImageDelete {
  return async (src: string) => {
    const requestHeaders = new Headers(
      typeof headers === 'function' ? await headers() : headers,
    );
    if (!requestHeaders.has('Content-Type')) {
      requestHeaders.set('Content-Type', 'application/json');
    }

    const response = await fetch(endpoint, {
      method,
      headers: requestHeaders,
      credentials,
      body: JSON.stringify({ url: src }),
    });

    if (!response.ok) {
      throw new Error(`Xoá ảnh thất bại (HTTP ${response.status}).`);
    }
  };
}
