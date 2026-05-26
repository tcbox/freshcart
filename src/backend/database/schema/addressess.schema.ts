import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
  index,
  real,
} from "drizzle-orm/pg-core";

import { users } from "./users.schema";
import { relations } from "drizzle-orm";
import { orders } from "./orders.schema";

// =========================
//  ADDRESS TABLE
// =========================
export const addresses = pgTable(
  "addresses",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    label: varchar("label", { length: 50 }), // Home, Office, etc.
    street: varchar("street", { length: 255 }).notNull(),
    city: varchar("city", { length: 100 }).notNull(),
    state: varchar("state", { length: 100 }).notNull(),
    postalCode: varchar("postal_code", { length: 20 }).notNull(),
    country: varchar("country", { length: 100 }).default("India"),
    // Geolocation (PostGIS or decimal for MVP)
    latitude: real("latitude").notNull(),
    longitude: real("longitude").notNull(),
    // Geohash for efficient radius queries (store separately for indexing)
    geohash: varchar("geohash", { length: 12 }),
    // Delivery instructions
    instructions: text("instructions"),
    isDefault: boolean("is_default").default(false),
    isActive: boolean("is_active").default(true),
    deletedAt: timestamp("deleted_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    userIdIdx: index("addresses_user_id_idx").on(table.userId),
    geohashIdx: index("addresses_geohash_idx").on(table.geohash),
    isDefaultIdx: index("addresses_is_default_idx").on(table.isDefault),
    // GIS-style index for geographic queries (if using PostGIS)
    // gisIdx: index('addresses_coords_gis_idx').using('gist').on(table.coordinates),
  }),
);

// =========================
//  ADDRESS TABLE RELATION
// =========================
export const addressesRelations = relations(addresses, ({ one, many }) => ({
  user: one(users, {
    fields: [addresses.userId],
    references: [users.id],
  }),
  orders: many(orders),
}));
