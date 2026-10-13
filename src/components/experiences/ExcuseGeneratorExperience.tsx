'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Excuse, ExcuseCategory, ExcuseTone } from '@/types';
import { getExcusesData, getRandomExcuse } from '@/data/excuses';
import { sound } from '@/lib/sound';
import { unlockAchievement } from '@/lib/storage';
import { useLang } from '@/contexts/LangContext';
import ExcuseCard from './ExcuseCard';

const CATS: { id: ExcuseCategory; label: string; labelId: string; icon: string }[] = [
  { id: 'work', label: 'Work', labelId: 'Kerja', icon: '💼' },
  { id: 'college', label: 'College', labelId: 'Kuliah', icon: '🎓' },
  { id: 'social', label: 'Social', labelId: 'Sosial', icon: '🍿' },
  { id: 'productivity', label: 'Productivity', labelId: 'Produktif', icon: '⏳' },
  { id: 'random', label: 'Chaos', labelId: 'Random', icon: '🎲' },
];

const TONES: { id: ExcuseTone; label: string; labelId: string }[] = [
  { id: 'professional', label: 'Professional', labelId: 'Profesional' },
  { id: 'casual', label: 'Casual', labelId: 'Santai' },
  { id: 'dramatic', label: 'Dramatic', labelId: 'Drama' },
  { id: 'unhinged', label: 'Unhinged', labelId: 'Ngaco' },
];

export default function ExcuseGeneratorExperience() {
  const { lang, isIndonesian } = useLang();
  const [category, setCategory] = useState<ExcuseCategory>('work');
  const [tone, setTone] = useState<ExcuseTone>('professional');
  const [excuse, setExcuse] = useState<Excuse>(() => getExcusesData(lang)[0]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setExcuse(getRandomExcuse(category, tone, undefined, lang));
  }, [category, lang, tone]);

  const selectCat = (c: ExcuseCategory) => {
    sound.playClick();
    setCategory(c);
    setExcuse(getRandomExcuse(c, tone, excuse.id, lang));
  };

  const selectTone = (t: ExcuseTone) => {
    sound.playClick();
    setTone(t);
    setExcuse(getRandomExcuse(category, t, excuse.id, lang));
  };

  const handleReroll = () => {
    sound.playBoop(520);
    const next = getRandomExcuse(category, tone, excuse.id, lang);
    setExcuse(next);
    const nextCount = count + 1;
    setCount(nextCount);
    if (nextCount >= 3) unlockAchievement('excuse-artist');
  };

  return (
    <div className="w-full py-8 px-4 sm:px-6 max-w-4xl mx-auto flex flex-col items-center">
      <div className="w-full flex items-center justify-between mb-8">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono font-bold px-3 py-1.5 bg-white rounded-xl border-2 border-[#171717] brutalist-shadow-sm hover:bg-[#D7FF64]">
          <ArrowLeft className="w-4 h-4" />
          <span>{isIndonesian ? 'Balik ke Playground' : 'Exit to Playground'}</span>
        </Link>
        <span className="px-3 py-1 bg-[#FF5C35] text-white font-mono text-xs font-bold rounded-lg border-2 border-[#171717]">
          {isIndonesian ? 'MESIN ALASAN' : 'EXCUSE MACHINE'}
        </span>
      </div>

      <div className="text-center mb-6">
        <h1 className="text-3xl sm:text-4xl font-black text-[#171717] uppercase tracking-tight mb-2">
          {isIndonesian ? 'ALASAN ANTI KENA MENTAL' : 'BULLETPROOF EXCUSES'}
        </h1>
        <p className="text-sm font-medium text-neutral-600 max-w-md mx-auto">
          {isIndonesian
            ? 'Alibi kognitif bersertifikat buat menghindari tanggung jawab dengan gaya Gen Z.'
            : 'Certified cognitive alibis for avoiding responsibility with flair.'}
        </p>
      </div>

      <div className="w-full max-w-lg mb-3">
        <div className="text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1.5">{isIndonesian ? 'Konteks:' : 'Context:'}</div>
        <div className="flex flex-wrap gap-2">
          {CATS.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => selectCat(c.id)}
              className={`px-3 py-1.5 font-mono text-xs font-bold rounded-xl border-2 border-[#171717] brutalist-shadow-sm flex items-center gap-1.5 cursor-pointer ${
                category === c.id ? 'bg-[#FF5C35] text-white' : 'bg-white text-[#171717] hover:bg-[#F7F3E8]'
              }`}
            >
              <span>{c.icon}</span>
              <span>{isIndonesian ? c.labelId : c.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="w-full max-w-lg mb-6">
        <div className="text-[11px] font-mono font-bold uppercase text-neutral-600 mb-1.5">{isIndonesian ? 'Nada:' : 'Tone:'}</div>
        <div className="flex flex-wrap gap-2">
          {TONES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => selectTone(t.id)}
              className={`px-3 py-1.5 font-mono text-xs font-bold rounded-xl border-2 border-[#171717] brutalist-shadow-sm cursor-pointer ${
                tone === t.id ? 'bg-[#7957FF] text-white' : 'bg-white text-[#171717] hover:bg-[#F7F3E8]'
              }`}
            >
              {isIndonesian ? t.labelId : t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full max-w-xl">
        <AnimatePresence mode="wait">
          <ExcuseCard
            key={excuse.id}
            excuse={excuse}
            category={category}
            tone={tone}
            onReroll={handleReroll}
          />
        </AnimatePresence>
      </div>

      <div className="mt-8 text-center text-xs font-mono text-neutral-500">
        {isIndonesian
          ? 'Diuji pada kalender penuh, janji kosong, dan energi tinggal 1%.'
          : 'Tested on overbooked calendars and empty promises.'}
      </div>
    </div>
  );
}
