import { getAdminReviewsForList } from '@/lib/admin-queries';
import { AdminReviewsSectionClient } from '@/views/Admin/sections/AdminReviewsSection';

export default async function AdminReviewsPage() {
  const reviews = await getAdminReviewsForList();
  return <AdminReviewsSectionClient reviews={reviews} />;
}
