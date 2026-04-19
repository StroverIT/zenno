import type { Metadata } from 'next';
import { Suspense } from 'react';

import HomeHeroSectionServer from '@/components/home/home-hero-section-server';
import HomeNearbyStudiosSectionServer from '@/components/home/home-nearby-studios-section-server';
import {
  HomeHeroSectionSkeleton,
  HomeNearbyStudiosSectionSkeleton,
  HomeTopStudiosSectionSkeleton,
} from '@/components/home/home-section-skeletons';
import { PageViewTracker } from '@/components/analytics/PageViewTracker';
import { HomeStudiosFavoriteShell } from '@/components/home/home-studios-favorite-shell';
import HomeTopStudiosSectionServer from '@/components/home/home-top-studios-section-server';
import HomeRetreatsSectionServer from '@/components/home/home-retreats-section-server';
import { defaultSiteDescription } from '@/lib/site';
import { defaultShareOgImages, defaultShareTwitterImagePaths } from '@/lib/share-metadata';
import ForStudiosCTA from '@/views/HomePage/ForStudiosCTA';
import HowItWorksSection from '@/views/HomePage/HowItWorksSection';

export const metadata: Metadata = {
  title: {
    absolute: 'Йога студиа, класове и онлайн записване',
  },
  description: defaultSiteDescription,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: '/',
    title: 'Йога студиа, класове и онлайн записване',
    description: defaultSiteDescription,
    images: defaultShareOgImages,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Йога студиа, класове и онлайн записване',
    description: defaultSiteDescription,
    images: [...defaultShareTwitterImagePaths],
  },
};

export default function HomePage() {
  return (
    <div className="font-body">
      <PageViewTracker event="home_page_view" />
      <Suspense fallback={<HomeHeroSectionSkeleton />}>
        <HomeHeroSectionServer />
      </Suspense>

      <HowItWorksSection />

      <HomeStudiosFavoriteShell>
        <Suspense fallback={<HomeNearbyStudiosSectionSkeleton />}>
          <HomeNearbyStudiosSectionServer />
        </Suspense>

        <Suspense fallback={<HomeTopStudiosSectionSkeleton />}>
          <HomeTopStudiosSectionServer />
        </Suspense>

        <Suspense fallback={<HomeTopStudiosSectionSkeleton />}>
          <HomeRetreatsSectionServer />
        </Suspense>
      </HomeStudiosFavoriteShell>

      <ForStudiosCTA />
    </div>
  );
}
