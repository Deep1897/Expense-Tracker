export type Expense = {
  id: string;
  category: string;
  amount: number;
  description: string;
  date: string;
};

// In-memory store seeded with sample data.
// For production, replace with a real database (PostgreSQL, MongoDB, etc.)
const expenses: Expense[] = [
  {
    id: "1",
    category: "Groceries",
    amount: 50,
    description: "Weekly grocery run",
    date: "2026-04-01",
  },
  {
    id: "2",
    category: "Transport",
    amount: 20,
    description: "Metro monthly pass",
    date: "2026-04-02",
  },
  {
    id: "3",
    category: "Utilities",
    amount: 80,
    description: "Electricity bill",
    date: "2026-04-03",
  },
];

export function readExpenses(): Expense[] {
  return [...expenses];
}

export function addExpense(expense: Expense): void {
  expenses.push(expense);
}

export function deleteExpense(id: string): void {
  const idx = expenses.findIndex((e) => e.id === id);
  if (idx !== -1) expenses.splice(idx, 1);
}
