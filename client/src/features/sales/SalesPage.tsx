import Sidebar from "@/src/components/Sidebar";
import Topbar from "@/src/components/Topbar";

export default function SalesPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Topbar />

        <main className="flex-1 px-6 py-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Sales</h1>
              <p className="mt-1 text-sm text-muted">
                Manage sales transactions and payment records
              </p>
            </div>
            <button className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white">
              New Sale
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-sm text-muted">Today</p>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">$4,260</h2>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-sm text-muted">Orders</p>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">36</h2>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-sm text-muted">Average</p>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">$118</h2>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Recent Sales</h3>
              <span className="text-sm text-muted">Last 7 days</span>
            </div>
            <div className="space-y-3">
              {[
                ["Order #1042", "Customer: John D.", "$420.00"],
                ["Order #1041", "Customer: Mark S.", "$310.00"],
                ["Order #1040", "Customer: Emma T.", "$285.50"],
              ].map(([title, subtitle, amount]) => (
                <div
                  key={title}
                  className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3"
                >
                  <div>
                    <p className="font-medium text-foreground">{title}</p>
                    <p className="text-sm text-muted">{subtitle}</p>
                  </div>
                  <span className="font-semibold text-foreground">{amount}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
