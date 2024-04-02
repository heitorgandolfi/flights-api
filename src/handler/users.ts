import { hash } from "bcryptjs";

import type { AddUsersDto } from "../dtos/users";
import { UsersRepository } from "../repositories/users";

async function getAll() {
  const users = await UsersRepository.getUsers();

  return users;
}

async function getById(id: number) {
  const user = await UsersRepository.getUserById(id);

  return user;
}

async function create({ password, ...rest }: AddUsersDto) {
  const hashedPassword = await hash(password, 10);
  
  await UsersRepository.createUser({
    ...rest,
    password: hashedPassword,
  });
}

async function deleteById(id: number) {
  await UsersRepository.deleteUserById(id);
}

export const UsersHandler = {
  getAll,
  getById,
  create,
  deleteById,
};
