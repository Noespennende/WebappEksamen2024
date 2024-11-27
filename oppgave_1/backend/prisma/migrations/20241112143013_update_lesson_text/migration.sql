/*
  Warnings:

  - Added the required column `orderPosition` to the `LessonText` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LessonText" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "orderPosition" INTEGER NOT NULL,
    CONSTRAINT "LessonText_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_LessonText" ("id", "lessonId", "text") SELECT "id", "lessonId", "text" FROM "LessonText";
DROP TABLE "LessonText";
ALTER TABLE "new_LessonText" RENAME TO "LessonText";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
