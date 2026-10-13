'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence } from 'framer-motion';
import { ArrowLeft, RefreshCw, Sparkles } from 'lucide-react';
import { MoodProfile } from '@/types';
import { getMoodById, getRandomMood } from '@/data/moods';
import { sound } from '@/lib/sound';
import { unlockAchievement } from '@/lib/storage';
import { useLang } from '@/contexts/LangContext';
import MoodCard from './MoodCard';

interface Props {
  initialResultId?: string;
}

export default function MoodMachineExperience({ initialResultId }: Props) {
  const { lang, isIndonesian } = useLang();
  const [currentMood, setCurrentMood] = useState<MoodProfile>(() => getMoodById(initialResultId, lang));
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateCount, setGenerateCount] = useState(0);

  useEffect(() => {
    setCurrentMood((prev) => getMoodById(prev.id || initialResultId, lang));
  }, [initialResultId, lang]);

  const handleGenerate = () => {
    sound.playBoop(480);
    setIsGenerating(true);

    setTimeout(() => {
      const nextMood = getRandomMood(currentMood.id, lang);
      setCurrentMood(nextMood);
      setIsGenerating(false);
      sound.playSuccess();

      const newCount = generateCount + 1;
      setGenerateCount(newCount);
      if (newCount >= 3) {
        unlockAchievement('mood-master');
      }

      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href);
        url.searchParams.set('result', nextMood.id);
        window.history.replaceState({}, '', url.toString());
      }
    }, 280);
  };

  return (
    <div className="w-full py-8 px-4 sm:px-6 max-w-4xl mx-auto flex flex-col items-center">
      <div className="w-full flex items-center justify-between mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-bold px-3 py-1.5 bg-white rounded-xl border-2 border-[#171717] brutalist-shadow-sm hover:bg-[#D7FF64]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isIndonesian ? 'Balik ke Playground' : 'Exit to Playground'}</span>
        </Link>

        <div className="px-3 py-1 bg-[#D7FF64] text-[#171717] font-mono text-xs font-bold rounded-lg border-2 border-[#171717] flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isIndonesian ? 'SINTESIS MOOD' : 'MOOD SYNTHESIZER'}</span>
        </div>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-black text-[#171717] tracking-tight uppercase mb-2">
          {isIndonesian ? 'MESIN MOOD ABSURD' : 'THE ABSURD MOOD MACHINE'}
        </h1>
        <p className="text-sm font-medium text-neutral-600 max-w-md mx-auto">
          {isIndonesian
            ? 'Algoritma diagnosa buat organisme dengan sisa satu braincell. Cari arketipe mentalmu sekarang.'
            : 'Diagnostic algorithm for single-braincell organisms. Find your current mental archetype.'}
        </p>
      </div>

      <AnimatePresence mode="wait">
        <MoodCard key={currentMood.id} mood={currentMood} />
      </AnimatePresence>

      <div className="mt-8">
        <button
          type="button"
          onClick={handleGenerate}
          disabled={isGenerating}
          className="px-8 py-4 bg-[#FF5C35] hover:bg-[#e04a25] text-white font-black text-lg rounded-2xl brutalist-button flex items-center gap-3 cursor-pointer select-none"
        >
          <RefreshCw className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
          <span>
            {isGenerating
              ? (isIndonesian ? 'Lagi diracik...' : 'Synthesizing...')
              : (isIndonesian ? 'Diagnosa Ulang Mood Gue' : 'Re-Diagnose My Mood')}
          </span>
        </button>
      </div>

      <p className="mt-4 text-xs font-mono text-neutral-500">
        Permalink: ?result={currentMood.id}
      </p>
    </div>
  );
}
