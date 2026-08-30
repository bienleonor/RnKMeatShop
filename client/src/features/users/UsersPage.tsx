import Sidebar from "@/src/components/Sidebar";
import Topbar from "@/src/components/Topbar";

export default function UsersPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Topbar />

        <main className="flex-1 px-6 py-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Users & Admin</h1>
              <p className="mt-1 text-sm text-muted">
                Manage POS users, roles, access, and account activity
              </p>
            </div>
            <button className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white">
              Add User
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-sm text-muted">Total Users</p>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">18</h2>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-sm text-muted">Admins</p>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">4</h2>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-sm text-muted">Active Sessions</p>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">12</h2>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">User Directory</h3>
              <span className="text-sm text-muted">Security roles</span>
            </div>
            <div className="space-y-3">
              {[
                ["Admin User", "superadmin", "Full Access"],
                ["Sales Manager", "manager", "Sales + Inventory"],
                ["Cashier A", "cashier", "Sales Only"],
              ].map(([name, username, role]) => (
                <div
                  key={name}
                  className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3"
                >
                  <div>
                    <p className="font-medium text-foreground">{name}</p>
                    <p className="text-sm text-muted">{username}</p>
                  </div>
                  <span className="font-semibold text-foreground">{role}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
