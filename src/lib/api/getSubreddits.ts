export async function getSubreddits(): Promise<string[]> {
  try {
    const res = await fetch(`http://127.0.0.1:5000/posts/latest/${subredditName}`, {
        cache: "no-store"
    });
    if (!res.ok) return [];
    const json = await res.json();
    // ожидаем { subreddits: string[] }
    return Array.isArray(json?.subreddits) ? json.subreddits : [];
  } catch {
    return [];
  }
}