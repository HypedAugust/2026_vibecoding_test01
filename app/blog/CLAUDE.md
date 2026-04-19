# Blog Content Rules

## Data Source
- All posts live in `data.ts` as a `BlogPost[]` array. No database, no CMS.
- Each post has both Korean and English fields: `title`/`title_en`, `excerpt`/`excerpt_en`, `content`/`content_en`, `category`/`category_en`.

## Adding a New Post
1. Add entry to the `blogPosts` array in `data.ts`.
2. Required fields: `slug`, `title`, `title_en`, `excerpt`, `excerpt_en`, `content`, `content_en`, `category`, `category_en`, `date`.
3. Use plain text for content — no markdown, no HTML tags, no `**bold**`.
4. Keep content factual and educational. All readings are "for entertainment purposes only."
5. After adding, update `app/sitemap.ts` if the slug isn't auto-generated from the array.

## BaZi Terminology in English
- Always use "BaZi" (not "Saju" or "Four Pillars") as the primary English term.
- On first mention in a post, write: "BaZi (Four Pillars of Destiny)".
- Use standard English translations for Ten Gods, Five Elements, etc. (see project CLAUDE.md).

## Current Posts (11 total)
basics-of-chinese-horoscope, lifestyle-tips-for-good-luck, what-is-sibseong, what-is-shinsal, what-is-chung, compatibility-in-chinese-horoscope, what-is-oheng, what-is-daeun, what-is-hapchung-hyung-pa, saju-and-health, seasonal-fortune-tips
