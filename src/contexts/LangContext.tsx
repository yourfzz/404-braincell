"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { safeGetStorage, safeSetStorage, STORAGE_KEYS } from "@/lib/storage";
import { sound } from "@/lib/sound";

export type AppLanguage = "en" | "id";

interface LangContextValue {
  lang: AppLanguage;
  isIndonesian: boolean;
  setLang: (lang: AppLanguage) => void;
  toggleLang: () => void;
}

const LangContext = createContext<LangContextValue | undefined>(undefined);

function normalizeLang(value: unknown): AppLanguage {
  return value === "en" ? "en" : "id";
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<AppLanguage>("id");

  useEffect(() => {
    setLangState(
      normalizeLang(safeGetStorage<AppLanguage>(STORAGE_KEYS.LANGUAGE, "id")),
    );
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((nextLang: AppLanguage) => {
    const normalized = normalizeLang(nextLang);
    setLangState(normalized);
    safeSetStorage(STORAGE_KEYS.LANGUAGE, normalized);
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((currentLang) => {
      const nextLang = currentLang === "en" ? "id" : "en";
      sound.playBoop(nextLang === "id" ? 520 : 420);
      safeSetStorage(STORAGE_KEYS.LANGUAGE, nextLang);
      return nextLang;
    });
  }, []);

  const value = useMemo(
    () => ({
      lang,
      isIndonesian: lang === "id",
      setLang,
      toggleLang,
    }),
    [lang, setLang, toggleLang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const context = useContext(LangContext);

  if (!context) {
    throw new Error("useLang must be used within a LangProvider");
  }

  return context;
}
