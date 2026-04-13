"use client";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";

export default function PrivacyPolicy() {
  const { lang } = useLanguage();
  const isEn = lang === "en";

  return (
    <div className="relative min-h-screen bg-[var(--background)] flex flex-col items-center justify-start overflow-x-hidden font-sans">
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill='%23d4af37' fill-opacity='0.05'%3E%3Cpath d='M50 50c-27.6 0-50 22.4-50 50h10c0-22.1 17.9-40 40-40s40 17.9 40 40h10c0-27.6-22.4-50-50-50zm0-50C22.4 0 0 22.4 0 50h10c0-22.1 17.9-40 40-40s40 17.9 40 40h10C100 22.4 77.6 0 50 0z'/%3E%3C/g%3E%3C/svg%3E")`, backgroundSize: '120px 120px', opacity: 0.3 }}></div>
      <main className="animate-fade-in flex flex-col items-center w-full max-w-4xl px-4 py-16 sm:px-6 z-10">
        <Link href="/" className="text-[var(--gold-primary)] hover:text-white transition-colors mb-12 text-sm tracking-widest">
          ← {isEn ? "Back to Home" : "홈으로 돌아가기"}
        </Link>
        <article className="w-full bg-[#1a0505]/90 backdrop-blur-xl border border-[var(--gold-primary)]/30 rounded-3xl p-8 sm:p-14 shadow-2xl">
          <h1 className="text-3xl font-bold text-[var(--gold-primary)] mb-8 text-center tracking-widest">
            {isEn ? "Privacy Policy" : "개인정보처리방침"}
          </h1>
          <div className="space-y-6 text-[var(--gold-light)]/90 leading-relaxed text-sm break-keep">
            {isEn ? (
              <>
                <p className="opacity-60">Last updated: April 13, 2026</p>
                <section>
                  <h2 className="text-lg font-bold text-[var(--gold-primary)] mb-3">1. Overview</h2>
                  <p>Daily Chinese Horoscope ("we," "our," or "the Service") respects the privacy of all visitors and users. This Privacy Policy describes how we collect, use, and protect information when you use our website.</p>
                </section>
                <section>
                  <h2 className="text-lg font-bold text-[var(--gold-primary)] mb-3">2. Information We Collect</h2>
                  <p>Our Service is designed with privacy as a core principle. We do <strong className="text-[var(--gold-primary)]">not</strong> collect, store, or transmit any personally identifiable information (PII). Specifically:</p>
                  <ul className="list-disc ml-6 mt-2 space-y-1">
                    <li>The name, gender, birth date, and birth hour you enter for fortune readings are processed entirely within your browser and are <strong>never sent to our servers</strong>.</li>
                    <li>We do not require account registration or login.</li>
                    <li>We do not use cookies for tracking purposes.</li>
                  </ul>
                </section>
                <section>
                  <h2 className="text-lg font-bold text-[var(--gold-primary)] mb-3">3. Analytics</h2>
                  <p>We use Vercel Analytics, a privacy-friendly analytics service, to understand general traffic patterns (page views, visitor counts). This data is aggregated and does not identify individual users.</p>
                </section>
                <section>
                  <h2 className="text-lg font-bold text-[var(--gold-primary)] mb-3">4. Third-Party Advertising</h2>
                  <p>We use Google AdSense to display advertisements. Google may use cookies and web beacons to serve ads based on your prior visits to our website or other websites. You can opt out of personalized advertising by visiting <span className="text-[var(--gold-primary)]">Google Ads Settings</span>.</p>
                </section>
                <section>
                  <h2 className="text-lg font-bold text-[var(--gold-primary)] mb-3">5. Local Storage</h2>
                  <p>We use your browser's local storage solely to remember your language preference (Korean/English) and a visitor count value. This data never leaves your device.</p>
                </section>
                <section>
                  <h2 className="text-lg font-bold text-[var(--gold-primary)] mb-3">6. Children's Privacy</h2>
                  <p>Our Service is not directed to children under the age of 13. We do not knowingly collect information from children.</p>
                </section>
                <section>
                  <h2 className="text-lg font-bold text-[var(--gold-primary)] mb-3">7. Changes to This Policy</h2>
                  <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date.</p>
                </section>
                <section>
                  <h2 className="text-lg font-bold text-[var(--gold-primary)] mb-3">8. Contact</h2>
                  <p>If you have any questions about this Privacy Policy, please contact us at <span className="text-[var(--gold-primary)]">dailychinesehoroscope@gmail.com</span>.</p>
                </section>
              </>
            ) : (
              <>
                <p className="opacity-60">최종 수정일: 2026년 4월 13일</p>
                <section>
                  <h2 className="text-lg font-bold text-[var(--gold-primary)] mb-3">1. 개요</h2>
                  <p>데일리 사주(이하 "서비스")는 모든 방문자 및 이용자의 개인정보를 소중히 여기며, 본 개인정보처리방침을 통해 서비스 이용 시 수집하는 정보와 그 활용 방법에 대해 안내합니다.</p>
                </section>
                <section>
                  <h2 className="text-lg font-bold text-[var(--gold-primary)] mb-3">2. 수집하는 정보</h2>
                  <p>본 서비스는 개인정보 보호를 핵심 원칙으로 설계되었습니다. 우리는 어떠한 개인식별정보(PII)도 수집, 저장, 전송하지 <strong className="text-[var(--gold-primary)]">않습니다</strong>. 구체적으로:</p>
                  <ul className="list-disc ml-6 mt-2 space-y-1">
                    <li>운세 풀이를 위해 입력하시는 이름, 성별, 생년월일, 태어난 시간은 사용자의 브라우저 내에서만 처리되며, <strong>서버로 전송되지 않습니다</strong>.</li>
                    <li>회원가입이나 로그인을 요구하지 않습니다.</li>
                    <li>추적 목적의 쿠키를 사용하지 않습니다.</li>
                  </ul>
                </section>
                <section>
                  <h2 className="text-lg font-bold text-[var(--gold-primary)] mb-3">3. 웹 분석</h2>
                  <p>일반적인 트래픽 패턴(페이지뷰, 방문자 수)을 파악하기 위해 프라이버시 친화적인 분석 서비스인 Vercel Analytics를 사용합니다. 이 데이터는 집계된 형태이며 개별 사용자를 식별하지 않습니다.</p>
                </section>
                <section>
                  <h2 className="text-lg font-bold text-[var(--gold-primary)] mb-3">4. 제3자 광고</h2>
                  <p>본 서비스는 광고 게재를 위해 Google AdSense를 사용합니다. Google은 사용자의 이전 웹사이트 방문 기록을 기반으로 맞춤 광고를 제공하기 위해 쿠키 및 웹 비콘을 사용할 수 있습니다. Google 광고 설정에서 맞춤 광고를 거부할 수 있습니다.</p>
                </section>
                <section>
                  <h2 className="text-lg font-bold text-[var(--gold-primary)] mb-3">5. 로컬 저장소</h2>
                  <p>브라우저의 로컬 스토리지는 언어 설정(한국어/영어)과 방문자 수 값을 기억하는 용도로만 사용됩니다. 이 데이터는 사용자의 기기를 벗어나지 않습니다.</p>
                </section>
                <section>
                  <h2 className="text-lg font-bold text-[var(--gold-primary)] mb-3">6. 아동 개인정보 보호</h2>
                  <p>본 서비스는 만 13세 미만의 아동을 대상으로 하지 않으며, 아동의 정보를 고의로 수집하지 않습니다.</p>
                </section>
                <section>
                  <h2 className="text-lg font-bold text-[var(--gold-primary)] mb-3">7. 방침 변경</h2>
                  <p>본 개인정보처리방침은 수시로 업데이트될 수 있으며, 변경 사항은 본 페이지에 수정 일자와 함께 게시됩니다.</p>
                </section>
                <section>
                  <h2 className="text-lg font-bold text-[var(--gold-primary)] mb-3">8. 문의</h2>
                  <p>개인정보처리방침에 관한 문의사항은 <span className="text-[var(--gold-primary)]">dailychinesehoroscope@gmail.com</span>으로 연락해 주시기 바랍니다.</p>
                </section>
              </>
            )}
          </div>
        </article>
      </main>
    </div>
  );
}
