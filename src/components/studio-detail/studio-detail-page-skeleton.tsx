import { Skeleton } from "@/components/ui/skeleton";

export function StudioDetailPageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="mb-6 h-5 w-44" />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Skeleton className="aspect-video w-full rounded-xl" />
          <div className="space-y-3">
            <Skeleton className="h-9 w-2/3 max-w-md" />
            <Skeleton className="h-4 max-w-lg" />
            <Skeleton className="h-4 max-w-sm" />
          </div>
          <div className="flex gap-2 border-b border-border pb-2">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
          </div>
          <Skeleton className="h-52 w-full rounded-lg" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-72 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
