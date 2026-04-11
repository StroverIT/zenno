import { getAdminOverviewData } from '@/lib/admin-queries';
import { AdminOverviewClient } from '@/views/Admin/sections/AdminOverview';

export default async function AdminOverviewPage() {
  const data = await getAdminOverviewData();
  return <AdminOverviewClient {...data} />;
}
