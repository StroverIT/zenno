import type { Metadata } from 'next';

import { getAdminUsersForList } from '@/lib/admin-queries';
import { AdminUsersSectionClient } from '@/views/Admin/sections/AdminUsersSection';

export const metadata: Metadata = {
  title: 'Потребители',
  description: 'Управление на потребителски акаунти.',
};

export default async function AdminUsersPage() {
  const users = await getAdminUsersForList();
  return <AdminUsersSectionClient users={users} />;
}
