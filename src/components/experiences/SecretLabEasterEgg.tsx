"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, LockKeyhole, X } from "lucide-react";
import { sound } from "@/lib/sound";
import { useLang } from "@/contexts/LangContext";

const SECRET_SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export default function SecretLabEasterEgg() {
  const router = useRouter();
  const { isIndonesian } = useLang();

  const [sequence, setSequence] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  const t = isIndonesian
    ? {
        title: "AKSES TERDETEKSI",
        description: "Anomali ditemukan. Masukkan kode akses.",
        placeholder: "MASUKKAN KODE...",
        submit: "BONGKAR RAHASIA",
        error: "AKSES DITOLAK. OTAK ANDA KURANG MEYAKINKAN.",
        hint: "PETUNJUK: 404 + SESUATU YANG ADA DI KEPALA",
      }
    : {
        title: "ACCESS DETECTED",
        description: "Anomaly detected. Enter the access code.",
        placeholder: "ENTER ACCESS CODE...",
        submit: "REVEAL THE SECRET",
        error: "ACCESS DENIED. YOUR BRAIN IS NOT CONVINCING.",
        hint: "HINT: 404 + SOMETHING INSIDE YOUR HEAD",
      };

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setCode("");
    setError(false);
    setSequence([]);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.altKey || event.metaKey) return;

      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;

      setSequence((previous) => {
        const next = [...previous, key].slice(-SECRET_SEQUENCE.length);

        if (
          next.length === SECRET_SEQUENCE.length &&
          next.every((value, index) => value === SECRET_SEQUENCE[index])
        ) {
          setIsOpen(true);
          sound.playSuccess();
          return [];
        }

        return next;
      });

      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (code.trim().toUpperCase() === "404BRAIN") {
      sound.playSuccess();
      setIsOpen(false);
      router.push("/secret-lab");
      return;
    }

    sound.playGlitch();
    setError(true);
    setCode("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            className="w-full max-w-md rounded-2xl border-2 border-[#D7FF64] bg-[#171717] p-6 text-[#F7F3E8] shadow-[6px_6px_0px_0px_#7957FF]"
          >
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#D7FF64]">
                <Terminal className="h-5 w-5" />
                <span className="font-mono text-xs font-black tracking-widest">
                  404://SECRET-LAB
                </span>
              </div>

              <button
                type="button"
                onClick={closeModal}
                aria-label="Close secret terminal"
                className="rounded-lg p-1 text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-[#7957FF]/20 p-3 text-[#D7FF64]">
                <LockKeyhole className="h-6 w-6" />
              </div>

              <div>
                <h2 className="font-black uppercase tracking-wide">
                  {t.title}
                </h2>
                <p className="mt-1 text-xs text-neutral-400">{t.description}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <label
                htmlFor="secret-code"
                className="mb-2 block font-mono text-[10px] font-bold tracking-widest text-neutral-400"
              >
                ACCESS_KEY
              </label>

              <input
                id="secret-code"
                autoFocus
                autoComplete="off"
                spellCheck={false}
                value={code}
                onChange={(event) => {
                  setCode(event.target.value);
                  setError(false);
                }}
                placeholder={t.placeholder}
                className="w-full rounded-xl border border-neutral-700 bg-black px-4 py-3 font-mono text-sm uppercase text-[#D7FF64] outline-none placeholder:text-neutral-600 focus:border-[#D7FF64]"
              />

              {error && (
                <p
                  role="alert"
                  className="mt-2 text-xs font-bold text-[#FF5C35]"
                >
                  {t.error}
                </p>
              )}

              <button
                type="submit"
                className="mt-4 w-full rounded-xl bg-[#D7FF64] px-4 py-3 font-mono text-xs font-black text-[#171717] transition-colors hover:bg-white"
              >
                {t.submit}
              </button>

              <p className="mt-4 text-center font-mono text-[10px] text-neutral-500">
                {t.hint}
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
