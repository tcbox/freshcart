import {
  decimal,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { paymentMethodEnum, paymentStatusEnum } from "../utils/enums";
import { orders } from "./orders.schema";
import { users } from "./users.schema";
import { relations } from "drizzle-orm";

export const payments = pgTable(
  "payments",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    orderId: uuid("order_id")
      .notNull()
      .unique()
      .references(() => orders.id, { onDelete: "restrict" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "restrict" }),
    amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
    method: paymentMethodEnum("method").notNull(),
    status: paymentStatusEnum("status").default("pending").notNull(),
    // Gateway references (tokenized for security)
    transactionId: varchar("transaction_id", { length: 100 }).unique(),
    gatewayResponse: jsonb("gateway_response"), // Encrypted or hashed
    // Refund tracking
    refundId: varchar("refund_id", { length: 100 }),
    refundedAmount: decimal("refunded_amount", { precision: 10, scale: 2 }),
    refundedAt: timestamp("refunded_at"),
    failureReason: text("failure_reason"),
    retryCount: integer("retry_count").default(0),
    // Reconciliation
    reconciledAt: timestamp("reconciled_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    orderIdIdx: uniqueIndex("payments_order_id_idx").on(table.orderId),
    userIdIdx: index("payments_user_id_idx").on(table.userId),
    statusIdx: index("payments_status_idx").on(table.status),
    transactionIdIdx: uniqueIndex("payments_transaction_id_idx").on(
      table.transactionId,
    ),
    createdAtIdx: index("payments_created_at_idx").on(table.createdAt),
  }),
);

export const paymentsRelations = relations(payments, ({ one }) => ({
  order: one(orders, {
    fields: [payments.orderId],
    references: [orders.id],
  }),
  user: one(users, {
    fields: [payments.userId],
    references: [users.id],
  }),
}));