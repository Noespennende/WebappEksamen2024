-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OccasionBaseSchema" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "adress" TEXT NOT NULL,
    "waitingList" BOOLEAN NOT NULL,
    "template" TEXT,
    "maxParticipants" INTEGER,
    "category" TEXT NOT NULL,
    "date" DATETIME NOT NULL
);
INSERT INTO "new_OccasionBaseSchema" ("adress", "category", "date", "id", "maxParticipants", "name", "price", "slug", "template", "waitingList") SELECT "adress", "category", "date", "id", "maxParticipants", "name", "price", "slug", "template", "waitingList" FROM "OccasionBaseSchema";
DROP TABLE "OccasionBaseSchema";
ALTER TABLE "new_OccasionBaseSchema" RENAME TO "OccasionBaseSchema";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
