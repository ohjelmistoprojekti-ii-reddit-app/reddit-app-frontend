export async function getCategories(): Promise<string[]> {
  const res = await fetch("http://127.0.0.1:5000/posts/categories", { cache: "no-store" });
  if (!res.ok) return [];
  const json = await res.json();
  return json.categories ?? [];
}