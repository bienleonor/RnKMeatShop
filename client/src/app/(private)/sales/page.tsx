import SalesPage from "@/src/features/sales/SalesPage";
import PrivateRoutes from "@/src/routes/PrivateRoutes";

export default function SalesRoutePage() {
  return (
    <PrivateRoutes>
      <SalesPage />
    </PrivateRoutes>
  );
}
