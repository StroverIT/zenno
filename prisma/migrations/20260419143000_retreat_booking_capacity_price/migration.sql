-- AlterTable
ALTER TABLE "Retreat"
ADD COLUMN "enrolled" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN "maxCapacity" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN "price" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "RetreatBooking" (
    "id" TEXT NOT NULL,
    "retreatId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RetreatBooking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RetreatBooking_retreatId_userId_key" ON "RetreatBooking"("retreatId", "userId");

-- CreateIndex
CREATE INDEX "RetreatBooking_userId_createdAt_idx" ON "RetreatBooking"("userId", "createdAt" DESC);

-- AddForeignKey
ALTER TABLE "RetreatBooking" ADD CONSTRAINT "RetreatBooking_retreatId_fkey" FOREIGN KEY ("retreatId") REFERENCES "Retreat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RetreatBooking" ADD CONSTRAINT "RetreatBooking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
