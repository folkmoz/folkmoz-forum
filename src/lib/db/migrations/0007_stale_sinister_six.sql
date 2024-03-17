ALTER TABLE "comment_reaction" RENAME COLUMN "create_at" TO "created_at";--> statement-breakpoint
ALTER TABLE "notification" RENAME COLUMN "create_at" TO "created_at";--> statement-breakpoint
ALTER TABLE "post_reaction" RENAME COLUMN "create_at" TO "created_at";--> statement-breakpoint
ALTER TABLE "post_subscription" RENAME COLUMN "create_at" TO "created_at";--> statement-breakpoint
ALTER TABLE "post" RENAME COLUMN "create_at" TO "created_at";--> statement-breakpoint
ALTER TABLE "saved_post" RENAME COLUMN "create_at" TO "created_at";