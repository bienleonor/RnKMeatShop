"use client";

import { Search, Plus } from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-border bg-card px-6 py-4">
      <div className="relative w-full max-w-md">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
        />
        <input
          type="text"
          placeholder="Search sales, products, SKUs..."
          className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>

      <button
        type="button"
        className="flex shrink-0 items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
      >
        <Plus size={16} strokeWidth={2.5} />
        New Sale POS
      </button>
    </header>
  );
}
