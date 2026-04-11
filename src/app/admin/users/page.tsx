import { getAdminUsersForList } from '@/lib/admin-queries';
import { AdminUsersSectionClient } from '@/views/Admin/sections/AdminUsersSection';

export default async function AdminUsersPage() {
  const users = await getAdminUsersForList();
  return <AdminUsersSectionClient users={users} />;
}
