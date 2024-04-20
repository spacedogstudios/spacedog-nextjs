"use server";

import { db, content } from "@/app/drizzle";

export async function getContentAction() {
  return await db.select().from(content).all();
}
