import { redirect } from "react-router";
import { toast } from "react-toastify";
import { deleteItem, getAllMatchingItems } from "../helpers";

export default function deleteBudget({ params }) {
  try {
    deleteItem({
      key: "budgets",
      id: params.id,
    });

    const matchingExpenses = getAllMatchingItems({
      category: "expenses",
      key: "budgetId",
      value: params.id,
    });

    matchingExpenses.forEach((expense) => {
      deleteItem({
        key: "expenses",
        id: expense.id,
      });
    });

    toast.success("Budget deleted successfully!");
  } catch (err) {
    throw new Error("There was a problem deleting your budget.");
  }

  return redirect("/");
}
