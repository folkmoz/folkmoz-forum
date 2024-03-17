ALTER TABLE "comment" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "comment" DROP COLUMN IF EXISTS "create_at";