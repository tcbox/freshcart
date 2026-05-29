import { eq, and, isNull } from "drizzle-orm";
import { db } from "../database/connection";
import { products, users } from "../database/schema";

export const userRepository = {
  async createUser(data: typeof users.$inferInsert) {
    const [newUser] = await db.insert(users).values(data).returning();
    return newUser;
  },

  async findByEmail(email: string) {
    const [user] = await db
      .select()
      .from(users)
      .where(and(eq(users.email, email), isNull(users.deletedAt)));
    return user;
  },

  async findProductByitemId(id: string) {
    const [ProductByItemId] = await db
      .select()
      .from(products)
      .where(eq(products.id, id));
    return ProductByItemId;
  },
};
