/*
  Warnings:

  - You are about to drop the column `codigo` on the `departments` table. All the data in the column will be lost.
  - You are about to drop the column `data` on the `schedule_shifts` table. All the data in the column will be lost.
  - You are about to drop the column `motivo` on the `shift_exchange_requests` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `shifts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `departments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `departments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `schedule_shifts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `shifts` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "departments_codigo_key";

-- AlterTable
ALTER TABLE "departments" DROP COLUMN "codigo",
ADD COLUMN     "code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "schedule_shifts" DROP COLUMN "data",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "shift_exchange_requests" DROP COLUMN "motivo",
ADD COLUMN     "reason" TEXT;

-- AlterTable
ALTER TABLE "shifts" DROP COLUMN "tipo",
ADD COLUMN     "type" "shift_types" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "departments_code_key" ON "departments"("code");
