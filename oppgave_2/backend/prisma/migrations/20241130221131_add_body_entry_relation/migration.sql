-- AlterTable
ALTER TABLE "OccasionBaseSchema" ADD COLUMN "body" TEXT;

-- CreateTable
CREATE TABLE "BodyEntry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "occasionId" TEXT NOT NULL,
    CONSTRAINT "BodyEntry_occasionId_fkey" FOREIGN KEY ("occasionId") REFERENCES "OccasionBaseSchema" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
