import Sidebar from "@/src/components/Sidebar";
import Topbar from "@/src/components/Topbar";

const products = [
  { name: "Beef Ribeye", price: 24.5, qty: 2 },
  { name: "Chicken Thigh", price: 9.75, qty: 3 },
  { name: "Pork Bacon", price: 14.2, qty: 1 },
  { name: "Fresh Tilapia", price: 11.5, qty: 4 },
];

export default function PosPage() {
  const subtotal = products.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * 0.12;
  const total = subtotal + tax;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Topbar />

        <main className="flex-1 px-6 py-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">New Sale</h1>
              <p className="mt-1 text-sm text-muted">
                Point-of-sale checkout for quick retail transactions
              </p>
            </div>
            <button className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white">
              Save Sale
            </button>
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
            <section className="rounded-xl border border-border bg-card p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">Items</h2>
                <button className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground">
                  Add Item
                </button>
              </div>

              <div className="space-y-3">
                {products.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3"
                  >
                    <div>
                      <p className="font-medium text-foreground">{item.name}</p>
                      <p className="text-sm text-muted">
                        {item.qty} x ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="h-8 w-8 rounded-md border border-border text-foreground">
                        -
                      </button>
                      <span className="w-6 text-center text-sm font-medium text-foreground">
                        {item.qty}
                      </span>
                      <button className="h-8 w-8 rounded-md border border-border text-foreground">
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <aside className="rounded-xl border border-border bg-card p-5">
              <h2 className="text-lg font-semibold text-foreground">Summary</h2>

              <div className="mt-5 space-y-3 text-sm text-muted">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span className="text-foreground">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Tax</span>
                  <span className="text-foreground">${tax.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Discount</span>
                  <span className="text-foreground">$0.00</span>
                </div>
              </div>

              <div className="mt-5 border-t border-border pt-4">
                <div className="flex items-center justify-between text-base font-semibold text-foreground">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button className="w-full rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-white">
                  Cash Payment
                </button>
                <button className="w-full rounded-lg border border-border px-4 py-3 text-sm font-semibold text-foreground">
                  Card Payment
                </button>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
