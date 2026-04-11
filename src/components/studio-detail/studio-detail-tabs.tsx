'use client';

import { useState } from 'react';
import { CalendarDays, Clock, CreditCard, Star, Users } from 'lucide-react';
import { toast } from 'sonner';
import { mockInstructors, WEEKDAYS } from '@/data/mock-data';
import type { Instructor, Review, ScheduleEntry, StudioSubscription, YogaClass } from '@/data/mock-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { DifficultyBadge } from '@/components/studio-detail/difficulty-badge';

type TabKey = 'schedule' | 'classes' | 'instructors' | 'reviews';

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
      <div className="mt-10 flex gap-1 overflow-x-auto border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`whitespace-nowrap border-b-2 px-5 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      <div className="mt-6">
        {activeTab === 'schedule' && (
          <div className="space-y-6">
            {subscription?.hasMonthlySubscription && (
              <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-5">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 rounded-xl bg-primary/10 p-2.5">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-semibold text-foreground">Месечен абонамент</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{subscription.subscriptionNote}</p>
                    <p className="mt-2 text-2xl font-bold text-primary">
                      {subscription.monthlyPrice} лв.
                      <span className="text-sm font-normal text-muted-foreground">/месец</span>
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {WEEKDAYS.map((day) => {
                const entries = studioSchedule.filter((s) => s.day === day);
                if (entries.length === 0) return null;
                return (
                  <div key={day} className="overflow-hidden rounded-xl border border-border bg-card">
                    <div className="border-b border-border bg-muted/50 px-4 py-2.5">
                      <h4 className="text-sm font-semibold text-foreground">{day}</h4>
                    </div>
                    <div className="divide-y divide-border">
                      {entries
                        .sort((a, b) => a.startTime.localeCompare(b.startTime))
                        .map((entry) => {
                          const instructor = mockInstructors.find((i) => i.id === entry.instructorId);
                          return (
                            <div key={entry.id} className="flex items-center justify-between gap-3 px-4 py-3">
                              <div className="flex items-center gap-3">
                                <div className="min-w-[50px] text-center">
                                  <p className="text-sm font-bold text-foreground">{entry.startTime}</p>
                                  <p className="text-xs text-muted-foreground">{entry.endTime}</p>
                                </div>
                                <Separator orientation="vertical" className="h-8" />
                                <div>
                                  <p className="text-sm font-medium text-foreground">{entry.className}</p>
                                  <div className="mt-0.5 flex items-center gap-2">
                                    <Badge variant="secondary" className="text-xs">
                                      {entry.yogaType}
                                    </Badge>
                                    <DifficultyBadge difficulty={entry.difficulty} />
                                    {instructor && (
                                      <span className="text-xs text-muted-foreground">с {instructor.name}</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="flex shrink-0 items-center gap-3">
                                <div className="text-right">
                                  <p className="text-sm font-semibold text-foreground">{entry.price} лв.</p>
                                  <p className="text-xs text-muted-foreground">{entry.maxCapacity} места</p>
                                </div>
                                <Button
                                  size="sm"
                                  className="rounded-lg"
                                  onClick={() => {
                                    if (!isAuthenticated) {
                                      toast.error('Моля, влезте, за да се запишете.');
                                      return;
                                    }
                                    toast.success(`Записахте се за ${entry.className}!`);
                                  }}
                                >
                                  Запиши се
                                </Button>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                );
              })}
              {studioSchedule.length === 0 && (
                <div className="py-12 text-center text-muted-foreground">
                  <CalendarDays className="mx-auto mb-3 h-10 w-10 opacity-40" />
                  <p>Няма добавено разписание за това студио.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'classes' && (
          <div className="space-y-4">
            {studioClasses.length === 0 && (
              <p className="text-muted-foreground">Няма предстоящи класове.</p>
            )}
            {studioClasses.map((cls) => {
              const instructor = mockInstructors.find((i) => i.id === cls.instructorId);
              const isFull = cls.enrolled >= cls.maxCapacity;
              return (
                <div
                  key={cls.id}
                  className="flex flex-col justify-between gap-4 rounded-xl border border-border bg-card p-5 md:flex-row md:items-center"
                >
                  <div className="flex-1">
                    <h4 className="font-display text-lg font-semibold text-foreground">{cls.name}</h4>
                    <div className="mt-2 flex flex-wrap gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {cls.date} | {cls.startTime}–{cls.endTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        {cls.enrolled}/{cls.maxCapacity}
                      </span>
                    </div>
                    <div className="mt-2 flex gap-2">
                      <Badge variant="outline">{cls.yogaType}</Badge>
                      <Badge variant="outline">{cls.difficulty}</Badge>
                      {instructor && (
                        <span className="text-sm text-muted-foreground">с {instructor.name}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xl font-semibold text-foreground">{cls.price} лв.</span>
                    <Button onClick={() => onBookClass(cls.id)} variant={isFull ? 'outline' : 'default'}>
                      {isFull ? 'Списък за изчакване' : 'Запиши се'}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'instructors' && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {studioInstructors.map((instr) => (
              <div key={instr.id} className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-sage/30 text-2xl">
                    {'\u{1F9D1}\u{200D}\u{1F3EB}'}
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-foreground">{instr.name}</h4>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                      <span>{instr.rating}</span>
                      <span className="text-muted-foreground">· {instr.experienceLevel}</span>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{instr.bio}</p>
                <div className="mt-3 flex gap-1">
                  {instr.yogaStyle.map((s) => (
                    <Badge key={s} variant="secondary" className="text-xs">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-4">
            {studioReviews.length === 0 && (
              <p className="text-muted-foreground">Все още няма ревюта.</p>
            )}
            {studioReviews.map((review) => (
              <div key={review.id} className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground">{review.userName}</span>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                </div>
                <p className="mt-2 text-foreground/80">{review.text}</p>
                <p className="mt-2 text-xs text-muted-foreground">{review.date}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
