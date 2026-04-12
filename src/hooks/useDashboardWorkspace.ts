'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type {
  Instructor,
  ScheduleEntry,
  Studio,
  StudioSubscription,
  SubscriptionRequestDto,
  YogaClass,
} from '@/data/mock-data';
import type { DashboardRecentSignup } from '@/lib/dashboard-recent-signups';
import { parseOnlinePaymentsFlag } from '@/lib/payment-settings';

type WorkspacePayload = {
  studios: Studio[];
  instructors: Instructor[];
  classes: YogaClass[];
  schedule: ScheduleEntry[];
  subscriptions: StudioSubscription[];
  subscriptionRequests: SubscriptionRequestDto[];
  recentSignups: DashboardRecentSignup[];
  onlinePayments?: boolean;
};

export function useDashboardWorkspace() {
  const [data, setData] = useState<WorkspacePayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dataRef = useRef<WorkspacePayload | null>(null);
  dataRef.current = data;

  const reload = useCallback(async () => {
    const isFirstLoad = dataRef.current === null;
    if (isFirstLoad) setLoading(true);
    setError(null);
    try {
      const [workspaceRes, settingsRes] = await Promise.all([
        fetch('/api/dashboard/workspace', { cache: 'no-store' }),
        fetch('/api/public/payment-settings', { cache: 'no-store' }),
      ]);
      if (!workspaceRes.ok) {
        const j = await workspaceRes.json().catch(() => ({}));
        setError((j as { error?: string }).error ?? `HTTP ${workspaceRes.status}`);
        setData(null);
        return;
      }
      const json = (await workspaceRes.json()) as WorkspacePayload;
      let onlinePayments = parseOnlinePaymentsFlag(json.onlinePayments);
      if (settingsRes.ok) {
        const s = (await settingsRes.json().catch(() => ({}))) as { onlinePayments?: unknown };
        onlinePayments = parseOnlinePaymentsFlag(s.onlinePayments);
      }
      setData({ ...json, onlinePayments });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  return {
    studios: data?.studios ?? [],
    instructors: data?.instructors ?? [],
    classes: data?.classes ?? [],
    schedule: data?.schedule ?? [],
    subscriptions: data?.subscriptions ?? [],
    subscriptionRequests: data?.subscriptionRequests ?? [],
    recentSignups: data?.recentSignups ?? [],
    onlinePayments: data?.onlinePayments ?? true,
    loading,
    error,
    reload,
  };
}
