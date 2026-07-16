# Tích hợp nội dung Post vào website

Tài liệu này hướng dẫn website đọc bài viết được tạo bởi CMS từ Supabase, xử
lý nội dung đa ngôn ngữ, SEO, ảnh và render HTML an toàn. Rich Editor và HTML
block đều được lưu trong locale tương ứng của cột `posts.content`.

## 1. Cấu trúc dữ liệu

Các trường nội dung đa ngôn ngữ là JSONB locale-map mở:

```json
{
  "en": "<h2>Post content</h2><p>...</p>",
  "vi": "<h2>Nội dung bài viết</h2><p>...</p>"
}
```

Các cột website thường sử dụng:

| Cột Supabase        | Kiểu          | Mục đích                                        |
| ------------------- | ------------- | ----------------------------------------------- |
| `id`                | `uuid`        | Định danh bài viết.                             |
| `slug`              | `text`        | URL trang chi tiết.                             |
| `title`             | `jsonb`       | Tiêu đề theo locale.                            |
| `short_description` | `jsonb`       | Mô tả ngắn theo locale.                         |
| `content`           | `jsonb`       | HTML từ Rich Editor và HTML block.              |
| `keywords`          | `text[]`      | Từ khóa SEO dùng chung cho các locale.          |
| `tags`              | `text[]`      | Nhãn phân nhóm bài viết.                        |
| `thumbnail_url`     | `text`        | Ảnh thumbnail của card/danh sách.               |
| `bg_cover_url`      | `text`        | Ảnh cover ở header trang chi tiết.              |
| `seo`               | `jsonb`       | Thiết lập SEO theo locale.                      |
| `count_view`        | `integer`     | Lượt xem; CMS hiện chỉ đọc, không ghi đè.       |
| `status`            | `text`        | Website chỉ được đọc row `published`.           |
| `created_at`        | `timestamptz` | Ngày tạo/đăng bài.                              |
| `updated_at`        | `timestamptz` | Cache invalidation, sitemap hoặc Last-Modified. |

`thumbnail_url` và `bg_cover_url` có thể là `null`. `keywords` và `tags` có thể
là mảng rỗng.

## 2. Biến môi trường của website

Frontend chỉ sử dụng Supabase URL và publishable/anon key:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

Không đưa `service_role`, secret key hoặc database connection string vào code
chạy trên trình duyệt. Các key đó bypass RLS.

## 3. Cài đặt Supabase client

```bash
bun add @supabase/supabase-js
```

```ts
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
)
```

Nếu website dùng Next.js hoặc framework SSR khác, tạo client phù hợp cho server
environment. Publishable key vẫn đủ để đọc nội dung public; không cần
`service_role`.

## 4. Grants và RLS bắt buộc

Data API cần đồng thời:

1. `GRANT SELECT` cho role public cần sử dụng.
2. RLS policy chỉ cho đọc bài viết đã publish.

Kiểm tra trong Supabase SQL Editor:

```sql
grant select on table public.posts to anon, authenticated;

alter table public.posts enable row level security;

create policy "Public can read published posts"
on public.posts
for select
to anon, authenticated
using (status = 'published');
```

Không tạo policy public cho `insert`, `update` hoặc `delete`. CMS admin sử dụng
policy quản trị riêng. Nếu gặp lỗi `42501 permission denied for table posts`,
kiểm tra `GRANT SELECT` và Data API exposure trước khi sửa RLS.

## 5. Type dùng trên website

```ts
export type Localized = Record<string, string>

export type PostSeoEntry = {
  metaTitle?: string
  metaDescription?: string
  focusKeyword?: string
  canonicalUrl?: string
}

export type PublicPost = {
  id: string
  slug: string
  title: Localized | null
  short_description: Localized | null
  content: Localized | null
  keywords: Array<string> | null
  tags: Array<string> | null
  thumbnail_url: string | null
  bg_cover_url: string | null
  seo: Record<string, PostSeoEntry> | null
  count_view: number
  status: 'draft' | 'published'
  created_at: string
  updated_at: string
}
```

Type trên giữ nguyên `snake_case` để khớp trực tiếp response của Supabase. Nếu
data layer của website dùng `camelCase`, map dữ liệu tại repository boundary.

## 6. Locale fallback

CMS dùng English (`en`) làm locale mặc định. Fallback theo thứ tự:

1. Locale được yêu cầu.
2. English.
3. Giá trị không rỗng đầu tiên.
4. Chuỗi rỗng.

```ts
const DEFAULT_LOCALE = 'en'

export function getLocalized(
  value: Record<string, string> | null | undefined,
  locale: string,
) {
  if (!value) return ''
  if (value[locale]?.trim()) return value[locale]
  if (value[DEFAULT_LOCALE]?.trim()) return value[DEFAULT_LOCALE]
  return Object.values(value).find((item) => item.trim()) ?? ''
}

export function getLocalizedSeo<T>(
  value: Record<string, T> | null | undefined,
  locale: string,
) {
  if (!value) return undefined
  return value[locale] ?? value.en ?? Object.values(value)[0]
}
```

