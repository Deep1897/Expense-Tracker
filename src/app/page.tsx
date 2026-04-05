import { readExpenses } from "@/lib/expenses";
import ExpenseForm from "@/app/components/ExpenseForm";
import ExpenseList from "@/app/components/ExpenseList";

export const dynamic = "force-dynamic";

export default function Home() {
  const expenses = readExpenses();
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Expense Tracker</h1>
          <p className="text-gray-500 text-sm mt-1">
            Track your spending in one place.
          </p>
        </div>

        {/* Total card */}
        <div className="bg-indigo-600 rounded-2xl p-6 mb-6 text-white shadow-lg">
          <p className="text-sm font-medium text-indigo-200">Total Expenses</p>
          <p className="text-4xl font-bold mt-1">${total.toFixed(2)}</p>
          <p className="text-sm text-indigo-200 mt-2">
            {expenses.length} {expenses.length === 1 ? "expense" : "expenses"} recorded
          </p>
        </div>

        {/* Add form */}
        <div className="mb-6">
          <ExpenseForm />
        </div>

        {/* Expense list */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-2 px-2">
            Expenses
          </h2>
          <ExpenseList expenses={expenses} />
        </div>
      </div>
    </main>
  );
}
