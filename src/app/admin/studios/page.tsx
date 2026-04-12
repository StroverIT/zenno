import type { Metadata } from 'next';

import { getAdminStudiosForList } from '@/lib/admin-queries';
import { AdminStudiosSectionClient } from '@/views/Admin/sections/AdminStudiosSection';

export const metadata: Metadata = {
  title: 'Студиа',
  description: 'Преглед и редакция на студиа в платформата.',
};

export default async function AdminStudiosPage() {
  const studios = await getAdminStudiosForList();
  return <AdminStudiosSectionClient studios={studios} />;
}
