"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getCurrentUser, deleteAccount, type UserInfo } from "@/lib/api/user";
import { clearTokens, isAuthenticated } from "@/lib/utils/authUtils";
import { Trash2, LogOut, User, Mail } from "lucide-react";

export default function AccountPage() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Clear any previous session data
    setUser(null);
    setError(null);
    setLoading(true);

    // Check if user is authenticated
    if (!isAuthenticated()) {
      router.push("/login");
      return;
    }

    // Fetch current user info
    async function fetchUser() {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (err: unknown) {
        console.error("Failed to fetch user:", err);
        const errorMessage = err instanceof Error ? err.message : "Failed to load account information";
        setError(errorMessage);
        
        // If authentication fails, redirect to login
        if (err instanceof Error && (err.message?.includes("Token expired") || err.message?.includes("authentication"))) {
          clearTokens();
          router.push("/login");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [router]);

  async function handleDeleteAccount() {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (!confirmed) return;

    setDeleting(true);
    setError(null);

    try {
      await deleteAccount();
      
      // Clear tokens and redirect to home
      clearTokens();
      alert("Your account has been successfully deleted.");
      router.push("/");
    } catch (err: unknown) {
      console.error("Failed to delete account:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to delete account";
      setError(errorMessage);
      
      // If authentication fails during deletion, redirect to login
      if (err instanceof Error && (err.message?.includes("Token expired") || err.message?.includes("authentication"))) {
        clearTokens();
        router.push("/login");
      }
    } finally {
      setDeleting(false);
    }
  }

  function handleSignOut() {
    clearTokens();
    router.push("/");
  }

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-orange-500 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading account information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardContent className="p-6 md:p-8 space-y-6">
          {/* Header */}
          <div className="text-center border-b pb-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
              My Account
            </h1>
            <p className="text-gray-600 mt-2">Manage your account settings</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* User Information */}
          {user && (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-full">
                    <User className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Username</p>
                    <p className="text-lg font-semibold text-gray-900">{user.username}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="text-lg font-semibold text-gray-900">{user.email || 'Not provided'}</p>
                  </div>
                </div>

                {user.last_login && (
                  <div className="flex items-center gap-3 pt-3 border-t border-gray-200">
                    <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Last Login</p>
                      <p className="text-sm font-medium text-gray-700">
                        {new Date(user.last_login).toLocaleString('fi-FI', {
                          year: 'numeric',
                          month: 'numeric',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Account Actions */}
              <div className="space-y-3 pt-4">
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 py-6 text-base"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </Button>

                <Button
                  onClick={handleDeleteAccount}
                  disabled={deleting}
                  variant="destructive"
                  className="w-full flex items-center justify-center gap-2 py-6 text-base bg-red-600 hover:bg-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                  {deleting ? "Deleting Account..." : "Delete Account"}
                </Button>
              </div>

              {/* Warning Notice */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
                <p className="text-amber-800 text-sm">
                  <strong>⚠️ Note:</strong> The delete function is irreversible. Once you delete your account, all your data will be permanently removed and cannot be recovered.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}