import type { Metadata } from 'next';
import NotFoundClient from '@/NotFoundClient';

export const metadata: Metadata = {
  title: 'not-found',
  description:
    'The page you are looking for does not exist or may have been moved',
  openGraph: {
    title: 'not-found',
    description:
      'The page you are looking for does not exist or may have been moved',
    url: 'https://08-zustand-ibkv.vercel.app/not-found',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function NotFoundPage() {
  return <NotFoundClient />;
}
