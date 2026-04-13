"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [selectedHoroscope, setSelectedHoroscope] = useState<string | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);

  const handleSelect = (id: string) => {
    setSelectedHoroscope(id);
    setShowResult(false);
  };

  return (
    <div className="relative min-h-screen bg-[var(--background)] flex flex-col items-center justify-start overflow-x-hidden font-sans">
      {/* Curtain Animation Overlay */}
      <div className="curtain-container fixed inset-0 z-50 flex pointer-events-none bg-black">
        {/* 왼쪽 막: 뷰포트의 좌측 50%. 내부 이미지를 전체 넓이로 잡아 좌측 반만 렌더링 */}
        <div className="curtain-left relative w-1/2 h-screen max-h-screen overflow-hidden border-r-[4px] border-[#d4af37] shadow-[20px_0_50px_rgba(0,0,0,1)] z-20">
          <div className="absolute top-0 left-0 w-[100vw] h-full">
            <Image src="/grand_curtain.png" alt="Curtain Left" fill priority className="object-cover object-center" />
          </div>
          {/* add overlay for realistic shadow fold */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 mix-blend-multiply"></div>
        </div>
        
        {/* 오른쪽 막: 뷰포트의 우측 50%. 내부 이미지를 전체 넓이로 잡고 우측 끝에 붙여 언라인 */}
        <div className="curtain-right relative w-1/2 h-screen max-h-screen overflow-hidden border-l-[4px] border-[#d4af37] shadow-[-20px_0_50px_rgba(0,0,0,1)] z-20">
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
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center tracking-[0.2em] text-[var(--gold-primary)] drop-shadow-lg [text-shadow:2px_2px_4px_rgba(0,0,0,0.8)] uppercase">
            Daily Chinese Horoscope
          </h1>
          <div className="w-32 h-1 bg-[var(--gold-primary)] mt-6 opacity-60"></div>
          <p className="mt-6 text-lg sm:text-xl text-[var(--gold-light)] opacity-90 text-center tracking-[0.3em] font-light">
            당신의 운명을 확인하세요
          </p>
        </header>

        {/* Options */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full">
          {[
            { id: "today", title: "오늘 운세", subtitle: "Today's Fortune" },
            { id: "weekly", title: "주간 운세", subtitle: "Weekly Fortune" },
            { id: "monthly", title: "월간 운세", subtitle: "Monthly Fortune" }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className="group relative overflow-hidden rounded-2xl border-2 border-[var(--gold-primary)]/50 bg-[var(--red-deep)] p-8 transition-all duration-300 hover:scale-105 hover:border-[var(--gold-primary)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] focus:outline-none"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60 z-0"></div>
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--gold-primary)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 flex flex-col items-center justify-center py-6">
                <h3 className="text-3xl font-bold text-[var(--gold-primary)] mb-3">{item.title}</h3>
                <p className="text-sm text-[var(--gold-light)] opacity-70 uppercase tracking-widest">{item.subtitle}</p>
              </div>
            </button>
          ))}
        </section>

        {/* Form Modal/Section */}
        {!showResult && selectedHoroscope && (
          <section className="mt-20 w-full max-w-3xl animate-fade-in-fast bg-gradient-to-b from-[#3a0606] to-[var(--red-deep)] p-8 sm:p-10 rounded-3xl border-2 border-[var(--gold-primary)]/40 shadow-2xl relative">
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
                    placeholder="당신의 이름을 입력하세요"
                    className="bg-black/40 border border-[var(--gold-primary)]/30 p-4 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[var(--gold-primary)] focus:ring-1 focus:ring-[var(--gold-primary)] transition-all text-lg"
                    required
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[var(--gold-light)] font-semibold tracking-wider text-sm">성별 (GENDER)</label>
                  <select 
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
                  <select className="bg-black/40 border border-[var(--gold-primary)]/30 p-4 rounded-xl text-white focus:outline-none focus:border-[var(--gold-primary)] focus:ring-1 focus:ring-[var(--gold-primary)] transition-all cursor-pointer appearance-none">
                    <option value="">선택</option>
                    {Array.from({length: 100}, (_, i) => new Date().getFullYear() - i).map(year => (
                      <option key={year} value={year} className="bg-[var(--red-deep)]">{year}년</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[var(--gold-light)] font-semibold tracking-wider text-sm">월 (MONTH)</label>
                  <select className="bg-black/40 border border-[var(--gold-primary)]/30 p-4 rounded-xl text-white focus:outline-none focus:border-[var(--gold-primary)] focus:ring-1 focus:ring-[var(--gold-primary)] transition-all cursor-pointer appearance-none">
                    <option value="">선택</option>
                    {Array.from({length: 12}, (_, i) => i + 1).map(month => (
                      <option key={month} value={month} className="bg-[var(--red-deep)]">{month}월</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[var(--gold-light)] font-semibold tracking-wider text-sm">일 (DAY)</label>
                  <select className="bg-black/40 border border-[var(--gold-primary)]/30 p-4 rounded-xl text-white focus:outline-none focus:border-[var(--gold-primary)] focus:ring-1 focus:ring-[var(--gold-primary)] transition-all cursor-pointer appearance-none">
                    <option value="">선택</option>
                    {Array.from({length: 31}, (_, i) => i + 1).map(day => (
                      <option key={day} value={day} className="bg-[var(--red-deep)]">{day}일</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[var(--gold-light)] font-semibold tracking-wider text-sm">시간 (TIME)</label>
                  <select className="bg-black/40 border border-[var(--gold-primary)]/30 p-4 rounded-xl text-white focus:outline-none focus:border-[var(--gold-primary)] focus:ring-1 focus:ring-[var(--gold-primary)] transition-all cursor-pointer appearance-none">
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

              <div className="mt-8 flex justify-center">
                <button 
                  type="submit" 
                  className="w-full md:w-2/3 bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#d4af37] text-black font-extrabold tracking-widest text-xl py-5 rounded-xl hover:shadow-[0_0_25px_rgba(212,175,55,0.8)] transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
                >
                  운명 열어보기
                </button>
              </div>
            </form>
          </section>
        )}

        {showResult && selectedHoroscope && (
          <ScrollResult type={selectedHoroscope} onClose={() => setShowResult(false)} />
        )}
      </main>
    </div>
  );
}

function ScrollResult({ type, onClose }: { type: string, onClose: () => void }) {
  return (
    <div className="w-full max-w-2xl mt-10 relative flex flex-col items-center animate-fade-in-fast z-40 mb-32 drop-shadow-2xl">
      <button onClick={onClose} className="absolute -top-12 right-0 text-[var(--gold-light)] hover:text-white pb-2 tracking-widest text-sm opacity-70 hover:opacity-100 transition-opacity">
        ← 돌아가기
      </button>
      
      {/* Top Wooden Roller */}
      <div className="w-full px-2 relative z-10 flex items-center justify-center">
         <div className="w-[104%] h-8 bg-gradient-to-b from-[#5C3A21] via-[#CD853F] to-[#2b1708] rounded-full shadow-2xl border border-[#3e2413]"></div>
         <div className="absolute right-0 w-5 h-12 bg-gradient-to-r from-[var(--gold-primary)] to-yellow-700 rounded-r-md flex items-center shadow-md"></div>
         <div className="absolute left-0 w-5 h-12 bg-gradient-to-l from-[var(--gold-primary)] to-yellow-700 rounded-l-md flex items-center shadow-md"></div>
      </div>
      
      {/* Unrolling Paper */}
      <div className="unroll-animation bg-[#f4e8c1] w-[96%] relative border-x border-[#c2b280] shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col items-center origin-top relative" style={{ backgroundImage: "radial-gradient(#e5d8b0 1px, transparent 1px)", backgroundSize: "20px 20px" }}>
         {/* Inner texture overlay */}
         <div className="absolute inset-0 bg-gradient-to-b from-[#5C3A21]/10 via-transparent to-[#5C3A21]/10 pointer-events-none"></div>
         
         <div className="p-8 sm:p-12 text-[#3a0606] font-serif w-full absolute inset-0 content-fade-in overflow-y-auto scrollbar-hide">
            <div className="text-center mb-8 relative">
              <h2 className="text-3xl font-bold tracking-widest border-b-2 border-[#3a0606]/30 pb-4 inline-block">
                 {type === "today" ? "오늘의 운세" : type === "weekly" ? "주간 운세" : "월간 운세"}
              </h2>
            </div>
            
            <p className="text-xl text-center italic mb-10 font-bold opacity-90 leading-relaxed">
              "천리 길도 한 걸음부터 시작된다"<br/><span className="text-sm font-normal mt-2 inline-block text-[#5C3A21]">(千里之行 始於足下 - 노자)</span>
            </p>
            
            <div className="space-y-8 text-lg">
              <p className="text-center bg-[#3a0606]/5 p-5 rounded-lg font-semibold border border-[#3a0606]/10">
                 마음은 급하나 오늘은 작은 실천 한 가지에 집중하세요.
              </p>
              
              <section>
                <h3 className="text-xl font-bold text-[#b30000] mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#b30000] rotate-45 inline-block"></span> 핵심 기운
                </h3>
                <p className="leading-relaxed text-[#4a2424]">나무(木)의 기운이 왕성하여 활동력이 솟구치는 상입니다. 머릿속으로만 생각했던 구상을 밖으로 꺼내어 행동하기 가장 좋은 시점입니다.</p>
              </section>
              
              <section className="grid grid-cols-2 gap-4 mt-6">
                 <div className="bg-white/40 p-4 border border-[#c2b280]/50 rounded text-center">
                    <h4 className="font-bold text-[#3a0606] mb-2 tracking-widest text-sm">길(吉)</h4>
                    <p className="text-sm text-[#4a2424]">새로운 인맥 형성<br/>따뜻한 차 마시기</p>
                 </div>
                 <div className="bg-black/5 p-4 border border-[#c2b280]/50 rounded text-center">
                    <h4 className="font-bold text-gray-700 mb-2 tracking-widest text-sm">흉(凶)</h4>
                    <p className="text-sm text-gray-600">감정적인 언쟁<br/>충동적인 소비</p>
                 </div>
              </section>
            </div>
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
