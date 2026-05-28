import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userRepository } from "../repository/userRepository";
import { env } from "../../lib/config/env";

const SALT_ROUNDS = 10;

export const authService = {
  // User sign-up backend process
  async registerUser(
    email: string,
    phone: string,
    passwordPlain: string,
    firstName?: string,
    lastName?: string,
  ) {
    // 1. Check if user already exists
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("User with this email already exists!");
    }

    // 2. Hashing raw password for SOC 2 Security Compliance
    const passwordHash = await bcrypt.hash(passwordPlain, SALT_ROUNDS);

    // 3. Save inside database using repository layer
    return await userRepository.createUser({
      email,
      phone,
      passwordHash,
      firstName,
      lastName,
    });
  },
};
