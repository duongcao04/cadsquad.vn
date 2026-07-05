# Session Log — CADSQUAD Website Refactor

Date: 2026-07-05 · Branch: `feat/update-v1.1`

Reference plan: [docs/cadsquad-website-implementation-phases.md](docs/cadsquad-website-implementation-phases.md)

---

## Key decisions

| # | Topic | Decision |
|---|-------|----------|
| 1 | Digital route | Canonical URL = `/digital-services` (plural). Deleted duplicate `digital-service` (singular) app route. Feature folder stays `digital-service` (internal name only). |
| 2 | CAD data | Keep static `CAD_SERVICES`; Supabase table not populated yet. |
| 3 | Scope/order | Run the 10-phase plan sequentially. |
| 4 | CAD page | Originally decoupled/home-style landing — **later reverted** (see below). `/cad-services` = simple hero + service list. |
| 5 | Ecosystem "CSD Digital" card | Links to `/about-us/about-cadsquad-digital` (not `/digital-services`). |
| 6 | Digital list data | Draft static `DIGITAL_SERVICES` (placeholder content/images). |

---

## What was done

### Phase 1 — Route/feature structure ✅
- Confirmed all `src/app` routes are thin 1-line wrappers re-exporting `src/features/*`.
- Deleted duplicate route `src/app/[locale]/(pages)/(landing)/digital-service/` (kept `/digital-services`).
- Build passes.

### Phase 2 — Home as ecosystem landing ✅
- New `src/features/home/_components/ecosystem-services.tsx` — 4 units: **CAD Services, CSD Digital, CSD Academy, Affiliate**. Affiliate = non-clickable "coming soon" card (no `/affiliate` route yet).
- Home section order: `Banner → Ecosystem → WhyChooseUs → Workflow → Partner → CustomerReview → ContactUs` (CustomerReview kept).
- i18n `home.sections.ecosystem` (en + vi).

### Shared infra extracted (kept, build-safe)
- `section.tsx` moved `home/_components` → **`src/shared/components/section.tsx`** (all 8 home importers repointed).
- **`src/shared/components/hero-banner.tsx`** (`HeroBanner`) — full-bleed image + white→dark gradient + word-by-word animated title/description + optional `children` CTA. Home `banner.tsx` consumes it.

### Phase 3 — CAD Services page ⟲ BUILT THEN REVERTED
- Was rebuilt as a home-style landing (hero + teaser + value + workflow + industries + contact) with a split sub-route `/cad-services/our-services`.
- **Reverted at user request** ("cad-service sẽ show our-service hiện tại"): `/cad-services` restored to the original committed page (hero + `CAD_SERVICES` `ServiceCard` list). All landing components, the `our-services` sub-route, and the extra `cadServices.sections`/`cadServices.hero`/`breadcrumbs.ourCadService` i18n were removed.
- Net effect: Phase 3 **not delivered** — CAD page is the simple original list again.

### Digital + About CSD Digital ✅ (out-of-sequence, user request)
- **New page `/about-us/about-cadsquad-digital`** ("About CSD Digital"): hero + intro + 4 offerings (web / e-commerce / branding / optimization) + CTA → `/digital-services`. i18n `landing.aboutCadsquadDigital` + `breadcrumbs.aboutCadsquadDigital`.
- **Header nav**: added 4th item under About Us dropdown → the new page (`header-navigate.ts`).
- **Ecosystem**: CSD Digital card href → `/about-us/about-cadsquad-digital`.
- **`/digital-services` now a real digital list** (was a verbatim CAD copy): new `src/shared/database/digitalServices.ts` (`DIGITAL_SERVICES`, CadService shape, 4 draft services), own digital `ServiceCard` (→ `/digital-services/[slug]`) and detail `PageBreadcumbs`. `digital-service/page.tsx` + `[slug]/page.tsx` rewritten off `DIGITAL_SERVICES`. i18n `landing.digitalServices.heading` + `breadcrumbs.digitalService`.

---

## Current route state

| Route | State |
|-------|-------|
| `/` (Home) | Ecosystem landing (Phase 2). Uses `HeroBanner`. |
| `/cad-services` | Original simple page: hero + CAD service list. |
| `/cad-services/[slug]` | CAD service detail (unchanged; imports `home/_components/our-services`). |
| `/digital-services` | Digital service list (DIGITAL_SERVICES, draft). |
| `/digital-services/[slug]` | Digital service detail (DIGITAL_SERVICES). |
| `/about-us/about-cadsquad-digital` | **New** About CSD Digital page. |

---

## Outstanding / placeholders (need user review)

- **Content** of Ecosystem cards, About CSD Digital, and the 4 digital services is **draft** written from the plan's bullet points.
- **Images** are placeholders: digital hero reuses `cad-services.webp`; digital service thumbnails use generic cloudinary URLs; ecosystem Digital/Academy/Affiliate cards borrow existing assets.
- **Affiliate**: no `/affiliate` route yet (ecosystem card is "coming soon") — Phase 6, route not approved.
- **Header submenu** for `/digital-services` still reads from Supabase (empty) — not wired to static `DIGITAL_SERVICES`. Deferred to Phase 7 (dynamic nav).
- `digital-service/[slug]/page.tsx` — CAD [slug] still imports `home/_components/our-services`; digital [slug] no longer does.

---

## Suggested next steps

1. Review/replace draft copy + placeholder images (digital + About CSD Digital + ecosystem).
2. Phase 4 remainder — flesh out Digital Services (real data → Supabase, own hero image).
3. Phase 5 — Academy page.
4. Phase 6 — decide `/affiliate` route.
5. Phase 7 — wire header submenus (CAD + Digital) to data.

Every change above was verified with `npm run build` passing after each step.
