/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `schedules` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "schedules_user_id_key" ON "schedules"("user_id");
