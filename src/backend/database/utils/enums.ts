import { pgEnum } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", [
  "customer",
  "driver",
  "admin",
]);
export const userStatusEnum = pgEnum("user_status", [
  "active",
  "inactive",
  "suspended",
  "deleted",
]);

// ==================
// ADMIN & ADUIT
// ==================

export const adminRoleEnum = pgEnum("admin_role", [
  "super_admin",
  "manager",
  "support",
  "analytics",
  "finance",
]);

export const auditActionEnum = pgEnum("audit_action", [
  "create",
  "update",
  "delete",
  "read",
  "export",
  "login",
  "logout",
  "permission_change",
]);

// ==================
// PAYMENTS
// ==================

export const paymentMethodEnum = pgEnum("payment_method", [
  "upi",
  "card",
  "wallet",
  "cash",
]);
export const paymentStatusEnum = pgEnum("payment_status", [
  "pending",
  "processing",
  "completed",
  "failed",
  "refunded",
]);

// ==================
// ORDERS
// ==================

export const orderStatusEnum = pgEnum("order_status", [
  "pending",
  "confirmed",
  "preparing",
  "ready",
  "picked_up",
  "in_transit",
  "delivered",
  "cancelled",
  "failed",
]);

// ==================
// DELIVERY
// ==================
export const deliveryStatusEnum = pgEnum("delivery_status", [
  "unassigned",
  "assigned",
  "picked_up",
  "in_transit",
  "arrived",
  "delivered",
  "failed",
]);
