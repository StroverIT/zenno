import type { Metadata } from "next";
import { Suspense } from "react";
import { DiscoverPageSkeleton } from "@/components/discover/discover-page-skeleton";
import Discover from "@/views/Discover";

export const metadata: Metadata = {
  title: "Открий студио | Zenno",
  description:
    "Намери най-доброто йога студио близо до теб. Филтрирай по ниво, тип йога и рейтинг.",
};

export default function DiscoverPage() {
  return (
    <Suspense fallback={<DiscoverPageSkeleton />}>
      <Discover />
    </Suspense>
  );
}
