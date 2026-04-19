@AGENTS.md

# Daily Chinese Horoscope (데일리 사주)

## What This Project Is
A bilingual (Korean/English) BaZi (四柱命理學) fortune-telling web app. Users enter birth date/time and receive daily, weekly, and monthly fortune readings based on traditional Four Pillars of Destiny.

## Tech Stack
- **Framework**: Next.js 16.2.3 (App Router, Turbopack)
- **Language**: TypeScript 5, React 19
- **Styling**: Tailwind CSS 4
- **Deploy**: Vercel (auto-deploy on merge to main)
- **Analytics**: Vercel Analytics
- **Ads**: Google AdSense (`ca-pub-4091214263021506`)

## Architecture Decisions
- **Bilingual via React Context**: `LanguageContext` + `useLanguage()` hook. All UI strings in `app/translations/index.ts`. Horoscope data arrays in `horoscopeBuilder.ts` use `{ko: [...], en: [...]}` shape.
- **Server/Client split**: Pages that need metadata exports (SEO) stay as Server Components with thin client wrappers (e.g., `BlogListContent.tsx`, `BlogPostContent.tsx`).
- **No database**: All blog content lives in `app/blog/data.ts`. Fortune logic is pure client-side computation.
- **Language persistence**: localStorage key `"lang"`, values `"ko"` | `"en"`.

## Key Files
| File | Role |
|------|------|
| `app/page.tsx` | Main fortune input form + result display |
| `app/utils/horoscopeBuilder.ts` | Fortune calculation engine (bilingual) |
| `app/translations/index.ts` | All UI string translations |
| `app/context/LanguageContext.tsx` | Language state provider |
| `app/blog/data.ts` | All blog post content (11 posts, bilingual) |
| `app/components/Providers.tsx` | Root wrapper (Language + Footer) |

## Domain Terminology
- **BaZi (八字)**: The standard English term we use for 사주팔자.
- **Five Elements (五行/오행)**: Wood, Fire, Earth, Metal, Water.
- **Ten Gods (十星/십성)**: Companion, Rob Wealth, Eating God, Hurting Officer, Indirect Wealth, Direct Wealth, Seven Killings, Direct Officer, Indirect Seal, Direct Seal.
- **Spiritual Markers (神殺/신살)**: Auxiliary fate indicators.
- **Chung (沖/충)**: Earthly Branch clash.

## Current Status (2026-04-19)
- Site is live at https://daily-chinese-horoscope.vercel.app
- Google AdSense applied — awaiting approval
- 11 blog posts, 6 pages total
- All legal pages (Privacy, Terms, About) complete
