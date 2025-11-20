import { CountryTopPost } from "@/types/map.types";
import { fetchWithTokenRefresh } from "../utils/tokenRefresh";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:5000";

/**
 * Fetches posts for a specific country subreddit with JWT authentication
 * Automatically renews access token if it has expired (401 error)
 * @param subreddit -The subreddit name (e.g., "suomi", "sweden")
 * @returns Array of top posts for the country
 */
export async function getPostsByCountry(subreddit: string): Promise<CountryTopPost[]> {
  try {
    // Get JWT token from localStorage (same as login flow)
    const token = typeof window !== 'undefined' 
      ? localStorage.getItem('access_token') 
      : null;

    // Build headers
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // Add Authorization header if token exists
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Make API request with automatic token refresh
    const res = await fetchWithTokenRefresh(
      `${BASE_URL}/api/countries/latest/${subreddit}`,
      {
        method: 'GET',
        headers,
        cache: "no-store",
      }
    );

    // Handle errors
    if (!res.ok) {
      if (res.status === 401) {
        console.error('Unauthorized: Login required or token expired and refresh failed');
      }
      return [];
    }

    const data = await res.json();

    // Parse response structure from backend
    // Backend returns: { country: "suomi", posts: [{ posts: [...] }], requiresLogin: true }
    const posts = data?.posts?.[0]?.posts || [];

    // Return top 3 posts
    return posts.slice(0, 3);
  } catch (e) {
    console.error("getPostsByCountry error:", e);
    return [];
  }
}