'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Copy, Check, MessageSquareQuote } from 'lucide-react';
import { Excuse } from '@/types';
import { sound } from '@/lib/sound';
import { useToast } from '@/components/ui/ToastContext';
import { useLang } from '@/contexts/LangContext';

interface ExcuseCardProps {
  excuse: Excuse;
  category: string;
  tone: string;
  onReroll: () => void;
}

export default function ExcuseCard({ excuse, category, tone, onReroll }: ExcuseCardProps) {
  const { showToast } = useToast();
  const { isIndonesian } = useLang();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    sound.playSuccess();
    try {
      await navigator.clipboard.writeText(`"${excuse.text}" — ${isIndonesian ? 'Vonis' : 'Verdict'}: ${excuse.verdict}`);
      setCopied(true);
      showToast(isIndonesian ? '📋 Alasan berhasil disalin!' : '📋 Excuse copied to clipboard!', 'success', 2000);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast(isIndonesian ? '⚠️ Gagal nyalin alasan' : '⚠️ Could not copy excuse', 'warning');
    }
  };

  return (
    <motion.div
      key={excuse.id}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-3xl border-3 border-[#171717] brutalist-shadow-lg p-6 sm:p-7 relative"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 bg-[#D7FF64] text-[#171717] rounded border border-[#171717]">
          {category} • {tone}
        </span>
        <MessageSquareQuote className="w-5 h-5 text-neutral-400" />
      </div>

      <blockquote className="text-lg sm:text-xl font-bold text-[#171717] leading-relaxed mb-6 font-mono">
        &ldquo;{excuse.text}&rdquo;
      </blockquote>

      <div className="p-3 bg-[#F7F3E8] rounded-xl border border-[#171717] flex items-center justify-between gap-2 mb-6 text-xs font-mono">
        <span className="text-neutral-600 font-bold">{isIndonesian ? 'VONIS:' : 'VERDICT:'}</span>
        <span className="text-[#FF5C35] font-black">{excuse.verdict}</span>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-neutral-200">
        <button
          type="button"
          onClick={onReroll}
          className="py-2.5 px-4 bg-[#FF5C35] hover:bg-[#e04a25] text-white font-black text-xs sm:text-sm rounded-xl brutalist-button flex items-center justify-center gap-2 cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          <span>{isIndonesian ? 'Gacha Lagi' : 'Reroll'}</span>
        </button>
        <button
          type="button"
          onClick={handleCopy}
          className="py-2.5 px-4 bg-[#D7FF64] hover:bg-[#c9f64a] text-[#171717] font-black text-xs sm:text-sm rounded-xl brutalist-button flex items-center justify-center gap-2 cursor-pointer"
        >
          {copied ? <Check className="w-4 h-4 text-green-700" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? (isIndonesian ? 'Tersalin!' : 'Copied!') : (isIndonesian ? 'Salin' : 'Copy')}</span>
        </button>
      </div>
    </motion.div>
  );
}
