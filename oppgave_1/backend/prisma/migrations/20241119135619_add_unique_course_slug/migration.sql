/*
  Warnings:

  - A unique constraint covering the columns `[courseSlug,slug]` on the table `Lesson` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Lesson_courseId_slug_key";

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_courseSlug_slug_key" ON "Lesson"("courseSlug", "slug");
