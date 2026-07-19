/**
 * Thư mục lưu ảnh upload, tính từ root repository.
 * Đổi giá trị này để lưu sang folder khác — URL trả về là `/{UPLOAD_DIR}/{fileName}`
 * nên folder phải nằm dưới project root để Vite dev server serve được.
 */
export const UPLOAD_DIR =
  'src/components/editor/_utils/image-uploads/server-image-upload/.tmp';
