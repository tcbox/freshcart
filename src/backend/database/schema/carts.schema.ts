import {
  decimal,
  index,
  integer,
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { users } from "./users.schema";
import { products } from "./products.schema";
import { relations } from "drizzle-orm";

export const carts = pgTable(
  "carts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    totalItems: integer("total_items").default(0),
    totalPrice: decimal("total_price", { precision: 10, scale: 2 }).default(
      "0.00",
    ),
    expiresAt: timestamp("expires_at"), // Cart expiry (30 mins)
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: uniqueIndex("carts_user_id_idx").on(table.userId),
    expiresAtIdx: index("carts_expires_at_idx").on(table.expiresAt),
  }),
);

export const cartItems = pgTable(
  "cart_items",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    cartId: uuid("cart_id")
      .notNull()
      .references(() => carts.id, { onDelete: "cascade" }),
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "restrict" }),
    quantity: integer("quantity").notNull().default(1),
    priceAtAdd: decimal("price_at_add", { precision: 10, scale: 2 }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    cartIdIdx: index("cart_items_cart_id_idx").on(table.cartId),
    productIdIdx: index("cart_items_product_id_idx").on(table.productId),
    // Unique constraint: one product per cart
    uniqueCartProduct: uniqueIndex("cart_items_cart_product_idx").on(
      table.cartId,
      table.productId,
    ),
  }),
);

// ===================
// CART RELATIONS
// ===================

export const cartsRelations = relations(carts, ({ one, many }) => ({
  user: one(users, {
    fields: [carts.userId],
    references: [users.id],
  }),
  items: many(cartItems),
}));

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
  cart: one(carts, {
    fields: [cartItems.cartId],
    references: [carts.id],
  }),
  product: one(products, {
    fields: [cartItems.productId],
    references: [products.id],
  }),
}));
