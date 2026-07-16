# Tích hợp nội dung Service vào website

Tài liệu này hướng dẫn website đọc nội dung Service được tạo bởi CMS từ
Supabase và render HTML an toàn. Nội dung trong Rich Editor và chế độ HTML đều
được lưu vào cùng cột `services.content`.

## 1. Cấu trúc dữ liệu

Các cột đa ngôn ngữ là JSONB locale-map:

```json
{
  "en": "<h2>Service content</h2><p>...</p>",
  "vi": "<h2>Nội dung dịch vụ</h2><p>...</p>"
}
```

Những cột chính website thường sử dụng:

| Cột Supabase        | Kiểu          | Mục đích                              |
| ------------------- | ------------- | ------------------------------------- |
| `slug`              | `text`        | URL của trang chi tiết.               |
| `title`             | `jsonb`       | Tiêu đề theo locale.                  |
| `short_description` | `jsonb`       | Mô tả ngắn theo locale.               |
| `description`       | `jsonb`       | Mô tả chi tiết theo locale.           |
| `content`           | `jsonb`       | HTML từ Rich Editor hoặc HTML editor. |
| `thumbnail`         | `jsonb`       | Ảnh dọc/ngang.                        |
| `images`            | `text[]`      | Gallery URL.                          |
| `seo`               | `jsonb`       | SEO theo locale.                      |
| `status`            | `text`        | Website chỉ lấy `published`.          |
| `updated_at`        | `timestamptz` | Cache invalidation hoặc sitemap.      |

## 2. Biến môi trường của website

Website frontend chỉ sử dụng Supabase URL và publishable/anon key:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

Không đưa `service_role`, secret key hoặc database connection string vào code
chạy trên trình duyệt. Những key đó bypass RLS.

## 3. Cài Supabase client

```bash
bun add @supabase/supabase-js
```

Tạo client dùng chung:

```ts
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
)
```

Nếu website dùng Next.js hoặc framework SSR khác, tạo client server theo hướng
dẫn của framework và đọc key từ server environment. Publishable key vẫn có thể
dùng phía server; không cần `service_role` để đọc nội dung public.

## 4. Grants và RLS bắt buộc

Data API cần cả hai lớp quyền:

1. `GRANT SELECT` cho role `anon`.
2. RLS policy chỉ cho đọc Service đã publish.

Kiểm tra trong Supabase SQL Editor:

```sql
grant select on table public.services to anon, authenticated;

alter table public.services enable row level security;

create policy "Public can read published services"
on public.services
for select
to anon, authenticated
using (status = 'published');
```

Không tạo policy public cho `insert`, `update` hoặc `delete`. CMS admin phải dùng
policy quản trị riêng.

Nếu query trả lỗi `42501 permission denied for table services`, kiểm tra
`GRANT SELECT` trước. Grants quyết định role có chạm được bảng hay không; RLS
quyết định role nhìn thấy những row nào.

## 5. Type dùng trên website

```ts
export type Localized = Record<string, string>

export type ServiceSeoEntry = {
  metaTitle?: string
  metaDescription?: string
  focusKeyword?: string
  canonicalUrl?: string
}

export type PublicService = {
  id: string
  slug: string
  title: Localized | null
  short_description: Localized | null
  description: Localized | null
  content: Localized | null
  thumbnail: {
    vertical?: string
    horizontal?: string
  } | null
  images: Array<string> | null
  seo: Record<string, ServiceSeoEntry> | null
  updated_at: string
}
```

## 6. Locale fallback

CMS dùng English (`en`) làm locale mặc định. Khi locale đang xem không có nội
dung, fallback theo thứ tự:

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
```

SEO cũng cần fallback theo locale:

```ts
export function getLocalizedSeo<T>(
  value: Record<string, T> | null | undefined,
  locale: string,
) {
  if (!value) return undefined
  return value[locale] ?? value.en ?? Object.values(value)[0]
}
```

## 7. Query danh sách Service

Chỉ select các cột website cần:

```ts
import { supabase } from './supabase'
import type { PublicService } from './service.types'

