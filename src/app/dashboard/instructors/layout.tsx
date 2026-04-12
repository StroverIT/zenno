import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Инструктори',
  description: 'Добавяй и управлявай инструкторите в студиата си.',
};

export default function DashboardInstructorsLayout({ children }: { children: ReactNode }) {
  return children;
}
