# TASK.md — CMS quản lý nội dung Cadsquad.vn (Vite app)

> Tài liệu bàn giao cho **project Vite mới** dùng để quản lý nội dung của cadsquad.vn.
> Nguồn dữ liệu: **Supabase** (Postgres + Auth + Storage) — dùng chung DB với site Next.js hiện tại.
> Trích từ codebase Next.js ngày 2026-07-05.

---

## 0. Bối cảnh & kiến trúc

- Site chính (marketing) là **Next.js 15 (App Router)**, đã có sẵn khu admin ở `src/app/[locale]/(admin)/`.
- Nội dung đa ngôn ngữ lưu dạng **JSONB locale-map**: `{ "en": "...", "vi": "..." }`. Thêm ngôn ngữ **không cần migration** — chỉ thêm vào `LANGUAGE_LIST` (xem `src/config/app.config.ts`). Fallback về `en`.
- CMS Vite mới chỉ cần **kết nối cùng Supabase project**. Không cần đụng vào code Next.js.
- 3 bảng nội dung: `service_categories`, `services`, `posts` + bảng allowlist `admin_emails`.

### ⚠️ Quyết định kiến trúc quan trọng (đọc trước khi code)

| Vấn đề                             | Trong Next.js hiện tại                                         | Trong Vite SPA (khuyến nghị)                                                                                                                                    |
| ---------------------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ghi dữ liệu (create/update/delete) | Dùng `service_role` key ở server để bypass RLS                 | **KHÔNG dùng service_role trong browser** (sẽ lộ toàn quyền DB). RLS đã cho admin ghi qua policy `is_admin()` → chỉ cần login đúng admin + anon key là đủ CRUD. |
| Phân quyền admin                   | Vừa check env `ADMIN_EMAILS`, vừa dựa DB `admin_emails`        | Chỉ cần email nằm trong **bảng `admin_emails`** (nguồn chân lý của RLS).                                                                                        |
| Dịch tự động (OpenAI)              | API route `/api/admin/translate` (server giữ `OPENAI_API_KEY`) | Không giữ key OpenAI trong browser. Chọn 1 trong: (a) Supabase **Edge Function**, (b) gọi lại endpoint Next.js hiện có, (c) tạm bỏ.                             |

**Tóm lại cho Vite:** `@supabase/supabase-js` + anon key + đăng nhập tài khoản admin → RLS tự cấp quyền ghi. Không cần backend riêng cho CRUD.

---

## 1. Database schema

> Nguồn: `supabase/migrations/0001_schema.sql`. DB đã tồn tại — **không chạy lại migration**, chỉ tham chiếu.

### 1.1 `service_categories` — nhóm dịch vụ (VD: "CAD Services", "Digital Services")

| Cột                         | Kiểu          | Ghi chú                          |
| --------------------------- | ------------- | -------------------------------- |
| `id`                        | `uuid` PK     | `gen_random_uuid()`              |
| `order`                     | `integer`     | mặc định 0, dùng để sắp xếp      |
| `slug`                      | `text` UNIQUE | kebab-case, bắt buộc             |
| `name`                      | `jsonb`       | locale-map `{en, vi}`            |
| `description`               | `jsonb`       | locale-map                       |
| `created_at` / `updated_at` | `timestamptz` | trigger tự cập nhật `updated_at` |

### 1.2 `services` — dịch vụ

