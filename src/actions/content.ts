"use server";

import { db, content } from "@/drizzle";

export async function getContentAction() {
  return await db.select().from(content).all();
}
