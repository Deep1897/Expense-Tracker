"use server";

import { revalidatePath } from "next/cache";
import {
  addExpense as storeAdd,
  deleteExpense as storeDelete,
} from "@/lib/expenses";
import { randomUUID } from "crypto";

export async function addExpense(formData: FormData) {
  const category = formData.get("category")?.toString().trim();
  const amountRaw = formData.get("amount")?.toString().trim();
  const description = formData.get("description")?.toString().trim();

  if (!category || !amountRaw || !description) {
    throw new Error("All fields are required.");
  }

  const amount = parseFloat(amountRaw);
  if (isNaN(amount) || amount <= 0) {
    throw new Error("Amount must be a positive number.");
  }

  storeAdd({
    id: randomUUID(),
    category,
    amount,
    description,
    date: new Date().toISOString().split("T")[0],
  });

  revalidatePath("/");
}

export async function deleteExpense(id: string) {
  storeDelete(id);
  revalidatePath("/");
}
