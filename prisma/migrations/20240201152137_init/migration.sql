/*
  Warnings:

  - Added the required column `civ` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cp` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "civ" TEXT NOT NULL,
ADD COLUMN     "cp" TEXT NOT NULL;
