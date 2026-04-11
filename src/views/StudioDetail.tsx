'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import {
  mockStudios,
  mockInstructors,
  mockClasses,
  mockReviews,
  mockSchedule,
  mockSubscriptions,
} from '@/data/mock-data';
import { useAuth } from '@/contexts/AuthContext';
import { StudioNotFound } from '@/components/studio-detail/studio-not-found';
import { StudioDetailGallery } from '@/components/studio-detail/studio-detail-gallery';
import { StudioDetailSummary } from '@/components/studio-detail/studio-detail-summary';
import { StudioDetailTabs } from '@/components/studio-detail/studio-detail-tabs';
import { StudioDetailSidebar } from '@/components/studio-detail/studio-detail-sidebar';

const StudioDetail = () => {
  const params = useParams();
  const id = params?.id as string | undefined;
  const { isAuthenticated } = useAuth();

  const studio = mockStudios.find((s) => s.id === id);
  if (!studio) return <StudioNotFound />;

  const studioInstructors = mockInstructors.filter((i) => i.studioId === id);
  const studioClasses = mockClasses.filter((c) => c.studioId === id);
  const studioReviews = mockReviews.filter((r) => r.targetId === id && r.targetType === 'studio');
  const studioSchedule = mockSchedule.filter((s) => s.studioId === id);
  const subscription = mockSubscriptions.find((s) => s.studioId === id);

  const handleBook = (classId: string) => {
    if (!isAuthenticated) {
      toast.error('Моля, влезте в акаунта си, за да се запишете.');
      return;
    }
    const cls = studioClasses.find((c) => c.id === classId);
    if (!cls) return;
    if (cls.enrolled >= cls.maxCapacity) {
      toast.info('Класът е пълен. Добавени сте в списъка на изчакване.');
    } else {
      toast.success('Успешно се записахте за класа!');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/discover"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Обратно към търсене
      </Link>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <StudioDetailGallery images={studio.images} />
          <StudioDetailSummary studio={studio} />
          <StudioDetailTabs
            studioSchedule={studioSchedule}
            subscription={subscription}
            studioClasses={studioClasses}
            studioInstructors={studioInstructors}
            studioReviews={studioReviews}
            onBookClass={handleBook}
          />
        </div>

        <StudioDetailSidebar studio={studio} />
      </div>
    </div>
  );
};

export default StudioDetail;
