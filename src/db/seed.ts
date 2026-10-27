// Copies the projects from src/content/profile.ts into the database.
// Run once after `npm run db:push`:  npm run db:seed
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { projects } from "./schema.ts";
import { profile } from "../content/profile.ts";
import { projectToRow } from "./rows.ts";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set. Add it to .env.local first.");
  process.exit(1);
}

const db = drizzle(neon(url));

for (const [position, p] of profile.projects.entries()) {
  const row = projectToRow(p, position);
  await db.insert(projects).values(row).onConflictDoUpdate({ target: projects.slug, set: row });
  console.log(`Seeded ${p.title}`);
}
console.log("Done.");
