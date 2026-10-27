import { defineConfig } from "drizzle-kit";

// drizzle-kit doesn't read .env.local on its own, so load it here.
try {
  process.loadEnvFile(".env.local");
} catch {
  // no .env.local: fall back to variables already in the environment
}

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: { url: process.env.DATABASE_URL ?? "" },
});
