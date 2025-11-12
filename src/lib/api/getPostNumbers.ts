export type PostNumbersPoint = {
  day: string;
  posts: number;
};

export type PostNumbersResponse = {
  _id?: string;
  subreddit?: string;
  total?: number;
  total_count?: number;
  daily?: PostNumbersPoint[];
  posts?: PostNumbersPoint[]; // fallback
}[];

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:5000";

// Fetches post numbers trend for a subreddit for last N days.
export async function getPostNumbers(subreddit: string, days: number): Promise<PostNumbersPoint[]> {
  const res = await fetch(`${BASE_URL}/api/statistics/${subreddit}/${days}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  const data: PostNumbersResponse = await res.json();
  const first = Array.isArray(data) ? data[0] : (data as any);
  const arr = (first as any)?.daily ?? (first as any)?.posts ?? [];
  // Normalize & sort by date ASC
  return (arr as any[]).map((d:any) => ({ day: d.day ?? d.date ?? d._id, posts: Number(d.posts ?? d.count ?? 0) }))
    .filter(d => d.day)
    .sort((a,b) => (new Date(a.day).getTime()) - (new Date(b.day).getTime()));
}