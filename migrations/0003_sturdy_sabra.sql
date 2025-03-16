CREATE TABLE "product_to_category" (
	"productId" uuid NOT NULL,
	"categoryId" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "category" ADD COLUMN "parentId" uuid;--> statement-breakpoint
ALTER TABLE "spectab" ADD COLUMN "specificationId" uuid;--> statement-breakpoint
ALTER TABLE "specification" ADD COLUMN "productId" uuid;--> statement-breakpoint
ALTER TABLE "variantTab" ADD COLUMN "variantId" uuid;--> statement-breakpoint
ALTER TABLE "variants" ADD COLUMN "productId" uuid;--> statement-breakpoint
ALTER TABLE "product_to_category" ADD CONSTRAINT "product_to_category_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_to_category" ADD CONSTRAINT "product_to_category_categoryId_category_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."category"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "category" ADD CONSTRAINT "category_parentId_category_id_fk" FOREIGN KEY ("parentId") REFERENCES "public"."category"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "spectab" ADD CONSTRAINT "spectab_specificationId_specification_id_fk" FOREIGN KEY ("specificationId") REFERENCES "public"."specification"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "specification" ADD CONSTRAINT "specification_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "variantTab" ADD CONSTRAINT "variantTab_variantId_variants_id_fk" FOREIGN KEY ("variantId") REFERENCES "public"."variants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "variants" ADD CONSTRAINT "variants_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;