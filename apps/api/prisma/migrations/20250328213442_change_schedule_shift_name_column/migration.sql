/*
  Warnings:

  - You are about to drop the column `dia_semana` on the `schedule_shifts` table. All the data in the column will be lost.
  - Added the required column `day_week` to the `schedule_shifts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "schedule_shifts" DROP COLUMN "dia_semana",
ADD COLUMN     "day_week" "week_days" NOT NULL;
