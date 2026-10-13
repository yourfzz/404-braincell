"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLang } from "@/contexts/LangContext";

export default function AboutClient() {
  const { isIndonesian } = useLang();

  const content = {
    id: {
      back: "Balik ke Playground",
      badge: "MANIFESTO V1.0",
      title: "BUAT KAMU YANG SEL OTAKNYA TINGGAL SATU.",
      intro:
        "Masih inget zaman internet itu taman bermain, bukan dashboard KPI perusahaan? Zaman ketika ngeklik tombol bikin sesuatu yang absurd, bukan malah disuruh langganan enterprise tahunan?",
      description:
        "404 Braincell adalah surat cinta buat playground Flash jadul, seni internet eksperimental, dan momen universal ketika otak mendadak nge-lag jam 3:15 sore di hari Kamis.",
      features: [
        {
          icon: "🔌",
          title: "ZERO BACKEND",
          description:
            "Semua berjalan langsung di browser kamu. Server? Gak diajak.",
        },
        {
          icon: "🎨",
          title: "NEO-BRUTALIST UI",
          description:
            "Border tegas, elemen nyentrik, dan tipografi yang gak takut tampil beda.",
        },
        {
          icon: "🍕",
          title: "DOPAMIN INSTAN",
          description:
            "Tanpa ribet, tanpa daftar akun. Cuma keseruan yang gak jelas gunanya.",
        },
      ],
      faqTitle: "PERTANYAAN YANG GAK PENTING-PENTING AMAT",
      faqs: [
        {
          q: "Kenapa website ini ada?",
          a: "Software zaman sekarang isinya dashboard KPI, roadmap enterprise, dan meeting buat ngebahas meeting berikutnya. 404 Braincell hadir buat menyeimbangkan semesta lewat interaksi absurd berkualitas tinggi yang manfaatnya susah dijelaskan ke HR.",
        },
        {
          q: "Kalau pakai website ini, otak gue jadi makin pinter?",
          a: "Secara ilmiah, enggak. Tim legal kami bahkan menyarankan kamu buat gak berekspektasi apa-apa. Kalau mendadak jenius, itu di luar tanggung jawab kami.",
        },
        {
          q: "Data gue disimpan di mana?",
          a: "Sebagian fitur mungkin menyimpan preferensi di localStorage browser kamu. Kami gak menggunakan backend untuk melacak aktivitasmu dan gak memakai cookie pelacakan. Tetap ingat, localStorage itu tersimpan di browser, bukan brankas rahasia negara.",
        },
        {
          q: "Katanya ada secret room?",
          a: "Kami tidak bisa mengonfirmasi maupun menyangkal rumor tersebut. Tapi, coba ketuk logo atau pencet tombol merah berkali-kali. Siapa tahu ada sesuatu yang kebuka. Atau kamu cuma buang waktu. Dua-duanya sesuai konsep.",
        },
      ],
      cta: "Balik & Buang Waktu Lagi ↗",
    },
    en: {
      back: "Back to Playground",
      badge: "MANIFESTO V1.0",
      title: "FOR PEOPLE WITH EXACTLY ONE BRAIN CELL LEFT.",
      intro:
        "Remember when the internet was a playground rather than a corporate performance metric? When clicking a button made something silly happen instead of prompting you for an annual enterprise subscription?",
      description:
        "404 Braincell is an homage to retro Flash playgrounds, early net art, and the universal experience of having your brain melt at 3:15 PM on a Thursday afternoon.",
      features: [
        {
          icon: "🔌",
          title: "ZERO BACKEND",
          description:
            "Runs directly in your browser. No server drama involved.",
        },
        {
          icon: "🎨",
          title: "NEO-BRUTALIST UI",
          description:
            "Bold borders, playful stickers, and unapologetically loud typography.",
        },
        {
          icon: "🍕",
          title: "INSTANT DOPAMINE",
          description:
            "No friction, no signups. Just pointless fun, delivered instantly.",
        },
      ],
      faqTitle: "FREQUENTLY ASKED NONSENSE",
      faqs: [
        {
          q: "Why does this website exist?",
          a: "Modern software is full of KPI dashboards, enterprise roadmaps, and meetings about future meetings. 404 Braincell restores balance with high-quality, completely useless interactive delight.",
        },
        {
          q: "Will using this site make me smarter?",
          a: "Scientifically speaking, no. Our legal department recommends expecting absolutely nothing. If you suddenly become a genius, that's beyond our scope.",
        },
        {
          q: "Where is my data stored?",
          a: "Some features may store preferences in your browser's localStorage. We don't use a backend to track your activity or tracking cookies. Remember, localStorage lives in your browser, not in a government-grade vault.",
        },
        {
          q: "Is there a secret room?",
          a: "We can neither confirm nor deny these allegations. But try tapping the logo or mashing the red button. Something might happen. Or you might just waste your time. Both outcomes fit the concept.",
        },
      ],
      cta: "Go Back & Waste Some Time ↗",
    },
  };

  const t = isIndonesian ? content.id : content.en;

  return (
    <div className="w-full py-12 md:py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-mono font-bold text-neutral-700 hover:text-[#FF5C35] mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>← {t.back}</span>
        </Link>

        {/* Hero */}
        <div className="bg-white rounded-3xl border-2 border-[#171717] brutalist-shadow-lg p-8 sm:p-12 mb-12">
          <div className="inline-block px-3 py-1 bg-[#D7FF64] text-[#171717] font-mono font-bold text-xs rounded-full border border-[#171717] mb-6">
            {t.badge}
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#171717] tracking-tight uppercase mb-6 leading-tight">
            {t.title}
          </h1>

          <div className="space-y-4 text-base sm:text-lg text-neutral-800 leading-relaxed font-medium">
            <p>{t.intro}</p>
            <p>
              <strong className="text-[#FF5C35]">404 Braincell</strong>{" "}
              {t.description.replace("404 Braincell ", "")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t-2 border-[#171717]">
            {t.features.map((feature) => (
              <div
                key={feature.title}
                className="p-4 bg-[#F7F3E8] rounded-xl border border-[#171717]"
              >
                <div className="text-2xl mb-1">{feature.icon}</div>
                <h3 className="font-mono font-bold text-xs uppercase text-neutral-600 mb-1">
                  {feature.title}
                </h3>
                <p className="text-xs text-neutral-800 font-medium leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-3xl border-2 border-[#171717] brutalist-shadow p-8 sm:p-10 mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-[#171717] tracking-tight mb-6">
            {t.faqTitle}
          </h2>

          <div className="space-y-6">
            {t.faqs.map((faq, index) => (
              <div
                key={faq.q}
                className="pb-6 border-b border-neutral-200 last:border-b-0 last:pb-0"
              >
                <h3 className="font-black text-base sm:text-lg text-[#171717] mb-2 flex items-start gap-2">
                  <span className="text-[#FF5C35] font-mono">
                    Q{index + 1}:
                  </span>
                  <span>{faq.q}</span>
                </h3>

                <p className="text-sm sm:text-base text-neutral-700 leading-relaxed pl-8">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center py-6">
          <Link
            href="/"
            className="inline-flex px-8 py-4 bg-[#7957FF] text-white font-black text-base rounded-2xl brutalist-button"
          >
            {t.cta}
          </Link>
        </div>
      </div>
    </div>
  );
}
