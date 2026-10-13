export interface Experience {
  id: string;
  slug: string;
  title: string;
  titleId?: string;
  tagline: string;
  taglineId?: string;
  description: string;
  descriptionId?: string;
  badge: string;
  badgeId?: string;
  badgeColor: "primary" | "secondary" | "accent" | "ink";
  icon: string;
  path: string;
  brainDamageRating: string;
  brainDamageRatingId?: string;
  status: "ONLINE" | "CHAOTIC" | "QUESTIONABLE";
}

export type AppLanguage = "en" | "id";

export interface ButtonEvent {
  id: number;
  label: string;
  subtext: string;
  themeColor: string;
  textColor: string;
  rotation: number;
  scale: number;
  toastMessage?: string;
  achievementId?: string;
  spawnSticker?: string;
  soundType?:
    | "click"
    | "boop"
    | "screech"
    | "horn"
    | "party"
    | "glitch"
    | "pop";
}

export interface MoodProfile {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  chaosLevel: number; // 0 - 100
  energyLevel: number; // 0 - 100
  braincellCount: string;
  themeColor: string;
  accentColor: string;
  emoji: string;
  badge: string;
  prescription: string;
  soundEffect?: string;
}

export type ExcuseCategory =
  | "work"
  | "college"
  | "social"
  | "productivity"
  | "random";
export type ExcuseTone = "professional" | "casual" | "dramatic" | "unhinged";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface Excuse {
  id: string;
  category: ExcuseCategory;
  tone: ExcuseTone;
  text: string;
  verdict: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface ToastItem {
  id: string;
  message: string;
  type?: "default" | "success" | "alert" | "secret" | "warning";
  duration?: number;
}
