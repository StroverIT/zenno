import { unstable_cache } from 'next/cache';
import { prisma } from "@/lib/prisma";
import { studioToDto, yogaClassToDto } from "@/lib/public-studio-dto";
import type { Studio, YogaClass } from "@/data/mock-data";
import { CACHE_TAGS } from '@/lib/app-revalidate';

export type PublicCatalog = {
  studios: Studio[];
  classes: YogaClass[];
};

/** DB-backed public catalog for SSR and `/api/public/studios`. */
async function getPublicCatalogImpl(): Promise<PublicCatalog> {
  const studios = await prisma.studio.findMany({
    where: { isHidden: false },
    orderBy: { createdAt: "desc" },
    include: { business: { select: { ownerUserId: true } } },
  });
  const studioIds = studios.map((s) => s.id);
  const classes =
    studioIds.length === 0
      ? []
      : await prisma.yogaClass.findMany({
          where: { studioId: { in: studioIds } },
          orderBy: [{ date: "asc" }, { startTime: "asc" }],
          take: 500,
        });

  return {
    studios: studios.map(studioToDto),
    classes: classes.map(yogaClassToDto),
  };
}

const getPublicCatalogCachedImpl = unstable_cache(getPublicCatalogImpl, ['public-catalog'], {
  tags: [CACHE_TAGS.publicCatalog],
  revalidate: 300,
});

/** Cross-request cached catalog for SSR and API consumers. */
export async function getPublicCatalogCached(): Promise<PublicCatalog> {
  return getPublicCatalogCachedImpl();
}

/** Unified catalog read path with tag-based invalidation. */
export async function getPublicCatalog(): Promise<PublicCatalog> {
  return getPublicCatalogCachedImpl();
}
