import ReportsPage from "@/src/features/reports/ReportsPage";
import PrivateRoutes from "@/src/routes/PrivateRoutes";

export default function ReportsRoutePage() {
  return (
    <PrivateRoutes>
      <ReportsPage />
    </PrivateRoutes>
  );
}
