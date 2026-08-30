"use client";

import { FormEvent, useEffect, useState } from "react";
import Sidebar from "@/src/components/Sidebar";
import Topbar from "@/src/components/Topbar";
import {
  ApiError,
  createManagedLookup,
  deleteManagedLookup,
  getCurrentUser,
  getManagedLookups,
  ManagedLookup,
  updateManagedLookup,
} from "@/src/lib/api";

type Resource = "categories" | "typesOfProducts";
type Editing = { resource: Resource; id: number; name: string } | null;

function LookupSection({
  resource,
  title,
  items,
  onCreate,
  onUpdate,
  onDelete,
}: {
  resource: Resource;
  title: string;
  items: ManagedLookup[];
  onCreate: (resource: Resource, name: string) => Promise<void>;
  onUpdate: (resource: Resource, id: number, name: string) => Promise<void>;
  onDelete: (resource: Resource, id: number) => Promise<void>;
}) {
  const [name, setName] = useState("");
  const [editing, setEditing] = useState<Editing>(null);
  const [isSaving, setIsSaving] = useState(false);

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    try {
      await onCreate(resource, name);
      setName("");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editing) return;
    setIsSaving(true);
    try {
      await onUpdate(resource, editing.id, editing.name);
      setEditing(null);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        <span className="text-sm text-muted">{items.length} entries</span>
      </div>
      <form onSubmit={handleCreate} className="flex gap-2">
        <input required value={name} onChange={(event) => setName(event.target.value)} placeholder={`New ${title.toLowerCase().replace(" & meat types", "")}`} className="min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent" />
        <button type="submit" disabled={isSaving} className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-hover disabled:cursor-wait disabled:opacity-60">Add</button>
      </form>
      <div className="mt-4 space-y-2">
        {items.length === 0 ? <p className="text-sm text-muted">No entries yet.</p> : items.map((item) => editing?.id === item.id ? <form key={item.id} onSubmit={handleUpdate} className="flex gap-2"><input required autoFocus value={editing.name} onChange={(event) => setEditing({ ...editing, name: event.target.value })} className="min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent" /><button type="submit" disabled={isSaving} className="rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-white">Save</button><button type="button" onClick={() => setEditing(null)} className="rounded-lg border border-border px-3 py-2 text-sm text-muted">Cancel</button></form> : <div key={item.id} className="flex items-center justify-between gap-3 rounded-lg border border-border bg-background px-3 py-2"><span className="text-sm font-medium text-foreground">{item.name}</span><div className="flex gap-2"><button type="button" onClick={() => setEditing({ resource, id: item.id, name: item.name ?? "" })} className="text-sm font-medium text-accent hover:underline">Edit</button><button type="button" onClick={() => { if (window.confirm("Delete this lookup value?")) void onDelete(resource, item.id); }} className="text-sm font-medium text-danger hover:underline">Delete</button></div></div>)}
      </div>
    </section>
  );
}

export default function LookupsPage() {
  const [categories, setCategories] = useState<ManagedLookup[]>([]);
  const [typesOfProducts, setTypesOfProducts] = useState<ManagedLookup[]>([]);
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadLookups() {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getManagedLookups();
      setCategories(response.categories);
      setTypesOfProducts(response.typesOfProducts);
    } catch (requestError: unknown) {
      if (requestError instanceof ApiError && requestError.status === 403) {
        setIsAllowed(false);
      } else {
        setError(requestError instanceof Error ? requestError.message : "Unable to load lookup values.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCurrentUser()
      .then(({ user }) => {
        const isSuperadmin = user.role?.trim().toLowerCase() === "superadmin";
        setIsAllowed(isSuperadmin);
        if (isSuperadmin) void loadLookups();
        else setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  async function mutate(action: () => Promise<unknown>) {
    setError(null);
    try {
      await action();
      await loadLookups();
    } catch (requestError: unknown) {
      setError(requestError instanceof Error ? requestError.message : "The lookup change failed.");
    }
  }

  if (isAllowed === false) {
    return <main className="flex min-h-screen items-center justify-center bg-background px-6"><section className="rounded-xl border border-border bg-card p-8 text-center"><h1 className="text-lg font-semibold text-foreground">Access denied</h1><p className="mt-2 text-sm text-muted">Superadmin access is required for lookup management.</p></section></main>;
  }

  return <div className="flex min-h-screen bg-background"><Sidebar /><div className="flex flex-1 flex-col"><Topbar /><main className="flex-1 px-6 py-6"><div><h1 className="text-2xl font-semibold text-foreground">Categories &amp; Product Types</h1><p className="mt-1 text-sm text-muted">Manage the lookup values used by products.</p></div>{error ? <p className="mt-4 rounded-lg bg-danger-soft px-4 py-3 text-sm text-danger" role="alert">{error}</p> : null}{isLoading ? <p className="mt-6 text-sm text-muted">Loading lookup values...</p> : <div className="mt-6 grid gap-6 lg:grid-cols-2"><LookupSection resource="categories" title="Categories" items={categories} onCreate={(resource, name) => mutate(() => createManagedLookup(resource, name))} onUpdate={(resource, id, name) => mutate(() => updateManagedLookup(resource, id, name))} onDelete={(resource, id) => mutate(() => deleteManagedLookup(resource, id))} /><LookupSection resource="typesOfProducts" title="Types of Product" items={typesOfProducts} onCreate={(resource, name) => mutate(() => createManagedLookup(resource, name))} onUpdate={(resource, id, name) => mutate(() => updateManagedLookup(resource, id, name))} onDelete={(resource, id) => mutate(() => deleteManagedLookup(resource, id))} /></div>}</main></div></div>;
}
