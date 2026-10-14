"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Shuffle, ArrowDown, Zap, AlertTriangle } from "lucide-react";

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

    document.getElementById("experiences")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const stickers = [
    {
      label: "100% Unproductive",
      icon: <Zap className="h-3.5 w-3.5 shrink-0 fill-current" />,
      text: isIndonesian ? "100% TIDAK PRODUKTIF" : "100% UNPRODUCTIVE",
      className: "bg-[#D7FF64] text-[#171717]",
      rotation: -2,
    },
    {
      label: "Single Neuron Mode",
      icon: <span aria-hidden="true">🧠</span>,
      text: isIndonesian ? "MODE SATU NEURON" : "SINGLE NEURON MODE",
      className: "bg-[#FF5C35] text-white",
      rotation: 2,
    },
    {
      label: "Zero KPIs Allowed",
      icon: <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-[#FF5C35]" />,
      text: isIndonesian ? "KPI DILARANG MASUK" : "ZERO KPIS ALLOWED",
      className: "bg-white text-[#171717]",
      rotation: -1,
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-retro-grid px-0 pb-14 pt-10 sm:pb-20 sm:pt-14 md:pb-24 md:pt-20">
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-4 text-center sm:px-6">
        {/* Floating badges */}
        <div className="mb-7 flex max-w-3xl flex-wrap items-center justify-center gap-2 sm:mb-8 sm:gap-2.5">
          {stickers.map((sticker) => (
            <motion.button
              key={sticker.label}
              type="button"
              whileHover={{
                scale: 1.05,
                rotate: sticker.rotation,
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                handleStickerClick(
                  sticker.label,
                  sticker.label === "Zero KPIs Allowed"
                    ? "🛑"
                    : sticker.label === "Single Neuron Mode"
                      ? "🧠"
                      : "⚡",
                )
              }
              className={`flex min-h-8 items-center justify-center gap-1.5 rounded-full border-2 border-[#171717] px-2.5 py-1.5 font-mono text-[9px] font-bold leading-tight brutalist-shadow-sm xs:text-[10px] sm:px-3 sm:text-xs ${sticker.className}`}
            >
              {sticker.icon}
              <span>{sticker.text}</span>
            </motion.button>
          ))}
        </div>

        {/* Main title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-4xl"
        >
          <h1 className="mb-5 text-[clamp(2rem,8.5vw,5rem)] font-black uppercase leading-[1.08] tracking-tight text-[#171717] sm:mb-6 sm:text-6xl md:text-7xl">
            {isIndonesian ? "OTAKMU CAPEK." : "YOUR BRAIN CALLED."}

            <span className="mt-3 block">
              <span className="inline-block max-w-full rounded-xl border-2 border-[#171717] bg-[#7957FF] px-2.5 py-2 text-white shadow-[3px_3px_0px_0px_#171717] sm:px-4 sm:py-2.5 sm:shadow-[5px_5px_0px_0px_#171717]">
                <span className="text-[0.76em] sm:text-[0.9em]">
                  {isIndonesian ? "DIA BUTUH ISTIRAHAT." : "IT NEEDS A BREAK."}
                </span>
              </span>
            </span>
          </h1>

          <p className="mx-auto mb-8 max-w-2xl px-1 text-sm font-medium leading-relaxed text-neutral-800 sm:mb-10 sm:px-0 sm:text-base md:text-xl">
            {isIndonesian
              ? "Selamat datang di pojok internet paling tidak produktif. Pencet-pencet. Generate hal absurd. Braincell aman, vibes kacau."
              : "Welcome to the internet's least productive corner. Press things. Generate nonsense. Lose approximately zero brain cells."}
          </p>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex w-full max-w-md flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-4"
        >
          <button
            type="button"
            onClick={scrollToExperiences}
            className="flex min-h-12 w-full items-center justify-center gap-2.5 rounded-2xl bg-[#FF5C35] px-5 py-3.5 text-base font-black text-white transition-transform hover:-translate-y-0.5 active:translate-y-0 sm:w-auto sm:px-7 sm:py-4 sm:text-lg brutalist-button"
          >
            <span>{isIndonesian ? "Masuk Arena" : "Enter the Playground"}</span>
            <ArrowDown className="h-5 w-5 shrink-0 stroke-[2.5]" />
          </button>

          <button
            type="button"
            onClick={handleSurpriseMe}
            className="flex min-h-12 w-full items-center justify-center gap-2.5 rounded-2xl bg-[#D7FF64] px-5 py-3.5 text-base font-black text-[#171717] transition-transform hover:-translate-y-0.5 active:translate-y-0 sm:w-auto sm:px-7 sm:py-4 sm:text-lg brutalist-button"
          >
            <Shuffle className="h-5 w-5 shrink-0 stroke-[2.5]" />
            <span>{isIndonesian ? "Randomin Aja" : "Surprise Me"}</span>
          </button>
        </motion.div>

        {/* Humorous sub-badge */}
        <div className="mt-7 flex max-w-2xl flex-wrap items-center justify-center gap-x-2 gap-y-2 px-2 font-mono text-[10px] text-neutral-600 sm:mt-8 sm:gap-x-3 sm:text-xs">
          <span>✓ {isIndonesian ? "0 pelacak" : "0 trackers"}</span>

          <span aria-hidden="true">•</span>

          <span>✓ {isIndonesian ? "0 login" : "0 logins"}</span>

          <span aria-hidden="true">•</span>

          <span className="basis-full leading-relaxed sm:basis-auto">
            {isIndonesian
              ? "✓ 100% rebahan tanpa rasa bersalah"
              : "✓ 100% guilt-free procrastination"}
          </span>
        </div>
      </div>
    </section>
  );
}
