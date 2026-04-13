"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [selectedHoroscope, setSelectedHoroscope] = useState<string | null>(null);

  return (
    <div className="relative min-h-screen bg-[var(--background)] flex flex-col items-center justify-start overflow-x-hidden font-sans">
      {/* Curtain Animation Overlay */}
      <div className="curtain-container fixed inset-0 z-50 flex pointer-events-none">
        <div className="curtain-left relative w-1/2 h-screen max-h-screen bg-red-950 flex justify-end overflow-hidden border-r-4 border-yellow-600 shadow-[10px_0_30px_rgba(0,0,0,0.8)]">
          <Image src="/curtain.png" alt="Curtain Left" fill priority className="object-cover object-right opacity-90 scale-x-[-1]" />
          {/* add overlay for realistic shadow */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/60"></div>
        </div>
        <div className="curtain-right relative w-1/2 h-screen max-h-screen bg-red-950 flex justify-start overflow-hidden border-l-4 border-yellow-600 shadow-[-10px_0_30px_rgba(0,0,0,0.8)]">
          <Image src="/curtain.png" alt="Curtain Right" fill priority className="object-cover object-left opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/60"></div>
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
              onClick={() => setSelectedHoroscope(item.id)}
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
        {selectedHoroscope && (
          <section className="mt-20 w-full max-w-3xl animate-fade-in bg-gradient-to-b from-[#3a0606] to-[var(--red-deep)] p-8 sm:p-10 rounded-3xl border-2 border-[var(--gold-primary)]/40 shadow-2xl relative">
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
            
            <form className="flex flex-col gap-8 mt-6" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-3">
                <label className="text-[var(--gold-light)] font-semibold tracking-wider text-sm">이름 (NAME)</label>
                <input 
                  type="text" 
                  placeholder="당신의 이름을 입력하세요"
                  className="bg-black/40 border border-[var(--gold-primary)]/30 p-4 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[var(--gold-primary)] focus:ring-1 focus:ring-[var(--gold-primary)] transition-all text-lg"
                  required
                />
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
                    {Array.from({length: 24}, (_, i) => i).map(hour => (
                      <option key={hour} value={hour} className="bg-[var(--red-deep)]">{hour.toString().padStart(2, '0')}:00</option>
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
      </main>
    </div>
  );
}
