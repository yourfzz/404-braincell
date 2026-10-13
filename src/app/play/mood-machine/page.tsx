import type { Metadata } from 'next';
import { Suspense } from 'react';
import MoodMachineExperience from '@/components/experiences/MoodMachineExperience';

export const metadata: Metadata = {
  title: 'Mood Machine | 404 Braincell',
  description:
    'Absurd personality & mood generator for people running on 1% battery and pure vibes.',
};

interface PageProps {
  searchParams: Promise<{ result?: string }>;
}

async function MoodMachineContent({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  return <MoodMachineExperience initialResultId={resolvedParams.result} />;
}

export default function MoodMachinePage({ searchParams }: PageProps) {
  return (
    <Suspense fallback={<div className="flex-1 flex items-center justify-center font-mono text-sm text-neutral-500">Synthesizing mood...</div>}>
      <MoodMachineContent searchParams={searchParams} />
    </Suspense>
  );
}
