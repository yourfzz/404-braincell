"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, RefreshCw, FileWarning } from "lucide-react";
import { useLang } from "@/contexts/LangContext";

const complaints = {
  id: [
    {
      title: "GAJI UMR, MIMPI STANDAR CEO.",
      body: "Disuruh punya work-life balance, tapi gaji cuma cukup buat work. Life-nya nanti kalau sudah kaya.",
      signature: "Hormat kami, neuron yang ikut menghitung sisa saldo.",
    },
    {
      title: "SEMUA ORANG KOK UDAH SUKSES?",
      body: "Pemilik kami baru bangun tidur, tapi LinkedIn sudah menampilkan teman SMA yang jadi founder, investor, sekaligus pembicara TEDx.",
      signature: "Departemen Perbandingan Sosial dan Insecure.",
    },
    {
      title: "DIA ONLINE, TAPI KOK NGGAK BALES?",
      body: 'Kami sudah menganalisis status online, last seen, story terbaru, dan tanda titik di chat "wkwk". Kesimpulan: kami butuh bantuan profesional.',
      signature: "Tim Investigasi Hubungan yang Tidak Jelas.",
    },
    {
      title: "SCROLL SEBENTAR JADI 3 JAM.",
      body: "Awalnya cuma mau lihat satu video. Sekarang kami tahu sejarah lengkap seseorang yang bahkan tidak tahu kami ada.",
      signature: "Departemen Kehilangan Waktu dan Kesadaran.",
    },
    {
      title: "KAMI MENUNTUT KEJELASAN MASA DEPAN.",
      body: "Umur sudah segini, tapi cita-cita masih berubah tiap lihat konten 'day in my life' orang yang kelihatannya punya hidup sempurna.",
      signature: "Divisi Quarter-Life Crisis, belum punya divisi lain.",
    },
    {
      title: "KAPAN TERAKHIR KITA BENAR-BENAR ISTIRAHAT?",
      body: "Tidur merasa bersalah karena belum produktif. Kerja merasa bersalah karena tidak istirahat. Kami ingin mengajukan cuti dari rasa bersalah.",
      signature: "Serikat Pekerja Neuron Overworked.",
    },
    {
      title: "KOK TEMAN KITA PADA NIKAH?",
      body: "Kami baru bisa mengatur jadwal tidur, tapi algoritma sudah menyarankan konten pernikahan, rumah pertama, dan parenting.",
      signature: "Departemen Timeline Kehidupan yang Tidak Sinkron.",
    },
    {
      title: "TOLONG HENTIKAN FOMO INI.",
      body: "Pemilik kami tidak punya uang untuk ikut nongkrong, tapi tidak ikut bikin takut ketinggalan. Ikut bikin saldo menangis.",
      signature: "Divisi Keuangan dan Tekanan Sosial.",
    },
    {
      title: "KAMI CUMA MAU BELI KOPI.",
      body: "Kenapa setiap pengeluaran kecil harus disertai spreadsheet budgeting, kalkulator diskon, dan krisis identitas finansial?",
      signature: "CFO Braincell, gaji tidak termasuk tunjangan.",
    },
    {
      title: "KENAPA SEMUA HARUS JADI SIDE HUSTLE?",
      body: "Hobi menggambar disuruh jadi bisnis. Main game disuruh jadi streamer. Tidur sebentar lagi mungkin disuruh jadi sleep consultant.",
      signature: "Departemen Hobi yang Belum Dimonetisasi.",
    },
    {
      title: "KAMI MENOLAK MENJADI PRODUKTIF 24/7.",
      body: "Baru selesai satu tugas, sudah muncul sepuluh tugas lain. Kami curiga kata 'healing' cuma nama lain untuk menunda burnout.",
      signature: "HR Braincell yang sedang mencari pekerjaan lain.",
    },
    {
      title: "DIA BILANG 'TERSERAH', LALU MARAH.",
      body: "Kami sudah menjalankan 47 simulasi pilihan tempat makan. Semua hasil berakhir dengan kalimat 'terserah kamu aja'.",
      signature: "Unit Simulasi Hubungan Antar-Manusia.",
    },
  ],

  en: [
    {
      title: "MINIMUM WAGE, CEO-LEVEL DREAMS.",
      body: "They told us to find work-life balance. The paycheck only covers work. Life can wait until we're rich.",
      signature: "Sincerely, the neuron checking the bank balance.",
    },
    {
      title: "WHY IS EVERYONE ELSE SUCCESSFUL?",
      body: "Our owner just woke up, and LinkedIn is already showing a high school friend who's a founder, investor, and TEDx speaker.",
      signature: "Department of Social Comparison and Insecurity.",
    },
    {
      title: "THEY'RE ONLINE. WHY NO REPLY?",
      body: "We've analyzed their online status, last seen, latest story, and the punctuation in their texts. Conclusion: we need professional help.",
      signature: "The Bureau of Situationship Investigations.",
    },
    {
      title: "JUST ONE SCROLL. THREE HOURS GONE.",
      body: "We wanted to watch one video. Now we know the entire life story of someone who doesn't even know we exist.",
      signature: "Department of Lost Time and Consciousness.",
    },
    {
      title: "WE DEMAND A CLEAR FUTURE.",
      body: "We're this age and still changing career goals every time we see a stranger's seemingly perfect 'day in my life' video.",
      signature: "Quarter-Life Crisis Division. No other divisions exist.",
    },
    {
      title: "WHEN DID WE LAST ACTUALLY REST?",
      body: "Guilty when we're not productive. Guilty when we're working instead of resting. We demand paid leave from guilt.",
      signature: "Overworked Neuron Workers Union.",
    },
    {
      title: "WHY IS EVERYONE GETTING MARRIED?",
      body: "We can barely manage our sleep schedule, but the algorithm is already recommending weddings, first homes, and parenting tips.",
      signature: "Department of Misaligned Life Timelines.",
    },
    {
      title: "PLEASE MAKE THE FOMO STOP.",
      body: "We can't afford to hang out, but staying home makes us feel left out. Going out makes our bank account cry.",
      signature: "Division of Finance and Social Pressure.",
    },
    {
      title: "WE JUST WANTED TO BUY COFFEE.",
      body: "Why does every tiny purchase require a budgeting spreadsheet, a discount calculator, and a financial identity crisis?",
      signature: "Braincell CFO. Benefits not included.",
    },
    {
      title: "WHY MUST EVERY HOBBY BE A SIDE HUSTLE?",
      body: "Drawing must become a business. Gaming must become streaming. Soon, sleeping will require a personal brand.",
      signature: "Department of Unmonetized Hobbies.",
    },
    {
      title: "WE REFUSE TO BE PRODUCTIVE 24/7.",
      body: "We finish one task and ten more appear. We suspect 'healing' is just another word for postponing burnout.",
      signature: "Braincell HR, currently looking for another job.",
    },
    {
      title: "THEY SAID 'WHATEVER', THEN GOT MAD.",
      body: "We've run 47 simulations to pick a restaurant. Every result ends with 'you decide'.",
      signature: "Human Relationship Simulation Unit.",
    },
  ],
};

