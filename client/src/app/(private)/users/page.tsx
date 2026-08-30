import UsersPage from "@/src/features/users/UsersPage";
import PrivateRoutes from "@/src/routes/PrivateRoutes";

export default function UsersRoutePage() {
  return (
    <PrivateRoutes>
      <UsersPage />
    </PrivateRoutes>
  );
}
