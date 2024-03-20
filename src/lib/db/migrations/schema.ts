import { pgTable, foreignKey, pgEnum, text, timestamp, integer, boolean, primaryKey } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const reactions = pgEnum("reactions", ['angry', 'sad', 'wow', 'haha', 'love', 'like'])


export const session = pgTable("session", {
	sessionToken: text("sessionToken").primaryKey().notNull(),
	userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" } ),
	expires: timestamp("expires", { mode: 'string' }).notNull(),
});

export const post = pgTable("post", {
	id: text("id").primaryKey().notNull(),
	userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" } ),
	body: text("body").notNull(),
	imageCover: text("image_cover"),
	visited: integer("visited").default(0),
	createdAt: timestamp("created_at", { precision: 6, withTimezone: true, mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
	title: text("title").notNull(),
});

export const comment = pgTable("comment", {
	id: text("id").primaryKey().notNull(),
	postId: text("post_id").notNull().references(() => post.id, { onDelete: "cascade" } ),
	userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" } ),
	content: text("content").notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
	createdAt: timestamp("created_at", { precision: 6, withTimezone: true, mode: 'string' }).defaultNow(),
});

export const user = pgTable("user", {
	id: text("id").primaryKey().notNull(),
	name: text("name"),
	email: text("email").notNull(),
	emailVerified: timestamp("emailVerified", { mode: 'string' }),
	image: text("image"),
	createdAt: timestamp("createdAt", { mode: 'string' }).defaultNow(),
});

export const commentReaction = pgTable("comment_reaction", {
	commentId: text("comment_id").notNull().references(() => comment.id, { onDelete: "cascade" } ),
	userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" } ),
	reactionType: reactions("reaction_type").notNull(),
	createdAt: timestamp("created_at", { precision: 6, withTimezone: true, mode: 'string' }).defaultNow(),
});

export const notification = pgTable("notification", {
	id: text("id").primaryKey().notNull(),
	userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" } ),
	refId: text("ref_id"),
	content: text("content").notNull(),
	type: text("type").notNull(),
	read: boolean("read").default(false),
	createdAt: timestamp("created_at", { precision: 6, withTimezone: true, mode: 'string' }).defaultNow(),
});

export const postReaction = pgTable("post_reaction", {
	postId: text("post_id").notNull().references(() => post.id, { onDelete: "cascade" } ),
	userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" } ),
	reactionType: reactions("reaction_type").notNull(),
	createdAt: timestamp("created_at", { precision: 6, withTimezone: true, mode: 'string' }).defaultNow(),
});

export const savedPost = pgTable("saved_post", {
	postId: text("post_id").notNull().references(() => post.id, { onDelete: "cascade" } ),
	userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" } ),
	createdAt: timestamp("created_at", { precision: 6, withTimezone: true, mode: 'string' }).defaultNow(),
});

export const postSubscription = pgTable("post_subscription", {
	postId: text("post_id").notNull().references(() => post.id, { onDelete: "cascade" } ),
	userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" } ),
	createdAt: timestamp("created_at", { precision: 6, withTimezone: true, mode: 'string' }).defaultNow(),
});

export const verificationToken = pgTable("verificationToken", {
	identifier: text("identifier").notNull(),
	token: text("token").notNull(),
	expires: timestamp("expires", { mode: 'string' }).notNull(),
},
(table) => {
	return {
		verificationTokenIdentifierTokenPk: primaryKey({ columns: [table.identifier, table.token], name: "verificationToken_identifier_token_pk"})
	}
});

export const account = pgTable("account", {
	userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" } ),
	type: text("type").notNull(),
	provider: text("provider").notNull(),
	providerAccountId: text("providerAccountId").notNull(),
	refreshToken: text("refresh_token"),
	accessToken: text("access_token"),
	expiresAt: integer("expires_at"),
	tokenType: text("token_type"),
	scope: text("scope"),
	idToken: text("id_token"),
	sessionState: text("session_state"),
},
(table) => {
	return {
		accountProviderProviderAccountIdPk: primaryKey({ columns: [table.provider, table.providerAccountId], name: "account_provider_providerAccountId_pk"})
	}
});