import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { sessionToNavUser } from '@/lib/nav-user';
import { DashboardShell } from '@/views/Dashboard/DashboardShell';
import { privateAreaRobots } from '@/lib/site';

export const metadata: Metadata = {
  title: {
    default: 'Табло',
    template: '%s | Табло',
  },
  description: 'Управление на студиа, класове, инструктори и разписание.',
  robots: privateAreaRobots,
};

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);
  const u = sessionToNavUser(session);
  const serverDisplayName = u?.name?.trim() ? u.name : undefined;

  return <DashboardShell serverDisplayName={serverDisplayName}>{children}</DashboardShell>;
}
