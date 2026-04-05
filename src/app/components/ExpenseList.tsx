"use client";

import { useTransition } from "react";
import { deleteExpense } from "@/app/actions";
import type { Expense } from "@/lib/expenses";

const CATEGORY_COLORS: Record<string, string> = {
  Groceries: "bg-green-100 text-green-700",
  Transport: "bg-blue-100 text-blue-700",
  Utilities: "bg-yellow-100 text-yellow-700",
  Entertainment: "bg-purple-100 text-purple-700",
  Health: "bg-red-100 text-red-700",
  Dining: "bg-orange-100 text-orange-700",
  Shopping: "bg-pink-100 text-pink-700",
  Education: "bg-cyan-100 text-cyan-700",
  Other: "bg-gray-100 text-gray-700",
};

function ExpenseItem({ expense }: { expense: Expense }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors group">
      <div className="flex items-center gap-3 min-w-0">
        <span
          className={`text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${
            CATEGORY_COLORS[expense.category] ?? CATEGORY_COLORS["Other"]
          }`}
        >
          {expense.category}
        </span>
        <div className="min-w-0">
          <p className="text-sm text-gray-800 truncate">{expense.description}</p>
          <p className="text-xs text-gray-400">{expense.date}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0 ml-2">
        <span className="text-sm font-semibold text-gray-900">
          ${expense.amount.toFixed(2)}
        </span>
        <button
          onClick={() =>
            startTransition(() => deleteExpense(expense.id))
          }
          disabled={isPending}
          className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 disabled:opacity-30 transition-all text-lg leading-none"
          title="Delete expense"
        >
          {isPending ? "…" : "×"}
        </button>
      </div>
    </div>
  );
}

export default function ExpenseList({ expenses }: { expenses: Expense[] }) {
  if (expenses.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400 text-sm">
        No expenses yet. Add one above!
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-50">
      {expenses.map((expense) => (
        <ExpenseItem key={expense.id} expense={expense} />
      ))}
    </div>
  );
}
