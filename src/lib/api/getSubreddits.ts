export async function getSubreddits(): Promise<string[]> {
  try {
    const res = await fetch("http://127.0.0.1:5000/subreddits", { cache: "no-store" });
    if (!res.ok) return [];
    const json = await res.json();
    return Array.isArray(json) ? json : [];
  } catch {
    console.log("Failed to fetch subreddits");
    return [];
  }
}