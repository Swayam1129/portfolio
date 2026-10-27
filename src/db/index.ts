import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

type DB = ReturnType<typeof drizzle<typeof schema>>;

let cached: DB | null = null;

/** Returns the database, or null when DATABASE_URL isn't set (the site still works without it). */
export function getDb(): DB | null {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  if (!cached) cached = drizzle(neon(url), { schema });
  return cached;
}

export { schema };
