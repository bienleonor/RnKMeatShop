import Link from "next/link";

const highlights = [
  { title: "Fast checkout", text: "Process sales quickly and keep queues moving." },
  { title: "Inventory visibility", text: "See what is in stock before each transaction." },
  { title: "Operational control", text: "Track prices, expenses, and customer activity in one place." },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-10 lg:px-10">
        <header className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-lg font-bold text-white">
              RK
            </div>
            <div>
              <p className="text-lg font-semibold">RK Meat Shop</p>
              <p className="text-xs text-muted">Purchase Order Machine</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white"
            >
              Create account
            </Link>
          </div>
        </header>

        <div className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <span className="inline-flex rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted">
              Retail operating system
            </span>

            <h1 className="mt-6 max-w-xl text-4xl font-bold tracking-tight md:text-6xl">
              Smarter meat shop operations from one control hub.
            </h1>

            <p className="mt-5 max-w-xl text-base text-muted md:text-lg">
              Run sales, stock levels, customer pricing, expenses, and reports through a single
              streamlined workflow built for daily retail performance.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/login"
                className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white shadow-sm"
              >
                Open POS
              </Link>
              <Link
                href="/register"
                className="rounded-xl border border-border px-6 py-3 text-sm font-semibold text-foreground"
              >
                Start free
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm text-muted">
              <span>Fast checkout</span>
              <span>Realtime stock</span>
              <span>Admin controls</span>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <div className="rounded-2xl border border-border bg-background p-5">
              <p className="text-sm font-medium text-muted">Today at a glance</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-border bg-card p-4">
                  <p className="text-xs uppercase tracking-wide text-muted">Sales</p>
                  <p className="mt-2 text-2xl font-semibold text-foreground">$12.4K</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4">
                  <p className="text-xs uppercase tracking-wide text-muted">Inventory</p>
                  <p className="mt-2 text-2xl font-semibold text-foreground">1.28T</p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {highlights.map((item) => (
                  <div key={item.title} className="rounded-xl border border-border bg-card p-3">
                    <p className="font-medium text-foreground">{item.title}</p>
                    <p className="mt-1 text-sm text-muted">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
