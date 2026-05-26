import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { products } from "./products.schema";

// ========================
// CATEGORIES TABLE
// ========================

export const categories = pgTable(
  "categories",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 100 }).notNull().unique(),
    slug: varchar("slug", { length: 100 }).notNull().unique(),
    description: text("description"),
    icon: varchar("icon", { length: 255 }), // URL or emoji
    imageUrl: varchar("image_url", { length: 500 }),
    displayOrder: integer("display_order").default(0),
    isActive: boolean("is_active").default(true),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    slugIdx: uniqueIndex("categories_slug_idx").on(table.slug),
    isActiveIdx: index("categories_is_active_idx").on(table.isActive),
  }),
);

// ========================
// CATEGORIES TABLE RELATIONS
// ========================

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));