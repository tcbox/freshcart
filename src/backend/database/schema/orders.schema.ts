import {
  decimal,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { users } from "./users.schema";
import { addresses } from "./addressess.schema";
import { orderStatusEnum } from "../utils/enums";
import { products } from "./products.schema";
import { relations } from "drizzle-orm";
import { payments } from "./payments.schema";
import { deliveries } from "./deliveries.schema";

export const orders = pgTable(
  "orders",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    // References
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "restrict" }),
    addressId: uuid("address_id")
      .notNull()
      .references(() => addresses.id, { onDelete: "restrict" }),
    // Pricing breakdown
    subtotal: decimal("subtotal", { precision: 10, scale: 2 }).notNull(),
    deliveryFee: decimal("delivery_fee", { precision: 10, scale: 2 }).default(
      "0.00",
    ),
    taxes: decimal("taxes", { precision: 10, scale: 2 }).default("0.00"),
    discount: decimal("discount", { precision: 10, scale: 2 }).default("0.00"),
    total: decimal("total", { precision: 10, scale: 2 }).notNull(),
    // Order details
    status: orderStatusEnum("status").default("pending").notNull(),
    specialInstructions: text("special_instructions"),
    // Timestamps for SLA tracking
    createdAt: timestamp("created_at").defaultNow().notNull(),
    confirmedAt: timestamp("confirmed_at"),
    preparedAt: timestamp("prepared_at"),
    pickedUpAt: timestamp("picked_up_at"),
    deliveredAt: timestamp("delivered_at"),
    estimatedDeliveryTime: timestamp("estimated_delivery_time"),
    // Ratings & feedback
    rating: integer("rating"), // 1-5
    review: text("review"),
    ratedAt: timestamp("rated_at"),
    // Cancellation info
    cancelledAt: timestamp("cancelled_at"),
    cancellationReason: text("cancellation_reason"),
    refundAmount: decimal("refund_amount", { precision: 10, scale: 2 }),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index("orders_user_id_idx").on(table.userId),
    statusIdx: index("orders_status_idx").on(table.status),
    createdAtIdx: index("orders_created_at_idx").on(table.createdAt),
    // Composite: user + status (common query pattern)
    userStatusIdx: index("orders_user_status_idx").on(
      table.userId,
      table.status,
    ),
    // Time-range queries
    deliveryTimeIdx: index("orders_delivery_time_idx").on(
      table.estimatedDeliveryTime,
    ),
  }),
);

export const orderItems = pgTable(
  "order_items",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    orderId: uuid("order_id")
      .notNull()
      .references(() => orders.id, { onDelete: "cascade" }),
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "restrict" }),
    quantity: integer("quantity").notNull(),
    priceAtOrder: decimal("price_at_order", {
      precision: 10,
      scale: 2,
    }).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    orderIdIdx: index("order_items_order_id_idx").on(table.orderId),
    productIdIdx: index("order_items_product_id_idx").on(table.productId),
  }),
);

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  address: one(addresses, {
    fields: [orders.addressId],
    references: [addresses.id],
  }),
  items: many(orderItems),
  payment: one(payments),
  delivery: one(deliveries),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}));
