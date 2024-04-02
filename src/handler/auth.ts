import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";

import type { AuthenticateDTO } from "../dtos/auth";
import { UsersRepository } from "../repositories/users";

export async function authenticate({ email, password }: AuthenticateDTO) {
  const user = await UsersRepository.getUserByEmail(email);

  if (!user) return { message: "Invalid email or password" }

  const isPasswordValid = await compare(password, user.password);

  if (!isPasswordValid) return { message: "Invalid email or password" }

  const jwtToken = jwt.sign({ sub: String(user.id), role: user.role }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });

  return {
    access_token: `Bearer ${jwtToken}`,
  }
}