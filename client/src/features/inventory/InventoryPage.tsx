"use client";

import { FormEvent, useEffect, useState } from "react";
import Sidebar from "@/src/components/Sidebar";
import Topbar from "@/src/components/Topbar";
import { getInventory, getProducts, InventoryItem, Product, receiveStock } from "@/src/lib/api";

type StockForm = { productId: string; quantity: string; remarks: string };
const emptyForm: StockForm = { productId: "", quantity: "", remarks: "" };

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<StockForm>(emptyForm);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadInventory() {
    setIsLoading(true);
    setError(null);
    try {
      const [inventoryResponse, productResponse] = await Promise.all([getInventory(), getProducts()]);
      setInventory(inventoryResponse.inventory);
      setProducts(productResponse.products);
    } catch (loadError: unknown) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load inventory.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadInventory();
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setError(null);
    try {
      await receiveStock(Number(form.productId), {
        quantity: Number(form.quantity),
        remarks: form.remarks || undefined,
      });
      setForm(emptyForm);
      setIsFormOpen(false);
      await loadInventory();
    } catch (saveError: unknown) {
      setError(saveError instanceof Error ? saveError.message : "Unable to receive stock.");
    } finally {
      setIsSaving(false);
    }
  }

  const totalWeight = inventory.reduce((sum, item) => sum + item.availableWeight, 0);
  const lowStockCount = inventory.filter((item) => item.availableWeight < 10).length;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Topbar />
        <main className="flex-1 px-6 py-6">
          <div className="flex items-center justify-between gap-3">
            <div><h1 className="text-2xl font-semibold text-foreground">Inventory</h1><p className="mt-1 text-sm text-muted">Track stock levels and item movement across branches</p></div>
            <button type="button" onClick={() => setIsFormOpen((open) => !open)} className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-hover">{isFormOpen ? "Close" : "Add Stock"}</button>
          </div>

          {error ? <p className="mt-4 rounded-lg bg-danger-soft px-4 py-3 text-sm text-danger" role="alert">{error}</p> : null}

          {isFormOpen ? <form onSubmit={handleSubmit} className="mt-6 rounded-xl border border-border bg-card p-5">
            <div className="grid gap-4 md:grid-cols-3">
              <label className="text-sm font-medium text-foreground">Product<select required value={form.productId} onChange={(event) => setForm((current) => ({ ...current, productId: event.target.value }))} className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 font-normal outline-none focus:border-accent"><option value="">Select product</option>{products.map((product) => <option key={product.id} value={product.id}>{product.name} ({product.sku})</option>)}</select></label>
              <label className="text-sm font-medium text-foreground">Quantity received<input required type="number" min="0.01" step="0.01" value={form.quantity} onChange={(event) => setForm((current) => ({ ...current, quantity: event.target.value }))} className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 font-normal outline-none focus:border-accent" /></label>
              <label className="text-sm font-medium text-foreground">Remarks<input value={form.remarks} onChange={(event) => setForm((current) => ({ ...current, remarks: event.target.value }))} className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 font-normal outline-none focus:border-accent" /></label>
            </div>
            <button type="submit" disabled={isSaving || products.length === 0} className="mt-5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-hover disabled:cursor-wait disabled:opacity-60">{isSaving ? "Saving..." : "Receive stock"}</button>
          </form> : null}

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-4"><p className="text-sm text-muted">Items</p><h2 className="mt-2 text-2xl font-semibold text-foreground">{inventory.length}</h2></div>
            <div className="rounded-xl border border-border bg-card p-4"><p className="text-sm text-muted">Low Stock</p><h2 className="mt-2 text-2xl font-semibold text-foreground">{lowStockCount}</h2></div>
            <div className="rounded-xl border border-border bg-card p-4"><p className="text-sm text-muted">On Hand</p><h2 className="mt-2 text-2xl font-semibold text-foreground">{totalWeight.toFixed(2)} kg</h2></div>
          </div>

          <div className="mt-6 rounded-xl border border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between"><h3 className="text-lg font-semibold text-foreground">Stock Overview</h3><span className="text-sm text-muted">{inventory.length} items</span></div>
            {isLoading ? <p className="text-sm text-muted">Loading inventory...</p> : inventory.length === 0 ? <p className="text-sm text-muted">No inventory has been added yet.</p> : <div className="space-y-3">{inventory.map((item) => { const isLow = item.availableWeight < 10; return <div key={item.id} className="flex items-center justify-between gap-4 rounded-lg border border-border bg-background px-4 py-3"><div><p className="font-medium text-foreground">{item.name}</p><p className="text-sm text-muted">{item.sku} · {item.availableWeight} {item.unit ?? "kg"}</p></div><span className={`shrink-0 rounded-full px-2 py-1 text-xs font-medium ${isLow ? "bg-danger-soft text-danger" : "bg-success-soft text-success"}`}>{isLow ? "Low" : "Healthy"}</span></div>; })}</div>}
          </div>
        </main>
      </div>
    </div>
  );
}