export async function getPublishedServices() {
  const { data, error } = await supabase
    .from('services')
    .select('id, slug, title, short_description, thumbnail, seo, updated_at')
    .eq('status', 'published')
    .order('order', { ascending: true })

  if (error) throw error
  return data as Array<PublicService>
}
```

Filter `status` ở query giúp request rõ ràng và giảm dữ liệu. RLS vẫn là lớp bảo
vệ bắt buộc; không dựa riêng vào filter phía client.

## 8. Query trang chi tiết theo slug

```ts
import { supabase } from './supabase'
import type { PublicService } from './service.types'

export async function getPublishedServiceBySlug(slug: string) {
  const { data, error } = await supabase
    .from('services')
    .select(
      `
        id,
        slug,
        title,
        short_description,
        description,
        content,
        thumbnail,
        images,
        seo,
        updated_at
      `,
    )
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle()

  if (error) throw error
  return data as PublicService | null
}
```

`maybeSingle()` phù hợp vì slug có thể không tồn tại; kết quả khi đó là `null`
thay vì một lỗi bắt buộc phải có row.

## 9. Sanitize HTML trước khi render

Chế độ HTML của CMS cho phép quản trị viên nhập markup trực tiếp. Website phải
sanitize trước khi đưa HTML vào DOM, kể cả khi chỉ admin có quyền viết.

Cài sanitizer chạy được ở server:

```bash
bun add sanitize-html
bun add -d @types/sanitize-html
```

```ts
// src/lib/sanitize-content.ts
import sanitizeHtml from 'sanitize-html'

