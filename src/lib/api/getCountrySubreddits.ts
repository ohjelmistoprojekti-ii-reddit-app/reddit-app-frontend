export interface CountrySubreddit {
  id: string;
  name: string;
  subreddit: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:5000";

export async function getCountrySubreddits(): Promise<CountrySubreddit[]> {
  const res = await fetch(`${BASE_URL}/api/subreddits/countries`);
  if (!res.ok) throw new Error("Failed to fetch country subreddits");
  return res.json();
}