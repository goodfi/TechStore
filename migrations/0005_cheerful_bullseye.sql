CREATE TYPE "public"."status" AS ENUM('In Stock', 'InStock', 'LowStock', 'OutofStock');--> statement-breakpoint
ALTER TABLE "category" DROP CONSTRAINT "category_parentId_category_id_fk";
--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "reductionPrice" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "status" "status" DEFAULT 'OutofStock' NOT NULL;--> statement-breakpoint
ALTER TABLE "category" DROP COLUMN "parentId";