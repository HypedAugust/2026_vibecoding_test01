"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "./data";
import { useLanguage } from "../context/LanguageContext";
import { getTranslations } from "../translations";

const POSTS_PER_PAGE = 6;

export default function BlogListContent() {
  const { lang } = useLanguage();
  const t = getTranslations(lang);
  const isEn = lang === "en";
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE);
  const startIdx = (page - 1) * POSTS_PER_PAGE;
  const currentPosts = blogPosts.slice(startIdx, startIdx + POSTS_PER_PAGE);

  return (
    <div className="relative min-h-screen bg-[var(--background)] flex flex-col items-center justify-start overflow-x-hidden font-sans">
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill='%23d4af37' fill-opacity='0.05'%3E%3Cpath d='M50 50c-27.6 0-50 22.4-50 50h10c0-22.1 17.9-40 40-40s40 17.9 40 40h10c0-27.6-22.4-50-50-50zm0-50C22.4 0 0 22.4 0 50h10c0-22.1 17.9-40 40-40s40 17.9 40 40h10C100 22.4 77.6 0 50 0z'/%3E%3C/g%3E%3C/svg%3E")`, backgroundSize: '120px 120px', opacity: 0.3 }}></div>

      <main className="animate-fade-in flex flex-col items-center w-full max-w-5xl px-4 py-16 sm:px-6 z-10">
        <header className="flex flex-col items-center mb-16 text-center">
            <Link href="/" className="mb-8 hover:scale-105 transition-transform">
                <div className="relative w-24 h-24 drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">
                    <Image src="/dragon.png" alt="Dragon" fill className="object-contain" />
                </div>
            </Link>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-[0.1em] text-[var(--gold-primary)] uppercase mb-4" style={{ textShadow: "0 5px 15px rgba(0,0,0,0.5)" }}>
            {t.blogTitle}
          </h1>
          <p className="text-[var(--gold-light)] opacity-80 tracking-widest text-lg font-light">{t.blogSubtitle}</p>
          <div className="w-24 h-1 bg-[var(--gold-primary)] mt-6 opacity-40"></div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-12">
          {currentPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-[#1a0505]/80 backdrop-blur-sm border-2 border-[var(--gold-primary)]/20 rounded-2xl p-8 hover:border-[var(--gold-primary)]/50 transition-all duration-300 hover:-translate-y-2 shadow-xl flex flex-col h-full"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-[var(--gold-primary)]/10 text-[var(--gold-primary)] text-xs px-3 py-1 rounded-full border border-[var(--gold-primary)]/30 font-bold tracking-wider">
                  {isEn ? post.category_en : post.category}
                </span>
                <span className="text-[var(--gold-light)]/40 text-xs font-mono">{post.date}</span>
              </div>
              <h2 className="text-2xl font-bold text-[var(--gold-primary)] mb-4 group-hover:text-white transition-colors">
                {isEn ? post.title_en : post.title}
              </h2>
              <p className="text-[var(--gold-light)]/70 line-clamp-3 mb-6 font-light leading-relaxed">
                {isEn ? post.excerpt_en : post.excerpt}
              </p>
              <div className="mt-auto flex items-center gap-2 text-[var(--gold-primary)] font-bold text-sm group-hover:gap-4 transition-all uppercase tracking-widest">
                {t.blogReadMore} <span>→</span>
              </div>
            </Link>
          ))}
        </section>

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="flex items-center gap-2 mb-16">
            <button
              onClick={() => { setPage((p) => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              disabled={page === 1}
              className="px-4 py-2 rounded-lg border border-[var(--gold-primary)]/30 text-[var(--gold-primary)] text-sm font-bold tracking-wider disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--gold-primary)]/10 transition-colors"
            >
              ← {isEn ? "Prev" : "이전"}
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => { setPage(num); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                className={`w-10 h-10 rounded-lg text-sm font-bold tracking-wider transition-colors ${
                  num === page
                    ? "bg-[var(--gold-primary)] text-black"
                    : "border border-[var(--gold-primary)]/30 text-[var(--gold-primary)] hover:bg-[var(--gold-primary)]/10"
                }`}
              >
                {num}
              </button>
            ))}

            <button
              onClick={() => { setPage((p) => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-lg border border-[var(--gold-primary)]/30 text-[var(--gold-primary)] text-sm font-bold tracking-wider disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--gold-primary)]/10 transition-colors"
            >
              {isEn ? "Next" : "다음"} →
            </button>
          </nav>
        )}

        <Link
          href="/"
          className="text-[var(--gold-light)]/60 hover:text-[var(--gold-primary)] transition-colors tracking-widest text-sm flex items-center gap-2"
        >
          {t.blogBack}
        </Link>
      </main>
    </div>
  );
}
