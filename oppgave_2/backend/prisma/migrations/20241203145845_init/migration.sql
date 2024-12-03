-- CreateTable
CREATE TABLE "Participant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "approvalStatus" TEXT NOT NULL,
    "registerDate" DATETIME NOT NULL,
    "approvalDate" DATETIME
);

-- CreateTable
CREATE TABLE "OccasionBaseSchema" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "waitingList" BOOLEAN NOT NULL,
    "templateId" TEXT,
    "maxParticipants" INTEGER,
    "category" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    CONSTRAINT "OccasionBaseSchema_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "TemplateBaseSchema" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TemplateBaseSchema" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "maxParticipants" INTEGER NOT NULL,
    "isPrivate" BOOLEAN NOT NULL,
    "fixedPrice" BOOLEAN NOT NULL,
    "allowSameDayEvent" BOOLEAN NOT NULL,
    "waitList" BOOLEAN NOT NULL,
    "limitedParticipants" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "BodyEntry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "occasionId" TEXT NOT NULL,
    CONSTRAINT "BodyEntry_occasionId_fkey" FOREIGN KEY ("occasionId") REFERENCES "OccasionBaseSchema" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "weekDays" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "weekdays" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Participant" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_Participant_A_fkey" FOREIGN KEY ("A") REFERENCES "OccasionBaseSchema" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_Participant_B_fkey" FOREIGN KEY ("B") REFERENCES "Participant" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_WaitingParticipant" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_WaitingParticipant_A_fkey" FOREIGN KEY ("A") REFERENCES "OccasionBaseSchema" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_WaitingParticipant_B_fkey" FOREIGN KEY ("B") REFERENCES "Participant" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_RejectedParticipant" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_RejectedParticipant_A_fkey" FOREIGN KEY ("A") REFERENCES "OccasionBaseSchema" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_RejectedParticipant_B_fkey" FOREIGN KEY ("B") REFERENCES "Participant" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_TemplateBaseSchemaToweekDays" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_TemplateBaseSchemaToweekDays_A_fkey" FOREIGN KEY ("A") REFERENCES "TemplateBaseSchema" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_TemplateBaseSchemaToweekDays_B_fkey" FOREIGN KEY ("B") REFERENCES "weekDays" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_TemplateFixedWeekdays" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_TemplateFixedWeekdays_A_fkey" FOREIGN KEY ("A") REFERENCES "TemplateBaseSchema" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_TemplateFixedWeekdays_B_fkey" FOREIGN KEY ("B") REFERENCES "TemplateBaseSchema" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Participant_email_key" ON "Participant"("email");

-- CreateIndex
CREATE UNIQUE INDEX "OccasionBaseSchema_slug_key" ON "OccasionBaseSchema"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "_Participant_AB_unique" ON "_Participant"("A", "B");

-- CreateIndex
CREATE INDEX "_Participant_B_index" ON "_Participant"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_WaitingParticipant_AB_unique" ON "_WaitingParticipant"("A", "B");

-- CreateIndex
CREATE INDEX "_WaitingParticipant_B_index" ON "_WaitingParticipant"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RejectedParticipant_AB_unique" ON "_RejectedParticipant"("A", "B");

-- CreateIndex
CREATE INDEX "_RejectedParticipant_B_index" ON "_RejectedParticipant"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TemplateBaseSchemaToweekDays_AB_unique" ON "_TemplateBaseSchemaToweekDays"("A", "B");

-- CreateIndex
CREATE INDEX "_TemplateBaseSchemaToweekDays_B_index" ON "_TemplateBaseSchemaToweekDays"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TemplateFixedWeekdays_AB_unique" ON "_TemplateFixedWeekdays"("A", "B");

-- CreateIndex
CREATE INDEX "_TemplateFixedWeekdays_B_index" ON "_TemplateFixedWeekdays"("B");
