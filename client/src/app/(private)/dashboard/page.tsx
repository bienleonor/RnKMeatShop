import DashboardPage from "@/src/features/dashboard/DashboardPage";
import PrivateRoutes from "@/src/routes/PrivateRoutes";

export default function DashboardRoutePage() {
  return (
    <PrivateRoutes>
      <DashboardPage />
    </PrivateRoutes>
  );
}
