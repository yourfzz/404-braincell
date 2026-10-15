"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toPng } from "html-to-image";
import {
  ArrowLeft,
  ArrowRight,
  Archive,
  Check,
  Download,
  Feather,
  Heart,
  LockKeyhole,
  Mail,
  Sparkles,
  X,
} from "lucide-react";

import { useLang } from "@/contexts/LangContext";

type RoomId = "apology" | "goodbye" | "unsaid";

type Artifact = {
  id: string;
  room: RoomId;
  number: string;
  title: string;
  subtitle: string;
  letter: string;
  note: string;
};

const ARCHIVE: Record<"id" | "en", Artifact[]> = {
  id: [
    {
      id: "apology-01",
      room: "apology",
      number: "001",
      title: "Untuk yang Pernah Kukecewakan",
      subtitle: "Sebuah permintaan maaf yang datang terlambat.",
      letter:
        "Aku sudah berkali-kali menyusun kalimat ini di kepalaku. Setiap kali ingin mengatakannya, aku selalu menemukan alasan untuk menunda.\n\nMungkin aku takut kamu tidak akan memaafkanku. Mungkin aku juga belum cukup berani untuk mengakui betapa besar kesalahanku.\n\nAku tidak menulis ini untuk meminta semuanya kembali seperti semula. Aku hanya ingin kamu tahu bahwa aku akhirnya mengerti.",
      note: "Beberapa permintaan maaf tidak mengubah masa lalu. Mereka hanya mengakui bahwa masa lalu itu pernah menyakiti.",
    },
    {
      id: "apology-02",
      room: "apology",
      number: "002",
      title: "Maaf Karena Aku Tidak Tahu Caranya",
      subtitle: "Untuk seseorang yang mencoba, tetapi gagal.",
      letter:
        "Aku ingin menjadi seseorang yang lebih baik untukmu. Aku sungguh ingin.\n\nTetapi niat baik tidak selalu berarti kita tahu cara memperlakukan seseorang dengan baik. Dan aku belajar itu dengan cara yang tidak mudah.\n\nKalau waktu bisa diulang, aku tidak akan berjanji menjadi sempurna. Aku akan belajar mendengarkan lebih awal.",
      note: "Terkadang penyesalan adalah awal dari pemahaman, bukan mesin waktu.",
    },
    {
      id: "goodbye-01",
      room: "goodbye",
      number: "003",
      title: "Aku Harap Hidup Baik Padamu",
      subtitle: "Perpisahan tanpa permintaan untuk kembali.",
      letter:
        "Aku tidak tahu kabarmu sekarang. Mungkin hidupmu sudah jauh berbeda dari terakhir kali kita berbicara.\n\nAku berharap kamu menemukan tempat yang membuatmu merasa aman. Orang-orang yang mendengarkanmu. Hari-hari yang tidak harus selalu kamu perjuangkan sendirian.\n\nAku pernah menjadi bagian dari ceritamu. Untuk itu, aku bersyukur. Sisanya, biar waktu yang menyimpan.",
      note: "Tidak semua perpisahan harus berakhir dengan kebencian. Ada yang cukup menjadi kenangan.",
    },
    {
      id: "goodbye-02",
      room: "goodbye",
      number: "004",
      title: "Kita Pernah Menjadi Rumah",
      subtitle: "Untuk tempat yang tidak bisa ditinggali lagi.",
      letter:
        "Dulu, bercerita kepadamu adalah hal paling mudah di dunia.\n\nSekarang, bahkan menjelaskan kenapa aku merindukan masa itu terasa sulit. Aku tidak yakin apakah aku merindukanmu, diriku saat bersamamu, atau dunia yang terasa lebih sederhana ketika kita masih ada di sana.\n\nMungkin jawabannya adalah semuanya.",
      note: "Merindukan masa lalu tidak selalu berarti kita harus kembali ke sana.",
    },
    {
      id: "unsaid-01",
      room: "unsaid",
      number: "005",
      title: "Aku Sebenarnya Bangga Padamu",
      subtitle: "Kalimat sederhana yang tidak pernah sempat diucapkan.",
      letter:
        "Aku melihat betapa kerasnya kamu berusaha, bahkan ketika tidak ada yang melihat.\n\nAku tahu ada hari-hari ketika kamu merasa tertinggal. Ketika pencapaian orang lain membuat langkahmu sendiri terasa kecil.\n\nAku cuma ingin kamu tahu: aku melihat usahamu. Dan kamu tidak harus memenangkan semuanya untuk layak merasa bangga.",
      note: "Tidak semua hal yang berarti harus menunggu momen yang sempurna untuk diucapkan.",
    },
    {
      id: "unsaid-02",
      room: "unsaid",
      number: "006",
      title: "Aku Juga Sedang Berusaha",
      subtitle: "Untuk orang-orang yang mengira semuanya baik-baik saja.",
      letter:
        "Aku sering bilang tidak apa-apa karena menjelaskan semuanya terasa lebih melelahkan.\n\nAku tetap tertawa. Tetap membalas pesan. Tetap menyelesaikan hal-hal yang harus diselesaikan.\n\nTetapi ada bagian dari diriku yang juga ingin ditanya sekali lagi: apakah kamu benar-benar baik-baik saja?\n\nBukan untuk diberi solusi. Hanya untuk didengarkan.",
      note: "Kamu boleh terlihat kuat dan tetap membutuhkan tempat untuk beristirahat.",
    },
  ],
  en: [
    {
      id: "apology-01",
      room: "apology",
      number: "001",
      title: "To the One I Disappointed",
      subtitle: "An apology that arrived too late.",
      letter:
        "I have written these words in my head a hundred times. Every time I wanted to say them, I found another reason to wait.\n\nMaybe I was afraid you would never forgive me. Maybe I was not brave enough to admit how badly I had hurt you.\n\nI am not writing this to ask for things to go back to the way they were. I just want you to know that I finally understand.",
      note: "Some apologies cannot change the past. They can only acknowledge that it hurt.",
    },
    {
      id: "apology-02",
      room: "apology",
      number: "002",
      title: "I Did Not Know How",
      subtitle: "For someone who tried, but got it wrong.",
      letter:
        "I wanted to be a better person for you. I really did.\n\nBut good intentions do not always mean we know how to treat someone well. I learned that in a way I will not forget.\n\nIf I could start again, I would not promise to be perfect. I would learn to listen sooner.",
      note: "Sometimes regret is the beginning of understanding, not a time machine.",
    },
    {
      id: "goodbye-01",
      room: "goodbye",
      number: "003",
      title: "I Hope Life Is Kind to You",
      subtitle: "A goodbye without asking you to return.",
      letter:
        "I do not know how you are doing now. Maybe your life looks nothing like the last time we spoke.\n\nI hope you find a place where you feel safe. People who listen. Days you do not have to fight through alone.\n\nI was once part of your story. For that, I am grateful. The rest can stay with time.",
      note: "Not every goodbye needs to end in bitterness. Some can simply become memories.",
    },
    {
      id: "goodbye-02",
      room: "goodbye",
      number: "004",
      title: "We Used to Be Home",
      subtitle: "For a place you can no longer live in.",
      letter:
        "Once, telling you things was the easiest thing in the world.\n\nNow, even explaining why I miss those days feels difficult. I do not know if I miss you, who I was around you, or the world that felt simpler when we were still there.\n\nMaybe the answer is all of it.",
      note: "Missing the past does not always mean we should return to it.",
    },
    {
      id: "unsaid-01",
      room: "unsaid",
      number: "005",
      title: "I Am Proud of You",
      subtitle: "Simple words that never found their moment.",
      letter:
        "I see how hard you try, even when nobody is watching.\n\nI know there are days when you feel behind. When someone else’s achievements make your own progress seem small.\n\nI just want you to know: I see your effort. You do not have to win everything to deserve a little pride.",
      note: "Meaningful words do not need to wait for a perfect moment.",
    },
    {
      id: "unsaid-02",
      room: "unsaid",
      number: "006",
      title: "I Am Trying, Too",
      subtitle: "For the people who assume everything is fine.",
      letter:
        "I often say I am fine because explaining everything feels exhausting.\n\nI still laugh. I still reply to messages. I still do the things I am supposed to do.\n\nBut a part of me wishes someone would ask one more time: are you really okay?\n\nNot to offer a solution. Just to listen.",
      note: "You can be strong and still need somewhere to rest.",
    },
  ],
};

