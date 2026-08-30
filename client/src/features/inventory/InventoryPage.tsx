import Sidebar from "@/src/components/Sidebar";
import Topbar from "@/src/components/Topbar";

export default function InventoryPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Topbar />

        <main className="flex-1 px-6 py-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Inventory</h1>
              <p className="mt-1 text-sm text-muted">
                Track stock levels and item movement across branches
              </p>
            </div>
            <button className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white">
              Add Stock
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-sm text-muted">Items</p>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">142</h2>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-sm text-muted">Low Stock</p>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">11</h2>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-sm text-muted">On Hand</p>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">1,280 kg</h2>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Stock Overview</h3>
              <span className="text-sm text-muted">Updated today</span>
            </div>
            <div className="space-y-3">
              {[
                ["Beef Sirloin", "320 kg", "Healthy"],
                ["Chicken Breast", "190 kg", "Low"],
                ["Pork Shoulder", "240 kg", "Healthy"],
              ].map(([name, quantity, status]) => (
                <div
                  key={name}
                  className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3"
                >
                  <div>
                    <p className="font-medium text-foreground">{name}</p>
                    <p className="text-sm text-muted">{quantity}</p>
                  </div>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      status === "Low"
                        ? "bg-danger-soft text-danger"
                        : "bg-success-soft text-success"
                    }`}
                  >
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
