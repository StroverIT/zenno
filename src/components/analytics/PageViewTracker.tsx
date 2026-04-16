'use client';

import { useEffect } from 'react';
import type { AnalyticsEventName } from '@/lib/analytics-events';
import { trackEvent } from '@/lib/analytics';

type PageViewTrackerProps = {
  event: AnalyticsEventName;
  studioId?: string;
};

const DEDUPE_WINDOW_MS = 5_000;

export function PageViewTracker({ event, studioId }: PageViewTrackerProps) {
  useEffect(() => {
    const dedupeKey = `page_view:${event}:${studioId ?? 'none'}`;
    const now = Date.now();

    try {
      const lastTrackedRaw = window.sessionStorage.getItem(dedupeKey);
      const lastTrackedAt = lastTrackedRaw ? Number(lastTrackedRaw) : 0;
      if (Number.isFinite(lastTrackedAt) && now - lastTrackedAt < DEDUPE_WINDOW_MS) {
        return;
      }
      window.sessionStorage.setItem(dedupeKey, String(now));
    } catch {
      // Ignore storage edge cases (privacy mode, quota, etc.) and still track.
    }

    void trackEvent({
      event,
      studioId,
    });
  }, [event, studioId]);

  return null;
}
