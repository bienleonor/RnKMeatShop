import PricesPage from "@/src/features/prices/PricesPage";
import PrivateRoutes from "@/src/routes/PrivateRoutes";

export default function PricesRoutePage() {
  return (
    <PrivateRoutes>
      <PricesPage />
    </PrivateRoutes>
  );
}
