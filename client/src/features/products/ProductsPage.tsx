"use client";

import { FormEvent, useEffect, useState } from "react";
import Sidebar from "@/src/components/Sidebar";
import Topbar from "@/src/components/Topbar";
import {
  createProduct,
  getProductLookups,
  getProducts,
  LookupOption,
  Product,
} from "@/src/lib/api";

type ProductForm = {
  name: string;
  sku: string;
  categoryId: string;
  typeOfProductId: string;
  unit: string;
  pricePerKg: string;
  initialQuantity: string;
  remarks: string;
};

const emptyForm: ProductForm = {
  name: "",
  sku: "",
  categoryId: "",
  typeOfProductId: "",
  unit: "kg",
  pricePerKg: "",
  initialQuantity: "0",
  remarks: "",
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<LookupOption[]>([]);
  const [typesOfProducts, setTypesOfProducts] = useState<LookupOption[]>([]);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadProducts() {
    setIsLoading(true);
    setError(null);
    try {
      const [productResponse, lookupResponse] = await Promise.all([
        getProducts(),
        getProductLookups(),
      ]);
      setProducts(productResponse.products);
      setCategories(lookupResponse.categories);
      setTypesOfProducts(lookupResponse.typesOfProducts);
    } catch (loadError: unknown) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load products.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadProducts();
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  function updateField(field: keyof ProductForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setError(null);
    try {
      await createProduct({
        name: form.name,
        sku: form.sku,
        categoryId: Number(form.categoryId),
        typeOfProductId: Number(form.typeOfProductId),
        unit: form.unit,
        pricePerKg: form.pricePerKg ? Number(form.pricePerKg) : undefined,
        initialQuantity: Number(form.initialQuantity || 0),
        remarks: form.remarks || undefined,
      });
      setForm(emptyForm);
      setIsFormOpen(false);
      await loadProducts();
    } catch (saveError: unknown) {
      setError(saveError instanceof Error ? saveError.message : "Unable to create product.");
    } finally {
      setIsSaving(false);
    }
  }

  const totalValue = products.reduce((sum, product) => sum + (product.pricePerKg ?? 0), 0);
  const totalWeight = products.reduce((sum, product) => sum + product.availableWeight, 0);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Topbar />
        <main className="flex-1 px-6 py-6">
          <div className="flex items-center justify-between gap-3">
            <div><h1 className="text-2xl font-semibold text-foreground">Products</h1><p className="mt-1 text-sm text-muted">Manage product catalog and pricing structure</p></div>
            <button type="button" onClick={() => setIsFormOpen((open) => !open)} className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-hover">{isFormOpen ? "Close" : "Add Product"}</button>
          </div>

          {error ? <p className="mt-4 rounded-lg bg-danger-soft px-4 py-3 text-sm text-danger" role="alert">{error}</p> : null}

          {isFormOpen ? <form onSubmit={handleSubmit} className="mt-6 rounded-xl border border-border bg-card p-5">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <label className="text-sm font-medium text-foreground">Product name<input required value={form.name} onChange={(event) => updateField("name", event.target.value)} className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 font-normal outline-none focus:border-accent" /></label>
              <label className="text-sm font-medium text-foreground">SKU<input required value={form.sku} onChange={(event) => updateField("sku", event.target.value)} className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 font-normal outline-none focus:border-accent" /></label>
              <label className="text-sm font-medium text-foreground">Unit<input required value={form.unit} onChange={(event) => updateField("unit", event.target.value)} className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 font-normal outline-none focus:border-accent" /></label>
              <label className="text-sm font-medium text-foreground">Category<select required value={form.categoryId} onChange={(event) => updateField("categoryId", event.target.value)} className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 font-normal outline-none focus:border-accent"><option value="">Select category</option>{categories.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}</select></label>
              <label className="text-sm font-medium text-foreground">Type of product<select required value={form.typeOfProductId} onChange={(event) => updateField("typeOfProductId", event.target.value)} className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 font-normal outline-none focus:border-accent"><option value="">Select type</option>{typesOfProducts.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}</select></label>
              <label className="text-sm font-medium text-foreground">Price per kg<input type="number" min="0.01" step="0.01" value={form.pricePerKg} onChange={(event) => updateField("pricePerKg", event.target.value)} className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 font-normal outline-none focus:border-accent" /></label>
              <label className="text-sm font-medium text-foreground">Opening quantity<input type="number" min="0" step="0.01" value={form.initialQuantity} onChange={(event) => updateField("initialQuantity", event.target.value)} className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 font-normal outline-none focus:border-accent" /></label>
              <label className="text-sm font-medium text-foreground md:col-span-2">Opening stock remarks<input value={form.remarks} onChange={(event) => updateField("remarks", event.target.value)} className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 font-normal outline-none focus:border-accent" /></label>
            </div>
            <button type="submit" disabled={isSaving || categories.length === 0 || typesOfProducts.length === 0} className="mt-5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-hover disabled:cursor-wait disabled:opacity-60">{isSaving ? "Saving..." : "Create product"}</button>
          </form> : null}

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-4"><p className="text-sm text-muted">Items</p><h2 className="mt-2 text-2xl font-semibold text-foreground">{products.length}</h2></div>
            <div className="rounded-xl border border-border bg-card p-4"><p className="text-sm text-muted">Units on hand</p><h2 className="mt-2 text-2xl font-semibold text-foreground">{totalWeight.toFixed(2)} kg</h2></div>
            <div className="rounded-xl border border-border bg-card p-4"><p className="text-sm text-muted">Price total</p><h2 className="mt-2 text-2xl font-semibold text-foreground">${totalValue.toFixed(2)}</h2></div>
          </div>

          <div className="mt-6 rounded-xl border border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between"><h3 className="text-lg font-semibold text-foreground">Product Catalog</h3><span className="text-sm text-muted">{products.length} products</span></div>
            {isLoading ? <p className="text-sm text-muted">Loading products...</p> : products.length === 0 ? <p className="text-sm text-muted">No products have been added yet.</p> : <div className="space-y-3">{products.map((product) => <div key={product.id} className="flex items-center justify-between gap-4 rounded-lg border border-border bg-background px-4 py-3"><div><p className="font-medium text-foreground">{product.name}</p><p className="text-sm text-muted">{product.sku} · {product.category?.name ?? "Uncategorized"} · {product.availableWeight} {product.unit ?? "kg"}</p></div><span className="shrink-0 font-semibold text-foreground">{product.pricePerKg == null ? "—" : `$${product.pricePerKg.toFixed(2)}`}</span></div>)}</div>}
          </div>
        </main>
      </div>
    </div>
  );
}
