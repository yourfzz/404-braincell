export type CorporateCategory =
  | "intern"
  | "corporate-victim"
  | "linkedin-warrior"
  | "burnout-executive";

export type CorporateProfile = {
  title: string;
  department: string;
  salary: string;
  kpi: string;
  quote: string;
  status: string;
  category: CorporateCategory;
};

export const CORPORATE_PROFILES: Record<"id" | "en", CorporateProfile[]> = {
  id: [
    {
      title: "Senior Overthinking Specialist",
      department: "Divisi Krisis Eksistensial",
      salary: "3 pujian dan 1 kopi gratis",
      kpi: "Memikirkan ulang chat yang sudah terkirim",
      quote: "Kita ini keluarga. Sayangnya, keluarga juga suka minta tolong.",
      status: "Hadir fisik, resign mental",
      category: "corporate-victim",
    },
    {
      title: "Junior Coffee Infrastructure Engineer",
      department: "Divisi Magang dan Pengabdian",
      salary: "Pengalaman berharga",
      kpi: "Membuat kopi sambil belajar leadership",
      quote: "Kesempatan belajar ini tidak akan tergantikan oleh uang.",
      status: "Menunggu konversi menjadi karyawan",
      category: "intern",
    },
    {
      title: "Chief Synergy Evangelist",
      department: "Divisi Optimalisasi Sinergi",
      salary: "Rahasia perusahaan",
      kpi: "Menggunakan kata alignment minimal 7 kali sehari",
      quote: "Kita perlu meeting untuk membahas rencana meeting berikutnya.",
      status: "Sedang menyelaraskan ekspektasi",
      category: "linkedin-warrior",
    },
    {
      title: "VP of Quiet Quitting",
      department: "Divisi Hemat Energi Manusia",
      salary: "Cukup untuk bertahan hidup",
      kpi: "Membalas email tanpa kehilangan kewarasan",
      quote: "Saya tidak malas. Saya sedang mengoptimalkan batas energi.",
      status: "Baterai emosional 2%",
      category: "burnout-executive",
    },
    {
      title: "Deadline Survival Specialist",
      department: "Divisi Kepanikan Terstruktur",
      salary: "Gaji pokok dan kecemasan",
      kpi: "Menyelesaikan pekerjaan 10 menit sebelum deadline",
      quote: "Kalau bisa panik besok, kenapa harus panik hari ini?",
      status: "Produktif dalam keadaan darurat",
      category: "corporate-victim",
    },
    {
      title: "Director of Personal Branding",
      department: "Divisi Pencitraan Profesional",
      salary: "Validasi dari LinkedIn",
      kpi: "Mengubah aktivitas biasa menjadi leadership experience",
      quote:
        "Hari ini saya belajar bahwa bernapas juga membutuhkan growth mindset.",
      status: "Open to work, closed to feedback",
      category: "linkedin-warrior",
    },
    {
      title: "Unpaid Experience Collector",
      department: "Divisi Magang Tanpa Batas",
      salary: "Sertifikat dan kenangan",
      kpi: "Menjalankan pekerjaan tiga divisi sekaligus",
      quote: "Bukan eksploitasi, ini kesempatan memperluas kompetensi.",
      status: "Kontrak segera berakhir, tugas bertambah",
      category: "intern",
    },
    {
      title: "Chief Emotional Damage Officer",
      department: "Divisi Kesehatan Mental Korporat",
      salary: "Cuti yang belum disetujui",
      kpi: "Tetap tersenyum setelah menerima revisi ke-14",
      quote:
        "Terima kasih masukannya, akan kami pertimbangkan secara emosional.",
      status: "Sedang memproses feedback",
      category: "burnout-executive",
    },
  ],

  en: [
    {
      title: "Senior Overthinking Specialist",
      department: "Existential Crisis Division",
      salary: "3 compliments and one free coffee",
      kpi: "Replaying a message that was already sent",
      quote: "We're a family. Unfortunately, family asks for favors too.",
      status: "Physically present, mentally resigned",
      category: "corporate-victim",
    },
    {
      title: "Junior Coffee Infrastructure Engineer",
      department: "Internship and Devotion Division",
      salary: "Valuable experience",
      kpi: "Making coffee while learning leadership",
      quote: "This learning opportunity is priceless. Literally.",
      status: "Waiting for full-time conversion",
      category: "intern",
    },
    {
      title: "Chief Synergy Evangelist",
      department: "Synergy Optimization Division",
      salary: "Company confidential",
      kpi: "Using the word alignment at least 7 times a day",
      quote: "We need a meeting to plan our next meeting.",
      status: "Currently aligning expectations",
      category: "linkedin-warrior",
    },
    {
      title: "VP of Quiet Quitting",
      department: "Human Energy Conservation",
      salary: "Just enough to survive",
      kpi: "Replying to emails without losing sanity",
      quote: "I'm not lazy. I'm optimizing my energy boundaries.",
      status: "Emotional battery at 2%",
      category: "burnout-executive",
    },
    {
      title: "Deadline Survival Specialist",
      department: "Structured Panic Division",
      salary: "Base pay plus anxiety",
      kpi: "Finishing work 10 minutes before the deadline",
      quote: "If we can panic tomorrow, why panic today?",
      status: "Productive only during emergencies",
      category: "corporate-victim",
    },
    {
      title: "Director of Personal Branding",
      department: "Professional Image Division",
      salary: "LinkedIn validation",
      kpi: "Turning ordinary activities into leadership experience",
      quote: "Today I learned that even breathing requires a growth mindset.",
      status: "Open to work, closed to feedback",
      category: "linkedin-warrior",
    },
    {
      title: "Unpaid Experience Collector",
      department: "Unlimited Internship Division",
      salary: "Certificate and memories",
      kpi: "Running three departments simultaneously",
      quote: "It's not exploitation. It's a cross-functional opportunity.",
      status: "Contract ending, workload expanding",
      category: "intern",
    },
    {
      title: "Chief Emotional Damage Officer",
      department: "Corporate Mental Health Division",
      salary: "Unapproved leave requests",
      kpi: "Smiling after revision number fourteen",
      quote: "Thank you for the feedback. I'll process it emotionally.",
      status: "Currently processing feedback",
      category: "burnout-executive",
    },
  ],
};

export const CATEGORY_LABELS = {
  id: {
    all: "Semua penderitaan",
    intern: "Budak magang",
    "corporate-victim": "Karyawan korporat",
    "linkedin-warrior": "Pejuang LinkedIn",
    "burnout-executive": "Eksekutif burnout",
  },
  en: {
    all: "All corporate suffering",
    intern: "The Intern",
    "corporate-victim": "Corporate Victim",
    "linkedin-warrior": "LinkedIn Warrior",
    "burnout-executive": "Burnout Executive",
  },
} as const;
