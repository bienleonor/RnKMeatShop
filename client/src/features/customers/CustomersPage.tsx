import Sidebar from "@/src/components/Sidebar";
import Topbar from "@/src/components/Topbar";

export default function CustomersPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Topbar />

        <main className="flex-1 px-6 py-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Customers</h1>
              <p className="mt-1 text-sm text-muted">
                Keep customer details and order history in one place
              </p>
            </div>
            <button className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white">
              New Customer
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-sm text-muted">Total</p>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">784</h2>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-sm text-muted">Active</p>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">432</h2>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-sm text-muted">New This Month</p>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">36</h2>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Top Customers</h3>
              <span className="text-sm text-muted">This quarter</span>
            </div>
            <div className="space-y-3">
              {[
                ["John Doe", "12 orders", "$1,860"],
                ["Maria Lopez", "9 orders", "$1,430"],
                ["Samuel Lee", "8 orders", "$1,120"],
              ].map(([name, details, value]) => (
                <div
                  key={name}
                  className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3"
                >
                  <div>
                    <p className="font-medium text-foreground">{name}</p>
                    <p className="text-sm text-muted">{details}</p>
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
