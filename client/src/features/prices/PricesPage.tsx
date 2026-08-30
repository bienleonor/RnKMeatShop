import Sidebar from "@/src/components/Sidebar";
import Topbar from "@/src/components/Topbar";

export default function PricesPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Topbar />

        <main className="flex-1 px-6 py-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Product Prices</h1>
              <p className="mt-1 text-sm text-muted">
                Review customer pricing and sale adjustments
              </p>
            </div>
            <button className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white">
              Update Prices
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-sm text-muted">Active Price List</p>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">12</h2>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-sm text-muted">Promotions</p>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">4</h2>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-sm text-muted">Last Updated</p>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">Today</h2>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Price Matrix</h3>
              <span className="text-sm text-muted">Retail</span>
            </div>
            <div className="space-y-3">
              {[
                ["Beef Ribeye", "$24.50", "$22.00"],
                ["Chicken Thigh", "$9.75", "$8.20"],
                ["Pork Bacon", "$14.20", "$12.90"],
              ].map(([item, retail, wholesale]) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3"
                >
                  <div>
                    <p className="font-medium text-foreground">{item}</p>
                    <p className="text-sm text-muted">Wholesale {wholesale}</p>
                  </div>
                  <span className="font-semibold text-foreground">Retail {retail}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
