"use client";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";

export default function TermsOfService() {
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
            {isEn ? "Terms of Service" : "이용약관"}
          </h1>
          <div className="space-y-6 text-[var(--gold-light)]/90 leading-relaxed text-sm break-keep">
            {isEn ? (
              <>
                <p className="opacity-60">Last updated: April 13, 2026</p>
                <section>
                  <h2 className="text-lg font-bold text-[var(--gold-primary)] mb-3">1. Acceptance of Terms</h2>
                  <p>By accessing and using Daily Chinese Horoscope ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.</p>
                </section>
                <section>
                  <h2 className="text-lg font-bold text-[var(--gold-primary)] mb-3">2. Description of Service</h2>
                  <p>Daily Chinese Horoscope provides entertainment-based fortune readings generated from traditional BaZi (Four Pillars of Destiny) principles, along with educational blog content about East Asian metaphysics. All fortune results are generated algorithmically within your browser.</p>
                </section>
                <section>
                  <h2 className="text-lg font-bold text-[var(--gold-primary)] mb-3">3. Disclaimer</h2>
                  <p>The fortune readings and content provided by this Service are for <strong className="text-[var(--gold-primary)]">entertainment and educational purposes only</strong>. They do not constitute professional advice of any kind, including but not limited to financial, medical, legal, or psychological advice. We make no guarantees regarding the accuracy or applicability of any reading.</p>
                </section>
                <section>
                  <h2 className="text-lg font-bold text-[var(--gold-primary)] mb-3">4. Intellectual Property</h2>
                  <p>All content, design, graphics, and code on this website are the intellectual property of Daily Chinese Horoscope and are protected by applicable copyright and trademark laws. You may not reproduce, distribute, or create derivative works without prior written permission.</p>
                </section>
                <section>
                  <h2 className="text-lg font-bold text-[var(--gold-primary)] mb-3">5. User Conduct</h2>
                  <p>You agree not to misuse the Service, including but not limited to: attempting to access restricted areas, interfering with the Service's functionality, or using automated tools to scrape content.</p>
                </section>
                <section>
                  <h2 className="text-lg font-bold text-[var(--gold-primary)] mb-3">6. Third-Party Services</h2>
                  <p>Our Service may display advertisements from third-party providers (e.g., Google AdSense). We are not responsible for the content, privacy practices, or terms of these third-party services.</p>
                </section>
                <section>
                  <h2 className="text-lg font-bold text-[var(--gold-primary)] mb-3">7. Limitation of Liability</h2>
                  <p>The Service is provided "as is" without warranties of any kind. In no event shall Daily Chinese Horoscope be liable for any damages arising from the use or inability to use the Service.</p>
                </section>
                <section>
                  <h2 className="text-lg font-bold text-[var(--gold-primary)] mb-3">8. Changes to Terms</h2>
                  <p>We reserve the right to modify these Terms at any time. Continued use of the Service after changes constitutes acceptance of the modified Terms.</p>
                </section>
                <section>
                  <h2 className="text-lg font-bold text-[var(--gold-primary)] mb-3">9. Contact</h2>
                  <p>For questions about these Terms, please contact us at <span className="text-[var(--gold-primary)]">dailychinesehoroscope@gmail.com</span>.</p>
                </section>
              </>
            ) : (
              <>
                <p className="opacity-60">최종 수정일: 2026년 4월 13일</p>
                <section>
                  <h2 className="text-lg font-bold text-[var(--gold-primary)] mb-3">1. 약관의 동의</h2>
                  <p>데일리 사주(이하 "서비스")에 접속하고 이용함으로써 본 이용약관에 동의하게 됩니다. 본 약관에 동의하지 않으시는 경우 서비스를 이용하지 마시기 바랍니다.</p>
                </section>
                <section>
                  <h2 className="text-lg font-bold text-[var(--gold-primary)] mb-3">2. 서비스 설명</h2>
                  <p>데일리 사주는 전통 사주명리학(四柱命理學)의 원리를 기반으로 한 엔터테인먼트 성격의 운세 풀이와 동양 철학에 관한 교육 콘텐츠(블로그)를 제공합니다. 모든 운세 결과는 사용자의 브라우저 내에서 알고리즘적으로 생성됩니다.</p>
                </section>
                <section>
                  <h2 className="text-lg font-bold text-[var(--gold-primary)] mb-3">3. 면책 조항</h2>
                  <p>본 서비스에서 제공하는 운세 풀이 및 콘텐츠는 <strong className="text-[var(--gold-primary)]">오락 및 교육 목적</strong>으로만 제공됩니다. 이는 재정, 의료, 법률, 심리 상담 등 어떠한 종류의 전문적 조언도 구성하지 않습니다. 운세 결과의 정확성이나 적용 가능성에 대해 어떠한 보증도 하지 않습니다.</p>
                </section>
                <section>
                  <h2 className="text-lg font-bold text-[var(--gold-primary)] mb-3">4. 지적재산권</h2>
                  <p>본 웹사이트의 모든 콘텐츠, 디자인, 그래픽 및 코드는 데일리 사주의 지적재산이며 관련 저작권법 및 상표법에 의해 보호됩니다. 사전 서면 허가 없이 복제, 배포 또는 2차 저작물을 작성할 수 없습니다.</p>
                </section>
                <section>
                  <h2 className="text-lg font-bold text-[var(--gold-primary)] mb-3">5. 이용자 행동 규범</h2>
                  <p>서비스를 오용하지 않을 것에 동의합니다. 여기에는 제한된 영역에 대한 접근 시도, 서비스 기능 방해, 자동화된 도구를 이용한 콘텐츠 스크래핑 등이 포함됩니다.</p>
                </section>
                <section>
                  <h2 className="text-lg font-bold text-[var(--gold-primary)] mb-3">6. 제3자 서비스</h2>
                  <p>본 서비스는 제3자 제공업체(예: Google AdSense)의 광고를 표시할 수 있습니다. 이러한 제3자 서비스의 콘텐츠, 개인정보 보호 관행 또는 약관에 대해 책임지지 않습니다.</p>
                </section>
                <section>
                  <h2 className="text-lg font-bold text-[var(--gold-primary)] mb-3">7. 책임 제한</h2>
                  <p>서비스는 어떠한 종류의 보증 없이 "있는 그대로" 제공됩니다. 어떠한 경우에도 서비스의 사용 또는 사용 불가로 인해 발생하는 손해에 대해 데일리 사주가 책임을 지지 않습니다.</p>
                </section>
                <section>
                  <h2 className="text-lg font-bold text-[var(--gold-primary)] mb-3">8. 약관 변경</h2>
                  <p>본 약관은 언제든지 수정될 수 있습니다. 변경 후 서비스를 계속 이용하면 수정된 약관에 동의한 것으로 간주됩니다.</p>
                </section>
                <section>
                  <h2 className="text-lg font-bold text-[var(--gold-primary)] mb-3">9. 문의</h2>
                  <p>본 이용약관에 관한 문의사항은 <span className="text-[var(--gold-primary)]">dailychinesehoroscope@gmail.com</span>으로 연락해 주시기 바랍니다.</p>
                </section>
              </>
            )}
          </div>
        </article>
      </main>
    </div>
  );
}
