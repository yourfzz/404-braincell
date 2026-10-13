"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Shuffle,
  ArrowDown,
  Zap,
  Eye,
  AlertTriangle,
} from "lucide-react";
import { sound } from "@/lib/sound";
import { getRandomExperience } from "@/data/experiences";
import { useToast } from "@/components/ui/ToastContext";
import { useLang } from "@/contexts/LangContext";

export default function HeroSection() {
  const router = useRouter();
  const { showToast } = useToast();
  const { isIndonesian } = useLang();

  const handleSurpriseMe = () => {
    sound.playBoop(600);
    const destination = getRandomExperience();
    showToast(
      isIndonesian
        ? "🎰 Teleport ke absurditas random..."
        : "🎰 Teleporting to random absurdity...",
      "default",
      1800,
    );
    router.push(destination);
  };

  const handleStickerClick = (label: string, icon: string) => {
    sound.playPop();
    showToast(
      isIndonesian
        ? `${icon} Stiker dapet: ${label}!`
        : `${icon} Sticker collected: ${label}!`,
      "success",
      1500,
    );
  };

  const scrollToExperiences = () => {
    sound.playClick();
    const elem = document.getElementById("experiences");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden bg-retro-grid">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
        {/* Floating Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
          <motion.button
            whileHover={{ scale: 1.05, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleStickerClick("100% Unproductive", "⚡")}
            className="px-3 py-1 bg-[#D7FF64] text-[#171717] font-mono font-bold text-xs rounded-full border-2 border-[#171717] brutalist-shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>
              {isIndonesian ? "100% TIDAK PRODUKTIF" : "100% UNPRODUCTIVE"}
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleStickerClick("Single Neuron Mode", "🧠")}
            className="px-3 py-1 bg-[#FF5C35] text-white font-mono font-bold text-xs rounded-full border-2 border-[#171717] brutalist-shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <span>🧠</span>
            <span>
              {isIndonesian ? "MODE SATU NEURON" : "SINGLE NEURON MODE"}
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, rotate: -1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleStickerClick("Zero KPIs Allowed", "🛑")}
            className="px-3 py-1 bg-white text-[#171717] font-mono font-bold text-xs rounded-full border-2 border-[#171717] brutalist-shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-[#FF5C35]" />
            <span>
              {isIndonesian ? "KPI DILARANG MASUK" : "ZERO KPIS ALLOWED"}
            </span>
          </motion.button>
        </div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-4xl"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] text-[#171717] uppercase mb-6">
            {isIndonesian ? "OTAKMU CAPEK." : "YOUR BRAIN CALLED."}
            <br />
            <span className="relative inline-block mt-2">
              <span className="relative z-10 px-3 py-1 bg-[#7957FF] text-white rounded-xl border-2 border-[#171717] brutalist-shadow text-nowrap">
                {isIndonesian ? "DIA BUTUH ISTIRAHAT." : "IT NEEDS A BREAK."}
              </span>
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm md:text-xl font-medium text-neutral-800 leading-relaxed mb-10">
            {isIndonesian
              ? "Selamat datang di pojok internet paling tidak produktif. Pencet-pencet. Generate hal absurd. Braincell aman, vibes kacau."
              : "Welcome to the internet's least productive corner. Press things. Generate nonsense. Lose approximately zero brain cells."}
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <button
            type="button"
            onClick={scrollToExperiences}
            className="w-full sm:w-auto px-8 py-4 bg-[#FF5C35] text-white font-black text-lg rounded-2xl brutalist-button flex items-center justify-center gap-3"
          >
            <span>{isIndonesian ? "Masuk Arena" : "Enter the Playground"}</span>
            <ArrowDown className="w-5 h-5 stroke-[2.5]" />
          </button>

          <button
            type="button"
            onClick={handleSurpriseMe}
            className="w-full sm:w-auto px-8 py-4 bg-[#D7FF64] text-[#171717] font-black text-lg rounded-2xl brutalist-button flex items-center justify-center gap-3"
          >
            <Shuffle className="w-5 h-5 stroke-[2.5]" />
            <span>{isIndonesian ? "Randomin Aja" : "Surprise Me"}</span>
          </button>
        </motion.div>

        {/* Humorous sub-badge */}
        <div className="mt-8 text-xs font-mono text-neutral-600 flex flex-row flex-wrap justify-center items-center gap-2">
          <span>{isIndonesian ? "✓ 0 pelacak" : "✓ 0 trackers"}</span>
          <span>•</span>
          <span>{isIndonesian ? "✓ 0 login" : "✓ 0 logins"}</span>
          <span>•</span>
          <span>
            {isIndonesian
              ? "✓ 100% rebahan tanpa rasa bersalah"
              : "✓ 100% guilt-free procrastination"}
          </span>
        </div>
      </div>
    </section>
  );
}
