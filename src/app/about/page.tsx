import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Coffee, ShieldCheck, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About | 404 Braincell',
  description:
    'The philosophy behind 404 Braincell: why the internet needs more playful nonsense and zero enterprise dashboards.',
};

export default function AboutPage() {
  const faqs = [
    {
      q: 'Why does this website exist?',
      a: 'Modern software is full of KPI dashboards, enterprise roadmaps, and synergy meetings. 404 Braincell exists to restore balance by delivering high-quality, completely useless interactive delight.',
    },
    {
      q: 'Will using this site make me smarter?',
      a: 'Scientifically speaking, no. In fact, our legal department recommends not counting on any cognitive gains whatsoever.',
    },
    {
      q: 'Where is my data stored?',
      a: 'Nowhere except your own browser localStorage. We do not track you, we do not have cookies, and we do not have a database because databases are stressful.',
    },
    {
      q: 'Is there a secret room?',
      a: 'We cannot confirm nor deny. But if you tap the logo or mash the red button enough times, strange phenomena may manifest.',
    },
  ];

  return (
    <div className="w-full py-12 md:py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-mono font-bold text-neutral-700 hover:text-[#FF5C35] mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>← Back to Playground</span>
        </Link>

        {/* Hero Banner */}
        <div className="bg-white rounded-3xl border-2 border-[#171717] brutalist-shadow-lg p-8 sm:p-12 mb-12">
          <div className="inline-block px-3 py-1 bg-[#D7FF64] text-[#171717] font-mono font-bold text-xs rounded-full border border-[#171717] mb-6">
            MANIFESTO V1.0
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#171717] tracking-tight uppercase mb-6 leading-tight">
            FOR PEOPLE WITH EXACTLY ONE BRAIN CELL LEFT.
          </h1>

          <div className="space-y-4 text-base sm:text-lg text-neutral-800 leading-relaxed font-medium">
            <p>
              Remember when the internet was a playground rather than a corporate performance metric? When clicking a button made something silly happen instead of prompting you for an annual enterprise subscription?
            </p>
            <p>
              <strong className="text-[#FF5C35]">404 Braincell</strong> is an homage to retro flash playgrounds, early net art, and the universal experience of having your brain melt at 3:15 PM on a Thursday afternoon.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t-2 border-[#171717]">
            <div className="p-4 bg-[#F7F3E8] rounded-xl border border-[#171717]">
              <div className="text-2xl mb-1">🔌</div>
              <h3 className="font-mono font-bold text-xs uppercase text-neutral-600 mb-1">Zero Backend</h3>
              <p className="text-xs text-neutral-800 font-medium">Runs 100% in client browser memory.</p>
            </div>
            <div className="p-4 bg-[#F7F3E8] rounded-xl border border-[#171717]">
              <div className="text-2xl mb-1">🎨</div>
              <h3 className="font-mono font-bold text-xs uppercase text-neutral-600 mb-1">Neo-Brutalist UI</h3>
              <p className="text-xs text-neutral-800 font-medium">Bold borders, playful stickers, raw typography.</p>
            </div>
            <div className="p-4 bg-[#F7F3E8] rounded-xl border border-[#171717]">
              <div className="text-2xl mb-1">🍕</div>
              <h3 className="font-mono font-bold text-xs uppercase text-neutral-600 mb-1">Instant Dopamine</h3>
              <p className="text-xs text-neutral-800 font-medium">Zero friction, zero signups, pure absurdity.</p>
            </div>
          </div>
        </div>

        {/* Absurd FAQ Section */}
        <div className="bg-white rounded-3xl border-2 border-[#171717] brutalist-shadow p-8 sm:p-10 mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-[#171717] tracking-tight mb-6">
            FREQUENTLY ASKED NONSENSE
          </h2>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-6 border-b border-neutral-200 last:border-b-0 last:pb-0">
                <h3 className="font-black text-base sm:text-lg text-[#171717] mb-2 flex items-start gap-2">
                  <span className="text-[#FF5C35] font-mono">Q:</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-sm sm:text-base text-neutral-700 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center py-6">
          <Link
            href="/"
            className="inline-flex px-8 py-4 bg-[#7957FF] text-white font-black text-base rounded-2xl brutalist-button"
          >
            Go Back &amp; Waste Some Time ↗
          </Link>
        </div>
      </div>
    </div>
  );
}
