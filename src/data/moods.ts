import { MoodProfile } from '@/types';
import type { AppLanguage } from '@/contexts/LangContext';
import moodsData from './moods.json';
import moodsIdData from './moods-id.json';

export const MOOD_PROFILES: MoodProfile[] = moodsData as MoodProfile[];
export const MOOD_PROFILES_ID: MoodProfile[] = moodsIdData as MoodProfile[];

export function getMoodProfiles(lang: AppLanguage = 'en'): MoodProfile[] {
  return lang === 'id' ? MOOD_PROFILES_ID : MOOD_PROFILES;
}

export const DEFAULT_MOOD = MOOD_PROFILES[0];

export function getMoodById(id?: string | null, lang: AppLanguage = 'en'): MoodProfile {
  const profiles = getMoodProfiles(lang);
  const fallback = profiles[0] || DEFAULT_MOOD;
  if (!id) return fallback;
  const found = profiles.find((m) => m.id.toLowerCase() === id.toLowerCase());
  return found || fallback;
}

export function getRandomMood(excludeId?: string, lang: AppLanguage = 'en'): MoodProfile {
  const profiles = getMoodProfiles(lang);
  const filtered = excludeId
    ? profiles.filter((m) => m.id !== excludeId)
    : profiles;
  if (filtered.length === 0) return profiles[0] || DEFAULT_MOOD;
  return filtered[Math.floor(Math.random() * filtered.length)];
}
