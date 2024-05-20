import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { env } from "@/lib/env.mjs";
import * as fs from "node:fs";

export const pool = new Pool({
    connectionString: env.DATABASE_URL,
    ssl: {
        cert: fs.readFileSync("certificate.pem"),
    },
});
export const db = drizzle(pool);
