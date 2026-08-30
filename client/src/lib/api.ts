export type User = {
  id: number;
  username: string | null;
  name: string | null;
  email: string | null;
  role: string | null;
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
