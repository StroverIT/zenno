import type { Metadata } from 'next';

import ProfileFavoritesPage from '@/views/Profile/ProfileFavoritesPage';

export const metadata: Metadata = {
  title: 'Любими',
  description: 'Студиата, които следиш от профила си.',
};

export default function Page() {
  return <ProfileFavoritesPage />;
}
