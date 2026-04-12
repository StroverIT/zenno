import type { Metadata } from 'next';

import { getAdminReviewsForList } from '@/lib/admin-queries';
import { AdminReviewsSectionClient } from '@/views/Admin/sections/AdminReviewsSection';

export const metadata: Metadata = {
  title: 'Отзиви',
  description: 'Модерация и преглед на отзиви за студиа.',
};

export default async function AdminReviewsPage() {
  const reviews = await getAdminReviewsForList();
  return <AdminReviewsSectionClient reviews={reviews} />;
}
