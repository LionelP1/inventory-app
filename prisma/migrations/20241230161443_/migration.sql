/*
  Warnings:

  - You are about to drop the column `genreId` on the `games` table. All the data in the column will be lost.
  - You are about to drop the column `publisherId` on the `games` table. All the data in the column will be lost.
  - Added the required column `genre_id` to the `games` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publisher_id` to the `games` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "games" DROP CONSTRAINT "games_genreId_fkey";

-- DropForeignKey
ALTER TABLE "games" DROP CONSTRAINT "games_publisherId_fkey";

-- AlterTable
ALTER TABLE "games" DROP COLUMN "genreId",
DROP COLUMN "publisherId",
ADD COLUMN     "genre_id" INTEGER NOT NULL,
ADD COLUMN     "publisher_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "genres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_publisher_id_fkey" FOREIGN KEY ("publisher_id") REFERENCES "publishers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
