'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { DASHBOARD_PATHS } from '@/views/Dashboard/dashboardTypes';
import { dashboardCardClass } from '@/views/Dashboard/dashboardUi';
import type { DashboardSetupGuidePrefs } from '@/hooks/useDashboardSetupGuidePrefs';
import { CheckCircle2, Circle, ListChecks, Maximize2, Minimize2, X } from 'lucide-react';

const TASK_TOTAL = 4;

type TaskDef = {
  id: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  done: boolean;
};

export function DashboardSetupGuide({
  visible,
  loading,
  studiosCount,
  instructorsCount,
  classesCount,
  scheduleCount,
  prefs,
  setPrefs,
  hydrated,
}: {
  visible: boolean;
  loading: boolean;
  studiosCount: number;
  instructorsCount: number;
  classesCount: number;
  scheduleCount: number;
  prefs: DashboardSetupGuidePrefs;
  setPrefs: (next: DashboardSetupGuidePrefs | ((p: DashboardSetupGuidePrefs) => DashboardSetupGuidePrefs)) => void;
  hydrated: boolean;
}) {
  const tasks = useMemo<TaskDef[]>(
    () => [
      {
        id: 'studio',
        title: 'Създайте студио',
        description: 'Добавете поне едно студио с адрес и основни данни.',
        href: DASHBOARD_PATHS.studios,
        cta: 'Към студиа',
        done: studiosCount >= 1,
      },
      {
        id: 'instructor',
        title: 'Добавете инструктор',
        description: 'Създайте поне един инструктор, свързан с вашето студио.',
        href: DASHBOARD_PATHS.instructors,
        cta: 'Към инструктори',
        done: instructorsCount >= 1,
      },
      {
        id: 'schedule',
        title: 'Добавете час в разписание',
        description: 'Задайте поне един повтарящ се час в седмичното разписание.',
        href: DASHBOARD_PATHS.schedule,
        cta: 'Към разписание',
        done: scheduleCount >= 1,
      },
      {
        id: 'class',
        title: 'Създайте клас',
        description: 'Добавете поне един клас с дата, час и капацитет.',
        href: DASHBOARD_PATHS.classes,
        cta: 'Към класове',
        done: classesCount >= 1,
      },
    ],
    [studiosCount, instructorsCount, scheduleCount, classesCount],
  );

  const doneCount = tasks.filter(t => t.done).length;
  const progressPct = (doneCount / TASK_TOTAL) * 100;

  const defaultAccordion = useMemo(() => {
    const first = tasks.find(t => !t.done);
    return first?.id ?? 'studio';
  }, [tasks]);

  if (!visible || !hydrated) return null;

  const showFloating = !prefs.docked;
  const showMinimizedChip = showFloating && prefs.minimized;

  return (
    <>
      {showFloating && showMinimizedChip ? (
        <div className="fixed bottom-20 right-4 z-50 lg:bottom-8 max-w-[min(100vw-2rem,20rem)] pointer-events-none">
          <div className="pointer-events-auto">
            <button
              type="button"
              onClick={() => setPrefs(p => ({ ...p, minimized: false }))}
              className={cn(
                dashboardCardClass,
                'flex w-full items-center gap-3 px-4 py-3 text-left shadow-lg transition hover:border-primary/30',
              )}
            >
              <div
                className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white"
                style={{
                  background: `conic-gradient(hsl(var(--primary)) ${progressPct}%, white ${progressPct}%)`,
                }}
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-card text-[11px] font-bold tabular-nums text-foreground">
                  {doneCount}/{TASK_TOTAL}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground truncate">Ръководство за настройка</p>
                <p className="text-xs text-muted-foreground">Натиснете, за да разгънете</p>
              </div>
              <Maximize2 className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
            </button>
          </div>
        </div>
      ) : null}

      {showFloating && !showMinimizedChip ? (
        <div className="fixed bottom-20 right-4 z-50 w-[min(100vw-2rem,22rem)] lg:bottom-8 pointer-events-none">
          <div className={cn(dashboardCardClass, 'pointer-events-auto flex max-h-[min(70vh,32rem)] flex-col overflow-hidden p-0 shadow-lg')}>
            <div className="flex items-start justify-between gap-2 border-b border-border/80 px-4 py-3">
              <div className="min-w-0">
                <h2 className="font-display text-base font-bold text-foreground leading-tight">Ръководство за настройка</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">Завършете стъпките по-долу</p>
              </div>
              <div className="flex shrink-0 gap-0.5">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-lg text-muted-foreground"
                  aria-label="Минимизиране"
                  onClick={() => setPrefs(p => ({ ...p, minimized: true }))}
                >
                  <Minimize2 className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-lg text-muted-foreground"
                  aria-label="Затвори и премести в менюто"
                  onClick={() => setPrefs({ docked: true, minimized: false })}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="px-4 pt-3">
              <Progress value={progressPct} className="h-1.5 bg-white" />
              <p className="mt-1.5 text-xs text-muted-foreground tabular-nums">
                {doneCount} от {TASK_TOTAL} готови
                {loading ? ' · зареждане…' : ''}
              </p>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-2 pb-3">
              <Accordion
                key={`${tasks.map(t => (t.done ? '1' : '0')).join('')}`}
                type="single"
                collapsible
                defaultValue={defaultAccordion}
                className="px-2"
              >
                {tasks.map(task => (
                  <AccordionItem key={task.id} value={task.id} className="border-border/70">
                    <AccordionTrigger className="-mx-2 rounded-lg px-2 py-3 text-sm hover:no-underline data-[state=open]:bg-muted/40">
                      <span className="flex items-center gap-2.5 text-left">
                        {task.done ? (
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                        ) : (
                          <Circle className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                        )}
                        <span
                          className={cn(
                            'font-medium',
                            task.done && 'text-muted-foreground line-through decoration-muted-foreground/80',
                          )}
                        >
                          {task.title}
                        </span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-2 pl-7 text-xs leading-relaxed text-muted-foreground">{task.description}</p>
                      <div className="pl-7">
                        <Link
                          href={task.href}
                          className="text-xs font-semibold text-primary underline-offset-4 hover:underline"
                        >
                          {task.cta}
                        </Link>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export function DashboardSetupGuideSidebarNav({ doneCount, onOpen }: { doneCount: number; onOpen: () => void }) {
  return (
    <div className="mt-4 space-y-1">
      <p className="px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Помощ</p>
      <button
        type="button"
        onClick={onOpen}
        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-muted/60 hover:text-foreground"
      >
        <ListChecks className="h-4 w-4 shrink-0" />
        <span className="flex-1 truncate">Ръководство за настройка</span>
        <span className="text-xs tabular-nums text-muted-foreground">
          {doneCount}/{TASK_TOTAL}
        </span>
      </button>
    </div>
  );
}

export function DashboardSetupGuideMobileDock({
  show,
  doneCount,
  onOpen,
}: {
  show: boolean;
  doneCount: number;
  onOpen: () => void;
}) {
  if (!show) return null;

  return (
    <div className="lg:hidden fixed bottom-[4.5rem] left-0 right-0 z-[45] px-3 pointer-events-none">
      <button
        type="button"
        onClick={onOpen}
        className={cn(
          dashboardCardClass,
          'pointer-events-auto flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left shadow-md',
        )}
      >
        <span className="flex items-center gap-2 min-w-0">
          <ListChecks className="h-4 w-4 shrink-0 text-primary" />
          <span className="text-sm font-medium text-foreground truncate">Ръководство за настройка</span>
        </span>
        <span className="text-xs font-semibold tabular-nums text-muted-foreground shrink-0">
          {doneCount}/{TASK_TOTAL}
        </span>
      </button>
    </div>
  );
}
