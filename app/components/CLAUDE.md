# Components Directory

## Component Patterns
- All components here are **Client Components** ("use client").
- Every component with user-visible text must use the bilingual pattern (`useLanguage` + `getTranslations`).

## Existing Components
| Component | Purpose |
|-----------|---------|
| `Providers.tsx` | Root wrapper — includes `LanguageProvider`, `LanguageToggle`, `Footer`. Used in `layout.tsx`. |
| `LanguageToggle.tsx` | Fixed top-right button to switch ko/en. Gold gradient for active language. |
| `Footer.tsx` | Global footer with links to /about, /privacy, /terms, /blog. Includes disclaimer. |

## Adding New Components
- Place shared/reusable components here.
- Page-specific components (e.g., `BlogListContent.tsx`) go in their route folder, not here.
- Always support both languages — no hardcoded text.