const ROOMS: Record<
  "id" | "en",
  {
    id: RoomId;
    number: string;
    title: string;
    description: string;
    color: string;
    icon: "apology" | "goodbye" | "unsaid";
  }[]
> = {
  id: [
    {
      id: "apology",
      number: "01",
      title: "THE APOLOGY",
      description: "Untuk kata maaf yang tak pernah menemukan jalan pulang.",
      color: "#FF5C35",
      icon: "apology",
    },
    {
      id: "goodbye",
      number: "02",
      title: "THE GOODBYE",
      description: "Untuk perpisahan yang tak pernah benar-benar selesai.",
      color: "#7957FF",
      icon: "goodbye",
    },
    {
      id: "unsaid",
      number: "03",
      title: "THE THINGS I NEVER SAID",
      description: "Untuk kalimat yang tinggal terlalu lama di kepala.",
      color: "#D7FF64",
      icon: "unsaid",
    },
  ],
  en: [
    {
      id: "apology",
      number: "01",
      title: "THE APOLOGY",
      description: "For the apologies that never found their way home.",
      color: "#FF5C35",
      icon: "apology",
    },
    {
      id: "goodbye",
      number: "02",
      title: "THE GOODBYE",
      description: "For the goodbyes that never truly ended.",
      color: "#7957FF",
      icon: "goodbye",
    },
    {
      id: "unsaid",
      number: "03",
      title: "THE THINGS I NEVER SAID",
      description: "For the words that stayed in your head too long.",
      color: "#D7FF64",
      icon: "unsaid",
    },
  ],
};

