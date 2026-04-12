import type { Metadata } from 'next';

export const siteName = 'Zenno';

export const defaultSiteDescription =
  'Открий йога студиа, класове и инструктори. Филтрирай, сравни рейтинги и запази час онлайн.';

/** Canonical site origin for metadata, sitemap, and robots (no trailing slash). */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, '');
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    const host = vercel.replace(/^https?:\/\//, '');
    return `https://${host}`;
  }
  return 'http://localhost:3000';
}

export const privateAreaRobots: Metadata['robots'] = {
  index: false,
  follow: true,
};
