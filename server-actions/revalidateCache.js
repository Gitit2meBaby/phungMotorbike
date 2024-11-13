"use server";

import { revalidatePath } from "next/cache";
import { clearBikeCache } from "../app/lib/clearBikeCache";

export async function revalidateCache() {
  // Revalidate the entire site
  revalidatePath("/", "layout");
  clearBikeCache();

  return { message: "Revalidation triggered" };
}
