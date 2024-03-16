ALTER TABLE "post_subscription" RENAME COLUMN "postId" TO "post_id";--> statement-breakpoint
ALTER TABLE "post_subscription" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "post_subscription" DROP CONSTRAINT "post_subscription_postId_post_id_fk";
--> statement-breakpoint
ALTER TABLE "post_subscription" DROP CONSTRAINT "post_subscription_userId_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "post_subscription" ADD CONSTRAINT "post_subscription_post_id_post_id_fk" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "post_subscription" ADD CONSTRAINT "post_subscription_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
