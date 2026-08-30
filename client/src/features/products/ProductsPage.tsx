import Sidebar from "@/src/components/Sidebar";
import Topbar from "@/src/components/Topbar";

export default function ProductsPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Topbar />

        <main className="flex-1 px-6 py-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Products</h1>
              <p className="mt-1 text-sm text-muted">
                Manage product catalog and pricing structure
              </p>
            </div>
            <button className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white">
              Add Product
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-sm text-muted">Items</p>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">186</h2>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-sm text-muted">Variants</p>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">42</h2>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-sm text-muted">Avg. Price</p>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">$18.40</h2>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Product Catalog</h3>
              <span className="text-sm text-muted">Available now</span>
            </div>
            <div className="space-y-3">
              {[
                ["Beef Ribeye", "Primary Cuts", "$24.50"],
                ["Chicken Thigh", "Poultry", "$9.75"],
                ["Pork Bacon", "Processed", "$14.20"],
              ].map(([name, category, price]) => (
                <div
                  key={name}
                  className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3"
                >
                  <div>
                    <p className="font-medium text-foreground">{name}</p>
                    <p className="text-sm text-muted">{category}</p>
                  </div>
                  <span className="font-semibold text-foreground">{price}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
