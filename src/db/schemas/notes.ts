import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const notes = pgTable("notes", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  text: text("text").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Note = typeof notes.$inferSelect;
