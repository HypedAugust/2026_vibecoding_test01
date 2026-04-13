"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { UserInfo, buildHoroscope } from "./utils/horoscopeBuilder";
import { useLanguage } from "./context/LanguageContext";
import { getTranslations } from "./translations";

export default function Home() {
  const [selectedHoroscope, setSelectedHoroscope] = useState<string | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({ name: '', gender: '', year: '', month: '', day: '', time: '' });
  const [activeTab, setActiveTab] = useState<'service' | 'info' | 'blog'>('service');
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [luckyWinner, setLuckyWinner] = useState<number | null>(null);
  const { lang } = useLanguage();
  const t = getTranslations(lang);

  useEffect(() => {
    const startDate = new Date("2026-04-13T00:00:00").getTime();
    const now = new Date().getTime();
    const diffHours = Math.max(0, (now - startDate) / (1000 * 60 * 60));
    const globalCount = 15000 + Math.floor(diffHours * 12);
    const storedHits = parseInt(localStorage.getItem('fortune_hits') || '0', 10);
    const newHits = storedHits + Math.floor(Math.random() * 3) + 1;
    localStorage.setItem('fortune_hits', newHits.toString());
    const finalCount = globalCount + newHits;
    setVisitorCount(finalCount);

    if (finalCount % 10 === 0) {
      setTimeout(() => {
        setLuckyWinner(finalCount);
        const duration = 5000;
        const end = Date.now() + duration;
        const goldColors = ['#D4AF37', '#FFD700', '#DAA520', '#B8860B', '#FFF8DC', '#ffffff'];
        (function frame() {
          confetti({ particleCount: 10, angle: Math.random() * 60 + 60, spread: 90, origin: { x: Math.random(), y: Math.random() * 0.2 }, colors: goldColors, zIndex: 99999, scalar: 1.2 });
          confetti({ particleCount: 20, angle: 60, spread: 80, origin: { x: 0, y: 1 }, colors: goldColors, zIndex: 99999, scalar: 2 });
          confetti({ particleCount: 20, angle: 120, spread: 80, origin: { x: 1, y: 1 }, colors: goldColors, zIndex: 99999, scalar: 2 });
          if (Date.now() < end) requestAnimationFrame(frame);
        }());
      }, 1000);
    }
  }, []);

  const handleSelect = (id: string) => {
    setSelectedHoroscope(id);
    setShowResult(false);
  };

  const fortuneTypes = [
    { id: "today", title: t.todayTitle, subtitle: t.todaySub },
    { id: "weekly", title: t.weeklyTitle, subtitle: t.weeklySub },
    { id: "monthly", title: t.monthlyTitle, subtitle: t.monthlySub }
  ];

  return (
    <div className="relative min-h-screen bg-[var(--background)] flex flex-col items-center justify-start overflow-x-hidden font-sans">
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill='%23d4af37' fill-opacity='0.1'%3E%3Cpath d='M50 50c-27.6 0-50 22.4-50 50h10c0-22.1 17.9-40 40-40s40 17.9 40 40h10c0-27.6-22.4-50-50-50zm0-50C22.4 0 0 22.4 0 50h10c0-22.1 17.9-40 40-40s40 17.9 40 40h10C100 22.4 77.6 0 50 0z'/%3E%3C/g%3E%3C/svg%3E")`, backgroundSize: '120px 120px', opacity: 0.3 }}></div>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-[var(--background)] opacity-70"></div>
      {/* Curtain Animation Overlay */}
      <div className="curtain-container fixed inset-0 z-50 flex pointer-events-none bg-transparent">
        <div className="curtain-left relative w-1/2 h-screen max-h-screen overflow-hidden shadow-[20px_0_50px_rgba(0,0,0,1)] z-20">
          <div className="absolute top-0 left-0 w-[100vw] h-full">
            <Image src="/grand_curtain.png" alt="Curtain Left" fill priority className="object-cover object-center" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 mix-blend-multiply"></div>
        </div>
        <div className="curtain-right relative w-1/2 h-screen max-h-screen overflow-hidden shadow-[-20px_0_50px_rgba(0,0,0,1)] z-20">
          <div className="absolute top-0 right-0 w-[100vw] h-full">
            <Image src="/grand_curtain.png" alt="Curtain Right" fill priority className="object-cover object-center" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-transparent to-black/60 mix-blend-multiply"></div>
        </div>
      </div>

      {/* Main Content */}
      <main className="animate-fade-in flex flex-col items-center w-full max-w-5xl px-4 py-16 sm:px-6">
        {/* Header Region */}
        <header className="flex flex-col items-center mb-16">
          <div className="relative w-48 h-48 mb-8 drop-shadow-[0_0_20px_rgba(212,175,55,0.5)]">
            <Image src="/dragon.png" alt="Golden Dragon Symbol" fill priority className="object-contain" />
          </div>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-center tracking-[0.2em] text-[var(--gold-primary)] uppercase transition-all duration-300 hover:scale-105 cursor-default"
            style={{ textShadow: "0 1px 0 #b38b22, 0 2px 0 #9c781a, 0 3px 0 #866512, 0 5px 0px #6f530d, 0 7px 0px #584107, 0 10px 20px rgba(0,0,0,0.9)" }}
          >
            Daily Chinese Horoscope
          </h1>
          <div className="w-32 h-1 bg-[var(--gold-primary)] mt-6 opacity-60"></div>
          <p className="mt-6 text-lg sm:text-xl text-[var(--gold-light)] opacity-90 text-center tracking-[0.3em] font-light">
            {t.subtitle}
          </p>
          <p className="mt-4 text-sm sm:text-base text-[var(--gold-light)] opacity-90 text-center tracking-widest font-medium bg-black/30 px-4 py-2 rounded-full border border-[var(--gold-primary)]/20 shadow-sm">
            {t.privacyNotice}
          </p>
        </header>

        {/* Navigation Tabs */}
        <div className="flex gap-4 sm:gap-8 mb-12 z-10 relative">
          <button
            onClick={() => setActiveTab('service')}
            className={`px-6 sm:px-10 py-3 rounded-full border border-[var(--gold-primary)]/50 tracking-widest transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)] ${activeTab === 'service' ? 'bg-gradient-to-r from-[#e5ca72] to-[#d4af37] text-[#3a0606] font-extrabold shadow-[0_0_20px_rgba(212,175,55,0.4)] scale-105' : 'bg-black/60 text-[var(--gold-light)] hover:bg-[#3a0606]/80 hover:text-white'}`}
          >
            {t.tabService}
          </button>
          <button
            onClick={() => setActiveTab('info')}
            className={`px-6 sm:px-10 py-3 rounded-full border border-[var(--gold-primary)]/50 tracking-widest transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)] ${activeTab === 'info' ? 'bg-gradient-to-r from-[#e5ca72] to-[#d4af37] text-[#3a0606] font-extrabold shadow-[0_0_20px_rgba(212,175,55,0.4)] scale-105' : 'bg-black/60 text-[var(--gold-light)] hover:bg-[#3a0606]/80 hover:text-white'}`}
          >
            {t.tabInfo}
          </button>
          <Link
            href="/blog"
            className="px-6 sm:px-10 py-3 rounded-full border border-[var(--gold-primary)]/50 tracking-widest transition-all bg-black/60 text-[var(--gold-light)] hover:bg-[#3a0606]/80 hover:text-white shadow-[0_0_15px_rgba(0,0,0,0.5)] flex items-center justify-center"
          >
            {t.tabBlog}
          </Link>
        </div>

        {/* Info Article Section */}
        <div className={activeTab === 'info' ? "block w-full max-w-4xl animate-fade-in z-10 relative mb-20" : "hidden"}>
          <article className="bg-[#1a0505]/95 backdrop-blur-md border-[2px] border-[var(--gold-primary)]/40 rounded-3xl p-8 sm:p-12 shadow-[0_15px_50px_rgba(0,0,0,1)] text-[var(--gold-light)] leading-relaxed relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--gold-primary)]/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--red-deep)]/10 rounded-full blur-3xl pointer-events-none"></div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--gold-primary)] mb-8 text-center tracking-widest border-b border-[var(--gold-primary)]/20 pb-6 relative z-10">
              {t.infoTitle} <br/><span className="text-lg text-[var(--gold-light)]/80 mt-3 block font-normal">{t.infoSubtitle}</span>
            </h2>
            <div className="space-y-6 text-[1.05rem] font-light relative z-10 tracking-wide break-keep">
              <p>{t.infoP1}</p>
              <p>{t.infoP2}</p>
              <p>{t.infoP3}</p>
              <div className="bg-black/50 p-6 sm:p-8 rounded-2xl border border-[var(--gold-primary)]/20 border-l-4 border-l-[var(--gold-primary)] my-8 shadow-inner">
                <p>
                  {t.infoHighlight} <strong className="text-[var(--gold-primary)] font-bold text-lg">{`『${t.infoHighlightBold}』`}</strong>{t.infoHighlightPost}
                </p>
              </div>
              <p>{t.infoP4}</p>
            </div>
          </article>
        </div>

        {/* Service Container */}
        <div className={activeTab === 'service' ? "w-full flex flex-col items-center z-10" : "hidden"}>
          {/* Options */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 w-full" style={{ perspective: '1000px' }}>
          {fortuneTypes.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className="group relative overflow-hidden rounded-2xl border-t-2 border-l-2 border-r-[5px] border-b-[5px] border-[var(--gold-primary)]/70 bg-gradient-to-br from-[#800b0b] via-[#4a0404] to-[#120101] py-10 transition-all duration-300 transform hover:-translate-y-3 hover:translate-x-1 hover:border-r-[8px] hover:border-b-[8px] hover:shadow-[-15px_20px_40px_rgba(0,0,0,1),_inset_2px_2px_20px_rgba(255,255,255,0.15)] shadow-[-5px_10px_25px_rgba(0,0,0,0.9),_inset_1px_1px_5px_rgba(255,255,255,0.2)] focus:outline-none flex flex-col items-center justify-center text-center"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}></div>
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--gold-primary)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 flex flex-col items-center justify-center w-full transform group-hover:translate-z-10 transition-transform duration-300">
                <h3 className="text-3xl sm:text-4xl font-extrabold text-[var(--gold-primary)] mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" style={{ textShadow: "0 1px 0 #9c781a, 0 2px 0 #6f530d, 0 5px 15px rgba(0,0,0,1)" }}>{item.title}</h3>
                <p className="text-sm font-bold text-[var(--gold-light)] opacity-90 uppercase tracking-[0.2em]">{item.subtitle}</p>
              </div>
            </button>
          ))}
        </section>

        {/* Form Modal/Section */}
        {!showResult && selectedHoroscope && (
          <section className="mt-24 w-full max-w-3xl animate-fade-in-fast bg-gradient-to-br from-[#590a0a] via-[#3a0606] to-[#120101] p-8 sm:p-10 rounded-3xl border-t-2 border-l-2 border-r-[6px] border-b-[6px] border-[var(--gold-primary)]/60 shadow-[-15px_25px_50px_rgba(0,0,0,1),_inset_2px_2px_15px_rgba(255,255,255,0.05)] relative transform-gpu">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--background)] px-6 py-2 rounded-full border border-[var(--gold-primary)]/40">
              <span className="text-[var(--gold-primary)] font-bold tracking-widest">
                {selectedHoroscope === "today" ? t.todayTitle : selectedHoroscope === "weekly" ? t.weeklyTitle : t.monthlyTitle} {t.formInfoInput}
              </span>
            </div>
            <button
              onClick={() => setSelectedHoroscope(null)}
              className="absolute top-6 right-6 text-[var(--gold-primary)]/50 hover:text-[var(--gold-primary)] transition-colors text-3xl font-light hover:scale-110"
              aria-label={t.closeBtnLabel}
            >
              &times;
            </button>
            <form className="flex flex-col gap-8 mt-6" onSubmit={(e) => { e.preventDefault(); setShowResult(true); }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="flex flex-col gap-3">
                  <label className="text-[var(--gold-light)] font-semibold tracking-wider text-sm">{t.labelName}</label>
                  <input
                    type="text"
                    value={userInfo.name}
                    onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                    placeholder={t.placeholderName}
                    className="bg-black/40 border border-[var(--gold-primary)]/30 p-4 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[var(--gold-primary)] focus:ring-1 focus:ring-[var(--gold-primary)] transition-all text-lg"
                    required
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[var(--gold-light)] font-semibold tracking-wider text-sm">{t.labelGender}</label>
                  <select
                    value={userInfo.gender} onChange={(e) => setUserInfo({ ...userInfo, gender: e.target.value })}
                    className="bg-black/40 border border-[var(--gold-primary)]/30 p-4 rounded-xl text-white focus:outline-none focus:border-[var(--gold-primary)] focus:ring-1 focus:ring-[var(--gold-primary)] transition-all text-lg cursor-pointer appearance-none"
                    required
                  >
                    <option value="">{t.optSelect}</option>
                    <option value="female" className="bg-[var(--red-deep)]">{t.optFemale}</option>
                    <option value="male" className="bg-[var(--red-deep)]">{t.optMale}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                <div className="flex flex-col gap-3">
                  <label className="text-[var(--gold-light)] font-semibold tracking-wider text-sm">{t.labelYear}</label>
                  <select value={userInfo.year} onChange={(e) => setUserInfo({ ...userInfo, year: e.target.value })} className="bg-black/40 border border-[var(--gold-primary)]/30 p-4 rounded-xl text-white focus:outline-none focus:border-[var(--gold-primary)] focus:ring-1 focus:ring-[var(--gold-primary)] transition-all cursor-pointer appearance-none" required>
                    <option value="">{t.optSelect}</option>
                    {Array.from({length: 100}, (_, i) => new Date().getFullYear() - i).map(year => (
                      <option key={year} value={year} className="bg-[var(--red-deep)]">{year}{t.yearSuffix}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[var(--gold-light)] font-semibold tracking-wider text-sm">{t.labelMonth}</label>
                  <select value={userInfo.month} onChange={(e) => setUserInfo({ ...userInfo, month: e.target.value })} className="bg-black/40 border border-[var(--gold-primary)]/30 p-4 rounded-xl text-white focus:outline-none focus:border-[var(--gold-primary)] focus:ring-1 focus:ring-[var(--gold-primary)] transition-all cursor-pointer appearance-none" required>
                    <option value="">{t.optSelect}</option>
                    {Array.from({length: 12}, (_, i) => i + 1).map(month => (
                      <option key={month} value={month} className="bg-[var(--red-deep)]">{month}{t.monthSuffix}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[var(--gold-light)] font-semibold tracking-wider text-sm">{t.labelDay}</label>
                  <select value={userInfo.day} onChange={(e) => setUserInfo({ ...userInfo, day: e.target.value })} className="bg-black/40 border border-[var(--gold-primary)]/30 p-4 rounded-xl text-white focus:outline-none focus:border-[var(--gold-primary)] focus:ring-1 focus:ring-[var(--gold-primary)] transition-all cursor-pointer appearance-none" required>
                    <option value="">{t.optSelect}</option>
                    {Array.from({length: 31}, (_, i) => i + 1).map(day => (
                      <option key={day} value={day} className="bg-[var(--red-deep)]">{day}{t.daySuffix}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[var(--gold-light)] font-semibold tracking-wider text-sm">{t.labelTime}</label>
                  <select value={userInfo.time} onChange={(e) => setUserInfo({ ...userInfo, time: e.target.value })} className="bg-black/40 border border-[var(--gold-primary)]/30 p-4 rounded-xl text-white focus:outline-none focus:border-[var(--gold-primary)] focus:ring-1 focus:ring-[var(--gold-primary)] transition-all cursor-pointer appearance-none" required>
                    <option value="">{t.optUnknown}</option>
                    {t.times.map((time) => (
                      <option key={time.val} value={time.val} className="bg-[var(--red-deep)] block whitespace-pre">{time.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-8 flex flex-col items-center perspective-1000">
                <div className="flex items-center gap-2 mb-6 px-4 py-2 bg-black/40 border border-[var(--gold-primary)]/20 rounded-lg shadow-inner">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[var(--gold-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <p className="text-xs sm:text-sm text-[var(--gold-light)] opacity-70 tracking-wider">
                    {t.securityPre} <strong className="text-[var(--gold-primary)] font-semibold">{t.securityBold}</strong> {t.securityPost}
                  </p>
                </div>
                <button
                  type="submit"
                  className="w-full md:w-2/3 bg-gradient-to-r from-[#e5ca72] via-[#ffe898] to-[#d4af37] text-[#3a0606] font-extrabold tracking-widest text-xl py-5 rounded-2xl border-t-2 border-l-2 border-r-[4px] border-b-[6px] border-[#9c781a] shadow-[-5px_10px_20px_rgba(0,0,0,0.8),_inset_2px_2px_5px_rgba(255,255,255,0.8)] transition-all duration-300 transform hover:-translate-y-2 hover:border-b-[8px] hover:shadow-[-10px_15px_30px_rgba(0,0,0,1)] active:scale-95 active:translate-y-2 active:border-b-2 active:shadow-none"
                >
                  {t.submitBtn}
                </button>
              </div>
            </form>
          </section>
        )}

        {showResult && selectedHoroscope && (
          <ScrollResult type={selectedHoroscope} userInfo={userInfo} onClose={() => setShowResult(false)} />
        )}
        </div>

        {/* Global Hit Counter UI */}
        {visitorCount !== null && !showResult && (
          <div className="mt-24 flex flex-col items-center animate-fade-in transition-all duration-700">
            <p className="text-[var(--gold-light)] font-bold text-sm tracking-[0.3em] opacity-80 mb-4 uppercase">{t.visitorLabel}</p>
            <div className="flex gap-1.5" style={{ transformStyle: "preserve-3d" }}>
              {visitorCount.toLocaleString().split('').map((char, i) => (
                <span
                  key={i}
                  className={`flex items-center justify-center font-mono ${
                    char === ','
                    ? 'px-1 text-2xl text-[var(--gold-primary)] translate-y-3 opacity-80 shadow-none bg-transparent border-none'
                    : 'w-10 h-14 bg-gradient-to-b from-[#4a0404] via-black to-[#260101] border-2 border-[var(--gold-primary)]/60 text-[var(--gold-primary)] rounded-md text-3xl font-extrabold shadow-[0_8px_20px_rgba(0,0,0,0.9),_inset_0_2px_8px_rgba(255,255,255,0.15)]'
                  }`}
                  style={{ textShadow: char !== ',' ? "0 2px 4px rgba(212,175,55,0.3)" : "none" }}
                >
                  {char}
                </span>
              ))}
            </div>
            <p className="mt-5 text-[#d4af37]/40 text-xs tracking-[0.4em] font-light">Global Fortune Seekers</p>
          </div>
        )}

        {/* Lucky Winner Modal */}
        {luckyWinner !== null && (
          <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setLuckyWinner(null)}></div>
            <div className="relative bg-gradient-to-br from-[var(--red-deep)] via-[#4a0404] to-[#120101] border-[4px] border-[var(--gold-primary)] p-8 sm:p-12 rounded-3xl shadow-[0_0_120px_rgba(212,175,55,0.7)] text-center max-w-lg w-full transform animate-fade-in-fast flex flex-col items-center">
              <div className="absolute -top-16 text-8xl drop-shadow-[0_0_20px_rgba(255,215,0,0.8)] animate-bounce">🧧</div>
              <h2 className="text-4xl sm:text-5xl mt-6 font-black text-transparent bg-clip-text bg-gradient-to-r from-[#e5ca72] to-[#d4af37] mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,1)] uppercase tracking-wide">
                {t.congrats}
              </h2>
              <div className="bg-black/50 border border-[var(--gold-primary)]/40 p-8 rounded-2xl mb-8 w-full shadow-inner">
                 <p className="text-white text-xl leading-relaxed font-bold tracking-wide">
                   {t.luckyVisitorMsg(luckyWinner.toLocaleString())}<br/>
                   <span className="text-[3rem] sm:text-[4rem] text-[var(--gold-primary)] mx-2 font-mono block my-4 glow-text" style={{ textShadow: "0 0 20px rgba(212,175,55,0.6), 0 5px 10px rgba(0,0,0,0.8)" }}>{luckyWinner.toLocaleString()}</span>
                   {t.luckyVisitorPost}
                 </p>
                 <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--gold-primary)] to-transparent my-6 opacity-30"></div>
                 <p className="text-[var(--gold-light)] text-lg leading-loose font-medium">{t.luckyBody}<br/>{t.luckyBody2Pre} <strong className="text-white bg-[var(--gold-primary)]/20 px-2 rounded">{t.luckyBody2Highlight}</strong> {t.luckyBody2Post}</p>
              </div>
              <button
                onClick={() => setLuckyWinner(null)}
                className="w-full sm:w-4/5 bg-gradient-to-r from-[#e5ca72] via-[#ffe898] to-[#d4af37] text-black font-extrabold tracking-widest text-xl py-5 rounded-xl border-b-[6px] border-[#9c781a] hover:translate-y-2 hover:border-b-0 hover:mb-[6px] hover:shadow-none active:scale-95 transition-all duration-200 shadow-[0_15px_30px_rgba(0,0,0,0.9)] uppercase"
              >
                {t.luckyBtn}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function ScrollResult({ type, userInfo, onClose }: { type: string, userInfo: UserInfo, onClose: () => void }) {
  const { lang } = useLanguage();
  const t = getTranslations(lang);
  const data = buildHoroscope(userInfo, type, lang) as any;

  return (
    <div className="w-full max-w-2xl mt-10 relative flex flex-col items-center animate-fade-in-fast z-40 mb-32 drop-shadow-2xl">
      <button onClick={onClose} className="fixed top-[34px] right-6 md:top-[42px] md:right-8 z-50 bg-[var(--red-deep)] border border-[var(--gold-primary)] px-6 py-3 rounded-full text-[var(--gold-light)] hover:text-white hover:bg-black tracking-widest text-sm shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all flex items-center gap-2 group">
        <span className="transform group-hover:-translate-x-1 transition-transform">←</span> {t.backBtn}
      </button>

      {/* Top Wooden Roller */}
      <div className="w-full px-2 relative z-10 flex items-center justify-center">
         <div className="w-[104%] h-8 bg-gradient-to-b from-[#5C3A21] via-[#CD853F] to-[#2b1708] rounded-full shadow-2xl border border-[#3e2413]"></div>
         <div className="absolute right-0 w-5 h-12 bg-gradient-to-r from-[var(--gold-primary)] to-yellow-700 rounded-r-md flex items-center shadow-md"></div>
         <div className="absolute left-0 w-5 h-12 bg-gradient-to-l from-[var(--gold-primary)] to-yellow-700 rounded-l-md flex items-center shadow-md"></div>
      </div>

      {/* Unrolling Paper */}
      <div className="unroll-animation bg-[#f4e8c1] w-[96%] relative border-x border-[#c2b280] shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col items-center origin-top relative" style={{ backgroundImage: "radial-gradient(#e5d8b0 1px, transparent 1px)", backgroundSize: "20px 20px" }}>
         <div className="absolute inset-0 bg-gradient-to-b from-[#5C3A21]/10 via-transparent to-[#5C3A21]/10 pointer-events-none"></div>

         <div className="p-8 sm:p-12 text-[#3a0606] font-serif w-full absolute inset-0 content-fade-in overflow-y-auto scrollbar-hide">
            {type === "today" && (
              <>
                <div className="text-center mb-8 relative">
                  <h2 className="text-3xl font-bold tracking-widest border-b-2 border-[#3a0606]/30 pb-4 inline-block">{t.todayResultTitle}</h2>
                </div>
                <p className="text-xl text-center italic mb-10 font-bold opacity-90 leading-relaxed">
                  &ldquo;{data.quote.text}&rdquo;<br/><span className="text-sm font-normal mt-2 inline-block text-[#5C3A21]">({data.quote.author})</span>
                </p>
                <div className="space-y-8 text-lg">
                  <div className="flex justify-center border-b border-[#3a0606]/10 pb-4">
                    <span className="bg-[#3a0606] text-[var(--gold-light)] px-4 py-1 rounded-full text-sm tracking-widest">{t.readingFor(userInfo.name)}</span>
                  </div>
                  <p className="text-center bg-[#3a0606]/5 p-5 rounded-lg font-semibold border border-[#3a0606]/10">
                     {data.fortune}
                  </p>
                  <section>
                    <h3 className="text-xl font-bold text-[#b30000] mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#b30000] rotate-45 inline-block"></span> {t.coreEnergy} {data.element.name}
                    </h3>
                    <p className="leading-relaxed text-[#4a2424]">{data.element.desc}</p>
                  </section>
                  <section className="grid grid-cols-2 gap-4 mt-6">
                     <div className="bg-white/40 p-4 border border-[#c2b280]/50 rounded text-center shrink">
                        <h4 className="font-bold text-[#3a0606] mb-4 tracking-widest text-sm">{t.good}</h4>
                        <p className="text-sm text-[#4a2424] whitespace-pre-line leading-relaxed">{data.goodBad.good}</p>
                     </div>
                     <div className="bg-black/5 p-4 border border-[#c2b280]/50 rounded text-center shrink">
                        <h4 className="font-bold text-gray-700 mb-4 tracking-widest text-sm">{t.bad}</h4>
                        <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">{data.goodBad.bad}</p>
                     </div>
                  </section>
                </div>
              </>
            )}

            {type === "weekly" && (
              <>
                <div className="text-center mb-8 relative">
                  <h2 className="text-3xl font-bold tracking-widest border-b-2 border-[#3a0606]/30 pb-4 inline-block">{t.weeklyResultTitle}</h2>
                </div>
                <p className="text-xl text-center italic mb-10 font-bold opacity-90 leading-relaxed">
                  &ldquo;{data.quote.text}&rdquo;<br/><span className="text-sm font-normal mt-2 inline-block text-[#5C3A21]">({data.quote.author})</span>
                </p>
                <div className="space-y-6 text-[1.05rem] leading-7">
                  <div className="flex justify-center border-b border-[#3a0606]/10 pb-4">
                    <span className="bg-[#3a0606] text-[var(--gold-light)] px-4 py-1 rounded-full text-sm tracking-widest">{t.weeklyReadingFor(userInfo.name)}</span>
                  </div>
                  <div className="bg-[#3a0606]/5 p-5 rounded-lg border border-[#3a0606]/10 mb-6">
                    <h3 className="font-bold text-[#b30000] mb-3 flex items-center gap-2">
                       <span className="w-2 h-2 bg-[#b30000] rotate-45 inline-block"></span> {t.weeklyEnergy}
                    </h3>
                    <ul className="text-sm text-[#4a2424] space-y-3 mb-5 bg-white/40 p-4 rounded border border-[#c2b280]/40">
                       <li><strong className="text-[#3a0606]">{t.tenGodLabel} {data.tenGod.name}</strong><br/>- {data.tenGod.desc}</li>
                       <li><strong className="text-[#3a0606]">{t.shinsalLabel} {data.shinsal.name}</strong><br/>- {data.shinsal.desc}</li>
                    </ul>
                    <p className="text-center font-semibold border-t border-[#3a0606]/10 pt-4">
                       {data.summary}<br/><span className="text-[#b30000] mt-1 inline-block">{t.luckyDayMsg(data.luckyDay)}</span>
                    </p>
                  </div>
                     <div className="p-4 border-l-4 border-yellow-600 bg-white/30 rounded-r-lg">
                        <h4 className="font-bold text-[#3a0606] mb-2">{t.wealth}</h4>
                        <p className="text-[#4a2424]">{data.wealth}</p>
                     </div>
                     <div className="p-4 border-l-4 border-blue-600 bg-white/30 rounded-r-lg">
                        <h4 className="font-bold text-[#3a0606] mb-2">{t.relations}</h4>
                        <p className="text-[#4a2424]">{data.relation}</p>
                     </div>
                     <div className="p-4 border-l-4 border-green-600 bg-white/30 rounded-r-lg">
                        <h4 className="font-bold text-[#3a0606] mb-2">{t.career}</h4>
                        <p className="text-[#4a2424]">{data.career}</p>
                     </div>
                     <div className="p-4 border-l-4 border-pink-600 bg-white/30 rounded-r-lg">
                        <h4 className="font-bold text-[#3a0606] mb-2">{t.love}</h4>
                        <p className="text-[#4a2424]">{data.love}</p>
                     </div>
                </div>
              </>
            )}

            {type === "monthly" && (
              <>
                <div className="text-center mb-8 relative">
                  <h2 className="text-3xl font-bold tracking-widest border-b-2 border-[#3a0606]/30 pb-4 inline-block">{t.monthlyResultTitle}</h2>
                </div>
                <p className="text-xl text-center italic mb-10 font-bold opacity-90 leading-relaxed">
                  &ldquo;{data.quote.text}&rdquo;<br/><span className="text-sm font-normal mt-2 inline-block text-[#5C3A21]">({data.quote.author})</span>
                </p>
                <div className="space-y-6 text-lg leading-loose text-[#4a2424]">
                  <div className="flex justify-center border-b border-[#3a0606]/10 pb-4">
                    <span className="bg-[#3a0606] text-[var(--gold-light)] px-4 py-1 rounded-full text-sm tracking-widest">{t.monthlyReadingFor(userInfo.name)}</span>
                  </div>

                  <div className="my-8 p-6 border-2 border-[var(--gold-primary)]/40 rounded-xl bg-gradient-to-br from-white/70 to-[#f3e5ab]/40 shadow-sm relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--red-deep)] text-[var(--gold-light)] text-sm px-5 py-1 rounded-full border border-[var(--gold-primary)]/50 tracking-widest shadow-md">
                      {t.monthlyInfluence}
                    </div>
                    <div className="space-y-5 mt-3">
                       <div>
                         <h4 className="font-bold text-[#b30000] flex items-center gap-2"><span className="text-xl">⭐</span> {t.tenGodLabel} {data.tenGod.name}</h4>
                         <p className="text-[1.05rem] mt-1 pl-7 opacity-90">{data.tenGod.desc}</p>
                       </div>
                       <div>
                         <h4 className="font-bold text-[#b30000] flex items-center gap-2"><span className="text-xl">🌙</span> {t.shinsalLabel} {data.shinsal.name}</h4>
                         <p className="text-[1.05rem] mt-1 pl-7 opacity-90">{data.shinsal.desc}</p>
                       </div>
                    </div>
                  </div>

                  <p className="indent-4">{data.summary}</p>
                  <p className="indent-4">{data.detail1}</p>

                  <p className="indent-4 bg-[#3a0606]/5 border-l-4 border-[var(--gold-primary)] p-4 rounded-r mt-4 text-[1.05rem]">
                    {t.monthlyElementMsg(data.element.name, data.element.desc)}
                  </p>

                  <div className="mt-10 p-6 bg-[#3a0606]/10 rounded-xl border-dashed border-2 border-[#8B5A2B]">
                     <h4 className="font-bold text-center text-[#b30000] mb-5 tracking-widest text-xl">{t.monthlyRemedyTitle}</h4>
                     <ul className="space-y-3 text-[1.05rem]">
                       <li className="font-semibold text-center text-[var(--red-deep)] bg-white/60 p-4 rounded-lg border border-[var(--gold-primary)]/40 mb-6 shadow-sm">
                         🌱 <span className="underline decoration-[var(--gold-primary)] decoration-2 underline-offset-4">{t.remedyLabel}</span><br/>
                         <span className="font-normal text-[#4a2424] mt-3 inline-block leading-relaxed">{data.remedy}</span>
                       </li>
                       <li className="flex items-center gap-3">✨ <strong className="w-24">{t.luckyDaysLabel}</strong> {data.luckyDays}</li>
                       <li className="flex items-center gap-3">🧭 <strong className="w-24">{t.directionLabel}</strong> {data.direction}</li>
                       <li className="flex items-center gap-3">🎨 <strong className="w-24">{t.luckyColorLabel}</strong> {data.luckyColor}</li>
                     </ul>
                  </div>
                </div>
              </>
            )}
         </div>
      </div>

      {/* Bottom Wooden Roller */}
      <div className="w-full px-2 relative z-10 flex items-center justify-center -mt-1 bottom-roller">
         <div className="w-[104%] h-8 bg-gradient-to-b from-[#2b1708] via-[#CD853F] to-[#5C3A21] rounded-full shadow-[0_20px_30px_rgba(0,0,0,0.9)] border border-[#3e2413]"></div>
         <div className="absolute right-0 w-5 h-12 bg-gradient-to-r from-[var(--gold-primary)] to-yellow-700 rounded-r-md flex items-center shadow-md"></div>
         <div className="absolute left-0 w-5 h-12 bg-gradient-to-l from-[var(--gold-primary)] to-yellow-700 rounded-l-md flex items-center shadow-md"></div>
      </div>
    </div>
  );
}
