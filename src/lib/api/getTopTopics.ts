export type TopTopic = {
  topic: string;
  count: number;
};

export type TopTopicsResponse = {
  _id?: string;
  topics: TopTopic[];
}[];

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:5000";

// Fetches top topics for a subreddit in last N days with limit
export async function getTopTopics(subreddit: string, days: number, limit: number): Promise<TopTopic[]> {
  const urls = [
    `${BASE_URL}/api/statistics/topics/${subreddit}/${days}/${limit}`,
  ];
  let lastErr: any = null;
  for (const u of urls) {
    try {
      const res = await fetch(u, { cache: "no-store" });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const data: TopTopicsResponse = await res.json();
      const first = Array.isArray(data) ? data[0] : (data as any);
      return (first?.topics ?? []).map((t:any) => ({ topic: String(t.topic), count: Number(t.count) }));
    } catch (e) {
      lastErr = e;
      // try next url
    }
  }
  throw lastErr ?? new Error("Failed to fetch top topics");
}
