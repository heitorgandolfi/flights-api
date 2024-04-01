import type { AddPassengersDto } from "../dtos/passengers";
import { PassengersRepository } from "../repositories/passengers";

async function getAll() {
  const passengers = await PassengersRepository.getPassengers();

  return passengers;
}

async function getById(id: number) {
  const passenger = await PassengersRepository.getPassengerById(id);

  return passenger;
}

async function create(data: AddPassengersDto) {
  await PassengersRepository.createPassenger(data);
}

async function deleteById(id: number) {
  await PassengersRepository.deletePassengerById(id);
}

export const PassengersHandler = {
  getAll,
  getById,
  create,
  deleteById,
};
