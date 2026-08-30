import ExpensesPage from "@/src/features/expenses/ExpensesPage";
import PrivateRoutes from "@/src/routes/PrivateRoutes";

export default function ExpensesRoutePage() {
  return (
    <PrivateRoutes>
      <ExpensesPage />
    </PrivateRoutes>
  );
}
