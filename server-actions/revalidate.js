"use server";

import { revalidatePath } from "next/cache";

export async function revalidatePaths() {
  const bikePaths = [
    "/",
    "/monthly-rentals-hanoi",
    "/monthly-rentals-hanoi/automatic",
    "/monthly-rentals-hanoi/manual",
    "/monthly-rentals-hanoi/semi-auto",
    "/motorbike-rentals-vietnam",
    "/motorbike-rentals-vietnam/automatic",
    "/motorbike-rentals-vietnam/manual",
    "/motorbike-rentals-vietnam/semi-auto",
    "/motorbikes-for-rent-hanoi",
    "/motorbikes-for-rent-hanoi/automatic",
    "/motorbikes-for-rent-hanoi/manual",
    "/motorbikes-for-rent-hanoi/semi-auto",
    "/motorbikes-for-sale",
    "/motorbikes-for-sale/automatic",
    "/motorbikes-for-sale/manual",
    "/motorbikes-for-sale/semi-auto",
  ];

  for (const path of bikePaths) {
    revalidatePath(path);
  }

  return { success: true };
}
