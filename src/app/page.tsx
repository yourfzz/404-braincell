import type { Metadata } from "next";
import HeroSection from "@/components/playground/HeroSection";
import BrainStatusTicker from "@/components/playground/BrainStatusTicker";
import ExperienceGrid from "@/components/playground/ExperienceGrid";
import InteractiveSandbox from "@/components/playground/InteractiveSandbox";

export const metadata: Metadata = {
  title:
    "404 Braincell - A Playground for People with Exactly One Brain Cell Left",
  description:
    "Welcome to the internet’s least productive corner. Press things. Generate absurd excuses. Diagnose unhinged moods. Lose zero brain cells.",
  openGraph: {
    title:
      "404 Braincell - A Playground for People with Exactly One Brain Cell Left",
    description:
      "Absurd, fun, interactive web playground featuring The Button, Mood Machine, and Excuse Generator.",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <main className="w-full flex flex-col min-h-[calc(100vh-140px)]">
      <HeroSection />
      <BrainStatusTicker />
      <ExperienceGrid />
      <InteractiveSandbox />
    </main>
  );
}
