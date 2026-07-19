# Editor dependency snapshot — 2026-07-17

Các phiên bản dưới đây được đọc trực tiếp từ `node_modules` sau khi chạy
`bun install`. Đây là mốc tham chiếu để cài đặt và tái tạo snapshot offline,
không thay thế `bun.lock`.

## Runtime bắt buộc

| Package                         | Phiên bản |
| ------------------------------- | --------: |
| `react`                         |  `19.2.7` |
| `react-dom`                     |  `19.2.7` |
| `@heroui/react`                 |   `3.2.2` |
| `@heroui/styles`                |   `3.2.2` |
| `lucide-react`                  | `0.577.0` |
| `html-react-parser`             |   `6.1.4` |
| `@tiptap/core`                  |  `3.28.0` |
| `@tiptap/pm`                    |  `3.28.0` |
| `@tiptap/react`                 |  `3.28.0` |
| `@tiptap/starter-kit`           |  `3.28.0` |
| `@tiptap/extension-highlight`   |  `3.28.0` |
| `@tiptap/extension-image`       |  `3.28.0` |
| `@tiptap/extension-placeholder` |  `3.28.0` |
| `@tiptap/extension-subscript`   |  `3.28.0` |
| `@tiptap/extension-superscript` |  `3.28.0` |
| `@tiptap/extension-text-align`  |  `3.28.0` |

## Adapter tùy chọn

| Package                 |  Phiên bản | Khi nào cần                             |
| ----------------------- | ---------: | --------------------------------------- |
| `@supabase/supabase-js` |  `2.110.7` | Upload qua Supabase Storage.            |
| `@tanstack/react-start` | `1.168.27` | Dùng server upload adapter của project. |

Snapshot `tiptap-runtime-3.28.0.tar.gz` đã chứa toàn bộ `@tiptap/*` và runtime
dependency của chúng. Không tạo archive riêng cho `@tiptap/core` hoặc
`@tiptap/pm` vì hai package này đã có trong snapshot đó.
