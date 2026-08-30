import LookupsPage from "@/src/features/lookups/LookupsPage";
import PrivateRoutes from "@/src/routes/PrivateRoutes";

export default function LookupsRoutePage() {
  return (
    <PrivateRoutes>
      <LookupsPage />
    </PrivateRoutes>
  );
}