| Cột                         | Kiểu                                | Ghi chú                                                                                 |
| --------------------------- | ----------------------------------- | --------------------------------------------------------------------------------------- |
| `id`                        | `uuid` PK                           |                                                                                         |
| `category_id`               | `uuid` FK → `service_categories.id` | `on delete set null`                                                                    |
| `order`                     | `integer`                           | sắp xếp                                                                                 |
| `slug`                      | `text` UNIQUE                       | kebab-case                                                                              |
| `title`                     | `jsonb`                             | locale-map                                                                              |
| `short_description`         | `jsonb`                             | locale-map                                                                              |
| `description`               | `jsonb`                             | locale-map (rich/HTML)                                                                  |
| `plain_description`         | `jsonb`                             | locale-map (text thuần, cho SEO/preview)                                                |
| `content`                   | `jsonb`                             | locale-map (nội dung chính, HTML/markdown)                                              |
| `thumbnail`                 | `jsonb`                             | object: `{ vertical?, horizontal?, verticalType?, horizontalType? }` (URL + loại media) |
| `images`                    | `text[]`                            | mảng URL ảnh                                                                            |
| `status`                    | `text`                              | `'draft'                                                                                | 'published'` (CHECK) |
| `created_at` / `updated_at` | `timestamptz`                       |                                                                                         |

### 1.3 `posts` — bài viết / blog

| Cột                         | Kiểu              | Ghi chú                                |
| --------------------------- | ----------------- | -------------------------------------- |
| `id`                        | `uuid` PK         |                                        |
| `slug`                      | `text` UNIQUE     | kebab-case                             |
| `title`                     | `jsonb`           | locale-map                             |
| `short_description`         | `jsonb`           | locale-map                             |
| `content`                   | `jsonb`           | locale-map                             |
| `keywords`                  | `text[]`          | SEO                                    |
| `tags`                      | `text[]`          |                                        |
| `thumbnail_url`             | `text` (nullable) |                                        |
| `bg_cover_url`              | `text` (nullable) |                                        |
| `count_view`                | `integer`         | mặc định 0, **không** cho sửa qua form |
| `status`                    | `text`            | `'draft'                               | 'published'` |
| `created_at` / `updated_at` | `timestamptz`     |                                        |

### 1.4 `admin_emails` — allowlist admin (nguồn chân lý của RLS)

| Cột          | Kiểu          |
| ------------ | ------------- |
| `email`      | `text` PK     |
| `created_at` | `timestamptz` |

Thêm admin: `insert into public.admin_emails (email) values ('you@example.com') on conflict do nothing;`

### 1.5 Naming convention: DB (snake_case) ↔ App (camelCase)

Code Next.js map giữa 2 tầng (xem `src/lib/data/*.ts`). CMS Vite nên tạo adapter tương tự:

```
category_id → categoryId    short_description → shortDescription
plain_description → plainDescription    thumbnail_url → thumbnailUrl
bg_cover_url → bgCoverUrl    count_view → countView
created_at → createdAt    updated_at → updatedAt
```

---

## 2. Row Level Security (RLS) — quan trọng cho quyền truy cập

> Nguồn: `supabase/migrations/0002_rls.sql`. RLS **đang bật** trên cả 4 bảng.

- Helper DB: `public.is_admin()` — trả `true` nếu `auth.jwt() ->> 'email'` nằm trong `admin_emails` (không phân biệt hoa/thường).
- **Đọc (SELECT):**
  - `service_categories`: ai cũng đọc được (`using (true)`).
  - `services` / `posts`: public chỉ thấy `status = 'published'`; admin thấy tất cả (kể cả draft).
- **Ghi (INSERT/UPDATE/DELETE):** chỉ admin (`is_admin()`), áp dụng cho cả 3 bảng nội dung + `admin_emails`.

👉 **Hệ quả cho CMS:** đăng nhập bằng tài khoản admin (email có trong `admin_emails`) rồi dùng anon key là **đủ quyền CRUD** — RLS lo phần bảo mật. Draft cũng tự hiện ra vì bạn là admin.

---

## 3. Storage — upload ảnh/media

> Nguồn: `supabase/migrations/0003_storage.sql` + `src/lib/supabase/storage.ts`.

- Bucket: **`media`** (public read).
- Quyền: ai cũng đọc; chỉ admin (`is_admin()`) được upload/update/delete.
- Pattern upload hiện tại (áp dụng lại cho Vite):

