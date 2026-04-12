import type { Metadata } from 'next';

import DashboardOverviewPageClient from './dashboard-overview-page-client';

export const metadata: Metadata = {
  title: 'Преглед',
};

export default function DashboardOverviewPage() {
  return <DashboardOverviewPageClient />;
}
