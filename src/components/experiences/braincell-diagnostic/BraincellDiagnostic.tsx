"use client";

import { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Brain,
  Check,
  Copy,
  Download,
  FileWarning,
  RotateCcw,
  ScanLine,
  Share2,
  Sparkles,
  Zap,
} from "lucide-react";

import { useLang } from "@/contexts/LangContext";
import {
  DIAGNOSTIC_RESULTS,
  MOOD_OPTIONS,
  type DiagnosticMood,
  type DiagnosticResult,
} from "@/data/braincell-diagnostic";

type ScanStatus = "idle" | "scanning" | "result";

export default function BraincellDiagnostic() {
  const { isIndonesian } = useLang();
  const lang = isIndonesian ? "id" : "en";

  const moods = MOOD_OPTIONS[lang];

  const [name, setName] = useState("");
  const [selectedMood, setSelectedMood] = useState<DiagnosticMood>("random");
  const [status, setStatus] = useState<ScanStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const reportRef = useRef<HTMLDivElement | null>(null);
  const storyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (status !== "scanning") return;

    const timer = window.setInterval(() => {
      setProgress((previous) => {
        const next = Math.min(previous + 2, 100);

        if (next >= 100) {
          window.clearInterval(timer);
          window.setTimeout(() => setStatus("result"), 250);
        }

        return next;
      });
    }, 55);

    return () => window.clearInterval(timer);
  }, [status]);

  const selectResult = (): DiagnosticResult => {
    const allResults = DIAGNOSTIC_RESULTS[lang];

    const matchingResults =
      selectedMood === "random"
        ? allResults
        : allResults.filter(
            (item) => item.mood === selectedMood || item.mood === "random",
          );

    const pool = matchingResults.length > 0 ? matchingResults : allResults;

    const previousId = result?.id;
    const alternatives = pool.filter((item) => item.id !== previousId);

    const available = alternatives.length > 0 ? alternatives : pool;

    return available[Math.floor(Math.random() * available.length)];
  };

  const startScan = () => {
    setResult(selectResult());
    setProgress(0);
    setCopied(false);
    setStatus("scanning");
  };

  const resetScan = () => {
    setStatus("idle");
    setProgress(0);
    setResult(null);
    setCopied(false);
  };

  const displayName =
    name.trim() || (isIndonesian ? "SUBJEK TIDAK DIKENAL" : "UNKNOWN SUBJECT");

  const reportCaption = result
    ? isIndonesian
      ? `HASIL PEMERIKSAAN BRAINCELL\nSubjek: ${displayName}\nDiagnosis: ${result.title}\n${result.subtitle}\n\n"${result.quote}"\n\nDiperiksa oleh 404 Braincell. Bukan diagnosis medis.\n#404Braincell #BraincellDiagnostic`
      : `BRAINCELL DIAGNOSTIC REPORT\nSubject: ${displayName}\nDiagnosis: ${result.title}\n${result.subtitle}\n\n"${result.quote}"\n\nDiagnosed by 404 Braincell. Not a medical diagnosis.\n#404Braincell #BraincellDiagnostic`
    : "";

  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      window.prompt(isIndonesian ? "Salin teks ini:" : "Copy this text:", text);
      return false;
    }
  };

  const handleCopy = async () => {
    if (!reportCaption) return;

    const success = await copyText(reportCaption);
    setCopied(success);

    if (success) {
      window.setTimeout(() => setCopied(false), 1800);
    }
  };

  const createImage = async (
    element: HTMLDivElement,
    width: number,
    height: number,
  ) => {
    return toPng(element, {
      cacheBust: true,
      pixelRatio: 3,
      width,
      height,
      backgroundColor: "#171717",
      style: {
        transform: "none",
        margin: "0",
      },
    });
  };

  const downloadImage = (dataUrl: string, filename: string) => {
    const link = document.createElement("a");
    link.download = filename;
    link.href = dataUrl;
    link.click();
  };

  const handleDownload = async (story = false) => {
    const element = story ? storyRef.current : reportRef.current;
    if (!element || isExporting) return;

    setIsExporting(true);

    try {
      const width = story ? 360 : element.offsetWidth;
      const height = story ? 640 : element.offsetHeight;
      const image = await createImage(element, width, height);

      downloadImage(
        image,
        story
          ? "404-braincell-diagnostic-story.png"
          : "404-braincell-diagnostic-report.png",
      );
    } catch (error) {
      console.error("Diagnostic export failed:", error);

      window.alert(
        isIndonesian
          ? "Gagal mengekspor gambar. Silakan coba lagi."
          : "Could not export the image. Please try again.",
      );
    } finally {
      setIsExporting(false);
    }
  };

  const handleShare = async () => {
    if (!result || !storyRef.current || isSharing) return;

    setIsSharing(true);

    try {
      const dataUrl = await createImage(storyRef.current, 360, 640);
      const response = await fetch(dataUrl);
      const blob = await response.blob();

      const file = new File([blob], "404-braincell-diagnostic-story.png", {
        type: "image/png",
      });

      if (
        typeof navigator.share === "function" &&
        typeof navigator.canShare === "function" &&
        navigator.canShare({ files: [file] })
      ) {
        await navigator.share({
          title: "404 Braincell Diagnostic Report",
          text: reportCaption,
          files: [file],
        });
      } else {
        downloadImage(dataUrl, "404-braincell-diagnostic-story.png");
        await copyText(reportCaption);

        window.alert(
          isIndonesian
            ? "Share gambar langsung tidak didukung browser ini. Gambar sudah diunduh dan caption siap disalin."
            : "Direct image sharing is not supported by this browser. The image was downloaded and the caption is ready to copy.",
        );
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }

      console.error("Diagnostic sharing failed:", error);

      window.alert(
        isIndonesian
          ? "Gagal membagikan hasil. Coba download Story terlebih dahulu."
          : "Could not share the result. Try downloading the Story instead.",
      );
    } finally {
      setIsSharing(false);
    }
  };

  const interfaceText = {
    eyebrow: isIndonesian
      ? "404B / PUSAT DIAGNOSTIK"
      : "404B / DIAGNOSTIC CENTER",
    headline: isIndonesian
      ? "ADA YANG TIDAK BERES."
      : "SOMETHING IS NOT RIGHT.",
    description: isIndonesian
      ? "Sistem mendeteksi aktivitas otak yang mencurigakan. Jalankan pemindaian untuk mengetahui kekacauan yang terjadi."
      : "Our system detected suspicious brain activity. Run a scan to identify the chaos.",
    subject: isIndonesian ? "NAMA SUBJEK" : "SUBJECT NAME",
    placeholder: isIndonesian
      ? "Masukkan nama panggilan..."
      : "Enter a nickname...",
    mood: isIndonesian ? "KONDISI SAAT INI" : "CURRENT CONDITION",
    scan: isIndonesian ? "MULAI PEMINDAIAN" : "INITIATE SCAN",
    scanning: isIndonesian ? "MEMINDAI BRAINCELL..." : "SCANNING BRAINCELLS...",
    report: isIndonesian ? "LAPORAN DIAGNOSTIK" : "DIAGNOSTIC REPORT",
    subjectId: isIndonesian ? "IDENTITAS SUBJEK" : "SUBJECT IDENTIFICATION",
    finalDiagnosis: isIndonesian ? "HASIL DIAGNOSIS" : "FINAL DIAGNOSIS",
    recommendation: isIndonesian
      ? "REKOMENDASI SISTEM"
      : "SYSTEM RECOMMENDATION",
    disclaimer: isIndonesian
      ? "Hanya untuk hiburan. Bukan diagnosis medis atau penilaian kesehatan mental."
      : "For entertainment only. Not a medical or mental health assessment.",
  };

  const terminalLines = isIndonesian
    ? [
        "Menghubungkan 1 braincell yang tersisa...",
        "Memeriksa folder overthinking...",
        "Menganalisis keputusan pukul 02.00...",
        "Mencari motivasi yang hilang...",
        "Menyusun laporan yang tidak diminta...",
      ]
    : [
        "Connecting the last remaining braincell...",
        "Inspecting the overthinking folder...",
        "Analyzing 2 AM decisions...",
        "Searching for missing motivation...",
        "Preparing an unsolicited report...",
      ];

  const terminalIndex = Math.min(
    Math.floor(progress / 21),
    terminalLines.length - 1,
  );

  return (
    <main className="min-h-screen overflow-hidden bg-[#F7F3E8] px-4 py-10 text-[#171717] sm:px-6 sm:py-16">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 border-2 border-[#171717] bg-[#D7FF64] px-3 py-2 text-xs font-black tracking-widest">
              <Activity size={15} />
              {interfaceText.eyebrow}
            </span>

            <span className="border-2 border-[#171717] px-3 py-2 text-[10px] font-black tracking-widest">
              SYSTEM v0.404
            </span>
          </div>

          <h1 className="max-w-4xl text-5xl font-black uppercase leading-[0.88] tracking-tight sm:text-7xl md:text-8xl">
            BRAINCELL
            <br />
            <span className="text-[#FF5C35]">DIAGNOSTIC</span>
            <br />
            CENTER<span className="text-[#7957FF]">.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-sm font-medium leading-relaxed sm:text-base">
            {interfaceText.description}
          </p>
        </motion.header>

        {/* Input panel */}
        {status === "idle" && (
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-4 border-[#171717] bg-white p-5 shadow-[7px_7px_0_#171717] sm:p-8"
          >
            <div className="mb-6 flex items-center gap-3 border-b-2 border-dashed border-[#171717]/25 pb-5">
              <div className="flex size-12 items-center justify-center bg-[#171717] text-[#D7FF64]">
                <Brain size={26} />
              </div>
              <div>
                <h2 className="font-black uppercase">
                  {isIndonesian ? "FORMULIR SUBJEK" : "SUBJECT INTAKE FORM"}
                </h2>
                <p className="text-xs font-medium text-black/60">
                  {isIndonesian
                    ? "Informasi ini hanya digunakan di sesi ini."
                    : "This information is only used in this session."}
                </p>
              </div>
            </div>

            <label className="mb-2 block text-xs font-black uppercase tracking-widest">
              {interfaceText.subject}
            </label>

            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              maxLength={32}
              placeholder={interfaceText.placeholder}
              className="mb-7 w-full border-2 border-[#171717] bg-[#F7F3E8] px-4 py-4 text-base font-bold outline-none transition placeholder:font-medium placeholder:text-black/40 focus:border-[#7957FF]"
            />

            <p className="mb-3 text-xs font-black uppercase tracking-widest">
              {interfaceText.mood}
            </p>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {moods.map((item) => {
                const active = selectedMood === item.value;

                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() =>
                      setSelectedMood(item.value as DiagnosticMood)
                    }
                    className={`flex items-center gap-3 border-2 border-[#171717] px-4 py-3 text-left text-xs font-black transition ${
                      active
                        ? "bg-[#D7FF64] shadow-[3px_3px_0_#171717]"
                        : "bg-white hover:bg-[#F7F3E8]"
                    }`}
                  >
                    <span className="text-xl">{item.emoji}</span>
                    <span>{item.label}</span>
                    {active && <Check size={16} className="ml-auto" />}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={startScan}
              className="mt-8 flex w-full items-center justify-center gap-3 border-2 border-[#171717] bg-[#FF5C35] px-5 py-4 text-sm font-black tracking-wider text-white transition hover:-translate-y-1 hover:shadow-[5px_5px_0_#171717]"
            >
              <ScanLine size={20} />
              {interfaceText.scan}
              <ArrowRight size={18} />
            </button>

            <p className="mt-4 text-center text-[10px] font-bold uppercase tracking-widest text-black/50">
              {isIndonesian
                ? "PERINGATAN: HASIL DAPAT MENYINGGUNG BRAINCELL"
                : "WARNING: RESULTS MAY OFFEND YOUR BRAINCELLS"}
            </p>
          </motion.section>
        )}

        {/* Scanning screen */}
        <AnimatePresence mode="wait">
          {status === "scanning" && (
            <motion.section
              key="scanning"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="relative overflow-hidden border-4 border-[#171717] bg-[#171717] p-5 text-[#F7F3E8] shadow-[7px_7px_0_#7957FF] sm:p-8"
            >
              <div className="absolute inset-0 opacity-20">
                <div className="h-full w-full bg-[linear-gradient(transparent_50%,rgba(215,255,100,0.2)_50%)] bg-[length:100%_6px]" />
              </div>

              <div className="relative z-10">
                <div className="mb-8 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <ScanLine size={30} className="text-[#D7FF64]" />
                    </motion.div>
                    <div>
                      <h2 className="font-black uppercase">
                        {interfaceText.scanning}
                      </h2>
                      <p className="mt-1 text-xs text-white/50">
                        SUBJECT: {displayName}
                      </p>
                    </div>
                  </div>

                  <span className="font-mono text-2xl font-black text-[#D7FF64]">
                    {progress}%
                  </span>
                </div>

                {/* Scan animation */}
                <div className="relative mb-8 flex h-48 items-center justify-center overflow-hidden border border-white/20 bg-white/[0.03] sm:h-64">
                  <motion.div
                    animate={{ opacity: [0.25, 1, 0.25] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    className="absolute size-36 rounded-full border-2 border-[#D7FF64] sm:size-44"
                  />

                  <motion.div
                    animate={{ scale: [1, 1.18, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute size-24 rounded-full border border-[#7957FF] sm:size-32"
                  />

                  <motion.div
                    animate={{ y: [-75, 75, -75] }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute h-[2px] w-full bg-[#D7FF64] shadow-[0_0_18px_#D7FF64]"
                  />

                  <Brain
                    size={76}
                    strokeWidth={1.2}
                    className="relative z-10 text-[#D7FF64]"
                  />
                </div>

                <div className="mb-4 h-3 border border-white/40 p-[2px]">
                  <motion.div
                    className="h-full bg-[#D7FF64]"
                    animate={{ width: `${progress}%` }}
                  />
                </div>

                <div className="min-h-12 border-l-2 border-[#FF5C35] pl-3 font-mono text-xs leading-relaxed text-[#D7FF64] sm:text-sm">
                  <p>
                    {">"} {terminalLines[terminalIndex]}
                  </p>
                  <p className="mt-1 text-white/50">
                    {">"}{" "}
                    {isIndonesian
                      ? "Mohon jangan matikan otak..."
                      : "Please do not turn off your brain..."}
                  </p>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence mode="wait">
          {status === "result" && result && (
            <motion.section
              key={`result-${result.id}-${displayName}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Visible report */}
              <div
                ref={reportRef}
                className="overflow-hidden border-4 border-[#171717] bg-[#F7F3E8] shadow-[7px_7px_0_#171717] sm:shadow-[10px_10px_0_#171717]"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b-4 border-[#171717] bg-[#171717] px-4 py-4 text-[#F7F3E8] sm:px-6">
                  <div className="flex items-center gap-3">
                    <Activity size={22} className="text-[#D7FF64]" />
                    <div>
                      <p className="text-xs font-black tracking-widest">
                        404 BRAINCELL
                      </p>
                      <p className="mt-1 text-[10px] font-bold text-white/60">
                        {interfaceText.report}
                      </p>
                    </div>
                  </div>

                  <span className="border border-[#D7FF64] px-3 py-2 text-[10px] font-black text-[#D7FF64]">
                    SCAN COMPLETE
                  </span>
                </div>

                <div className="p-5 sm:p-8">
                  <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#7957FF]">
                        {interfaceText.subjectId}
                      </p>
                      <h2 className="mt-2 break-words text-2xl font-black uppercase sm:text-3xl">
                        {displayName}
                      </h2>
                    </div>

                    <div className="rotate-[-5deg] border-2 border-[#FF5C35] px-3 py-2 text-center text-[10px] font-black uppercase text-[#FF5C35]">
                      BRAIN
                      <br />
                      UNSTABLE
                    </div>
                  </div>

                  <div className="border-2 border-[#171717] bg-[#D7FF64] p-5 sm:p-7">
                    <p className="text-xs font-black uppercase tracking-[0.2em]">
                      {interfaceText.finalDiagnosis}
                    </p>
                    <h3 className="mt-3 break-words text-3xl font-black uppercase leading-[0.95] sm:text-5xl">
                      {result.title}
                    </h3>
                    <p className="mt-4 text-sm font-bold">{result.subtitle}</p>
                  </div>

                  <p className="mt-6 text-sm font-medium leading-relaxed sm:text-base">
                    {result.description}
                  </p>

                  <div className="my-7 space-y-5">
                    {result.stats.map((stat, index) => {
                      const colors = [
                        "bg-[#7957FF]",
                        "bg-[#FF5C35]",
                        "bg-[#D7FF64]",
                      ];

                      return (
                        <div key={stat.label}>
                          <div className="mb-2 flex items-center justify-between gap-3">
                            <span className="text-xs font-black uppercase">
                              {stat.label}
                            </span>
                            <span className="text-sm font-black">
                              {stat.value}%
                            </span>
                          </div>

                          <div className="h-3 border-2 border-[#171717] p-[1px]">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${stat.value}%` }}
                              transition={{
                                duration: 0.7,
                                delay: index * 0.12,
                              }}
                              className={`h-full ${colors[index % colors.length]}`}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="border-l-4 border-[#7957FF] bg-white/60 p-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#7957FF]">
                      {isIndonesian
                        ? "PESAN DARI SISTEM"
                        : "MESSAGE FROM THE SYSTEM"}
                    </p>
                    <p className="mt-3 text-base font-bold italic leading-relaxed sm:text-lg">
                      &ldquo;{result.quote}&rdquo;
                    </p>
                  </div>

                  <div className="mt-6 border-2 border-[#171717] p-4">
                    <p className="flex items-center gap-2 text-xs font-black uppercase tracking-widest">
                      <Zap size={16} />
                      {interfaceText.recommendation}
                    </p>
                    <p className="mt-3 text-sm font-medium leading-relaxed">
                      {result.recommendation}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t-2 border-dashed border-[#171717]/30 pt-4">
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      404B / REPORT-{result.id.toUpperCase()}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      NOT MEDICAL ADVICE
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={resetScan}
                  className="inline-flex items-center gap-2 border-2 border-[#171717] bg-[#FF5C35] px-4 py-3 text-xs font-black uppercase text-white transition hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#171717]"
                >
                  <RotateCcw size={16} />
                  {isIndonesian ? "SCAN LAGI" : "SCAN AGAIN"}
                </button>

                <button
                  type="button"
                  disabled={isExporting}
                  onClick={() => handleDownload(false)}
                  className="inline-flex items-center gap-2 border-2 border-[#171717] bg-white px-4 py-3 text-xs font-black uppercase transition hover:bg-[#D7FF64] disabled:opacity-50"
                >
                  <Download size={16} />
                  {isExporting
                    ? isIndonesian
                      ? "MENGEKSPOR..."
                      : "EXPORTING..."
                    : isIndonesian
                      ? "DOWNLOAD REPORT"
                      : "DOWNLOAD REPORT"}
                </button>

                <button
                  type="button"
                  disabled={isExporting}
                  onClick={() => handleDownload(true)}
                  className="inline-flex items-center gap-2 border-2 border-[#171717] bg-[#D7FF64] px-4 py-3 text-xs font-black uppercase transition hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#171717] disabled:opacity-50"
                >
                  <Download size={16} />
                  STORY 9:16
                </button>

                <button
                  type="button"
                  disabled={isSharing}
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 border-2 border-[#171717] bg-[#7957FF] px-4 py-3 text-xs font-black uppercase text-white transition hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#171717] disabled:opacity-50"
                >
                  <Share2 size={16} />
                  {isSharing
                    ? isIndonesian
                      ? "MEMBAGIKAN..."
                      : "SHARING..."
                    : isIndonesian
                      ? "SHARE RESULT"
                      : "SHARE RESULT"}
                </button>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-2 border-2 border-[#171717] bg-white px-4 py-3 text-xs font-black uppercase transition hover:bg-[#D7FF64]"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied
                    ? isIndonesian
                      ? "TERSALIN!"
                      : "COPIED!"
                    : isIndonesian
                      ? "COPY CAPTION"
                      : "COPY CAPTION"}
                </button>
              </div>

              <p className="flex items-start gap-2 text-xs font-medium leading-relaxed text-black/60">
                <AlertTriangle size={16} className="mt-0.5 shrink-0" />
                {interfaceText.disclaimer}
              </p>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Terminal footer */}
        <footer className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t-2 border-[#171717] pt-5">
          <div className="flex items-center gap-2">
            <FileWarning size={15} />
            <span className="text-[10px] font-black uppercase tracking-widest">
              {isIndonesian
                ? "HASIL TIDAK DIJAMIN BERGUNA"
                : "RESULTS NOT GUARANTEED TO BE USEFUL"}
            </span>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest">
            POWERED BY QUESTIONABLE SCIENCE
          </span>
        </footer>
      </div>

      {/* Hidden 9:16 Story export */}
      {result && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed left-[-10000px] top-0"
        >
          <div
            ref={storyRef}
            className="relative flex h-[640px] w-[360px] flex-col overflow-hidden bg-[#171717] p-6 text-[#F7F3E8]"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            <div className="absolute -right-16 top-24 size-48 rounded-full bg-[#7957FF]" />
            <div className="absolute -left-12 bottom-28 size-40 rounded-full bg-[#FF5C35]" />

            <div className="relative z-10 flex items-center justify-between border-b border-white/25 pb-4">
              <span className="text-xs font-black tracking-[0.2em]">
                404 BRAINCELL®
              </span>
              <span className="text-[10px] font-bold">DIAGNOSTIC CENTER</span>
            </div>

            <div className="relative z-10 mt-7">
              <div className="inline-block rotate-[-5deg] border-2 border-[#FF5C35] px-3 py-2 text-xs font-black text-[#FF5C35]">
                CLASSIFIED REPORT
              </div>

              <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.25em] text-[#D7FF64]">
                {isIndonesian ? "SUBJEK DIAGNOSIS" : "DIAGNOSTIC SUBJECT"}
              </p>

              <p className="mt-2 break-words text-lg font-black uppercase">
                {displayName}
              </p>

              <h2 className="mt-4 break-words text-4xl font-black uppercase leading-[0.9]">
                {result.title}
              </h2>

              <p className="mt-3 text-xs font-bold text-[#D7FF64]">
                {result.subtitle}
              </p>
            </div>

            <div className="relative z-10 mt-7 border-2 border-[#F7F3E8] bg-[#F7F3E8] p-4 text-[#171717]">
              <p className="text-[10px] font-black uppercase tracking-widest">
                {isIndonesian ? "STATISTIK BRAINCELL" : "BRAINCELL METRICS"}
              </p>

              <div className="mt-4 space-y-4">
                {result.stats.map((stat, index) => (
                  <div key={stat.label}>
                    <div className="mb-1 flex items-center justify-between gap-2 text-[10px] font-black">
                      <span>{stat.label}</span>
                      <span>{stat.value}%</span>
                    </div>

                    <div className="h-2 border border-[#171717] p-[1px]">
                      <div
                        className={`h-full ${
                          index === 0
                            ? "bg-[#7957FF]"
                            : index === 1
                              ? "bg-[#FF5C35]"
                              : "bg-[#D7FF64]"
                        }`}
                        style={{ width: `${stat.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-5 border-l-4 border-[#D7FF64] pl-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#D7FF64]">
                {isIndonesian ? "PESAN DARI SISTEM" : "SYSTEM MESSAGE"}
              </p>
              <p className="mt-2 text-sm font-bold italic leading-relaxed">
                &ldquo;{result.quote}&rdquo;
              </p>
            </div>

            <div className="relative z-10 mt-auto border-t border-white/25 pt-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#FF5C35]">
                {isIndonesian ? "REKOMENDASI" : "RECOMMENDATION"}
              </p>

              <p className="mt-2 text-xs font-medium leading-relaxed">
                {result.recommendation}
              </p>

              <div className="mt-5 flex items-center justify-between gap-2 text-[9px] font-bold tracking-wider text-white/60">
                <span>NOT A MEDICAL DIAGNOSIS</span>
                <span>404B / 0087</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Small decorative icon for screen readers / bundler consistency */}
      <span className="sr-only">
        <Sparkles aria-hidden="true" />
      </span>
    </main>
  );
}
