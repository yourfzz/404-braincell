'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Shuffle, AlertOctagon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getRandomExperience } from '@/data/experiences';
import { sound } from '@/lib/sound';

export default function NotFound() {
  const router = useRouter();

  const handleSurpriseMe = () => {
    sound.playBoop();
    router.push(getRandomExperience());
  };

  return (
    <div className="flex-1 flex items-center justify-center py-16 px-4 bg-retro-dots">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-xl w-full bg-white rounded-3xl border-2 border-[#171717] brutalist-shadow-lg p-8 sm:p-10 text-center relative overflow-hidden"
      >
        {/* Floating badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FF5C35] text-white font-mono font-bold text-xs rounded-full border border-[#171717] mb-6">
          <AlertOctagon className="w-3.5 h-3.5" />
          <span>FATAL ERROR: NEURON MISFIRE</span>
        </div>

        <div className="text-7xl sm:text-8xl font-black tracking-tight text-[#171717] mb-2 font-mono">
          4<span className="text-[#FF5C35]">0</span>4
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-[#171717] tracking-tight uppercase mb-4">
          BRAIN CELL NOT FOUND
        </h1>

        <p className="text-neutral-700 font-medium text-sm sm:text-base leading-relaxed mb-8">
          You wandered into the cognitive void. Even our last remaining brain cell couldn&apos;t locate this route. It probably took a nap.
        </p>

        {/* Humorous error diagnostics box */}
        <div className="p-4 rounded-xl bg-[#F7F3E8] border border-[#171717] text-left font-mono text-xs text-neutral-800 mb-8 space-y-1">
          <div className="font-bold text-[#FF5C35] mb-1">DIAGNOSTIC TELEMETRY:</div>
          <div>• STATUS: Missing page or misspelled URL</div>
          <div>• RECOVERY PLAN: Return to safety or press random buttons</div>
          <div>• CHANCE OF SALVATION: 99.8%</div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            onClick={() => sound.playClick()}
            className="w-full sm:w-auto px-6 py-3 bg-[#FF5C35] text-white font-black text-sm rounded-xl brutalist-button flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Back to Safety</span>
          </Link>

          <button
            type="button"
            onClick={handleSurpriseMe}
            className="w-full sm:w-auto px-6 py-3 bg-[#D7FF64] text-[#171717] font-black text-sm rounded-xl brutalist-button flex items-center justify-center gap-2"
          >
            <Shuffle className="w-4 h-4" />
            <span>Surprise Me Instead</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
