import type { Metadata } from 'next';
import { Suspense } from 'react';

import ProfileHistoryPage from '@/views/Profile/ProfileHistoryPage';

export const metadata: Metadata = {
  title: 'История',
  description: 'Предстоящи и минали записвания за класове.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="text-muted-foreground p-6">Зареждане…</div>}>
      <ProfileHistoryPage />
    </Suspense>
  );
}
