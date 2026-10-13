'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Terminal, Zap } from 'lucide-react';
import { getUnlockedAchievements, unlockAchievement } from '@/lib/storage';
import { sound } from '@/lib/sound';
import { useToast } from '@/components/ui/ToastContext';
import TrophyCabinet from './TrophyCabinet';

export default function SecretRoomExperience() {
  const { showToast } = useToast();
  const [unlocked, setUnlocked] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(12);
  const [secretRevealed, setSecretRevealed] = useState(false);

  useEffect(() => {
    setMounted(true);
    unlockAchievement('found-secret');
    setUnlocked(getUnlockedAchievements());
  }, []);

  const handleChargeBrain = () => {
    sound.playBoop(320 + batteryLevel * 8);
    const next = Math.min(100, batteryLevel + 11);
    setBatteryLevel(next);

    if (next >= 100) {
      sound.playSuccess();
      unlockAchievement('brain-recharged');
      setUnlocked(getUnlockedAchievements());
      showToast('⚡ MAXIMUM BRAIN CELL OVERCLOCKED!', 'secret', 3000);
    } else {
      showToast(`🔋 Neuron supercharging: ${next}%`, 'default', 1200);
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] w-full bg-[#121212] text-[#F7F3E8] py-10 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        <div className="w-full flex items-center justify-between mb-8">
          <Link
            href="/"
            onClick={() => sound.playClick()}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold px-3 py-1.5 bg-[#171717] text-[#D7FF64] rounded-xl border-2 border-[#D7FF64] brutalist-shadow-sm hover:bg-[#D7FF64] hover:text-[#171717]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Daylight</span>
          </Link>
          <span className="px-3 py-1 bg-[#7957FF] text-white font-mono text-xs font-black rounded-lg border-2 border-white flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5" />
            <span>SECRET_VAULT.EXE</span>
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-10"
        >
          <div className="inline-block px-3 py-1 bg-[#FF5C35] text-white font-mono text-xs font-black rounded-full border border-white mb-3 tracking-widest uppercase">
            RESTRICTED ACCESS
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase mb-3">
            YOU DISCOVERED THE <span className="text-[#D7FF64]">SECRET LAB</span>
          </h1>
          <p className="text-sm font-medium text-neutral-400 max-w-lg mx-auto leading-relaxed">
            You weren&apos;t supposed to find this. There are no deadlines here, no KPIs, and zero accountability.
          </p>
        </motion.div>

        {/* Neuron Supercharger Device */}
        <div className="w-full max-w-xl bg-[#1C1C1C] rounded-2xl border-2 border-[#7957FF] p-6 brutalist-shadow mb-10">
          <div className="flex items-center justify-between mb-4 font-mono text-xs font-bold text-[#D7FF64]">
            <span className="flex items-center gap-2">
              <Zap className="w-4 h-4 fill-current" />
              NEURON OVERCLOCKING CHAMBER
            </span>
            <span className="text-neutral-400">STATUS: {batteryLevel >= 100 ? 'MAXIMAL' : 'CHARGING'}</span>
          </div>

          <div className="mb-6">
            <div className="flex justify-between text-xs font-mono font-bold mb-2 text-white">
              <span>SINGLE CELL CHARGE</span>
              <span>{batteryLevel}%</span>
            </div>
            <div className="w-full h-4 bg-neutral-800 rounded-full border border-white/20 overflow-hidden p-0.5">
              <motion.div
                animate={{ width: `${batteryLevel}%` }}
                className="h-full bg-gradient-to-r from-[#7957FF] via-[#FF5C35] to-[#D7FF64] rounded-full"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={handleChargeBrain}
              className="flex-1 py-3 px-4 bg-[#D7FF64] hover:bg-[#bce64c] text-[#171717] font-black text-sm rounded-xl border-2 border-white brutalist-button flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Zap Brain Cell (+11%)</span>
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playGlitch();
                setSecretRevealed(!secretRevealed);
              }}
              className="py-3 px-4 bg-[#2A2A2A] hover:bg-[#333] text-white font-mono text-xs font-bold rounded-xl border border-white/30 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{secretRevealed ? 'Hide Lore' : 'Decrypt Secret Lore'}</span>
            </button>
          </div>

          {secretRevealed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 p-4 rounded-xl bg-black border border-[#D7FF64]/40 font-mono text-xs text-[#D7FF64] leading-relaxed"
            >
              &gt; ARCHIVE LOG 404:<br />
              &ldquo;In 2026, humanity realized pretending to be productive took more energy than actual productivity. Hence, 404 Braincell was created.&rdquo;
            </motion.div>
          )}
        </div>

        <TrophyCabinet unlocked={unlocked} mounted={mounted} />
      </div>
    </div>
  );
}
