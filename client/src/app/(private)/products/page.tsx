import ProductsPage from "@/src/features/products/ProductsPage";
import PrivateRoutes from "@/src/routes/PrivateRoutes";

export default function ProductsRoutePage() {
  return (
    <PrivateRoutes>
      <ProductsPage />
    </PrivateRoutes>
  );
}
