-- CreateTable
CREATE TABLE "weekDays" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "weekdays" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_TemplateBaseSchemaToweekDays" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_TemplateBaseSchemaToweekDays_A_fkey" FOREIGN KEY ("A") REFERENCES "TemplateBaseSchema" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_TemplateBaseSchemaToweekDays_B_fkey" FOREIGN KEY ("B") REFERENCES "weekDays" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_TemplateBaseSchemaToweekDays_AB_unique" ON "_TemplateBaseSchemaToweekDays"("A", "B");

-- CreateIndex
CREATE INDEX "_TemplateBaseSchemaToweekDays_B_index" ON "_TemplateBaseSchemaToweekDays"("B");
