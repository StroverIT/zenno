import { getAdminStudiosForList } from '@/lib/admin-queries';
import { AdminStudiosSectionClient } from '@/views/Admin/sections/AdminStudiosSection';

export default async function AdminStudiosPage() {
  const studios = await getAdminStudiosForList();
  return <AdminStudiosSectionClient studios={studios} />;
}
