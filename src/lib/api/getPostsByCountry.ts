import { CountryTopPost } from "@/types/map.types";

export async function getPostsByCountry(subreddit: string): Promise<CountryTopPost[]> {
  try {
    const res = await fetch(`http://127.0.0.1:5000/countries/latest/${subreddit}`, {
      cache: "no-store",
    });
    if (!res.ok) return [];

    const data = await res.json();

    const posts = Array.isArray(data) && data.length > 0 && Array.isArray(data[0]?.posts)
      ? data[0].posts
      : [];

    return posts.slice(0, 3);
  } catch (e) {
    console.error("getPostsByCountry error:", e);
    return [];
  }
}