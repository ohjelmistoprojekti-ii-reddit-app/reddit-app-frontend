export async function getSubreddits(): Promise<string[]> {
  try {
    const res = await fetch("http://127.0.0.1:5000/posts/subreddits", { cache: "no-store" });
    if (!res.ok) return [];
    const json = await res.json();
    return Array.isArray(json?.subreddits) ? json.subreddits : [];
  } catch {
    return [];
  }
}