import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { AdminHeader } from '@/views/Admin/components/AdminHeader';
import { AdminSectionNav } from '@/views/Admin/components/AdminSectionNav';
import { privateAreaRobots } from '@/lib/site';

export const metadata: Metadata = {
  title: {
    default: 'Админ',
    template: '%s | Админ',
  },
  description: 'Административна конзола на платформата.',
  robots: privateAreaRobots,
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <AdminHeader />

      <div className="container mx-auto px-4 py-8">
        <AdminSectionNav />
        {children}
      </div>
    </div>
  );
}
