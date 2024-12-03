-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TemplateBaseSchema" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" INTEGER,
    "maxParticipants" INTEGER,
    "isPrivate" BOOLEAN NOT NULL,
    "fixedPrice" BOOLEAN NOT NULL,
    "allowSameDayEvent" BOOLEAN NOT NULL,
    "waitList" BOOLEAN NOT NULL,
    "limitedParticipants" BOOLEAN NOT NULL
);
INSERT INTO "new_TemplateBaseSchema" ("allowSameDayEvent", "fixedPrice", "id", "isPrivate", "limitedParticipants", "maxParticipants", "name", "price", "waitList") SELECT "allowSameDayEvent", "fixedPrice", "id", "isPrivate", "limitedParticipants", "maxParticipants", "name", "price", "waitList" FROM "TemplateBaseSchema";
DROP TABLE "TemplateBaseSchema";
ALTER TABLE "new_TemplateBaseSchema" RENAME TO "TemplateBaseSchema";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
