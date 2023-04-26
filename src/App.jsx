// rrd imports
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// library
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// layouts
import Main, { mainLoader } from "./layouts/Main";

// actions
import { logoutAction } from "./actions/logout";
import { expensesAction } from "./pages/ExpensesPage";

// routes
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";
import ExpensesPage, { expensesLoader } from "./pages/ExpensesPage";
import BudgetPage, { budgetLoader, budgetPageAction } from "./pages/BudgetPage";
import deleteBudget from "./components/deleteBudget";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Main />}
      loader={mainLoader}
      errorElement={<Error />}
    >
      <Route
        index
        element={<Dashboard />}
        loader={dashboardLoader}
        action={dashboardAction}
        errorElement={<Error />}
      />
      <Route
        path="expenses"
        element={<ExpensesPage />}
        action={expensesAction}
        loader={expensesLoader}
        errorElement={<Error />}
      />

      <Route
        path="budget/:id"
        element={<BudgetPage />}
        loader={budgetLoader}
        action={budgetPageAction}
        errorElement={<Error />}
      >
        <Route
          path="delete"
          action={deleteBudget}
        />
      </Route>

      <Route path="logout" action={logoutAction} />
    </Route>
  )
);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
