export interface CountrySubreddit {
  id: string;
  name: string;
  subreddit: string;
}

export async function getCountrySubreddits(): Promise<CountrySubreddit[]> {
  const res = await fetch("http://127.0.0.1:5000/subreddits/countries");
  if (!res.ok) throw new Error("Failed to fetch country subreddits");
  return res.json();
}