import type { Metadata } from 'next';

import { DiscoverAsideMenu } from '@/components/discover/DiscoverAsideMenu';
import { defaultShareOgImages, defaultShareTwitterImagePaths } from '@/lib/share-metadata';
import { DiscoverMainContent } from '@/components/discover/discover-main-content';
import { DiscoverPageAsideColumn } from '@/components/discover/discover-page-aside-column';
import { PageViewTracker } from '@/components/analytics/PageViewTracker';

export const metadata: Metadata = {
  title: 'Открий студио',
  description:
    'Намери най-доброто йога студио близо до теб. Филтрирай по ниво, тип йога и рейтинг.',
  alternates: {
    canonical: '/discover',
  },
  openGraph: {
    type: 'website',
    title: 'Открий студио',
    description:
      'Намери най-доброто йога студио близо до теб. Филтрирай по ниво, тип йога и рейтинг.',
    url: '/discover',
    images: defaultShareOgImages,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Открий студио',
    description:
      'Намери най-доброто йога студио близо до теб. Филтрирай по ниво, тип йога и рейтинг.',
    images: [...defaultShareTwitterImagePaths],
  },
};

export default function DiscoverPage() {
  return (
    <div className="flex min-h-screen flex-col bg-yoga-bg">
      <PageViewTracker event="discover_page_view" />
      <main className="container mx-auto flex-1 px-4 py-8">
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-semibold text-yoga-text md:text-4xl">
            Открий студио
          </h1>
          <p className="mt-2 text-yoga-text-soft">
            Разгледай всички йога студиа и намери това, което е идеално за теб
          </p>
        </div>

        <div className="flex gap-8">
          <DiscoverPageAsideColumn />

          <div className="min-w-0 flex-1">
            <DiscoverAsideMenu variant="mobile-toolbar" />

            <DiscoverMainContent />
          </div>
        </div>
      </main>
    </div>
  );
}
