import { getAdminPendingSubscriptionRequestsForList } from '@/lib/admin-queries';
import { AdminSubscriptionRequestsSectionClient } from '@/views/Admin/sections/AdminSubscriptionRequestsSection';

export default async function AdminSubscriptionRequestsPage() {
  const requests = await getAdminPendingSubscriptionRequestsForList();
  return <AdminSubscriptionRequestsSectionClient requests={requests} />;
}
