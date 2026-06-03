import bcrypt from "bcrypt";
import { userRepository } from "../repository/userRepository";
import { SALT_ROUNDS, STATUS_CODE } from "@/src/utility/constants/constants";
import { RegisterDTO } from "@/src/utility/types/types";
import { ApiError } from "@/src/utility/config/AppError";

export const authService = {
  async registerUser(data: RegisterDTO) {
    const { email, phone, passwordPlain, firstName, lastName } = data;

    const existingUser = await userRepository.findByEmail(email);

    if (existingUser)
      throw new ApiError("User is not found", STATUS_CODE.NOT_FOUND);

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
