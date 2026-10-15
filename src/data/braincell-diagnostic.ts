export type DiagnosticMood =
  | "overthinking"
  | "work"
  | "love"
  | "lost"
  | "random";

export type DiagnosticResult = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  quote: string;
  recommendation: string;
  stats: {
    label: string;
    value: number;
  }[];
  mood: DiagnosticMood;
};

export const MOOD_OPTIONS = {
  id: [
    { value: "overthinking", label: "KEBANYAKAN MIKIR", emoji: "🧠" },
    { value: "work", label: "CAPEK KERJA", emoji: "💼" },
    { value: "love", label: "URUSAN CINTA", emoji: "💔" },
    { value: "lost", label: "LOST IN LIFE", emoji: "🫠" },
    { value: "random", label: "TIDAK TAHU", emoji: "❓" },
  ],
  en: [
    { value: "overthinking", label: "OVERTHINKING", emoji: "🧠" },
    { value: "work", label: "WORK BURNOUT", emoji: "💼" },
    { value: "love", label: "LOVE ISSUES", emoji: "💔" },
    { value: "lost", label: "LOST IN LIFE", emoji: "🫠" },
    { value: "random", label: "NO IDEA", emoji: "❓" },
  ],
} as const;

export const DIAGNOSTIC_RESULTS: Record<"id" | "en", DiagnosticResult[]> = {
  id: [
    {
      id: "premium-overthinker",
      title: "PREMIUM OVERTHINKER",
      subtitle: "Otak bekerja lembur tanpa uang lembur.",
      description:
        'Kamu mampu menciptakan 17 skenario dari satu chat yang hanya berbunyi "ok".',
      quote: "Bagaimana kalau semuanya baik-baik saja, tetapi aku tetap panik?",
      recommendation:
        "Tutup 14 tab mental. Sisakan satu tab untuk mencari makanan.",
      mood: "overthinking",
      stats: [
        { label: "Overthinking", value: 87 },
        { label: "Lapar", value: 12 },
        { label: "Braincell online", value: 1 },
      ],
    },
    {
      id: "corporate-zombie",
      title: "CORPORATE ZOMBIE",
      subtitle: "Hadir di meeting, tidak hadir di kehidupan.",
      description:
        "Tubuhmu bekerja. Jiwamu sudah mengajukan cuti sejak hari Selasa.",
      quote: "Mari kita bahas kembali di meeting berikutnya.",
      recommendation:
        "Minum air. Berdiri. Jangan membuka Slack saat sedang makan.",
      mood: "work",
      stats: [
        { label: "Meeting fatigue", value: 91 },
        { label: "Motivasi", value: 6 },
        { label: "Menunggu gajian", value: 99 },
      ],
    },
    {
      id: "romantic-buffering",
      title: "ROMANTIC BUFFERING",
      subtitle: "Perasaan tersedia, kejelasan tidak.",
      description:
        "Koneksi emosionalmu berjalan di jaringan yang bahkan tidak terdaftar.",
      quote: "Dia online. Berarti apa? Tidak ada. Tarik napas.",
      recommendation:
        "Jangan membuat teori dari last seen. Itu bukan data penelitian.",
      mood: "love",
      stats: [
        { label: "Delulu level", value: 89 },
        { label: "Kejelasan hubungan", value: 3 },
        { label: "Cek notifikasi", value: 96 },
      ],
    },
    {
      id: "human-loading-screen",
      title: "HUMAN LOADING SCREEN",
      subtitle: "Sedang memuat tujuan hidup. Mohon tunggu.",
      description:
        "Kamu tidak malas. Kamu hanya membuka terlalu banyak quest sekaligus.",
      quote:
        "Aku punya banyak rencana. Rencana untuk memulai rencana juga ada.",
      recommendation:
        "Pilih satu hal kecil. Tidak perlu menemukan makna hidup sebelum sarapan.",
      mood: "lost",
      stats: [
        { label: "Confusion", value: 82 },
        { label: "Side quests", value: 94 },
        { label: "Main quest progress", value: 7 },
      ],
    },
    {
      id: "professional-procrastinator",
      title: "PROFESSIONAL PROCRASTINATOR",
      subtitle: "Deadline adalah sumber motivasi utama.",
      description:
        "Kamu bisa menyelesaikan pekerjaan 20 menit sebelum deadline, setelah menundanya selama 3 minggu.",
      quote:
        "Aku bekerja paling baik di bawah tekanan. Tekanannya harus dari masa depan.",
      recommendation:
        "Mulai selama lima menit. Jangan menunggu soundtrack film motivasi.",
      mood: "random",
      stats: [
        { label: "Procrastination", value: 93 },
        { label: "Last-minute power", value: 98 },
        { label: "Persiapan awal", value: 4 },
      ],
    },
    {
      id: "social-battery-critical",
      title: "SOCIAL BATTERY CRITICAL",
      subtitle: "Baterai sosial tidak termasuk garansi.",
      description:
        "Kamu ingin bertemu teman. Kamu juga ingin membatalkan rencana dan berbaring.",
      quote: "Aku sayang kalian. Tolong jangan ajak aku keluar malam ini.",
      recommendation:
        "Balas chat seperlunya. Istirahat bukan pelanggaran kontrak sosial.",
      mood: "random",
      stats: [
        { label: "Social battery", value: 8 },
        { label: "Butuh rebahan", value: 97 },
        { label: "Alasan cancel", value: 88 },
      ],
    },
    {
      id: "deluxe-chaos-engine",
      title: "DELUXE CHAOS ENGINE",
      subtitle: "Tidak ada pola. Tidak ada penjelasan.",
      description:
        "Bahkan sistem diagnostik kami tidak menemukan pola yang bisa dipertanggungjawabkan.",
      quote:
        "Kita tidak tahu apa yang terjadi. Tetapi grafiknya terlihat menarik.",
      recommendation:
        "Lakukan sesuatu yang sederhana. Misalnya, jangan menambah masalah baru hari ini.",
      mood: "random",
      stats: [
        { label: "Randomness", value: 99 },
        { label: "Plot twists", value: 86 },
        { label: "Penjelasan logis", value: 2 },
      ],
    },
    {
      id: "sleep-deprived-genius",
      title: "SLEEP-DEPRIVED GENIUS",
      subtitle: "Ide brilian datang setelah jam tidur.",
      description:
        "Kamu menemukan solusi hidup pada pukul 02.47, lalu lupa semuanya saat bangun.",
      quote: "Besok aku akan menjadi manusia yang lebih teratur. Mungkin.",
      recommendation:
        "Simpan idenya. Lalu tidur. Internet akan tetap ada besok.",
      mood: "lost",
      stats: [
        { label: "Midnight ideas", value: 95 },
        { label: "Sleep schedule", value: 11 },
        { label: "Besok mulai", value: 100 },
      ],
    },
  ],
  en: [
    {
      id: "premium-overthinker",
      title: "PREMIUM OVERTHINKER",
      subtitle: "Working overtime without overtime pay.",
      description:
        'You can create 17 scenarios from a single message that says "ok".',
      quote: "What if everything is fine and I still panic anyway?",
      recommendation: "Close 14 mental tabs. Keep one open for finding snacks.",
      mood: "overthinking",
      stats: [
        { label: "Overthinking", value: 87 },
        { label: "Hungry", value: 12 },
        { label: "Braincells online", value: 1 },
      ],
    },
    {
      id: "corporate-zombie",
      title: "CORPORATE ZOMBIE",
      subtitle: "Present at meetings, absent from life.",
      description:
        "Your body is working. Your soul filed for leave last Tuesday.",
      quote: "Let us circle back in the next meeting.",
      recommendation: "Drink water. Stand up. Do not open Slack during lunch.",
      mood: "work",
      stats: [
        { label: "Meeting fatigue", value: 91 },
        { label: "Motivation", value: 6 },
        { label: "Waiting for payday", value: 99 },
      ],
    },
    {
      id: "romantic-buffering",
      title: "ROMANTIC BUFFERING",
      subtitle: "Feelings available. Clarity unavailable.",
      description:
        "Your emotional connection is running on a network that does not exist.",
      quote: "They are online. So what? Breathe.",
      recommendation:
        "Stop building theories from last seen. This is not research.",
      mood: "love",
      stats: [
        { label: "Delulu level", value: 89 },
        { label: "Relationship clarity", value: 3 },
        { label: "Checking notifications", value: 96 },
      ],
    },
    {
      id: "human-loading-screen",
      title: "HUMAN LOADING SCREEN",
      subtitle: "Loading life purpose. Please wait.",
      description:
        "You are not lazy. You simply opened too many quests at once.",
      quote: "I have so many plans. I even planned how to start planning.",
      recommendation:
        "Choose one small thing. You do not need life meaning before breakfast.",
      mood: "lost",
      stats: [
        { label: "Confusion", value: 82 },
        { label: "Side quests", value: 94 },
        { label: "Main quest progress", value: 7 },
      ],
    },
    {
      id: "professional-procrastinator",
      title: "PROFESSIONAL PROCRASTINATOR",
      subtitle: "Deadlines are your primary source of motivation.",
      description:
        "You finish work 20 minutes before the deadline after delaying it for three weeks.",
      quote:
        "I work best under pressure. The pressure must come from the future.",
      recommendation:
        "Start for five minutes. No motivational movie soundtrack required.",
      mood: "random",
      stats: [
        { label: "Procrastination", value: 93 },
        { label: "Last-minute power", value: 98 },
        { label: "Early preparation", value: 4 },
      ],
    },
    {
      id: "social-battery-critical",
      title: "SOCIAL BATTERY CRITICAL",
      subtitle: "Social battery not covered by warranty.",
      description:
        "You want to see your friends. You also want to cancel and lie down.",
      quote: "I love you all. Please do not invite me out tonight.",
      recommendation:
        "Reply when you can. Rest is not a social contract violation.",
      mood: "random",
      stats: [
        { label: "Social battery", value: 8 },
        { label: "Need to lie down", value: 97 },
        { label: "Cancel excuses", value: 88 },
      ],
    },
    {
      id: "deluxe-chaos-engine",
      title: "DELUXE CHAOS ENGINE",
      subtitle: "No pattern. No explanation.",
      description:
        "Even our diagnostic system cannot find a pattern worth defending.",
      quote:
        "We do not know what happened. The chart looks interesting though.",
      recommendation:
        "Do something simple. Like not creating a new problem today.",
      mood: "random",
      stats: [
        { label: "Randomness", value: 99 },
        { label: "Plot twists", value: 86 },
        { label: "Logical explanation", value: 2 },
      ],
    },
    {
      id: "sleep-deprived-genius",
      title: "SLEEP-DEPRIVED GENIUS",
      subtitle: "Brilliant ideas arrive after bedtime.",
      description:
        "You solve life at 2:47 AM and forget everything by breakfast.",
      quote: "Tomorrow I will become a more organized human. Maybe.",
      recommendation:
        "Save the idea. Then sleep. The internet will still be here tomorrow.",
      mood: "lost",
      stats: [
        { label: "Midnight ideas", value: 95 },
        { label: "Sleep schedule", value: 11 },
        { label: "Starting tomorrow", value: 100 },
      ],
    },
  ],
};
