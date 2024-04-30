/*
  Warnings:

  - You are about to drop the column `poids` on the `Engin` table. All the data in the column will be lost.
  - Added the required column `description` to the `Engin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Engin" DROP COLUMN "poids",
ADD COLUMN     "description" TEXT NOT NULL;
