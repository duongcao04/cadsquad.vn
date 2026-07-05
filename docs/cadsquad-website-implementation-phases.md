# CADSQUAD Website Implementation Phases

## Goal

Refactor and build the website around feature-based routes. Home introduces the CADSQUAD ecosystem, while each feature page focuses on one business unit:

- CAD Services
- CSD Digital
- CSD Academy
- Affiliate
- About Us
- News & Media

The `src/app` folder should stay as route wrappers only. Real page logic, components, API, queries, and schemas should live inside `src/features`.

## Phase 1: Stabilize Route And Feature Structure

### Objective

Make sure every route in `src/app` maps to a matching feature folder in `src/features`.

### Tasks

- Keep `src/app/[locale]/...` files as thin route wrappers.
- Move page implementation into matching `src/features/*/page.tsx`.
- Move layout implementation into matching `src/features/*/layout.tsx`.
- Keep nested routes mirrored between `src/app` and `src/features`.
- Do not create large grouping folders such as `landing` inside `src/features`.

### Expected Structure

```txt
src/features/
  about-us/
  academy/
  cad-services/
  digital-service/
  home/
  news-and-media/
  not-found/
```

### Acceptance Criteria

- App routes still work with the same URLs.
- Feature folders contain the real implementation.
- `src/app` contains only route-level wrappers/re-exports.
- `npm run build` passes.

## Phase 2: Home Page As Ecosystem Landing

### Objective

Adjust Home so it presents CADSQUAD as a full ecosystem, not only a CAD service company.

### Source Idea From PPTX

Home should introduce:

- CAD Services
- Digital Services / CSD Digital
- Learning Courses / CSD Academy
- Affiliate

### Tasks

- Review `src/features/home/page.tsx`.
- Reuse or refactor existing Home components:
  - `banner`
  - `our-services`
  - `why-choose-us`
  - `workflow`
  - `partner`
  - `contact-us`
- Make `our-services` show the ecosystem services:
  - CAD Services
  - CSD Digital
  - CSD Academy
  - Affiliate
- Keep content short on Home and link users into each feature page.

### Suggested Home Sections

1. Hero / Banner
2. Ecosystem Services
3. Why Choose CADSQUAD
4. Workflow
5. Partners / Clients
6. Contact CTA

### Acceptance Criteria

- Home clearly communicates CADSQUAD as an ecosystem.
- CAD Services, Digital Services, Academy, and Affiliate are visible.
- Home does not duplicate all detail from feature pages.
- Responsive layout works on mobile and desktop.

## Phase 3: CAD Services Page

### Objective

Build `cad-services` as a focused service page using the Home visual style, but with CAD-specific content.

### Feature Location

```txt
src/features/cad-services/
  _api/
  _queries/
  _schemas/
  _components/
  [slug]/
  page.tsx
  layout.tsx
```

### Tasks

- Create or refine CAD-specific components in `_components`.
- Use Supabase API/query layer for CAD service data.
- Use React Query query options from `_queries`.
- Render service data in `page.tsx`.
- Keep detail route `[slug]` ready for individual CAD service pages.

### Suggested Components

```txt
src/features/cad-services/_components/
  cad-services-hero.tsx
  our-cad-services.tsx
  cad-services-value.tsx
  cad-services-workflow.tsx
  cad-services-industries.tsx
  cad-services-contact.tsx
```

### Suggested Page Sections

1. CAD Services Hero
2. Our CAD Services
3. Why Choose CADSQUAD For CAD
4. CAD Workflow
5. Industries / Use Cases
6. Contact CTA

### Content Direction

Use the PPTX ideas:

- Global Engineering Partner
- Engineering ideas into reliable real-world solutions
- Integrated expertise
- Industry-driven knowledge
- Innovation and technology
- End-to-end solutions
- Scalable partnership

### Workflow

Use the 5-step workflow from the PPTX:

1. Discover & Understand
2. Analyze & Strategize
3. Execute with Precision
4. Review & Optimize
5. Deliver & Support

### Acceptance Criteria

- CAD Services page does not depend on Home page internals.
- Shared visual style is preserved.
- Services can be loaded from Supabase.
- Loading/error/empty states are handled.
- Detail route `[slug]` can display one service.
- `npm run build` passes.

## Phase 4: Digital Services Page

### Objective

Build `digital-service` with the same architecture as CAD Services.

### Feature Location

```txt
src/features/digital-service/
  _api/
  _queries/
  _schemas/
  _components/
  [slug]/
  page.tsx
  layout.tsx
```

### Tasks

- Make API functions read digital service data from Supabase.
- Make React Query query options in `_queries`.
- Render service data in `page.tsx`.
- Prepare `[slug]` detail page.
- Inject digital service data into header navigation the same way as CAD Services.

### Suggested Components

```txt
src/features/digital-service/_components/
  digital-service-hero.tsx
  our-digital-services.tsx
  digital-service-value.tsx
  digital-service-workflow.tsx
  digital-service-contact.tsx
```

### Content Direction

Use the PPTX ideas:

- CSD Digital
- Website development
- Digital design
- Online business solutions
- Corporate websites
- E-commerce
- Branding
- Digital optimization
- Strong digital identity
- Sustainable growth

### Acceptance Criteria

- Digital Services page follows the same architecture as CAD Services.
- Data comes from Supabase.
- Header navigation can show digital services dynamically.
- Loading/error/empty states are handled.
- `npm run build` passes.

