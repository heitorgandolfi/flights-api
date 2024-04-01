-- CreateTable
CREATE TABLE "passengers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "passengers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookings" (
    "id" SERIAL NOT NULL,
    "passengerId" INTEGER NOT NULL,
    "flightId" INTEGER NOT NULL,
    "seatNumber" TEXT NOT NULL,
    "bookingAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_flightId_fkey" FOREIGN KEY ("flightId") REFERENCES "flights"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_passengerId_fkey" FOREIGN KEY ("passengerId") REFERENCES "passengers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
