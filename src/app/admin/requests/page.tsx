import type { Metadata } from 'next';

import { getAdminPendingSubscriptionRequestsForList } from '@/lib/admin-queries';
import { AdminSubscriptionRequestsSectionClient } from '@/views/Admin/sections/AdminSubscriptionRequestsSection';

export const metadata: Metadata = {
  title: 'Заявки за абонамент',
  description: 'Чакащи заявки за месечни абонаменти към студиа.',
};

export default async function AdminSubscriptionRequestsPage() {
  const requests = await getAdminPendingSubscriptionRequestsForList();
  return <AdminSubscriptionRequestsSectionClient requests={requests} />;
}
