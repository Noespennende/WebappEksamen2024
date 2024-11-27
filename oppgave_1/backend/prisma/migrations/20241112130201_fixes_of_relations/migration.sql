/*
  Warnings:

  - You are about to drop the `Text` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Text";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "LessonText" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    CONSTRAINT "LessonText_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
