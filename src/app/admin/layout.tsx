import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';

import { requireRole } from '@/lib/api-auth';
import { AdminHeader } from '@/views/Admin/components/AdminHeader';
import { AdminSectionNav } from '@/views/Admin/components/AdminSectionNav';

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