export function sanitizeServiceContent(html: string) {
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

Không cho phép các thành phần sau nếu chưa có use case và policy riêng:

- `<script>` và inline event như `onclick`.
- `<iframe>`.
- URL `javascript:` hoặc `data:`.
- Inline `style` không được kiểm soát.

Nên sanitize ở server/loader và trả HTML sạch cho component. Nếu website chỉ là
SPA, sanitize ngay sau khi fetch và trước khi lưu vào state/render.

## 10. Render trong React

```tsx
import { getLocalized } from './localized'
import { sanitizeServiceContent } from './sanitize-content'

export function ServiceArticle({
  content,
  locale,
}: {
  content: Record<string, string> | null
  locale: string
}) {
  const html = sanitizeServiceContent(getLocalized(content, locale))

  return (
    <article
      className="service-content prose prose-slate max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
```

`dangerouslySetInnerHTML` chỉ nhận HTML đã sanitize. Không sanitize bằng regex.

## 11. CSS cho nội dung editor

Rich Editor tạo semantic HTML như `h2`, `p`, `ul`, `blockquote`, `a` và `img`.
Website nên style bằng một wrapper ổn định thay vì phụ thuộc hoàn toàn vào class
được lưu trong database:

```css
.service-content {
  color: #334155;
  font-size: 1rem;
  line-height: 1.75;
}

.service-content :where(h1, h2, h3) {
  color: #0f172a;
  line-height: 1.2;
  margin: 1.5em 0 0.65em;
}

.service-content p {
  margin: 0 0 1em;
}

.service-content :where(ul, ol) {
  padding-left: 1.5rem;
}

.service-content blockquote {
  border-left: 3px solid #cbd5e1;
  color: #64748b;
  margin: 1.5rem 0;
  padding-left: 1rem;
}

.service-content a {
  color: #4f46e5;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.service-content img {
  border-radius: 0.75rem;
  display: block;
  height: auto;
  margin: 1.5rem auto;
  max-width: 100%;
}
```

Nếu dùng Tailwind Typography, bật plugin `@tailwindcss/typography` và dùng
`prose`. Class nằm trong HTML database không được Tailwind tự động phát hiện khi
build; hãy style qua wrapper hoặc thêm safelist nếu thực sự cần.

## 12. Ảnh từ Supabase Storage

Editor upload ảnh vào bucket public `media` và lưu public URL trực tiếp trong
HTML. Website không cần query Storage riêng để render ảnh.

URL có dạng:

```text
https://<project>.supabase.co/storage/v1/object/public/media/services/content/en/<file>
```

Nếu website dùng image optimization có allowlist domain, thêm hostname Supabase
vào cấu hình. Ví dụ với Next.js:

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

Bucket public chỉ có nghĩa là file có public URL. Quyền upload/delete vẫn phải
được bảo vệ bằng Storage RLS; website public không cần quyền ghi.

## 13. SEO theo locale

```tsx
const title = getLocalized(service.title, locale)
const seo = getLocalizedSeo(service.seo, locale)

const pageTitle = seo?.metaTitle || title
const description =
  seo?.metaDescription || getLocalized(service.short_description, locale)
const canonical = seo?.canonicalUrl || currentUrl
```

Đưa các giá trị này vào `<title>`, meta description, canonical URL và Open Graph
metadata của framework. Không lấy trực tiếp HTML `content` làm meta description.

## 14. Ví dụ loader với TanStack Router

Giữ route mỏng và fetch dữ liệu trong loader hoặc repository:

```tsx
import { createFileRoute, notFound } from '@tanstack/react-router'

import { getPublishedServiceBySlug } from '@/lib/services'
import { ServiceDetailPage } from '@/features/services/detail'

export const Route = createFileRoute('/$locale/services/$slug')({
  loader: async ({ params }) => {
    const service = await getPublishedServiceBySlug(params.slug)
    if (!service) throw notFound()
    return { service }
  },
  component: ServiceDetailPage,
})
```

```tsx
import { useLoaderData, useParams } from '@tanstack/react-router'

export function ServiceDetailPage() {
  const { service } = useLoaderData({ from: '/$locale/services/$slug' })
  const { locale } = useParams({ from: '/$locale/services/$slug' })
  const html = sanitizeServiceContent(getLocalized(service.content, locale))

  return (
    <main>
      <h1>{getLocalized(service.title, locale)}</h1>
      <article
        className="service-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </main>
  )
}
```

Feature component không import route module ngược lại. Typed route hooks dùng
route id để đọc loader data và params mà vẫn giữ dependency một chiều.

## 15. Cache và cập nhật nội dung

Tuỳ framework:

- SSR động: query mỗi request hoặc cache ngắn.
- ISR/static generation: revalidate theo thời gian và trigger rebuild/revalidate
  khi CMS publish.
- SPA: dùng React Query với `queryKey: ['service', slug, locale]`.
- Dùng `updated_at` làm tín hiệu cache version hoặc `Last-Modified` nếu cần.

Trang public không nên subscribe Realtime mặc định. Nội dung Service thay đổi ít;
SSR/ISR hoặc query cache thường đơn giản và tiết kiệm hơn.

## 16. Checklist tích hợp

- [ ] Website chỉ dùng publishable/anon key.
- [ ] `services` có `GRANT SELECT` cho role public cần thiết.
- [ ] RLS bật và chỉ trả row `status = 'published'`.
- [ ] Query vẫn filter `status = 'published'`.
- [ ] Locale fallback là requested locale → `en` → first non-empty.
- [ ] HTML được sanitize trước `dangerouslySetInnerHTML`.
- [ ] Script, iframe, event handler và URL nguy hiểm bị loại bỏ.
- [ ] CSS wrapper style đầy đủ heading, list, quote, link và image.
- [ ] Supabase Storage hostname được allowlist nếu dùng image optimizer.
- [ ] Draft Service không thể đọc bằng anon key.
- [ ] Trang không tồn tại trả đúng HTTP 404.
- [ ] SEO metadata dùng đúng locale và fallback.

## 17. Kiểm tra nhanh RLS

Chạy query bằng chính publishable/anon key của website, không dùng service role:

```ts
const { data, error } = await supabase.from('services').select('slug, status')

console.log({ data, error })
```

Kết quả mong đợi:

- Chỉ có row `published`.
- Không có draft.
- Không có lỗi `42501`.

Nếu draft xuất hiện, dừng deploy và sửa RLS. Nếu gặp `42501`, kiểm tra explicit
`GRANT SELECT` và Data API exposure của bảng.
