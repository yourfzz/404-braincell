import { Excuse, ExcuseCategory, ExcuseTone } from '@/types';
import type { AppLanguage } from '@/contexts/LangContext';
import part1 from './excuses-1.json';
import part2 from './excuses-2.json';
import part3 from './excuses-3.json';
import partId from './excuses-id.json';

export const EXCUSES_DATA: Excuse[] = [...part1, ...part2, ...part3] as Excuse[];
export const EXCUSES_DATA_ID: Excuse[] = partId as Excuse[];

export function getExcusesData(lang: AppLanguage = 'en'): Excuse[] {
  return lang === 'id' ? EXCUSES_DATA_ID : EXCUSES_DATA;
}

export function getFilteredExcuses(category: ExcuseCategory, tone: ExcuseTone, lang: AppLanguage = 'en'): Excuse[] {
  const data = getExcusesData(lang);
  const exact = data.filter((e) => e.category === category && e.tone === tone);
  if (exact.length > 0) return exact;

  const catOnly = data.filter((e) => e.category === category);
  if (catOnly.length > 0) return catOnly;

  return data;
}

export function getRandomExcuse(category: ExcuseCategory, tone: ExcuseTone, lastId?: string, lang: AppLanguage = 'en'): Excuse {
  const list = getFilteredExcuses(category, tone, lang);
  const candidates = lastId ? list.filter((e) => e.id !== lastId) : list;
  const pool = candidates.length > 0 ? candidates : list;
  return pool[Math.floor(Math.random() * pool.length)];
}
