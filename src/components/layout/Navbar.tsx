'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Volume2, VolumeX, Shuffle, Menu, X, Brain } from 'lucide-react';
import { sound } from '@/lib/sound';
import { getRandomExperience } from '@/data/experiences';
import { useToast } from '@/components/ui/ToastContext';
import { unlockAchievement } from '@/lib/storage';
import { useLang } from '@/contexts/LangContext';

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

  const toggleSound = () => {
    const next = sound.toggleMute();
    setIsMuted(next);
    if (!next) sound.playBoop(440);
  };

  const handleSurprise = () => {
    sound.playBoop(580);
    const dest = getRandomExperience(pathname);
    showToast(isIndonesian ? '🎰 Gas random absurdity dulu...' : '🎰 Rolling the dice of absurdity...', 'default', 2000);
    router.push(dest);
    setMenuOpen(false);
  };

  const onLogoClick = (e: React.MouseEvent) => {
    const next = logoClicks + 1;
    setLogoClicks(next);
    sound.playBoop(320 + next * 60);

    if (next === 3) {
      showToast(isIndonesian ? '👀 Logo dipencet terus? 2 klik lagi...' : '👀 Poking the logo? 2 more clicks...', 'default', 1500);
    } else if (next >= 5) {
      e.preventDefault();
      setLogoClicks(0);
      unlockAchievement('found-secret');
      showToast(isIndonesian ? '🚨 AKSES DITERIMA: Masuk Secret Room!' : '🚨 ACCESS GRANTED: Entering Secret Room!', 'secret', 2500);
      setTimeout(() => router.push('/secret-room'), 500);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F7F3E8] border-b-2 border-[#171717]">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          onClick={onLogoClick}
          className="flex items-center gap-2.5 font-black text-xl tracking-tighter text-[#171717]"
        >
          <div className="w-9 h-9 rounded-lg bg-[#FF5C35] border-2 border-[#171717] brutalist-shadow-sm flex items-center justify-center text-white">
            <Brain className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span>404 BRAINCELL</span>
              <span className="text-[10px] font-mono px-1 bg-[#D7FF64] border border-[#171717] rounded font-bold">
                0.1 CELL
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-3">
          <Link
            href="/#experiences"
            className="px-3 py-1.5 font-bold text-sm rounded-lg hover:bg-[#D7FF64] border-2 border-transparent hover:border-[#171717] transition-all"
          >
            {isIndonesian ? 'Arena' : 'Playground'}
          </Link>
          <Link
            href="/about"
            className={`px-3 py-1.5 font-bold text-sm rounded-lg border-2 transition-all ${
              pathname === '/about' ? 'border-[#171717] bg-[#7957FF] text-white' : 'border-transparent hover:border-[#171717] hover:bg-white'
            }`}
          >
            {isIndonesian ? 'Tentang' : 'About'}
          </Link>
          <button
            type="button"
            onClick={handleSurprise}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FF5C35] text-white font-bold text-sm rounded-xl brutalist-button"
          >
            <Shuffle className="w-4 h-4" />
            <span>{isIndonesian ? 'Randomin' : 'Surprise Me'}</span>
          </button>
          <button
            type="button"
            onClick={toggleLang}
            className="px-2 py-1 rounded-xl bg-white brutalist-button font-mono text-xs font-black flex items-center gap-1"
            aria-label="Toggle language"
            title={isIndonesian ? 'Ganti ke English' : 'Switch to Bahasa Indonesia'}
          >
            <span className={lang === 'en' ? 'px-1.5 py-0.5 rounded bg-[#171717] text-white' : 'px-1.5 py-0.5 text-neutral-500'}>EN</span>
            <span className={lang === 'id' ? 'px-1.5 py-0.5 rounded bg-[#FF5C35] text-white' : 'px-1.5 py-0.5 text-neutral-500'}>ID</span>
          </button>
          <button
            type="button"
            onClick={toggleSound}
            className="p-2 rounded-xl bg-white brutalist-button"
            aria-label="Toggle sound"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-neutral-400" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </nav>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={toggleLang}
            className="px-2 py-1.5 rounded-lg bg-white border-2 border-[#171717] font-mono text-[10px] font-black"
            aria-label="Toggle language"
          >
            {lang === 'id' ? 'ID ✓' : 'ID'}
          </button>
          <button
            type="button"
            onClick={toggleSound}
            className="p-1.5 rounded-lg bg-white border-2 border-[#171717]"
            aria-label="Toggle sound"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-neutral-400" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1.5 rounded-lg bg-[#D7FF64] border-2 border-[#171717]"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t-2 border-[#171717] bg-[#F7F3E8] p-4 flex flex-col gap-2">
          <Link
            href="/#experiences"
            onClick={() => setMenuOpen(false)}
            className="px-4 py-2 bg-white font-bold text-sm rounded-xl border-2 border-[#171717]"
          >
            🎮 {isIndonesian ? 'Arena' : 'Playground'}
          </Link>
          <Link
            href="/about"
            onClick={() => setMenuOpen(false)}
            className="px-4 py-2 bg-white font-bold text-sm rounded-xl border-2 border-[#171717]"
          >
            📖 {isIndonesian ? 'Tentang' : 'About'}
          </Link>
          <button
            type="button"
            onClick={handleSurprise}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-[#FF5C35] text-white font-bold text-sm rounded-xl border-2 border-[#171717]"
          >
            <Shuffle className="w-4 h-4" />
            <span>{isIndonesian ? 'Randomin' : 'Surprise Me'}</span>
          </button>
        </div>
      )}
    </header>
  );
}

