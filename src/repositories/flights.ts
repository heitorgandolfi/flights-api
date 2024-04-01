import db from "../database/db";
import type { AddFlightDTO } from "../dtos/flights";

async function getFlights() {
  return await db.flight.findMany({
    orderBy: {
      departure: "asc",
    },
    include: {
      bookings: true,
    },
  });
}

async function getFlightById(id: number) {
  const flight = await db.flight.findUnique({
    where: {
      id: id,
    },
    include: {
      bookings: true,
    },
  });

  return flight;
}

async function createFlight(data: AddFlightDTO) {
  const { departure, ...rest } = data;

  return await db.flight.create({
    data: {
      departure: new Date(departure),
      ...rest,
    },
  });
}

async function deleteFlightById(id: number) {
  return await db.flight.delete({
    where: {
      id: id,
    },
  });
}

export const FlightsRepository = {
  getFlights,
  getFlightById,
  createFlight,
  deleteFlightById,
};
