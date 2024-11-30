/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `OccasionBaseSchema` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OccasionBaseSchema_slug_key" ON "OccasionBaseSchema"("slug");
