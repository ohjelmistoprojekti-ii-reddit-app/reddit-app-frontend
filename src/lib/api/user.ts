//User API. Functions for user account management
import { getAuthHeaders, clearTokens } from '../utils/authUtils';
import { tryRefreshToken } from '../utils/tokenRefresh';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:5000";

export type UserInfo = {
  id: string;
  username: string;
  email?: string;
};

/**
 * Fetch current user information
 */
export async function getCurrentUser(): Promise<UserInfo> {
  const res = await fetch(`${BASE_URL}/api/user/who_am_i`, {
    method: "GET",
    headers: getAuthHeaders(),
    cache: "no-store",
  });

  // If token expired, try to refresh
  if (res.status === 401) {
    const refreshed = await tryRefreshToken();
    if (refreshed) {
      // Retry with new token
      const retryRes = await fetch(`${BASE_URL}/api/user/who_am_i`, {
        method: "GET",
        headers: getAuthHeaders(),
        cache: "no-store",
      });
      
      if (!retryRes.ok) {
        throw new Error("Failed to fetch user info after token refresh");
      }
      
      return await retryRes.json();
    } else {
      throw new Error("Token expired and refresh failed");
    }
  }

  if (!res.ok) {
    throw new Error("Failed to fetch user info");
  }

  return await res.json();
}

// Delete user account
export async function deleteAccount(): Promise<{ msg: string }> {
  const res = await fetch(`${BASE_URL}/api/authentication/delete_account`, {
    method: "DELETE",
    headers: getAuthHeaders(),
    cache: "no-store",
  });

  // If token expired, try to refresh
  if (res.status === 401) {
    const refreshed = await tryRefreshToken();
    if (refreshed) {
      // Retry with new token
      const retryRes = await fetch(`${BASE_URL}/api/authentication/delete_account`, {
        method: "DELETE",
        headers: getAuthHeaders(),
        cache: "no-store",
      });
      
      if (!retryRes.ok) {
        const data = await retryRes.json();
        throw new Error(data?.msg || "Failed to delete account");
      }
      
      return await retryRes.json();
    } else {
      throw new Error("Token expired and refresh failed");
    }
  }

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data?.msg || "Failed to delete account");
  }

  return await res.json();
}