import { adminRoleEnum } from "../utils/enums";

import {
  boolean,
  foreignKey,
  index,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { users } from "./users.schema";
import { relations } from "drizzle-orm";
import { auditLogs } from "./auditlogs.schema";

export const adminUsers = pgTable(
  "admin_users",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, {
        onDelete: "cascade",
      }),

    role: adminRoleEnum("role").notNull(),

    permissions: jsonb("permissions"),

    department: varchar("department", {
      length: 100,
    }),

    // Security
    ipWhitelist: text("ip_whitelist"),

    mfaEnabled: boolean("mfa_enabled").default(false).notNull(),

    mfaSecret: varchar("mfa_secret", {
      length: 255,
    }),

    // Activity tracking
    lastAccessAt: timestamp("last_access_at"),

    lastAccessIp: varchar("last_access_ip", { length: 45 }),

    isActive: boolean("is_active").default(true).notNull(),

    suspendedReason: text("suspended_reason"),

    // Audit
    assignedAt: timestamp("assigned_at").defaultNow().notNull(),

    assignedBy: uuid("assigned_by"),

    revokedAt: timestamp("revoked_at"),

    revokedBy: uuid("revoked_by"),

    createdAt: timestamp("created_at").defaultNow().notNull(),

    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },

  (table) => ({
    // One admin profile per user
    userIdIdx: uniqueIndex("admin_users_user_id_idx").on(table.userId),

    // Fast role filtering
    roleIdx: index("admin_users_role_idx").on(table.role),

    // Fast active admin lookup
    isActiveIdx: index("admin_users_is_active_idx").on(table.isActive),

    // Useful for dashboards/audits
    createdAtIdx: index("admin_users_created_at_idx").on(table.createdAt),
    assignedByFk: foreignKey({
      columns: [table.assignedBy],
      foreignColumns: [table.id],
      name: "admin_users_assigned_by_fk",
    }).onDelete("set null"),

    revokedByFk: foreignKey({
      columns: [table.revokedBy],
      foreignColumns: [table.id],
      name: "admin_users_revoked_by_fk",
    }).onDelete("set null"),
  }),
);

// ========================
//  ADMIN RELATIONS
// ========================

export const adminUsersRelations = relations(adminUsers, ({ one, many }) => ({
  user: one(users, {
    fields: [adminUsers.userId],
    references: [users.id],
  }),
  assignedByAdmin: one(adminUsers, {
    fields: [adminUsers.assignedBy],
    references: [adminUsers.id],
    relationName: "assignedBy",
  }),
  revokedByAdmin: one(adminUsers, {
    fields: [adminUsers.revokedBy],
    references: [adminUsers.id],
    relationName: "revokedBy",
  }),
  auditLogs: many(auditLogs),
}));
