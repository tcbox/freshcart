import { db } from "../database/connection";
import { users } from "../database/schema";

type partialUser = Partial<typeof users.$inferInsert>;

const createUser = async (data: partialUser) => {
  const newuser = data;
  console.log("result 1", newuser);

  return newuser;
};

const findByEmail = async (email: string) => {};
const findByid = async () => {};

export const userRepository = {
  createUser,
  findByEmail,
  findByid,
};

const test = async () => {
  const result = await createUser({
    firstName: "Tinku",
    lastName: "Candy",
    email: "tinku@gmail.com",
    phone: "9999999999",
    passwordHash: "hashed-password",
  });

  console.log("result", result);
  console.log(Array.isArray(result));
};

test();
