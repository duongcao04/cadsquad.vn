# Rich Text Editor

**English** | [Tiếng Việt](./README.vi.md)

A reusable HTML editor built with Tiptap and HeroUI using an **atomic (compound
component) API**. It supports text formatting, headings, lists, quotes, links,
alignment, image upload by file picker/paste/drag-and-drop, in-editor image
resize and crop, and utilities for rendering HTML with a table of contents.

## Table of contents

- [Directory structure](#directory-structure)
- [Dependencies](#dependencies)
- [Quick start](#quick-start)
- [Atomic API (`Editor.*`)](#atomic-api-editor)
- [Value management](#value-management)
- [Image uploads](#image-uploads)
- [Images in content: resize and crop](#images-in-content-resize-and-crop)
- [Rendering HTML on the frontend](#rendering-html-on-the-frontend)
- [`RichTextEditor` props](#richtexteditor-props)
- [Public API](#public-api)

## Directory structure

```text
editor/
├── index.ts                 # Public API—only import through this file
├── editor.tsx               # <Editor> root and Editor.* namespace
├── rich-text-editor.tsx     # Ready-made composition of the atoms
├── editor-toolbar.tsx       # FixedToolbar / Separator / Spacer / Image
├── editor-floating-toolbar.tsx # FloatingToolbar (bubble menu)
├── editor-tool-button.tsx   # Button presets from editor-actions.ts
├── editor-actions.ts        # 24 preset toolbar actions
├── editor-content.tsx       # Content / Count / Error
├── editor-link-control.tsx  # Link control
├── editor-image-view.tsx    # Image NodeView: resize and crop
├── editor-context.tsx       # Shared editor and upload state
├── html-content.tsx         # Frontend HTML renderer
├── table-of-contents.tsx    # “On this page” navigation
├── types.ts
├── _hooks/                  # Editor and image-upload hooks
├── _utils/                  # Extensions, parsing, files, upload adapters
└── deps/                    # Offline Tiptap snapshot (fallback)
```

## Dependencies

| Package                                                                                              | Purpose                                          |
| ---------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `@tiptap/core`, `@tiptap/pm`, `@tiptap/react`, `@tiptap/starter-kit`                                 | Editor core, custom nodes, and ProseMirror APIs. |
| `@tiptap/extension-highlight`, `-image`, `-placeholder`, `-subscript`, `-superscript`, `-text-align` | Toolbar extensions.                              |
| `@heroui/react`, `@heroui/styles`, `lucide-react`                                                    | Buttons, overlays, icons, and HeroUI styles.     |
| `html-react-parser`                                                                                  | Frontend HTML and TOC rendering.                 |
| `@supabase/supabase-js`                                                                              | Supabase upload adapter only.                    |
| `@tanstack/react-start`                                                                              | Server upload adapter only.                      |
| `react`, `react-dom` ≥ 19                                                                            | React runtime, NodeViews, and portals.           |

Install them with the project's package manager (**bun**, according to
`bun.lock`):

```bash
bun add react@^19.2.0 react-dom@^19.2.0 @heroui/react@^3.2.2 @heroui/styles@^3.2.2 lucide-react@^0.577.0 html-react-parser@^6.1.4 @tiptap/core@^3.28.0 @tiptap/pm@^3.28.0 @tiptap/react@^3.28.0 @tiptap/starter-kit@^3.28.0 @tiptap/extension-highlight@^3.28.0 @tiptap/extension-image@^3.28.0 @tiptap/extension-placeholder@^3.28.0 @tiptap/extension-subscript@^3.28.0 @tiptap/extension-superscript@^3.28.0 @tiptap/extension-text-align@^3.28.0
```

Replace `bun add` with `npm install` or `pnpm add` when needed. Upload adapters
are optional: install `@supabase/supabase-js` for Supabase or
`@tanstack/react-start` for the server adapter. Do not add packages already
provided by the host application.

### Fallback: restore Tiptap from the offline snapshot

If Tiptap cannot be downloaded from the registry, restore the runtime snapshot
from `deps/tiptap-runtime-3.28.0.tar.gz`. It contains `@tiptap/*` and all runtime
dependencies in their expected `node_modules` structure.

```bash
cd src/components/editor/deps && shasum -a 256 -c SHA256SUMS && cd -
mkdir -p node_modules && tar -xzf src/components/editor/deps/tiptap-runtime-3.28.0.tar.gz -C node_modules
```

Restore it after installing the remaining dependencies, and do not run
`bun install` again while the packages remain unavailable. See the
[snapshot documentation](./deps/README.md) for the complete workflow.

## Quick start

Only import from the directory's public API. `RichTextEditor` is the complete,
precomposed editor intended for most use cases and returns an HTML string:

```tsx
import { useState } from 'react'

import { RichTextEditor } from '#/components/editor'

export function ContentEditor() {
  const [content, setContent] = useState('<p>Initial content</p>')

  return (
    <RichTextEditor
      value={content}
      onChange={setContent}
      placeholder="Enter service content…"
      uploadFolder="services/content"
    />
  )
}
```

Compose the `Editor.*` atoms directly when a smaller toolbar or a different
layout is required.

## Atomic API (`Editor.*`)

`Editor` initializes Tiptap, manages image uploads, and provides context. Every
`Editor.*` component must be nested inside it:

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

For preset-only toolbars, use `actions`. The value `'|'` creates a separator;
`'link'` and `'image'` create their specialized controls:

```tsx
<Editor value={content} onChange={setContent}>
  <Editor.Toolbar
    actions={['bold', 'italic', 'underline', '|', 'link', 'image']}
  />
  <Editor.Content />
  <Editor.Error />
</Editor>
```

`Editor.FloatingToolbar` displays above selected text. It accepts children or
`actions`; when empty, it uses the default inline tools. Fixed and floating
toolbars may be used together.

| Component                | Role                                                                                                 |
| ------------------------ | ---------------------------------------------------------------------------------------------------- |
| `Editor`                 | Root state, uploads, and context. Accepts the props below except `minHeight` and `contentClassName`. |
| `Editor.FixedToolbar`    | Fixed toolbar; accepts children or `actions`. `Editor.Toolbar` is an alias.                          |
| `Editor.FloatingToolbar` | Selection bubble menu; hidden for an empty selection, disabled editor, or selected image.            |
| `Editor.Button`          | Preset action or custom button. `hideWhenUnavailable` hides unavailable commands.                    |
| `Editor.Separator`       | Separates tool groups.                                                                               |
| `Editor.Spacer`          | Flexible space that pushes following tools right.                                                    |
| `Editor.Link`            | Link insertion/removal with a URL popover.                                                           |
| `Editor.Image`           | Image file picker and upload progress.                                                               |
| `Editor.Content`         | Editing area; handles pasted and dropped images.                                                     |
| `Editor.Count`           | Live word and character counts.                                                                      |
| `Editor.Error`           | Image-upload error message.                                                                          |

Available `Editor.Button` actions are:

`undo`, `redo`, `paragraph`, `heading1`, `heading2`, `heading3`, `bulletList`,
`orderedList`, `blockquote`, `bold`, `italic`, `strike`, `underline`,
`highlight`, `code`, `codeBlock`, `horizontalRule`, `clearFormat`,
`superscript`, `subscript`, `alignLeft`, `alignCenter`, `alignRight`, and
`alignJustify`.

Custom buttons can access the editor through `useEditorContext()`:

```tsx
function ClearFormattingButton() {
  const { editor } = useEditorContext()

  return (
    <Editor.Button
      label="Clear formatting"
      onPress={() => editor?.chain().focus().unsetAllMarks().run()}
    >
      <Eraser className="size-4" />
    </Editor.Button>
  )
}
```

## Value management

For a controlled editor, pass `value` and `onChange`. External `value` changes
are synchronized without causing another `onChange`. For an uncontrolled
editor, pass `defaultValue`; do not pass both:

```tsx
<RichTextEditor
  defaultValue="<p>Initial content</p>"
  onChange={(html) => console.log(html)}
/>
```

With React Hook Form, connect the component through `Controller`, passing
`field.value`, `field.onChange`, and `field.onBlur` to the matching editor
props.

## Image uploads

By default, the editor accepts AVIF, GIF, JPEG, PNG, and WebP images up to 5 MB
(change this with `maxImageSize`). An adapter must return a URL suitable for an
`<img>` element. Thrown errors are displayed by `Editor.Error`.

| Adapter            | Upload                             | Delete                             | Use case                             |
| ------------------ | ---------------------------------- | ---------------------------------- | ------------------------------------ |
| Supabase (default) | `uploadEditorImageToSupabase`      | `deleteEditorImageFromSupabase`    | Production with Supabase configured. |
| Server             | `uploadEditorImageToServer`        | `deleteEditorImageOnServer`        | Development/demo with local files.   |
| Custom             | `createCustomImageUpload(options)` | `createCustomImageDelete(options)` | Custom backend, S3, or CDN.          |

### Supabase (default)

Without an `uploadImage` prop, images are uploaded through the browser client
to the public `media` bucket. The bucket must exist, the current user needs RLS
`INSERT` access to `storage.objects`, and public reads must be enabled because
the saved HTML contains public image URLs. `uploadFolder` defaults to `editor`
and only affects this default adapter.

### Server function (development only)

```tsx
import { RichTextEditor, uploadEditorImageToServer } from '#/components/editor'

;<RichTextEditor
  value={content}
  onChange={setContent}
  uploadImage={uploadEditorImageToServer}
/>
```

The TanStack Start server function validates the `FormData`, writes a sanitized
filename, and returns a URL. `UPLOAD_DIR` in
`_utils/image-uploads/server-image-upload/_constants/index.ts` controls the
directory. This URL is served by Vite in development only; use Supabase or a
custom adapter in production.

### Custom endpoint

```tsx
const uploadImage = createCustomImageUpload({
  endpoint: 'https://api.example.com/media/upload',
  headers: () => ({ Authorization: `Bearer ${getToken()}` }),
  extraFields: { folder: 'editor/posts' },
})
```

Options include required `endpoint`, `method` (`POST` by default), `fieldName`
(`file`), static or dynamic `headers`, `extraFields`, `credentials`, and
`getImageUrl`. Any `(file: File) => Promise<string>` function may also be passed
directly as `uploadImage`.

Pass `onDeleteImage` to remove unused storage objects. It runs when the image
toolbar deletes an image and after a cropped replacement uploads successfully.
Without it, only the document node is removed. Backspace and undo deliberately
do not trigger deletion because the image can return through undo.

## Images in content: resize and crop

Inserted images use a custom NodeView:

- **Resize:** drag either side handle. Width is stored in the output `<img>`
  `width` attribute, with an 80 px minimum and editor-width maximum.
- **Crop:** use the hover toolbar, adjust the crop overlay, then confirm. The
  crop is uploaded as WebP through the active adapter and replaces `src`.

Cropping reads pixels through canvas, so the image must be same-origin or its
server must allow CORS. Upload failures appear in `Editor.Error`.

## Rendering HTML on the frontend

`HtmlContent` parses HTML into React elements and adds unique, Vietnamese-aware
slug IDs to headings. It supports SSR and does not use
`dangerouslySetInnerHTML`:

```tsx
<article className="prose prose-slate max-w-none">
  <HtmlContent html={content} />
</article>
```

Only render trusted admin content or HTML sanitized on the server; the parser
does not sanitize scripts or XSS.

`getHeadings(html, maxLevel?)` returns `{ id, text, level }[]`. `maxLevel`
defaults to `6`, and existing heading IDs are preserved.

`TableOfContents` renders anchor links, indentation by heading level, and an
IntersectionObserver scroll-spy. Use the same HTML passed to `HtmlContent`:

```tsx
<div className="grid gap-8 lg:grid-cols-[220px_1fr]">
  <TableOfContents html={content} maxLevel={3} className="lg:sticky lg:top-8" />
  <article className="prose prose-slate">
    <HtmlContent html={content} />
  </article>
</div>
```

## `RichTextEditor` props

`Editor` accepts the same props except `minHeight` and `contentClassName`.

| Prop               | Type                              | Default                    | Description                          |
| ------------------ | --------------------------------- | -------------------------- | ------------------------------------ |
| `value`            | `string`                          | —                          | Controlled HTML.                     |
| `defaultValue`     | `string`                          | `''`                       | Initial uncontrolled HTML.           |
| `onChange`         | `(html: string) => void`          | —                          | Called when content changes.         |
| `onBlur`           | `(html: string) => void`          | —                          | Called when the editor loses focus.  |
| `placeholder`      | `string`                          | `Bắt đầu nhập nội dung…`   | Empty-state hint.                    |
| `className`        | `string`                          | —                          | Container class.                     |
| `contentClassName` | `string`                          | —                          | Content-area class.                  |
| `minHeight`        | `number`                          | `360`                      | Minimum height in pixels.            |
| `isDisabled`       | `boolean`                         | `false`                    | Disables editing and uploads.        |
| `uploadImage`      | `(file: File) => Promise<string>` | Supabase                   | Upload adapter.                      |
| `onDeleteImage`    | `(src: string) => Promise<void>`  | —                          | Deletes a removed or replaced image. |
| `uploadFolder`     | `string`                          | `editor`                   | Supabase upload directory.           |
| `maxImageSize`     | `number`                          | `5242880`                  | Maximum image size in bytes.         |
| `ariaLabel`        | `string`                          | `Trình soạn thảo nội dung` | Accessible label.                    |

## Public API

The public entry point exports `Editor`, `RichTextEditor`, `HtmlContent`,
`TableOfContents`, `getHeadings`, `slugifyHeading`, the custom/Supabase/server
image upload and deletion adapters, `useEditorContext`,
`useEditorImageUpload`, `useRichTextEditor`, and their associated types.

Prefer `RichTextEditor` for standard forms so toolbar behavior, uploads,
validation, and controlled-value handling remain consistent. Use `Editor.*`
when a reduced toolbar or custom layout is needed.
