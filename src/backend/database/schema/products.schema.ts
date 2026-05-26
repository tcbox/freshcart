import {
  boolean,
  decimal,
  index,
  integer,
  jsonb,
  pgTable,
  real,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { categories } from "./categories.schema";
import { isNull, relations } from "drizzle-orm";
import { cartItems } from "./carts.schema";
import { orderItems } from "./orders.schema";

export const products = pgTable(
  "products",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    categoryId: uuid("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "restrict" }),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull(),
    description: text("description"),
    // Pricing
    basePrice: decimal("base_price", { precision: 10, scale: 2 }).notNull(),
    // Discount & offers
    discountPrice: decimal("discount_price", { precision: 10, scale: 2 }),
    discountPercent: integer("discount_percent"),
    discountValidUntil: timestamp("discount_valid_until"),
    // Inventory
    stock: integer("stock").notNull().default(0),
    minStock: integer("min_stock").default(5),
    // Product details
    imageUrl: varchar("image_url", { length: 500 }),
    weight: varchar("weight", { length: 50 }), // "500g", "1kg", etc.
    unit: varchar("unit", { length: 50 }), // "kg", "pack", "piece", etc.
    nutritionInfo: jsonb("nutrition_info"), // Calories, protein, carbs, etc.
    origin: varchar("origin", { length: 100 }), // Farm location (rural transparency)
    expiryDays: integer("expiry_days"), // Days shelf life
    // Status & publishing
    isActive: boolean("is_active").default(true),
    isFeatured: boolean("is_featured").default(false),
    // SEO & discovery
    tags: text("tags"), // Comma-separated for full-text search
    rating: real("rating").default(0),
    reviewCount: integer("review_count").default(0),
    deletedAt: timestamp("deleted_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    categoryIdx: index("products_category_id_idx").on(table.categoryId),
    slugIdx: uniqueIndex("products_slug_idx")
      .on(table.slug)
      .where(isNull(table.deletedAt)),
    isActiveIdx: index("products_is_active_idx").on(table.isActive),
    isFeaturedIdx: index("products_is_featured_idx").on(table.isFeatured),
    stockIdx: index("products_stock_idx").on(table.stock),
    // Full-text search on name + tags
    searchIdx: index("products_search_idx").using(
      "gin",
      table.name,
      table.tags,
    ),
  }),
);

// ====================
//  PRODUCT RELATIONS
// ====================
export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  cartItems: many(cartItems),
  orderItems: many(orderItems),
}));
