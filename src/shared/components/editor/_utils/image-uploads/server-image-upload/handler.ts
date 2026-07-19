import { createServerFn } from '@tanstack/react-start';

import { safeImageName } from '../../image-files';
import { UPLOAD_DIR } from './_constants';

const uploadEditorImageServerFn = createServerFn({ method: 'POST' })
  .validator((data: FormData) => {
    const file = data.get('file');
    if (!(file instanceof File) || !file.type.startsWith('image/')) {
      throw new Error('Tệp tải lên không hợp lệ.');
    }
    return { file };
  })
  .handler(async ({ data }) => {
    const { mkdir, writeFile } = await import('node:fs/promises');
    const { join } = await import('node:path');

    const directory = join(process.cwd(), UPLOAD_DIR);
    await mkdir(directory, { recursive: true });

    const fileName = `${Date.now()}-${crypto.randomUUID()}-${safeImageName(data.file.name)}`;
    await writeFile(
      join(directory, fileName),
      Buffer.from(await data.file.arrayBuffer()),
    );

    return `/${UPLOAD_DIR}/${fileName}`;
  });

export async function uploadEditorImageToServer(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  return uploadEditorImageServerFn({ data: formData });
}

const deleteEditorImageServerFn = createServerFn({ method: 'POST' })
  .validator((data: { url: string }) => {
    if (typeof data?.url !== 'string' || !data.url) {
      throw new Error('URL ảnh không hợp lệ.');
    }
    return { url: data.url };
  })
  .handler(async ({ data }) => {
    const { rm } = await import('node:fs/promises');
    const { basename, join } = await import('node:path');

    const pathname = new URL(data.url, 'http://localhost').pathname;
    if (!pathname.startsWith(`/${UPLOAD_DIR}/`)) return;

    // basename chặn path traversal — chỉ xoá được file nằm ngay trong UPLOAD_DIR
    const fileName = basename(pathname);
    await rm(join(process.cwd(), UPLOAD_DIR, fileName), { force: true });
  });

export async function deleteEditorImageOnServer(src: string) {
  await deleteEditorImageServerFn({ data: { url: src } });
}
