"use client";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";

export default function AboutPage() {
  const { lang } = useLanguage();
  const isEn = lang === "en";

  return (
    <div className="relative min-h-screen bg-[var(--background)] flex flex-col items-center justify-start overflow-x-hidden font-sans">
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill='%23d4af37' fill-opacity='0.05'%3E%3Cpath d='M50 50c-27.6 0-50 22.4-50 50h10c0-22.1 17.9-40 40-40s40 17.9 40 40h10c0-27.6-22.4-50-50-50zm0-50C22.4 0 0 22.4 0 50h10c0-22.1 17.9-40 40-40s40 17.9 40 40h10C100 22.4 77.6 0 50 0z'/%3E%3C/g%3E%3C/svg%3E")`, backgroundSize: '120px 120px', opacity: 0.3 }}></div>
      <main className="animate-fade-in flex flex-col items-center w-full max-w-4xl px-4 py-16 sm:px-6 z-10">
        <Link href="/" className="text-[var(--gold-primary)] hover:text-white transition-colors mb-12 text-sm tracking-widest">
          ← {isEn ? "Back to Home" : "홈으로 돌아가기"}
        </Link>

        <div className="relative w-24 h-24 mb-8 drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">
          <Image src="/dragon.png" alt="Dragon" fill className="object-contain" />
        </div>

        <article className="w-full bg-[#1a0505]/90 backdrop-blur-xl border border-[var(--gold-primary)]/30 rounded-3xl p-8 sm:p-14 shadow-2xl">
          <h1 className="text-3xl font-bold text-[var(--gold-primary)] mb-8 text-center tracking-widest">
            {isEn ? "About Us" : "서비스 소개"}
          </h1>
          <div className="space-y-6 text-[var(--gold-light)]/90 leading-relaxed break-keep">
            {isEn ? (
              <>
                <section>
                  <h2 className="text-xl font-bold text-[var(--gold-primary)] mb-3">Our Mission</h2>
                  <p>Daily Chinese Horoscope was created to make the ancient wisdom of BaZi (Four Pillars of Destiny) — a metaphysical system with over 3,000 years of history — accessible to everyone, free of charge. We believe that understanding the cycles of nature and their influence on human life can empower individuals to make wiser decisions and live more fulfilling lives.</p>
                </section>
                <section>
                  <h2 className="text-xl font-bold text-[var(--gold-primary)] mb-3">What We Offer</h2>
                  <ul className="list-disc ml-6 space-y-2">
                    <li><strong>Personalized Fortune Readings</strong> — Daily, weekly, and monthly readings based on traditional BaZi principles, generated entirely within your browser for complete privacy.</li>
                    <li><strong>Educational Content</strong> — In-depth articles and columns explaining the foundations of BaZi, the Five Elements, Ten Gods, Spiritual Markers, and more.</li>
                    <li><strong>Bilingual Experience</strong> — Full Korean and English language support, making East Asian metaphysics accessible to a global audience.</li>
                  </ul>
                </section>
                <section>
                  <h2 className="text-xl font-bold text-[var(--gold-primary)] mb-3">Our Philosophy</h2>
                  <p>We approach BaZi not as deterministic fortune-telling, but as a compass for self-awareness. Just as a weather forecast helps you prepare for rain, understanding your personal elemental chart helps you navigate life's seasons with wisdom and grace. We encourage all users to treat our readings as a tool for reflection — not as absolute predictions.</p>
                </section>
                <section>
                  <h2 className="text-xl font-bold text-[var(--gold-primary)] mb-3">Privacy First</h2>
                  <p>Your privacy is our top priority. We do not collect any personal data. All fortune calculations happen in your browser — nothing is ever sent to our servers. No sign-up, no tracking, no data storage.</p>
                </section>
              </>
            ) : (
              <>
                <section>
                  <h2 className="text-xl font-bold text-[var(--gold-primary)] mb-3">서비스 소개</h2>
                  <p>데일리 사주는 3,000년 이상의 역사를 가진 사주명리학(四柱命理學)의 지혜를 누구나 무료로 접할 수 있도록 만들어진 서비스입니다. 자연의 순환과 그것이 인간의 삶에 미치는 영향을 이해하는 것이 더 현명한 결정과 풍요로운 삶을 이끌어낼 수 있다고 믿습니다.</p>
                </section>
                <section>
                  <h2 className="text-xl font-bold text-[var(--gold-primary)] mb-3">제공 서비스</h2>
                  <ul className="list-disc ml-6 space-y-2">
                    <li><strong>맞춤형 운세 풀이</strong> — 전통 사주명리 원리에 기반한 오늘/주간/월간 운세를 브라우저 내에서 생성하여 완전한 개인정보 보호를 보장합니다.</li>
                    <li><strong>교육 콘텐츠</strong> — 사주의 기초, 오행, 십성, 신살 등을 심도 있게 설명하는 칼럼과 블로그를 제공합니다.</li>
                    <li><strong>다국어 지원</strong> — 한국어와 영어를 완벽 지원하여 동양 철학을 전 세계에 전달합니다.</li>
                  </ul>
                </section>
                <section>
                  <h2 className="text-xl font-bold text-[var(--gold-primary)] mb-3">운영 철학</h2>
                  <p>사주를 결정론적인 점술이 아닌 자기 인식을 위한 나침반으로 접근합니다. 일기예보가 비를 대비하게 하듯, 자신의 오행적 특성을 이해하면 인생의 계절을 지혜롭게 항해할 수 있습니다. 운세 결과는 절대적인 예측이 아닌 성찰의 도구로 활용하시길 권합니다.</p>
                </section>
                <section>
                  <h2 className="text-xl font-bold text-[var(--gold-primary)] mb-3">개인정보 보호 우선</h2>
                  <p>사용자의 개인정보 보호를 최우선으로 합니다. 어떠한 개인정보도 수집하지 않으며, 모든 운세 계산은 사용자의 브라우저에서 이루어집니다. 회원가입, 추적, 데이터 저장 일절 없습니다.</p>
                </section>
              </>
            )}
          </div>

          {/* Contact Section */}
          <div className="mt-12 pt-8 border-t border-[var(--gold-primary)]/20">
            <h2 className="text-xl font-bold text-[var(--gold-primary)] mb-4 text-center tracking-widest">
              {isEn ? "Contact Us" : "문의하기"}
            </h2>
            <div className="text-center text-[var(--gold-light)]/80 space-y-2">
              <p>{isEn ? "For inquiries, suggestions, or feedback:" : "문의, 제안, 피드백:"}</p>
              <p className="text-[var(--gold-primary)] font-bold text-lg">dailychinesehoroscope@gmail.com</p>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
