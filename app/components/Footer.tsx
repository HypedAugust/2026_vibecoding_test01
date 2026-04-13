"use client";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { lang } = useLanguage();
  const isEn = lang === "en";

  return (
    <footer className="w-full bg-black/40 border-t border-[var(--gold-primary)]/10 py-8 px-4 mt-auto z-10 relative">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-4">
        <nav className="flex flex-wrap justify-center gap-4 sm:gap-8 text-xs sm:text-sm tracking-widest">
          <Link href="/about" className="text-[var(--gold-light)]/50 hover:text-[var(--gold-primary)] transition-colors">
            {isEn ? "About" : "소개"}
          </Link>
          <Link href="/privacy" className="text-[var(--gold-light)]/50 hover:text-[var(--gold-primary)] transition-colors">
            {isEn ? "Privacy Policy" : "개인정보처리방침"}
          </Link>
          <Link href="/terms" className="text-[var(--gold-light)]/50 hover:text-[var(--gold-primary)] transition-colors">
            {isEn ? "Terms of Service" : "이용약관"}
          </Link>
          <Link href="/blog" className="text-[var(--gold-light)]/50 hover:text-[var(--gold-primary)] transition-colors">
            {isEn ? "Blog" : "블로그"}
          </Link>
        </nav>
        <p className="text-[var(--gold-light)]/30 text-xs tracking-wider">
          © 2026 Daily Chinese Horoscope. All rights reserved.
        </p>
        <p className="text-[var(--gold-light)]/20 text-[10px] tracking-wider text-center">
          {isEn
            ? "Fortune readings are for entertainment purposes only and do not constitute professional advice."
            : "운세 풀이는 오락 목적으로만 제공되며 전문적 조언을 구성하지 않습니다."}
        </p>
      </div>
    </footer>
  );
}
