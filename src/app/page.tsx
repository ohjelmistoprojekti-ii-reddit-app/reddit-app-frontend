import FilterableGrid from "@/components/features/topic/FilterableGrid";
import { getLatestTopicsDb } from "@/lib/api/getLatestTopicsDb";
import SubredditSelect from "@/components/features/topic/SubredditSelect";
import EmptyState from "@/components/ui/empty-state";


export default async function Home(
  { searchParams }: { searchParams: Promise<{ subreddit?: string | string[], category?: string | string[] }> }
) {
  const params = await searchParams;

  const raw =
    (typeof params.subreddit === "string" && params.subreddit) ||
    (typeof params.category === "string" && params.category) ||
    "programming";

  const subreddit = raw;

  let topics = [] as Awaited<ReturnType<typeof getLatestTopicsDb>>;
  let error: string | null = null;

  try {
    topics = await getLatestTopicsDb(subreddit);
    if (!Array.isArray(topics) || topics.length === 0) {
      error = `Posts for “${subreddit}” not found. Try another one!`;
    }
  } catch {
    error = "Post are not availaible. Try later.";
  }

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Trending Topics</h1>
        <SubredditSelect selected={subreddit} />
      </div>

      {error ? <EmptyState message={error} /> : <FilterableGrid topics={topics} />}
    </div>
  );
}