```ts
const ext = file.name.includes('.') ? file.name.split('.').pop() : 'bin'
const rand = Math.random().toString(36).slice(2, 10)
const path = `${folder}/${Date.now()}-${rand}.${ext}` // folder mặc định 'uploads'
await supabase.storage
  .from('media')
  .upload(path, file, { cacheControl: '3600', upsert: false })
const { data } = supabase.storage.from('media').getPublicUrl(path) // → data.publicUrl lưu vào DB
```

---

## 4. Authentication

- Dùng **Supabase Auth email/password** (`supabase.auth.signInWithPassword`).
- Sau khi login: kiểm tra email có trong `admin_emails` không (nếu không → `signOut` + báo lỗi). RLS cũng tự chặn ghi nếu không phải admin, nhưng nên chặn sớm ở UI cho UX tốt.
- Tài khoản admin phải: (1) tồn tại trong Supabase Auth, (2) email nằm trong bảng `admin_emails`.

---

## 5. Biến môi trường (`.env` cho Vite)

> Vite expose biến ra client qua tiền tố **`VITE_`**. Chỉ đưa ra client những gì an toàn.

### 5.1 An toàn cho client (bắt buộc)

```env
VITE_SUPABASE_URL=            # = NEXT_PUBLIC_SUPABASE_URL của site hiện tại
VITE_SUPABASE_ANON_KEY=       # = NEXT_PUBLIC_SUPABASE_ANON_KEY
```

### 5.2 TUYỆT ĐỐI KHÔNG đưa vào client Vite (chỉ dùng nếu có backend/Edge Function riêng)

```env
# SUPABASE_SERVICE_ROLE_KEY   ❌ bypass toàn bộ RLS — lộ = mất sạch DB
# OPENAI_API_KEY              ❌ secret tính phí — chỉ dùng phía server
# OPENAI_TRANSLATE_MODEL      (default: gpt-4o-mini) — chỉ phía server
```

### 5.3 Không liên quan CMS (của site marketing, bỏ qua)

`NEXT_PUBLIC_URL`, `NEXT_PUBLIC_API_ENDPOINT`, `NEXT_PUBLIC_CADSQUAD_EMAIL`, `NEXT_PUBLIC_NODEMAILER_PORT`, `NEXT_PUBLIC_SMTP_USER`, `NEXT_PUBLIC_SMTP_PASS`, `ADMIN_EMAILS` (env này Next.js dùng song song; CMS chỉ cần bảng `admin_emails` trong DB).

---

## 6. Validation rules (mirror từ zod schema hiện tại)

> Nguồn: `src/validationSchemas/*.ts`. Nên tái sử dụng đúng luật này để dữ liệu tương thích site.

- **slug:** bắt buộc, regex `^[a-z0-9-]+$` (kebab-case), unique theo bảng.
- **locale-map field** (`title`, `name`, `content`, ...): object `Record<string,string>`; tối thiểu nên có `en`. Fallback khi thiếu: `locale → en → giá trị non-empty đầu tiên`.
- **status:** `'draft' | 'published'`, mặc định `draft`.
- **order:** integer, mặc định 0.
- **service.thumbnail:** object `{ vertical?, horizontal?, verticalType?, horizontalType? }`.
- **images:** `string[]` (URL).
- **posts.keywords / posts.tags:** `string[]`.
- Field không cho sửa qua form: `id`, `createdAt`, `updatedAt`, `posts.countView`.

Helper cần port sang Vite (từ `localized.schema.ts`):

- `getLocalized(map, locale)` — lấy chuỗi theo locale + fallback.
- `makeLocalized(value, locale)` — tạo locale-map rỗng seed 1 giá trị.

---

## 7. Danh sách công việc (Task breakdown)

### Phase 0 — Khởi tạo project

- [ ] `npm create vite@latest` (React + TypeScript).
- [ ] Cài `@supabase/supabase-js`, `zod`, `react-hook-form`, `@hookform/resolvers`, router (react-router), UI lib tùy chọn.
- [ ] Tạo `.env` với `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` (mục 5.1).
- [ ] Khởi tạo Supabase client (`createClient(url, anonKey)`).

