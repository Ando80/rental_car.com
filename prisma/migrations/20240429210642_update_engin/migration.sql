/*
  Warnings:

  - Changed the type of `puissance` on the `Engin` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `poids` on the `Engin` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Engin" DROP COLUMN "puissance",
ADD COLUMN     "puissance" INTEGER NOT NULL,
DROP COLUMN "poids",
ADD COLUMN     "poids" INTEGER NOT NULL;