export default function BraincellHRSection() {
  const { isIndonesian } = useLang();
  const [complaintIndex, setComplaintIndex] = useState(0);
  const [clickCount, setClickCount] = useState(0);

  const lang = isIndonesian ? "id" : "en";
  const items = complaints[lang];
  const complaint = items[complaintIndex];

  const nextComplaint = () => {
    setComplaintIndex((current) => (current + 1) % items.length);
    setClickCount((current) => current + 1);
  };

  return (
    <section className="relative overflow-hidden bg-[#7957FF] px-4 py-16 text-[#171717] sm:px-6 sm:py-20 md:py-24">
      <div className="relative mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-[1fr_1fr] md:gap-12">
        <div className="flex flex-col items-center text-center md:text-left md:items-start">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border-2 border-[#171717] bg-[#D7FF64] px-3 py-2 font-mono text-[10px] font-black uppercase sm:text-xs">
            <Brain size={15} />
            {isIndonesian
              ? "Departemen SDM Braincell"
              : "Braincell HR Department"}
          </div>

          <h2 className="max-w-xl text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl md:text-6xl">
            {isIndonesian ? (
              <>
                BRAIN CELL
                <br />
                ANDA INGIN
                <br />
                <span className="text-[#D7FF64]">BICARA.</span>
              </>
            ) : (
              <>
                YOUR BRAIN
                <br />
                CELL NEEDS
                <br />
                <span className="text-[#D7FF64]">TO TALK.</span>
              </>
            )}
          </h2>

          <p className="mt-3 max-w-md text-sm font-medium leading-relaxed sm:text-base">
            {isIndonesian
              ? "Neuron-neuronmu telah mengajukan komplain resmi. Sayangnya, HR juga tidak tahu harus berbuat apa."
              : "Your neurons have filed an official complaint. Unfortunately, HR has no idea what to do either."}
          </p>

          <div className="mt-6 flex flex-wrap gap-2 font-mono text-[10px] font-bold uppercase sm:text-xs">
            <span className="rounded border-2 border-[#171717] bg-[#F7F3E8] px-3 py-2">
              {isIndonesian ? "0 tunjangan" : "0 benefits"}
            </span>
            <span className="rounded border-2 border-[#171717] bg-[#FF5C35] px-3 py-2 text-white">
              {isIndonesian ? "100% drama" : "100% drama"}
            </span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border-[3px] border-[#171717] bg-[#F7F3E8] p-4 shadow-[6px_6px_0px_0px_#171717] sm:p-6 md:shadow-[9px_9px_0px_0px_#171717]"
        >
          <div className="flex items-center justify-between gap-3 border-b-2 border-dashed border-[#171717]/30 pb-4">
            <div className="flex items-center gap-2">
              <FileWarning size={18} />
              <span className="font-mono text-xs font-black uppercase">
                {isIndonesian ? "Surat Keluhan" : "Complaint Letter"}
              </span>
            </div>
            <span className="font-mono text-[10px] font-bold text-[#FF5C35]">
              #{String(complaintIndex + 1).padStart(3, "0")}
            </span>
          </div>

          <div className="min-h-[230px] py-6 sm:min-h-[250px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${lang}-${complaintIndex}`}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-2xl font-black uppercase leading-tight sm:text-3xl">
                  "{complaint.title}"
                </h3>

                <p className="mt-4 text-sm leading-relaxed sm:text-base">
                  {complaint.body}
                </p>

                <p className="mt-6 border-l-4 border-[#7957FF] pl-3 font-mono text-xs italic leading-relaxed text-neutral-600">
                  {complaint.signature}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={nextComplaint}
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border-2 border-[#171717] bg-[#D7FF64] px-4 py-3 text-sm font-black transition-transform hover:-translate-y-0.5 active:translate-y-0 sm:text-base"
          >
            <RefreshCw size={17} />
            {isIndonesian ? "AJUKAN KOMPLAIN LAIN" : "FILE ANOTHER COMPLAINT"}
          </button>

          <p className="mt-3 text-center font-mono text-[10px] text-neutral-500">
            {isIndonesian
              ? `Total komplain: ${clickCount} · Tunjangan: tetap nihil`
              : `Complaints filed: ${clickCount} · Benefits: still zero`}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
