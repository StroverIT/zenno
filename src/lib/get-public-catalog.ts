import { prisma } from "@/lib/prisma";
import { studioToDto, yogaClassToDto } from "@/lib/public-studio-dto";
import type { Studio, YogaClass } from "@/data/mock-data";

export type PublicCatalog = {
  studios: Studio[];
  classes: YogaClass[];
};

/** DB-backed public catalog for SSR and `/api/public/studios`. */
export async function getPublicCatalog(): Promise<PublicCatalog> {
  const studios = await prisma.studio.findMany({
    orderBy: { createdAt: "desc" },
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
