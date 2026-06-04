import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userRepository } from "../repository/userRepository";
import { SALT_ROUNDS, STATUS_CODE } from "@/src/utility/constants/constants";
import { RegisterDTO } from "@/src/utility/types/types";
import { ApiError } from "@/src/utility/config/AppError";
import { env } from "@/src/utility/config/env";

export const authService = {
  async registerUser(data: RegisterDTO) {
    const { email, phone, passwordPlain, firstName, lastName } = data;

    const existingUser = await userRepository.findByEmail(email);

    if (existingUser)
      throw new ApiError("User already exists", STATUS_CODE.CONFLICT);

    const passwordHash = await bcrypt.hash(passwordPlain, SALT_ROUNDS);

    return await userRepository.createUser({
      email,
      phone,
      passwordHash,
      firstName,
      lastName,
    });
  },

  async loginUser(email: string, passwordPlain: string) {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new ApiError("Invalid email or password", STATUS_CODE.UNAUTHORIZED);
    }

    const isPasswordValid = await bcrypt.compare(
      passwordPlain,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new ApiError("Invalid email or password", STATUS_CODE.UNAUTHORIZED);
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  },

  async verifyToken(token: string) {
    return jwt.verify(token, env.JWT_SECRET);
  },
};