### Phase 1 — Auth

- [ ] Trang Login (email/password) → `signInWithPassword`.
- [ ] Sau login: kiểm tra email ∈ `admin_emails`; nếu không → signOut + báo lỗi "không có quyền admin".
- [ ] Route guard: chưa đăng nhập → về `/login`.
- [ ] Lắng nghe `onAuthStateChange`, lưu session, nút Logout.

### Phase 2 — Nền tảng dữ liệu

- [ ] Port zod schemas: `service-category`, `service`, `post`, `localized`, `common(status)`.
- [ ] Viết adapter `fromRow`/`toRow` (snake_case ↔ camelCase) cho 3 entity.
- [ ] Component **LocalizedInput / LocalizedEditor**: nhập từng ngôn ngữ theo tab (en/vi), đọc `LANGUAGE_LIST`.
- [ ] Component **MediaUpload**: upload lên bucket `media`, trả public URL.

### Phase 3 — CRUD Service Categories

- [ ] List (sort theo `order`), tạo, sửa, xóa.
- [ ] Form: `order`, `slug`, `name` (locale), `description` (locale).
- [ ] Cảnh báo: xóa category → services liên quan bị set `category_id = null`.

### Phase 4 — CRUD Services

- [ ] List có filter theo category + status, sort theo `order`.
- [ ] Form đầy đủ: `categoryId` (select), `order`, `slug`, `title`, `shortDescription`, `description`, `plainDescription`, `content` (đều locale), `thumbnail` (vertical/horizontal), `images[]`, `status`.
- [ ] Toggle draft/published.

### Phase 5 — CRUD Posts

- [ ] List (sort `created_at desc`), filter status.
- [ ] Form: `slug`, `title`, `shortDescription`, `content` (locale), `keywords[]`, `tags[]`, `thumbnailUrl`, `bgCoverUrl`, `status`. Hiển thị `countView` read-only.
- [ ] Toggle draft/published.

### Phase 6 — Dịch tự động (tùy chọn, cần backend)

- [ ] Chọn phương án: Supabase Edge Function giữ `OPENAI_API_KEY` **hoặc** gọi lại `/api/admin/translate` của Next.js.
- [ ] Nút "Dịch từ en → vi" cho các field locale (model mặc định `gpt-4o-mini`, `temperature 0.2`, giữ nguyên cấu trúc html/markdown — xem `src/app/api/admin/translate/route.ts`).

### Phase 7 — Hoàn thiện

- [ ] Dashboard tổng quan (đếm số category/service/post, draft vs published).
- [ ] Xử lý lỗi RLS/permission thân thiện.
- [ ] Kiểm tra slug trùng trước khi submit.
- [ ] Deploy (Vercel/Netlify/Cloudflare Pages — SPA tĩnh, chỉ cần 2 biến env).

---

## 8. File tham chiếu trong repo Next.js (để copy logic)

| Cần                  | File                                                                      |
| -------------------- | ------------------------------------------------------------------------- |
| Schema SQL           | `supabase/migrations/0001_schema.sql`, `0002_rls.sql`, `0003_storage.sql` |
| Data layer / adapter | `src/lib/data/{services,posts,service-categories}.ts`                     |
| Zod schemas          | `src/validationSchemas/*.schema.ts`                                       |
| Locale-map helpers   | `src/validationSchemas/localized.schema.ts`                               |
| Cấu hình ngôn ngữ    | `src/config/app.config.ts`                                                |
| Env loader           | `src/config/env.config.ts`                                                |
| Supabase clients     | `src/lib/supabase/{client,admin,auth,storage}.ts`                         |
| Login + admin check  | `src/app/[locale]/(admin)/admin/login/page.tsx`, `_actions/auth.ts`       |
| Dịch AI              | `src/app/api/admin/translate/route.ts`, `src/lib/translate.ts`            |

</content>
</invoke>
