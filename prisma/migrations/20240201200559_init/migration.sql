/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Customer` table. All the data in the column will be lost.
  - You are about to alter the column `income` on the `Customer` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- DropIndex
DROP INDEX "Customer_email_key";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "createdAt",
ALTER COLUMN "income" SET DATA TYPE INTEGER;
