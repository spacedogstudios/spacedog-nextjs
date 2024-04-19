import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { InferSelectModel } from "drizzle-orm";

export const content = sqliteTable("content", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  route_id: text("route_id").notNull().default(""),
  subheading: text("subheading"),
  tagline: text("tagline"),
  body: text("body"),
});

export type ContentRow = InferSelectModel<typeof content>;
