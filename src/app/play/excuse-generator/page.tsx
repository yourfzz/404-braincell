import type { Metadata } from 'next';
import ExcuseGeneratorExperience from '@/components/experiences/ExcuseGeneratorExperience';

export const metadata: Metadata = {
  title: 'Excuse Generator | 404 Braincell',
  description:
    'Generate bulletproof HR-compliant and unhinged excuses for work, college, and life. Zero responsibility guaranteed.',
};

export default function ExcuseGeneratorPage() {
  return <ExcuseGeneratorExperience />;
}
