import type { AddFlightDTO } from "../dtos/flights";
import { FlightsRepository } from "../repositories/flights";

async function getAll() {
  const flights = await FlightsRepository.getFlights();

  return flights;
}

async function getById(id: number) {
  const flight = await FlightsRepository.getFlightById(id);

  return flight;
}

async function create(data: AddFlightDTO) {
  await FlightsRepository.createFlight(data);
}

async function deleteById(id: number) {
  await FlightsRepository.deleteFlightById(id);
}

export const FlightsHandler = {
  getAll,
  getById,
  create,
  deleteById,
};
