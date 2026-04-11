"use client";

import { Suspense } from "react";
import { StudioDetailPageSkeleton } from "@/components/studio-detail/studio-detail-page-skeleton";
import StudioDetail from "@/views/StudioDetail";

export default function StudioDetailPage() {
  return (
    <Suspense fallback={<StudioDetailPageSkeleton />}>
      <StudioDetail />
    </Suspense>
  );
}

