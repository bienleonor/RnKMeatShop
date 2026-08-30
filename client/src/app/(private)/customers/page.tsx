import CustomersPage from "@/src/features/customers/CustomersPage";
import PrivateRoutes from "@/src/routes/PrivateRoutes";

export default function CustomersRoutePage() {
  return (
    <PrivateRoutes>
      <CustomersPage />
    </PrivateRoutes>
  );
}
