ALTER TABLE "comment_reaction" RENAME COLUMN "commentId" TO "comment_id";--> statement-breakpoint
ALTER TABLE "comment_reaction" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "comment" RENAME COLUMN "postId" TO "post_id";--> statement-breakpoint
ALTER TABLE "comment" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "notification" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "notification" RENAME COLUMN "refId" TO "ref_id";--> statement-breakpoint
ALTER TABLE "post_reaction" RENAME COLUMN "postId" TO "post_id";--> statement-breakpoint
ALTER TABLE "post_reaction" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "saved_post" RENAME COLUMN "postId" TO "post_id";--> statement-breakpoint
ALTER TABLE "saved_post" RENAME COLUMN "userId" TO "user_id";--> statement-breakpoint
ALTER TABLE "comment_reaction" DROP CONSTRAINT "comment_reaction_commentId_comment_id_fk";
--> statement-breakpoint
ALTER TABLE "comment_reaction" DROP CONSTRAINT "comment_reaction_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "comment" DROP CONSTRAINT "comment_postId_post_id_fk";
--> statement-breakpoint
ALTER TABLE "comment" DROP CONSTRAINT "comment_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "notification" DROP CONSTRAINT "notification_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "post_reaction" DROP CONSTRAINT "post_reaction_postId_post_id_fk";
--> statement-breakpoint
ALTER TABLE "post_reaction" DROP CONSTRAINT "post_reaction_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "saved_post" DROP CONSTRAINT "saved_post_postId_post_id_fk";
--> statement-breakpoint
ALTER TABLE "saved_post" DROP CONSTRAINT "saved_post_userId_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comment_reaction" ADD CONSTRAINT "comment_reaction_comment_id_comment_id_fk" FOREIGN KEY ("comment_id") REFERENCES "comment"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comment_reaction" ADD CONSTRAINT "comment_reaction_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comment" ADD CONSTRAINT "comment_post_id_post_id_fk" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comment" ADD CONSTRAINT "comment_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "notification" ADD CONSTRAINT "notification_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "post_reaction" ADD CONSTRAINT "post_reaction_post_id_post_id_fk" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "post_reaction" ADD CONSTRAINT "post_reaction_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "saved_post" ADD CONSTRAINT "saved_post_post_id_post_id_fk" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "saved_post" ADD CONSTRAINT "saved_post_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
