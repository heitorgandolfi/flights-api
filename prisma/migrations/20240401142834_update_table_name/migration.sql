/*
  Warnings:

  - You are about to drop the `Flight` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Flight";

-- CreateTable
CREATE TABLE "flights" (
    "id" SERIAL NOT NULL,
    "origin" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "airline" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "departure" TIMESTAMP(3) NOT NULL,
    "arrival" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "flights_pkey" PRIMARY KEY ("id")
);
