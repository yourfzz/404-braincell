export const STORAGE_KEYS = {
  BUTTON_CLICKS: '404-braincell-button-clicks',
  BUTTON_HIGHSCORE: '404-braincell-button-highscore',
  ACHIEVEMENTS: '404-braincell-achievements',
  SOUND_MUTED: '404-braincell-sound-muted',
  MOODS_VIEWED: '404-braincell-moods-viewed',
  EXCUSES_GENERATED: '404-braincell-excuses-generated',
  LOGO_CLICKS: '404-braincell-logo-clicks',
  LANGUAGE: '404-braincell-language',
} as const;

export function safeGetStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = window.localStorage.getItem(key);
    if (item === null) return fallback;
    return JSON.parse(item) as T;
  } catch {
    return fallback;
  }
}

export function safeSetStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // quota exceeded or privacy sandbox mode
  }
}
export function getStoredButtonClicks(): number {
  return safeGetStorage<number>(STORAGE_KEYS.BUTTON_CLICKS, 0);
}

export function incrementButtonClicks(): number {
  const current = getStoredButtonClicks();
  const next = current + 1;
  safeSetStorage(STORAGE_KEYS.BUTTON_CLICKS, next);
  const highscore = safeGetStorage<number>(STORAGE_KEYS.BUTTON_HIGHSCORE, 0);
  if (next > highscore) {
    safeSetStorage(STORAGE_KEYS.BUTTON_HIGHSCORE, next);
  }
  return next;
}

export function setStoredButtonClicks(count: number): void {
  safeSetStorage(STORAGE_KEYS.BUTTON_CLICKS, count);
}


export function unlockAchievement(achievementId: string): boolean {
  if (typeof window === 'undefined') return false;
  const existing = safeGetStorage<string[]>(STORAGE_KEYS.ACHIEVEMENTS, []);
  if (!existing.includes(achievementId)) {
    const updated = [...existing, achievementId];
    safeSetStorage(STORAGE_KEYS.ACHIEVEMENTS, updated);
    return true; // Newly unlocked
  }
  return false; // Already unlocked
}

export function getUnlockedAchievements(): string[] {
  return safeGetStorage<string[]>(STORAGE_KEYS.ACHIEVEMENTS, []);
}

export function resetAllData(): void {
  if (typeof window === 'undefined') return;
  try {
    Object.values(STORAGE_KEYS).forEach((k) => {
      window.localStorage.removeItem(k);
    });
  } catch {
    // ignore
  }
}
