import InventoryPage from "@/src/features/inventory/InventoryPage";
import PrivateRoutes from "@/src/routes/PrivateRoutes";

export default function InventoryRoutePage() {
  return (
    <PrivateRoutes>
      <InventoryPage />
    </PrivateRoutes>
  );
}
