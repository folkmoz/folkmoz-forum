ALTER TABLE "comment_reaction" RENAME COLUMN "like" TO "reaction_type";--> statement-breakpoint
ALTER TABLE "post_reaction" RENAME COLUMN "like" TO "reaction_type";