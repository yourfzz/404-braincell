"use client";

import React from "react";
import { Award } from "lucide-react";
import { ACHIEVEMENTS, ACHIEVEMENTS_ID } from "@/data/achievements";
import { useLang } from "@/contexts/LangContext";

interface TrophyCabinetProps {
  unlocked: string[];
  mounted: boolean;
}

export default function TrophyCabinet({
  unlocked,
  mounted,
}: TrophyCabinetProps) {
  const { isIndonesian } = useLang();

  const t = isIndonesian
    ? {
        title: "LEMARI TROFI",
        stored: "Tersimpan di localStorage",
        unlocked: "TERBUKA",
        locked: "TERKUNCI",
      }
    : {
        title: "TROPHY CABINET",
        stored: "Stored in localStorage",
        unlocked: "UNLOCKED",
        locked: "LOCKED",
      };

  return (
    <div className="w-full max-w-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <div className="flex items-center gap-2 font-mono text-sm font-black text-white uppercase">
          <Award className="w-4 h-4 shrink-0 text-[#D7FF64]" />

          <span>
            {t.title} ({mounted ? unlocked.length : 0}/{ACHIEVEMENTS.length})
          </span>
        </div>

        <span className="text-xs font-mono text-neutral-400">{t.stored}</span>
      </div>

      {/* Achievement List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {ACHIEVEMENTS.map((ach) => {
          const isUnlocked = mounted && unlocked.includes(ach.id);
          const localized = ACHIEVEMENTS_ID[ach.id];

          const title = isIndonesian && localized ? localized.title : ach.title;

          const description =
            isIndonesian && localized ? localized.description : ach.description;

          return (
            <div
              key={ach.id}
              className={`p-3.5 rounded-xl border-2 flex items-start gap-3 transition-colors ${
                isUnlocked
                  ? "bg-[#1F1F1F] border-[#D7FF64] text-white"
                  : "bg-[#151515] border-neutral-800 text-neutral-500 opacity-60"
              }`}
            >
              <span
                className="text-2xl select-none shrink-0"
                role="img"
                aria-label={title}
              >
                {isUnlocked ? ach.icon : "🔒"}
              </span>

              <div className="min-w-0">
                <h4 className="text-xs font-black uppercase text-white">
                  {title}
                </h4>

                <p className="text-[11px] font-medium mt-0.5 text-neutral-400 leading-tight">
                  {description}
                </p>

                <span
                  className={`inline-block mt-2 text-[9px] font-mono font-bold tracking-wider ${
                    isUnlocked ? "text-[#D7FF64]" : "text-neutral-500"
                  }`}
                >
                  {isUnlocked ? t.unlocked : t.locked}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
