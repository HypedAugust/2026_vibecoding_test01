"use client";

import Image from "next/image";
import { useState } from "react";
import { UserInfo, buildHoroscope } from "./utils/horoscopeBuilder";

export default function Home() {
  const [selectedHoroscope, setSelectedHoroscope] = useState<string | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({ name: '', gender: '', year: '', month: '', day: '', time: '' });

  const handleSelect = (id: string) => {
    setSelectedHoroscope(id);
    setShowResult(false);
  };

  return (
    <div className="relative min-h-screen bg-[var(--background)] flex flex-col items-center justify-start overflow-x-hidden font-sans">
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
          <ScrollResult type={selectedHoroscope} userInfo={userInfo} onClose={() => setShowResult(false)} />
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
