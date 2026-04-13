"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { UserInfo, buildHoroscope } from "./utils/horoscopeBuilder";

export default function Home() {
  const [selectedHoroscope, setSelectedHoroscope] = useState<string | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({ name: '', gender: '', year: '', month: '', day: '', time: '' });
  const [activeTab, setActiveTab] = useState<'service' | 'info' | 'blog'>('service');
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [luckyWinner, setLuckyWinner] = useState<number | null>(null);

  useEffect(() => {
    // 글로벌 가짜 방문자 로직: 15,000부터 시작해서 시간에 따라 유기적으로 오르는 느낌을 줌
    const startDate = new Date("2026-04-13T00:00:00").getTime();
    const now = new Date().getTime();
    const diffHours = Math.max(0, (now - startDate) / (1000 * 60 * 60));
    
    // 시간당 평균 12명의 방문자
    const globalCount = 15000 + Math.floor(diffHours * 12);
    
    // 로컬 환경 랜덤 히트 추가 (사용자가 새로고침할 때마다 1~3명씩 올라가는 액션성)
    const storedHits = parseInt(localStorage.getItem('fortune_hits') || '0', 10);
    const newHits = storedHits + Math.floor(Math.random() * 3) + 1;
    localStorage.setItem('fortune_hits', newHits.toString());

    const finalCount = globalCount + newHits;
    setVisitorCount(finalCount);

    // 10번째 방문자(10의 배수)일 경우 거대한 팝업과 화려한 메가 샷 폭죽 투하
    if (finalCount % 10 === 0) {
      setTimeout(() => {
        setLuckyWinner(finalCount); // 황금 모달 트리거
        
        const duration = 5000; // 5초 동안 쉬지 않고 터트림
        const end = Date.now() + duration;
        const goldColors = ['#D4AF37', '#FFD700', '#DAA520', '#B8860B', '#FFF8DC', '#ffffff'];

        (function frame() {
          // 하늘 위에서 랜덤으로 떨어지는 가루
          confetti({
            particleCount: 10,
            angle: Math.random() * 60 + 60,
            spread: 90,
            origin: { x: Math.random(), y: Math.random() * 0.2 },
            colors: goldColors,
            zIndex: 99999,
            scalar: 1.2
          });
          // 좌측 하단 대왕 폭격
          confetti({
            particleCount: 20,
            angle: 60,
            spread: 80,
            origin: { x: 0, y: 1 },
            colors: goldColors,
            zIndex: 99999,
            scalar: 2
          });
          // 우측 하단 대왕 폭격
          confetti({
            particleCount: 20,
            angle: 120,
            spread: 80,
            origin: { x: 1, y: 1 },
            colors: goldColors,
            zIndex: 99999,
            scalar: 2
          });

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        }());
      }, 1000); // UI 렌더링 딜레이 후 터트림
    }
  }, []);

  const handleSelect = (id: string) => {
    setSelectedHoroscope(id);
    setShowResult(false);
  };
  return (
    <div className="relative min-h-screen bg-[var(--background)] flex flex-col items-center justify-start overflow-x-hidden font-sans">
      {/* Oriental Seamless Pattern Overlay (Opacity 30%) */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill='%23d4af37' fill-opacity='0.1'%3E%3Cpath d='M50 50c-27.6 0-50 22.4-50 50h10c0-22.1 17.9-40 40-40s40 17.9 40 40h10c0-27.6-22.4-50-50-50zm0-50C22.4 0 0 22.4 0 50h10c0-22.1 17.9-40 40-40s40 17.9 40 40h10C100 22.4 77.6 0 50 0z'/%3E%3C/g%3E%3C/svg%3E")`, backgroundSize: '120px 120px', opacity: 0.3 }}></div>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-[var(--background)] opacity-70"></div>
      {/* Curtain Animation Overlay */}
      <div className="curtain-container fixed inset-0 z-50 flex pointer-events-none bg-transparent">
        {/* 왼쪽 막: 뷰포트의 좌측 50%. 내부 이미지를 전체 넓이로 잡아 좌측 반만 렌더링 */}
        <div className="curtain-left relative w-1/2 h-screen max-h-screen overflow-hidden shadow-[20px_0_50px_rgba(0,0,0,1)] z-20">
          <div className="absolute top-0 left-0 w-[100vw] h-full">
            <Image src="/grand_curtain.png" alt="Curtain Left" fill priority className="object-cover object-center" />
          </div>
          {/* add overlay for realistic shadow fold */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 mix-blend-multiply"></div>
        </div>
        
        {/* 오른쪽 막: 뷰포트의 우측 50%. 내부 이미지를 전체 넓이로 잡고 우측 끝에 붙여 언라인 */}
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
            <Image
              src="/dragon.png"
              alt="Golden Dragon Symbol"
              fill
              priority
              className="object-contain"
            />
          </div>
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-center tracking-[0.2em] text-[var(--gold-primary)] uppercase transition-all duration-300 hover:scale-105 cursor-default"
            style={{ textShadow: "0 1px 0 #b38b22, 0 2px 0 #9c781a, 0 3px 0 #866512, 0 5px 0px #6f530d, 0 7px 0px #584107, 0 10px 20px rgba(0,0,0,0.9)" }}
          >
            Daily Chinese Horoscope
          </h1>
          <div className="w-32 h-1 bg-[var(--gold-primary)] mt-6 opacity-60"></div>
          <p className="mt-6 text-lg sm:text-xl text-[var(--gold-light)] opacity-90 text-center tracking-[0.3em] font-light">
            당신의 운명을 확인하세요
          </p>
          <p className="mt-4 text-sm sm:text-base text-[var(--gold-light)] opacity-90 text-center tracking-widest font-medium bg-black/30 px-4 py-2 rounded-full border border-[var(--gold-primary)]/20 shadow-sm">
            ※ 입력하신 정보는 운세 풀이에만 사용되며, 서버에 절대 저장되지 않습니다.
          </p>
        </header>

        {/* Navigation Tabs */}
        <div className="flex gap-4 sm:gap-8 mb-12 z-10 relative">
          <button 
            onClick={() => setActiveTab('service')}
            className={`px-6 sm:px-10 py-3 rounded-full border border-[var(--gold-primary)]/50 tracking-widest transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)] ${activeTab === 'service' ? 'bg-gradient-to-r from-[#e5ca72] to-[#d4af37] text-[#3a0606] font-extrabold shadow-[0_0_20px_rgba(212,175,55,0.4)] scale-105' : 'bg-black/60 text-[var(--gold-light)] hover:bg-[#3a0606]/80 hover:text-white'}`}
          >
            운세 보기
          </button>
          <button 
            onClick={() => setActiveTab('info')}
            className={`px-6 sm:px-10 py-3 rounded-full border border-[var(--gold-primary)]/50 tracking-widest transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)] ${activeTab === 'info' ? 'bg-gradient-to-r from-[#e5ca72] to-[#d4af37] text-[#3a0606] font-extrabold shadow-[0_0_20px_rgba(212,175,55,0.4)] scale-105' : 'bg-black/60 text-[var(--gold-light)] hover:bg-[#3a0606]/80 hover:text-white'}`}
          >
            명리학 상식
          </button>
          <Link 
            href="/blog"
            className="px-6 sm:px-10 py-3 rounded-full border border-[var(--gold-primary)]/50 tracking-widest transition-all bg-black/60 text-[var(--gold-light)] hover:bg-[#3a0606]/80 hover:text-white shadow-[0_0_15px_rgba(0,0,0,0.5)] flex items-center justify-center"
          >
            운세 칼럼
          </Link>
        </div>

        {/* Info Article Section (AdSense Text) */}
        <div className={activeTab === 'info' ? "block w-full max-w-4xl animate-fade-in z-10 relative mb-20" : "hidden"}>
          <article className="bg-[#1a0505]/95 backdrop-blur-md border-[2px] border-[var(--gold-primary)]/40 rounded-3xl p-8 sm:p-12 shadow-[0_15px_50px_rgba(0,0,0,1)] text-[var(--gold-light)] leading-relaxed relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--gold-primary)]/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--red-deep)]/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--gold-primary)] mb-8 text-center tracking-widest border-b border-[var(--gold-primary)]/20 pb-6 relative z-10">
              사주팔자(四柱八字)란 무엇인가? <br/><span className="text-lg text-[var(--gold-light)]/80 mt-3 block font-normal">음양오행으로 풀어보는 내 삶의 기상도</span>
            </h2>
            
            <div className="space-y-6 text-[1.05rem] font-light relative z-10 tracking-wide break-keep">
              <p>
                많은 사람이 <strong>'사주(四柱)'</strong>를 단순한 점술이나 미신으로 치부하곤 합니다. 하지만 사주명리학(四柱命理學)은 수천 년간 누적된 자연의 변화와 인간 삶의 패턴을 관찰하여 체계화한 동양의 전통적인 통계학이자 철학입니다. '명리(命理)'라는 단어 자체가 '목숨 명(命)'에 '다스릴 리(理)'를 쓰며, 즉 우주와 자연의 이치를 통해 인간의 삶을 이해하고 다스린다는 깊은 뜻을 담고 있습니다.
              </p>
              <p>
                사주팔자(四柱八字)는 글자 그대로 네 개의 기둥(四柱)과 여덟 개의 글자(八字)를 의미합니다. 사람이 태어난 연(年), 월(月), 일(日), 시(時)를 천간(天干)과 지지(地支)의 두 글자씩 짝지어 기둥으로 세운 것이 사주이며, 이는 총 여덟 글자로 이루어지기 때문에 팔자라고 부릅니다. 이 여덟 글자 안에는 목(木), 화(火), 토(土), 금(金), 수(水)라는 오행(五行)의 기운이 각기 다른 배합으로 녹아 있습니다. 만물이 음양오행으로 이루어져 있듯, 인간 역시 태어나는 순간 세상에 흐르고 있던 특정 오행의 기운을 부여받아 자신의 고유한 성향과 기질을 띠게 됩니다.
              </p>
              <p>
                그렇다면 사주는 우리의 운명이 태어날 때부터 100% 정해져 있다는 의미일까요? 명리학자들은 입을 모아 <strong className="text-[var(--gold-primary)]">"그렇지 않다"</strong>고 말합니다. 사주는 '결정론'이 아니라 인생의 '기상도' 또는 '네비게이션'에 가깝습니다. 일기예보에서 내일 비가 온다고 예보하면 우리는 우산을 준비하듯, 명리학은 내 인생에 언제 추운 겨울이 오고 언제 따뜻한 봄이 오는지 그 계절의 사이클을 미리 인지하게 해줍니다.
              </p>
              <div className="bg-black/50 p-6 sm:p-8 rounded-2xl border border-[var(--gold-primary)]/20 border-l-4 border-l-[var(--gold-primary)] my-8 shadow-inner">
                <p>
                  불이 많은 사주(火多)는 열정적이고 추진력이 강하지만 욱하는 성질을 다스려야 하며, 물이 많은 사주(水多)는 지혜롭고 깊이가 있으나 우울감에 빠지지 않도록 주의해야 합니다. 이처럼 자신이 타고난 명(命)에 부족한 기운은 채우고 넘치는 기운은 덜어내는 과정을 <strong className="text-[var(--gold-primary)] font-bold text-lg">『개운(開運)』</strong>이라 합니다.
                </p>
              </div>
              <p>
                저희 <strong>데일리 사주</strong> 서비스는 단순한 운세 뽑기가 아닙니다. 당신이 가진 고유의 오행적 특성을 짚어주고, 다가오는 하루의 기운(일운) 및 한 주의 기운(주운)과 당신의 사주가 어떻게 상호작용하는지 분석하여 최적의 지침을 제공합니다. 맹신하기보다는 자신의 기질을 객관적으로 돌아보고, 좋은 운은 겸허히 받아들이며 흉한 운은 지혜롭게 피해 가는 현명한 나침반으로 활용해 보시길 바랍니다.
              </p>
            </div>
          </article>
        </div>

        {/* Service Container */}
        <div className={activeTab === 'service' ? "w-full flex flex-col items-center z-10" : "hidden"}>
          {/* Options */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 w-full" style={{ perspective: '1000px' }}>
          {[
            { id: "today", title: "오늘 운세", subtitle: "Today's Fortune" },
            { id: "weekly", title: "주간 운세", subtitle: "Weekly Fortune" },
            { id: "monthly", title: "월간 운세", subtitle: "Monthly Fortune" }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className="group relative overflow-hidden rounded-2xl border-t-2 border-l-2 border-r-[5px] border-b-[5px] border-[var(--gold-primary)]/70 bg-gradient-to-br from-[#800b0b] via-[#4a0404] to-[#120101] py-10 transition-all duration-300 transform hover:-translate-y-3 hover:translate-x-1 hover:border-r-[8px] hover:border-b-[8px] hover:shadow-[-15px_20px_40px_rgba(0,0,0,1),_inset_2px_2px_20px_rgba(255,255,255,0.15)] shadow-[-5px_10px_25px_rgba(0,0,0,0.9),_inset_1px_1px_5px_rgba(255,255,255,0.2)] focus:outline-none flex flex-col items-center justify-center text-center"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* 노이즈 텍스처로 돌붙임 질감 유도 */}
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
                {selectedHoroscope === "today" ? "오늘 운세" : selectedHoroscope === "weekly" ? "주간 운세" : "월간 운세"} 정보 입력
              </span>
            </div>
            
            <button 
              onClick={() => setSelectedHoroscope(null)}
              className="absolute top-6 right-6 text-[var(--gold-primary)]/50 hover:text-[var(--gold-primary)] transition-colors text-3xl font-light hover:scale-110"
              aria-label="닫기"
            >
              &times;
            </button>
            
            <form className="flex flex-col gap-8 mt-6" onSubmit={(e) => { e.preventDefault(); setShowResult(true); }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="flex flex-col gap-3">
                  <label className="text-[var(--gold-light)] font-semibold tracking-wider text-sm">이름 (NAME)</label>
                  <input 
                    type="text" 
                    value={userInfo.name}
                    onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                    placeholder="당신의 이름을 입력하세요"
                    className="bg-black/40 border border-[var(--gold-primary)]/30 p-4 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[var(--gold-primary)] focus:ring-1 focus:ring-[var(--gold-primary)] transition-all text-lg"
                    required
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[var(--gold-light)] font-semibold tracking-wider text-sm">성별 (GENDER)</label>
                  <select 
                    value={userInfo.gender} onChange={(e) => setUserInfo({ ...userInfo, gender: e.target.value })}
                    className="bg-black/40 border border-[var(--gold-primary)]/30 p-4 rounded-xl text-white focus:outline-none focus:border-[var(--gold-primary)] focus:ring-1 focus:ring-[var(--gold-primary)] transition-all text-lg cursor-pointer appearance-none"
                    required
                  >
                    <option value="">선택</option>
                    <option value="female" className="bg-[var(--red-deep)]">여성 (坤命)</option>
                    <option value="male" className="bg-[var(--red-deep)]">남성 (乾命)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                <div className="flex flex-col gap-3">
                  <label className="text-[var(--gold-light)] font-semibold tracking-wider text-sm">생년 (YEAR)</label>
                  <select value={userInfo.year} onChange={(e) => setUserInfo({ ...userInfo, year: e.target.value })} className="bg-black/40 border border-[var(--gold-primary)]/30 p-4 rounded-xl text-white focus:outline-none focus:border-[var(--gold-primary)] focus:ring-1 focus:ring-[var(--gold-primary)] transition-all cursor-pointer appearance-none" required>
                    <option value="">선택</option>
                    {Array.from({length: 100}, (_, i) => new Date().getFullYear() - i).map(year => (
                      <option key={year} value={year} className="bg-[var(--red-deep)]">{year}년</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[var(--gold-light)] font-semibold tracking-wider text-sm">월 (MONTH)</label>
                  <select value={userInfo.month} onChange={(e) => setUserInfo({ ...userInfo, month: e.target.value })} className="bg-black/40 border border-[var(--gold-primary)]/30 p-4 rounded-xl text-white focus:outline-none focus:border-[var(--gold-primary)] focus:ring-1 focus:ring-[var(--gold-primary)] transition-all cursor-pointer appearance-none" required>
                    <option value="">선택</option>
                    {Array.from({length: 12}, (_, i) => i + 1).map(month => (
                      <option key={month} value={month} className="bg-[var(--red-deep)]">{month}월</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[var(--gold-light)] font-semibold tracking-wider text-sm">일 (DAY)</label>
                  <select value={userInfo.day} onChange={(e) => setUserInfo({ ...userInfo, day: e.target.value })} className="bg-black/40 border border-[var(--gold-primary)]/30 p-4 rounded-xl text-white focus:outline-none focus:border-[var(--gold-primary)] focus:ring-1 focus:ring-[var(--gold-primary)] transition-all cursor-pointer appearance-none" required>
                    <option value="">선택</option>
                    {Array.from({length: 31}, (_, i) => i + 1).map(day => (
                      <option key={day} value={day} className="bg-[var(--red-deep)]">{day}일</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[var(--gold-light)] font-semibold tracking-wider text-sm">시간 (TIME)</label>
                  <select value={userInfo.time} onChange={(e) => setUserInfo({ ...userInfo, time: e.target.value })} className="bg-black/40 border border-[var(--gold-primary)]/30 p-4 rounded-xl text-white focus:outline-none focus:border-[var(--gold-primary)] focus:ring-1 focus:ring-[var(--gold-primary)] transition-all cursor-pointer appearance-none" required>
                    <option value="">모름</option>
                    {[
                      { val: "ja", label: "자시(子時, 23:30~01:30)" },
                      { val: "chuk", label: "축시(丑時, 01:30~03:30)" },
                      { val: "in", label: "인시(寅時, 03:30~05:30)" },
                      { val: "myo", label: "묘시(卯時, 05:30~07:30)" },
                      { val: "jin", label: "진시(辰時, 07:30~09:30)" },
                      { val: "sa", label: "사시(巳時, 09:30~11:30)" },
                      { val: "o", label: "오시(午時, 11:30~13:30)" },
                      { val: "mi", label: "미시(未時, 13:30~15:30)" },
                      { val: "shin", label: "신시(申時, 15:30~17:30)" },
                      { val: "yu", label: "유시(酉時, 17:30~19:30)" },
                      { val: "sul", label: "술시(戌時, 19:30~21:30)" },
                      { val: "hae", label: "해시(亥時, 21:30~23:30)" }
                    ].map((time) => (
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
                    안심하세요! 입력 정보는 <strong className="text-[var(--gold-primary)] font-semibold">절대 저장되지 않으며</strong> 즉시 파기됩니다.
                  </p>
                </div>
                <button 
                  type="submit" 
                  className="w-full md:w-2/3 bg-gradient-to-r from-[#e5ca72] via-[#ffe898] to-[#d4af37] text-[#3a0606] font-extrabold tracking-widest text-xl py-5 rounded-2xl border-t-2 border-l-2 border-r-[4px] border-b-[6px] border-[#9c781a] shadow-[-5px_10px_20px_rgba(0,0,0,0.8),_inset_2px_2px_5px_rgba(255,255,255,0.8)] transition-all duration-300 transform hover:-translate-y-2 hover:border-b-[8px] hover:shadow-[-10px_15px_30px_rgba(0,0,0,1)] active:scale-95 active:translate-y-2 active:border-b-2 active:shadow-none"
                >
                  운명 열어보기
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
            <p className="text-[var(--gold-light)] font-bold text-sm tracking-[0.3em] opacity-80 mb-4 uppercase">누적 방문자 수</p>
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
                축하합니다!
              </h2>
              <div className="bg-black/50 border border-[var(--gold-primary)]/40 p-8 rounded-2xl mb-8 w-full shadow-inner">
                 <p className="text-white text-xl leading-relaxed font-bold tracking-wide">
                   당신은 행운의<br/>
                   <span className="text-[3rem] sm:text-[4rem] text-[var(--gold-primary)] mx-2 font-mono block my-4 glow-text" style={{ textShadow: "0 0 20px rgba(212,175,55,0.6), 0 5px 10px rgba(0,0,0,0.8)" }}>{luckyWinner.toLocaleString()}</span>
                   번째 방문자입니다!
                 </p>
                 <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--gold-primary)] to-transparent my-6 opacity-30"></div>
                 <p className="text-[var(--gold-light)] text-lg leading-loose font-medium">오늘 엄청난 재물운이 폭발할 징조입니다.<br/>놓치지 말고 <strong className="text-white bg-[var(--gold-primary)]/20 px-2 rounded">오늘의 운세</strong>를 확인하세요!</p>
              </div>
              <button 
                onClick={() => setLuckyWinner(null)}
                className="w-full sm:w-4/5 bg-gradient-to-r from-[#e5ca72] via-[#ffe898] to-[#d4af37] text-black font-extrabold tracking-widest text-xl py-5 rounded-xl border-b-[6px] border-[#9c781a] hover:translate-y-2 hover:border-b-0 hover:mb-[6px] hover:shadow-none active:scale-95 transition-all duration-200 shadow-[0_15px_30px_rgba(0,0,0,0.9)] uppercase"
              >
                운세 확인하러 가기
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function ScrollResult({ type, userInfo, onClose }: { type: string, userInfo: UserInfo, onClose: () => void }) {
  const data = buildHoroscope(userInfo, type) as any;
  
  return (
    <div className="w-full max-w-2xl mt-10 relative flex flex-col items-center animate-fade-in-fast z-40 mb-32 drop-shadow-2xl">
      <button onClick={onClose} className="fixed top-[34px] right-6 md:top-[42px] md:right-8 z-50 bg-[var(--red-deep)] border border-[var(--gold-primary)] px-6 py-3 rounded-full text-[var(--gold-light)] hover:text-white hover:bg-black tracking-widest text-sm shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all flex items-center gap-2 group">
        <span className="transform group-hover:-translate-x-1 transition-transform">←</span> 다른 운세 보기
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
                  <h2 className="text-3xl font-bold tracking-widest border-b-2 border-[#3a0606]/30 pb-4 inline-block">오늘의 운세</h2>
                </div>
                <p className="text-xl text-center italic mb-10 font-bold opacity-90 leading-relaxed">
                  "{data.quote.text}"<br/><span className="text-sm font-normal mt-2 inline-block text-[#5C3A21]">({data.quote.author})</span>
                </p>
                <div className="space-y-8 text-lg">
                  <div className="flex justify-center border-b border-[#3a0606]/10 pb-4">
                    <span className="bg-[#3a0606] text-[var(--gold-light)] px-4 py-1 rounded-full text-sm tracking-widest">{userInfo.name} 님을 위한 풀이</span>
                  </div>
                  <p className="text-center bg-[#3a0606]/5 p-5 rounded-lg font-semibold border border-[#3a0606]/10">
                     {data.fortune}
                  </p>
                  <section>
                    <h3 className="text-xl font-bold text-[#b30000] mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#b30000] rotate-45 inline-block"></span> 핵심 기운: {data.element.name}
                    </h3>
                    <p className="leading-relaxed text-[#4a2424]">{data.element.desc}</p>
                  </section>
                  <section className="grid grid-cols-2 gap-4 mt-6">
                     <div className="bg-white/40 p-4 border border-[#c2b280]/50 rounded text-center shrink">
                        <h4 className="font-bold text-[#3a0606] mb-4 tracking-widest text-sm">길(吉)</h4>
                        <p className="text-sm text-[#4a2424] whitespace-pre-line leading-relaxed">{data.goodBad.good}</p>
                     </div>
                     <div className="bg-black/5 p-4 border border-[#c2b280]/50 rounded text-center shrink">
                        <h4 className="font-bold text-gray-700 mb-4 tracking-widest text-sm">흉(凶)</h4>
                        <p className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">{data.goodBad.bad}</p>
                     </div>
                  </section>
                </div>
              </>
            )}

            {type === "weekly" && (
              <>
                <div className="text-center mb-8 relative">
                  <h2 className="text-3xl font-bold tracking-widest border-b-2 border-[#3a0606]/30 pb-4 inline-block">주간 운세</h2>
                </div>
                <p className="text-xl text-center italic mb-10 font-bold opacity-90 leading-relaxed">
                  "{data.quote.text}"<br/><span className="text-sm font-normal mt-2 inline-block text-[#5C3A21]">({data.quote.author})</span>
                </p>
                <div className="space-y-6 text-[1.05rem] leading-7">
                  <div className="flex justify-center border-b border-[#3a0606]/10 pb-4">
                    <span className="bg-[#3a0606] text-[var(--gold-light)] px-4 py-1 rounded-full text-sm tracking-widest">{userInfo.name} 님을 위한 주간 풀이</span>
                  </div>
                  <div className="bg-[#3a0606]/5 p-5 rounded-lg border border-[#3a0606]/10 mb-6">
                    <h3 className="font-bold text-[#b30000] mb-3 flex items-center gap-2">
                       <span className="w-2 h-2 bg-[#b30000] rotate-45 inline-block"></span> 이번 주 발현되는 사주 기운
                    </h3>
                    <ul className="text-sm text-[#4a2424] space-y-3 mb-5 bg-white/40 p-4 rounded border border-[#c2b280]/40">
                       <li><strong className="text-[#3a0606]">십성(十星): {data.tenGod.name}</strong><br/>- {data.tenGod.desc}</li>
                       <li><strong className="text-[#3a0606]">신살(神殺): {data.shinsal.name}</strong><br/>- {data.shinsal.desc}</li>
                    </ul>
                    <p className="text-center font-semibold border-t border-[#3a0606]/10 pt-4">
                       {data.summary}<br/><span className="text-[#b30000] mt-1 inline-block">이번 주 행운의 요일은 <strong>{data.luckyDay}</strong>입니다.</span>
                    </p>
                  </div>
                     <div className="p-4 border-l-4 border-yellow-600 bg-white/30 rounded-r-lg">
                        <h4 className="font-bold text-[#3a0606] mb-2">💰 재물운</h4>
                        <p className="text-[#4a2424]">{data.wealth}</p>
                     </div>
                     <div className="p-4 border-l-4 border-blue-600 bg-white/30 rounded-r-lg">
                        <h4 className="font-bold text-[#3a0606] mb-2">🤝 대인관계</h4>
                        <p className="text-[#4a2424]">{data.relation}</p>
                     </div>
                     <div className="p-4 border-l-4 border-green-600 bg-white/30 rounded-r-lg">
                        <h4 className="font-bold text-[#3a0606] mb-2">💼 커리어</h4>
                        <p className="text-[#4a2424]">{data.career}</p>
                     </div>
                     <div className="p-4 border-l-4 border-pink-600 bg-white/30 rounded-r-lg">
                        <h4 className="font-bold text-[#3a0606] mb-2">💕 연애운</h4>
                        <p className="text-[#4a2424]">{data.love}</p>
                     </div>
                </div>
              </>
            )}

            {type === "monthly" && (
              <>
                <div className="text-center mb-8 relative">
                  <h2 className="text-3xl font-bold tracking-widest border-b-2 border-[#3a0606]/30 pb-4 inline-block">월간 운세</h2>
                </div>
                <p className="text-xl text-center italic mb-10 font-bold opacity-90 leading-relaxed">
                  "{data.quote.text}"<br/><span className="text-sm font-normal mt-2 inline-block text-[#5C3A21]">({data.quote.author})</span>
                </p>
                <div className="space-y-6 text-lg leading-loose text-[#4a2424]">
                  <div className="flex justify-center border-b border-[#3a0606]/10 pb-4">
                    <span className="bg-[#3a0606] text-[var(--gold-light)] px-4 py-1 rounded-full text-sm tracking-widest">{userInfo.name} 님을 위한 월간 심층 지침</span>
                  </div>
                  
                  <div className="my-8 p-6 border-2 border-[var(--gold-primary)]/40 rounded-xl bg-gradient-to-br from-white/70 to-[#f3e5ab]/40 shadow-sm relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--red-deep)] text-[var(--gold-light)] text-sm px-5 py-1 rounded-full border border-[var(--gold-primary)]/50 tracking-widest shadow-md">
                      이달의 명리학 작용
                    </div>
                    <div className="space-y-5 mt-3">
                       <div>
                         <h4 className="font-bold text-[#b30000] flex items-center gap-2"><span className="text-xl">⭐</span> 십성(十星): {data.tenGod.name}</h4>
                         <p className="text-[1.05rem] mt-1 pl-7 opacity-90">{data.tenGod.desc}</p>
                       </div>
                       <div>
                         <h4 className="font-bold text-[#b30000] flex items-center gap-2"><span className="text-xl">🌙</span> 신살(神殺): {data.shinsal.name}</h4>
                         <p className="text-[1.05rem] mt-1 pl-7 opacity-90">{data.shinsal.desc}</p>
                       </div>
                    </div>
                  </div>

                  <p className="indent-4">{data.summary}</p>
                  <p className="indent-4">{data.detail1}</p>
                  
                  <p className="indent-4 bg-[#3a0606]/5 border-l-4 border-[var(--gold-primary)] p-4 rounded-r mt-4 text-[1.05rem]">
                    선천적 기질인 <strong className="text-[#b30000]">{data.element.name}</strong>의 영향력이 이번 달 크게 작용하니, {data.element.desc}
                  </p>

                  <div className="mt-10 p-6 bg-[#3a0606]/10 rounded-xl border-dashed border-2 border-[#8B5A2B]">
                     <h4 className="font-bold text-center text-[#b30000] mb-5 tracking-widest text-xl">이달의 행운 처방전 & 개운법</h4>
                     <ul className="space-y-3 text-[1.05rem]">
                       <li className="font-semibold text-center text-[var(--red-deep)] bg-white/60 p-4 rounded-lg border border-[var(--gold-primary)]/40 mb-6 shadow-sm">
                         🌱 <span className="underline decoration-[var(--gold-primary)] decoration-2 underline-offset-4">액운을 쫓는 특별 개운법</span><br/>
                         <span className="font-normal text-[#4a2424] mt-3 inline-block leading-relaxed">{data.remedy}</span>
                       </li>
                       <li className="flex items-center gap-3">✨ <strong className="w-24">최강 길일:</strong> {data.luckyDays}</li>
                       <li className="flex items-center gap-3">🧭 <strong className="w-24">귀인 방향:</strong> {data.direction}</li>
                       <li className="flex items-center gap-3">🎨 <strong className="w-24">행운 컬러:</strong> {data.luckyColor}</li>
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
