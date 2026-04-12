import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Класове',
  description: 'Създавай и редактирай единични класове за студиата си.',
};

export default function DashboardClassesLayout({ children }: { children: ReactNode }) {
  return children;
}
