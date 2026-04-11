'use client';

import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

import { ClassesSection } from '@/views/Dashboard/components/ClassesSection';
import { ClassModal } from '@/views/Dashboard/components/modals/ClassModal';
import { deriveDashboardMetrics } from '@/views/Dashboard/dashboardMockData';
import { toastDashboardSaved } from '@/views/Dashboard/dashboardSaveToast';
import { useDashboardWorkspace } from '@/hooks/useDashboardWorkspace';

export default function DashboardClassesPage() {
  const ws = useDashboardWorkspace();
  const { myStudios, myClasses, myInstructors } = deriveDashboardMetrics(ws.studios, ws.classes, ws.instructors);
  const [classModalOpen, setClassModalOpen] = useState(false);

  const handleSave = () => {
    toastDashboardSaved('class');
    setClassModalOpen(false);
    void ws.reload();
  };

  if (ws.loading) return <div className="text-muted-foreground">Зареждане…</div>;
  if (ws.error) return <div className="text-destructive">{ws.error}</div>;

  const noStudios = myStudios.length === 0;
  const noInstructors = myInstructors.length === 0;
  const addClassDisabled = noStudios || noInstructors;

  return (
    <div>
      <ClassesSection
        classes={myClasses}
        studios={myStudios}
        instructors={myInstructors}
        addDisabled={addClassDisabled}
        addDisabledTooltip={
          noStudios
            ? 'Първо създайте студио в раздел Студиа.'
            : 'Добавете поне един инструктор преди да създавате класове.'
        }
        addDisabledHint={
          noStudios ? (
            <>
              Първо създайте студио в раздел{' '}
              <Link href="/dashboard/studios" className="font-medium text-primary underline-offset-4 hover:underline">
                Студиа
              </Link>
              .
            </>
          ) : (
            <>
              Добавете поне един инструктор в раздел{' '}
              <Link
                href="/dashboard/instructors"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Инструктори
              </Link>
              .
            </>
          )
        }
        onAdd={() => {
          if (myStudios.length === 0) {
            toast.info('Първо създайте студио в раздел Студиа.');
            return;
          }
          if (myInstructors.length === 0) {
            toast.info('Добавете поне един инструктор преди да създавате класове.');
            return;
          }
          setClassModalOpen(true);
        }}
        onEdit={() => setClassModalOpen(true)}
      />
      <ClassModal
        open={classModalOpen}
        onClose={() => setClassModalOpen(false)}
        onSave={handleSave}
        studios={myStudios}
        instructors={myInstructors}
      />
    </div>
  );
}
