import { db } from "@/lib/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { DefaultSession, getServerSession, NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import { redirect } from "next/navigation";
import { env } from "@/lib/env.mjs";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";

declare module "next-auth" {
    interface Session {
        user: DefaultSession["user"] & {
            id: string;
        };
    }
}

export type User = {
    id: string;
    name: string;
    email: string;
    image?: string;
};

export type AuthSession = {
    session: {
        user: User;
    } | null;
};

export const authOptions: NextAuthOptions = {
    adapter: DrizzleAdapter(db) as Adapter,
    callbacks: {
        session: ({ session, user }) => {
            session.user.id = user.id;
            return session;
        },
        signIn: async ({ user, account, profile }) => {
            return true;
        },
    },
    providers: [
        GoogleProvider({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
        }),
    ],
};

export const getUserAuth = async () => {
    const session = await getServerSession(authOptions);
    return { session } as AuthSession;
};

export const checkAuth = async () => {
    const { session } = await getUserAuth();
    if (!session) redirect("/api/auth/signin");
};
