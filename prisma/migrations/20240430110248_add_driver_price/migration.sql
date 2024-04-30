/*
  Warnings:

  - Added the required column `driverPrice` to the `Engin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Engin" ADD COLUMN     "driverPrice" INTEGER NOT NULL;
