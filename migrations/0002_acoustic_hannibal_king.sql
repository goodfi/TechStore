CREATE TABLE "specification" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "specyfication" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "specyfication" CASCADE;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "updatedAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "updatedAt" SET NOT NULL;