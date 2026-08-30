import AuditLogsPage from "@/src/features/auditlogs/AuditLogsPage";
import PrivateRoutes from "@/src/routes/PrivateRoutes";

export default function AuditLogsRoutePage() {
  return (
    <PrivateRoutes>
      <AuditLogsPage />
    </PrivateRoutes>
  );
}
