"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Terminal, Zap } from "lucide-react";
import { getUnlockedAchievements, unlockAchievement } from "@/lib/storage";
import { sound } from "@/lib/sound";
import { useToast } from "@/components/ui/ToastContext";
import { useLang } from "@/contexts/LangContext";
import TrophyCabinet from "./TrophyCabinet";

export default function SecretRoomExperience() {
  const { showToast } = useToast();
  const { isIndonesian } = useLang();

  const [unlocked, setUnlocked] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(12);
  const [secretRevealed, setSecretRevealed] = useState(false);

  const t = isIndonesian
    ? {
        back: "Kembali ke Dunia Nyata",
        vault: "BRANKAS_RAHASIA.EXE",
        access: "AKSES TERBATAS",
        titleStart: "KAMU MENEMUKAN",
        titleHighlight: "LAB RAHASIA",
        description:
          "Kamu seharusnya tidak menemukan tempat ini. Tidak ada deadline, tidak ada KPI, dan tidak ada pertanggungjawaban.",
        chamber: "RUANG OVERCLOCKING NEURON",
        status: "STATUS",
        maximal: "MAKSIMAL",
        charging: "MENGISI DAYA",
        charge: "DAYA SEL OTAK",
        zap: "Setrum Sel Otak (+11%)",
        hideLore: "Sembunyikan Lore",
        revealLore: "Dekripsi Lore Rahasia",
        archive: "LOG ARSIP 404:",
        lore: "Pada tahun 2026, umat manusia menyadari bahwa berpura-pura produktif membutuhkan lebih banyak energi daripada benar-benar produktif. Maka, 404 Braincell diciptakan.",
        charged: "⚡ OVERCLOCK SEL OTAK MAKSIMUM TERCAPAI!",
        chargingToast: (level: number) => `🔋 Mengisi daya neuron: ${level}%`,
      }
    : {
        back: "Return to Daylight",
        vault: "SECRET_VAULT.EXE",
        access: "RESTRICTED ACCESS",
        titleStart: "YOU DISCOVERED THE",
        titleHighlight: "SECRET LAB",
        description:
          "You weren’t supposed to find this. There are no deadlines here, no KPIs, and zero accountability.",
        chamber: "NEURON OVERCLOCKING CHAMBER",
        status: "STATUS",
        maximal: "MAXIMAL",
        charging: "CHARGING",
        charge: "SINGLE CELL CHARGE",
        zap: "Zap Brain Cell (+11%)",
        hideLore: "Hide Lore",
        revealLore: "Decrypt Secret Lore",
        archive: "ARCHIVE LOG 404:",
        lore: "In 2026, humanity realized pretending to be productive took more energy than actual productivity. Hence, 404 Braincell was created.",
        charged: "⚡ MAXIMUM BRAIN CELL OVERCLOCKED!",
        chargingToast: (level: number) => `🔋 Neuron supercharging: ${level}%`,
      };

  useEffect(() => {
    setMounted(true);
    unlockAchievement("found-secret");
    setUnlocked(getUnlockedAchievements());
  }, []);

  const handleChargeBrain = () => {
    sound.playBoop(320 + batteryLevel * 8);

    const next = Math.min(100, batteryLevel + 11);
    setBatteryLevel(next);

    if (next >= 100) {
      sound.playSuccess();
      unlockAchievement("brain-recharged");
      setUnlocked(getUnlockedAchievements());
      showToast(t.charged, "secret", 3000);
    } else {
      showToast(t.chargingToast(next), "default", 1200);
    }
  };

  const handleToggleLore = () => {
    sound.playGlitch();
    setSecretRevealed((current) => !current);
  };

  return (
    <div className="min-h-[calc(100vh-140px)] w-full bg-[#121212] text-[#F7F3E8] py-10 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        {/* Top Navigation */}
        <div className="w-full flex items-center justify-between gap-3 mb-8">
          <Link
            href="/"
            onClick={() => sound.playClick()}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold px-3 py-1.5 bg-[#171717] text-[#D7FF64] rounded-xl border-2 border-[#D7FF64] brutalist-shadow-sm hover:bg-[#D7FF64] hover:text-[#171717] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span>{t.back}</span>
          </Link>

          <span className="px-3 py-1 bg-[#7957FF] text-white font-mono text-xs font-black rounded-lg border-2 border-white flex items-center gap-1.5 shrink-0">
            <Terminal className="w-3.5 h-3.5" />
            <span>{t.vault}</span>
          </span>
        </div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-10"
        >
          <div className="inline-block px-3 py-1 bg-[#FF5C35] text-white font-mono text-xs font-black rounded-full border border-white mb-3 tracking-widest uppercase">
            {t.access}
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase mb-3">
            {t.titleStart}{" "}
            <span className="text-[#D7FF64]">{t.titleHighlight}</span>
          </h1>

          <p className="text-sm font-medium text-neutral-400 max-w-lg mx-auto leading-relaxed">
            {t.description}
          </p>
        </motion.div>

        {/* Neuron Supercharger Device */}
        <div className="w-full max-w-xl bg-[#1C1C1C] rounded-2xl border-2 border-[#7957FF] p-5 sm:p-6 brutalist-shadow mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 font-mono text-xs font-bold text-[#D7FF64]">
            <span className="flex items-center gap-2">
              <Zap className="w-4 h-4 fill-current shrink-0" />
              {t.chamber}
            </span>

            <span className="text-neutral-400">
              {t.status}: {batteryLevel >= 100 ? t.maximal : t.charging}
            </span>
          </div>

          {/* Battery Level */}
          <div className="mb-6">
            <div className="flex justify-between gap-3 text-xs font-mono font-bold mb-2 text-white">
              <span>{t.charge}</span>
              <span>{batteryLevel}%</span>
            </div>

            <div
              className="w-full h-4 bg-neutral-800 rounded-full border border-white/20 overflow-hidden p-0.5"
              role="progressbar"
              aria-label={t.charge}
              aria-valuenow={batteryLevel}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <motion.div
                animate={{ width: `${batteryLevel}%` }}
                transition={{ duration: 0.3 }}
                className="h-full bg-gradient-to-r from-[#7957FF] via-[#FF5C35] to-[#D7FF64] rounded-full"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={handleChargeBrain}
              disabled={batteryLevel >= 100}
              className="flex-1 py-3 px-4 bg-[#D7FF64] hover:bg-[#bce64c] disabled:opacity-50 disabled:cursor-not-allowed text-[#171717] font-black text-sm rounded-xl border-2 border-white brutalist-button flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-current shrink-0" />
              <span>{t.zap}</span>
            </button>

            <button
              type="button"
              onClick={handleToggleLore}
              className="py-3 px-4 bg-[#2A2A2A] hover:bg-[#333] text-white font-mono text-xs font-bold rounded-xl border border-white/30 flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <span>{secretRevealed ? t.hideLore : t.revealLore}</span>
            </button>
          </div>

          {/* Secret Lore */}
          {secretRevealed && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 rounded-xl bg-black border border-[#D7FF64]/40 font-mono text-xs text-[#D7FF64] leading-relaxed"
            >
              <div className="font-bold mb-2">{t.archive}</div>
              <p>“{t.lore}”</p>
            </motion.div>
          )}
        </div>

        {/* Achievements */}
        <TrophyCabinet unlocked={unlocked} mounted={mounted} />
      </div>
    </div>
  );
}
