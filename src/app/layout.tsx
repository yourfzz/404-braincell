import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ToastProvider } from "@/components/ui/ToastContext";
import { LangProvider } from "@/contexts/LangContext";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-space-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "404 Braincell | Internet Playground for Tired Minds",
  description:
    "A playground for people with exactly one brain cell left. Press things. Generate nonsense. Lose approximately zero brain cells.",
  openGraph: {
    title: "404 Braincell | Internet Playground",
    description:
      "Welcome to the least productive corner of the internet. Free interactive absurdities.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F7F3E8] text-[#171717]">
        <LangProvider>
          <ToastProvider>
            <Navbar />
            <main className="flex-1 flex flex-col">{children}</main>
            <Footer />
          </ToastProvider>
        </LangProvider>
      </body>
    </html>
  );
}
