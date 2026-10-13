"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Flame, Sparkles, Skull, Lock } from "lucide-react";
import { EXPERIENCES } from "@/data/experiences";
import { sound } from "@/lib/sound";
import { useLang } from "@/contexts/LangContext";

export default function ExperienceGrid() {
  const { isIndonesian } = useLang();

  const getBadgeStyle = (color: string) => {
    switch (color) {
      case "primary":
        return "bg-[#FF5C35] text-white";
      case "secondary":
        return "bg-[#7957FF] text-white";
      case "accent":
        return "bg-[#D7FF64] text-[#171717]";
      default:
        return "bg-[#171717] text-white";
    }
  };

  return (
    <section id="experiences" className="w-full py-16 bg-[#F7F3E8] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest px-2 py-0.5 bg-[#FF5C35] text-white rounded">
                {isIndonesian ? "PAKET ABSURD" : "EXPERIENCE SUITE"}
              </span>
              <span className="text-xs font-mono text-neutral-600">
                {isIndonesian ? "3 EKSPERIMEN ONLINE" : "3 EXPERIMENTS ONLINE"}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#171717]">
              {isIndonesian
                ? "PILIH SENJATA PROKRASTINASIMU"
                : "CHOOSE YOUR WEAPON OF PROCRASTINATION"}
            </h2>
          </div>
          <p className="text-sm font-medium text-neutral-600 max-w-xs">
            {isIndonesian
              ? "Setiap eksperimen dibuat untuk membakar 0 kalori dan memberi sekitar 30 detik dopamine halal."
              : "Every experiment is crafted to burn 0 calories and provide approximately 30 seconds of pure joy."}
          </p>
        </div>

        {/* The 3 Core Experience Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {EXPERIENCES.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="flex flex-col bg-white rounded-2xl border-2 border-[#171717] brutalist-shadow-lg p-6 sm:p-7 relative overflow-hidden"
            >
              {/* Card Header & Badges */}
              <div className="flex items-center justify-between gap-2 mb-6">
                <span
                  className={`text-xs font-mono font-black uppercase px-2.5 py-1 rounded-md border border-[#171717] ${getBadgeStyle(exp.badgeColor)}`}
                >
                  {isIndonesian ? (exp.badgeId ?? exp.badge) : exp.badge}
                </span>
                <span className="text-xs font-mono font-bold text-neutral-500 bg-[#F7F3E8] px-2 py-0.5 rounded border border-[#171717]">
                  {isIndonesian ? "RISIKO" : "RISK"}:{" "}
                  {isIndonesian
                    ? (exp.brainDamageRatingId ?? exp.brainDamageRating)
                    : exp.brainDamageRating}
                </span>
              </div>

              {/* Icon & Title */}
              <div className="flex items-center gap-3.5 mb-3">
                <span
                  className="text-4xl select-none"
                  role="img"
                  aria-label={exp.title}
                >
                  {exp.icon}
                </span>
                <div>
                  <h3 className="text-2xl font-black tracking-tight text-[#171717]">
                    {isIndonesian ? (exp.titleId ?? exp.title) : exp.title}
                  </h3>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#7957FF] font-bold">
                    {isIndonesian
                      ? (exp.taglineId ?? exp.tagline)
                      : exp.tagline}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-neutral-700 font-medium leading-relaxed mb-8 flex-1">
                {isIndonesian
                  ? (exp.descriptionId ?? exp.description)
                  : exp.description}
              </p>

              {/* CTA Button */}
              <Link
                href={exp.path}
                onClick={() => sound.playClick()}
                className="w-full py-3.5 px-5 bg-[#171717] text-white hover:bg-[#FF5C35] font-black text-sm rounded-xl border-2 border-[#171717] flex items-center justify-between transition-colors group select-none"
              >
                <span>{isIndonesian ? "Gas Buka" : "Launch Experience"}</span>
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Easter Egg / Secret Room Callout Card */}
        <div className="mt-10 p-6 rounded-2xl border-2 border-dashed border-[#171717] bg-[#FFFDF9] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-[#7957FF] border-2 border-[#171717] text-white flex items-center justify-center text-xl shrink-0">
              🕵️
            </div>
            <div>
              <h4 className="font-black text-base tracking-tight text-[#171717]">
                {isIndonesian
                  ? "Rumor: Ada Ruang Rahasia Terlarang"
                  : "Rumor: A Forbidden Secret Room Exists"}
              </h4>
              <p className="text-xs text-neutral-600 font-medium">
                {isIndonesian
                  ? "Pencet logo atas 5 kali atau spam The Button, katanya bisa buka portal."
                  : "Poking the top logo 5 times or hammering The Button may rip open a portal."}
              </p>
            </div>
          </div>
          <Link
            href="/secret-room"
            onClick={() => sound.playGlitch()}
            className="px-4 py-2 bg-white hover:bg-[#D7FF64] text-[#171717] font-mono text-xs font-bold rounded-lg border-2 border-[#171717] brutalist-shadow-sm whitespace-nowrap"
          >
            {isIndonesian ? "Intip Masuk ↗" : "Sneak Inside ↗"}
          </Link>
        </div>
      </div>
    </section>
  );
}
