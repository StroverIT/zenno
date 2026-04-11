'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { useDashboardWorkspace } from '@/hooks/useDashboardWorkspace';

type DashboardWorkspaceValue = ReturnType<typeof useDashboardWorkspace>;

const DashboardWorkspaceContext = createContext<DashboardWorkspaceValue | null>(null);

/** Single workspace fetch for the whole dashboard (shell + pages share the same data). */
export function DashboardWorkspaceProvider({ children }: { children: ReactNode }) {
  const value = useDashboardWorkspace();
  return <DashboardWorkspaceContext.Provider value={value}>{children}</DashboardWorkspaceContext.Provider>;
}

export function useDashboardWorkspaceContext(): DashboardWorkspaceValue {
  const ctx = useContext(DashboardWorkspaceContext);
  if (!ctx) {
    throw new Error('useDashboardWorkspaceContext must be used within DashboardWorkspaceProvider');
  }
  return ctx;
}
