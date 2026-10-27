import { boolean, integer, jsonb, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  body: text("body").notNull(),
  read: boolean("read").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  details: jsonb("details").$type<string[]>().notNull().default([]),
  stack: jsonb("stack").$type<string[]>().notNull().default([]),
  period: text("period").notNull(),
  context: text("context"),
  repo: text("repo"),
  live: text("live"),
  featured: boolean("featured").notNull().default(false),
  position: integer("position").notNull().default(0),
  visible: boolean("visible").notNull().default(true),
});

export const chatLog = pgTable("chat_log", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type MessageRow = typeof messages.$inferSelect;
export type ProjectRow = typeof projects.$inferSelect;
