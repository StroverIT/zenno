import type { Metadata } from 'next';

import NotFound from '@/views/NotFound';

export const metadata: Metadata = {
  title: 'Страницата не е намерена',
  robots: { index: false, follow: false },
};

export default function NotFoundPage() {
  return <NotFound />;
}
