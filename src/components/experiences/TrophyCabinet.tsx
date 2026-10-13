'use client';

import React from 'react';
import { Award } from 'lucide-react';
import { ACHIEVEMENTS } from '@/data/achievements';

interface TrophyCabinetProps {
  unlocked: string[];
  mounted: boolean;
}

export default function TrophyCabinet({ unlocked, mounted }: TrophyCabinetProps) {
  return (
    <div className="w-full max-w-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 font-mono text-sm font-black text-white uppercase">
          <Award className="w-4 h-4 text-[#D7FF64]" />
          <span>TROPHY CABINET ({mounted ? unlocked.length : 0}/{ACHIEVEMENTS.length})</span>
        </div>
        <span className="text-xs font-mono text-neutral-400">Stored in localStorage</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {ACHIEVEMENTS.map((ach) => {
          const isUnlocked = mounted && unlocked.includes(ach.id);
          return (
            <div
              key={ach.id}
              className={`p-3.5 rounded-xl border-2 flex items-start gap-3 transition-colors ${
                isUnlocked
                  ? 'bg-[#1F1F1F] border-[#D7FF64] text-white'
                  : 'bg-[#151515] border-neutral-800 text-neutral-500 opacity-60'
              }`}
            >
              <span className="text-2xl select-none" role="img" aria-label={ach.title}>
                {isUnlocked ? ach.icon : '🔒'}
              </span>
              <div>
                <h4 className="text-xs font-black uppercase text-white">{ach.title}</h4>
                <p className="text-[11px] font-medium mt-0.5 text-neutral-400 leading-tight">
                  {ach.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
