'use client';

import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

import { InstructorsSection } from '@/views/Dashboard/components/InstructorsSection';
import { InstructorModal } from '@/views/Dashboard/components/modals/InstructorModal';
import { deriveDashboardMetrics } from '@/views/Dashboard/dashboardMockData';
import { toastDashboardSaved } from '@/views/Dashboard/dashboardSaveToast';
import { useDashboardWorkspace } from '@/hooks/useDashboardWorkspace';

export default function DashboardInstructorsPage() {
  const ws = useDashboardWorkspace();
  const { myStudios, myInstructors } = deriveDashboardMetrics(ws.studios, ws.classes, ws.instructors);
  const [instructorModalOpen, setInstructorModalOpen] = useState(false);

  const handleSave = () => {
    toastDashboardSaved('instructor');
    setInstructorModalOpen(false);
    void ws.reload();
  };

  if (ws.loading) return <div className="text-muted-foreground">Зареждане…</div>;
  if (ws.error) return <div className="text-destructive">{ws.error}</div>;

  const noStudios = myStudios.length === 0;

  return (
    <>
      <InstructorsSection
        instructors={myInstructors}
        studios={myStudios}
        addDisabled={noStudios}
        addDisabledTooltip="Първо създайте студио в раздел Студиа."
        addDisabledHint={
          <>
            Първо създайте студио в раздел{' '}
            <Link href="/dashboard/studios" className="font-medium text-primary underline-offset-4 hover:underline">
              Студиа
            </Link>
            .
          </>
        }
        onAdd={() => {
          if (myStudios.length === 0) {
            toast.info('Първо създайте студио в раздел Студиа.');
            return;
          }
          setInstructorModalOpen(true);
        }}
        onEdit={() => setInstructorModalOpen(true)}
      />
      <InstructorModal
        open={instructorModalOpen}
        onClose={() => setInstructorModalOpen(false)}
        onSave={handleSave}
        studios={myStudios}
      />
    </>
  );
}
