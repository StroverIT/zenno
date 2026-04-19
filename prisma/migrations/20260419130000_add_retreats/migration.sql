-- CreateTable
CREATE TABLE "Retreat" (
    "id" TEXT NOT NULL,
    "studioId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "activities" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "address" TEXT NOT NULL,
    "lat" DOUBLE PRECISION,
    "lng" DOUBLE PRECISION,
    "startDate" DATE NOT NULL,
    "endDate" DATE NOT NULL,
    "duration" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "isHidden" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Retreat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Retreat_studioId_startDate_idx" ON "Retreat"("studioId", "startDate");

-- CreateIndex
CREATE INDEX "Retreat_createdAt_idx" ON "Retreat"("createdAt" DESC);

-- AddForeignKey
ALTER TABLE "Retreat" ADD CONSTRAINT "Retreat_studioId_fkey" FOREIGN KEY ("studioId") REFERENCES "Studio"("id") ON DELETE CASCADE ON UPDATE CASCADE;
