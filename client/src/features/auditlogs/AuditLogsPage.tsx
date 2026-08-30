import Sidebar from "@/src/components/Sidebar";
import Topbar from "@/src/components/Topbar";

export default function AuditLogsPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Topbar />

        <main className="flex-1 px-6 py-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Audit Logs</h1>
              <p className="mt-1 text-sm text-muted">
                Review actions and system changes across the POS platform
              </p>
            </div>
            <button className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white">
              Export Logs
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-sm text-muted">Actions</p>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">1,284</h2>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-sm text-muted">Users</p>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">18</h2>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-sm text-muted">Last Sync</p>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">2m ago</h2>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
              <span className="text-sm text-muted">Last 24 hours</span>
            </div>
            <div className="space-y-3">
              {[
                ["Updated pricing", "Admin • 09:24 AM", "Beef Ribeye"],
                ["New stock entry", "Inventory • 08:18 AM", "Chicken Thigh"],
                ["User login", "System • 07:45 AM", "Manager Access"],
              ].map(([event, actor, target]) => (
                <div
                  key={event}
                  className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3"
                >
                  <div>
                    <p className="font-medium text-foreground">{event}</p>
                    <p className="text-sm text-muted">{actor}</p>
                  </div>
                  <span className="text-sm text-muted">{target}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
