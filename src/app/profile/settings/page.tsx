import type { Metadata } from 'next';

import ProfileSettingsPage from '@/views/Profile/ProfileSettingsPage';

export const metadata: Metadata = {
  title: 'Настройки',
  description: 'Промени имейла, паролата и данните за контакт в профила си.',
};

export default function Page() {
  return <ProfileSettingsPage />;
}
