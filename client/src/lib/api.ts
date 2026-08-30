export type User = {
  id: number;
  username: string | null;
  name: string | null;
  email: string | null;
  role: string | null;
};

export type LookupOption = {
  id: number;
  name: string | null;
};

export type Product = {
  id: number;
  name: string | null;
  sku: string | null;
  category: LookupOption | null;
  typeOfProduct: LookupOption | null;
  unit: string | null;
  pricePerKg: number | null;
  url: string | null;
  availableWeight: number;
  updated: string | null;
};

export type InventoryItem = {
  id: number;
  productId: number;
  name: string;
  sku: string | null;
  unit: string | null;
  availableWeight: number;
  updated: string | null;
  category: string | null;
  typeOfProduct: string | null;
};

type AuthResponse = {
  user: User;
};

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ??
  "http://localhost:5000";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${apiBaseUrl}${path}`, {
      ...init,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...init?.headers,
      },
    });
  } catch {
    throw new ApiError(
      "Unable to reach the local POS server. Check that it is running and try again.",
      0,
    );
  }

  const body = (await response.json().catch(() => null)) as {
    error?: string;
  } | null;

  if (!response.ok) {
    throw new ApiError(
      body?.error ?? "The request could not be completed.",
      response.status,
    );
  }

  return body as T;
}

export function getCurrentUser() {
  return request<AuthResponse>("/api/auth/me");
}

export function login(username: string, password: string) {
  return request<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export function register(input: {
  name: string;
  username: string;
  email: string;
  password: string;
}) {
  return request<AuthResponse>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function logout() {
  return request<void>("/api/auth/logout", { method: "POST" });
}

export function getProductLookups() {
  return request<{ categories: LookupOption[]; typesOfProducts: LookupOption[] }>(
    "/api/products/lookups",
  );
}

export function getProducts() {
  return request<{ products: Product[] }>("/api/products");
}

export function createProduct(input: {
  name: string;
  sku: string;
  categoryId: number;
  typeOfProductId: number;
  unit: string;
  pricePerKg?: number;
  url?: string;
  initialQuantity: number;
  remarks?: string;
}) {
  return request<{ product: Product }>("/api/products", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function getInventory() {
  return request<{ inventory: InventoryItem[] }>("/api/inventory");
}

export function receiveStock(
  productId: number,
  input: { quantity: number; remarks?: string },
) {
  return request<{ inventory: InventoryItem }>(
    `/api/inventory/${productId}/stock`,
    {
      method: "POST",
      body: JSON.stringify(input),
    },
  );
}

export type ManagedLookup = {
  id: number;
  name: string | null;
};

export function getManagedLookups() {
  return request<{
    categories: ManagedLookup[];
    typesOfProducts: ManagedLookup[];
  }>("/api/lookups");
}

export function createManagedLookup(
  resource: "categories" | "typesOfProducts",
  name: string,
) {
  return request<{ item: ManagedLookup }>(`/api/lookups/${resource}`, {
    method: "POST",
    body: JSON.stringify({ name }),
  });
}

export function updateManagedLookup(
  resource: "categories" | "typesOfProducts",
  id: number,
  name: string,
) {
  return request<{ item: ManagedLookup }>(`/api/lookups/${resource}/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ name }),
  });
}

export function deleteManagedLookup(
  resource: "categories" | "typesOfProducts",
  id: number,
) {
  return request<void>(`/api/lookups/${resource}/${id}`, { method: "DELETE" });
}
