import { relations } from 'drizzle-orm';

import {
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  doublePrecision,
  uuid,
  integer,
} from 'drizzle-orm/pg-core';

export const userRoles = ['admin', 'user'] as const;
export type UserRole = (typeof userRoles)[number];
export const userRoleEnum = pgEnum('user_roles', userRoles);

//auth user

export const UserTable = pgTable('users', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  email: text().notNull().unique(),
  password: text(),
  salt: text(),
  role: userRoleEnum().notNull().default('user'),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const userRelations = relations(UserTable, ({ many }) => ({
  oAuthAccounts: many(UserOAuthAccountTable),
}));

export const oAuthProviders = ['discord', 'github'] as const;
export type OAuthProvider = (typeof oAuthProviders)[number];
export const oAuthProviderEnum = pgEnum('oauth_provides', oAuthProviders);

export const UserOAuthAccountTable = pgTable(
  'user_oauth_accounts',
  {
    userId: uuid()
      .notNull()
      .references(() => UserTable.id, { onDelete: 'cascade' }),
    provider: oAuthProviderEnum().notNull(),
    providerAccountId: text().notNull().unique(),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp({ withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (t) => [primaryKey({ columns: [t.providerAccountId, t.provider] })]
);

export const userOauthAccountRelationships = relations(
  UserOAuthAccountTable,
  ({ one }) => ({
    user: one(UserTable, {
      fields: [UserOAuthAccountTable.userId],
      references: [UserTable.id],
    }),
  })
);

export const statusEnum = pgEnum('status', [
  'In Stock',
  'InStock',
  'LowStock',
  'OutofStock',
]);

// Product table
export const Product = pgTable('products', {
  id: uuid().primaryKey().defaultRandom(),
  img: text().notNull(),
  name: text().notNull(),
  slug: text().notNull().unique(),
  status: statusEnum('status').default('OutofStock').notNull(),
  rating: doublePrecision().notNull().default(0),
  price: doublePrecision().notNull(),
  lowestPrice: doublePrecision().notNull(),
  reductionPrice: doublePrecision(),
  desc: text().notNull(),
  quantity: integer().notNull().default(0),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
});

// Specification table
export const Specification = pgTable('specification', {
  id: uuid().primaryKey().defaultRandom(),
  title: text().notNull(),
  productId: uuid().references(() => Product.id, { onDelete: 'cascade' }), // Add foreign key
});

// SpecTab table
export const SpecTab = pgTable('spectab', {
  id: uuid().primaryKey().defaultRandom(),
  title: text().notNull(),
  values: text().notNull(),
  specificationId: uuid().references(() => Specification.id, {
    onDelete: 'cascade',
  }), // Add foreign key
});

// Category table
export const Category = pgTable('category', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  slug: text().notNull().unique(),
  // Use AnyPgColumn type to break the circular reference
});

// ProductToCategory junction table for many-to-many
export const ProductToCategory = pgTable('product_to_category', {
  productId: uuid()
    .notNull()
    .references(() => Product.id, { onDelete: 'cascade' }),
  categoryId: uuid()
    .notNull()
    .references(() => Category.id, { onDelete: 'cascade' }),
});

// Variants table
export const Variants = pgTable('variants', {
  id: uuid().primaryKey().defaultRandom(),
  title: text().notNull(),
  productId: uuid().references(() => Product.id, { onDelete: 'cascade' }), // Add foreign key
});

// VariantTab table
export const VariantTab = pgTable('variantTab', {
  id: uuid().primaryKey().defaultRandom(),
  title: text().notNull(),
  values: text().notNull(),
  variantId: uuid().references(() => Variants.id, { onDelete: 'cascade' }), // Add foreign key
});

// Relations definitions
export const ProductRelations = relations(Product, ({ many }) => ({
  specifications: many(Specification),
  productCategories: many(ProductToCategory),
  variants: many(Variants),
}));

export const SpecificationRelations = relations(
  Specification,
  ({ one, many }) => ({
    product: one(Product, {
      fields: [Specification.productId],
      references: [Product.id],
    }),
    specTabs: many(SpecTab),
  })
);

export const SpecTabRelations = relations(SpecTab, ({ one }) => ({
  specification: one(Specification, {
    fields: [SpecTab.specificationId],
    references: [Specification.id],
  }),
}));

export const CategoryRelations = relations(Category, ({ many }) => ({
  children: many(Category, { relationName: 'parent' }),
  productCategories: many(ProductToCategory),
}));

export const ProductToCategoryRelations = relations(
  ProductToCategory,
  ({ one }) => ({
    product: one(Product, {
      fields: [ProductToCategory.productId],
      references: [Product.id],
    }),
    category: one(Category, {
      fields: [ProductToCategory.categoryId],
      references: [Category.id],
    }),
  })
);

export const VariantsRelations = relations(Variants, ({ one, many }) => ({
  product: one(Product, {
    fields: [Variants.productId],
    references: [Product.id],
  }),
  variantTabs: many(VariantTab),
}));

export const VariantTabRelations = relations(VariantTab, ({ one }) => ({
  variant: one(Variants, {
    fields: [VariantTab.variantId],
    references: [Variants.id],
  }),
}));
