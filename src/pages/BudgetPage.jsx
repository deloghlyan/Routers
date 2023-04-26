// rrd imports
import { useLoaderData } from "react-router";

// helper functions
import { createExpense, deleteItem,  getAllMatchingItems } from "../helpers";

// componsnts
import BudgetItem from "../components/BudgetItem";
import AddExpenseForm from "../components/AddExpenseForm";
import Table from "../components/Table";

// library
import { toast } from "react-toastify";

//loaders
export async function budgetLoader({ params }) {
  const budget = getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];
  if (!budget) {
    throw new Error("The budget you are looking for does not exist");
  }

  const expenses = getAllMatchingItems({
    category: "expenses",
    key: "budgetId",
    value: params.id,
  });

  return { budget, expenses };
}

// action
export async function budgetPageAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.success("Expense deleted!");
    } catch (err) {
      throw new Error("There was a problem deleting your expense.");
    }
  }

  if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      return toast.success(`Expense ${newExpense} created.`)
    } catch (err) {
      throw new Error("There was a problem creating your expense.");
    }
  }
}

export default function BudgetPage() {
  const { budget, expenses } = useLoaderData();

  return (
    <div className="grid-lg" style={{ "--accent": budget.color }}>
      <h1>
        <span className="accent">{budget.name}</span> Overview
      </h1>
      <div className="flex-lg">
        <BudgetItem budget={budget} showDelete={true} />
        <AddExpenseForm budgets={[budget]} />
      </div>
      {expenses && expenses.length > 0 && (
        <div className="grid-md">
          <h2>
            <span className="accent">{budget.name}</span> Expenses
          </h2>
          <Table expenses={expenses.sort((a, b) => b.createdAt - a.createdAt)} showBudget={false} />
        </div>
      )}
    </div>
  );
}
