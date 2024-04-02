/*
  Warnings:

  - You are about to drop the column `passengerId` on the `bookings` table. All the data in the column will be lost.
  - You are about to drop the `passengers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `bookings` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('ADMIN', 'PASSENGER');

-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_passengerId_fkey";

-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "passengerId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "passengers";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "user_role" NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
