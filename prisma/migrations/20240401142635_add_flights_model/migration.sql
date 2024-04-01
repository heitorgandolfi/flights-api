-- CreateTable
CREATE TABLE "Flight" (
    "id" SERIAL NOT NULL,
    "origin" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "airline" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "departure" TIMESTAMP(3) NOT NULL,
    "arrival" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Flight_pkey" PRIMARY KEY ("id")
);
