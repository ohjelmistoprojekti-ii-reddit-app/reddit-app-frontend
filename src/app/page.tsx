import FilterableGrid from "@/components/features/topic/FilterableGrid";
import { getLatestTopicsDb } from "@/lib/api/getLatestTopicsDb";
import CategorySelect from "@/components/features/topic/CategorySelect";
import EmptyState from "@/components/ui/empty-state";


export default async function Home({ searchParams }: { searchParams?: { category?: string } }) {
  const category = searchParams?.category ?? "programming";

  let topics = [] as Awaited<ReturnType<typeof getLatestTopicsDb>>;
  let error: string | null = null;

  try {
    topics = await getLatestTopicsDb(category);
    if (!Array.isArray(topics) || topics.length === 0) {
    error = "Posts are not found for this category";
    }
  } catch {
    error = "Category search is failed. Try later.";
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between gap-4">
      <h1 className="text-2xl font-semibold">Trending Topics</h1>
      <CategorySelect selected={category} />
      </div>

      {error ? <EmptyState message={error} /> : <FilterableGrid topics={topics} />}
    </div>
  );
}