type View =
  | { type: "entrance" }
  | { type: "archive" }
  | { type: "room"; room: RoomId }
  | { type: "artifact"; artifactId: string }
  | { type: "write" }
  | { type: "release" };

export default function MuseumOfUnsentThings() {
  const { isIndonesian } = useLang();
  const lang = isIndonesian ? "id" : "en";

  const [view, setView] = useState<View>({ type: "entrance" });
  const [letterTitle, setLetterTitle] = useState("");
  const [recipient, setRecipient] = useState("");
  const [letterBody, setLetterBody] = useState("");
  const [released, setReleased] = useState(false);
  const [saved, setSaved] = useState(false);
  const [exporting, setExporting] = useState(false);

  const letterCardRef = useRef<HTMLDivElement>(null);

  const rooms = ROOMS[lang];
  const artifacts = ARCHIVE[lang];

  const activeArtifact =
    view.type === "artifact"
      ? artifacts.find((item) => item.id === view.artifactId)
      : undefined;

  const t = {
    archive: isIndonesian ? "ARSIP" : "THE ARCHIVE",
    back: isIndonesian ? "KEMBALI" : "GO BACK",
    enter: isIndonesian ? "MASUK KE ARSIP" : "ENTER THE ARCHIVE",
    intro: isIndonesian
      ? "Tidak semua hal yang kita rasakan pernah menemukan kata-katanya."
      : "Not everything we feel ever finds its words.",
    subintro: isIndonesian
      ? "Sebuah museum kecil untuk hal-hal yang tidak pernah kita kirim."
      : "A small museum for the things we never sent.",
    explore: isIndonesian ? "JELAJAHI MUSEUM" : "EXPLORE THE MUSEUM",
    chooseRoom: isIndonesian ? "PILIH SEBUAH RUANG" : "CHOOSE A ROOM",
    roomIntro: isIndonesian
      ? "Setiap ruangan menyimpan kata-kata yang tertinggal."
      : "Each room keeps words that were left behind.",
    readLetter: isIndonesian ? "BACA ARTEFAK" : "READ ARTIFACT",
    write: isIndonesian ? "TULIS SURATMU SENDIRI" : "WRITE YOUR OWN LETTER",
    writeDesc: isIndonesian
      ? "Tidak perlu nama asli. Tidak perlu menjelaskan semuanya."
      : "No real names needed. No need to explain everything.",
    title: isIndonesian ? "JUDUL SURAT" : "LETTER TITLE",
    recipient: isIndonesian ? "UNTUK SIAPA?" : "WHO IS IT FOR?",
    body: isIndonesian ? "APA YANG TAK TERUCAP?" : "WHAT WENT UNSAID?",
    titlePlaceholder: isIndonesian
      ? "Sesuatu yang belum sempat kukatakan..."
      : "Something I never got to say...",
    recipientPlaceholder: isIndonesian
      ? "Untuk seseorang, atau diriku sendiri"
      : "Someone, or maybe myself",
    bodyPlaceholder: isIndonesian
      ? "Aku tidak tahu apakah kata-kata ini akan pernah sampai kepadamu..."
      : "I do not know if these words will ever reach you...",
    save: isIndonesian ? "SIMPAN SURAT" : "SAVE LETTER",
    release: isIndonesian ? "LEPASKAN SURAT" : "LET IT GO",
    download: isIndonesian ? "UNDUH SEBAGAI KARTU" : "DOWNLOAD AS A CARD",
    backArchive: isIndonesian ? "KEMBALI KE MUSEUM" : "RETURN TO MUSEUM",
    releasedTitle: isIndonesian
      ? "SURAT TELAH DILEPASKAN."
      : "THE LETTER HAS BEEN RELEASED.",
    releasedText: isIndonesian
      ? "Kamu tidak harus melupakan sesuatu untuk berhenti membawanya ke mana-mana."
      : "You do not have to forget something to stop carrying it everywhere.",
    restart: isIndonesian ? "KEMBALI KE PINTU MASUK" : "RETURN TO THE ENTRANCE",
    disclaimer: isIndonesian
      ? "Museum ini adalah ruang fiksi untuk refleksi. Suratmu tidak dikirim ke siapa pun."
      : "This museum is a fictional space for reflection. Your letter is not sent to anyone.",
    empty: isIndonesian
      ? "Tulis beberapa kata terlebih dahulu."
      : "Write a few words first.",
    exportError: isIndonesian
      ? "Kartu gagal dibuat. Coba lagi."
      : "Could not create the card. Please try again.",
    created: isIndonesian ? "SURAT PRIBADI" : "PERSONAL LETTER",
    exhibit: isIndonesian ? "ARTEFAK MUSEUM" : "MUSEUM ARTIFACT",
    footer: isIndonesian
      ? "SEBAGIAN HAL CUKUP DISIMPAN DI SINI."
      : "SOME THINGS CAN STAY HERE.",
  };

  const goBack = () => {
    if (view.type === "archive") {
      setView({ type: "entrance" });
    } else if (view.type === "room") {
      setView({ type: "archive" });
    } else if (view.type === "artifact") {
      const artifact = artifacts.find((item) => item.id === view.artifactId);
      setView({
        type: "room",
        room: artifact?.room ?? "apology",
      });
    } else if (view.type === "write") {
      setView({ type: "archive" });
    } else {
      setView({ type: "archive" });
    }
  };

  const exportLetter = async () => {
    if (!letterCardRef.current || !letterBody.trim()) {
      window.alert(t.empty);
      return;
    }

    setExporting(true);

    try {
      const dataUrl = await toPng(letterCardRef.current, {
        cacheBust: true,
        pixelRatio: 3,
        backgroundColor: "#F7F3E8",
      });

      const link = document.createElement("a");
      link.download = "museum-of-unsent-things.png";
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Letter export failed:", error);
      window.alert(t.exportError);
    } finally {
      setExporting(false);
    }
  };

  const saveLetter = () => {
    if (!letterBody.trim()) {
      window.alert(t.empty);
      return;
    }

    setSaved(true);
    setReleased(false);
    setView({ type: "release" });
  };

  const resetMuseum = () => {
    setView({ type: "entrance" });
    setLetterTitle("");
    setRecipient("");
    setLetterBody("");
    setReleased(false);
    setSaved(false);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#171717] text-[#F7F3E8]">
      {/* Atmospheric background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(#F7F3E8 0.6px, transparent 0.6px)",
          backgroundSize: "7px 7px",
        }}
      />

      <div className="relative mx-auto min-h-screen max-w-6xl px-5 py-6 sm:px-8 sm:py-8">
        {/* Top navigation */}
        <header className="flex items-center justify-between border-b border-white/20 pb-5">
          <button
            type="button"
            onClick={() => setView({ type: "entrance" })}
            className="flex items-center gap-2 text-xs font-black tracking-[0.2em] transition hover:text-[#D7FF64]"
          >
            <Archive size={17} />
            404 BRAINCELL
          </button>

          <span className="text-[10px] font-bold tracking-[0.18em] text-white/50">
            {t.archive} / 001
          </span>
        </header>

        <AnimatePresence mode="wait">
          {/* Entrance */}
          {view.type === "entrance" && (
            <motion.section
              key="entrance"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45 }}
              className="flex min-h-[78vh] flex-col justify-center py-14"
            >
              <div className="mb-8 flex items-center gap-3">
                <span className="h-px w-10 bg-[#D7FF64]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D7FF64]">
                  {isIndonesian
                    ? "MUSEUM HAL-HAL YANG TAK PERNAH TERKIRIM"
                    : "A DIGITAL MUSEUM OF UNFINISHED FEELINGS"}
                </span>
              </div>

              <h1 className="max-w-5xl text-5xl font-black uppercase leading-[0.88] tracking-[-0.06em] sm:text-7xl md:text-8xl lg:text-[108px]">
                {isIndonesian ? (
                  <>
                    ADA HAL
                    <br />
                    YANG TAK
                    <br />
                    <span className="text-[#D7FF64]">TERKIRIM.</span>
                  </>
                ) : (
                  <>
                    SOME THINGS
                    <br />
                    WERE NEVER
                    <br />
                    <span className="text-[#D7FF64]">SENT.</span>
                  </>
                )}
              </h1>

              <div className="mt-8 grid gap-8 sm:grid-cols-[1fr_240px] sm:items-end">
                <div className="max-w-xl">
                  <p className="text-lg font-medium leading-relaxed text-white/80 sm:text-xl">
                    {t.intro}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-white/50">
                    {t.subintro}
                  </p>

                  <button
                    type="button"
                    onClick={() => setView({ type: "archive" })}
                    className="group mt-8 inline-flex items-center gap-4 bg-[#D7FF64] px-6 py-4 text-xs font-black tracking-widest text-[#171717] transition hover:bg-[#F7F3E8]"
                  >
                    {t.enter}
                    <ArrowRight
                      size={17}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </button>
                </div>

                <div className="relative mx-auto flex aspect-[3/4] w-full max-w-[240px] items-center justify-center border border-white/20 bg-white/[0.03] sm:mx-0">
                  <div className="absolute inset-4 border border-white/10" />
                  <div className="absolute inset-x-10 bottom-0 top-12 border-x border-white/20 bg-gradient-to-b from-[#D7FF64]/10 to-transparent" />

                  <motion.div
                    animate={{ opacity: [0.35, 0.9, 0.35] }}
                    transition={{ duration: 3.5, repeat: Infinity }}
                    className="absolute inset-x-14 bottom-0 top-20 bg-[#D7FF64]/15 blur-2xl"
                  />

                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="relative flex size-20 items-center justify-center border border-[#D7FF64]/60 bg-[#171717]"
                  >
                    <Mail
                      size={30}
                      strokeWidth={1}
                      className="text-[#D7FF64]"
                    />
                  </motion.div>

                  <span className="absolute bottom-7 text-[9px] font-bold tracking-[0.25em] text-white/50">
                    EXHIBIT 001
                  </span>
                </div>
              </div>

              <p className="mt-14 max-w-md text-[10px] font-bold uppercase leading-relaxed tracking-[0.15em] text-white/30">
                {t.disclaimer}
              </p>
            </motion.section>
          )}

          {/* Archive room selection */}
          {view.type === "archive" && (
            <motion.section
              key="archive"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="py-12 sm:py-16"
            >
              <button
                type="button"
                onClick={goBack}
                className="mb-10 inline-flex items-center gap-2 text-[10px] font-black tracking-widest text-white/50 hover:text-[#D7FF64]"
              >
                <ArrowLeft size={15} />
                {t.back}
              </button>

              <p className="text-xs font-bold tracking-[0.2em] text-[#D7FF64]">
                01 / THE COLLECTION
              </p>
              <h2 className="mt-4 text-4xl font-black uppercase leading-none sm:text-6xl">
                {t.chooseRoom}
                <span className="text-[#D7FF64]">.</span>
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/55">
                {t.roomIntro}
              </p>

              <div className="mt-10 grid gap-4 md:grid-cols-3">
                {rooms.map((room, index) => (
                  <motion.button
                    key={room.id}
                    type="button"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setView({ type: "room", room: room.id })}
                    className="group flex min-h-[260px] flex-col border border-white/20 bg-white/[0.03] p-5 text-left transition hover:-translate-y-1 hover:border-white/60 hover:bg-white/[0.06] sm:p-6"
                  >
                    <div className="flex items-start justify-between">
                      <span
                        className="flex size-11 items-center justify-center"
                        style={{
                          color: room.color,
                          border: `1px solid ${room.color}`,
                        }}
                      >
                        {room.icon === "apology" && <Heart size={21} />}
                        {room.icon === "goodbye" && <Feather size={21} />}
                        {room.icon === "unsaid" && <Mail size={21} />}
                      </span>

                      <span className="text-xs font-bold text-white/35">
                        ROOM {room.number}
                      </span>
                    </div>

                    <div className="mt-auto pt-12">
                      <h3 className="text-xl font-black uppercase leading-tight">
                        {room.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-white/50">
                        {room.description}
                      </p>

                      <div
                        className="mt-6 flex items-center justify-between border-t border-white/15 pt-4 text-[10px] font-black tracking-widest"
                        style={{ color: room.color }}
                      >
                        {t.explore}
                        <ArrowRight
                          size={16}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setView({ type: "write" })}
                className="mt-6 flex w-full items-center justify-between gap-4 border border-[#D7FF64]/60 bg-[#D7FF64]/5 p-5 text-left transition hover:bg-[#D7FF64]/10 sm:p-6"
              >
                <div>
                  <p className="text-xs font-black tracking-widest text-[#D7FF64]">
                    YOUR OWN EXHIBIT
                  </p>
                  <h3 className="mt-2 text-lg font-black uppercase">
                    {t.write}
                  </h3>
                  <p className="mt-1 text-sm text-white/50">{t.writeDesc}</p>
                </div>
                <ArrowRight className="shrink-0 text-[#D7FF64]" />
              </button>
            </motion.section>
          )}

          {/* Selected room */}
          {view.type === "room" && (
            <motion.section
              key={`room-${view.room}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="py-12 sm:py-16"
            >
              <button
                type="button"
                onClick={goBack}
                className="mb-10 inline-flex items-center gap-2 text-[10px] font-black tracking-widest text-white/50 hover:text-[#D7FF64]"
              >
                <ArrowLeft size={15} />
                {t.back}
              </button>

              {rooms
                .filter((room) => room.id === view.room)
                .map((room) => (
                  <div key={room.id}>
                    <p
                      className="text-xs font-bold tracking-[0.2em]"
                      style={{ color: room.color }}
                    >
                      ROOM {room.number} / COLLECTION
                    </p>
                    <h2 className="mt-4 max-w-3xl text-4xl font-black uppercase leading-[0.95] sm:text-6xl">
                      {room.title}
                    </h2>
                    <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/55">
                      {room.description}
                    </p>
                  </div>
                ))}

              <div className="mt-10 space-y-3">
                {artifacts
                  .filter((item) => item.room === view.room)
                  .map((artifact, index) => (
                    <button
                      key={artifact.id}
                      type="button"
                      onClick={() =>
                        setView({
                          type: "artifact",
                          artifactId: artifact.id,
                        })
                      }
                      className="group flex w-full items-center gap-4 border border-white/15 p-4 text-left transition hover:border-[#D7FF64]/70 hover:bg-white/[0.04] sm:p-5"
                    >
                      <span className="flex size-12 shrink-0 items-center justify-center border border-white/20 text-sm font-black text-white/40">
                        {artifact.number}
                      </span>

                      <div className="min-w-0 flex-1">
                        <h3 className="font-bold leading-snug">
                          {artifact.title}
                        </h3>
                        <p className="mt-1 text-xs leading-relaxed text-white/45">
                          {artifact.subtitle}
                        </p>
                      </div>

                      <ArrowRight
                        size={18}
                        className="shrink-0 text-white/35 transition group-hover:translate-x-1 group-hover:text-[#D7FF64]"
                      />
                    </button>
                  ))}
              </div>

              <button
                type="button"
                onClick={() => setView({ type: "write" })}
                className="mt-8 inline-flex items-center gap-3 text-xs font-black tracking-widest text-[#D7FF64] hover:text-white"
              >
                <Feather size={16} />
                {t.write}
                <ArrowRight size={15} />
              </button>
            </motion.section>
          )}

          {/* Read artifact */}
          {view.type === "artifact" && activeArtifact && (
            <motion.section
              key={`artifact-${activeArtifact.id}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="mx-auto max-w-3xl py-12 sm:py-16"
            >
              <button
                type="button"
                onClick={goBack}
                className="mb-10 inline-flex items-center gap-2 text-[10px] font-black tracking-widest text-white/50 hover:text-[#D7FF64]"
              >
                <ArrowLeft size={15} />
                {t.back}
              </button>

              <div className="mb-5 flex items-center gap-3 text-[#D7FF64]">
                <LockKeyhole size={16} />
                <span className="text-[10px] font-black tracking-[0.2em]">
                  {t.exhibit} / {activeArtifact.number}
                </span>
              </div>

              <article className="border border-white/20 bg-[#F7F3E8] p-6 text-[#171717] sm:p-12">
                <div className="flex items-center justify-between border-b border-black/20 pb-5">
                  <span className="text-[10px] font-black tracking-[0.2em]">
                    404B / ARCHIVE
                  </span>
                  <span className="text-[10px] font-bold text-black/40">
                    EXHIBIT {activeArtifact.number}
                  </span>
                </div>

                <p className="mt-10 text-xs font-black uppercase tracking-[0.2em] text-[#7957FF]">
                  {activeArtifact.subtitle}
                </p>

                <h2 className="mt-4 text-3xl font-black leading-tight sm:text-5xl">
                  {activeArtifact.title}
                </h2>

                <div className="my-9 h-px bg-black/20" />

                <div className="space-y-5">
                  {activeArtifact.letter
                    .split("\n\n")
                    .map((paragraph, index) => (
                      <p
                        key={index}
                        className="text-base leading-[1.9] text-black/80 sm:text-lg"
                      >
                        {paragraph}
                      </p>
                    ))}
                </div>

                <div className="mt-10 border-l-4 border-[#7957FF] bg-white/60 p-5">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#7957FF]">
                    {isIndonesian ? "CATATAN KURATOR" : "CURATOR’S NOTE"}
                  </p>
                  <p className="mt-3 text-sm font-medium italic leading-relaxed">
                    {activeArtifact.note}
                  </p>
                </div>

                <div className="mt-10 border-t border-black/20 pt-4 text-[10px] font-black tracking-widest text-black/40">
                  SOME THINGS WERE NEVER SENT.
                </div>
              </article>

              <button
                type="button"
                onClick={() => setView({ type: "write" })}
                className="mt-6 flex w-full items-center justify-center gap-3 bg-[#D7FF64] px-5 py-4 text-xs font-black tracking-widest text-[#171717] transition hover:bg-[#F7F3E8]"
              >
                <Feather size={16} />
                {t.write}
                <ArrowRight size={16} />
              </button>
            </motion.section>
          )}

          {/* Personal letter editor */}
          {view.type === "write" && (
            <motion.section
              key="write"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="mx-auto max-w-3xl py-12 sm:py-16"
            >
              <button
                type="button"
                onClick={goBack}
                className="mb-10 inline-flex items-center gap-2 text-[10px] font-black tracking-widest text-white/50 hover:text-[#D7FF64]"
              >
                <ArrowLeft size={15} />
                {t.back}
              </button>

              <p className="text-xs font-bold tracking-[0.2em] text-[#D7FF64]">
                YOUR PERSONAL EXHIBIT / 007
              </p>
              <h2 className="mt-4 text-4xl font-black uppercase leading-[0.95] sm:text-6xl">
                {t.write}
                <span className="text-[#D7FF64]">.</span>
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/55">
                {t.writeDesc}
              </p>

              <div className="mt-9 space-y-6 border border-white/20 bg-white/[0.03] p-5 sm:p-8">
                <div>
                  <label
                    htmlFor="letter-title"
                    className="mb-2 block text-[10px] font-black tracking-widest text-white/60"
                  >
                    {t.title}
                  </label>
                  <input
                    id="letter-title"
                    value={letterTitle}
                    onChange={(event) => setLetterTitle(event.target.value)}
                    maxLength={90}
                    placeholder={t.titlePlaceholder}
                    className="w-full border border-white/20 bg-[#171717] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#D7FF64]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="letter-recipient"
                    className="mb-2 block text-[10px] font-black tracking-widest text-white/60"
                  >
                    {t.recipient}
                  </label>
                  <input
                    id="letter-recipient"
                    value={recipient}
                    onChange={(event) => setRecipient(event.target.value)}
                    maxLength={60}
                    placeholder={t.recipientPlaceholder}
                    className="w-full border border-white/20 bg-[#171717] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#D7FF64]"
                  />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <label
                      htmlFor="letter-body"
                      className="text-[10px] font-black tracking-widest text-white/60"
                    >
                      {t.body}
                    </label>
                    <span className="text-[10px] font-bold text-white/30">
                      {letterBody.length}/3000
                    </span>
                  </div>

                  <textarea
                    id="letter-body"
                    value={letterBody}
                    onChange={(event) =>
                      setLetterBody(event.target.value.slice(0, 3000))
                    }
                    rows={9}
                    maxLength={3000}
                    placeholder={t.bodyPlaceholder}
                    className="w-full resize-y border border-white/20 bg-[#171717] px-4 py-4 text-sm leading-relaxed text-white outline-none transition placeholder:text-white/25 focus:border-[#D7FF64]"
                  />
                </div>

                <p className="text-xs leading-relaxed text-white/40">
                  {t.disclaimer}
                </p>

                <button
                  type="button"
                  onClick={saveLetter}
                  className="flex w-full items-center justify-center gap-3 bg-[#D7FF64] px-5 py-4 text-xs font-black tracking-widest text-[#171717] transition hover:bg-[#F7F3E8]"
                >
                  <Feather size={17} />
                  {t.save}
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.section>
          )}

          {/* Letting go */}
          {view.type === "release" && (
            <motion.section
              key="release"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex min-h-[75vh] flex-col items-center justify-center py-12 text-center"
            >
              <AnimatePresence>
                {!released ? (
                  <motion.div
                    key="letter"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{
                      opacity: 0,
                      scale: 0.7,
                      y: -100,
                      rotate: 8,
                      filter: "blur(12px)",
                    }}
                    transition={{ duration: 1.4 }}
                    className="relative w-full max-w-md border border-black/10 bg-[#F7F3E8] p-7 text-left text-[#171717] shadow-[0_20px_100px_rgba(215,255,100,0.06)] sm:p-10"
                  >
                    <div className="flex items-center justify-between border-b border-black/20 pb-4">
                      <span className="text-[10px] font-black tracking-widest">
                        {t.created}
                      </span>
                      <Mail size={17} />
                    </div>

                    <h3 className="mt-7 break-words text-2xl font-black leading-tight">
                      {letterTitle.trim() ||
                        (isIndonesian
                          ? "Surat yang tak terkirim"
                          : "An unsent letter")}
                    </h3>

                    {recipient.trim() && (
                      <p className="mt-3 text-xs font-bold text-black/50">
                        {isIndonesian ? "Untuk:" : "To:"} {recipient}
                      </p>
                    )}

                    <p className="mt-6 whitespace-pre-wrap break-words text-sm leading-relaxed text-black/75">
                      {letterBody}
                    </p>

                    <div className="mt-8 border-t border-black/20 pt-4 text-[9px] font-black tracking-widest text-black/40">
                      404B / PERSONAL ARCHIVE
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="released"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mx-auto max-w-xl"
                  >
                    <motion.div
                      animate={{
                        rotate: [0, -8, 8, 0],
                        scale: [1, 1.05, 1],
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="mx-auto mb-8 flex size-24 items-center justify-center rounded-full border border-[#D7FF64]/40 bg-[#D7FF64]/10 text-[#D7FF64]"
                    >
                      <Sparkles size={38} strokeWidth={1} />
                    </motion.div>

                    <h2 className="text-4xl font-black uppercase leading-none sm:text-6xl">
                      {t.releasedTitle}
                    </h2>
                    <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-white/60">
                      {t.releasedText}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {!released ? (
                <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={exportLetter}
                    disabled={exporting}
                    className="flex flex-1 items-center justify-center gap-2 border border-white/25 px-4 py-4 text-xs font-black tracking-widest transition hover:border-[#D7FF64] hover:text-[#D7FF64] disabled:opacity-50"
                  >
                    <Download size={16} />
                    {exporting ? "EXPORTING..." : t.download}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setReleased(true);
                      setSaved(false);
                    }}
                    className="flex flex-1 items-center justify-center gap-2 bg-[#D7FF64] px-4 py-4 text-xs font-black tracking-widest text-[#171717] transition hover:bg-[#F7F3E8]"
                  >
                    <Sparkles size={16} />
                    {t.release}
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={resetMuseum}
                  className="mt-10 inline-flex items-center gap-3 border border-white/30 px-5 py-4 text-xs font-black tracking-widest transition hover:border-[#D7FF64] hover:text-[#D7FF64]"
                >
                  <ArrowLeft size={16} />
                  {t.restart}
                </button>
              )}

              {!released && (
                <p className="mt-6 max-w-sm text-[10px] leading-relaxed text-white/30">
                  {isIndonesian
                    ? "Melepaskan surat hanya mengubah pengalaman di layar. Tidak ada pesan yang dikirim atau disimpan ke server."
                    : "Letting go only changes the on-screen experience. No message is sent or saved to a server."}
                </p>
              )}
            </motion.section>
          )}
        </AnimatePresence>

        {/* Hidden export card */}
        {view.type === "release" && (
          <div
            aria-hidden="true"
            className="pointer-events-none fixed left-[-10000px] top-0"
          >
            <div
              ref={letterCardRef}
              className="w-[420px] bg-[#F7F3E8] p-10 text-[#171717]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              <div className="flex items-center justify-between border-b border-black/20 pb-5">
                <span className="font-sans text-[10px] font-black tracking-[0.2em]">
                  404 BRAINCELL
                </span>
                <span className="font-sans text-[10px] font-bold text-black/40">
                  ARCHIVE / 007
                </span>
              </div>

              <div className="py-8">
                <p className="font-sans text-[10px] font-black uppercase tracking-widest text-[#7957FF]">
                  {t.created}
                </p>
                <h2 className="mt-4 break-words text-4xl font-bold leading-tight">
                  {letterTitle.trim() ||
                    (isIndonesian
                      ? "Surat yang tak terkirim"
                      : "An unsent letter")}
                </h2>

                {recipient.trim() && (
                  <p className="mt-4 font-sans text-xs text-black/50">
                    {isIndonesian ? "Untuk:" : "To:"} {recipient}
                  </p>
                )}

                <p className="mt-7 whitespace-pre-wrap break-words text-base leading-[1.9]">
                  {letterBody}
                </p>
              </div>

              <div className="border-t border-black/20 pt-5">
                <p className="font-sans text-[10px] font-black tracking-widest">
                  SOME THINGS WERE NEVER SENT.
                </p>
                <p className="mt-2 font-sans text-[10px] text-black/45">
                  {isIndonesian
                    ? "Sebuah artefak pribadi dari The Museum of Unsent Things."
                    : "A personal artifact from The Museum of Unsent Things."}
                </p>
              </div>
            </div>
          </div>
        )}

        <footer className="relative mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/15 py-5">
          <span className="text-[9px] font-black tracking-[0.2em] text-white/35">
            {t.footer}
          </span>
          <span className="text-[9px] font-black tracking-[0.2em] text-white/35">
            404B © 2026
          </span>
        </footer>
      </div>
    </main>
  );
}
