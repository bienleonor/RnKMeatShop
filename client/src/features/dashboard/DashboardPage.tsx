import Sidebar from "@/src/components/Sidebar";
import Topbar from "@/src/components/Topbar";
import StatCard from "@/src/components/StatCard";
import RecentSalesOrders from "@/src/components/RecentSalesOrders";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Topbar />

        <main className="flex-1 px-6 py-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">
                Executive Dashboard
              </h1>
              <p className="mt-1 text-sm text-muted">
                Live operational insights across all meat categories and
                customer orders
              </p>
            </div>
            <span className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted">
              Updated 5m ago
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Total Sales"
              value="$12,450.00"
              trend={{ direction: "up", value: "12.5%" }}
              footer={
                <>
                  Includes VAT (<code className="text-foreground/70">sales</code>{" "}
                  table)
                </>
              }
            />
            <StatCard
              label="Available Stock"
              value="1,280.5 kg"
              trend={{ direction: "down", value: "4.2%" }}
              footer={
                <>
                  Across 14 SKUs (
                  <code className="text-foreground/70">inventory</code>)
                </>
              }
            />
            <StatCard
              label="Purchases Today"
              value="450.0 kg"
              trend={{ direction: "up", value: "80 kg" }}
              footer="Restocked into stock"
            />
            <StatCard
              label="Monthly Expenses"
              value="$1,890.00"
              footer="Recorded by Admin — This Month"
            />
          </div>

          <div className="mt-6">
            <RecentSalesOrders />
          </div>
        </main>
      </div>
    </div>
  );
}
