import { Achievement } from '@/types';

export const ACHIEVEMENTS_ID: Record<string, Pick<Achievement, 'title' | 'description'>> = {
  'first-blood': {
    title: 'Rasa Ingin Tahu Bikin Produktivitas Mati',
    description: 'Pencet The Button padahal udah dikasih peringatan jangan disentuh.',
  },
  'curiosity-killed-the-cat': {
    title: 'Overthinker Kronis',
    description: 'Pencet The Button 10 kali. Keyboard lo layak dapat bonus bahaya.',
  },
  'button-masher': {
    title: 'Penantang Otoritas',
    description: 'Sampai 25 klik di The Button. Ngeyel total sama aturan.',
  },
  'mood-master': {
    title: 'Petualang Eksistensial',
    description: 'Racik banyak arketipe absurd pakai Mood Machine.',
  },
  'excuse-artist': {
    title: 'Pembolos Bersertifikat',
    description: 'Bikin alasan anti tembus buat kabur dari semua tanggung jawab.',
  },
  'found-secret': {
    title: 'Hacker Nol Besar',
    description: 'Menemukan dan menyusup ke Brankas Rahasia 404 Braincell.',
  },
  'brain-recharged': {
    title: 'Overclocker Neuron',
    description: 'Tap braincell kosmik rahasia buat overclock gelombang otak baseline.',
  },
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-blood',
    title: 'Curiosity Killed Productivity',
    description: 'Pressed The Button despite explicit instructions not to touch it.',
    icon: '🔴',
  },
  {
    id: 'curiosity-killed-the-cat',
    title: 'Persistent Overthinker',
    description: 'Pressed The Button 10 times. Your keyboard deserves hazard pay.',
    icon: '⚡',
  },
  {
    id: 'button-masher',
    title: 'Defier of Authority',
    description: 'Reached 25 clicks on The Button. Total defiance of authority.',
    icon: '👑',
  },
  {
    id: 'mood-master',
    title: 'Existential Hopper',
    description: 'Synthesized multiple absurd archetypes with the Mood Machine.',
    icon: '🌀',
  },
  {
    id: 'excuse-artist',
    title: 'Certified Shirker',
    description: 'Generated bulletproof excuses for avoiding all responsibility.',
    icon: '📜',
  },
  {
    id: 'found-secret',
    title: 'Hacker of Nothing',
    description: 'Discovered and infiltrated the 404 Braincell Secret Vault.',
    icon: '🕵️',
  },
  {
    id: 'brain-recharged',
    title: 'Neuron Overclocker',
    description: 'Tapped the secret cosmic brain cell to overclock baseline brainwaves.',
    icon: '🔋',
  },
];

