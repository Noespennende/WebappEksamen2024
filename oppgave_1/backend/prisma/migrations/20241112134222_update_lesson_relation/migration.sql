/*
  Warnings:

  - You are about to drop the column `lessonId` on the `Comment` table. All the data in the column will be lost.
  - Added the required column `lessonSlug` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Comment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "comment" TEXT NOT NULL,
    "lessonSlug" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Comment_lessonSlug_fkey" FOREIGN KEY ("lessonSlug") REFERENCES "Lesson" ("slug") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Comment" ("comment", "id", "userId") SELECT "comment", "id", "userId" FROM "Comment";
DROP TABLE "Comment";
ALTER TABLE "new_Comment" RENAME TO "Comment";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
