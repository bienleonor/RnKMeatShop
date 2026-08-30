import PosPage from "@/src/features/pos/PosPage";
import PrivateRoutes from "@/src/routes/PrivateRoutes";

export default function PosRoutePage() {
  return (
    <PrivateRoutes>
      <PosPage />
    </PrivateRoutes>
  );
}
