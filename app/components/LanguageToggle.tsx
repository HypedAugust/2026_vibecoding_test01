"use client";
import { useLanguage } from "../context/LanguageContext";

export default function LanguageToggle() {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      onClick={toggleLang}
      className="fixed top-4 right-4 z-[9999] flex items-center gap-0 rounded-full border border-[var(--gold-primary)]/50 bg-black/70 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:border-[var(--gold-primary)] transition-all group overflow-hidden"
      aria-label="Toggle language"
    >
      <span
        className={`px-3 py-1.5 text-xs font-bold tracking-wider transition-all ${
          lang === "ko"
            ? "bg-gradient-to-r from-[#e5ca72] to-[#d4af37] text-[#3a0606]"
            : "text-[var(--gold-light)]/60"
        }`}
      >
        한국어
      </span>
      <span
        className={`px-3 py-1.5 text-xs font-bold tracking-wider transition-all ${
          lang === "en"
            ? "bg-gradient-to-r from-[#e5ca72] to-[#d4af37] text-[#3a0606]"
            : "text-[var(--gold-light)]/60"
        }`}
      >
        EN
      </span>
    </button>
  );
}
