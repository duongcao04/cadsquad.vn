# Rich Text Editor

[English](./README.md) | **Tiếng Việt**

Editor HTML reusable xây bằng Tiptap và HeroUI theo dạng **atomic (compound
components)**. Hỗ trợ định dạng văn bản, heading, danh sách, trích dẫn, liên
kết, căn chỉnh; upload ảnh bằng nút chọn file, paste hoặc kéo-thả; resize và
crop ảnh ngay trong editor; kèm bộ util render HTML + mục lục ở frontend.

## Mục lục

- [Cấu trúc thư mục](#cấu-trúc-thư-mục)
- [Cài dependency](#cài-dependency)
- [Bắt đầu nhanh](#bắt-đầu-nhanh)
- [Atomic API (`Editor.*`)](#atomic-api-editor)
- [Quản lý giá trị](#quản-lý-giá-trị)
- [Upload ảnh](#upload-ảnh)
- [Ảnh trong nội dung: resize và crop](#ảnh-trong-nội-dung-resize-và-crop)
- [Hiển thị HTML ở frontend](#hiển-thị-html-ở-frontend)
- [Props của `RichTextEditor`](#props-của-richtexteditor)
- [Public API](#public-api)

## Cấu trúc thư mục

```
editor/
├── index.ts                 # Public API — chỉ import qua file này
├── editor.tsx               # <Editor> root + namespace Editor.*
├── rich-text-editor.tsx     # Bản compose sẵn từ các atom
├── editor-toolbar.tsx       # Editor.FixedToolbar / Separator / Spacer / Image
├── editor-floating-toolbar.tsx # Editor.FloatingToolbar (bubble menu)
├── editor-tool-button.tsx   # Editor.Button (preset qua editor-actions.ts)
├── editor-actions.ts        # 24 preset action cho toolbar
├── editor-content.tsx       # Editor.Content / Count / Error
├── editor-link-control.tsx  # Editor.Link
├── editor-image-view.tsx    # NodeView ảnh: resize + crop
├── editor-context.tsx       # Context chia sẻ editor + upload state
├── html-content.tsx         # Render HTML ở frontend
├── table-of-contents.tsx    # Mục lục "Trên trang này"
├── types.ts
├── _hooks/                  # use-rich-text-editor, use-editor-image-upload
├── _utils/
│   ├── extensions.ts        # Cấu hình Tiptap extensions
│   ├── html-parser.ts       # getHeadings, slugifyHeading
│   ├── image-files.ts       # Validate ảnh, sanitize tên file
│   └── image-uploads/       # 3 adapter: supabase / server / customize
└── deps/                    # Snapshot offline Tiptap (fallback)
```

## Cài dependency

Module sử dụng các package sau (quét từ import trong `src/components/editor/`):

| Package                                                                                              | Dùng cho                                            |
| ---------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `@tiptap/core`, `@tiptap/pm`, `@tiptap/react`, `@tiptap/starter-kit`                                 | Lõi editor, custom node và ProseMirror API.         |
| `@tiptap/extension-highlight`, `-image`, `-placeholder`, `-subscript`, `-superscript`, `-text-align` | Các extension của toolbar.                          |
| `@heroui/react`, `@heroui/styles`, `lucide-react`                                                    | UI: button, tooltip, popover, icon và style HeroUI. |
| `html-react-parser`                                                                                  | Render HTML + TOC ở frontend.                       |
| `@supabase/supabase-js`                                                                              | Chỉ cho adapter upload Supabase.                    |
| `@tanstack/react-start`                                                                              | Chỉ cho adapter upload server.                      |
| `react`, `react-dom` ≥ 19                                                                            | React runtime và NodeView/portal.                   |

Cài bằng package manager đang dùng (repo này dùng **bun** — theo `bun.lock`):

**bun**

```bash
bun add react@^19.2.0 react-dom@^19.2.0 @heroui/react@^3.2.2 @heroui/styles@^3.2.2 lucide-react@^0.577.0 html-react-parser@^6.1.4 @tiptap/core@^3.28.0 @tiptap/pm@^3.28.0 @tiptap/react@^3.28.0 @tiptap/starter-kit@^3.28.0 @tiptap/extension-highlight@^3.28.0 @tiptap/extension-image@^3.28.0 @tiptap/extension-placeholder@^3.28.0 @tiptap/extension-subscript@^3.28.0 @tiptap/extension-superscript@^3.28.0 @tiptap/extension-text-align@^3.28.0
```

**npm**

```bash
npm install react@^19.2.0 react-dom@^19.2.0 @heroui/react@^3.2.2 @heroui/styles@^3.2.2 lucide-react@^0.577.0 html-react-parser@^6.1.4 @tiptap/core@^3.28.0 @tiptap/pm@^3.28.0 @tiptap/react@^3.28.0 @tiptap/starter-kit@^3.28.0 @tiptap/extension-highlight@^3.28.0 @tiptap/extension-image@^3.28.0 @tiptap/extension-placeholder@^3.28.0 @tiptap/extension-subscript@^3.28.0 @tiptap/extension-superscript@^3.28.0 @tiptap/extension-text-align@^3.28.0
```

**pnpm**

```bash
pnpm add react@^19.2.0 react-dom@^19.2.0 @heroui/react@^3.2.2 @heroui/styles@^3.2.2 lucide-react@^0.577.0 html-react-parser@^6.1.4 @tiptap/core@^3.28.0 @tiptap/pm@^3.28.0 @tiptap/react@^3.28.0 @tiptap/starter-kit@^3.28.0 @tiptap/extension-highlight@^3.28.0 @tiptap/extension-image@^3.28.0 @tiptap/extension-placeholder@^3.28.0 @tiptap/extension-subscript@^3.28.0 @tiptap/extension-superscript@^3.28.0 @tiptap/extension-text-align@^3.28.0
```

Các adapter upload là tùy chọn: chạy `bun add @supabase/supabase-js` khi dùng
Supabase, hoặc cài `@tanstack/react-start` khi dùng server adapter ngoài project
này. Package đã có trong ứng dụng thì không cần chạy `add` lại.

### Fallback: khôi phục Tiptap từ snapshot offline

Khi registry không còn (hoặc không tải được) package Tiptap, dùng snapshot
runtime tại `deps/tiptap-runtime-3.28.0.tar.gz` — archive chứa `@tiptap/*` và
toàn bộ dependency runtime (`prosemirror-*`, `@floating-ui/*`…) theo đúng cấu
trúc `node_modules`.

Kiểm tra checksum rồi giải nén từ root repository:

```bash
cd src/components/editor/deps && shasum -a 256 -c SHA256SUMS && cd -
mkdir -p node_modules && tar -xzf src/components/editor/deps/tiptap-runtime-3.28.0.tar.gz -C node_modules
```

Lưu ý khi dùng fallback:

- Chạy restore **sau** khi đã cài các dependency còn lại.
- Không chạy lại `bun install` sau khi restore nếu registry vẫn thiếu Tiptap —
  package manager có thể ghi đè `node_modules`.
- Quy trình đầy đủ (verify, nâng version, tạo snapshot mới) nằm trong
  [`deps/README.vi.md`](./deps/README.vi.md).

## Bắt đầu nhanh

Chỉ import qua public API của thư mục. `RichTextEditor` là bản compose sẵn đầy
đủ toolbar, dùng cho đa số trường hợp; editor trả nội dung dạng chuỗi HTML:

```tsx
import { useState } from 'react'

import { RichTextEditor } from '#/components/editor'

export function ContentEditor() {
  const [content, setContent] = useState('<p>Nội dung ban đầu</p>')

  return (
    <RichTextEditor
      value={content}
      onChange={setContent}
      placeholder="Nhập nội dung dịch vụ…"
      uploadFolder="services/content"
    />
  )
}
```

Khi cần toolbar rút gọn hoặc bố cục khác, tự ghép từ các atomic component
`Editor.*` bên dưới.

## Atomic API (`Editor.*`)

`Editor` là root component: khởi tạo Tiptap, quản lý upload ảnh và cung cấp
context cho các component con. Các `Editor.*` phải nằm bên trong `<Editor>`:

```tsx
import { Editor } from '#/components/editor'

;<Editor value={content} onChange={setContent}>
  <Editor.Toolbar>
    <Editor.Button action="undo" />
    <Editor.Button action="redo" />
    <Editor.Separator />
    <Editor.Button action="bold" />
    <Editor.Button action="italic" />
    <Editor.Link />
    <Editor.Spacer />
    <Editor.Image />
  </Editor.Toolbar>
  <Editor.Content minHeight={420} />
  <Editor.Count />
  <Editor.Error />
</Editor>
```

Với toolbar chỉ gồm các preset, dùng prop `actions` cho gọn — toolbar chỉ hiện
đúng các action liệt kê, `'|'` là separator, `'link'` và `'image'` là 2 control
đặc biệt:

```tsx
<Editor value={content} onChange={setContent}>
  <Editor.Toolbar
    actions={['bold', 'italic', 'underline', '|', 'link', 'image']}
  />
  <Editor.Content />
  <Editor.Error />
</Editor>
```

Ngoài toolbar cố định, `Editor.FloatingToolbar` là toolbar nổi hiện phía trên
vùng văn bản đang bôi đen (bubble menu) — cũng nhận `Editor.Button` làm
children hoặc prop `actions`, bỏ trống để dùng bộ tool inline mặc định
(bold, italic, underline, strike, code, link). Hai loại toolbar dùng được
song song:

```tsx
<Editor value={content} onChange={setContent}>
  <Editor.FixedToolbar actions={['undo', 'redo', '|', 'image']} />
  <Editor.FloatingToolbar>
    <Editor.Button action="bold" />
    <Editor.Button action="italic" />
    <Editor.Link />
  </Editor.FloatingToolbar>
  <Editor.Content />
  <Editor.Error />
</Editor>
```

| Component                | Vai trò                                                                                                                                                  |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Editor`                 | Root: state, upload, context. Nhận các props ở [bảng Props](#props-của-richtexteditor) (trừ `minHeight`, `contentClassName`).                            |
| `Editor.FixedToolbar`    | Thanh công cụ cố định trên đầu editor. Truyền children hoặc `actions` để chọn tool; bỏ trống để dùng bộ tool mặc định đầy đủ. `Editor.Toolbar` là alias. |
| `Editor.FloatingToolbar` | Toolbar nổi theo vùng bôi đen. Tự ẩn khi selection rỗng, editor khoá, hoặc đang chọn ảnh.                                                                |
| `Editor.Button`          | Nút lệnh. Truyền `action` để dùng preset, hoặc tự truyền `label`/`onPress`/`children`. `hideWhenUnavailable` ẩn nút khi lệnh không chạy được.            |
| `Editor.Separator`       | Vạch ngăn cách giữa các nhóm tool.                                                                                                                       |
| `Editor.Spacer`          | Khoảng trống co giãn, đẩy các tool phía sau về bên phải toolbar.                                                                                         |
| `Editor.Link`            | Nút chèn/gỡ liên kết kèm popover nhập URL.                                                                                                               |
| `Editor.Image`           | Nút upload ảnh (mở file picker, hiện spinner khi đang tải).                                                                                              |
| `Editor.Content`         | Vùng soạn thảo; nhận `minHeight` và `className`; xử lý paste/kéo-thả ảnh.                                                                                |
| `Editor.Count`           | Footer đếm số từ và ký tự, tự cập nhật khi gõ.                                                                                                           |
| `Editor.Error`           | Hiển thị lỗi upload ảnh (tự ẩn khi không có lỗi).                                                                                                        |

### Preset actions cho `Editor.Button`

Trạng thái active/disabled của button tự cập nhật theo selection nhờ
`useEditorState`. Các `action` có sẵn:

`undo`, `redo`, `paragraph`, `heading1`, `heading2`, `heading3`, `bulletList`,
`orderedList`, `blockquote`, `bold`, `italic`, `strike`, `underline`,
`highlight`, `code`, `codeBlock`, `horizontalRule`, `clearFormat`,
`superscript`, `subscript`, `alignLeft`, `alignCenter`, `alignRight`,
`alignJustify`.

Button tuỳ chỉnh không cần preset — lấy editor instance qua
`useEditorContext()` (chỉ gọi được bên trong `<Editor>`):

```tsx
import { Editor, useEditorContext } from '#/components/editor'
import { Eraser } from 'lucide-react'

function ClearFormattingButton() {
  const { editor } = useEditorContext()

  return (
    <Editor.Button
      label="Xoá định dạng"
      onPress={() => editor?.chain().focus().unsetAllMarks().run()}
    >
      <Eraser className="size-4" />
    </Editor.Button>
  )
}
```

`RichTextEditor` chính là một bản compose từ các atom này:

```tsx
<Editor {...rootProps}>
  <Editor.Toolbar />
  <Editor.Content minHeight={minHeight} className={contentClassName} />
  <Editor.Error />
</Editor>
```

## Quản lý giá trị

### Controlled

Truyền `value` + `onChange` khi form hoặc component cha quản lý state. Khi
`value` thay đổi từ bên ngoài, editor tự đồng bộ nội dung mà không phát sinh
thêm một lần `onChange` (xem ví dụ ở [Bắt đầu nhanh](#bắt-đầu-nhanh)).

### Uncontrolled

Dùng `defaultValue` khi editor tự quản lý nội dung. Không truyền đồng thời
`value` và `defaultValue`:

```tsx
<RichTextEditor
  defaultValue="<p>Nội dung ban đầu</p>"
  onChange={(html) => console.log(html)}
/>
```

### React Hook Form

```tsx
import { Controller, useForm } from 'react-hook-form'

import { RichTextEditor } from '#/components/editor'

type FormValues = {
  content: string
}

export function ServiceContentForm() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      content: '<p></p>',
    },
  })

  return (
    <form onSubmit={handleSubmit((values) => console.log(values))}>
      <Controller
        control={control}
        name="content"
        render={({ field }) => (
          <RichTextEditor
            value={field.value}
            onChange={field.onChange}
            onBlur={() => field.onBlur()}
            uploadFolder="services/content"
            ariaLabel="Nội dung dịch vụ"
          />
        )}
      />

      <button type="submit">Lưu</button>
    </form>
  )
}
```

## Upload ảnh

Editor validate ảnh trước khi upload (mặc định chỉ nhận AVIF, GIF, JPEG, PNG,
WebP và tối đa 5 MB mỗi ảnh — đổi giới hạn qua `maxImageSize`), sau đó gọi một
trong các adapter bên dưới. Adapter phải trả về URL ảnh dùng được trong thẻ
`<img>`; nếu throw, thông báo lỗi hiển thị ở `Editor.Error`.

Có 3 adapter sẵn trong `_utils/image-uploads/`, mỗi adapter có cặp hàm
upload + xoá:

| Adapter             | Upload                             | Xoá                                | Dùng khi                          |
| ------------------- | ---------------------------------- | ---------------------------------- | --------------------------------- |
| Supabase (mặc định) | `uploadEditorImageToSupabase`      | `deleteEditorImageFromSupabase`    | Production, đã cấu hình Supabase. |
| Server              | `uploadEditorImageToServer`        | `deleteEditorImageOnServer`        | Dev/demo, lưu vào folder local.   |
| Custom              | `createCustomImageUpload(options)` | `createCustomImageDelete(options)` | Backend riêng, S3, CDN…           |

### Supabase (mặc định)

Nếu không truyền `uploadImage`, editor upload vào bucket public `media` qua
Supabase browser client:

```tsx
<RichTextEditor
  value={content}
  onChange={setContent}
  uploadFolder="posts/article"
/>
```

Yêu cầu:

- Bucket `media` đã tồn tại.
- Người dùng hiện tại có quyền `INSERT` vào `storage.objects` theo RLS.
- Bucket cho phép đọc public vì HTML lưu URL public của ảnh.

`uploadFolder` chỉ định thư mục bên trong bucket, mặc định là `editor`. Prop này
chỉ có tác dụng với adapter Supabase mặc định — khi đã truyền `uploadImage`
riêng thì `uploadFolder` bị bỏ qua.

### Server function (lưu vào folder local, chỉ dùng cho dev)

Upload qua TanStack Start server function (`createServerFn`):

```tsx
import { RichTextEditor, uploadEditorImageToServer } from '#/components/editor'

;<RichTextEditor
  value={content}
  onChange={setContent}
  uploadImage={uploadEditorImageToServer}
/>
```

Luồng xử lý: file được đóng gói vào `FormData` → `.validator()` kiểm tra lại
phía server (đúng kiểu `File`, MIME `image/*`) → handler ghi file với tên
`{timestamp}-{uuid}-{tên đã sanitize}` → trả về URL `/{UPLOAD_DIR}/{fileName}`.

Folder lưu ảnh khai báo tại hằng `UPLOAD_DIR` trong
`_utils/image-uploads/server-image-upload/_constants/index.ts` (mặc định là
`.tmp` cạnh handler) — đổi 1 chỗ này là cả upload lẫn delete cùng trỏ sang
folder mới. Folder phải nằm dưới project root để Vite dev server serve được.

URL trả về chỉ hiển thị được ở dev vì Vite dev server serve file tĩnh từ
project root. Không dùng cho production — khi đó chuyển sang adapter Supabase
hoặc custom.

### Custom endpoint

`createCustomImageUpload` là factory tạo adapter gửi `FormData` tới API bất kỳ:

```tsx
import { RichTextEditor, createCustomImageUpload } from '#/components/editor'

const uploadImage = createCustomImageUpload({
  endpoint: 'https://api.example.com/media/upload',
  headers: () => ({ Authorization: `Bearer ${getToken()}` }),
  extraFields: { folder: 'editor/posts' },
})

<RichTextEditor value={content} onChange={setContent} uploadImage={uploadImage} />
```

Options:

| Option        | Kiểu                                                | Mặc định          | Mô tả                                         |
| ------------- | --------------------------------------------------- | ----------------- | --------------------------------------------- |
| `endpoint`    | `string`                                            | — (bắt buộc)      | API endpoint nhận ảnh.                        |
| `method`      | `'POST' \| 'PUT'`                                   | `'POST'`          | HTTP method.                                  |
| `fieldName`   | `string`                                            | `'file'`          | Tên field chứa file trong FormData.           |
| `headers`     | `HeadersInit \| () => HeadersInit`                  | —                 | Headers tĩnh hoặc hàm (sync/async) lấy token. |
| `extraFields` | `Record<string, string>`                            | —                 | Field phụ gửi kèm (folder, ownerId…).         |
| `credentials` | `RequestCredentials`                                | —                 | Gửi kèm cookie khi gọi cross-origin.          |
| `getImageUrl` | `(response: Response) => string \| Promise<string>` | Đọc `url` từ JSON | Cách lấy URL ảnh từ response.                 |

Ngoài factory, bất kỳ hàm nào khớp type `EditorImageUpload`
(`(file: File) => Promise<string>`) đều truyền được vào `uploadImage`.

### Xoá ảnh khỏi storage (`onDeleteImage`)

Truyền `onDeleteImage` để dọn file trên storage khi ảnh không còn được dùng.
Editor gọi hàm này (best-effort, lỗi hiện ở `Editor.Error`) trong 2 trường hợp:

- Bấm nút xoá ảnh trên toolbar hover của ảnh.
- Crop ảnh: sau khi upload ảnh cắt mới thành công, ảnh cũ bị xoá.

```tsx
import {
  deleteEditorImageOnServer,
  RichTextEditor,
  uploadEditorImageToServer,
} from '#/components/editor'

;<RichTextEditor
  uploadImage={uploadEditorImageToServer}
  onDeleteImage={deleteEditorImageOnServer}
/>
```

Với backend riêng, `createCustomImageDelete` tạo hàm gửi JSON `{ url }` tới
endpoint (mặc định method `DELETE`, hỗ trợ `headers`/`credentials` như factory
upload):

```tsx
const onDeleteImage = createCustomImageDelete({
  endpoint: 'https://api.example.com/media',
  headers: () => ({ Authorization: `Bearer ${getToken()}` }),
})
```

Không truyền `onDeleteImage` thì editor chỉ gỡ ảnh khỏi nội dung, không đụng
tới storage. Lưu ý: xoá ảnh bằng phím Backspace/undo không kích hoạt
`onDeleteImage` — ảnh có thể quay lại qua undo nên không thể xoá file ngay.

## Ảnh trong nội dung: resize và crop

Ảnh đã chèn được render bằng custom NodeView nên chỉnh sửa được ngay trong
editor:

- **Resize**: hover vào ảnh sẽ hiện 2 tay kéo ở mép trái/phải — kéo để đổi
  chiều rộng. Chiều rộng lưu vào attribute `width` của thẻ `<img>` trong HTML
  output (tối thiểu 80px, tối đa bằng chiều rộng vùng soạn thảo).
- **Crop**: hover vào ảnh sẽ hiện toolbar góc trên phải với nút cắt ảnh và xoá
  ảnh. Bấm cắt để mở overlay chọn vùng (kéo 4 góc để chỉnh, kéo giữa để di
  chuyển), bấm ✓ để áp dụng. Ảnh cắt xong được upload lại qua đúng adapter
  đang dùng dưới dạng WebP rồi thay `src` — không đụng vào ảnh gốc.

Lưu ý: crop cần đọc pixel ảnh qua canvas nên ảnh phải cùng origin hoặc server
ảnh cho phép CORS (Supabase public bucket mặc định cho phép). Nếu upload thất
bại, lỗi hiển thị ở `Editor.Error` như luồng upload thường.

## Hiển thị HTML ở frontend

Nội dung editor là HTML. Module cung cấp bộ util render dựa trên
`html-react-parser` (không dùng `dangerouslySetInnerHTML`, hoạt động cả khi
SSR):

### `HtmlContent`

Parse HTML thành React elements và tự gắn `id` (slug tiếng Việt, tự khử trùng
lặp bằng hậu tố `-2`, `-3`…) vào mọi heading để anchor link và TOC hoạt động:

```tsx
import { HtmlContent } from '#/components/editor'

;<article className="prose prose-slate max-w-none">
  <HtmlContent html={content} />
</article>
```

Vẫn chỉ render HTML từ nguồn quản trị đáng tin cậy hoặc đã sanitize ở server —
parser không tự lọc script/XSS.

### `getHeadings(html, maxLevel?)`

Trích danh sách heading từ chuỗi HTML, trả về `Array<HtmlHeading>`
(`{ id, text, level }`). `maxLevel` mặc định `6`; heading có sẵn `id` trong
HTML sẽ giữ nguyên id đó:

```tsx
import { getHeadings } from '#/components/editor'

const headings = getHeadings(content, 3)
// [{ id: 'bien-y-tuong-thanh-noi-dung', text: 'Biến ý tưởng…', level: 2 }, …]
```

### `TableOfContents`

Component mục lục kiểu "Trên trang này": render link anchor tới từng heading,
thụt lề theo level và highlight heading đang xem (scroll-spy bằng
IntersectionObserver). Dùng cùng chuỗi HTML với `HtmlContent` để id khớp nhau:

```tsx
import { HtmlContent, TableOfContents } from '#/components/editor'

;<div className="grid gap-8 lg:grid-cols-[220px_1fr]">
  <TableOfContents html={content} maxLevel={3} className="lg:sticky lg:top-8" />
  <article className="prose prose-slate">
    <HtmlContent html={content} />
  </article>
</div>
```

| Prop        | Kiểu     | Mặc định         | Mô tả                                     |
| ----------- | -------- | ---------------- | ----------------------------------------- |
| `html`      | `string` | — (bắt buộc)     | HTML nguồn, cùng chuỗi với `HtmlContent`. |
| `maxLevel`  | `number` | `3`              | Lấy heading tới level này (1–6).          |
| `title`     | `string` | `Trên trang này` | Tiêu đề khối mục lục.                     |
| `className` | `string` | —                | Class cho thẻ `nav` ngoài cùng.           |

## Props của `RichTextEditor`

`Editor` (root) nhận cùng các props này trừ `minHeight` và `contentClassName`
(2 props đó chuyển vào `Editor.Content`):

| Prop               | Kiểu                              | Mặc định                   | Mô tả                              |
| ------------------ | --------------------------------- | -------------------------- | ---------------------------------- |
| `value`            | `string`                          | —                          | HTML controlled.                   |
| `defaultValue`     | `string`                          | `''`                       | HTML khởi tạo uncontrolled.        |
| `onChange`         | `(html: string) => void`          | —                          | Gọi khi nội dung thay đổi.         |
| `onBlur`           | `(html: string) => void`          | —                          | Gọi khi editor mất focus.          |
| `placeholder`      | `string`                          | `Bắt đầu nhập nội dung…`   | Nội dung gợi ý khi trống.          |
| `className`        | `string`                          | —                          | Class container.                   |
| `contentClassName` | `string`                          | —                          | Class vùng nội dung.               |
| `minHeight`        | `number`                          | `360`                      | Chiều cao tối thiểu theo pixel.    |
| `isDisabled`       | `boolean`                         | `false`                    | Khoá editor và upload.             |
| `uploadImage`      | `(file: File) => Promise<string>` | Supabase                   | Upload adapter.                    |
| `onDeleteImage`    | `(src: string) => Promise<void>`  | —                          | Xoá file khi gỡ ảnh hoặc crop.     |
| `uploadFolder`     | `string`                          | `editor`                   | Thư mục upload (chỉ với Supabase). |
| `maxImageSize`     | `number`                          | `5242880`                  | Dung lượng ảnh tối đa theo byte.   |
| `ariaLabel`        | `string`                          | `Trình soạn thảo nội dung` | Accessible label.                  |

## Public API

Toàn bộ export từ `#/components/editor`:

```tsx
import {
  Editor,
  RichTextEditor,
  HtmlContent,
  TableOfContents,
  getHeadings,
  slugifyHeading,
  createCustomImageDelete,
  createCustomImageUpload,
  deleteEditorImageFromSupabase,
  deleteEditorImageOnServer,
  uploadEditorImageToServer,
  uploadEditorImageToSupabase,
  useEditorContext,
  useEditorImageUpload,
  useRichTextEditor,
} from '#/components/editor'

import type {
  EditorAction,
  EditorImageDelete,
  EditorImageUpload,
  EditorRootProps,
  EditorToolbarItem,
  HtmlHeading,
  RichTextEditorProps,
} from '#/components/editor'
```

Ưu tiên dùng `RichTextEditor` cho các form thông thường để giữ hành vi toolbar,
upload, validation và xử lý controlled value nhất quán trong toàn bộ CMS; dùng
`Editor.*` khi cần toolbar rút gọn hoặc bố cục khác.
