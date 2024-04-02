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
    expiresIn: "1h",
  });

  const refreshToken = jwt.sign({ sub: String(user.id), role: user.role }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

  return {
    access_token: `Bearer ${jwtToken}`,
    refresh_token: `${refreshToken}`,
  }
}

export async function refresh(refreshToken: string) {
  if (!refreshToken) return new Response("Refresh token is required", { status: 401 });

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET!) as { sub: string, role: string };

    if (!decoded) new Response("Invalid refresh token", { status: 403 });

    const jwtToken = jwt.sign({ sub: decoded.sub, role: decoded.role }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    return {
      access_token: `Bearer ${jwtToken}`,
    }
  } catch (error) {
    return new Response("Invalid refresh token", { status: 403 });
  }
}

export const AuthsHandler = {
  authenticate,
  refresh
};
