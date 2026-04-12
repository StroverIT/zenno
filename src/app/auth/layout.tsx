import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { privateAreaRobots } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Вход и регистрация',
  description: 'Влез или създай акаунт, за да запазваш класове и управляваш профила си.',
  robots: privateAreaRobots,
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return children;
}
