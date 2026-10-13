'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Share2, Check, Flame, Zap } from 'lucide-react';
import { MoodProfile } from '@/types';
import { sound } from '@/lib/sound';
import { useToast } from '@/components/ui/ToastContext';
import { useLang } from '@/contexts/LangContext';

interface MoodCardProps {
  mood: MoodProfile;
}

export default function MoodCard({ mood }: MoodCardProps) {
  const { showToast } = useToast();
  const { isIndonesian } = useLang();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    sound.playClick();
    const text = isIndonesian
      ? `🧠 Mood 404 Braincell gue: ${mood.name} (${mood.emoji})\n"${mood.description}"\nChaos: ${mood.chaosLevel}% | Energi: ${mood.energyLevel}%\nCek punyamu: ${window.location.href}`
      : `🧠 My 404 Braincell Mood: ${mood.name} (${mood.emoji})\n"${mood.description}"\nChaos: ${mood.chaosLevel}% | Energy: ${mood.energyLevel}%\nCheck yours: ${window.location.href}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      showToast(isIndonesian ? '📋 Rangkuman mood berhasil disalin!' : '📋 Mood summary copied!', 'success', 2000);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast(isIndonesian ? '⚠️ Gagal nyalin teks' : '⚠️ Could not copy text', 'warning');
    }
  };

  const handleShare = async () => {
    sound.playClick();
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `404 Braincell Mood: ${mood.name}`,
          text: isIndonesian
            ? `Aku terdiagnosa sebagai "${mood.name}" di 404 Braincell!`
            : `I got diagnosed as "${mood.name}" on 404 Braincell!`,
          url: shareUrl,
        });
        showToast(isIndonesian ? '🚀 Mood berhasil dibagikan!' : '🚀 Mood shared!', 'success');
        return;
      } catch {
        // cancelled
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      showToast(isIndonesian ? '🔗 Link berhasil disalin!' : '🔗 Link copied to clipboard!', 'success', 2000);
    } catch {
      showToast(isIndonesian ? '⚠️ Gagal nyalin link share' : '⚠️ Could not copy share link', 'warning');
    }
  };

  return (
    <motion.div
      key={mood.id}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.2 }}
      className="w-full max-w-md bg-white rounded-3xl border-3 border-[#171717] brutalist-shadow-lg p-6 sm:p-7 flex flex-col relative"
    >
      <div className="flex items-center justify-between gap-2 mb-5">
        <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 bg-[#171717] text-white rounded border border-[#171717]">
          {mood.badge}
        </span>
        <span className="text-[10px] font-mono font-bold text-neutral-600 bg-[#F7F3E8] px-2 py-0.5 rounded border border-[#171717]">
          {isIndonesian ? 'NEURON' : 'NEURONS'}: {mood.braincellCount}
        </span>
      </div>

      <div className="flex flex-col items-center text-center mb-5">
        <div
          className="w-20 h-20 rounded-2xl border-2 border-[#171717] brutalist-shadow flex items-center justify-center text-4xl mb-3 select-none"
          style={{ backgroundColor: mood.themeColor }}
        >
          {mood.emoji}
        </div>
        <h2 className="text-2xl font-black text-[#171717] tracking-tight">{mood.name}</h2>
        <p className="text-xs font-mono font-bold text-[#7957FF] mt-0.5 uppercase">{mood.subtitle}</p>
      </div>

      <div className="p-3.5 rounded-xl bg-[#F7F3E8] border border-[#171717] mb-5">
        <p className="text-xs sm:text-sm text-neutral-800 font-medium leading-relaxed italic text-center">
          &ldquo;{mood.description}&rdquo;
        </p>
      </div>

      <div className="space-y-2.5 mb-5 font-mono text-xs font-bold text-[#171717]">
        <div>
          <div className="flex justify-between mb-1">
            <span className="flex items-center gap-1"><Flame className="w-3.5 h-3.5 text-[#FF5C35]" /> CHAOS</span>
            <span>{mood.chaosLevel}%</span>
          </div>
          <div className="w-full h-2.5 bg-neutral-200 rounded-full border border-[#171717] overflow-hidden">
            <div className="h-full bg-[#FF5C35] transition-all duration-500" style={{ width: `${mood.chaosLevel}%` }} />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-[#7957FF]" /> {isIndonesian ? 'ENERGI' : 'ENERGY'}</span>
            <span>{mood.energyLevel}%</span>
          </div>
          <div className="w-full h-2.5 bg-neutral-200 rounded-full border border-[#171717] overflow-hidden">
            <div className="h-full bg-[#7957FF] transition-all duration-500" style={{ width: `${mood.energyLevel}%` }} />
          </div>
        </div>
      </div>

      <div className="mb-5 p-2.5 rounded-xl border border-dashed border-[#171717] bg-[#FFFDF9]">
        <div className="text-[9px] font-mono font-bold uppercase text-[#FF5C35] mb-0.5">{isIndonesian ? 'RESEP:' : 'PRESCRIPTION:'}</div>
        <div className="text-xs font-semibold text-neutral-700">{mood.prescription}</div>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-200">
        <button
          type="button"
          onClick={handleCopy}
          className="py-2 px-3 bg-white hover:bg-[#F7F3E8] text-[#171717] font-mono text-xs font-bold rounded-xl border-2 border-[#171717] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? (isIndonesian ? 'Tersalin!' : 'Copied!') : (isIndonesian ? 'Salin Ringkasan' : 'Copy Summary')}</span>
        </button>
        <button
          type="button"
          onClick={handleShare}
          className="py-2 px-3 bg-[#D7FF64] hover:bg-[#c9f64a] text-[#171717] font-mono text-xs font-bold rounded-xl border-2 border-[#171717] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>{isIndonesian ? 'Bagikan Link' : 'Share Link'}</span>
        </button>
      </div>
    </motion.div>
  );
}
