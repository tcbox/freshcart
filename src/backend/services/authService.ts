import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userRepository } from "../repository/userRepository";
import { env } from "../../lib/config/env";

const SALT_ROUNDS = 10;

export const authService = {
  async registerUser(
    email: string,
    phone: string,
    passwordPlain: string,
    firstName?: string,
    lastName?: string,
  ) {
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("User with this email already exists!");
    }

    const passwordHash = await bcrypt.hash(passwordPlain, SALT_ROUNDS);

    return await userRepository.createUser({
      email,
      phone,
      passwordHash,
      firstName,
      lastName,
    });
  },
};