`keywords` và `tags` hiện dùng chung cho mọi locale nên không cần fallback.

## 7. Query danh sách bài viết

Chỉ select các cột cần cho card/danh sách:

```ts
import { supabase } from './supabase'
import type { PublicPost } from './post.types'

export async function getPublishedPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select(
      'id, slug, title, short_description, thumbnail_url, tags, seo, count_view, created_at, updated_at',
    )
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Array<PublicPost>
}
```

Filter `status` làm intent của query rõ ràng và giảm dữ liệu. RLS vẫn là lớp bảo
vệ bắt buộc; không dựa riêng vào filter phía client.

### Filter theo tag

Vì `tags` là `text[]`, có thể dùng `contains`:

```ts
const { data, error } = await supabase
  .from('posts')
  .select('id, slug, title, short_description, thumbnail_url, tags, created_at')
  .eq('status', 'published')
  .contains('tags', ['cad'])
  .order('created_at', { ascending: false })
```

## 8. Query trang chi tiết theo slug

```ts
import { supabase } from './supabase'
import type { PublicPost } from './post.types'

export async function getPublishedPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from('posts')
    .select(
      `
        id,
        slug,
        title,
        short_description,
        content,
        keywords,
        tags,
        thumbnail_url,
        bg_cover_url,
        seo,
        count_view,
        status,
        created_at,
        updated_at
      `,
    )
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle()

  if (error) throw error
  return data as PublicPost | null
}
```

`maybeSingle()` trả `null` khi slug không tồn tại, phù hợp để route trả HTTP 404.

## 9. Sanitize HTML trước khi render

HTML block trong editor chặn `<script>`, inline event handler như `onclick` và
URL `javascript:` ngay tại CMS. Website vẫn phải sanitize lại trước khi đưa HTML
vào DOM vì dữ liệu trong database luôn cần được xem là untrusted input.

```bash
bun add sanitize-html
bun add -d @types/sanitize-html
```

```ts
// src/lib/sanitize-post-content.ts
import sanitizeHtml from 'sanitize-html'

export function sanitizePostContent(html: string) {
  return sanitizeHtml(html, {
    allowedTags: [
      ...sanitizeHtml.defaults.allowedTags,
      'img',
      'figure',
      'figcaption',
      'section',
      'article',
    ],
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      a: ['href', 'target', 'rel', 'title', 'class'],
      img: ['src', 'alt', 'title', 'width', 'height', 'loading', 'class'],
      '*': ['id', 'class'],
    },
    allowedSchemes: ['http', 'https', 'mailto', 'tel'],
    allowedSchemesByTag: {
      img: ['http', 'https'],
    },
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', {
        rel: 'noopener noreferrer',
      }),
      img: sanitizeHtml.simpleTransform('img', {
        loading: 'lazy',
      }),
    },
  })
}
```

Không cho phép nếu chưa có use case và policy riêng:

- `<script>` và inline event handler.
- `<iframe>`.
- URL `javascript:` hoặc `data:`.
- Inline `style` không được kiểm soát.

Nếu website cần hỗ trợ inline style từ HTML block, chỉ allowlist từng CSS
property/value an toàn bằng sanitizer; không mở toàn bộ thuộc tính `style`.

## 10. Render nội dung trong React

```tsx
import { getLocalized } from './localized'
import { sanitizePostContent } from './sanitize-post-content'

export function PostArticle({
  content,
  locale,
}: {
  content: Record<string, string> | null
  locale: string
}) {
  const html = sanitizePostContent(getLocalized(content, locale))

  return (
    <article
      className="post-content prose prose-slate max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
```

`dangerouslySetInnerHTML` chỉ nhận HTML đã sanitize. Không sanitize bằng regex.

## 11. CSS cho nội dung editor

```css
.post-content {
  color: #334155;
  font-size: 1rem;
  line-height: 1.75;
}

.post-content :where(h1, h2, h3) {
  color: #0f172a;
  line-height: 1.2;
  margin: 1.5em 0 0.65em;
}

.post-content p {
  margin: 0 0 1em;
}

.post-content :where(ul, ol) {
  padding-left: 1.5rem;
}

.post-content blockquote {
  border-left: 3px solid #cbd5e1;
  color: #64748b;
  margin: 1.5rem 0;
  padding-left: 1rem;
}

.post-content a {
  color: #4f46e5;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.post-content img {
  border-radius: 0.75rem;
  display: block;
  height: auto;
  margin: 1.5rem auto;
  max-width: 100%;
}
```

Nếu dùng Tailwind Typography, dùng wrapper `prose`. Class động nằm trong HTML
database không được Tailwind tự phát hiện khi build; style qua wrapper hoặc
safelist rõ ràng.

## 12. Ảnh từ Supabase Storage

