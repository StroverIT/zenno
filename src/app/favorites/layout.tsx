import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { privateAreaRobots } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Любими студиа',
  description: 'Твоите запазени йога студиа на едно място.',
  robots: privateAreaRobots,
};

export default function FavoritesLayout({ children }: { children: ReactNode }) {
  return children;
}
