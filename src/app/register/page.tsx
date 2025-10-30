"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerApi, loginApi } from "@/lib/api/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await registerApi(username, email, password);
      // Some backends return tokens on register; if not, log in automatically
      if (res.access_token) {
        localStorage.setItem("access_token", res.access_token!);
        if (res.refresh_token) localStorage.setItem("refresh_token", res.refresh_token!);
      } else {
        const loginRes = await loginApi(username, password);
        if (loginRes.access_token) localStorage.setItem("access_token", loginRes.access_token);
        if (loginRes.refresh_token) localStorage.setItem("refresh_token", loginRes.refresh_token);
      }
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="p-6 space-y-4">
          <h1 className="text-2xl font-semibold">Create account</h1>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <form onSubmit={onSubmit} className="space-y-3">
            <div className="space-y-1">
              <label className="text-sm">Username</label>
              <input className="w-full border rounded-md px-3 py-2 bg-white" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="space-y-1">
              <label className="text-sm">Email</label>
              <input className="w-full border rounded-md px-3 py-2 bg-white" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-1">
              <label className="text-sm">Password</label>
              <input className="w-full border rounded-md px-3 py-2 bg-white" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Creating..." : "Create account"}
            </Button>
          </form>
          <p className="text-sm">
            Already have an account? <Link className="underline" href="/login">Sign in</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}