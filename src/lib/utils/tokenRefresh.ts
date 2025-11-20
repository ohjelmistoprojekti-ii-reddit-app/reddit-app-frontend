/**
 *Centralized token refresh utility
 *Used to automatically update the access token when receiving a 401 error
 */

import { getRefreshToken, saveTokens, clearTokens } from './authUtils';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:5000";

/**
 * Trying to update an access token using refresh token
 * @returns true if the update is successful, false otherwise
 */
export async function tryRefreshToken(): Promise<boolean> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    return false;
  }

  try {
    const res = await fetch(`${BASE_URL}/api/authentication/refresh`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${refreshToken}`
      },
      cache: "no-store",
    });

    if (!res.ok) {
      clearTokens();
      return false;
    }

    const data = await res.json();
    if (data.access_token) {
      saveTokens(data.access_token);
      return true;
    }

    return false;
  } catch (error) {
    console.error('Token refresh failed:', error);
    clearTokens();
    return false;
  }
}

/**
 * Wrapper for fetch requests with automatic token renewal
 * Automatically repeats the request with a new token if a 401 error is received
 * 
 * @param url -URL for request
 * @param options -Fetch request options
 * @returns Response object
 */
export async function fetchWithTokenRefresh(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  // First request attempt

  let response = await fetch(url, options);

  // If a 401 error is received, try to update the token

  if (response.status === 401) {
    const refreshed = await tryRefreshToken();
    
    if (refreshed) {
      // Update the Authorization header with a new token

      const token = typeof window !== 'undefined' 
        ? localStorage.getItem('access_token') 
        : null;
      
      if (token && options.headers) {
        const headers = new Headers(options.headers);
        headers.set('Authorization', `Bearer ${token}`);
        options.headers = headers;
      }
      
      // Repeat the request with a new token
      response = await fetch(url, options);
    }
  }

  return response;
}