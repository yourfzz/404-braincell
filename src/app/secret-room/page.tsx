"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, RotateCcw, Terminal, Zap } from "lucide-react";
import { ACHIEVEMENTS, ACHIEVEMENTS_ID } from "@/data/achievements";
import {
  getUnlockedAchievements,
  unlockAchievement,
  resetAllData,
} from "@/lib/storage";
import { sound } from "@/lib/sound";
import { useToast } from "@/components/ui/ToastContext";
import AchievementList from "@/components/experiences/AchievementList";
import { useLang } from "@/contexts/LangContext";

export default function SecretRoomPage() {
  const { showToast } = useToast();
  const { isIndonesian } = useLang();

  const [unlockedIds, setUnlockedIds] = useState<string[]>([]);
  const [glitching, setGlitching] = useState(false);
  const [mounted, setMounted] = useState(false);

  const t = isIndonesian
    ? {
        escape: "Kabur ke Permukaan",
        classified: "FASILITAS RAHASIA",
        sector: "SEKTOR 0x404",
        title: "LAB OTAK SEL KE-0",
        description:
          "Kamu menemukan ruang rahasia tempat pikiran-pikiran terlupakan pensiun dengan tenang. Di sini ada koleksi pencapaian dan pengaturan anomali milikmu.",
        glitch: "Simulasikan Glitch",
        purge: "Musnahkan Data Lokal",
        achievement: "BRANKAS PENCAPAIAN",
        glitchToast: "⚠️ Glitch matriks berhasil dipicu!",
        purgeToast: "🧹 Data lokal & pencapaian berhasil dibersihkan.",
        return: "Balik ke Playground Normal ↗",
      }
    : {
        escape: "Escape to Surface",
        classified: "CLASSIFIED FACILITY",
        sector: "SECTOR 0x404",
        title: "THE 0TH BRAINCELL LAB",
        description:
          "You discovered the secret chamber where forgotten thoughts retire. Here are your collected trophies and anomalous settings.",
        glitch: "Simulate Glitch",
        purge: "Purge Local Data",
        achievement: "ACHIEVEMENT VAULT",
        glitchToast: "⚠️ Matrix telemetry glitch triggered!",
        purgeToast: "🧹 Local data & achievements purged.",
        return: "Return to Normal Playground ↗",
      };

  useEffect(() => {
    setMounted(true);
    unlockAchievement("found-secret");
    sound.playSuccess();
    setUnlockedIds(getUnlockedAchievements());
  }, []);

  const triggerGlitch = () => {
    sound.playGlitch();
    setGlitching(true);
    showToast(t.glitchToast, "alert", 1500);
    setTimeout(() => setGlitching(false), 500);
  };

  const handleResetData = () => {
    sound.playPop();
    resetAllData();
    setUnlockedIds(["found-secret"]);
    showToast(t.purgeToast, "default", 2000);
  };

  return (
    <div
      className={`min-h-[calc(100vh-140px)] w-full bg-[#121212] text-[#F7F3E8] py-12 px-4 sm:px-6 relative overflow-hidden transition-all duration-300 ${
        glitching ? "invert" : ""
      }`}
    >
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex items-center justify-between gap-3 mb-8">
          <Link
            href="/"
            onClick={() => sound.playClick()}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold px-3 py-1.5 bg-[#171717] text-[#D7FF64] rounded-xl border-2 border-[#D7FF64] hover:bg-[#D7FF64] hover:text-[#171717] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.escape}</span>
          </Link>

          <span className="px-3 py-1 bg-[#FF5C35] text-white font-mono text-xs font-bold rounded-lg border border-black flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5" />
            <span>{t.classified}</span>
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-[#1C1C1E] rounded-3xl border-[3px] border-[#D7FF64] p-6 sm:p-8 mb-8 shadow-[6px_6px_0px_0px_#D7FF64]"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">🕵️</span>
            <span className="text-xs font-mono font-bold px-2 py-0.5 bg-[#7957FF] text-white rounded">
              {t.sector}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-[#D7FF64] uppercase mb-3">
            {t.title}
          </h1>

          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-6 font-medium">
            {t.description}
          </p>

          <div className="flex flex-wrap gap-3 pt-4 border-t border-neutral-800">
            <button
              type="button"
              onClick={triggerGlitch}
              className="px-3.5 py-2 bg-[#D7FF64] text-[#171717] font-mono font-bold text-xs rounded-xl hover:bg-white flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>{t.glitch}</span>
            </button>

            <button
              type="button"
              onClick={handleResetData}
              className="px-3.5 py-2 bg-[#2A2A2E] text-neutral-300 hover:text-white font-mono font-bold text-xs rounded-xl border border-neutral-700 flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t.purge}</span>
            </button>
          </div>
        </motion.div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-black text-white uppercase flex items-center gap-2">
              <span>{t.achievement}</span>
              <span className="text-xs font-mono text-[#D7FF64]">
                ({mounted ? unlockedIds.length : 0}/{ACHIEVEMENTS.length})
              </span>
            </h2>
          </div>

          <AchievementList unlockedIds={unlockedIds} mounted={mounted} />
        </div>

        <div className="text-center py-4">
          <Link
            href="/"
            onClick={() => sound.playClick()}
            className="inline-flex px-6 py-3.5 bg-[#FF5C35] text-white font-black text-sm rounded-xl brutalist-button"
          >
            {t.return}
          </Link>
        </div>
      </div>
    </div>
  );
}
