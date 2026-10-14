"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Volume2, VolumeX, Shuffle, Menu, X, Brain } from "lucide-react";

import { sound } from "@/lib/sound";
import { getRandomExperience } from "@/data/experiences";
import { useToast } from "@/components/ui/ToastContext";
import { unlockAchievement } from "@/lib/storage";
import { useLang } from "@/contexts/LangContext";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { showToast } = useToast();
  const { lang, isIndonesian, toggleLang } = useLang();

  const [isMuted, setIsMuted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);

  useEffect(() => {
    setIsMuted(sound.getMuted());
  }, []);

  // Tutup menu ketika navigasi berubah.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Tutup menu mobile dengan tombol Escape.
  useEffect(() => {
    if (!menuOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  const toggleSound = () => {
    const next = sound.toggleMute();
    setIsMuted(next);

    if (!next) sound.playBoop(440);
  };

  const handleSurprise = () => {
    sound.playBoop(580);

    const dest = getRandomExperience(pathname);

    showToast(
      isIndonesian
        ? "🎰 Gas random absurdity dulu..."
        : "🎰 Rolling the dice of absurdity...",
      "default",
      2000,
    );

    setMenuOpen(false);
    router.push(dest);
  };

  const onLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const next = logoClicks + 1;

    setLogoClicks(next);
    sound.playBoop(320 + next * 60);

    if (next === 3) {
      showToast(
        isIndonesian
          ? "👀 Logo dipencet terus? 2 klik lagi..."
          : "👀 Poking the logo? 2 more clicks...",
        "default",
        1500,
      );
    } else if (next >= 5) {
      e.preventDefault();
      setLogoClicks(0);

      unlockAchievement("found-secret");

      showToast(
        isIndonesian
          ? "🚨 AKSES DITERIMA: Masuk Secret Room!"
          : "🚨 ACCESS GRANTED: Entering Secret Room!",
        "secret",
        2500,
      );

      setTimeout(() => router.push("/secret-room"), 500);
    }
  };

  const linkBase =
    "flex items-center gap-2 rounded-xl border-2 px-3 py-2 text-sm font-bold transition-all";

  const desktopLink = (href: string) =>
    `${linkBase} ${
      pathname === href
        ? "border-[#171717] bg-[#7957FF] text-white"
        : "border-transparent hover:border-[#171717] hover:bg-white"
    }`;

  const mobileLink = (href: string) =>
    `${linkBase} w-full border-[#171717] ${
      pathname === href ? "bg-[#7957FF] text-white" : "bg-white text-[#171717]"
    }`;

  const navigationLinks = [
    {
      href: "/#experiences",
      label: isIndonesian ? "Arena" : "Playground",
      icon: "🎮",
    },
    {
      href: "/about",
      label: isIndonesian ? "Tentang" : "About",
      icon: "📖",
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b-2 border-[#171717] bg-[#F7F3E8]">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-3 sm:px-4">
        {/* Logo dan Easter egg */}
        <Link
          href="/"
          onClick={onLogoClick}
          aria-label="404 Braincell Home"
          className="flex min-w-0 shrink items-center gap-2 sm:gap-2.5"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border-2 border-[#171717] bg-[#FF5C35] text-white brutalist-shadow-sm">
            <Brain className="h-5 w-5 stroke-[2.5]" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="whitespace-nowrap text-sm font-black tracking-tighter text-[#171717] sm:text-xl">
                404 BRAINCELL
              </span>

              <span className="hidden rounded border border-[#171717] bg-[#D7FF64] px-1 py-0.5 font-mono text-[10px] font-bold leading-none min-[400px]:inline">
                0.1 CELL
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop navigation */}
        <nav
          aria-label={isIndonesian ? "Navigasi utama" : "Main navigation"}
          className="hidden lg:flex shrink-0 items-center gap-1 xl:gap-2"
        >
          {navigationLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={desktopLink(item.href)}
            >
              {item.label}
            </Link>
          ))}

          <button
            type="button"
            onClick={handleSurprise}
            className="flex items-center gap-1.5 rounded-xl bg-[#FF5C35] px-3 py-2 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 brutalist-button"
          >
            <Shuffle className="h-4 w-4 shrink-0" />
            <span>{isIndonesian ? "Randomin" : "Surprise Me"}</span>
          </button>

          <button
            type="button"
            onClick={toggleLang}
            className="flex items-center gap-1 rounded-xl bg-white px-2 py-1.5 font-mono text-xs font-black brutalist-button"
            aria-label={
              isIndonesian ? "Switch to English" : "Ganti ke Bahasa Indonesia"
            }
            title={
              isIndonesian ? "Ganti ke English" : "Switch to Bahasa Indonesia"
            }
          >
            <span
              className={
                lang === "en"
                  ? "rounded bg-[#171717] px-1.5 py-0.5 text-white"
                  : "px-1.5 py-0.5 text-neutral-500"
              }
            >
              EN
            </span>
            <span
              className={
                lang === "id"
                  ? "rounded bg-[#FF5C35] px-1.5 py-0.5 text-white"
                  : "px-1.5 py-0.5 text-neutral-500"
              }
            >
              ID
            </span>
          </button>

          <button
            type="button"
            onClick={toggleSound}
            className="rounded-xl bg-white p-2 brutalist-button"
            aria-label={
              isMuted
                ? isIndonesian
                  ? "Aktifkan suara"
                  : "Enable sound"
                : isIndonesian
                  ? "Matikan suara"
                  : "Mute sound"
            }
            aria-pressed={!isMuted}
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4 text-neutral-400" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </button>
        </nav>

        {/* Mobile and tablet controls */}
        <div className="flex shrink-0 items-center gap-1.5 lg:hidden sm:gap-2">
          <button
            type="button"
            onClick={toggleLang}
            className="flex items-center gap-1 rounded-lg border-2 border-[#171717] bg-white px-2 py-1.5 font-mono text-[10px] font-black"
            aria-label={
              isIndonesian ? "Switch to English" : "Ganti ke Bahasa Indonesia"
            }
            title={isIndonesian ? "Switch to English" : "Ganti ke Indonesia"}
          >
            <span
              className={
                lang === "en"
                  ? "rounded bg-[#171717] px-1 py-0.5 text-white"
                  : "text-neutral-500"
              }
            >
              EN
            </span>
            <span
              className={
                lang === "id"
                  ? "rounded bg-[#FF5C35] px-1 py-0.5 text-white"
                  : "text-neutral-500"
              }
            >
              ID
            </span>
          </button>

          <button
            type="button"
            onClick={toggleSound}
            className="rounded-lg border-2 border-[#171717] bg-white p-1.5"
            aria-label={
              isMuted
                ? isIndonesian
                  ? "Aktifkan suara"
                  : "Enable sound"
                : isIndonesian
                  ? "Matikan suara"
                  : "Mute sound"
            }
            aria-pressed={!isMuted}
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4 text-neutral-400" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="rounded-lg border-2 border-[#171717] bg-[#D7FF64] p-1.5"
            aria-label={
              menuOpen
                ? isIndonesian
                  ? "Tutup menu"
                  : "Close menu"
                : isIndonesian
                  ? "Buka menu"
                  : "Open menu"
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile and tablet dropdown */}
      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label={isIndonesian ? "Navigasi mobile" : "Mobile navigation"}
          className="border-t-2 border-[#171717] bg-[#F7F3E8] p-3 sm:p-4 lg:hidden"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-2">
            {navigationLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={mobileLink(item.href)}
              >
                <span aria-hidden="true">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}

            <button
              type="button"
              onClick={handleSurprise}
              className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#171717] bg-[#FF5C35] px-4 py-3 text-sm font-bold text-white"
            >
              <Shuffle className="h-4 w-4" />
              {isIndonesian ? "Randomin" : "Surprise Me"}
            </button>

            <div className="mt-1 grid grid-cols-2 gap-2 border-t border-neutral-300 pt-3">
              <Link
                href="/play/the-button"
                onClick={() => setMenuOpen(false)}
                className={mobileLink("/play/the-button")}
              >
                {isIndonesian ? "🔴 The Button" : "🔴 The Button"}
              </Link>

              <Link
                href="/play/mood-machine"
                onClick={() => setMenuOpen(false)}
                className={mobileLink("/play/mood-machine")}
              >
                {isIndonesian ? "🌀 Mesin Mood" : "🌀 Mood Machine"}
              </Link>

              <Link
                href="/play/excuse-generator"
                onClick={() => setMenuOpen(false)}
                className={mobileLink("/play/excuse-generator")}
              >
                {isIndonesian ? "📜 Generator Alasan" : "📜 Excuse Generator"}
              </Link>

              <Link
                href="/secret-room"
                onClick={() => setMenuOpen(false)}
                className={`${mobileLink("/secret-room")} font-mono text-xs`}
              >
                {isIndonesian ? "🔒 Secret Room" : "🔒 Secret Room"}
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
