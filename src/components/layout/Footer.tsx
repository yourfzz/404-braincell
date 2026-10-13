"use client";

import React from "react";
import Link from "next/link";
import { Brain } from "lucide-react";
import { useLang } from "@/contexts/LangContext";

export default function Footer() {
  const [currentYear, setCurrentYear] = React.useState(2026);
  const { isIndonesian } = useLang();

  React.useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="w-full bg-[#171717] text-[#F7F3E8] border-t-2 border-[#171717] mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="flex flex-col gap-2 max-w-md">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#FF5C35] border border-white flex items-center justify-center text-white">
              <Brain className="w-4 h-4" />
            </div>
            <span className="font-black text-xl tracking-tight text-white">
              404 BRAINCELL
            </span>
            <span className="text-xs font-mono px-2 py-0.5 bg-[#7957FF] text-white rounded font-bold">
              v1.0
            </span>
          </div>
          <p className="text-sm text-neutral-400 font-medium leading-relaxed">
            {isIndonesian
              ? "Safe haven buat overthinker yang kerjanya nanti terus. Zero backend, zero cookies, dan dijamin 0% bikin KPI kuartalanmu naik."
              : "A safe haven for overthinkers and underachievers. Zero backend, zero cookies, and guaranteed 0% boost to your quarterly KPIs."}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 md:gap-6 font-bold text-sm">
          <Link
            href="/#experiences"
            className="hover:text-[#D7FF64] transition-colors"
          >
            {isIndonesian ? "Arena" : "Playground"}
          </Link>
          <Link
            href="/about"
            className="hover:text-[#D7FF64] transition-colors"
          >
            Manifesto
          </Link>
          <Link
            href="/play/the-button"
            className="hover:text-[#FF5C35] transition-colors"
          >
            {isIndonesian ? "Tombol Anti-Dipencet" : "The Button"}
          </Link>
          <Link
            href="/play/mood-machine"
            className="hover:text-[#7957FF] transition-colors"
          >
            {isIndonesian ? "Mesin Mood" : "Mood Machine"}
          </Link>
          <Link
            href="/play/excuse-generator"
            className="hover:text-[#D7FF64] transition-colors"
          >
            {isIndonesian ? "Generator Alasan" : "Excuse Generator"}
          </Link>
          <Link
            href="/secret-room"
            className="text-neutral-500 hover:text-neutral-300 font-mono text-xs"
          >
            {isIndonesian ? "[RAHASIA]" : "[Secret]"}
          </Link>
        </div>
      </div>

      <div className="border-t border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 pt-4 flex flex-wrap items-center gap-1.5 text-xs font-mono text-neutral-400">
          <span>
            {isIndonesian
              ? "Dibuat oleh manusia yang seharusnya kerja:"
              : "Built by a human who should be working:"}
          </span>

          <Link
            href="https://www.instagram.com/yourfzz_/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-bold text-[#F7F3E8] hover:text-[#D7FF64] transition-colors"
          >
            Hafidz Alif R.
            <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-start md:items-center justify-start md:justify-between gap-2 text-xs font-mono text-neutral-400">
          <div className="flex items-start gap-1.5">
            <span className="text-base leading-none font-bold mt-0.5">©</span>

            <div className="flex flex-wrap items-center gap-x-1">
              <span>{currentYear} - 404 Braincell.</span>

              <span>
                {isIndonesian
                  ? "Powered by kopi & zero ekspektasi."
                  : "Powered by caffeine & zero expectations."}
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-start gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#D7FF64] animate-pulse mt-1"></span>
            <span>
              {isIndonesian
                ? "Semua sistem jalan di level absurditas normal"
                : "All systems running at nominal absurdity"}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
