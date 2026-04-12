import type { Metadata } from 'next';

import { getAdminOverviewData } from '@/lib/admin-queries';
import { AdminOverviewClient } from '@/views/Admin/sections/AdminOverview';

export const metadata: Metadata = {
  title: 'Преглед',
  description: 'Показатели, абонаменти и активност в платформата.',
};

export default async function AdminOverviewPage() {
  const data = await getAdminOverviewData();
  return <AdminOverviewClient {...data} />;
}
