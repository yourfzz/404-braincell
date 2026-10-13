'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sound } from '@/lib/sound';
import { useToast } from '@/components/ui/ToastContext';
import { Sparkles, RefreshCw } from 'lucide-react';
import { useLang } from '@/contexts/LangContext';

export default function InteractiveSandbox() {
  const [pokes, setPokes] = useState(0);
  const [pulse, setPulse] = useState(false);
  const { showToast } = useToast();
  const { isIndonesian } = useLang();

  const pokeMessages = isIndonesian ? [
    'Aduh! Geli dikit.',
    'Neuron nyala! Eh false alarm.',
    'Masih sisa tepat satu braincell.',
    'Tolong jangan ganggu kentang mental ini.',
    'Lonjakan dopamine kritis terdeteksi!',
    'Koneksi sinaps: kekuatan 1,2%.',
    'Kamu gigih banget. Respect.',
    'Braincell mengajukan cuti.',
    'Error 418: Braincell berubah jadi teko.',
    'STATUS LEGENDARIS: Poking tanpa batas terbuka!'
  ] : [
    'Ouch! That tickles.',
    'Neuron fired! Wait, false alarm.',
    'Still exactly one brain cell.',
    'Please do not disturb the potato.',
    'Critical dopamine spike detected!',
    'Synapse connection: 1.2% strength.',
    'You are relentless. I respect that.',
    'Braincell has requested paid time off.',
    'Error 418: Braincell is a teapot.',
    'LEGENDARY STATUS: Infinite poking unlocked!'
  ];

  const handlePoke = () => {
    sound.playBoop(400 + Math.min(pokes * 40, 800));
    setPulse(true);
    setTimeout(() => setPulse(false), 200);

    const nextPokes = pokes + 1;
    setPokes(nextPokes);

    const msgIndex = Math.min(nextPokes - 1, pokeMessages.length - 1);
    if (nextPokes % 5 === 0) {
      showToast(`🧠 ${pokeMessages[msgIndex]}`, 'success', 2000);
    }
  };

  const handleReset = () => {
    sound.playPop();
    setPokes(0);
    showToast(isIndonesian ? 'Status neuron di-reset ke mode pasrah pabrik.' : 'Neuron state reset to factory apathy.', 'default', 1500);
  };

  return (
    <section className="w-full py-12 bg-[#EDE8D8] border-t-2 border-[#171717]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl border-2 border-[#171717] brutalist-shadow-lg p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D7FF64] border border-[#171717] rounded-md font-mono text-xs font-bold text-[#171717] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isIndonesian ? 'WIDGET DIAGNOSA LIVE' : 'LIVE DIAGNOSTIC WIDGET'}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#171717] tracking-tight mb-2">
              {isIndonesian ? 'Pos CPR Neuron Terakhir' : 'The Solitary Neuron CPR Station'}
            </h3>
            <p className="text-sm text-neutral-700 font-medium leading-relaxed mb-4">
              {isIndonesian
                ? 'Tap neuron terakhir di bawah. Cek apakah masih ada tanda-tanda kehidupan intelektual.'
                : 'Tap the last surviving neuron below. Test if there is any signs of intellectual life.'}
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4 font-mono text-xs text-neutral-600">
              <span className="font-bold text-[#171717]">{isIndonesian ? 'Pencetan' : 'Pokes'}: <span className="text-[#FF5C35]">{pokes}</span></span>
              <span>•</span>
              <span>{isIndonesian ? 'Respons' : 'Response'}: <span className="text-[#7957FF]">{pokes === 0 ? (isIndonesian ? 'Tidur' : 'Dormant') : pokes < 10 ? (isIndonesian ? 'Kedutan' : 'Twitching') : (isIndonesian ? 'Overclock' : 'Overclocked')}</span></span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <motion.button
              type="button"
              onClick={handlePoke}
              animate={pulse ? { scale: [1, 1.25, 1], rotate: [0, -10, 10, 0] } : {}}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              className="w-28 h-28 rounded-2xl bg-[#FF5C35] text-white border-2 border-[#171717] brutalist-shadow flex flex-col items-center justify-center cursor-pointer select-none"
            >
              <span className="text-4xl mb-1">🧠</span>
              <span className="font-mono text-[10px] font-black uppercase tracking-wider">
                {isIndonesian ? 'PENCET' : 'POKE ME'}
              </span>
            </motion.button>

            {pokes > 0 && (
              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-mono text-neutral-500 hover:text-[#171717] flex items-center gap-1 transition-colors underline"
              >
                <RefreshCw className="w-3 h-3" />
                <span>{isIndonesian ? 'Reset Neuron' : 'Reset Neuron'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