## Phase 5: Academy Page

### Objective

Prepare CSD Academy as its own feature page for training and courses.

### Feature Location

```txt
src/features/academy/
  _api/
  _queries/
  _schemas/
  _components/
  page.tsx
  layout.tsx
```

### Tasks

- Add `_components` if missing.
- Add API/query/schema only when data is ready.
- Build page structure for courses and training programs.
- Keep the page ready for future Supabase course data.

### Content Direction

Use the PPTX ideas:

- CSD Academy
- Professional training division
- CAD design training
- Engineering software training
- Digital skills training
- Hands-on learning
- Bridge theory and real-world application

### Suggested Page Sections

1. Academy Hero
2. Featured Courses
3. Learning Paths
4. Why Learn With CADSQUAD
5. Contact / Register CTA

### Acceptance Criteria

- Academy page has its own feature components.
- Home links to Academy.
- Page is ready for course data later.
- `npm run build` passes.

## Phase 6: Affiliate Page Or Section

### Objective

Add Affiliate as a proper business flow.

### Route Decision

Recommended route:

```txt
/affiliate
```

Feature folder:

```txt
src/features/affiliate/
  _api/
  _queries/
  _schemas/
  _components/
  page.tsx
  layout.tsx
```

### Content Direction

Use the PPTX ideas:

- For people who have customer relationships in engineering, manufacturing, digital, or training.
- They can refer customers without handling technical delivery.
- CADSQUAD contacts the customer, runs the project, and pays commission.

### Suggested Page Sections

1. Affiliate Hero
2. Who It Is For
3. How It Works
4. Benefits
5. Transparency / Commission Tracking
6. Join CTA

### How It Works

1. Affiliate has a potential customer.
2. Affiliate submits customer information.
3. CADSQUAD contacts the customer.
4. CADSQUAD implements the project.
5. Affiliate receives commission.

### Acceptance Criteria

- Affiliate appears on Home.
- Affiliate has a clear conversion CTA.
- Affiliate does not require technical project handling from the user.
- `npm run build` passes.

## Phase 7: Shared Navigation And Query Keys

### Objective

Make header navigation dynamic where needed, but keep static fallback data.

### Tasks

- Keep static navigation constants for stable top-level routes.
- Use hooks to inject Supabase service data into navigation.
- Keep query keys centralized.
- Avoid importing React hooks into constants.

### Recommended Files

```txt
src/shared/constants/header-navigate.ts
src/shared/constants/query-keys.ts
src/shared/hooks/use-header-navigates.ts
```

### Rules

- Constants should stay pure.
- Hooks can read query data.
- Header components should consume the hook.
- Query keys should be reused by all `_queries`.

### Acceptance Criteria

- Header works before dynamic data loads.
- CAD Services submenu can use Supabase data.
- Digital Services submenu can use Supabase data.
- No hooks are used inside constants.
- `npm run build` passes.

## Phase 8: Supabase Data Layer

### Objective

Standardize all service data fetching through Supabase and React Query.

### Tasks

- Keep Supabase client in `src/lib/supabase`.
- Keep feature API functions inside each feature `_api`.
- Keep query options inside each feature `_queries`.
- Keep schemas/types inside each feature `_schemas`.
- Remove Firebase code and Firebase keys completely.

### Query Pattern

Each feature should follow this shape:

```txt
_api/
  feature.api.ts

_queries/
  feature.queries.ts
  feature.mutations.ts
  index.ts

_schemas/
  feature.schema.ts
  index.ts
```

### Acceptance Criteria

- No Firebase imports remain.
- No Firebase env variables are required.
- Supabase queries are isolated by feature.
- Query keys are centralized.
- `npm run build` passes.

## Phase 9: Content And Translations

### Objective

Make all visible page text localization-ready.

### Tasks

- Update English messages in `public/messages/en`.
- Update Vietnamese messages in `public/messages/vi`.
- Avoid hardcoding long visible strings directly inside components.
- Keep service data in Supabase if it is dynamic content.
- Keep UI labels in translation files.

### Acceptance Criteria

- English and Vietnamese pages both render.
- Header navigation labels are translated.
- Home, CAD Services, Digital Services, Academy, and Affiliate have matching message keys.
- Missing translation warnings are resolved.

## Phase 10: Validation

### Objective

Make sure the refactor is stable before release.

### Required Checks

Run:

```bash
npm run lint
npm run build
```

If available, also run:

```bash
npm run typecheck
```

### Manual QA

Check these routes:

```txt
/en
/vi
/en/cad-services
/vi/cad-services
/en/cad-services/[slug]
/en/digital-services
/vi/digital-services
/en/digital-services/[slug]
/en/academy
/vi/academy
/en/about-us
/vi/about-us
```

### Acceptance Criteria

- Build passes.
- No broken imports.
- No old camelCase file imports remain where files were renamed to kebab-case.
- Header dynamic menus work.
- Language config works globally.
- Pages render on mobile and desktop.

## Implementation Order Recommendation

1. Confirm route wrappers are clean.
2. Finish Home ecosystem content.
3. Finish CAD Services page.
4. Finish Digital Services page.
5. Prepare Academy page.
6. Add Affiliate page if route is approved.
7. Finalize navigation/query keys.
8. Finalize translations.
9. Run lint/build/manual QA.

