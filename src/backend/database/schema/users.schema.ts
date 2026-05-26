import { isNull, relations } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { userRoleEnum, userStatusEnum } from "../utils/enums";
import { adminUsers } from "./admin.schema";
import { carts } from "./carts.schema";
import { addresses } from "./addressess.schema";
import { orders } from "./orders.schema";
import { payments } from "./payments.schema";
import { deliveries } from "./deliveries.schema";
import { auditLogs } from "./auditlogs.schema";

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    phone: varchar("phone", { length: 20 }).notNull().unique(),
    passwordHash: varchar("password_hash", { length: 255 }).notNull(),
    firstName: varchar("first_name", { length: 100 }),
    lastName: varchar("last_name", { length: 100 }),
    role: userRoleEnum("role").default("customer").notNull(),
    status: userStatusEnum("status").default("active").notNull(),
    // SOC 2: Encryption at rest (PostgreSQL pgcrypto or app-level)
    phoneVerified: boolean("phone_verified").default(false),
    emailVerified: boolean("email_verified").default(false),
    // GDPR: Right to be forgotten
    gdprConsent: boolean("gdpr_consent").default(false),
    gdprConsentDate: timestamp("gdpr_consent_date"),
    // Profile metadata (immutable for audit trail)
    profileData: jsonb("profile_data"),
    // SOC 2: Track access patterns
    lastLoginAt: timestamp("last_login_at"),
    lastLoginIp: varchar("last_login_ip", { length: 45 }),
    loginAttempts: integer("login_attempts").default(0),
    loginLockedUntil: timestamp("login_locked_until"),
    // Soft delete for data recovery
    deletedAt: timestamp("deleted_at"),
    // Standard audit columns
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    // Performance indexes
    emailIdx: uniqueIndex("users_email_idx")
      .on(table.email)
      .where(isNull(table.deletedAt)),
    phoneIdx: uniqueIndex("users_phone_idx")
      .on(table.phone)
      .where(isNull(table.deletedAt)),
    roleIdx: index("users_role_idx").on(table.role),
    statusIdx: index("users_status_idx").on(table.status),
    createdAtIdx: index("users_created_at_idx").on(table.createdAt),
    // Composite index for customer lookup
    customerLookupIdx: uniqueIndex("users_customer_lookup").on(
      table.email,
      table.role,
    ),
  }),
);
// ====================================
//  RELATIONS (Drizzle Relations API)
// ====================================

export const usersRelations = relations(users, ({ one, many }) => ({
  addresses: many(addresses),
  carts: many(carts),
  orders: many(orders),
  payments: many(payments),
  deliveries: many(deliveries),
  adminUser: one(adminUsers),
  auditLogs: many(auditLogs),
}));
