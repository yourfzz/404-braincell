"use client";

import React from "react";
import { CheckCircle, Lock } from "lucide-react";
import { ACHIEVEMENTS, ACHIEVEMENTS_ID } from "@/data/achievements";
import { useLang } from "@/contexts/LangContext";

interface Props {
  unlockedIds: string[];
  mounted: boolean;
}

export default function AchievementList({ unlockedIds, mounted }: Props) {
  const { isIndonesian } = useLang();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {ACHIEVEMENTS.map((ach) => {
        const isUnlocked = mounted && unlockedIds.includes(ach.id);

        // Gunakan data Indonesia jika bahasa Indonesia aktif.
        // Jika terjemahan tidak tersedia, gunakan data bahasa Inggris.
        const translatedAchievement = ACHIEVEMENTS_ID[ach.id];

        const title =
          isIndonesian && translatedAchievement
            ? translatedAchievement.title
            : ach.title;

        const description =
          isIndonesian && translatedAchievement
            ? translatedAchievement.description
            : ach.description;

        return (
          <div
            key={ach.id}
            className={`p-4 rounded-xl border-2 transition-all ${
              isUnlocked
                ? "bg-[#1E1E24] border-[#D7FF64] shadow-[3px_3px_0px_0px_#D7FF64]"
                : "bg-[#18181B] border-neutral-800 opacity-60"
            }`}
          >
            <div className="flex items-start justify-between gap-2 mb-1">
              <div className="flex items-center gap-2.5">
                <span className="text-xl" role="img" aria-label={title}>
                  {ach.icon}
                </span>

                <div>
                  <h3
                    className={`font-bold text-sm ${
                      isUnlocked ? "text-white" : "text-neutral-400"
                    }`}
                  >
                    {title}
                  </h3>

                  <span className="text-[10px] font-mono text-[#D7FF64] uppercase font-bold">
                    {isUnlocked
                      ? isIndonesian
                        ? "TERBUKA"
                        : "UNLOCKED"
                      : isIndonesian
                        ? "TERKUNCI"
                        : "LOCKED"}
                  </span>
                </div>
              </div>

              {isUnlocked ? (
                <CheckCircle className="w-4 h-4 text-[#D7FF64] shrink-0" />
              ) : (
                <Lock className="w-4 h-4 text-neutral-600 shrink-0" />
              )}
            </div>

            <p className="text-xs text-neutral-400 font-medium pl-8">
              {description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
