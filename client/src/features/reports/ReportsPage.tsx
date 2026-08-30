import Sidebar from "@/src/components/Sidebar";
import Topbar from "@/src/components/Topbar";

export default function ReportsPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Topbar />

        <main className="flex-1 px-6 py-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Reports</h1>
              <p className="mt-1 text-sm text-muted">
                Review operational metrics and performance summaries
              </p>
            </div>
            <button className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white">
              Export Report
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-sm text-muted">Revenue</p>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">$18.4K</h2>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-sm text-muted">Profit</p>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">$6.1K</h2>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-sm text-muted">Conversion</p>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">23.4%</h2>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Performance Snapshot</h3>
              <span className="text-sm text-muted">Monthly</span>
            </div>
            <div className="space-y-3">
              {[
                ["Sales Growth", "+12.5%", "vs last month"],
                ["Inventory Turnover", "6.8x", "healthy"],
                ["Expense Ratio", "19.6%", "under target"],
              ].map(([label, value, note]) => (
                <div
                  key={label}
                  className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3"
                >
                  <div>
                    <p className="font-medium text-foreground">{label}</p>
                    <p className="text-sm text-muted">{note}</p>
                  </div>
                  <span className="font-semibold text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
