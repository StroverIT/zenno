import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Студиа',
  description: 'Управлявай студиата си: данни, снимки и настройки за записване.',
};

export default function DashboardStudiosLayout({ children }: { children: ReactNode }) {
  return children;
}
