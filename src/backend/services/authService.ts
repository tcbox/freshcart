import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userRepository } from "../repository/userRepository";
import { env } from "@/utility/config/env";
import { SALT_ROUNDS } from "@/src/utility/constants/constants";
import { RegisterDTO } from "@/src/utility/types/types";

export const authService = {
  async registerUser(data: RegisterDTO) {
    const { email, phone, passwordPlain, firstName, lastName } = data;

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
