# SESSION_SERVICES.md — Refactor trang danh sách Services (đang dở)

> Trạng thái: **bị ngắt giữa chừng**, mới `mkdir -p src/features/services/_components/tables`, **chưa ghi file code nào**. File này đủ chi tiết để tiếp tục mà không cần hỏi lại các quyết định đã chốt bên dưới.

## Yêu cầu gốc

Cập nhật lại `src/features/services/index.tsx` theo ảnh mock (đính kèm trong chat, không lưu vào repo):

- 5 stat card ở đầu trang: **Tổng services**, **Categories**, **Published / Draft**, **Giá trung bình**, **Nổi bật**.
- Toolbar 2 filter: "Tất cả category", "Tất cả trạng thái" (logic filter y hệt bản cũ, chỉ đổi UI sang HeroUI `Select`).
- Bảng: cột Order / Service (title + slug + star nếu nổi bật) / Category / Pricing (giá + loại dịch vụ) / Status (pill) / Actions (sửa, xoá).
- Nút "Thêm service" màu xanh, góc trên phải, link tới `/admin/services/create`.
- **Bắt buộc dùng TanStack Table + HeroUI `Table`** (không phải bảng HTML thô như bản cũ).
- **Bắt buộc tách file** theo cấu trúc:
  ```
  src/features/services/_components/tables/
    services-columns.tsx
    services-table.tsx
    services-toolbar.tsx
  ```
  (đặt tên chính xác này — user gõ rõ pattern `*-columns.tsx` / `*-table.tsx` / `*-toolbar.tsx`, prefix `services-` là suy luận hợp lý theo domain, có thể điều chỉnh nếu user muốn tên khác.)

## Research đã xong (không cần tra lại)

- `@tanstack/react-table` đã có sẵn trong `package.json` (`"latest"`).
- HeroUI v3 **có sẵn ví dụ chính thức tích hợp TanStack Table** trong docs Table component (mục "TanStack Table") — dùng `.claude/skills/heroui-react` skill, lệnh:
  ```
  node scripts/get_component_docs.mjs Table
  ```
  rồi tìm heading `### TanStack Table`. Pattern chuẩn: TanStack lo `columns`/`sorting`/`pagination`, HeroUI `Table` chỉ là rendering layer (`Table.Header` map từ `table.getHeaderGroups()`, `Table.Body` map từ `table.getRowModel().rows`, `flexRender` cho cell/header). Có sẵn hàm bridge 2 chiều `SortingState` (TanStack) ↔ `SortDescriptor` (HeroUI React Aria) — copy nguyên logic `toSortDescriptor`/`toSortingState` từ ví dụ.
- `Table.Body` có prop `renderEmptyState={() => <EmptyState>...</EmptyState>}` (component `EmptyState` từ `@heroui/react`) — dùng cho trường hợp list rỗng, thay cho hàng `colSpan` cũ.
- `Chip` component: `<Chip color="success" variant="soft" size="sm">` — dùng cho status pill (published → `success`, draft → `warning`).
- `Pagination` component: `Pagination.Content` / `Pagination.Item` / `Pagination.Previous` / `Pagination.Link` / `Pagination.Next`, đặt trong `Table.Footer`.
- Field `ServiceRecord.pricing` (đã thêm ở phiên trước) có shape `{ serviceType: 'single'|'package'|'custom', price: number|null, unit?, estimatedDuration? }`; `SERVICE_TYPE_LABELS` map sẵn trong `service.schema.ts` → "Đơn lẻ"/"Trọn gói"/"Tuỳ chỉnh". `ServiceRecord.displaySettings.isFeatured` dùng cho ngôi sao "Nổi bật".

## Kế hoạch file (chưa ghi, cần làm tiếp theo thứ tự này)

### 1. `src/features/services/_components/stat-cards.tsx`
Component `StatCard` dùng chung (icon vuông bo góc màu + label + value lớn + subtitle nhỏ) và `ServicesStatCards({ services, categories })` tính:
- Tổng services = `services.length`, subtitle = `${categories.length} categories`.
- Categories = `categories.length`, subtitle = tên category nối bằng " · " (`getLocalized(c.name, DEFAULT_LOCALE)`).
- Published/Draft = `"${published} / ${draft}"`, subtitle = `${percent}% published`.
- Giá trung bình = trung bình `pricing.price` trong các service có `price != null`, format `$${avg.toLocaleString('en-US')}`, subtitle = `${count} dịch vụ có giá`.
- Nổi bật = đếm `displaySettings.isFeatured === true`, subtitle cố định "Featured trên trang chủ".

Icon đề xuất (lucide-react): `Wrench` (xanh dương), `Layers`/`LayoutGrid` (xanh dương), `Layers3` (xanh lá), `DollarSign` (tím), `Star` (vàng cam). Không cần khớp pixel-perfect màu icon với ảnh mock, chỉ cần cùng tông semantic.

### 2. `src/features/services/_components/tables/services-columns.tsx`
`createColumnHelper<ServiceRecord>()`, export hàm factory `buildServicesColumns({ categories, onEdit, onDelete })` (nhận callback thay vì hardcode, để column file không phụ thuộc react-query/router).

