/*
  Warnings:

  - You are about to drop the column `releaseDate` on the `games` table. All the data in the column will be lost.
  - Added the required column `release_date` to the `games` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "games" DROP COLUMN "releaseDate",
ADD COLUMN     "release_date" TIMESTAMP(3) NOT NULL;
