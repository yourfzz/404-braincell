import type { Metadata } from 'next';
import TheButtonExperience from '@/components/experiences/TheButtonExperience';

export const metadata: Metadata = {
  title: 'The Button | 404 Braincell',
  description: 'Whatever you do, absolutely do not press this large red button.',
};

export default function TheButtonPage() {
  return <TheButtonExperience />;
}
