import { Skeleton } from '@/components/ui/skeleton';

export function AdminOverviewSkeleton() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <Skeleton className="h-10 w-10 rounded-xl" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-9 w-16" />
            <Skeleton className="h-3 w-28 mt-2" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, col) => (
          <div key={col} className="rounded-2xl border border-border bg-white p-6 shadow-md">
            <Skeleton className="h-6 w-48 mb-4" />
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, row) => (
                <div key={row} className="flex gap-3 p-3 rounded-xl bg-muted/30">
                  <Skeleton className="h-10 w-10 rounded-lg shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4 max-w-[180px]" />
                    <Skeleton className="h-3 w-full max-w-[220px]" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ListToolbarSkeleton() {
  return (
    <div className="mb-6">
      <Skeleton className="h-10 w-full max-w-md rounded-xl" />
    </div>
  );
}

function ListCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-white p-5 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <Skeleton className="h-12 w-12 rounded-xl shrink-0" />
        <div className="space-y-2 flex-1 max-w-md">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-4 w-full max-w-sm" />
          <Skeleton className="h-3 w-40" />
        </div>
      </div>
      <div className="hidden sm:flex gap-2 shrink-0">
        <Skeleton className="h-9 w-20 rounded-lg" />
        <Skeleton className="h-9 w-20 rounded-lg" />
      </div>
    </div>
  );
}

export function AdminStudiosSectionSkeleton() {
  return (
    <div>
      <ListToolbarSkeleton />
      <div className="space-y-3">
        <ListCardSkeleton />
        <ListCardSkeleton />
        <ListCardSkeleton />
      </div>
    </div>
  );
}

export function AdminUsersSectionSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-white overflow-hidden shadow-md">
      <div className="p-4 border-b border-border">
        <Skeleton className="h-10 w-full max-w-md rounded-xl" />
      </div>
      <div className="p-4 space-y-3">
        <div className="flex gap-4 py-2 border-b border-border">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20 hidden sm:block" />
          <Skeleton className="h-4 w-20 ml-auto" />
        </div>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 py-3 border-t border-border first:border-t-0">
            <Skeleton className="h-9 w-9 rounded-full shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-56" />
            </div>
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-8 w-24 rounded-lg hidden sm:block" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminReviewsSectionSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-white overflow-hidden shadow-md">
      <div className="p-4 border-b border-border">
        <Skeleton className="h-10 w-full max-w-md rounded-xl" />
      </div>
      <div className="divide-y divide-border">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex gap-4 px-5 py-5">
            <Skeleton className="h-10 w-10 rounded-full shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-4 w-full max-w-lg" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-8 w-24 rounded-lg shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminSubscriptionRequestsSectionSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-white overflow-hidden shadow-md">
      <div className="p-4 border-b border-border space-y-2">
        <Skeleton className="h-6 w-56" />
        <Skeleton className="h-4 w-full max-w-xl" />
      </div>
      <div className="divide-y divide-border">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:justify-between">
            <div className="flex gap-3 flex-1">
              <Skeleton className="h-10 w-10 rounded-xl shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-3 w-64" />
                <Skeleton className="h-16 w-full max-w-md mt-2" />
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <Skeleton className="h-9 w-24 rounded-xl" />
              <Skeleton className="h-9 w-24 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
