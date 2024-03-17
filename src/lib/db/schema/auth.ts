import {
    timestamp,
    pgTable,
    text,
    primaryKey,
    integer,
    pgEnum,
    boolean,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";
import { nanoid } from "@/lib/utils";

export const reactions = pgEnum("reactions", [
    "like",
    "love",
    "haha",
    "wow",
    "sad",
    "angry",
]);

export const users = pgTable("user", {
    id: text("id").notNull().primaryKey(),
    name: text("name"),
    email: text("email").notNull(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
    created_at: timestamp("createdAt").defaultNow(),
});

export const post = pgTable("post", {
    id: text("id")
        .primaryKey()
        .notNull()
        .$defaultFn(() => nanoid()),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    body: text("body").notNull(),
    imageCover: text("image_cover"),
    visited: integer("visited").default(0),
    createdAt: timestamp("created_at", {
        precision: 6,
        withTimezone: true,
    }).defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "string" }),
    title: text("title").notNull(),
});

export const user = pgTable("user", {
    id: text("id").primaryKey().notNull(),
    name: text("name"),
    email: text("email").notNull(),
    emailVerified: timestamp("emailVerified", { mode: "string" }),
    image: text("image"),
    createdAt: timestamp("createdAt", { mode: "string" }).defaultNow(),
});

export const comment = pgTable("comment", {
    id: text("id")
        .primaryKey()
        .notNull()
        .$defaultFn(() => nanoid()),
    postId: text("post_id")
        .notNull()
        .references(() => post.id, { onDelete: "cascade" }),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    content: text("content").notNull(),
    createdAt: timestamp("created_at", {
        precision: 6,
        withTimezone: true,
    }).defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "string" }),
});

export const commentReaction = pgTable("comment_reaction", {
    commentId: text("comment_id")
        .notNull()
        .references(() => comment.id, { onDelete: "cascade" }),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    reactionType: reactions("reaction_type").notNull(),
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
});

export const notification = pgTable("notification", {
    id: text("id")
        .primaryKey()
        .notNull()
        .$defaultFn(() => nanoid()),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    refId: text("ref_id"),
    content: text("content").notNull(),
    type: text("type").notNull(),
    read: boolean("read").default(false),
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
});

export const postReaction = pgTable("post_reaction", {
    postId: text("post_id")
        .notNull()
        .references(() => post.id, { onDelete: "cascade" }),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    reactionType: reactions("reaction_type").notNull(),
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
});

export const savedPost = pgTable("saved_post", {
    postId: text("post_id")
        .notNull()
        .references(() => post.id, { onDelete: "cascade" }),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
});

export const postSubscription = pgTable("post_subscription", {
    postId: text("post_id")
        .notNull()
        .references(() => post.id, { onDelete: "cascade" }),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
});

export const accounts = pgTable(
    "account",
    {
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        type: text("type").$type<AdapterAccount["type"]>().notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state"),
    },
    (account) => ({
        compoundKey: primaryKey(account.provider, account.providerAccountId),
    }),
);

export const sessions = pgTable("session", {
    sessionToken: text("sessionToken").notNull().primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
    "verificationToken",
    {
        identifier: text("identifier").notNull(),
        token: text("token").notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (vt) => ({
        compoundKey: primaryKey(vt.identifier, vt.token),
    }),
);
