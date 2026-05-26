import {
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  boolean,
  index,
} from "drizzle-orm/pg-core";
import { users } from "./users.schema";
import { auditActionEnum } from "../utils/enums";
import { adminUsers } from "./admin.schema";
import { relations } from "drizzle-orm";

export const auditLogs = pgTable(
  "audit_logs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    // Actor
    userId: uuid("user_id").references(() => users.id, {
      onDelete: "set null",
    }),
    adminUserId: uuid("admin_user_id").references(() => adminUsers.id, {
      onDelete: "set null",
    }),
    // Action details
    action: auditActionEnum("action").notNull(),
    entity: varchar("entity", { length: 100 }).notNull(), // Table name: 'orders', 'users', etc.
    entityId: uuid("entity_id"), // ID of affected record
    changesBefore: jsonb("changes_before"), // Previous state
    changesAfter: jsonb("changes_after"), // New state
    // Context
    ipAddress: varchar("ip_address", { length: 45 }).notNull(),
    userAgent: text("user_agent"),
    endpoint: varchar("endpoint", { length: 255 }), // API path
    method: varchar("method", { length: 10 }), // GET, POST, etc.
    statusCode: integer("status_code"),
    // Data classification (GDPR/privacy sensitive)
    containsSensitiveData: boolean("contains_sensitive_data").default(false),
    // Timestamp (immutable)
    timestamp: timestamp("timestamp").defaultNow().notNull(),
  },
  (table) => ({
    // Performance indexes (read-heavy audit queries)
    userIdIdx: index("audit_logs_user_id_idx").on(table.userId),
    entityIdx: index("audit_logs_entity_idx").on(table.entity),
    entityIdIdx: index("audit_logs_entity_id_idx").on(table.entityId),
    actionIdx: index("audit_logs_action_idx").on(table.action),
    timestampIdx: index("audit_logs_timestamp_idx").on(table.timestamp),
    // Composite for forensic queries: "all actions on order X"
    entityTrailIdx: index("audit_logs_entity_trail_idx").on(
      table.entity,
      table.entityId,
      table.timestamp,
    ),
    // Composite for user activity: "all actions by user Y in time range"
    userActivityIdx: index("audit_logs_user_activity_idx").on(
      table.userId,
      table.timestamp,
    ),
  }),
);

// ========================
//  AUDIT LOGS RELATION
// ========================

export const auditLogsRelations = relations(auditLogs, ({ one }) => ({
  user: one(users, {
    fields: [auditLogs.userId],
    references: [users.id],
  }),
  adminUser: one(adminUsers, {
    fields: [auditLogs.adminUserId],
    references: [adminUsers.id],
  }),
}));
