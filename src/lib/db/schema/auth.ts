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

export const reactionsEnum = pgEnum("reactions", [
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

export const posts = pgTable("post", {
    id: text("id")
        .notNull()
        .primaryKey()
        .$defaultFn(() => nanoid()),
    userId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    body: text("body").notNull(),
    image_cover: text("image_cover"),
    visited: integer("visited").default(0),
    created_at: timestamp("create_at").defaultNow(),
    updated_at: timestamp("updated_at"),
});

export const postReactions = pgTable("post_reaction", {
    postId: text("post_id")
        .notNull()
        .references(() => posts.id, { onDelete: "cascade" }),
    userId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    reaction: reactionsEnum("like").notNull(),
    created_at: timestamp("create_at").defaultNow(),
});

export const comments = pgTable("comment", {
    id: text("id")
        .notNull()
        .primaryKey()
        .$defaultFn(() => nanoid()),
    postId: text("post_id")
        .notNull()
        .references(() => posts.id, { onDelete: "cascade" }),
    userId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    content: text("content").notNull(),
    created_at: timestamp("create_at").defaultNow(),
    updated_at: timestamp("updated_at"),
});

export const commentReactions = pgTable("comment_reaction", {
    commentId: text("comment_id")
        .notNull()
        .references(() => comments.id, { onDelete: "cascade" }),
    userId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    reaction: reactionsEnum("like").notNull(),
    created_at: timestamp("create_at").defaultNow(),
});

export const savedPosts = pgTable("saved_post", {
    postId: text("post_id")
        .notNull()
        .references(() => posts.id, { onDelete: "cascade" }),
    userId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    created_at: timestamp("create_at").defaultNow(),
});

export const notifications = pgTable("notification", {
    id: text("id")
        .notNull()
        .primaryKey()
        .$defaultFn(() => nanoid()),
    userId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    refId: text("ref_id"),
    content: text("content").notNull(),
    type: text("type").notNull(),
    read: boolean("read").default(false),
    created_at: timestamp("create_at").defaultNow(),
});

export const postSubscriptions = pgTable("post_subscription", {
    postId: text("post_id")
        .notNull()
        .references(() => posts.id, { onDelete: "cascade" }),
    userId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    created_at: timestamp("create_at").defaultNow(),
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
