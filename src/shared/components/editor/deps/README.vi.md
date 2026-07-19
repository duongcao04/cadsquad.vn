# Tiptap offline snapshot

[English](./README.md) | **Tiếng Việt**

Thư mục này lưu snapshot runtime của Tiptap để khôi phục editor khi package
không còn tải được từ registry.

## Nội dung

- `tiptap-runtime-3.28.0.tar.gz`: snapshot hiện tại, Tiptap `3.28.0` và toàn bộ dependency runtime.
- `tiptap-runtime-3.27.3.tar.gz`: snapshot cũ, chỉ dùng với lockfile Tiptap `3.27.3`.
- `SHA256SUMS`: checksum dùng để xác minh archive không bị thay đổi.
- `DEPENDENCIES.snapshot.md`: phiên bản chính xác của dependency editor tại thời điểm tạo snapshot.

Archive giữ nguyên cấu trúc bên trong `node_modules`, bao gồm:

- `@tiptap/*`
- `@floating-ui/*`
- `prosemirror-*`
- `orderedmap`, `rope-sequence`, `w3c-keyname`
- `fast-equals`, `linkifyjs`, `use-sync-external-store`
- type package cần bởi `@tiptap/react`

## Khôi phục

Chạy từ thư mục root của repository:

```bash
mkdir -p node_modules && tar -xzf src/components/editor/deps/tiptap-runtime-3.28.0.tar.gz -C node_modules
```

Kiểm tra archive trước khi giải nén:

```bash
cd src/components/editor/deps && shasum -a 256 -c SHA256SUMS
```

Sau khi giải nén, quay lại repository root và kiểm tra:

```bash
bunx tsc --noEmit
bunx vite build
```

## Lưu ý

- Chạy lệnh restore sau bước cài các dependency còn lại.
- Không chạy lại `bun install` sau khi restore nếu registry vẫn thiếu Tiptap, vì
  package manager có thể thay đổi nội dung `node_modules`.
- Snapshot này là phương án dự phòng. Bình thường vẫn sử dụng dependency được
  khai báo trong `package.json` và khóa bởi `bun.lock`.
- Khi nâng phiên bản Tiptap, phải tạo snapshot mới và cập nhật checksum.
