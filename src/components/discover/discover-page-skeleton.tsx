import { Skeleton } from "@/components/ui/skeleton";

function DiscoverStudioCardSkeleton() {
  return (
    <div className="h-full overflow-hidden rounded-xl border border-yoga-accent-soft bg-yoga-surface">
      <Skeleton className="h-48 w-full rounded-none bg-yoga-accent-soft/40" />
      <div className="space-y-3 p-4">
        <Skeleton className="h-6 w-4/5 max-w-[220px] bg-yoga-accent-soft/40" />
        <Skeleton className="h-4 w-full bg-yoga-accent-soft/30" />
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-5 w-14 rounded-full bg-yoga-accent-soft/40" />
          <Skeleton className="h-5 w-16 rounded-full bg-yoga-accent-soft/40" />
          <Skeleton className="h-5 w-12 rounded-full bg-yoga-accent-soft/40" />
        </div>
      </div>
    </div>
  );
}

export function DiscoverPageSkeleton() {
  return (
    <div className="flex gap-8">
      <aside className="hidden w-72 flex-shrink-0 lg:block">
        <div className="sticky top-24 space-y-4 rounded-xl border border-yoga-accent-soft bg-yoga-surface p-6">
          <Skeleton className="h-6 w-24 bg-yoga-accent-soft/40" />
          <Skeleton className="h-10 w-full bg-yoga-accent-soft/30" />
          <Skeleton className="h-10 w-full bg-yoga-accent-soft/30" />
          <Skeleton className="h-10 w-full bg-yoga-accent-soft/30" />
          <Skeleton className="h-24 w-full bg-yoga-accent-soft/25" />
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <div className="mb-6 lg:hidden">
          <Skeleton className="h-10 w-full bg-yoga-accent-soft/30" />
        </div>
        <div className="mb-6 flex items-center justify-between">
          <Skeleton className="h-5 w-48 bg-yoga-accent-soft/35" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <DiscoverStudioCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
