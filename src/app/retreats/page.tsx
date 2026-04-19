import type { Metadata } from 'next';

import { PageViewTracker } from '@/components/analytics/PageViewTracker';
import { getHomeRetreats } from '@/lib/home/home-data';
import { defaultShareOgImages, defaultShareTwitterImagePaths } from '@/lib/share-metadata';
import { RetreatsCatalog } from '@/views/RetreatsPage/RetreatsCatalog';

export const metadata: Metadata = {
  title: 'Рийтрийти',
  description: 'Разгледай всички рийтрийти и ги сортирай по най-близко или най-скорошни дати.',
  alternates: {
    canonical: '/retreats',
  },
  openGraph: {
    type: 'website',
    title: 'Рийтрийти',
    description: 'Разгледай всички рийтрийти и ги сортирай по най-близко или най-скорошни дати.',
    url: '/retreats',
    images: defaultShareOgImages,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Рийтрийти',
    description: 'Разгледай всички рийтрийти и ги сортирай по най-близко или най-скорошни дати.',
    images: [...defaultShareTwitterImagePaths],
  },
};

export default async function RetreatsPage() {
  const retreats = await getHomeRetreats();
  return (
    <div className="flex min-h-screen flex-col bg-yoga-bg">
      <PageViewTracker event="retreats_page_view" />
      <main className="container mx-auto flex-1 px-4 py-8">
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-semibold text-yoga-text md:text-4xl">Рийтрийти</h1>
          <p className="mt-2 text-yoga-text-soft">Разгледай всички рийтрийти и намери следващото си йога приключение.</p>
        </div>
        <RetreatsCatalog retreats={retreats} />
      </main>
    </div>
  );
}
