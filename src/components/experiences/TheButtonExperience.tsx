'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, ArrowLeft, Trophy, AlertCircle } from 'lucide-react';
import { BUTTON_EVENTS } from '@/data/button-events';
import { ButtonEvent } from '@/types';
import { sound } from '@/lib/sound';
import { useToast } from '@/components/ui/ToastContext';
import { getStoredButtonClicks, incrementButtonClicks, setStoredButtonClicks, unlockAchievement } from '@/lib/storage';

export default function TheButtonExperience() {
  const { showToast } = useToast();
  const [clicks, setClicks] = useState(0);
  const [event, setEvent] = useState<ButtonEvent>(BUTTON_EVENTS[0]);
  const [stickers, setStickers] = useState<{ id: number; emoji: string; x: number; y: number }[]>([]);
  const [mounted, setMounted] = useState(false);
  const [shaking, setShaking] = useState(false);

  useEffect(() => {
    setMounted(true);
    const count = getStoredButtonClicks();
    setClicks(count);
    const initialIndex = count % BUTTON_EVENTS.length;
    setEvent(BUTTON_EVENTS[initialIndex] || BUTTON_EVENTS[0]);
  }, []);

  const handleClick = () => {
    const nextCount = incrementButtonClicks();
    setClicks(nextCount);

    const eventIndex = nextCount % BUTTON_EVENTS.length;
    const nextEv = BUTTON_EVENTS[eventIndex] || BUTTON_EVENTS[0];
    setEvent(nextEv);

    if (nextEv.soundType === 'glitch') {
      sound.playGlitch();
      setShaking(true);
      setTimeout(() => setShaking(false), 400);
    } else if (nextEv.soundType === 'party') {
      sound.playSuccess();
    } else if (nextEv.soundType === 'pop') {
      sound.playPop();
    } else {
      sound.playBoop(320 + (nextCount % 8) * 40);
    }

    if (nextEv.spawnSticker) {
      const newSticker = {
        id: Date.now() + Math.random(),
        emoji: nextEv.spawnSticker,
        x: (Math.random() - 0.5) * 180,
        y: (Math.random() - 0.5) * 140,
      };
      setStickers((prev) => [...prev.slice(-6), newSticker]);
    }

    if (nextEv.toastMessage) {
      showToast(nextEv.toastMessage, nextCount >= 13 ? 'alert' : 'default', 2000);
    }

    if (nextCount === 1) unlockAchievement('first-blood');
    if (nextCount === 10) unlockAchievement('curiosity-killed-the-cat');
    if (nextCount >= 25) unlockAchievement('button-masher');
  };

  const handleReset = () => {
    sound.playPop();
    setStoredButtonClicks(0);
    setClicks(0);
    setEvent(BUTTON_EVENTS[0]);
    setStickers([]);
    showToast('🔄 Reality reset to baseline.', 'default', 1500);
  };

  return (
    <div
      className={`min-h-[calc(100vh-140px)] w-full flex flex-col justify-between p-4 sm:p-6 transition-colors duration-500 relative overflow-hidden ${
        shaking ? 'animate-pulse' : ''
      }`}
      style={{ backgroundColor: clicks === 0 ? '#F7F3E8' : `${event.themeColor}18` }}
    >
      <div className="max-w-4xl w-full mx-auto flex items-center justify-between gap-4 z-20">
        <Link
          href="/"
          onClick={() => sound.playClick()}
          className="inline-flex items-center gap-2 text-xs font-mono font-bold px-3.5 py-2 bg-white text-[#171717] rounded-xl border-2 border-[#171717] brutalist-shadow-sm hover:bg-[#D7FF64]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit</span>
        </Link>
        <div className="flex items-center gap-2">
          <div className="px-3.5 py-2 bg-[#171717] text-white font-mono text-xs font-bold rounded-xl border-2 border-[#171717] flex items-center gap-2 brutalist-shadow-sm">
            <span className="text-[#D7FF64]">CLICKS:</span>
            <span className="text-base font-black">{mounted ? clicks : 0}</span>
          </div>
          <button
            type="button"
            onClick={handleReset}
            title="Reset"
            className="p-2 bg-white hover:bg-[#FF5C35] hover:text-white text-[#171717] rounded-xl border-2 border-[#171717] brutalist-shadow-sm cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-xl w-full mx-auto flex-1 flex flex-col items-center justify-center text-center my-6 relative z-10">
        <div className="h-12 flex items-center justify-center mb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={event.id + '-' + clicks}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border-2 border-[#171717] brutalist-shadow-sm font-mono text-xs font-bold text-[#171717]"
            >
              <AlertCircle className="w-3.5 h-3.5 text-[#FF5C35]" />
              <span>{event.subtext}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative p-6 flex items-center justify-center select-none">
          {stickers.map((st) => (
            <motion.div
              key={st.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1.2, x: st.x, y: st.y }}
              className="absolute pointer-events-none text-3xl z-30 drop-shadow"
            >
              {st.emoji}
            </motion.div>
          ))}

          <motion.button
            key={event.id}
            whileHover={{ scale: event.scale * 1.03 }}
            whileTap={{ scale: event.scale * 0.95 }}
            animate={{ rotate: event.rotation, scale: event.scale }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            onClick={handleClick}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClick();
              }
            }}
            style={{ backgroundColor: event.themeColor, color: event.textColor }}
            className="w-64 h-64 sm:w-72 sm:h-72 rounded-full border-4 border-[#171717] brutalist-shadow-lg flex flex-col items-center justify-center p-6 text-center cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#171717]"
          >
            <span className="text-xl sm:text-2xl font-black uppercase tracking-tight leading-tight">
              {event.label}
            </span>
            <span className="mt-3 text-[11px] font-mono uppercase tracking-widest opacity-80 border-t border-current pt-1">
              [PRESS OR SPACE]
            </span>
          </motion.button>
        </div>

        {clicks >= 25 && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 p-4 bg-[#D7FF64] rounded-2xl border-2 border-[#171717] brutalist-shadow max-w-sm flex flex-col items-center gap-1.5">
            <div className="flex items-center gap-2 text-xs font-mono font-black text-[#171717]">
              <Trophy className="w-4 h-4 text-[#7957FF]" />
              <span>🌀 DIMENSIONAL RIFT OPEN!</span>
            </div>
            <Link
              href="/secret-room"
              onClick={() => sound.playGlitch()}
              className="mt-1 px-4 py-2 bg-[#7957FF] text-white text-xs font-mono font-bold rounded-xl border-2 border-[#171717] brutalist-shadow-sm hover:bg-[#6844f9]"
            >
              Enter Secret Room ↗
            </Link>
          </motion.div>
        )}
      </div>

      <div className="text-center font-mono text-xs text-neutral-600 pb-2 z-20">
        ⚡ 100% Client-side. Press as much as your remaining neuron allows.
      </div>
    </div>
  );

}
