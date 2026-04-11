-- AlterTable
ALTER TABLE "User" ADD COLUMN "dashboardSetupGuideDocked" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "User" ADD COLUMN "dashboardSetupGuideMinimized" BOOLEAN NOT NULL DEFAULT false;
