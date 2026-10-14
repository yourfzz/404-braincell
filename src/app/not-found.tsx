"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Shuffle, AlertOctagon } from "lucide-react";
import { useRouter } from "next/navigation";
import { getRandomExperience } from "@/data/experiences";
import { sound } from "@/lib/sound";
import { useLang } from "@/contexts/LangContext";

export default function NotFound() {
  const router = useRouter();
  const { isIndonesian } = useLang();

  const t = isIndonesian
    ? {
        badge: "ERROR FATAL: NEURON KONSLET",
        title: "SEL OTAK TIDAK DITEMUKAN",
        description:
          "Kamu tersesat di kehampaan kognitif. Bahkan satu-satunya sel otak kami gagal menemukan halaman ini. Mungkin dia sedang tidur siang.",
        diagnostic: "TELEMETRI DIAGNOSTIK:",
        status: "STATUS: Halaman hilang atau URL salah ketik",
        recovery: "CARA FIX: Kembali ke tempat aman atau pencet tombol random",
        salvation: "PELUANG KESELAMATAN: 99,8%",
        home: "Kembali ke Tempat Aman",
        surprise: "Kasih Kejutan Aja",
      }
    : {
        badge: "FATAL ERROR: NEURON MISFIRE",
        title: "BRAIN CELL NOT FOUND",
        description:
          "You wandered into the cognitive void. Even our last remaining brain cell couldn’t locate this route. It probably took a nap.",
        diagnostic: "DIAGNOSTIC TELEMETRY:",
        status: "STATUS: Missing page or misspelled URL",
        recovery: "RECOVERY PLAN: Return to safety or press random buttons",
        salvation: "CHANCE OF SALVATION: 99.8%",
        home: "Back to Safety",
        surprise: "Surprise Me Instead",
      };

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
        className="max-w-xl w-full bg-white rounded-3xl border-2 border-[#171717] brutalist-shadow-lg p-6 sm:p-10 text-center relative overflow-hidden"
      >
        {/* Floating Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FF5C35] text-white font-mono font-bold text-xs rounded-full border border-[#171717] mb-6">
          <AlertOctagon className="w-3.5 h-3.5 shrink-0" />
          <span>{t.badge}</span>
        </div>

        {/* Error Code */}
        <div className="text-7xl sm:text-8xl font-black tracking-tight text-[#171717] mb-2 font-mono">
          4<span className="text-[#FF5C35]">0</span>4
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-black text-[#171717] tracking-tight uppercase mb-4">
          {t.title}
        </h1>

        {/* Description */}
        <p className="text-neutral-700 font-medium text-sm sm:text-base leading-relaxed mb-8">
          {t.description}
        </p>

        {/* Error Diagnostics */}
        <div className="p-4 rounded-xl bg-[#F7F3E8] border border-[#171717] text-left font-mono text-xs text-neutral-800 mb-8 space-y-1 break-words">
          <div className="font-bold text-[#FF5C35] mb-2">{t.diagnostic}</div>
          <div>• {t.status}</div>
          <div>• {t.recovery}</div>
          <div>• {t.salvation}</div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            onClick={() => sound.playClick()}
            className="w-full sm:w-auto px-6 py-3 bg-[#FF5C35] text-white font-black text-sm rounded-xl brutalist-button flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4 shrink-0" />
            <span>{t.home}</span>
          </Link>

          <button
            type="button"
            onClick={handleSurpriseMe}
            className="w-full sm:w-auto px-6 py-3 bg-[#D7FF64] text-[#171717] font-black text-sm rounded-xl brutalist-button flex items-center justify-center gap-2"
          >
            <Shuffle className="w-4 h-4 shrink-0" />
            <span>{t.surprise}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
