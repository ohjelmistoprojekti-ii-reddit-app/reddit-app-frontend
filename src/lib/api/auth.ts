export type AuthResponse = {
  access_token?: string;
  refresh_token?: string;
  msg?: string;
  user_id?: string;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:5000";

export async function loginApi(username: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
    cache: "no-store",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.msg || "Login failed");
  return data as AuthResponse;
}

export async function registerApi(username: string, email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
    cache: "no-store",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.msg || "Registration failed");
  return data as AuthResponse;
}

export async function refreshApi(refreshToken: string): Promise<AuthResponse> {
  const res = await fetch(`${BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${refreshToken}` },
    cache: "no-store",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.msg || "Refresh failed");
  return data as AuthResponse;
}