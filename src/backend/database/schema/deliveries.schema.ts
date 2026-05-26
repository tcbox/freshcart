import {
  boolean,
  index,
  integer,
  pgTable,
  real,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { orders } from "./orders.schema";
import { users } from "./users.schema";
import { deliveryStatusEnum } from "../utils/enums";
import { relations } from "drizzle-orm";

export const deliveries = pgTable(
  "deliveries",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    orderId: uuid("order_id")
      .notNull()
      .unique()
      .references(() => orders.id, { onDelete: "restrict" }),
    driverId: uuid("driver_id").references(() => users.id, {
      onDelete: "set null",
    }),
    status: deliveryStatusEnum("status").default("unassigned").notNull(),
    // Route & estimation
    estimatedDistanceKm: real("estimated_distance_km"),
    estimatedDurationMin: integer("estimated_duration_min"),
    estimatedDeliveryAt: timestamp("estimated_delivery_at"),
    actualDeliveryAt: timestamp("actual_delivery_at"),
    // OTP for proof of delivery
    deliveryOtp: varchar("delivery_otp", { length: 6 }),
    otpVerifiedAt: timestamp("otp_verified_at"),
    // Delivery signature (can be image hash)
    signatureUrl: varchar("signature_url", { length: 500 }),
    // Photo proof
    deliveryPhotoUrl: varchar("delivery_photo_url", { length: 500 }),
    // Timestamps
    assignedAt: timestamp("assigned_at"),
    pickedUpAt: timestamp("picked_up_at"),
    arrivedAt: timestamp("arrived_at"),
    // Customer contact
    customerPhoneVerified: boolean("customer_phone_verified").default(false),
    failureReason: text("failure_reason"),
    attemptCount: integer("attempt_count").default(1),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    orderIdIdx: uniqueIndex("deliveries_order_id_idx").on(table.orderId),
    driverIdIdx: index("deliveries_driver_id_idx").on(table.driverId),
    statusIdx: index("deliveries_status_idx").on(table.status),
    estimatedDeliveryIdx: index("deliveries_estimated_delivery_idx").on(
      table.estimatedDeliveryAt,
    ),
  }),
);

// Real-time tracking points (immutable audit trail for delivery)
export const deliveryTracking = pgTable(
  "delivery_tracking",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    deliveryId: uuid("delivery_id")
      .notNull()
      .references(() => deliveries.id, { onDelete: "cascade" }),
    status: deliveryStatusEnum("status").notNull(),
    latitude: real("latitude").notNull(),
    longitude: real("longitude").notNull(),
    geohash: varchar("geohash", { length: 12 }),
    accuracy: real("accuracy"), // GPS accuracy in meters
    speed: real("speed"), // Speed in km/h
    heading: real("heading"), // Direction
    timestamp: timestamp("timestamp").defaultNow().notNull(),
  },
  (table) => ({
    deliveryIdIdx: index("delivery_tracking_delivery_id_idx").on(
      table.deliveryId,
    ),
    geohashIdx: index("delivery_tracking_geohash_idx").on(table.geohash),
    timestampIdx: index("delivery_tracking_timestamp_idx").on(table.timestamp),
    // Composite for time-range queries per delivery
    deliveryTimeIdx: index("delivery_tracking_delivery_time_idx").on(
      table.deliveryId,
      table.timestamp,
    ),
  }),
);

export const deliveriesRelations = relations(deliveries, ({ one, many }) => ({
  order: one(orders, {
    fields: [deliveries.orderId],
    references: [orders.id],
  }),
  driver: one(users, {
    fields: [deliveries.driverId],
    references: [users.id],
  }),
  trackingPoints: many(deliveryTracking),
}));

export const deliveryTrackingRelations = relations(
  deliveryTracking,
  ({ one }) => ({
    delivery: one(deliveries, {
      fields: [deliveryTracking.deliveryId],
      references: [deliveries.id],
    }),
  }),
);