- Cột `order` — accessor, sortable.
- Cột `service` (display) — title (`getLocalized(title, DEFAULT_LOCALE)`) + icon `Star` (fill amber) nếu `isFeatured` + slug mono nhỏ bên dưới. `isRowHeader` trên cột này khi render `Table.Column`.
- Cột `category` (accessorFn `categoryName(row.categoryId)`) — sortable vì có accessor string.
- Cột `pricing` (display, `enableSorting: false`) — dòng 1: `price != null ? "$" + price.toLocaleString('en-US') : "Báo giá riêng"`; dòng 2: `SERVICE_TYPE_LABELS[pricing.serviceType]`.
- Cột `status` (accessor) — `Chip` màu theo status.
- Cột `actions` (display, `enableSorting: false`) — nút sửa (`Pencil`, gọi `onEdit(service)`) + `DeleteButton` có sẵn (`src/components/admin/DeleteButton.tsx`, `onConfirm={() => onDelete(service)}`).

### 3. `src/features/services/_components/tables/services-table.tsx`
Component nhận `data: Array<ServiceRecord>` và `columns: ColumnDef<ServiceRecord>[]`, dựng `useReactTable` với `getCoreRowModel` + `getPaginationRowModel` + `getSortedRowModel` (copy pattern từ ví dụ HeroUI docs ở trên), `PAGE_SIZE = 10`. Render `Table` + `Table.ScrollContainer` + `Table.Content` (props `sortDescriptor`/`onSortChange` bridge) + `Table.Header`/`Table.Body` (`renderEmptyState`) + `Table.Footer` với `Pagination` (chỉ hiện khi `pageCount > 1`).

### 4. `src/features/services/_components/tables/services-toolbar.tsx`
2 `Select` HeroUI (category filter, status filter) — controlled, options `"all"` + danh sách thật. Giữ logic filter y hệt bản gốc (so `categoryFilter`/`statusFilter` ở component cha, không filter trong toolbar).

### 5. Viết lại `src/features/services/index.tsx`
Bỏ bảng HTML thô cũ, bỏ state `editing`/`open`/`close` (dead code — đây chính là nguồn gốc 2 lỗi tsc "declared but never read" đã thấy từ đầu phiên). Compose: `PageHeader` (giữ nguyên, khớp mock — không cần đổi sang `PageHeading`) → `ServicesStatCards` → `ServicesToolbar` → loading/error state → `ServicesTable`.

Nút "Thêm service": vẫn dùng `<Link to="/admin/services/create">` style thủ công như bản cũ (không phải `Button` component, vì `Button` không tự render thành `<a>`), đổi màu sang `bg-indigo-600 hover:bg-indigo-500` cho khớp tông "xanh dương" xuyên suốt app (đã dùng ở tab active, SEO icon, LanguageBar...).

## Quyết định cần chốt trước khi code tiếp (chưa hỏi user)

1. **Nút "Sửa" trỏ đi đâu?** Chưa có route edit (`/admin/services/$id` không tồn tại → TanStack Router `Link to=` sẽ lỗi type nếu trỏ tới route chưa sinh ra trong route tree). Đề xuất tạm: `onEdit` gọi `toast.info('Trang chỉnh sửa dịch vụ sẽ sớm ra mắt.')` thay vì im lặng không làm gì (khác bản cũ — bản cũ có `setEditing` nhưng không dùng vào đâu, dead code). Có thể user muốn tạo route edit luôn trong lượt này — **nên hỏi lại nếu resume** thay vì tự ý build thêm 1 trang edit ngoài phạm vi yêu cầu.
2. **Đơn giá hiển thị `$` hay format VNĐ?** Ảnh mock trang list dùng `$`. Giữ theo mock, nhưng đã ghi chú mâu thuẫn với label "VNĐ" ở form tạo trong `SESSION.md` mục 3.

## Việc KHÔNG cần làm lại khi resume

- Không cần đọc lại `service.schema.ts` / `services.ts` — đã có đủ field (`pricing`, `displaySettings`, `keywords`...) từ phiên trước, migration Supabase xem `SESSION.md` mục 2.
- Không cần tra lại HeroUI `Select`/`ListBox` API — đã dùng nhiều lần trong `create-service-form/`, copy pattern y hệt (`Select.Trigger`/`Select.Value`/`Select.Indicator`/`Select.Popover`/`ListBox.Item`/`ListBox.ItemIndicator`).
- Không cần tra lại `useAsyncList` — giữ nguyên hook cũ (`src/lib/hooks/useAsyncList.ts`), không đổi sang `useQuery` (ngoài phạm vi yêu cầu, các trang list khác — categories/posts — cũng đang dùng hook này, đổi lẻ tẻ 1 trang sẽ không nhất quán).

## Sau khi code xong — checklist bắt buộc

```bash
bunx tsc --noEmit          # phải sạch (trừ lỗi có sẵn không liên quan)
bunx eslint <các file mới>  # phải sạch
bunx vite build             # phải build được (bao gồm SSR)
```
