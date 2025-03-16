ALTER TABLE "products" ADD COLUMN "img" text NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "rating" double precision DEFAULT 0 NOT NULL;