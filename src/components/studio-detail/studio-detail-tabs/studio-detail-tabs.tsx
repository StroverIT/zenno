'use client';

import { useState } from 'react';
import type { Instructor, Review, ScheduleEntry, StudioSubscription, YogaClass } from '@/data/mock-data';
import { useAuth } from '@/contexts/AuthContext';
import { ClassesTabContent } from './classes-tab-content';
import { InstructorsTabContent } from './instructors-tab-content';
import { ReviewsTabContent } from './reviews-tab-content';
import { ScheduleTabContent } from './schedule-tab-content';
import { StudioDetailTabBar } from './studio-detail-tab-bar';
import type { TabKey } from './types';

export function StudioDetailTabs({
  studioSchedule,
  subscription,
  studioClasses,
  studioInstructors,
  studioReviews,
  onBookClass,
}: {
  studioSchedule: ScheduleEntry[];
  subscription: StudioSubscription | undefined;
  studioClasses: YogaClass[];
  studioInstructors: Instructor[];
  studioReviews: Review[];
  onBookClass: (classId: string) => void;
}) {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<TabKey>('schedule');

  const tabs = [
    { key: 'schedule' as const, label: 'Разписание', count: studioSchedule.length },
    { key: 'classes' as const, label: 'Класове', count: studioClasses.length },
    { key: 'instructors' as const, label: 'Инструктори', count: studioInstructors.length },
    { key: 'reviews' as const, label: 'Ревюта', count: studioReviews.length },
  ];

  return (
    <>
      <StudioDetailTabBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="mt-6">
        {activeTab === 'schedule' && (
          <ScheduleTabContent
            studioSchedule={studioSchedule}
            subscription={subscription}
            isAuthenticated={isAuthenticated}
          />
        )}
        {activeTab === 'classes' && (
          <ClassesTabContent studioClasses={studioClasses} onBookClass={onBookClass} />
        )}
        {activeTab === 'instructors' && (
          <InstructorsTabContent studioInstructors={studioInstructors} />
        )}
        {activeTab === 'reviews' && <ReviewsTabContent studioReviews={studioReviews} />}
      </div>
    </>
  );
}
