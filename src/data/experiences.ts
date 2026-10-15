import { Experience } from "@/types";

export const EXPERIENCES: Experience[] = [
  {
    id: "the-button",
    slug: "the-button",
    title: "The Button",
    titleId: "Tombol Terlarang",
    tagline: "DO NOT PRESS UNDER ANY CIRCUMSTANCES",
    taglineId: "JANGAN DIPENCET DALAM KONDISI APA PUN",
    description:
      "A gigantic red button that begs you not to touch it. Every single press triggers a wildly different, questionable chain of events.",
    descriptionId:
      "Tombol merah gede yang mohon-mohon jangan disentuh. Sekali pencet, hidup langsung cabang ke timeline yang mencurigakan.",
    badge: "FEATURED",
    badgeId: "UNGGULAN",
    badgeColor: "primary",
    icon: "🔴",
    path: "/play/the-button",
    brainDamageRating: "ZERO",
    brainDamageRatingId: "AMAN",
    status: "ONLINE",
  },
  {
    id: "mood-machine",
    slug: "mood-machine",
    title: "Mood Machine",
    titleId: "Mesin Mood",
    tagline: "DIAGNOSE YOUR CURRENT CHAOS LEVEL",
    taglineId: "CEK LEVEL CHAOS HARI INI",
    description:
      'Generate hyper-specific, absurd mental states. From "Sleep-Deprived Strategist" to "WiFi-Dependent Organism". Shareable via URL.',
    descriptionId:
      'Generate kondisi mental absurd super spesifik. Dari "Strategis Kurang Tidur" sampai "Organisme Bergantung WiFi". Bisa dishare via URL.',
    badge: "QUESTIONABLE",
    badgeId: "MENCURIGAKAN",
    badgeColor: "secondary",
    icon: "🔮",
    path: "/play/mood-machine",
    brainDamageRating: "MODERATE",
    brainDamageRatingId: "SEDANG",
    status: "CHAOTIC",
  },
  {
    id: "excuse-generator",
    slug: "excuse-generator",
    title: "Excuse Generator",
    titleId: "Generator Alasan",
    tagline: "HR-COMPLIANT NONSENSE ON DEMAND",
    taglineId: "ALASAN ABSURD TAPI KELIHATAN NIAT",
    description:
      "Generate bulletproof reasons to shirk work, college, or human socialization across four distinct absurdity tones.",
    descriptionId:
      "Generate alasan anti tembus buat kabur dari kerjaan, kuliah, atau sosialisasi manusia dalam empat nada keabsurdan.",
    badge: "PRODUCTIVITY -100%",
    badgeId: "PRODUKTIVITAS -100%",
    badgeColor: "accent",
    icon: "📑",
    path: "/play/excuse-generator",
    brainDamageRating: "EXTREME",
    brainDamageRatingId: "PARAH",
    status: "ONLINE",
  },
  {
    id: "corporate-slavery",
    slug: "corporate-slavery",
    title: "Corporate Slavery",
    titleId: "Budak Korporat",
    tagline: "EXPLORE THE DARK HUMOR OF CORPORATE LIFE",
    taglineId: "JELAJAHI HUMOR GELAP KEHIDUPAN KORPORAT",
    description:
      "Explore the dark humor of corporate life with our satirical experience. Discover the absurdities of office culture, from endless meetings to burnout executives, and laugh at the realities of modern work.",
    descriptionId:
      "Jelajahi humor gelap kehidupan korporat dengan pengalaman satirikal kami. Temukan keabsurdan budaya kantor, dari rapat yang tak berujung hingga eksekutif kelelahan, dan tertawa pada realitas kerja modern.",
    badge: "SATIRE",
    badgeId: "SATIR",
    badgeColor: "accent",
    icon: "💼",
    path: "/play/corporate-slavery",
    brainDamageRating: "MODERATE",
    brainDamageRatingId: "SEDANG",
    status: "ONLINE",
  },
  {
    id: "braincell-diagnostic",
    slug: "braincell-diagnostic",
    title: "Braincell Diagnostic",
    titleId: "Diagnostik Sel Otak",
    tagline: "DISCOVER YOUR UNIQUE BRAINCELL PROFILE",
    taglineId: "TEMUKAN PROFIL SEL OTAK UNIKMU",
    description:
      "Discover your unique braincell profile with our interactive diagnostic tool. Uncover the quirks and characteristics that make you distinctly you.",
    descriptionId:
      "Temukan profil sel otak unikmu dengan alat diagnostik interaktif kami. Ungkap keunikan dan karakteristik yang membuatmu berbeda.",
    badge: "SMARTY PANTS",
    badgeId: "SOK TAU",
    badgeColor: "primary",
    icon: "🧠",
    path: "/play/braincell-diagnostic",
    brainDamageRating: "LOW",
    brainDamageRatingId: "RENDAH",
    status: "ONLINE",
  },
  {
    id: "museum-of-unsent-things",
    slug: "museum-of-unsent-things",
    title: "Unsent Things",
    titleId: "Tak Terkirim",
    tagline: "EXPLORE THE WORLD OF UNSENT MESSAGES",
    taglineId: "JELAJAHI DUNIA PESAN YANG TAK TERKIRIM",
    description:
      "Explore the Museum of Unsent Things, a unique experience that delves into the world of unsent messages, forgotten letters, and unspoken words. Discover the stories behind these unsent communications and reflect on the emotions they carry.",
    descriptionId:
      "Jelajahi Museum Barang Tak Terkirim, pengalaman unik yang menggali dunia pesan yang tidak terkirim, surat lupa, dan kata-kata yang tidak diucapkan. Temukan cerita di balik komunikasi tak terkirim ini dan refleksikan emosi yang mereka bawa.",
    badge: "ART",
    badgeId: "ART",
    badgeColor: "accent",
    icon: "🖼️",
    path: "/play/museum-of-unsent-things",
    brainDamageRating: "LOW",
    brainDamageRatingId: "RENDAH",
    status: "ONLINE",
  },
];

export const ALL_PLAY_ROUTES = EXPERIENCES.map((e) => e.path);

export function getRandomExperience(currentPath?: string): string {
  const available = currentPath
    ? ALL_PLAY_ROUTES.filter((p) => p !== currentPath)
    : ALL_PLAY_ROUTES;

  if (available.length === 0) return ALL_PLAY_ROUTES[0];
  const randomIndex = Math.floor(Math.random() * available.length);
  return available[randomIndex];
}
