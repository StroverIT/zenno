import { Suspense } from "react";
import { HomePageSkeleton } from "@/components/home-page/home-page-skeleton";
import HomePage from "@/views/HomePage/HomePage";

export default function HomePageComponent() {
  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <HomePage />
    </Suspense>
  );
}

