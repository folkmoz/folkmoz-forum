CREATE TABLE IF NOT EXISTS "post_subscription" (
	"postId" text NOT NULL,
	"userId" text NOT NULL,
	"create_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "post" ADD COLUMN "title" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "post_subscription" ADD CONSTRAINT "post_subscription_postId_post_id_fk" FOREIGN KEY ("postId") REFERENCES "post"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "post_subscription" ADD CONSTRAINT "post_subscription_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
