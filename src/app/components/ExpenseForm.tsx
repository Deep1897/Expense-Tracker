"use client";

import { useTransition, useRef, useState } from "react";
import { addExpense } from "@/app/actions";

const CATEGORIES = [
  "Groceries",
  "Transport",
  "Utilities",
  "Entertainment",
  "Health",
  "Dining",
  "Shopping",
  "Education",
  "Other",
];

export default function ExpenseForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    setError(null);
    const amount = parseFloat(formData.get("amount")?.toString() || "");
    if (isNaN(amount) || amount <= 0) {
      setError("Amount must be a positive number.");
      return;
    }

    startTransition(async () => {
      try {
        await addExpense(formData);
        formRef.current?.reset();
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Something went wrong.");
      }
    });
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Add Expense</h2>
      <form ref={formRef} action={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">Select category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount ($)
            </label>
            <input
              type="number"
              name="amount"
              required
              min="0.01"
              step="0.01"
              placeholder="0.00"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <input
            type="text"
            name="description"
            required
            placeholder="What did you spend on?"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {error && (
          <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-2 rounded-lg text-sm transition-colors"
        >
          {isPending ? "Adding…" : "Add Expense"}
        </button>
      </form>
    </div>
  );
}
