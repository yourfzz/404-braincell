'use client';

import React from 'react';
import { useLang } from '@/contexts/LangContext';

export default function BrainStatusTicker() {
  const { isIndonesian } = useLang();

  const tickerItems = isIndonesian ? [
    '🧠 SISA BRAINCELL: 1 (NYARIS HABIS)',
    '⚡ STATUS SISTEM: 100% TIDAK PRODUKTIF',
    '🛑 ALERT HR: JANGAN TUNJUKKAN KE ATASAN',
    '🛋️ AKTIVITAS DISARANKAN: REBAHAN MENATAP NASIB',
    '✨ VIBES ONLY, LOGIKA NANTI',
    '☕ EFISIENSI KAFEIN: 12%',
    '👾 LEVEL ABSURD: AMAN TERKENDALI',
  ] : [
    '🧠 BRAIN CELLS REMAINING: 1 (BARELY)',
    '⚡ SYSTEM STATUS: 100% UNPRODUCTIVE',
    '🛑 HR ALERT: DO NOT SHOW THIS TO YOUR MANAGER',
    '🛋️ RECOMMENDED ACTIVITY: HORIZONTAL STARE',
    '✨ CERTIFIED VIBES ONLY',
    '☕ CAFFEINE EFFICIENCY: 12%',
    '👾 ABSURDITY LEVEL: NOMINAL',
  ];

  return (
    <div className="w-full bg-[#171717] text-[#D7FF64] border-y-2 border-[#171717] py-2 overflow-hidden select-none">
      <div className="flex whitespace-nowrap animate-marquee">
        <div className="flex items-center gap-8 font-mono text-xs sm:text-sm font-bold tracking-wider">
          {tickerItems.map((item, idx) => (
            <span key={idx} className="flex items-center gap-3">
              <span>{item}</span>
              <span className="text-[#FF5C35]">✦</span>
            </span>
          ))}
        </div>
        <div className="flex items-center gap-8 font-mono text-xs sm:text-sm font-bold tracking-wider ml-8" aria-hidden="true">
          {tickerItems.map((item, idx) => (
            <span key={`dup-${idx}`} className="flex items-center gap-3">
              <span>{item}</span>
              <span className="text-[#FF5C35]">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