CMS lưu thumbnail/cover trong folder `posts` và ảnh Rich Editor trong
`posts/content/<locale>` của bucket public `media`. Database lưu public URL nên
website không cần query Storage riêng để render.

URL editor thường có dạng:

```text
https://<project>.supabase.co/storage/v1/object/public/media/posts/content/en/<file>
```

Nếu dùng image optimizer, allowlist hostname Supabase. Ví dụ Next.js:

```ts
// next.config.ts
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },
}

export default nextConfig
```

Public bucket chỉ cho phép đọc file qua URL. Quyền upload/delete vẫn phải được
bảo vệ bằng Storage RLS.

## 13. SEO theo locale

```ts
const title = getLocalized(post.title, locale)
const seo = getLocalizedSeo(post.seo, locale)

const pageTitle = seo?.metaTitle || title
const description =
  seo?.metaDescription || getLocalized(post.short_description, locale)
const canonical = seo?.canonicalUrl || currentUrl
const keywords = post.keywords ?? []
```

Dùng các giá trị này cho title, meta description, canonical URL, Open Graph và
structured data. Không lấy trực tiếp HTML `content` làm meta description.

## 14. Ví dụ loader với TanStack Router

Giữ route mỏng; fetch dữ liệu trong loader/repository và render trong feature:

```tsx
// src/routes/$locale/posts/$slug.tsx
import { createFileRoute, notFound } from '@tanstack/react-router'

import { PostDetailPage } from '@/features/posts/detail'
import { getPublishedPostBySlug } from '@/lib/posts'

export const Route = createFileRoute('/$locale/posts/$slug')({
  loader: async ({ params }) => {
    const post = await getPublishedPostBySlug(params.slug)
    if (!post) throw notFound()
    return { post }
  },
  component: PostDetailPage,
})
```

```tsx
import { useLoaderData, useParams } from '@tanstack/react-router'

import { getLocalized } from '@/lib/localized'
import { sanitizePostContent } from '@/lib/sanitize-post-content'

export function PostDetailPage() {
  const { post } = useLoaderData({ from: '/$locale/posts/$slug' })
  const { locale } = useParams({ from: '/$locale/posts/$slug' })
  const html = sanitizePostContent(getLocalized(post.content, locale))

  return (
    <main>
      <h1>{getLocalized(post.title, locale)}</h1>
      <article
        className="post-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </main>
  )
}
```

Feature component không import ngược route module để giữ dependency một chiều.

## 15. Cache và cập nhật nội dung

- SSR động: query mỗi request hoặc cache ngắn.
- ISR/static generation: revalidate theo thời gian hoặc trigger khi CMS publish.
- SPA: dùng React Query với `queryKey: ['post', slug, locale]`.
- Dùng `updated_at` làm cache version hoặc `Last-Modified` nếu cần.
- Danh sách có thể cache riêng với key `['posts', locale, tag]`.

Không cần subscribe Realtime mặc định cho nội dung bài viết.

## 16. Lượt xem

`count_view` hiện là trường chỉ đọc trong CMS. Website không nên tăng lượt xem
bằng cách cho client public gọi `update` trực tiếp lên row, vì như vậy sẽ mở
quyền ghi không cần thiết.

Nếu cần tracking chính xác, tạo một server endpoint hoặc Postgres RPC chuyên
biệt có rate limit/anti-abuse, chỉ cho phép tăng `count_view`, rồi kiểm tra quyền
và security advisor trước khi deploy. Không dùng `service_role` trong browser.

## 17. Checklist tích hợp

- [ ] Website chỉ dùng publishable/anon key.
- [ ] `posts` có `GRANT SELECT` cho role public cần thiết.
- [ ] RLS chỉ trả row `status = 'published'`.
- [ ] Query vẫn filter `status = 'published'`.
- [ ] Locale fallback là requested locale → `en` → first non-empty.
- [ ] HTML được sanitize trước `dangerouslySetInnerHTML`.
- [ ] Script, iframe, event handler và URL nguy hiểm bị loại bỏ.
- [ ] CSS wrapper style heading, list, quote, link và image.
- [ ] Supabase Storage hostname được allowlist nếu dùng image optimizer.
- [ ] Draft Post không thể đọc bằng anon key.
- [ ] Slug không tồn tại trả đúng HTTP 404.
- [ ] SEO metadata dùng đúng locale và fallback.
- [ ] Website không mở public `UPDATE` chỉ để tăng `count_view`.

## 18. Kiểm tra nhanh RLS

Chạy bằng chính publishable/anon key của website, không dùng service role:

```ts
const { data, error } = await supabase.from('posts').select('slug, status')

console.log({ data, error })
```

Kết quả mong đợi:

- Chỉ có row `published`.
- Không có draft.
- Không có lỗi `42501`.

Nếu draft xuất hiện, dừng deploy và sửa RLS. Nếu gặp `42501`, kiểm tra explicit
`GRANT SELECT` và Data API exposure của bảng.
