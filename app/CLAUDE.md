# app/ Directory — Next.js App Router

## Routing Rules
- Each folder = a route. `page.tsx` renders that route.
- `layout.tsx` at root wraps all pages with `<Providers>`.
- Dynamic routes use `[slug]` folders with `generateStaticParams()`.

## Server vs Client Components
- **Default is Server Component** — no "use client" unless needed.
- Pages that export `metadata` or `generateMetadata` MUST be Server Components.
- For pages needing both metadata AND interactivity: keep `page.tsx` as a thin server shell, extract a `*Content.tsx` client wrapper.
- Example pattern: `app/blog/page.tsx` (server, exports metadata) → renders `BlogListContent.tsx` (client, uses hooks).

## Bilingual Pattern
1. Import `useLanguage` from `app/context/LanguageContext`.
2. Import `getTranslations` from `app/translations/index`.
3. `const { lang } = useLanguage(); const t = getTranslations(lang);`
4. Use `t.keyName` for all user-visible strings. Never hardcode Korean or English text.

## Styling
- Tailwind CSS 4 utility classes only. No CSS modules.
- Dark theme with gold/amber accents (`amber-400`, `yellow-300`).
- Background: `gray-900` / `gray-800`. Text: `gray-100` / `gray-300`.
- Responsive: mobile-first, use `md:` and `lg:` breakpoints.
