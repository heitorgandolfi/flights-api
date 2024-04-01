import db from "../database/db";
import type { AddPassengersDto } from "../dtos/passengers";

async function getPassengers() {
  const passengers = await db.passenger.findMany({
    include: {
      bookings: true,
    },
  });

  return passengers;
}

async function getPassengerById(id: number) {
  const passenger = await db.passenger.findFirstOrThrow({
    where: {
      id: id,
    },
  });

  return passenger;
}

async function createPassenger(data: AddPassengersDto) {
  const { email, name } = data;
  return await db.passenger.create({
    data: {
      name,
      email,
    },
  });
}

async function deletePassengerById(id: number) {
  return await db.passenger.delete({
    where: {
      id: id,
    },
  });
}

export const PassengersRepository = {
  getPassengers,
  getPassengerById,
  createPassenger,
  deletePassengerById,
};
